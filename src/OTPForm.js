import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function OTPForm() {
  const [otp, setOTP] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission if needed
  };

  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      // const form = inputRef.current?.closest('form');
      // if (form) {
      //   form.addEventListener('submit', (e) => {
      //     ac.abort();
      //   });
      // }
      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        })
        .then((otp) => {
          setOTP(otp.code);
          // if (form) form.submit();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        autoComplete="one-time-code"
        required
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default OTPForm;
