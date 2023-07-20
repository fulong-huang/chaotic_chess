import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
    Box,
    TextField,
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

const socket = io("ws://localhost:5000");

export default function Lobby(props) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastMessage, setLastMessage] = useState(null);
    const [user, setUser] = useState(null);
    const [tempUser, setTempUser] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        socket.on('message', data => {
            setLastMessage(`${data.message} from ${data.user}`);
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (user && user.trim() !== "") {
            socket.emit("hello!", { user, message: "Hello, everyone!" });
        }
    };

    const setUsername = () => {
        setUser(tempUser);
    };

    const handleInputChange = (e) => {
        setTempUser(e.target.value);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                overflow: 'auto',
                // backgroundColor: '#282c34',
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
            <Box 
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    paddingTop: '30px'
                }}
            >
                {user ? (
                    <>
                        <p>Connected: {'' + isConnected}</p>
                        <p>Last message: {lastMessage || '-'}</p>
                        <button onClick={sendMessage}>Say hello!</button>
                    </>
                ) : (
                    <>
                        <TextField
                            placeholder="Enter username"
                            value={tempUser}
                            onChange={handleInputChange}
                        />
                        <Button variant="contained" onClick={setUsername}>
                            Set Username
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
}
