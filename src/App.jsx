import React from 'react';
import PowerButton from './PowerButton';
import FullScreenOverlay from "./FullScreenOverlay";
import FlipCard from './FlipCard';
import './App.css';
import CodeEditor from './CodeEditor';

function App() {

  return (
    <div className="app-wrapper">
      <PowerButton />
      <FullScreenOverlay />
      <FlipCard />
      <CodeEditor/>
    </div>
  );
}

export default App;
