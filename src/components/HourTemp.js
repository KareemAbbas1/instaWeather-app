import React from 'react';
import CurrentIcon from './CurrentIcon';


const HourTemp = ({ data, tempType }) => {

    // console.log(data)
    let iconType = data ? data.icon : null;

    let fTemp = data ? Math.round(data.temperature) : null;
    let cTemp = Math.round((fTemp - 32) / 1.8);

    const currentTime = new Date();
    let currentHour = currentTime.getHours();
   
    let unixTimestamp = data.time;
    let date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();
    let formattedTime = hours + ':' + minutes.substring(-2);
    
    return (
        <div className='card-body text-center'>
            <p className='time'>{hours === currentHour ? 'Now' : formattedTime}</p>
            <div className='hourly-icon'><CurrentIcon iconType={iconType}/></div>
            <div className='hour-temp'>{tempType ? fTemp : cTemp}&#176;</div>
        </div>
    );
};

export default HourTemp