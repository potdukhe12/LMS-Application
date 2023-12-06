import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, #b4ffee, #54ffd7, #54ffd7, #54ffd7, #09a7a7);
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: linear-gradient(to bottom, #b4ffee, #03ffc5);
  }
`;

const NoticeTile = ({ title, details, date }) => {
  return (
    <Grid item xs={12} md={3} lg={3}>
        <StyledPaper>
            <Typography variant="h6">{title}</Typography>
            <Typography>{details}</Typography>
            <Typography>{date}</Typography>
        </StyledPaper>
    </Grid>
  );
};

export default NoticeTile;
