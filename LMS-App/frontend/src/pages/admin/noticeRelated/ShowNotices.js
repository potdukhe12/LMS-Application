import React, { useEffect } from 'react';
import {
    Box, IconButton, Button, Tooltip, Grid
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { GreenButton } from '../../../components/buttonStyles';
// import TableTemplate from '../../../components/TableTemplate';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { useNavigate } from 'react-router-dom';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import NoticeTile2 from '../../../components/NoticeTile2';

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
        { id: 'title', label: 'Title', minWidth: 120 },
        { id: 'details', label: 'Details', minWidth: 150 },
        { id: 'date', label: 'Date', minWidth: 170, align: 'center' },
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

    const sortedNoticeRows = noticeRows && noticeRows.length > 0
    ? noticeRows.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const currentDate = new Date();

        // Check if notices are today
        const isTodayA = dateA.toDateString() === currentDate.toDateString();
        const isTodayB = dateB.toDateString() === currentDate.toDateString();

        // Check if notices are tomorrow
        const isTomorrowA = new Date(dateA.getTime() + 86400000).toDateString() === new Date(currentDate.getTime() + 86400000).toDateString();
        const isTomorrowB = new Date(dateB.getTime() + 86400000).toDateString() === new Date(currentDate.getTime() + 86400000).toDateString();

        // Check if notices are expired
        const isExpiredA = dateA < currentDate;
        const isExpiredB = dateB < currentDate;

        // Sort by Today, Tomorrow, Upcoming, and then Expired
        if (isTodayA && !isTodayB) return -1;
        if (!isTodayA && isTodayB) return 1;

        if (isTomorrowA && !isTomorrowB) return -1;
        if (!isTomorrowA && isTomorrowB) return 1;

        if (!isExpiredA && isExpiredB) return -1;
        if (isExpiredA && !isExpiredB) return 1;

        // If both are in the same category, sort by date
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        return 0;
      })
    : [];


    const NoticeButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Delete">
                    <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
                        <DeleteIcon sx={{fontSize:'1em'}} color="white" />
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
                        <>
                        <Box sx={{ width: '100%', overflow: 'hidden' }}>
                            {/* {
                                Array.isArray(noticesList) && noticesList.length > 0 &&
                                <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                            } */}
                            {/* <Grid container spacing={2}>
                                {
                                    Array.isArray(noticesList) && noticesList.length > 0 &&
                                    <NoticeTile2 buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                                }
                            </Grid> */}
                            <Grid container spacing={2}>
                                {Array.isArray(sortedNoticeRows) && sortedNoticeRows.length > 0 && (
                                    <NoticeTile2 buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={sortedNoticeRows} />
                                )}
                            </Grid>
                        </Box>
                        {/* <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '16px' }}> */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '16px' }}>
                            <Button variant="contained" onClick={() => navigate("/Admin/addnotice")}>
                                <NoteAddIcon sx={{ marginRight: '5px' }} />
                                Add New Notice
                            </Button>
                            <Button variant="contained" color="error" sx={{ marginLeft: "12px" }}>
                                <DeleteIcon sx={{ marginRight: '5px' }} />
                                Delete All Notices
                            </Button>
                        </Box>
                        </>
                    }
                </>
            }
        </>
    );
};

export default ShowNotices;
