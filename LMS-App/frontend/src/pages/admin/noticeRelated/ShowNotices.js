import React, { useEffect } from 'react';
import {
    Paper, Box, IconButton, Button, Tooltip
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { useNavigate } from 'react-router-dom';

const ShowNotices = () => {

    const navigate = useNavigate();

    // Dummy data for notices
    const dummyNoticesList = [
        {
            title: 'Important Notice 1',
            details: 'This is the first important notice.',
            date: '2023-01-15',
            id: 1,
        },
        {
            title: 'Event Reminder 2',
            details: 'Don\'t forget about the upcoming event!',
            date: '2023-02-20',
            id: 2,
        },
        {
            title: 'Important Notice 3',
            details: 'This is the first important notice.',
            date: '2023-01-15',
            id: 3,
        },
        {
            title: 'Event Reminder 4',
            details: 'Don\'t forget about the upcoming event!',
            date: '2023-02-20',
            id: 4,
        },
        {
            title: 'Important Notice 5',
            details: 'This is the first important notice.',
            date: '2023-01-15',
            id: 5,
        },
        {
            title: 'Event Reminder 6',
            details: 'Don\'t forget about the upcoming event!',
            date: '2023-02-20',
            id: 6,
        },
    ];

    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = dummyNoticesList;

    const NoticeButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Delete">
                    <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
            </>
        );
    };

    // const actions = [
    //     {
    //         icon: <NoteAddIcon color="primary" />, name: 'Add New Notice',
    //         action: () => navigate("/Admin/addnotice")
    //     },
    //     {
    //         icon: <DeleteIcon color="error" />, name: 'Delete All Notices',
    //         action: () => deleteHandler(1, "Notices"), // Replace 1 with the actual user ID
    //     }
    // ];

    return (
        <>
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                {Array.isArray(dummyNoticesList) && dummyNoticesList.length > 0 &&
                    <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                }

                {/* ////////////////////////// */}
  
                {/* <SpeedDialTemplate actions={actions} /> */}
  
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '16px' }}>
                  <Button variant="contained" sx={{marginRight: '10px'}} onClick={() => navigate("/Admin/addnotice")}>
                    <NoteAddIcon sx={{marginRight: '5px'}}/>
                    Add New Notice
                  </Button>
                  <Button variant="contained" color="error"
                        //  onClick={() => deleteHandler(adminID, "Sclasses")}
                      >
                    <DeleteIcon sx={{marginRight: '5px'}}/>
                    Delete All Notices
                  </Button>
                </Box>
                
                {/* ////////////////////////// */}
  
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowNotices;
