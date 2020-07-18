import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api'

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: '',
      difficulty: '',
      type: '',
    }
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories: categories["trivia_categories"] });
  }

  onChangeUpdateSettings(field, value) {
    this.setState((state) => ({
      ...state,
      [field]: value,
    }));
  }

  renderCategories(categories) {
  
    return (
      <fieldset>
        <label>Category</label>
        <select onChange={(e) => this.onChangeUpdateSettings('category', e.target.value)}>
          <option id="all" value="all">All Categories</option>
          {categories.map(({ name }) => (<option value={name}>{name}</option>))}
        </select>
      </fieldset>
    );
  }

  renderDifficulties() {
    return (
      <fieldset>
        <label>Difficulty</label>
        <select onChange={(e) => this.onChangeUpdateSettings('difficulty', e.target.value)}>
          <option id="all" value="all">All Difficulties</option>
          <option id="easy" value="easy">Easy</option>
          <option id="medium" value="medium">Medium</option>
          <option id="hard" value="hard">Hard</option>
        </select>
      </fieldset>
    );
  }

  renderTypes() {
    return (
      <fieldset>
        <label>Type</label>
        <select onChange={(e) => this.onChangeUpdateSettings('type', e.target.value)}>
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
          <button type="button">SAVE SETTINGS</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
};
