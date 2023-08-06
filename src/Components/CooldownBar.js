/* eslint-disable */
import { Box } from '@mui/system';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CooldownBar.css';

CooldownBar.propTypes = {
    cooldownPassed: PropTypes.number,
    setCooldownPassed: PropTypes.func
};

export default function CooldownBar(props) {
    const [numReceived, setNumReceived] = useState(0);
    useEffect(() => {
        if(props.cooldownPassed >= 0){
            setNumReceived(numReceived + 1);
        }
        console.log('numreceived: ' + -(numReceived * 3) + 's');
    }, [props.cooldownPassed]);

    return (
        <Box
            sx={{ width: '100%', position: 'relative' }}>
            <div
                style={{
                    height: '20px', 
                    backgroundColor: 'red',
                    animationName: 'moveProgress',
                    animationDuration: '9s',
                    animationTimingFunction: 'linear',
                    animationDelay: (numReceived * 3) + 's', // 3 is from [cooldown time / 1000]
                }} 
                className='progressBar'
            />
            {Array.from({ length: props.maxMoveHold-1 }).map((_, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: `${(index + 1) * (100 / props.maxMoveHold)}%`,
                        width: '2px',
                        height: '100%',
                        backgroundColor: 'white',
                    }}
                />
            ))}
        </Box>
    );
}