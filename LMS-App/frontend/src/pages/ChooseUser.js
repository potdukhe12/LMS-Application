import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group, EscalatorWarning } from '@mui/icons-material';
import styled from 'styled-components';

const ChooseUser = () => {
  const navigate = useNavigate();

  // const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false)

  const navigateHandler = (user) => {
    if (user === "Admin") {
      navigate('/Adminlogin');
    }

    else if (user === "Student") {
      navigate('/Studentlogin');
    }

    else if (user === "Teacher") {
      navigate('/Teacherlogin');
    }
  }

  useEffect(() => {
  }, [navigate]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <AccountCircle style={{ fontSize: 100 }} />
                </Box>
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
                <Box mb={2}>
                  <School style={{ fontSize: 100 }} />
                </Box>
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
                <Box mb={2}>
                  <Group style={{ fontSize: 100 }} />
                </Box>
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
                <Box mb={2}>
                  <EscalatorWarning style={{ fontSize: 75 }} />
                </Box>
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
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #7FFFD4);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  // align-items: center;
  padding: 3rem;
  // padding-top: 10vh;
  @media (max-width: 768px) {
    max-height: 180vh;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color:rgba(255, 255, 255, 0.6);
  cursor:pointer;

  &:hover {
    background-color: #088F8F;
    color:white;
  }
`;

const StyledTypography = styled.h1`
  margin-bottom: 15px;
`;