import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom'
import { authLogout } from '../../redux/userRelated/userSlice';
import { Button, Collapse } from '@mui/material';
import styled from 'styled-components';

// import { useSelector } from 'react-redux';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit profile';

    const navigate = useNavigate()
    const dispatch = useDispatch();
        // const { currentUser } = useSelector((state) => state.user);
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin"

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(updateUser(fields, currentUser._id, address))
    }

    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, "Students"));
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <StyledDiv>
            <UserInfoContainer>
      <span><strong>Name:</strong> {currentUser.name}</span>
      <span><strong>Email:</strong> {currentUser.email}</span>
      <span><strong>School:</strong> {currentUser.schoolName}</span>
    </UserInfoContainer>
            <Button variant="contained" 
                color="error" 
                onClick={deleteHandler}
                disabled='Disabled'>
              Delete
            </Button>
            <Button variant="contained" sx={styles.showButton}
                onClick={() => setShowTab(!showTab)}>
                {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
            </Button>
            <Collapse in={showTab} timeout="auto" unmountOnExit>
                <div className="register">
                    <form className="registerForm" onSubmit={submitHandler}>
                        <h4 className="registerTitle">Edit Details</h4>
                        <label>Name</label>
                        <input className="registerInput" type="text" placeholder="Enter your name..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required />

                        <label>School</label>
                        <input className="registerInput" type="text" placeholder="Enter your school name..."
                            value={schoolName}
                            onChange={(event) => setSchoolName(event.target.value)}
                            autoComplete="name" required />

                        <label>Email</label>
                        <input className="registerInput" type="email" placeholder="Enter your email..."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email" required />

                        <label>Password</label>
                        <input className="registerInput" type="password" placeholder="Enter your password..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password" />

                        <button className="registerButton" type="submit" >Update</button>
                    </form>
                </div>
            </Collapse>
        </StyledDiv>
    )
}

export default AdminProfile

const styles = {
    attendanceButton: {
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    }
}

const StyledDiv = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  min-height: 450px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, #b4ffee, #03ffc5);
  border-radius: 12px;

  h4 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    display: block;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }

  button {
    background-color: #270843;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3f1068;
    }
  }
`;

const UserInfoContainer = styled.div`
  margin-bottom: 20px;
  padding: 25px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;

  span {
    display: block;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  strong {
    color: #270843;
  }
`;