import React from 'react';
import CurrentIcon from './CurrentIcon';


const HourTemp = ({ data }) => {
    // console.log(data)
    let iconType = data ? data.icon : null;

    const currentTime = new Date();
    let currentHour = currentTime.getHours();
    console.log(currentHour)
   
    let unixTimestamp = data.time;
    let date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();
    let formattedTime = hours + ':' + minutes.substring(-2);

    return (
        <div className='card-body text-center'>
            <p style={{ fontSize: '1.6rem' }}>{hours === currentHour ? 'Now' : formattedTime}</p>
            <div className='display-5'><CurrentIcon iconType={iconType}/></div>
            <div className='mt-1' style={{ fontSize: '2rem' }}>{Math.floor(data.temperature)}&#176;</div>
        </div>
    );
};

export default HourTemp