import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 16px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  min-height: 150px;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, #ddd, #fff);  /* Adjust colors as needed */
  cursor: pointer;

  &:hover {
    background: linear-gradient(to bottom, #ddd, #eee);  /* Adjust hover colors as needed */
    border-radius: 40px;
    transition: background 0.5s ease, border-radius 0.3s ease;
  }
`;

const NoticeTile = ({ title, details, date }) => {
  return (
    <Grid item xs={6} md={4} lg={3}>
        <StyledPaper>
            <Typography variant="h6">{title}</Typography>
            <Typography>{details}</Typography>
            <Typography>{date}</Typography>
        </StyledPaper>
    </Grid>
  );
};

export default NoticeTile;
