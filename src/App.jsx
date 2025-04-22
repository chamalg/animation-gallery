import React from 'react';
import PowerButton from './PowerButton';
import FullscreenOverlay from './FullScreenOverlay';
import FlipCard from './FlipCard';
import './App.css';
import CodeEditor from './CodeEditor';

function App() {

  return (
    <div className="app-wrapper">
      <PowerButton />
      <FullscreenOverlay />
      <FlipCard />
      <CodeEditor/>
    </div>
  );
}

export default App;
