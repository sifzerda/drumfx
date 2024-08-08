import React, { useState, useRef } from 'react';
import { Howl } from 'howler';

// Define the drum sounds
const createSound = (src) => new Howl({ src, html5: true });

const sounds = {
  kick: createSound('../../public/sounds/kick1.mp3'),
  snare: createSound('../../public/sounds/snareOn1.mp3'),
  hiHat: createSound('../../public/sounds/hhX1.mp3'),
};

// Create a pattern with 16 steps
const steps = Array.from({ length: 16 }, (_, index) => index);

const Tab = () => {
  const [pattern, setPattern] = useState({
    kick: Array(16).fill(false),
    snare: Array(16).fill(false),
    hiHat: Array(16).fill(false),
  });
  const [tempo, setTempo] = useState(120); // Default tempo
  const intervalRef = useRef(null);

  const toggleNote = (row, step) => {
    const newPattern = { ...pattern };
    newPattern[row][step] = !newPattern[row][step];
    setPattern(newPattern);
  };

  const playPattern = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let step = 0;
    const stepInterval = 60000 / tempo / 4; // Calculate interval time for the current tempo

    const playStep = () => {
      // Play sounds based on the current step
      if (pattern.kick[step]) sounds.kick.play();
      if (pattern.snare[step]) sounds.snare.play();
      if (pattern.hiHat[step]) sounds.hiHat.play();

      step = (step + 1) % steps.length;
    };

    intervalRef.current = setInterval(playStep, stepInterval);
  };

  const stopPattern = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Stop all sounds (optional, if you want to ensure no sounds are playing when stopped)
    sounds.kick.stop();
    sounds.snare.stop();
    sounds.hiHat.stop();
  };

  const handleTempoChange = (e) => {
    setTempo(Number(e.target.value));
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Drum Machine</h1>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Tempo:</label>
        <input
          type="number"
          value={tempo}
          onChange={handleTempoChange}
          min="40"
          max="200"
          style={{
            width: '80px',
            padding: '5px',
            fontSize: '16px',
            textAlign: 'center',
          }}
        />
        <span style={{ marginLeft: '10px' }}>BPM</span>
      </div>

      <button
        onClick={playPattern}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Play Pattern
      </button>

      <button
        onClick={stopPattern}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          marginLeft: '10px',
        }}
      >
        Stop Pattern
      </button>

      {['hiHat', 'snare', 'kick'].map((row) => (
        <div key={row} style={{ marginBottom: '20px' }}>
          <h2>{row}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
            {steps.map((step) => (
              <button
                key={step}
                onClick={() => toggleNote(row, step)}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: pattern[row][step] ? '#007bff' : '#ccc',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tab;