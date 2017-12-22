// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';
import Footer from './containers/Footer';
import UndoRedo from './containers/UndoRedo';
// Main app
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">React Todo App</h1>
      </header>
        <div className="App-wrapper">
          <AddTodo/>
          <VisibleTodoList/>
          <Footer/>
          <UndoRedo/>
        </div>
    </div>
  );
};

export default App;