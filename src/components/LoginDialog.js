import * as React from 'react';
import {
    Alert,
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

import {useDispatch} from "react-redux";
import {login, register} from "@/store/modules/user"

const iconBtnStyle = {
    fontSize: '1.8em'
}

const initLoginInfo = {
    email: '',
    password: ''
}

const initRegisterInfo = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
}

const EMAIL_PATTERN = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
const PWD_PATTERN = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;  // 6-16 characters, includes number and letter

const LoginDialog = (props) => {
    const [ifLogin, setIfLogin] = React.useState(true);  // login or register
    const [loginInfo, setLoginInfo] = React.useState({...initLoginInfo});
    const [registerInfo, setRegisterInfo] = React.useState(initRegisterInfo);
    const [confirmPwd, setConfirmPwd] = React.useState('');
    // message returned by login&register failure
    const [loginAlert, setLoginAlert] = React.useState(null);
    const [registerAlert, setRegisterAlert] = React.useState(null);
    // login validator
    const [loginEmailError, setLoginEmailError] = React.useState(false);
    const [loginEmailHelperText, setLoginEmailHelperText] = React.useState(null);
    const [loginPasswordError, setLoginPasswordError] = React.useState(false);
    const [loginPasswordHelperText, setLoginPasswordHelperText] = React.useState(null);
    // register validator
    const [registerEmailError, setRegisterEmailError] = React.useState(false);
    const [registerEmailHelperText, setRegisterEmailHelperText] = React.useState(null);
    const [registerFirstNameError, setRegisterFirstNameError] = React.useState(false);
    const [registerFirstNameHelperText, setRegisterFirstNameHelperText] = React.useState(null);
    const [registerLastNameError, setRegisterLastNameError] = React.useState(false);
    const [registerLastNameHelperText, setRegisterLastNameHelperText] = React.useState(null);
    const [registerPasswordError, setRegisterPasswordError] = React.useState(false);
    const [registerPasswordHelperText, setRegisterPasswordHelperText] = React.useState(null);
    const [registerConfirmPwdError, setRegisterConfirmPwdError] = React.useState(false);
    const [registerConfirmPwdHelperText, setRegisterConfirmPwdHelperText] = React.useState(null);

    const dispatch = useDispatch();

    const validateLoginEmail = () => {
        if (loginInfo.email === '') {
            setLoginEmailError(true)
            setLoginEmailHelperText("Email address can't be blank.")
        } else if (!EMAIL_PATTERN.test(loginInfo.email)) {
            setLoginEmailError(true)
            setLoginEmailHelperText("Invalid email address.")
        } else {
            setLoginEmailError(false)
            setLoginEmailHelperText(null)
        }
    }

    const validateLoginPassword = () => {
        if (loginInfo.password === '') {
            setLoginPasswordError(true)
            setLoginPasswordHelperText("Password can't be blank.")
        } else {
            setLoginPasswordError(false)
            setLoginPasswordHelperText(null)
        }
    }

    const validateRegisterEmail = () => {
        if (registerInfo.email === '') {
            setRegisterEmailError(true)
            setRegisterEmailHelperText("Email address can't be blank.")
        } else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(registerInfo.email)) {
            setRegisterEmailError(true)
            setRegisterEmailHelperText("Invalid email address.")
        } else {
            setRegisterEmailError(false)
            setRegisterEmailHelperText(null)
        }
    }

    const validateRegisterFirstName = () => {
        if (registerInfo.firstName === '') {
            setRegisterFirstNameError(true)
            setRegisterFirstNameHelperText("First name can't be blank.")
        } else {
            setRegisterFirstNameError(false)
            setRegisterFirstNameHelperText(null)
        }
    }

    const validateRegisterLastName = () => {
        if (registerInfo.lastName === '') {
            setRegisterLastNameError(true)
            setRegisterLastNameHelperText("Last Name can't be blank.")
        } else {
            setRegisterLastNameError(false)
            setRegisterLastNameHelperText(null)
        }
    }

    const validateRegisterPassword = () => {
        if (registerInfo.password === '') {
            setRegisterPasswordError(true)
            setRegisterPasswordHelperText("Password can't be blank.")
        } else if (registerInfo.password.length < 6 || registerInfo.password.length > 16) {
            setRegisterPasswordError(true)
            setRegisterPasswordHelperText("Invalid password. Use 6-16 characters or more for your password.")
        } else if (!PWD_PATTERN.test(registerInfo.password)) {
            setRegisterPasswordError(true)
            setRegisterPasswordHelperText("Invalid password. Try a mix of letters and numbers.")
        } else {
            setRegisterPasswordError(false)
            setRegisterPasswordHelperText(null)
        }
    }

    const validateRegisterConfirmPwd = () => {
        if (confirmPwd !== registerInfo.password) {
            setRegisterConfirmPwdError(true)
            setRegisterConfirmPwdHelperText("Those passwords didn't match.")
        } else {
            setRegisterConfirmPwdError(false)
            setRegisterConfirmPwdHelperText(null)
        }
    }

    const handleLogin = () => {
        validateLoginEmail()
        validateLoginPassword()
        if (loginEmailError || loginPasswordError) {
            return
        }
        dispatch(login(loginInfo)).then(res => {
            setLoginAlert(null)
            props.setAuth(res.authorities[0].authority)
            props.setAvatar(res.avatar)
            props.onClose()
        }).catch(err => {
            setLoginAlert(err)
        })
    }

    const handleRegister = () => {
        validateRegisterEmail()
        validateRegisterFirstName()
        validateRegisterLastName()
        validateRegisterPassword()
        validateRegisterConfirmPwd()
        if (registerEmailError || registerFirstNameError || registerLastNameError || registerPasswordError || registerConfirmPwdError) {
            return
        }
        dispatch(register(registerInfo)).then(res => {
            setRegisterAlert(null)
            setIfLogin(true)
        }).catch(err => {
            setRegisterAlert(err)
        })
    }

    return (
        <Dialog open={props.ifVisible} onClose={props.onClose} fullWidth maxWidth="xs">
            <DialogTitle>Sign {ifLogin ? 'in' : 'up'}</DialogTitle>
            {ifLogin ? (
                <DialogContent style={{textAlign: 'center'}}>
                    {loginAlert && (
                        <Alert variant="filled" severity="error">
                            {loginAlert}
                        </Alert>
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={loginInfo.email}
                        onChange={e => setLoginInfo({...loginInfo, email: e.target.value})}
                        required
                        error={loginEmailError}
                        helperText={loginEmailHelperText}
                        onBlur={validateLoginEmail}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={loginInfo.password}
                        onChange={e => setLoginInfo({...loginInfo, password: e.target.value})}
                        required
                        error={loginPasswordError}
                        helperText={loginPasswordHelperText}
                        onBlur={validateLoginPassword}
                    />
                    <Button
                        margin="dense"
                        variant="contained"
                        fullWidth
                        size="large"
                        style={{marginTop: '12px'}}
                        onClick={handleLogin}>Sign In</Button>
                    <Button size="large">Forget Password?</Button><br/>
                    Don't have an account?<Button size="large" onClick={() => setIfLogin(false)}>Create Account</Button>
                    <Divider style={{marginTop: '1em', color: 'lightgrey'}}>Other ways to sign in</Divider>
                    <IconButton aria-label="google"><GoogleIcon style={iconBtnStyle}/></IconButton>
                    <IconButton aria-label="apple"><AppleIcon style={iconBtnStyle}/></IconButton>
                    <IconButton aria-label="facebook"><FacebookIcon style={iconBtnStyle}/></IconButton>
                </DialogContent>
            ) : (
                <DialogContent style={{textAlign: 'center'}}>
                    {registerAlert && (
                        <Alert variant="filled" severity="error">
                            {registerAlert}
                        </Alert>
                    )}
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={registerInfo.email}
                        onChange={e => setRegisterInfo({...registerInfo, email: e.target.value})}
                        required
                        error={registerEmailError}
                        helperText={registerEmailHelperText}
                        onBlur={validateRegisterEmail}
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={registerInfo.firstName}
                        onChange={e => setRegisterInfo({...registerInfo, firstName: e.target.value})}
                        required
                        error={registerFirstNameError}
                        helperText={registerFirstNameHelperText}
                        onBlur={validateRegisterFirstName}
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={registerInfo.lastName}
                        onChange={e => setRegisterInfo({...registerInfo, lastName: e.target.value})}
                        required
                        error={registerLastNameError}
                        helperText={registerLastNameHelperText}
                        onBlur={validateRegisterLastName}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={registerInfo.password}
                        onChange={e => setRegisterInfo({...registerInfo, password: e.target.value})}
                        required
                        error={registerPasswordError}
                        helperText={registerPasswordHelperText}
                        onBlur={validateRegisterPassword}
                    />
                    <TextField
                        margin="dense"
                        id="confirm-password"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={confirmPwd}
                        onChange={e => setConfirmPwd(e.target.value)}
                        required
                        error={registerConfirmPwdError}
                        helperText={registerConfirmPwdHelperText}
                        onBlur={validateRegisterConfirmPwd}
                    />
                    <Button
                        margin="dense"
                        variant="contained"
                        fullWidth
                        size="large"
                        style={{marginTop: '12px'}}
                        onClick={handleRegister}>Create Account</Button>
                    Already have an account?<Button size="large" onClick={() => setIfLogin(true)}>Sign in</Button>
                </DialogContent>
            )}
        </Dialog>
    );
}
export default LoginDialog;