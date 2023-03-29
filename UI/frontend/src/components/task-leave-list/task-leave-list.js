import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Card,
    CardContent,
    CardActions,
    Typography,
    TablePagination,
    TextField
} from "@mui/material"

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { BackendApi } from "../../client/backend-api"
import { useUser } from "../../context/user-context"
import classes from "./styles.module.css"
import dayjs from "dayjs"
import * as moment  from 'moment';

export const TaskAndLeaveList = () => {

    const [tasks, setTasks] = useState([]);
    const [nonAdminUsers, setNonAdminUsers] = useState([]);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [openUserModal, setOpenUserModal] = useState(false)
    const { isAdmin, user, token, userId, isManager, managerId } = useUser()
    const [activeUserId, setActiveUserId] = useState("")
    const [activeTaskId, setActiveTaskId] = useState("")
    const [leaves, setLeaves] = useState([])
    const [status, setStatus] = useState(null)
    const [openTaskUpdateModal, setOpenTaskUpdateModal] = useState(false)
    const [openLeavesModal, setOpenLeavesModal] = useState(false)
    const [leaveDate, setLeaveDate] = useState()

    const deleteNonAdminUser = () => {
        if (activeUserId && nonAdminUsers.length) {
            BackendApi.user.deleteUser(activeUserId, token).then(({ success }) => {
                getNonAdminUsers()
            })
        }
    }

    const acceptLeave = (id) => {
        if (id) {
            BackendApi.leaves.acceptLeave(id, token).then(({ success }) => {
                fetchLeavesForManager()
            })
        }
    }

    const rejectLeave = (id) => {
        if (id) {
            BackendApi.leaves.rejectLeave(id, token).then(({ success }) => {
                fetchLeavesForManager()
            })
        }
    }

    const updateTask = () => {
        if (tasks && tasks.length) {
            BackendApi.task.updateTask(status,activeTaskId, token).then(({ success }) => {
                fetchTasksForEmpoyee()
                setActiveTaskId("")
                setOpenTaskUpdateModal(false)
            })
        }
    }

    const applyForLeave = () => {
        if (leaveDate) {
            const date = new Date(leaveDate);
            var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0'+(date.getMonth()+1);
            var day = date.getDate() >= 10 ? date.getDate() : '0'+date.getDate();
            const dateStr = day + '/' + month +'/' + date.getFullYear()
            const obj = { 
                appliedBy : userId, 
                dateOfAbsence : dateStr
            }
            BackendApi.leaves.applyForLeave(obj, token).then(({ success }) => {
                fetchLeavesByEmployee()
                setOpenLeavesModal(false)
            })
        }
    }
    
    async function getNonAdminUsers(){
        const nonAdminUsers =  await BackendApi.user.getNonAdminUsers(token);
        setNonAdminUsers(nonAdminUsers)
    }

    async function fetchLeavesForManager(){
        if(isManager){
            const leaves = await BackendApi.leaves.getLeavesByManager(userId, token)
            setLeaves(leaves)
        }
      }

      async function fetchLeavesByEmployee(){
        if(!isAdmin && !isManager){
            const leaves = await BackendApi.leaves.getLeavesByEmployee(userId, token)
            setLeaves(leaves)
        }
      }

    async function fetchTasksForEmpoyee() {
        if (!isManager && !isAdmin) {
            const tasks = await BackendApi.task.getAllTasksForEmployee(userId, token)
            setTasks(tasks)
        }
    }

    async function fetchTasksByManager(){
        if(isManager){
            const tasks = await BackendApi.task.getAllTasksByManager(userId, token)
            setTasks(tasks)
        }
      }

    useEffect(() => {
        if(isAdmin){
            getNonAdminUsers();
        }
        
          if(isManager){
            fetchLeavesForManager()
            fetchTasksByManager()
          }
          if(!isManager && !isAdmin){
              fetchTasksForEmpoyee()
              fetchLeavesByEmployee()
          }
          if(user == null){
              setTasks([]);
              setLeaves([])
          }
            // eslint-disable-next-line       
    }, [user, token, userId, isAdmin, isManager])

    return (
        <>
            {user && !isAdmin && <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5">Task List</Typography>
                {isManager && (
                    <Button variant="contained" color="primary" component={RouterLink} to="/admin/task/add">
                        Add Task
                    </Button>
                )}
            </div>}
            {user && !isAdmin && tasks.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Assigned To</TableCell>
                                        <TableCell align="right">Assigned By</TableCell>
                                        <TableCell>Progress</TableCell>
                                        {!isManager && !isAdmin && (
                                            <TableCell>Action</TableCell>
                                        )}
                                        <TableCell>Assigned on</TableCell>
                                        <TableCell>Updated on</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : tasks
                                    ).map((book) => (
                                        <TableRow key={book.taskId}>
                                            <TableCell component="th" scope="row">
                                                {book.taskName}
                                            </TableCell>
                                            <TableCell align="right">{book.assignedTo}</TableCell>
                                            <TableCell align="right">{book.assignedBy}</TableCell>
                                            <TableCell>{book.status}</TableCell>
                                            {!isManager && !isAdmin && book.status != 'Completed' &&(
                                                <TableCell>
                                                <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={(e) => {
                                                    setActiveTaskId(book.taskId)
                                                    setOpenTaskUpdateModal(true)
                                                }}
                                                >
                                                    Update Task progress
                                                </Button>
                                                </TableCell>
                                            )}
                                            <TableCell>{book.createdAt}</TableCell>
                                            <TableCell>{book.updatedAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={tasks.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                    </div>
                    <Modal open={openTaskUpdateModal} onClose={(e) => setOpenTaskUpdateModal(false)}>
                        <Card className={classes.conf_modal}>
                            <CardContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="status"
                                    label="Status"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                            </CardContent>
                            <CardActions className={classes.conf_modal_actions}>
                                <Button variant="contained" onClick={() => setOpenTaskUpdateModal(false)}>
                                    Cancel
                                            </Button>
                                <Button variant="contained" color="secondary" onClick={updateTask}>
                                    Update
                                            </Button>
                            </CardActions>
                        </Card>
                    </Modal>
                </>
            ) : (
                user && !isAdmin && <Typography variant="h5">No Tasks found!</Typography>
            )}

            {
                user && !isAdmin ? (
                    <>
                        <div className={`${classes.pageHeader} ${classes.mb2}`}>
                            <Typography variant="h5">Leaves</Typography>
                            {!isManager && !isAdmin && (
                                <Button variant="contained" color="primary" onClick={(e) => {
                                    setOpenLeavesModal(true)
                                }}>
                                    Apply for leave
                                </Button>
                            )}
                        </div>
                        <Modal open={openLeavesModal} onClose={(e) => setOpenLeavesModal(false)}>
                            <Card className={classes.conf_modal}>
                                <CardContent>
                                    <DatePicker
                                        label="Select Date"
                                        value={leaveDate}
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => {console.log("Hakuna " + newValue)
                                            setLeaveDate(newValue)}}
                                    />
                                </CardContent>
                                <CardActions className={classes.conf_modal_actions}>
                                    <Button variant="contained" onClick={() => setOpenLeavesModal(false)}>
                                        Cancel
                                            </Button>
                                    <Button variant="contained" color="secondary" onClick={applyForLeave}>
                                        Apply
                                    </Button>
                                </CardActions>
                            </Card>
                        </Modal>
                        {leaves.length > 0 ? (
                            <>
                                <div className={classes.tableContainer}>
                                    <TableContainer component={Paper}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Applied By</TableCell>
                                                    <TableCell align="right">Date of Absence</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    {isManager && <TableCell>Action</TableCell>}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {leaves.map((book) => (
                                                    <TableRow key={book.leaveId}>
                                                        <TableCell component="th" scope="row">
                                                            {book.appliedBy}
                                                        </TableCell>
                                                        <TableCell align="right">{book.dateOfAbsence}</TableCell>
                                                        <TableCell>{book.status}</TableCell>
                                                        <TableCell>
                                                            {
                                                                !isAdmin && isManager && book.status == 'Applied' &&
                                                                    <>
                                                                        <div className={classes.actionsContainer}>
                                                                            <Button
                                                                                variant="contained"
                                                                                size="small"
                                                                                onClick={(e) => {
                                                                                    acceptLeave(book.leaveId)
                                                                                }}
                                                                            >
                                                                                Accept
                                                                </Button>
                                                                            <Button
                                                                                variant="contained"                                                                                
                                                                                size="small"
                                                                                onClick={(e) => {
                                                                                    rejectLeave(book.leaveId)
                                                                                }}
                                                                            >
                                                                                Reject
                                                                </Button>
                                                                        </div>
                                                                        <div className={classes.actionsContainer}>
                                                                        </div>
                                                                    </>
                                                                
                                                            }

                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </>
                        ) : (
                            <Typography variant="h5">No leaves!</Typography>
                        )}
                    </>
                ) : (user && !isAdmin && <Typography variant="h5">No leaves!</Typography>)
            }
            { user && isAdmin && nonAdminUsers ? 
                (<>
                    <div className={`${classes.pageHeader} ${classes.mb2}`}>
                        <Typography variant="h5">User List</Typography>
                        <Button variant="contained" color="primary" component={RouterLink} to="/admin/users/add">
                            Add User
                        </Button>
                    </div>
                    { nonAdminUsers.length > 0 ? (
                        <>
                            <div className={classes.tableContainer}>
                                <TableContainer component={Paper}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>First Name</TableCell>
                                                <TableCell align="right">Last Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell align="right">Role</TableCell>

                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(rowsPerPage > 0
                                                ? nonAdminUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : nonAdminUsers
                                            ).map((book) => (
                                                <TableRow key={book.email}>
                                                    <TableCell component="th" scope="row">
                                                        {book.firstName}
                                                    </TableCell>
                                                    <TableCell align="right">{book.lastName}</TableCell>
                                                    <TableCell>{book.email}</TableCell>
                                                    <TableCell align="right">{book.role}</TableCell>

                                                    <TableCell>
                                                        <div className={classes.actionsContainer}>
                                                            {isAdmin && (
                                                                <>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        size="small"
                                                                        onClick={(e) => {
                                                                            setActiveUserId(book.userId)
                                                                            setOpenUserModal(true)
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    onRowsPerPageChange={(e) => {
                                        setRowsPerPage(parseInt(e.target.value, 10))
                                        setPage(0)
                                    }}
                                    component="div"
                                    count={nonAdminUsers.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={(e, newPage) => setPage(newPage)}
                                />
                                <Modal open={openUserModal} onClose={(e) => setOpenUserModal(false)}>
                                    <Card className={classes.conf_modal}>
                                        <CardContent>
                                            <h2>Are you sure?</h2>
                                        </CardContent>
                                        <CardActions className={classes.conf_modal_actions}>
                                            <Button variant="contained" onClick={() => setOpenUserModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={deleteNonAdminUser}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Modal>
                            </div>
                        </>
                    ) : (
                        <Typography variant="h5">No users found!</Typography>
                    )}
                </>
                )
                :
                (
                    <></>
                )

            }
        </>
    )
}