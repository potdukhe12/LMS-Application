import React, {useState} from 'react';
import { Divider, ListSubheader } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { 
    Home as HomeIcon,        
    ClassOutlined as ClassIcon,
    PersonOutline as StudentIcon,
    AssignmentOutlined as SubjectIcon,
    SupervisorAccountOutlined as TeacherIcon,
    AnnouncementOutlined as NoticesIcon,
    EditCalendar,
    ReportOutlined as ComplainsIcon,
    AccountCircleOutlined as ProfileIcon,
    ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import CustomList from '../../components/CustomList';

const SideBar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const isItemActive = (path) => location.pathname.startsWith(path);

    return (
        <>
            <React.Fragment>
                <CustomList
                    to="/"
                    onClick={() => handleItemClick('Home')}
                    icon={<HomeIcon />}
                    primaryText="Home"
                    isActive={location.pathname === ("/")}
                />
                <CustomList
                    to="/Admin/classes"
                    onClick={() => handleItemClick('Classes')}
                    icon={<ClassIcon />}
                    primaryText="Classes / Batch"
                    isActive={isItemActive('/Admin/classes') || activeItem==='Classes'}
                />
                <CustomList
                    to="/Admin/subjects"
                    onClick={() => handleItemClick('Subjects')}
                    icon={<SubjectIcon />}
                    primaryText="Subjects / Cources"
                    isActive={isItemActive('/Admin/subjects') || activeItem==='Subjects'}
                />
                <CustomList
                    to="/Admin/teachers"
                    onClick={() => handleItemClick('Teachers')}
                    icon={<TeacherIcon />}
                    primaryText="Teachers"
                    isActive={isItemActive('/Admin/teachers') || activeItem==='Teachers'}
                />
                <CustomList
                    to="/Admin/students"
                    onClick={() => handleItemClick('Students')}
                    icon={<StudentIcon />}
                    primaryText="Students"
                    isActive={isItemActive('/Admin/students') || activeItem==='Students'}
                />
                <CustomList
                    to="/Admin/notices"
                    onClick={() => handleItemClick('Notices')}
                    icon={<NoticesIcon />}
                    primaryText="Notices"
                    isActive={isItemActive('/Admin/notices') || activeItem==='Notices'}
                />
                <CustomList
                    to="/Admin/calendar"
                    onClick={() => handleItemClick('Calendar')}
                    icon={<EditCalendar />}
                    primaryText="Calendar"
                    isActive={isItemActive('/Admin/calendar') || activeItem==='Calendar'}
                />
                <CustomList
                    to="/Admin/complains"
                    onClick={() => handleItemClick('Complains')}
                    icon={<ComplainsIcon />}
                    primaryText="Complains"
                    isActive={isItemActive('/Admin/complains') || activeItem==='Complains'}
                />
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <CustomList
                    to="/Admin/profile"
                    onClick={() => handleItemClick('/Admin/profile')}
                    icon={<ProfileIcon />}
                    primaryText="Profile"
                    isActive={isItemActive('/Admin/profile')}
                />
                <CustomList
                    to="/logout"
                    onClick={() => handleItemClick('/logout')}
                    icon={<LogoutIcon />}
                    primaryText="Logout"
                    isActive={isItemActive('/logout')}
                />
            </React.Fragment>
        </>
    )
}

export default SideBar;


