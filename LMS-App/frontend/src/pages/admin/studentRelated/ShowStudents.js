import React from 'react';
import {
    Paper, Box, IconButton
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
        // Add more dummy data as needed
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
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
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
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {Array.isArray(dummyStudentsList) && dummyStudentsList.length > 0 &&
                    <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                }
                <SpeedDialTemplate actions={actions} />
            </Paper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowStudents;
