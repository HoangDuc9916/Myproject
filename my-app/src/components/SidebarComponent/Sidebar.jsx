import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PaidIcon from '@mui/icons-material/Paid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import StarBorder from '@mui/icons-material/StarBorder';
import { useState } from 'react';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <React.Fragment>
               
                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <Link to={'/'}>
                        <ListItemText primary="User Manager" />
                    </Link>
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <PaidIcon />
                    </ListItemIcon>
                    <Link to={'/post'}>
                        <ListItemText primary="Post" />
                    </Link>
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <Link to={'/comment'}>
                        <ListItemText primary="Comment" />
                    </Link>
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <Link to={'/todo'}>
                        <ListItemText primary="Todos" />
                    </Link>
                </ListItemButton>

            </React.Fragment>
        </>
    )
}

export default Sidebar;
