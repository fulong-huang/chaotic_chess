import React, { useEffect, useState } from 'react';
import ChessboardNode from './scripts/ChessboardLogic.js';
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

export default function Lobby(props) {
    return (
        <Box
            sx={{
                height: '100vh',
                overflow: 'auto',
                backgroundColor: '#282c34',
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    paddingTop: '30px'
                }}
            >
                <img 
                    src="imgs/chaotic-chess-logo.png" 
                    alt="chaotic chess logo"
                    style={{
                        height: "auto",
                        width: "100%",
                        maxWidth: "350px",
                    }}
                />
            </Box>
        </Box>
    );
}
