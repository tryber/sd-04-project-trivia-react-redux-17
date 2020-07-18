import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimer, resetTimer } from '../redux/actions';

class Timer extends Component {
  componentDidMount() {
    const { setTimerGlobal, resetTimerGlobal } = this.props;
    let counter = 0;
    const looper = setInterval(() => {
      counter += 1;
      setTimerGlobal();
      if (counter >= 30) {
        clearInterval(looper);
        resetTimerGlobal();
      }
    }, 1000);
  }

  render() {
    const { timer } = this.props;
    return <div>{timer}</div>;
  }
}

const mapStateToProps = (state) => ({
  timer: state.reducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  setTimerGlobal: () => dispatch(setTimer()),
  resetTimerGlobal: () => dispatch(resetTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  setTimerGlobal: PropTypes.func.isRequired,
  resetTimerGlobal: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};
