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

const LoginDialog = (props) => {
    const [ifLogin, setIfLogin] = React.useState(true);
    const [loginInfo, setLoginInfo] = React.useState({...initLoginInfo});
    const [registerInfo, setRegisterInfo] = React.useState(initRegisterInfo);
    const [confirmPwd, setConfirmPwd] = React.useState('');
    const [loginAlert, setLoginAlert] = React.useState(null);
    const [registerAlert, setRegisterAlert] = React.useState(null);

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login(loginInfo)).then(res => {
            setLoginAlert(null)
            props.setAuth(res.authorities[0].authority)
        }).catch(err => {
            setLoginAlert(err)
        })
    }

    const handleRegister = () => {
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