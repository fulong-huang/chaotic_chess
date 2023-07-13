import React, {useEffect, useState} from 'react';
import './RightHandMenu.css';
import { Box, Button, Drawer, CssBaseline, AppBar, List, Divider, ListItem, ListItemText, ButtonGroup} from '@mui/material';

const drawerWidth = 240;
const RightHandMenu = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1100);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            />
            {!isMobile && (
            <Drawer
                sx={{
                    display: 'flex',
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    // justifyContent: 'center', // Center the content inside the drawer
                    // marginTop: '64px',
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
                <ListItem>
                    <ListItemText sx={{ display: 'flex', justifyContent: 'center'}}>
                        <ButtonGroup variant="outlined" sx={{width:"200px" }}>
                            <Button>
                                <img src="imgs/queen3.png"/>
                            </Button>
                            <Button> 
                                <img src="imgs/rook3.png"/>
                            </Button>
                            <Button > 
                                <img src="imgs/knight3.png"/>
                            </Button>
                            <Button> 
                                <img src="imgs/bishop3.png"/>
                            </Button>
                        </ButtonGroup>
                    </ListItemText>
                </ListItem>
            </List>
            </Drawer>
            )}
        </Box>
    );
};

export default RightHandMenu;
