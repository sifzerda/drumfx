// src/SheetMusic.js
import { useState, useEffect } from 'react';
import ABCJS from 'abcjs';

const SheetMusic = () => {
  const [score, setScore] = useState('');
  const [barCount, setBarCount] = useState(0);

  const addBar = () => {
    const newBar = ' | ' + 'z4' + ' '.repeat(8); // Adds a 4/4 bar with rests
    let updatedScore;

    if (barCount === 3) {
      // After adding the 4th bar, add a new line
      updatedScore = score + newBar + '\n'; // Wrap to new line
      setBarCount(0); // Reset bar count
    } else {
      // Just add a bar
      updatedScore = score + newBar;
      setBarCount(barCount + 1); // Increment bar count
    }

    setScore(updatedScore);
  };

  useEffect(() => {
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