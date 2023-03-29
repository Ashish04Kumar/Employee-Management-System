import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"
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
} from "@mui/material"
import { useUser } from "../../context/user-context"
import { Route, Routes, Navigate, Link } from "react-router-dom"
import AdbIcon from "@mui/icons-material/Adb"
import { TaskAndLeaveList } from "../task-leave-list/task-leave-list"
import { LoginDialog } from "../login/login-dialog"
import { UserForm } from "../user-form/user-form"
import { UserUpdateForm } from "../user-form/user-update-form"
import {Profile} from "../profile/profile"
import { WithLoginProtector } from "../access-control/login-protector"
import { WithAdminProtector } from "../access-control/admin-protector"
import classes from "./styles.module.css"
import { TaskForm } from "../task/task-form"


export const AppLayout = () => {

    const [openLoginDialog, setOpenLoginDialog] = useState(true)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const { user, loginUser, logoutUser, isAdmin, token } = useUser()
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleProfile = () => {
        navigate("/user/profile/" + user.userId)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLoginSubmit = (username, password) => {
        loginUser(username, password)
        setOpenLoginDialog(false)
    }

    const handleLoginClose = () => {
        setOpenLoginDialog(false)
    }

    const handleLogout = () => {
        logoutUser()
        handleCloseUserMenu()
    }

    useEffect(() => {
        navigate("/")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isAdmin, token])

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: "flex", mr: 1 }} />
                        <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: "flex",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "white",
                                }}
                            >
                                Employee Management System
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 0,
                            }}
                        >
                            {user ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar> {user.email.charAt(0).toUpperCase()} </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleProfile}>
                                            <Typography textAlign="center">Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (<>
                            <div className={classes.actionsContainer}>
                                <Button
                                    onClick={() => {
                                        setOpenLoginDialog(true)
                                    }}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Login
                                </Button>
                            </div>
                                
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
                <Route path="/" exact element={<TaskAndLeaveList />} />
                <Route
                    path="/admin/task/add"
                    element={
                        <WithLoginProtector>
                                <TaskForm />
                        </WithLoginProtector>
                    }
                    exact
                />
                <Route
                    path="/admin/users/add"
                    element={
                        <WithLoginProtector>
                            <WithAdminProtector>
                                <UserForm />
                            </WithAdminProtector>
                        </WithLoginProtector>
                    }
                    exact
                />
                <Route
                    path="/users/add"
                    element={
                        <UserForm />
                    }
                    exact
                />
                <Route
                    path="/user/profile/:userId"
                    element={
                        <WithLoginProtector>
                                <Profile />
                        </WithLoginProtector>
                    }
                />
                <Route
                    path="/user/update/:userId"
                    element={
                        <WithLoginProtector>
                                <UserUpdateForm />
                        </WithLoginProtector>
                    }
                />
                <Route path="*" element={<Navigate to="/books" replace />} />
            </Routes>
            <LoginDialog
                open={openLoginDialog}
                handleSubmit={handleLoginSubmit}
                handleClose={handleLoginClose}
            />
        </>
    )
}