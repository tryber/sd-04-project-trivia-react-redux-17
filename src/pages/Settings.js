import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import { saveSettings } from '../redux/actions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      settings: {
        category: 'all',
        difficulty: 'all',
        type: 'all',
      },
      savedSettings: false,
    };
  }

  async componentDidMount() {
    const { settings } = this.props;
    getCategories()
      .then((categories) => {
        this.setState((state) => ({
          ...state,
          categories: categories.trivia_categories,
          settings,
        }));
      })
      .catch((error) => { throw error; });
  }

  onChangeUpdateSettings(field, value) {
    this.setState(({ categories, settings }) => ({
      categories: [...categories],
      settings: {
        ...settings,
        [field]: value,
      },
    }));
  }

  handleSubmit() {
    const { settings } = this.state;
    const { saveReducerSettings } = this.props;
    saveReducerSettings(settings);
    this.setState((state) => ({
      ...state,
      savedSettings: true,
    }));
  }

  renderCategories(categories) {
    const { category } = this.state.settings;
    return (
      <fieldset>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => this.onChangeUpdateSettings('category', e.target.value)}
        >
          <option id="all" value="all">All Categories</option>
          {categories.map(({ name }) => (<option value={name}>{name}</option>))}
        </select>
      </fieldset>
    );
  }

  renderDifficulties() {
    const { difficulty } = this.state.settings;
    return (
      <fieldset>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => this.onChangeUpdateSettings('difficulty', e.target.value)}
        >
          <option id="all" value="all">All Difficulties</option>
          <option id="easy" value="easy">Easy</option>
          <option id="medium" value="medium">Medium</option>
          <option id="hard" value="hard">Hard</option>
        </select>
      </fieldset>
    );
  }

  renderTypes() {
    const { type } = this.state.settings;
    return (
      <fieldset>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => this.onChangeUpdateSettings('type', e.target.value)}
        >
          <option id="all" value="all">All Types</option>
          <option id="multiple" value="multiple">Multiple Choices</option>
          <option id="bool" value="bool">True/False</option>
        </select>
      </fieldset>
    );
  }


  render() {
    const { categories, savedSettings } = this.state;
    if (categories.length === 0) return (<p>Loading...</p>);
    if (savedSettings) return (<Redirect to="/" />);
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <form>
          {this.renderCategories(categories)}
          {this.renderDifficulties()}
          {this.renderTypes()}
          <button type="button" onClick={() => this.handleSubmit()}>SAVE SETTINGS</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.reducer.settings,
});

const mapDispatchToProps = (dispatch) => ({
  saveReducerSettings: (settings) => dispatch(saveSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
  settings: PropTypes.objectOf(PropTypes.object).isRequired,
  saveReducerSettings: PropTypes.func.isRequired,
};
