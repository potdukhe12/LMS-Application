import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import 'react-calendar/dist/Calendar.css';
import '../../components/CalendarStyles.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';

import AccountMenu from '../../components/AccountMenu';
import Logout from '../Logout';
// import Calendar from 'react-calendar';
import CalendarComponent from './Calender';

const AdminDashboard = () => {
    
    const { currentUser } = useSelector((state) => state.user);

    const [open, setOpen] = useState(window.innerWidth >= 600);
    // to check if application is opened in mobile devices

    // const [selectedDate, setSelectedDate] = useState(new Date()); // State to track selected date

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute' sx={{
                        background: 'linear-gradient(to right, #54ffd7, #a0ffe9, #09a7a7)',
                        // height: '55px'
                    }}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="#088F8F"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color='#088F8F'
                            noWrap
                            sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '28px' }}
                        >
                            {currentUser.schoolName}
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            color='#088F8F'
                            // color='black'
                            noWrap
                            sx={{ flexGrow: 40, fontWeight: 'normal', fontSize: '16px' }}
                        >
                            (Admin Dashboard)
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled} style={{backgroundColor:"#088F8F"}} onClick={toggleDrawer}>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="white"
                            noWrap
                            sx={{ flexGrow: 1, marginLeft: '16px', fontWeight: 'bold' }}
                        >
                            Menu
                        </Typography>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <SideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Box sx={{                
                        '@media (max-width: 600px)': {
                            display: open ? 'none' : 'block',
                        },
                    }}>
                        <Toolbar />
                        <Routes>
                            {/* Admin */}
                            <Route path="/" element={<AdminHomePage />} />
                            <Route path='*' element={<Navigate to="/" />} />
                            <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                            <Route path="/Admin/profile" element={<AdminProfile />} />
                            <Route path="/Admin/complains" element={<SeeComplains />} />

                            {/* Notice */}
                            <Route path="/Admin/addnotice" element={<AddNotice />} />
                            <Route path="/Admin/notices" element={<ShowNotices />} />

                            {/* Subject */}
                            <Route path="/Admin/subjects" element={<ShowSubjects />} />
                            <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                            <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

                            <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                            <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                            <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                            <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                            {/* Class */}
                            <Route path="/Admin/addclass" element={<AddClass />} />
                            <Route path="/Admin/classes" element={<ShowClasses />} />
                            <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                            <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                            {/* Student */}
                            <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                            <Route path="/Admin/students" element={<ShowStudents />} />
                            <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                            <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                            <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                            {/* Teacher */}
                            <Route path="/Admin/teachers" element={<ShowTeachers />} />
                            <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                            <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                            <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                            <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                            <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />
                            
                            <Route path="/Admin/calendar" element={<CalendarComponent />} />

                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.white
                : theme.palette.grey[900],
        flexGrow: 1,
        // height: '85vh',
        overflow: 'auto',
        margin: '50px 50px 0px 50px',
        '@media (max-width: 600px)': {
            margin: '25px 10px 0px 10px',
        }, 
    },
    sideBoxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        // height: '100vh',
        padding: '4px',
        overflow: 'auto',
        marginTop: '10px',
        '@media (max-width: 600px)': {
            display: 'none', // Hide the box on screens with a width of 600px or less
        },
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}

export default AdminDashboard;
