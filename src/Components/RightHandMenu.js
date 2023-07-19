import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import './RightHandMenu.css';
import {
  Box,
  Button,
  Drawer,
  CssBaseline,
  AppBar,
  List,
  Divider,
  ListItem,
  ListItemText,
  ButtonGroup
} from '@mui/material';
import ChessboardNode from './scripts/ChessboardLogic';

const drawerWidth = 240;
const RightHandMenu = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const [selectedButton, setSelectedButton] = useState('Q');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName === selectedButton ? null : buttonName);
    props.chessboard.setPromoteTo(buttonName);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
              <ListItemText sx={{ display: 'flex', justifyContent: 'center' }}>
                White Players
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText sx={{ display: 'flex', justifyContent: 'center' }}>
                Black Players
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonGroup variant="outlined" sx={{ width: '200px' }}>
                  <Button
                    variant={selectedButton === 'Q' ? 'contained' : 'outlined'}
                    onClick={() => handleButtonClick('Q')}
                  >
                    <img src="imgs/queen3.png" alt="Queen" />
                  </Button>
                  <Button
                    variant={selectedButton === 'R' ? 'contained' : 'outlined'}
                    onClick={() => handleButtonClick('R')}
                  >
                    <img src="imgs/rook3.png" alt="Rook" />
                  </Button>
                  <Button
                    variant={selectedButton === 'N' ? 'contained' : 'outlined'}
                    onClick={() => handleButtonClick('N')}
                  >
                    <img src="imgs/knight3.png" alt="Knight" />
                  </Button>
                  <Button
                    variant={selectedButton === 'B' ? 'contained' : 'outlined'}
                    onClick={() => handleButtonClick('B')}
                  >
                    <img src="imgs/bishop3.png" alt="Bishop" />
                  </Button>
                </ButtonGroup>
              </ListItemText>
            </ListItem>
          </List>
          {/* <Button variant="contained" href="./lobby">
            TEST BUTTON TO GO TO LOBBY
          </Button> */}
        </Drawer>
      )}
    </Box>
  );
};

export default RightHandMenu;
