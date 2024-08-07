// src/SheetMusic.js
import React, { useState } from 'react';
import ABCJS from 'abcjs';

const SheetMusic = () => {
  const [score, setScore] = useState('');

  const addBar = () => {
    const newBar = ' | ' + 'z4' + ' '.repeat(8); // Adds a 4/4 bar with rests
    setScore(prevScore => prevScore + newBar);
  };

  React.useEffect(() => {
    if (score) {
      ABCJS.renderAbc("abcjs-container", `X:1\nT:Title\nM:4/4\nK:C\n${score}`);
    }
  }, [score]);

  return (
    <div>
      <button onClick={addBar}>Add 4/4 Bar</button>
      <div id="abcjs-container"></div>
    </div>
  );
};

export default SheetMusic;