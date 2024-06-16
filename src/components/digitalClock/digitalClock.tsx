import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time:any) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="flex justify-center h-fit bg-transparent ">
      <div className="text-6xl font-mono text-white">
        <span>{formatTime(time.getHours())}</span>:
        <span>{formatTime(time.getMinutes())}</span>:
        <span>{formatTime(time.getSeconds())}</span>
      </div>
    </div>
  );
};

export default DigitalClock;
