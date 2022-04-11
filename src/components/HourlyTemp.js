import React from 'react';
import { Container } from 'react-bootstrap';
import HourTemp from './HourTemp';

const Hourly = () => {
  return (
    <Container fluid className='py-2'>
      <div className='d-flex flex-row flex-nowrap overflow-auto'>
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
        <HourTemp />
      </div>
    </Container>
  );
};

export default Hourly