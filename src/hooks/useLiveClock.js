import { useEffect, useState } from 'react';

export function useLiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'रात्रि' : hours >= 17 ? 'संध्या' : hours >= 12 ? 'दोपहर' : 'प्रातः';

  let greeting = 'शुभ रात्रि 🌙';
  if (hours >= 5 && hours < 12) greeting = 'शुभ प्रभात 🌅';
  else if (hours >= 12 && hours < 17) greeting = 'शुभ दोपहर ☀️';
  else if (hours >= 17 && hours < 20) greeting = 'शुभ संध्या 🌆';

  const h12 = hours % 12 || 12;

  return {
    time,
    display: `${h12}:${minutes}:${seconds}`,
    greeting,
    ampm,
    isEvening: hours >= 17 || hours < 5,
  };
}
