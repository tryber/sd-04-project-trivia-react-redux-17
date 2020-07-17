import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
          <h3 data-testid="feedback-text">Text</h3>
          <p data-testid="feedback-total-score">Score</p>
          <p data-testid="feedback-total-questions">Total questions</p>
          <Link to="/ranking">VER RANKING</Link>
          <Link to="/game">JOGAR NOVAMENTE</Link>
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
  isFetching: PropTypes.bool.isRequired,
  assertions: PropTypes.number.isRequired,
};