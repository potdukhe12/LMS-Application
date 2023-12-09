import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Box, Typography, CircularProgress, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [sclassName, setSclassName] = useState('')

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }
    

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <form onSubmit={submitHandler}>
                <Box mb={2}>
                    <Typography variant="h6">Add Student</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            placeholder="Enter student's name..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name"
                            required
                            sx={styles.inputField}
                        />
                    </Grid>
                    {situation === "Student" && (
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="Class"
                                variant="outlined"
                                value={className}
                                onChange={changeHandler}
                                required
                                sx={styles.inputField}
                            >
                                <MenuItem value='Select Class'>Select Class</MenuItem>
                                {sclassesList.map((classItem, index) => (
                                    <MenuItem key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Grid>
                    )}
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Roll Number"
                            variant="outlined"
                            type="number"
                            placeholder="Enter student's Roll Number..."
                            value={rollNum}
                            onChange={(event) => setRollNum(event.target.value)}
                            required
                            sx={styles.inputField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            placeholder="Enter student's password..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password"
                            required
                            sx={styles.inputField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="primary" type="submit" disabled={loader} sx={styles.inputField}>
                                {loader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Add'
                                )}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddStudent;


const styles = {
    inputField: {
      '& .MuiInputLabel-root': {
        color: '#838080',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#838080',
      },
    },
  };