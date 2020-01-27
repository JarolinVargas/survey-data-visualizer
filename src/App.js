import React from 'react';
import './App.scss';
import Header from './components/Header.js';
import Graph from './components/Graph.js';
import Heading from './components/Heading.js';

export default function App() {
  return (
    <div className="App">
      <Header/>
      <Heading/>
      <Graph/>
    </div>
  );
}
