import React from 'react'

const DayTemp = () => {
    // Date
    // const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // let d = data ? data[0].time : null;
    // let date = new Date(d * 1000)
    // let day = weekday[date.getDay()];
    // console.log(day)
  return (
    <div className='card-body text-center'>
            <p className='time'>Day</p>
            {/* <div className='hourly-icon'><CurrentIcon iconType={iconType}/></div> */}
            <div className='hour-temp'>23&#176;</div>
        </div>
  )
}

export default DayTemp