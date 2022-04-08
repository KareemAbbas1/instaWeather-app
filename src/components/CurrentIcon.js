import React from 'react'

const CurrentIcon = ({ iconType }) => {

  let icon = () => {
    if (iconType === 'clear-day') {
      return 'wi-day-sunny'
    }
    else if (iconType === 'clear-night') {
      return 'wi-night-clear'
    }
    else if (iconType === 'rain') {
      return 'wi-rain'
    }
    else if (iconType === 'snow') {
      return 'wi-snow'
    }
    else if (iconType === 'sleet') {
      return 'wi-sleet'
    }
    else if (iconType === 'wind') {
      return 'wi-windy'
    }
    else if (iconType === 'fog') {
      return 'wi-fog'
    }
    else if (iconType === 'cloudy') {
      return 'wi-cloudy'
    }
    else if (iconType === 'partly-cloudy-day') {
      return 'wi-day-cloudy'
    }
    else if (iconType === 'partly-cloudy-night') {
      return 'wi-night-partly-cloudy'
    }
    else if (iconType === 'overcast') {
      return 'wi-cloudy'
    }
  };

  return (
    <i className={`wi ${icon()}`}></i>
  );
};

export default CurrentIcon