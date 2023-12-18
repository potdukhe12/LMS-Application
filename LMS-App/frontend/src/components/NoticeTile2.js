import React from 'react';
import { Grid, Paper } from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  position: relative;
  padding: 12px;
  margin: 8px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, #fff, #eee);
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  // transition: background 0.5s ease, border-radius 0.3s ease;

  > div {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &::before {
    content: "${({ date }) => {
      const targetDate = new Date(date);
      const currentDate = new Date();
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      
      const formattedTargetDate = targetDate.toLocaleDateString();
      const formattedCurrentDate = currentDate.toLocaleDateString();
      const formattedTomorrow = tomorrow.toLocaleDateString();
      
      if (formattedTargetDate === formattedCurrentDate) {
        return 'Today';
      } else if (targetDate < currentDate) {
        return 'Expired';
      } else if (formattedTargetDate === formattedTomorrow) {
        return 'Tomorrow';
      } else {
        // Calculate the difference in days
        const timeDifference = targetDate.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
        return `In ${daysDifference} days`;
      }
    }}";
    
    font-weight: bold;
    position: absolute;
    bottom: 10px;
    left: -8px;
    align-items: center;
    text-align: center;
    background-color: ${({ date }) => {
      const targetDate = new Date(date);
      const currentDate = new Date();
      
      return targetDate < currentDate ? 'red' : 'green';
    }};
    color: white;
    padding: 8px;
    height: 30px;
    font-size: 0.7em;
    // width: 80px;
    border-radius: 8px;
    // transform: rotate(320deg);
    transform-origin: 0% 0%;
  }
  

  &:hover {
    background: linear-gradient(to bottom, #eee, #ddd);
    // border-radius: 25px 25px 8px 8px;
    border-radius: 12px;
    transition: background 0.5s ease, border-radius 0.3s ease;

    > div {
      max-height: none;
      -webkit-line-clamp: 10;
      font-size: 0.95rem;
    }
  }
  transition: background 0.5s ease, border-radius 0.3s ease;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  color: #3498db;
  font-size: 1.3em;
`;

const StyledButtonHaver = styled.div`
  position: absolute;
  bottom: -1px;
  right: -1px;
  padding: 0px 3px;
  background-color: #3498db;
  border-radius: 30px 0 4px 0px;
  transition: background-color 0.5s ease, border-radius 0.3s ease;

  &:hover {
    border-radius: 20px 0 8px 0px;
    background-color: red;
  }
`;

const StyledDate = styled.div`
  position: absolute;
  top: 4px;
  right: 10px;
  font-size: 0.8em; 
  color: grey;
  font-style: italic;
`;

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
};

const NoticeTile2 = ({ buttonHaver: ButtonHaver, rows, columns }) => (
  <>
    {rows.map((row) => (
      <Grid item xs={6} md={4} lg={4} key={row.id}>
        <StyledPaper date={row.date}>
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <div key={column.id} align={column.align}>
                {column.id === 'title' ? (
                  <StyledTitle>{value}</StyledTitle>
                ) : (
                  column.id === 'date' && typeof value === 'string' ? (
                    <StyledDate>{formatDate(value)}</StyledDate>
                  ) : (
                    <div style={{ marginBottom: "24px" }}>{value}</div>
                  )
                )}
              </div>
            );
          })}
          {ButtonHaver && (
            <StyledButtonHaver>
              <ButtonHaver row={row} />
            </StyledButtonHaver>
          )}
        </StyledPaper>
      </Grid>
    ))}
  </>
);

export default NoticeTile2;
