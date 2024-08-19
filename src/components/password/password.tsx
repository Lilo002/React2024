import React, { useEffect, useState } from 'react';

type props = {
  password: string;
};

export const Password: React.FC<props> = ({ password }) => {
  const [strength, setStrength] = useState('');

  useEffect(() => {
    let score = 0;
    if (!password) {
      setStrength('');
      return;
    }

    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score === 4) setStrength('strong');
    else if (score >= 3) setStrength('medium');
    else if (score > 0) setStrength('weak');
    else setStrength('');
  }, [password]);

  return (
    <div className={`password ${strength}`}>
      {strength && `Your password is ${strength}`}
    </div>
  );
};
