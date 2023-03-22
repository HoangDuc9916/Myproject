import { Typography } from '@mui/material';
import React from 'react';




const Header = ({ title }) => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", width: '100%', }}>
                
                <Typography
                    component="h1"
                    variant="h4"
                    color="inherit"
                    noWrap
                >
                    {title}
                </Typography>
               
            </div>
        </>
    )
}

export default Header;