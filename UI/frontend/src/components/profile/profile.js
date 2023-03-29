import { useEffect, useState } from "react"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material"
import { NotificationManager } from "react-notifications"
import { BackendApi } from "../../client/backend-api"
import { useUser } from "../../context/user-context"
import { TabPanel } from "../tabs/tab"
import classes from "./styles.module.css"

export const Profile = () => {
    const { user, isAdmin, token, isManager } = useUser()
    const navigate = useNavigate()
    const [fetchedUser, setFetchedUser] = useState(null)
    const [openTab, setOpenTab] = useState(0)

    async function fetchData() {
        if (user) {
            const user = await BackendApi.user.getProfile(user.userId, token);
            if(fetchedUser){
                console.log("setting user" + fetchedUser)
                setFetchedUser(fetchedUser)
            }
            else{
                NotificationManager.error("Error while fetching user details")
            }
        }
      }

    useEffect(() => {       
          fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, token])

    return (
        user && (
            <div className={classes.wrapper}>
                <Typography variant="h5" align="center" style={{ marginBottom: 20 }}>
                    User Profile
                </Typography>
                <Card>
                    <Tabs
                        value={openTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e, tabIndex) => {
                            setOpenTab(tabIndex)
                        }}
                        centered
                    >
                        <Tab label="User Details" tabIndex={0} />
                    </Tabs>

                    <TabPanel value={openTab} index={0}>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" component="th" width="200">
                                            Name
                                        </TableCell>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" component="th">
                                            ID
                                        </TableCell>
                                        <TableCell>{user.userId}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" component="th">
                                            Email
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" component="th">
                                            Role
                                        </TableCell>
                                        <TableCell>{user.role}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </TabPanel>

                    <CardActions disableSpacing>
                        <div className={classes.btnContainer}>
                            {
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={RouterLink}
                                    to={`/user/update/${user.userId}`}
                                >
                                    Edit Profile
                                </Button>
                            }
                            <Button type="submit" variant="text" color="primary" onClick={() => navigate(-1)}>
                                Go Back
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    )
}