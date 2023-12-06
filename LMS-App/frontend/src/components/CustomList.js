import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomList = ({
  to,
  onClick,
  icon,
  primaryText,
  isActive,
}) => {
  return (
    <ListItemButton
      component={Link}
      to={to}
      onClick={onClick}
      sx={{
        background: isActive
          ? 'linear-gradient(to top, #b3ffed, #eefffb)'
          : 'inherit',
          borderLeft: isActive ? '4px solid #088F8F' : 'none',
          paddingLeft: '20px',
      }}
    >
      <ListItemIcon>
        {React.cloneElement(icon, {
          style: {
            color: isActive ? '#088F8F' : 'inherit',
            fontSize: '26',
          },
        })}
      </ListItemIcon>
      <ListItemText
        primary={primaryText}
        primaryTypographyProps={{
          style: {
            color: isActive ? '#088F8F' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
          },
        }}
      />
    </ListItemButton>
  );
};

export default CustomList;
