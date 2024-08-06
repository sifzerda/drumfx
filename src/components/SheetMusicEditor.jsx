// src/SheetMusicEditor.js

// src/SheetMusicEditor.js

import { useState, useEffect, useRef } from 'react';
import Vex from 'vexflow';

const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;

const SheetMusicEditor = () => {
  const [notes, setNotes] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

    const stave = new Stave(10, 40, 400);
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    const vexNotes = notes.map((note) =>
      new StaveNote({
        keys: ['c/4'],
        duration: note === 'Quarter' ? 'q' : 'w',
      })
    );

    // Calculate the total beats used by the notes
    const totalBeats = notes.reduce((sum, note) => sum + (note === 'Quarter' ? 1 : 4), 0);
    const remainingBeats = 4 - totalBeats;

    // Add appropriate rests if the measure is incomplete
    if (remainingBeats > 0) {
      let restDuration;
      if (remainingBeats === 1) {
        restDuration = 'qr'; // quarter rest
      } else if (remainingBeats === 2) {
        restDuration = 'hr'; // half rest
      } else if (remainingBeats === 4) {
        restDuration = 'wr'; // whole rest
      }

      if (restDuration) {
        vexNotes.push(
          new StaveNote({
            keys: ['b/4'], // Position the rest correctly on the stave
            duration: restDuration,
          })
        );
      }
    }

    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(vexNotes);

    new Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);
  }, [notes]);

  const handleDragStart = (event, noteType) => {
    event.dataTransfer.setData('noteType', noteType);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const noteType = event.dataTransfer.getData('noteType');
    const newNotes = [...notes, noteType];
    setNotes(newNotes);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const renderNote = (type) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, type)}
      style={{
        width: 40,
        height: 40,
        margin: 5,
        cursor: 'grab',
        border: '1px solid black',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      }}
    >
      {type}
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <div>
        {renderNote('Quarter')}
        {renderNote('Whole')}
      </div>
      <div
        ref={containerRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: '1px solid black', marginTop: 20 }}
      />
    </div>
  );
};

export default SheetMusicEditor;