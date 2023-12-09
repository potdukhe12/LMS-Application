import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Tooltip, IconButton } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import Popup from '../../../components/Popup';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';

const ShowTeachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    if (loading) {
        return <div>Loading...</div>;
    } else if (response) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/chooseclass")}>
                    Add Teacher
                </GreenButton>
            </Box>
        );
    } else if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)

        // dispatch(deleteUser(deleteID, address)).then(() => {
        //     dispatch(getAllTeachers(currentUser._id));
        // });
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || null,
            teachSclass: teacher.teachSclass.sclassName,
            teachSclassID: teacher.teachSclass._id,
            id: teacher._id,
        };
    });

    const TeachersButtonHaver = ({ row }) => {
        return (
            <>
                <BlueButton 
                    variant="contained" 
                    onClick={() => navigate(`/Admin/teachers/teacher/${row.id}`)}
                    sx={{ marginRight: '30px' }}>
                    View
                </BlueButton>
                <Tooltip title="Remove Teacher" sx={{ marginRight: '15px' }}>
                    <IconButton onClick={() => deleteHandler(row.id, 'Teacher')}>
                        <PersonRemoveIcon color="error" />
                    </IconButton>
                </Tooltip>
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
                <Button variant="contained" color="error" onClick={() => deleteHandler(currentUser._id, "Teachers")}>
                    Delete All Teachers
                </Button>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowTeachers;
