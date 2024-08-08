import { useState, useEffect } from 'react';
import ABCJS from 'abcjs';
import * as Tone from 'tone';

const SheetMusic = () => {
  const [score, setScore] = useState('');
  const [barCount, setBarCount] = useState(0);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  // Initialize Tone.js Synth and Player
  const synth = new Tone.Synth().toDestination();
  const kickPlayer = new Tone.Player('/sounds/kick1.mp3').toDestination(); 

  // Function to play a note
  const playNote = (note) => {
    // Note conversion for Tone.js
    const noteMap = {
      'c8': 'C4',
      'c,8': 'C3',
      'c4': 'C4',
      'c,4': 'C3',
      'c2': 'C4',
      'c,2': 'C3',
      'c1': 'C4',
      'c,1': 'C3',
      'c/': 'C4',
      'c//': 'C4',
    };
    const toneNote = noteMap[note];
    if (toneNote) {
      synth.triggerAttackRelease(toneNote, '8n');
    }
  };

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
      notes[selectedNoteIndex] = 'c8'; // Replace selected rest with a full note
      const updatedScore = notes.join(' ');
      setScore(updatedScore);
      setSelectedNoteIndex(null); // Deselect after conversion
    }
  };

  const handleHalfNoteClick = () => {
    if (selectedNoteIndex !== null) {
      const notes = score.split(/\s+/);
      if (notes[selectedNoteIndex] === 'c8') {
        notes[selectedNoteIndex] = 'c4 c4'; // Split full note into two half notes
        const updatedScore = notes.join(' ');
        setScore(updatedScore);
        setSelectedNoteIndex(null); // Deselect after conversion
      }
    }
  };

  const handleQuarterNoteClick = () => {
    if (selectedNoteIndex !== null) {
      const notes = score.split(/\s+/);
      if (notes[selectedNoteIndex] === 'c4') {
        notes[selectedNoteIndex] = 'c2 c2'; // Split half note into two quarter notes
        const updatedScore = notes.join(' ');
        setScore(updatedScore);
        setSelectedNoteIndex(null); // Deselect after conversion
      }
    }
  };

  const handleEighthNoteClick = () => {
    if (selectedNoteIndex !== null) {
      const notes = score.split(/\s+/);
      if (notes[selectedNoteIndex] === 'c2') {
        notes[selectedNoteIndex] = 'c1 c1'; // Split half note into two eighth notes
        const updatedScore = notes.join(' ');
        setScore(updatedScore);
        setSelectedNoteIndex(null); // Deselect after conversion
      }
    }
  };

  const handleSixteenthNoteClick = () => {
    if (selectedNoteIndex !== null) {
      const notes = score.split(/\s+/);
      if (notes[selectedNoteIndex] === 'c1') {
        notes[selectedNoteIndex] = 'c/ c/'; // Split eighth note into two 16th notes
        const updatedScore = notes.join(' ');
        setScore(updatedScore);
        setSelectedNoteIndex(null); // Deselect after conversion
      }
    }
  };

  const handleThirtySecondNoteClick = () => {
    if (selectedNoteIndex !== null) {
      const notes = score.split(/\s+/);
      if (notes[selectedNoteIndex] === 'c/') {
        notes[selectedNoteIndex] = 'c// c//'; // Split 16th note into two 32nd notes
        const updatedScore = notes.join(' ');
        setScore(updatedScore);
        setSelectedNoteIndex(null); // Deselect after conversion
      }
    }
  };

  const handleKickButtonClick = () => {
    if (selectedNoteIndex !== null) {
      const notes = score.split(/\s+/);
      const selectedNote = notes[selectedNoteIndex];
      // Define the bottom line position for different note types
      const noteTypes = {
        'c8': 'c,8',
        'c4': 'c,4',
        'c2': 'c,2',
        'c1': 'c,1',
        'c/': 'c,/',
        'c//': 'c,//'
      };
      const newNote = noteTypes[selectedNote];
      if (newNote) {
        notes[selectedNoteIndex] = newNote; // Move the note to the bottom line
        const updatedScore = notes.join(' ');
        setScore(updatedScore);
        setSelectedNoteIndex(null); // Deselect after conversion

        // Play the kick note sound
        kickPlayer.start();
      }
    }
  };

  const handleHiHatButtonClick = () => {
    if (selectedNoteIndex !== null) {
      const notes = score.split(/\s+/);
      const selectedNote = notes[selectedNoteIndex];
      
      // Define the top line position for different note types
      const noteTypes = {
        'c8': 'x',
        'c4': 'x',
        'c2': 'x',
        'c1': 'x',
        'c/': 'x',
        'c//': 'x'
      };
      const newNote = noteTypes[selectedNote];
      if (newNote) {
        notes[selectedNoteIndex] = newNote; // Move the note to the top line as 'x'
        const updatedScore = notes.join(' ');
        setScore(updatedScore);
        setSelectedNoteIndex(null); // Deselect after conversion

        // Optional: Add sound for Hi-Hat if needed
        // playHiHat();
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
      <button onClick={handleQuarterNoteClick}>Add 1/4 Note</button>
      <button onClick={handleEighthNoteClick}>Add 1/8 Note</button>
      <button onClick={handleSixteenthNoteClick}>Make 16th Note</button>
      <button onClick={handleThirtySecondNoteClick}>Make 32nd Note</button>
      <button onClick={handleKickButtonClick}>Kick</button> {/* Kick Button */}
      <button onClick={handleHiHatButtonClick}>Hi-Hat</button> {/* Hi-Hat Button */}
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