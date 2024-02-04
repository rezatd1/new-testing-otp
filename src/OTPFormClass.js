import React from 'react';
import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';

class OTPFormClass extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            verifyCode: '',
            helperText: '',
            invisibleHelperText:'enter the pass',
        };
    }

    // changeInput = (event) => {
    //     let value = event.target.value.trim();
    //     let isValidCode = this.getIsValidCode(value);
    //     this.setState({
    //         verifyCode: value,
    //         helperText: ''
    //     });
    //     this.props.codeChanged(value, isValidCode);
    // }

    // getIsValidCode = (code) => {
    //     if (code.length === 21) {
    //         this.setState({ invisibleHelperText: '' });
    //         return true;
    //     } else {
    //         this.setState({ invisibleHelperText: getTranslatedRawText('components.verificationInput.verifyMaskEnter') });
    //         return false;
    //     }
    // }

    // UNSAFE_componentWillReceiveProps(newProps) {

    //     if (newProps.showValidationDate !== this.props.showValidationDate) {
    //         this.setState({ helperText: this.state.invisibleHelperText });
    //         if (!this.state.verifyCode)
    //             this.input.current.focus();
    //     }
    // }

    componentDidMount() {
        this.input.current.focus();

        if ('OTPCredential' in window) {
            const ac = new AbortController();
            // const form = this.input.current?.closest('form');
            // if (form) {
            //     form.addEventListener('submit', (e) => {
            //         ac.abort();
            //     });
            // }
            navigator.credentials
                .get({
                    otp: { transport: ['sms'] },
                    signal: ac.signal,
                })
                .then((otp) => {
                    alert(otp.code)
                    this.setState({ verifyCode: otp.code });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.verifyCode === '' && this.state.verifyCode !== '' && this.input.current) {
            this.input.current.value = this.state.verifyCode;
        }
    }

    render() {
        return (
            <InputMask
                className='ns-activation-input'
                mask='9 - 9 - 9 - 9 - 9 - 9'
                // onChange={this.changeInput}
                maskChar=''
                showMask >
                {() => (
                    <TextField
                        tabIndex='0'
                        variant='standard'
                        helperText={this.state.helperText}
                        inputRef={this.input}
                        label='ssss'
                        size='small'
                        className='w-100 not-rtl'
                        autoComplete='one-time-code'
                    />
                )}
            </InputMask>
        );
    }
}

export default OTPFormClass;