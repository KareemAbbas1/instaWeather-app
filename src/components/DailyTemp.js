import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import DayTemp from './DayTemp';

const DailyTemp = ({ tempType, dailyTemperature }) => {

    const [data, setData] = useState();
    // console.log(dailyTemperature)

    const handleDays = async () => {
        dailyTemperature.shift();
        setTimeout(() => {
            setData(dailyTemperature)
            // console.log(data)
        }, 100)
    };
    handleDays();

    

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