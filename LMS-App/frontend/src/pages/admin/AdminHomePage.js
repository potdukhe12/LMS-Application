import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
// import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;   

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 0, mb: 0 }}>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={4} lg={4}>
                        <StyledPaper 
                            onClick={() => navigate(`/Admin/students`)} 
                            sx={{                
                                '@media (max-width: 600px)': {
                                    flexDirection: 'column',
                                },
                            }}>
                            <img src={Students} alt="Students" />
                            <Title>Total Students</Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4}>
                        <StyledPaper 
                            onClick={() => navigate(`/Admin/classes`)}
                            sx={{                
                                '@media (max-width: 600px)': {
                                    flexDirection: 'column',
                                },
                            }}>
                            <img src={Classes} alt="Classes" />
                            <Title>
                                Total Classes
                            </Title>
                            <Data start={0} end={numberOfClasses} duration={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <StyledPaper onClick={() => navigate(`/Admin/teachers`)}>
                            <img src={Teachers} alt="Teachers" />
                            <Title>
                                Total Teachers
                            </Title>
                            <Data start={0} end={numberOfTeachers} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <div sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};


const StyledPaper = styled(Paper)`
padding: 16px;
display: flex;
min-height: 140px;
justify-content: space-around;
align-items: center;
text-align: center;
background: linear-gradient(to bottom, #02aeae, #b4ffee, #54ffd7, #54ffd7, #54ffd7, #09a7a7);  // Change the background on hover
cursor: pointer; 

&:hover {
    background: linear-gradient(to bottom, #b4ffee, #03ffc5);
    border-radius: 15px;
    transition: background 0.5s ease, border-radius 0.3s ease;
}`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(2.6rem + .6vw);
  color: #088F8F;
`;

export default AdminHomePage