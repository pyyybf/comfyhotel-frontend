import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from '@mui/material';

import {useDispatch} from "react-redux";
import {logout} from "@/store/modules/user"

import logo from '@/assets/logo.svg';
import LoginDialog from "./LoginDialog";

const settings = ['Account', 'Logout'];

const Header = () => {
    const [auth, setAuth] = React.useState(localStorage.getItem('auth'));
    const [avatar, setAvatar] = React.useState(localStorage.getItem('avatar'));
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [dialogVisible, setDialogVisible] = React.useState(false);

    const dispatch = useDispatch();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (key) => {
        setAnchorElUser(null);
        switch (key) {
            case 'Logout':
                dispatch(
                    logout('token')
                ).then(res => {
                    setAuth(null)
                    setAvatar(null)
                }).catch(err => {

                })
                return
            default:
                return
        }
    };

    const handleLogin = () => {
        setDialogVisible(true);
    }

    const handleCloseDialog = () => {
        setDialogVisible(false);
    }

    return (
        <AppBar position="static"
                elevation={0}
                sx={{
                    backgroundColor: 'white',
                    height: '4em',
                    borderBottom: '1px solid lightgray'
                }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1}}>
                        <img src={logo} style={{height: '2em', maxWidth: '100%', verticalAlign: 'middle'}}
                             alt="Logo"></img>
                    </Box>

                    {auth ? (
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Yue Pan" src={avatar}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (<React.Fragment>
                            <Button variant="outlined" onClick={handleLogin}>Sign in</Button>
                            <LoginDialog ifVisible={dialogVisible}
                                         onClose={handleCloseDialog}
                                         setAuth={setAuth}
                                         setAvatar={setAvatar}></LoginDialog>
                        </React.Fragment>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;