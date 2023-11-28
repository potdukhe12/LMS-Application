import * as React from 'react';
import { Divider, ListSubheader } from '@mui/material';
import { useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CustomList from '../../components/CustomList';
import { EditCalendar } from '@mui/icons-material';

const SideBar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = React.useState('');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const isItemActive = (path) => location.pathname.startsWith(path);

    return (
        <>
            <React.Fragment>
                <CustomList
                    to="/"
                    icon={<HomeIcon />}
                    primaryText="Home"
                    isActive={location.pathname === ("/")}
                />
                <CustomList
                    to="/Admin/classes"
                    onClick={() => handleItemClick('/Admin/classes')}
                    icon={<ClassOutlinedIcon />}
                    primaryText="Classes / Batch"
                    isActive={isItemActive('/Admin/classes')}
                />
                <CustomList
                    to="/Admin/subjects"
                    onClick={() => handleItemClick('/Admin/subjects')}
                    icon={<AssignmentIcon />}
                    primaryText="Subjects / Cources"
                    isActive={isItemActive('/Admin/subjects')}
                />
                <CustomList
                    to="/Admin/teachers"
                    onClick={() => handleItemClick('/Admin/teachers')}
                    icon={<SupervisorAccountOutlinedIcon />}
                    primaryText="Teachers"
                    isActive={isItemActive('/Admin/teachers')}
                />
                <CustomList
                    to="/Admin/students"
                    onClick={() => handleItemClick('/Admin/students')}
                    icon={<PersonOutlineIcon />}
                    primaryText="Students"
                    isActive={isItemActive('/Admin/students')}
                />
                <CustomList
                    to="/Admin/notices"
                    onClick={() => handleItemClick('/Admin/notices')}
                    icon={<AnnouncementOutlinedIcon />}
                    primaryText="Notices"
                    isActive={isItemActive('/Admin/notices')}
                />
                <CustomList
                    to="/Admin/calendar"
                    onClick={() => handleItemClick('/Admin/calendar')}
                    icon={<EditCalendar />}
                    primaryText="Calendar"
                    isActive={isItemActive('/Admin/calendar')}
                />
                <CustomList
                    to="/Admin/complains"
                    onClick={() => handleItemClick('/Admin/complains')}
                    icon={<ReportIcon />}
                    primaryText="Complains"
                    isActive={isItemActive('/Admin/complains')}
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
                    icon={<AccountCircleOutlinedIcon />}
                    primaryText="Profile"
                    isActive={isItemActive('/Admin/profile')}
                />
                <CustomList
                    to="/logout"
                    onClick={() => handleItemClick('/logout')}
                    icon={<ExitToAppIcon />}
                    primaryText="Logout"
                    isActive={isItemActive('/logout')}
                />
            </React.Fragment>
        </>
    )
}

export default SideBar;


