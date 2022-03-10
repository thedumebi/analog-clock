import React, { useEffect, useRef, useState } from "react";

import "./clock.css";

interface Time {
  hoursDeg: number;
  minuteDeg: number;
  secondsDeg: number;
  numbers: number[];
}

interface Degrees {
  transform?: string;
}

const useInterval = (callback: () => void, delay: number = 2000): void => {
  const savedCallback: React.MutableRefObject<() => void> = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const Clock: React.FC = () => {
  const generateNumbers = (): number[] => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };
  const [time, setTime] = useState<Time>({
    hoursDeg: 0,
    minuteDeg: 0,
    secondsDeg: 0,
    numbers: generateNumbers(),
  });

  const pi = Math.PI;

  const getTheTime = (): void => {
    const currentDate: Date = new Date();
    const secondsRatio: number = currentDate.getSeconds() / 60;
    const minutesRatio: number = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio: number = (minutesRatio + currentDate.getHours()) / 12;

    setTime((prevValues) => ({
      ...prevValues,
      hoursDeg: hoursRatio * 360,
      minuteDeg: minutesRatio * 360,
      secondsDeg: secondsRatio * 360,
    }));
  };

  useInterval(getTheTime, 1000);

  const setTheHands = (degrees: number): Degrees => {
    return degrees
      ? {
          transform: `rotate(${degrees}deg)`,
        }
      : {};
  };

  const setClockNumbers = (n: number): Degrees => ({
    transform: `translate(${Math.cos((pi * n) / 6 - pi / 2) * 130}px, ${
      Math.sin((pi * n) / 6 - pi / 2) * 130
    }px)`,
  });

  return (
    <div className="container">
      <div className="clock">
        <div className="outer-clock-face">
          <div className="minute-one"></div>
          <div className="minute-two"></div>
          <div className="minute-three"></div>
          <div className="minute-four"></div>

          <div className="minute-five"></div>
          <div className="minute-six"></div>
          <div className="minute-seven"></div>
          <div className="minute-eight"></div>

          <div className="marking marking-one">
            <div className="minute-one"></div>
            <div className="minute-two"></div>
            <div className="minute-three"></div>
            <div className="minute-four"></div>
          </div>
          <div className="marking marking-two">
            <div className="minute-one"></div>
            <div className="minute-two"></div>
            <div className="minute-three"></div>
            <div className="minute-four"></div>
          </div>
          <div className="marking marking-three">
            <div className="minute-one"></div>
            <div className="minute-two"></div>
            <div className="minute-three"></div>
            <div className="minute-four"></div>
          </div>
          <div className="marking marking-four">
            <div className="minute-one"></div>
            <div className="minute-two"></div>
            <div className="minute-three"></div>
            <div className="minute-four"></div>
          </div>

          <div className="inner-clock-face">
            <div
              className="hours hand"
              style={setTheHands(time.hoursDeg)}
            ></div>
            <div
              className="minutes hand"
              style={setTheHands(time.minuteDeg)}
            ></div>
            <div
              className="seconds hand"
              style={setTheHands(time.secondsDeg)}
            ></div>
          </div>
        </div>

        {time.numbers.map((number) => (
          <div className="numbers" key={number}>
            <div className={`number${number}`} style={setClockNumbers(number)}>
              {number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clock;
