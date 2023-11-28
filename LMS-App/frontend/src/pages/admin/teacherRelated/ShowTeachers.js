import React, { useState } from 'react';
import { Paper, Box, Button, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlueButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import Popup from '../../../components/Popup';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    const dummyTeachersList = [
        {
            name: 'John Doe',
            teachSubject: 'Math',
            teachSclass: 'Class A',
            teachSclassID: 1,
            id: 1,
        },
        {
            name: 'Jane Smith',
            teachSubject: 'Science',
            teachSclass: 'Class B',
            teachSclassID: 2,
            id: 2,
        },
        // Add more dummy data as needed
    ];

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    const deleteHandler = (deleteID, address) => {
        setMessage('Sorry, the delete function has been disabled for now.');
        setShowPopup(true);
    };

    const columns = [
        { id: 'name', label: 'Teacher Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = dummyTeachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject,
            teachSclass: teacher.teachSclass,
            teachSclassID: teacher.teachSclassID,
            id: teacher.id,
        };
    });

    const TeachersButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Remove Teacher" sx={{ marginRight: '15px' }}>
                    <IconButton onClick={() => deleteHandler(row.id, 'Teacher')}>
                        <PersonRemoveIcon color="error" />
                    </IconButton>
                </Tooltip>
                <BlueButton 
                    variant="contained" 
                    onClick={() => navigate(`/Admin/teachers/teacher/${row.id}`)}
                    >
                    View
                </BlueButton>
            </>
        );
    };

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <TableTemplate buttonHaver={TeachersButtonHaver} columns={columns} rows={rows} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '16px' }}>
                <Button variant="contained" sx={{ marginRight: '10px' }} onClick={() => navigate('/Admin/teachers/chooseclass')}>
                    Add New Teacher
                </Button>
                <Button variant="contained" color="error">
                    Delete All Teachers
                </Button>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowTeachers;
