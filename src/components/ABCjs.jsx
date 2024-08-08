import { useState, useEffect } from 'react';
import ABCJS from 'abcjs';

const SheetMusic = () => {
  const [score, setScore] = useState('');
  const [barCount, setBarCount] = useState(0);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

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
    if (selectedNoteIndex !== null) {
      const notes = score.split(/\s+/);
      notes[selectedNoteIndex] = 'c4'; // Replace selected rest with a full note (e.g., 'c4' for a quarter note)
      const updatedScore = notes.join(' ');
      setScore(updatedScore);
      setSelectedNoteIndex(null); // Deselect after conversion
    }
  };

  const handleHalfNoteClick = () => {
    if (selectedNoteIndex !== null) {
      const notes = score.split(/\s+/);
      if (notes[selectedNoteIndex] === 'c4') {
        notes[selectedNoteIndex] = 'c2 c2'; // Split full note into two half notes
        const updatedScore = notes.join(' ');
        setScore(updatedScore);
        setSelectedNoteIndex(null); // Deselect after conversion
      }
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
      <button onClick={handleFullNoteClick}>Add Whole Note</button>
      <button onClick={handleHalfNoteClick}>Add 1/2 Note</button>
      <div id="abcjs-container"></div>
      <div>
        {score.split(/\s+/).map((note, index) => (
          <span
            key={index}
            style={{
              marginRight: '5px',
              cursor: 'pointer',
              color: index === selectedNoteIndex ? 'blue' : note.startsWith('z') ? 'red' : 'black'
            }}
            onClick={() => setSelectedNoteIndex(index)}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SheetMusic;