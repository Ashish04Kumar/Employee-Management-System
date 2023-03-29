import React, { useState } from "react"
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

export const TaskForm = () => {
    const { token, userId } = useUser()
    const navigate = useNavigate()
    const [newTask, setNewTask] = useState({
        taskName: "",
        assignedTo: "",
        assignedBy: userId
    })
    const [errors, setErrors] = useState({
        taskName: "",
        assignedTo: "",
        assignedBy: ""
    })

    const updateUserField = (event) => {
        const field = event.target
        setNewTask((newTask) => ({ ...newTask, [field.name]: field.value }))
    }

    const isInvalid =
        (newTask && newTask.taskName && newTask.assignedTo) 
        && (newTask.taskName.trim() === "" || newTask.assignedTo.trim() === "")

    const formSubmit = (event) => {
        event.preventDefault()
        if (!isInvalid) {
            BackendApi.task
                .addTask(newTask, token)
                .then(() => navigate("/"))
        }
    }

    const validateForm = (event) => {
        const { name, value } = event.target
        if (["taskName", "assignedTo"].includes(name)) {
            setNewTask((prevProd) => ({ ...prevProd, [name]: value.trim() }))
            if (!value.trim().length) {
                setErrors({ ...errors, [name]: `${name} can't be empty` })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
    }

    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                    Add Task
                </Typography>
                <form noValidate autoComplete="off" onSubmit={formSubmit}>
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Task Name"
                                name="taskName"
                                required
                                value={newTask.taskName}
                                onChange={updateUserField}
                                onBlur={validateForm}
                                error={errors.taskName.length > 0}
                                helperText={errors.taskName}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Assign To"
                                name="assignedTo"
                                required
                                value={newTask.assignedTo}
                                onChange={updateUserField}
                                onBlur={validateForm}
                                error={errors.assignedTo.length > 0}
                                helperText={errors.assignedTo}
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
                            Add Task
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}
