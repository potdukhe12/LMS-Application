import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Button, Tooltip,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate();

    ////////////////////

    // const dispatch = useDispatch();
    // const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    // const { currentUser } = useSelector(state => state.user)

    // useEffect(() => {
    //     dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    // }, [currentUser._id, dispatch]);

    // if (error) {
    //     console.log(error);
    // }

    // const [showPopup, setShowPopup] = useState(false);
    // const [message, setMessage] = useState("");

    // const deleteHandler = (deleteID, address) => {
    //     console.log(deleteID);
    //     console.log(address);
    //     setMessage("Sorry the delete function has been disabled for now.")
    //     setShowPopup(true)

    //     // dispatch(deleteUser(deleteID, address))
    //     //     .then(() => {
    //     //         dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    //     //     })
    // }

    // const subjectColumns = [
    //     { id: 'subName', label: 'Sub Name', minWidth: 170 },
    //     { id: 'sessions', label: 'Sessions', minWidth: 170 },
    //     { id: 'sclassName', label: 'Class', minWidth: 170 },
    // ]

    // const subjectRows = subjectsList.map((subject) => {
    //     return {
    //         subName: subject.subName,
    //         sessions: subject.sessions,
    //         sclassName: subject.sclassName.sclassName,
    //         sclassID: subject.sclassName._id,
    //         id: subject._id,
    //     };
    // })

    // const SubjectsButtonHaver = ({ row }) => {
    //     return (
    //         <>
    //             <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
    //                 <DeleteIcon color="error" />
    //             </IconButton>
    //             <BlueButton variant="contained"
    //                 onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}>
    //                 View
    //             </BlueButton>
    //         </>
    //     );
    // };

    // const actions = [
    //     {
    //         icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
    //         action: () => navigate("/Admin/subjects/chooseclass")
    //     },
    //     {
    //         icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
    //         action: () => deleteHandler(currentUser._id, "Subjects")
    //     }
    // ];

    ///////////////////

    const loading = false;
    const error = null;
    const response = false;
    // const response = true;

    const [subjectsList, setSubjectsList] = useState([
        {
            _id: '1',
            subName: 'Math',
            sessions: 20,
            sclassName: {
                _id: '1',
                sclassName: 'Class A',
            },
        },
        {
            _id: '2',
            subName: 'Science',
            sessions: 18,
            sclassName: {
                _id: '2',
                sclassName: 'Class B',
            },
        },
        {
            _id: '3',
            subName: 'History',
            sessions: 15,
            sclassName: {
                _id: '1',
                sclassName: 'Class A',
            },
        },
    ]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    const deleteHandler = (deleteID, address) => {
        setMessage('Sorry, the delete function has been disabled for now.');
        setShowPopup(true);

        // You can add actual delete functionality here if needed
        // For now, we're just displaying a message
    };

    const subjectColumns = [
        { id: 'subName', label: 'Subject Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    });

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Delete Subject" sx={{ marginRight: '15px' }}>
                    <IconButton onClick={() => deleteHandler(row.id, 'Subject')}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
                <BlueButton
                    variant="contained"
                    onClick={() =>
                        navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)
                    }
                >
                    View
                </BlueButton>
            </>
        );
    };

    // const actions = [
    //     {
    //         icon: <PostAddIcon color="primary" />,
    //         name: 'Add New Subject',
    //         action: () => navigate('/Admin/subjects/chooseclass'),
    //     },
    //     {
    //         icon: <DeleteIcon color="error" />,
    //         name: 'Delete All Subjects',
    //         // action: () => deleteHandler(currentUser._id, 'Subjects'),
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
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/subjects/chooseclass")}>
                                Add Subjects
                            </GreenButton>
                        </Box>
                        :
                        <Box sx={{ width: '100%', height: '75vh', backgroundColor: 'white', overflow: 'hidden' }}>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 &&
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                            }

                            {/* ////////////////////////// */}

                            {/* <SpeedDialTemplate actions={actions} /> */}

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '16px' }}>
                                <Button variant="contained" sx={{marginRight: '10px'}} onClick={() => navigate('/Admin/subjects/chooseclass')}>
                                    <PostAddIcon sx={{marginRight: '5px'}}/>
                                    Add New Class
                                </Button>
                                <Button variant="contained" color="error"
                                    //  onClick={() => deleteHandler(currentUser._id, 'Subjects')}
                                    >
                                    <DeleteIcon sx={{marginRight: '5px'}}/>
                                    Delete All Classes
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

export default ShowSubjects;