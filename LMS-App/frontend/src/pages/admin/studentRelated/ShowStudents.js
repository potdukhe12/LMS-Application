import React, { useEffect } from 'react';
import {
    Paper, Box, IconButton, Button, Tooltip, MenuItem, MenuList, ClickAwayListener, Grow, Popper, ButtonGroup
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { useNavigate } from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { useDispatch, useSelector } from 'react-redux';

const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)

        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getAllStudents(currentUser._id));
        //     })
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
        };
    })

    // // Dummy data for students
    // const dummyStudentsList = [
    //     {
    //         name: 'John Doe',
    //         rollNum: '101',
    //         sclassName: 'Class A',
    //         id: 1,
    //     },
    //     {
    //         name: 'Jane Smith',
    //         rollNum: '102',
    //         sclassName: 'Class B',
    //         id: 2,
    //     },
    //     {
    //         name: 'Bob Johnson',
    //         rollNum: '103',
    //         sclassName: 'Class A',
    //         id: 3,
    //     },
    //     {
    //         name: 'Alice Williams',
    //         rollNum: '104',
    //         sclassName: 'Class B',
    //         id: 4,
    //     },
    //     {
    //         name: 'Charlie Brown',
    //         rollNum: '105',
    //         sclassName: 'Class A',
    //         id: 5,
    //     },
    //     {
    //         name: 'Eva Davis',
    //         rollNum: '106',
    //         sclassName: 'Class B',
    //         id: 6,
    //     },
    //     {
    //         name: 'Frank Martin',
    //         rollNum: '107',
    //         sclassName: 'Class A',
    //         id: 7,
    //     },
    //     {
    //         name: 'Grace Wilson',
    //         rollNum: '108',
    //         sclassName: 'Class B',
    //         id: 8,
    //     },
    //     {
    //         name: 'Henry Turner',
    //         rollNum: '109',
    //         sclassName: 'Class A',
    //         id: 9,
    //     },
    //     {
    //         name: 'Ivy Rodriguez',
    //         rollNum: '110',
    //         sclassName: 'Class B',
    //         id: 10,
    //     },
    // ];
    

    // const [showPopup, setShowPopup] = React.useState(false);
    // const [message, setMessage] = React.useState("");

    // const deleteHandler = (deleteID, address) => {
    //     setMessage("Sorry, the delete function has been disabled for now.");
    //     setShowPopup(true);
    // }

    // const studentColumns = [
    //     { id: 'name', label: 'Name', minWidth: 170 },
    //     { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    //     { id: 'sclassName', label: 'Class', minWidth: 170 },
    // ]

    // const studentRows = dummyStudentsList;

    const StudentButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate("/Admin/students/student/attendance/" + row.id)
        }
        const handleMarks = () => {
            navigate("/Admin/students/student/marks/" + row.id)
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };
        return (
            <>
                <Tooltip title="Delete Student" sx={{marginRight: '25px'}}>
                    <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                        <PersonRemoveIcon color="error" />
                    </IconButton>
                </Tooltip>
                <BlueButton variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}>
                    View
                </BlueButton>
                <React.Fragment>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                        <BlackButton
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </BlackButton>
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </React.Fragment>
            </>
        );
    };

    // const actions = [
    //     {
    //         icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
    //         action: () => navigate("/Admin/addstudents"),
    //     },
    //     {
    //         icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
    //         action: () => deleteHandler(1, "Students"), // Replace 1 with the actual user ID
    //     },
    // ];

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>
                                Add Students
                            </GreenButton>
                        </Box>
                        :
                        <Box sx={{ width: '100%', overflow: 'hidden' }}>
                            {
                                // Array.isArray(dummyStudentsList) && dummyStudentsList.length > 0 &&
                                Array.isArray(studentsList) && studentsList.length > 0 &&
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            }

                            {/* ////////////////////////// */}

                            {/* <SpeedDialTemplate actions={actions} /> */}

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '16px' }}>
                                <Button variant="contained" sx={{marginRight: '10px'}} onClick={() => navigate('/Admin/addstudents')}>
                                    <PersonAddAlt1Icon sx={{marginRight: '8px'}}/>
                                    Add New Student
                                </Button>
                                <Button variant="contained" color="error"
                                    //  onClick={() => deleteHandler(1, "Students")}
                                    >
                                    <PersonRemoveIcon sx={{marginRight: '8px'}}/>
                                    Delete All Students
                                </Button>
                            </Box>
                            
                            {/* ////////////////////////// */}
                                        
                        </Box>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowStudents;
