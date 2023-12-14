import React, { useState } from 'react';
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

const NoticeTile2 = ({ buttonHaver: ButtonHaver, rows, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  return (
    <>
    {rows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => {
          return (
        <Grid item xs={6} md={4} lg={3}>
          <StyledPaper>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                  <div key={column.id} align={column.align}>
                      {
                          column.format && typeof value === 'number'
                              ? column.format(value)
                              : value
                      }
                  </div>
              );
              })}
              {ButtonHaver && (
                // <div style={{ marginTop: '8px' }}>
                  <ButtonHaver row={row} />
                // </div>
              )}
            {/* <ButtonHaver row={row} /> */}
          </StyledPaper>
        </Grid>
          )})}
    </>
  );
};

export default NoticeTile2;
