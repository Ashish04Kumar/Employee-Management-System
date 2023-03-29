import React, { useEffect, useState } from "react"
import * as dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../context/user-context"

import {
    Paper,
    Container,
    Button,
    TextField,
    FormGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from "@mui/material"
import { BackendApi } from "../../client/backend-api"
import classes from "./styles.module.css"

dayjs.extend(utc)

export const UserUpdateForm = () => {
    const { token, userId } = useUser()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const updateUserField = (event) => {
        const field = event.target
        setUser((user) => ({ ...user, [field.name]: field.value }))
    }

    const isInvalid =
        (user && user.firstName && user.lastName && user.email && user.password) 
        && (user.firstName.trim() === "" || user.lastName.trim() === "" || user.email.trim() === "" || user.password.trim() === "")

    const formSubmit = (event) => {
        event.preventDefault()
        if (!isInvalid) {
            BackendApi.user
                .updateUser(user, userId, token)
                .then(() => navigate("/"))
        }
    }

    const validateForm = (event) => {
        const { name, value } = event.target
        if (["firstName", "lastName", "email", "password"].includes(name)) {
            setUser((prevProd) => ({ ...prevProd, [name]: value.trim() }))
            if (!value.trim().length) {
                setErrors({ ...errors, [name]: `${name} can't be empty` })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (userId) {
                const user = await BackendApi.user.getProfile(userId, token);
                if(user){
                    console.log("setting book" + user)
                    setUser(user)
                }
                else{
                    navigate("/")
                }
            }
          }
          fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, userId])

    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                    Update User
                </Typography>
                <form noValidate autoComplete="off" onSubmit={formSubmit}>
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                required
                                value={user.firstName}
                                onChange={updateUserField}
                                onBlur={validateForm}
                                error={errors.firstName.length > 0}
                                helperText={errors.firstName}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                required
                                value={user.lastName}
                                onChange={updateUserField}
                                onBlur={validateForm}
                                error={errors.lastName.length > 0}
                                helperText={errors.lastName}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Email"
                                name="email"
                                required
                                value={user.email}
                                onChange={updateUserField}
                                onBlur={validateForm}
                                error={errors.email.length > 0}
                                helperText={errors.email}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Password"
                                name="password"
                                required
                                value={user.password}
                                onChange={updateUserField}
                                onBlur={validateForm}
                                error={errors.password.length > 0}
                                helperText={errors.password}
                            />
                        </FormControl>
                    </FormGroup>
                    <div className={classes.btnContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
                            Update User
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}
