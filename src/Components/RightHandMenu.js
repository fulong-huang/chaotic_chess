import React from 'react';
import './RightHandMenu.css';
import { Box, Button, Drawer, CssBaseline, AppBar, List, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';

const drawerWidth = 240;

const RightHandMenu = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            />
            <Drawer
                sx={{
                    display: 'flex',
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    // justifyContent: 'center', // Center the content inside the drawer
                    },
                }}
                variant="permanent"
                anchor="right"
            >
            <List>
                <ListItem>
                    <ListItemText sx={{ display: 'flex', justifyContent: 'center'}} >White Players</ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText sx={{ display: 'flex', justifyContent: 'center'}}>Black Players</ListItemText>
                </ListItem>
                {/* <ListItem>
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center'}}  > Hello </ListItemButton>
                </ListItem> */}
                <ListItem>
                    <ListItemText sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained">
                            Hello
                        </Button>
                        <Button variant="contained" sx={{ marginLeft: '20px' }}> 
                            Bye
                        </Button>
                    </ListItemText>
                </ListItem>
            </List>
            </Drawer>
        </Box>
    );
};

export default RightHandMenu;
