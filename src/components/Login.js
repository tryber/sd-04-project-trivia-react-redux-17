import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getToken } from '../services/api';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userName: '',
      token: '',
    };
  }

  componentDidMount() {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
  }

  handleChange(field, value) {
    this.setState((state) => ({
      ...state,
      [field]: value,
    }));
  }

  isDisabled() {
    const { userName, userEmail } = this.state;
    if (userName === '' || userEmail === '') return true;
    return false;
  }

  async handleButtonPlay() {
    const { userLoginStorage } = this.props;
    const userToken = await getToken();
    this.setState((state) => ({
      ...state,
      token: userToken.token,
    }));
    localStorage.setItem('token', JSON.stringify(userToken.token));
    return userLoginStorage(this.state);
  }

  renderEmail() {
    const { userEmail } = this.state;

    return (
      <label className="" htmlFor="input-gravatar-email">
        Email:
        <input
          data-testid="input-gravatar-email"
          id="input-gravatar-email"
          onChange={(e) => this.handleChange('userEmail', e.target.value)}
          type="email"
          value={userEmail}
        />
      </label>
    );
  }

  renderName() {
    const { userName } = this.state;

    return (
      <label className="" htmlFor="input-player-name">
        Nome:
        <input
          data-testid="input-player-name"
          id="input-player-name"
          onChange={(e) => this.handleChange('userName', e.target.value)}
          type="text"
          value={userName}
        />
      </label>
    );
  }

  renderButton() {
    return (
      <button
        data-testid="btn-play"
        disabled={this.isDisabled()}
        onClick={() => this.handleButtonPlay()}
        type="button"
      >
        Jogar
      </button>
    );
  }

  render() {
    const { userIsLogged } = this.props;
    const renderComponent = !userIsLogged ? (
      <div className="">
        <div className="">
          <Link className="" data-testid="btn-settings" to="/settings">
            Configurações
          </Link>
          <br />
          <br />
          {this.renderEmail()}
          <br />
          {this.renderName()}
          <br />
          {this.renderButton()}
        </div>
      </div>
    ) : (
      <Redirect to="/game" />
    );
    return renderComponent;
  }
}

const mapStateToProps = (state) => ({
  userIsLogged: state.reducer.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  userLoginStorage: (storage) => dispatch(userLogin(storage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  userLoginStorage: PropTypes.func.isRequired,
  userIsLogged: PropTypes.bool.isRequired,
};
