import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';

const hashEmail = (email) => MD5(email).toString().toLowerCase().trim();

function Header({ userEmail, userName, score }) {
  const hash = hashEmail(userEmail);
  return (
    <header className="">
      <div>
        <img
          className=""
          src={`https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`}
          alt={`${userName} avatar`}
          data-testid="header-profile-picture"
        />
        <span className="" data-testid="header-player-name">
          Jogador:
          {userName}
        </span>
      </div>
      <div>
        <span className="" data-testid="header-score">
          {score}
        </span>
        <span>Pontos:</span>
      </div>
    </header>
  );
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.loginReducer.userName,
  userEmail: state.loginReducer.userEmail,
  // score: ,
});

export default connect(mapStateToProps)(Header);
