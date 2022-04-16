import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import HourTemp from './HourTemp';

const Hourly = ({ hourlyTemperature, tempType }) => {

  const [data, setData] = useState();

  const twelveHours = async () => {
    hourlyTemperature.length = 23;
    setTimeout(() => {
      setData(hourlyTemperature)
    }, 100)
  };
  twelveHours();

  return (
    <Container fluid>
      <div className='d-flex flex-row flex-nowrap overflow-auto'>
        {data ?

          data.map((h) => (
            <HourTemp key={h.time} data={h} tempType={tempType} />
          )) :

          null
        }
      </div>
    </Container>
  );
};

export default Hourly