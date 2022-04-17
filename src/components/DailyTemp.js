import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import DayTemp from './DayTemp';

const DailyTemp = ({ tempType, dailyTemperature }) => {

    const [data, setData] = useState();
    
    const handleDays = async () => {
        setTimeout(() => {
            setData(dailyTemperature);
        }, 100)
    }
    handleDays();
   
    console.log(data)


    return (
        <Container fluid>
            <div className='d-flex flex-row flex-nowrap overflow-auto'>
                {data ?
                    data.map((day) => (
                        <DayTemp key={day.time} data={day} tempType={tempType} />
                    )) :

                    null
                }
            </div>
        </Container>
    )
}

export default DailyTemp