import { useState } from 'react';
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
// import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

// import AddStudent from './studentRelated/AddStudent';
// import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
// import StudentAttendance from './studentRelated/StudentAttendance';
// import StudentExamMarks from './studentRelated/StudentExamMarks';
// import ViewStudent from './studentRelated/ViewStudent';

// import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
// import SubjectForm from './subjectRelated/SubjectForm';
// import ViewSubject from './subjectRelated/ViewSubject';

// import AddTeacher from './teacherRelated/AddTeacher';
// import ChooseClass from './teacherRelated/ChooseClass';
// import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
// import TeacherDetails from './teacherRelated/TeacherDetails';

// import AddClass from './classRelated/AddClass';
// import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';
import Logout from '../Logout';
import Calendar from 'react-calendar';

const AdminDashboard = () => {
    const [open, setOpen] = useState(window.innerWidth >= 600);
    // to check if application is opened in mobile devices

    const [selectedDate, setSelectedDate] = useState(new Date()); // State to track selected date

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
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
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1, fontWeight: 'bold' }}
                        >
                            Admin Dashboard
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
                            sx={{ flexGrow: 1, marginLeft: '14px', fontWeight: 'bold' }}
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
                    <Toolbar />
                    <Routes>
                        {/* //Admin */}
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard"  />
                        <Route path="/Admin/profile"  />
                        <Route path="/Admin/complains"  />

                        {/* //Notice */}
                        <Route path="/Admin/addnotice" />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* //Subject */}
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID"  />
                        <Route path="/Admin/subjects/chooseclass"  />
                        <Route path="/Admin/addsubject/:id"  />
                        <Route path="/Admin/class/subject/:classID/:subjectID"  />
                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID"  />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID"  />

                        {/* //Class */}
                        <Route path="/Admin/addclass"  />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id"  />
                        <Route path="/Admin/class/addstudents/:id"  />

                        {/* //Student */}
                        <Route path="/Admin/addstudents"  />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id"  />
                        <Route path="/Admin/students/student/attendance/:id"  />
                        <Route path="/Admin/students/student/marks/:id"  />

                        {/* //Teacher */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id"  />
                        <Route path="/Admin/teachers/chooseclass"  />
                        <Route path="/Admin/teachers/choosesubject/:id"  />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID"  />
                        <Route path="/Admin/teachers/addteacher/:id"  />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
                <Box component="main" sx={styles.sideBoxStyled}>
                    <Toolbar />
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1, fontWeight: 'bold' }}
                        >
                            Notice Section
                    </Typography>
                    <Box sx={{ marginTop: '20px' }}>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            className="custom-calendar"
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboard

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
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