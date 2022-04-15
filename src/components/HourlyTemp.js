import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import HourTemp from './HourTemp';

const Hourly = ({ hourlyTemprature, tempType }) => {

  const [data, setData] = useState();

  const twelveHours = async () => {
    hourlyTemprature.length = 12;
    setTimeout(() => {
      setData(hourlyTemprature)
    }, 100)
  };
  twelveHours();


  return (
    <Container fluid className='py-2'>
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