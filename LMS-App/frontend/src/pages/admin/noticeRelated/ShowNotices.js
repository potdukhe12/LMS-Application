import React, { useEffect } from 'react';
import {
    Box, IconButton, Button, Tooltip
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { useNavigate } from 'react-router-dom';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const ShowNotices = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            })
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

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

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/addnotice")}>
                                Add Notice
                            </GreenButton>
                        </Box>
                        :
                        <Box sx={{ width: '100%', overflow: 'hidden' }}>
                            {
                                // Array.isArray(dummyNoticesList) && dummyNoticesList.length > 0 &&
                                Array.isArray(noticesList) && noticesList.length > 0 &&
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
                    }
                </>
            }
        </>
    );
};

export default ShowNotices;
