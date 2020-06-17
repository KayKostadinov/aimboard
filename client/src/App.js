import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar.component';
import Landing from './components/layout/Landing.component';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
}

export default App;
