import React from 'react';
import {
    Paper, Box, IconButton, Button, Tooltip
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { useNavigate } from 'react-router-dom';

const ShowStudents = () => {
    const navigate = useNavigate();

    // Dummy data for students
    const dummyStudentsList = [
        {
            name: 'John Doe',
            rollNum: '101',
            sclassName: 'Class A',
            id: 1,
        },
        {
            name: 'Jane Smith',
            rollNum: '102',
            sclassName: 'Class B',
            id: 2,
        },
        {
            name: 'Bob Johnson',
            rollNum: '103',
            sclassName: 'Class A',
            id: 3,
        },
        {
            name: 'Alice Williams',
            rollNum: '104',
            sclassName: 'Class B',
            id: 4,
        },
        {
            name: 'Charlie Brown',
            rollNum: '105',
            sclassName: 'Class A',
            id: 5,
        },
        {
            name: 'Eva Davis',
            rollNum: '106',
            sclassName: 'Class B',
            id: 6,
        },
        {
            name: 'Frank Martin',
            rollNum: '107',
            sclassName: 'Class A',
            id: 7,
        },
        {
            name: 'Grace Wilson',
            rollNum: '108',
            sclassName: 'Class B',
            id: 8,
        },
        {
            name: 'Henry Turner',
            rollNum: '109',
            sclassName: 'Class A',
            id: 9,
        },
        {
            name: 'Ivy Rodriguez',
            rollNum: '110',
            sclassName: 'Class B',
            id: 10,
        },
    ];
    

    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const studentRows = dummyStudentsList;

    const StudentButtonHaver = ({ row }) => {
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
            </>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/addstudents"),
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(1, "Students"), // Replace 1 with the actual user ID
        },
    ];

    return (
        <>
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                {Array.isArray(dummyStudentsList) && dummyStudentsList.length > 0 &&
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
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowStudents;
