import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group, EscalatorWarning } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import bgImage from '../assets/bg4.jpg';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    const password = "zxc"
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "admin@123.com"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Sanki Singh"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container sx={{padding: '3rem'}}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <AccountCircle style={{ fontSize: 100 }} />
                <StyledTypography>
                  Admin
                </StyledTypography>
                Login as an administrator to access the dashboard to manage app data.
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Student")}>
                <School style={{ fontSize: 100 }} />
                <StyledTypography>
                  Student
                </StyledTypography>
                Login as a student to explore course materials and assignments.
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Teacher")}>
                <Group style={{ fontSize: 100 }} />
                <StyledTypography>
                  Teacher
                </StyledTypography>
                Login as a teacher to create courses, assignments, and track student progress.
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Parent")}>
                <EscalatorWarning style={{ fontSize: 75 }} />
                <StyledTypography>
                  Parent
                </StyledTypography>
                Login as a parent and track student progress.
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  // background: linear-gradient(to bottom, #411d70, #7FFFD4);
  // background: url(${bgImage});
  background: linear-gradient(rgb(255, 255, 255, 0.5), rgb(255, 255, 255, 0.5)), url(${bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 1rem;
  // padding-top: 10vh;
  @media (max-width: 768px) {
    min-height: 190vh;
    // padding-top: 5vh;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  cursor:pointer;
  opacity: 0.9;

  background: linear-gradient(135deg, #EDEDED, #ffffff);
  &:hover {
    background: linear-gradient(135deg, #088f8f, #1f1f38);
    color: white;
    transition: background-color 0.3s ease, color 0.8s ease;
  }
`;

const StyledTypography = styled.h1`
  margin-bottom: 15px;
`;