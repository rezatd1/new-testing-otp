import React, { useState } from 'react';
import axios from 'axios';

function OTPForm() {

    const generateOTP = () => {
        axios
            .post('http://172.17.17.101:8088/api/en/Account/SignUp/SendVerificationCodeForResetPassword', {
                countryCode: 98,
                mobileWithOutCountryCode: '9390753192',
            })
            .catch((error) => {
                console.error('Error sending OTP:', error);
            });
    };

    if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', e => {
          const input = document.querySelector('input[autocomplete="one-time-code"]');
          if (!input) return;
          const ac = new AbortController();
          const form = input.closest('form');
          if (form) {
            form.addEventListener('submit', e => {
              ac.abort();
            });
          }
          navigator.credentials.get({
            otp: { transport:['sms'] },
            signal: ac.signal
          }).then(otp => {
            input.value = otp.code;
            if (form) form.submit();
          }).catch(err => {
            console.log(err);
          });
        });
      }

    return (
        <form>
            <input autocomplete="one-time-code" required />
            <input type="submit" />
        </form>
    );
}

export default OTPForm;
