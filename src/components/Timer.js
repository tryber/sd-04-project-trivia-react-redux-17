import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  componentDidMount() {
    const { setTimer, resetTimer, timer } = this.props;
    if (timer === 0) {
      resetTimer();
    }
    setInterval(() => {
      setTimer();
    }, 1000);
  }

  render() {
    const { timer } = this.props;
    return <div>{timer}</div>;
  }
}

Timer.propTypes = {
  setTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};
