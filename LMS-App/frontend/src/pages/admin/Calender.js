import { Box, Typography } from '@mui/material';
import React from 'react';
import Calendar from 'react-calendar';

const CalendarComponent = ({ handleDateChange, selectedDate }) => {
    return (
        <div>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ fontWeight: 'bold' }}
            >
                Calendar
            </Typography>
            <Box sx={{ marginTop: '20px' }}>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="custom-calendar"
                />
            </Box>
        </div>
    );
};

export default CalendarComponent;
