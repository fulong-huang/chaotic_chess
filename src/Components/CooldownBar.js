/* eslint-disable */
import { Box } from '@mui/system';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CooldownBar.css';

CooldownBar.propTypes = {
    cooldownPassed: PropTypes.number,
    setCooldownPassed: PropTypes.func,
    maxMoveHold: PropTypes.number
};

export default function CooldownBar(props) {
    const [animationKey, setAnimationKey] = useState(0);
    const [boxStyle, setBoxStyle] = useState({
        height: '20px', 
        backgroundColor: 'red',
        animationName: 'moveProgress',
        animationDuration: (3 * (props.maxMoveHold == -1? 1 : 5)) + 's',
        animationTimingFunction: 'linear',
    }); 
    useEffect(() => {
        setAnimationKey(animationKey + 1);
        setBoxStyle({
            ...boxStyle,
            animationDelay: -props.cooldownPassed / 1000 + 's',
        });
    }, [props.cooldownPassed]);
    useEffect(() => {
        setBoxStyle({
            ...boxStyle,
            animationDuration: (3 * props.maxMoveHold) + 's',
        })
    }, [props.maxMoveHold]);
    return (
        <Box
            sx={{ width: '100%', position: 'relative' }}>
            <div
                key={animationKey}
                style={boxStyle} 
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
