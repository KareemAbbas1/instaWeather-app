import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import DayTemp from './DayTemp';

const DailyTemp = ({ tempType, dailyTemperature }) => {

    const [data, setData] = useState();
    
    useEffect(() => {
        if(tempType) {
            const handleDays = async () => {
                setTimeout(() => {
                    dailyTemperature.shift()
                    setData(dailyTemperature);
                }, 100)
            }
            handleDays();
        }
    }, [dailyTemperature])
   

    return (
        <Container fluid>
            <div className='d-flex flex-row flex-nowrap overflow-auto'>
                {data &&
                    data.map((day) => (
                        <DayTemp key={day.time} data={day} tempType={tempType} />
                    ))
                }
            </div>
        </Container>
    )
}

export default DailyTemp