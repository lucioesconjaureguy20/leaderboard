import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
        Ending In
      </div>
      <div className="flex items-center gap-2 md:gap-4 font-mono text-3xl md:text-5xl font-bold">
        <div className="flex flex-col items-center">
          <span className="text-foreground">{pad(timeLeft.days)}</span>
          <span className="text-xs text-muted-foreground mt-1 tracking-wider uppercase font-sans">Days</span>
        </div>
        <span className="text-primary pb-5">:</span>
        <div className="flex flex-col items-center">
          <span className="text-foreground">{pad(timeLeft.hours)}</span>
          <span className="text-xs text-muted-foreground mt-1 tracking-wider uppercase font-sans">Hrs</span>
        </div>
        <span className="text-primary pb-5">:</span>
        <div className="flex flex-col items-center">
          <span className="text-foreground">{pad(timeLeft.minutes)}</span>
          <span className="text-xs text-muted-foreground mt-1 tracking-wider uppercase font-sans">Min</span>
        </div>
        <span className="text-primary pb-5">:</span>
        <div className="flex flex-col items-center">
          <span className="text-foreground">{pad(timeLeft.seconds)}</span>
          <span className="text-xs text-muted-foreground mt-1 tracking-wider uppercase font-sans">Sec</span>
        </div>
      </div>
    </div>
  );
}
