import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <h3 data-testid="feedback-text"></h3>
          <p data-testid="feedback-total-score"></p>
          <p data-testid="feedback-total-questions"></p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.reducer.isFetching,
  assertions: state.reducer.assertions,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {

};