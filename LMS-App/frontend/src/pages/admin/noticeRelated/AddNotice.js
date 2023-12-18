import React, { useEffect, useState } from 'react';
import { Button, TextField, CircularProgress, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const fields = { title, details, date, adminID };
  const address = 'Notice';

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <Box mb={2}>
          <Typography variant="h6">Add Notice</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </Grid>
          <Grid item md={2.5}>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </Grid>
          <Grid item md={6.5}>
            <TextField
              fullWidth
              label="Details"
              variant="outlined"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              required
            />
          </Grid>
          <Grid item md={6.5}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit" disabled={loader}>
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Add'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;
