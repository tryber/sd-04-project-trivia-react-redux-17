import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api'

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      settings: {
        category: 'all',
        difficulty: 'all',
        type: 'all',
      }
    }
  }

  async componentDidMount() {
    const categories = await getCategories();
    const { settings } = this.props;
    this.setState((state) => ({
      ...state,
      categories: categories["trivia_categories"],
      settings,
    }));
  }

  onChangeUpdateSettings(field, value) {
    this.setState(({ categories, settings }) => ({
      categories: [...categories,],
      settings: {
        ...settings,
        [field]: value,
      }
    }));
  }

  renderCategories(categories) {
    const { category } = this.state.settings;
    return (
      <fieldset>
        <label>Category</label>
        <select
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
        <label>Difficulty</label>
        <select
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
        <label>Type</label>
        <select
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

  handleSubmit() {

  }

  render() {
    const { categories } = this.state;
    if (categories.length === 0) return (<p>Loading...</p>);
    console.log(categories);
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <form>
          {this.renderCategories(categories)}
          {this.renderDifficulties()}
          {this.renderTypes()}
          <button type="button" onSubmit={this.handleSubmit}>SAVE SETTINGS</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.reducer.settings,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
  settings: PropTypes.objectOf(PropTypes.object).isRequired,
};
