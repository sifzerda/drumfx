import React, { useState, useEffect, useRef } from 'react';
import ABCJS from 'abcjs';

const SheetMusicEditor = () => {
  const [abcNotation, setAbcNotation] = useState("X: 1\nT: Simple Scale\nM: 4/4\nL: 1/4\nK: C\n");
  const [notesInCurrentBar, setNotesInCurrentBar] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      ABCJS.renderAbc(divRef.current, abcNotation);
    }
  }, [abcNotation]);

  const addNote = (note) => {
    let newNotation = abcNotation;

    // Check if the current bar is full and needs a new bar
    if (notesInCurrentBar === 4) {
      // Add a bar line and start a new bar
      newNotation = newNotation.trimEnd() + " | "; // Remove any trailing space and add bar line
      setNotesInCurrentBar(0); // Reset note count for the new bar
    }

    // Add the note to the current bar
    newNotation += note + " ";
    setNotesInCurrentBar(notesInCurrentBar + 1);

    // Ensure the bar ends with a bar line when exactly four notes are added
    if (notesInCurrentBar === 4) {
      newNotation += " |";
    }

    setAbcNotation(newNotation.trimEnd()); // Update notation and remove any extra spaces
  };

  return (
    <div>
      <button onClick={() => addNote("C")}>Add C</button>
      <button onClick={() => addNote("D")}>Add D</button>
      <button onClick={() => addNote("E")}>Add E</button>
      <button onClick={() => addNote("F")}>Add F</button>
      <div ref={divRef}></div>
    </div>
  );
};

export default SheetMusicEditor;