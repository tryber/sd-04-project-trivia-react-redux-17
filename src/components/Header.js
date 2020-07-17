import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';

const hashEmail = (email) => MD5(email).toString().toLowerCase().trim();

function Header({ userEmail, userName, assertions }) {
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
          {assertions * 20}
        </span>
        <span>Pontos:</span>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  userName: state.reducer.player.name,
  userEmail: state.reducer.player.gravatarEmail,
  assertions: state.reducer.player.assertions,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};
