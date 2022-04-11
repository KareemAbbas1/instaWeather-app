import React from 'react';
import CurrentIcon from './CurrentIcon';


const HourTemp = ({ iconType }) => {
    return (
        <div className='card-body text-center'>
            <p style={{ fontSize: '1.6rem' }}>Time</p>
            <div className='display-5'><CurrentIcon iconType={iconType}/></div>
            <div className='mt-1' style={{ fontSize: '2rem' }}>23&#176;</div>
        </div>
    );
};

export default HourTemp