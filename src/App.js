import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import { Home, Feedback, Game, NotFound, Ranking, Settings } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/ranking">Ranking</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/feedback" component={Feedback} />
        <Route exact path="/ranking" component={Ranking} />
        <Route exact path="/settings" component={Settings} />
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
