import React from 'react';
import CurrentIcon from './CurrentIcon';

const DayTemp = ({ data, tempType }) => {

  let iconType = data && data.icon;
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // Get tomorrow day
  const today = new Date();
  let tomorrow = today.getDay() === 6 ? weekday[today.getDay() - 6] : weekday[today.getDay() + 1];

  // Get week days
  let d = data && data.time;
  let date = new Date(d * 1000)
  let day = weekday[date.getDay()];


  
  let fHighTemp = data && Math.round(data.temperatureHigh);
  let fLowTemp = data && Math.round(data.temperatureLow);
  let cHighTemp = Math.round((fHighTemp - 32) / 1.8);
  let cLowTemp = Math.round((fLowTemp - 32) / 1.8);

  return (
    <div className='card-body-daily text-center'>
      <p className='days'>{day === tomorrow ? 'Tomorrow' : day}</p>
      <div className='hourly-icon'><CurrentIcon iconType={iconType} /></div>
      <div className='day-temp'>{tempType ? fHighTemp : cHighTemp}&#176; / {tempType ? fLowTemp : cLowTemp}&#176;</div>
    </div>
  )
}

export default DayTemp