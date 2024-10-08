import { useState, useEffect } from 'react';
import ABCJS from 'abcjs';

const SheetMusic = () => {
  const [score, setScore] = useState('');
  const [barCount, setBarCount] = useState(0);
  const [selectedRest, setSelectedRest] = useState(null);

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

  const handleFullNoteClick = () => {
    if (selectedRest !== null) {
      const updatedScore = score.replace(selectedRest, 'c4'); // Replace selected rest with a full note (e.g., 'c4' for a quarter note)
      setScore(updatedScore);
      setSelectedRest(null); // Deselect after conversion
    }
  };

  useEffect(() => {
    if (score) {
      ABCJS.renderAbc("abcjs-container", `X:1\nT:Title\nM:4/4\nK:C\n${score}`);
    }
  }, [score]);

  return (
    <div>
      <button onClick={addBar}>Add 4/4 Bar</button>
      <button onClick={handleFullNoteClick}>Full Note</button>
      <div id="abcjs-container"></div>
      <div>
        {/* Example rest selection - you may need a more sophisticated approach */}
        {score.split(/\s+/).map((note, index) => (
          <span
            key={index}
            style={{ marginRight: '5px', cursor: 'pointer', color: note.startsWith('z') ? 'red' : 'black' }}
            onClick={() => note.startsWith('z') && setSelectedRest(note)}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SheetMusic;