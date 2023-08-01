import { Box, LinearProgress } from '@mui/material';
import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';

CooldownBar.propTypes = {
    chessboard: PropTypes.object,
    cooldown: PropTypes.number,
    setCooldown: PropTypes.func
};

export default function CooldownBar(props) {    
    const [cooldown, setCooldown] = useState(props.cooldown);
    const [cooldownTime, setCooldownTime] = useState(props.chessboard.getCooldownTime());
    const [maxMoveHold, setMaxMoveHold] = useState(props.chessboard.getMaxMoveHold());

    useEffect(() => {
        setCooldownTime(props.chessboard.getCooldownTime());
        setMaxMoveHold(props.chessboard.getMaxMoveHold());
        setCooldown(props.chessboard.getCooldown());
        if(props.chessboard.getMaxMoveHold() < props.chessboard.getCooldown()) {
            props.chessboard.setCooldown(props.chessboard.getMaxMoveHold());
            setCooldown(props.chessboard.getMaxMoveHold);
        }
    }, [cooldown, cooldownTime, maxMoveHold]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(props.chessboard.getCooldown() <= props.chessboard.getMaxMoveHold()) {
                setCooldown(props.chessboard.getCooldown() + 1);
                props.chessboard.setCooldown(props.chessboard.getCooldown() + 1);
            }
        }, cooldownTime);
        return () => {
            clearInterval(interval);
        };
    }, [props.cooldown, maxMoveHold, cooldownTime]);

    // const updateCooldown = () => {
    //     if (props.chessboard.getCooldown() < props.chessboard.getMaxMoveHold()) {
    //         props.setCooldown(props.chessboard.getCooldown() + 1);
    //         props.chessboard.setCooldown(props.chessboard.getCooldown() + 1);
    //         // setTimeout(updateCooldown, cooldownTime);
    //     }
    // };

    // useEffect(() => {
    //     setTimeout(updateCooldown, cooldownTime);
    //     return () => {
    //         // Cleanup function to stop the recursive calls when the component unmounts
    //         clearTimeout(updateCooldown);
    //     };
    // }, [props.cooldown, maxMoveHold, cooldownTime]);

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <LinearProgress variant="determinate" value={cooldown * 100 / props.chessboard.getMaxMoveHold()} sx={{ height: '30px' }} />
            {/* Add the dividing lines per max move hold*/}
            {Array.from({ length: maxMoveHold - 1 }).map((_, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: `${(index + 1) * (100 / maxMoveHold)}%`,
                        width: '2px',
                        height: '100%',
                        backgroundColor: '#000',
                    }}
                />
            ))}
        </Box>
    );
}
