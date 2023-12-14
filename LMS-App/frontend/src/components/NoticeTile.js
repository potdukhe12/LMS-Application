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
  background: linear-gradient(to bottom, #fff, #eee);  /* Adjust colors as needed */
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: background 0.5s ease, border-radius 0.3s ease;

  &:hover {
    background: linear-gradient(to bottom, #eee, #ddd);  /* Adjust hover colors as needed */
    border-radius: 12px;
  }
`;

const NoticeTile = ({ title, details, date, ButtonHaver }) => {
  return (
    <Grid item xs={6} md={4} lg={3}>
      <StyledPaper>
        <Typography variant="h6">{title}</Typography>
        <Typography>{details}</Typography>
        <Typography>{date}</Typography>
        {ButtonHaver && (
          <div style={{ marginTop: '8px' }}>
            {ButtonHaver()}
          </div>
        )}
        {/* <ButtonHaver row={rows} /> */}
      </StyledPaper>
    </Grid>
  );
};

export default NoticeTile;
