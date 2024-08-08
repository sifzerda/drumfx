import React, { useState, useRef } from 'react';
import { Howl } from 'howler';
import abcjs from 'abcjs';

// Define the drum sounds
const createSound = (src) => new Howl({ src, html5: true });

const sounds = {
  kick: createSound('../../public/sounds/kick1.mp3'),
  snare: createSound('../../public/sounds/snareOn1.mp3'),
  rimshot: createSound('../../public/sounds/rimshot1.mp3'),
  sidestick: createSound('../../public/sounds/crosstick2.mp3'),
  hiHat: createSound('../../public/sounds/hhX1.mp3'),
  crash: createSound('../../public/sounds/crash1.mp3'),
  crashChoke: createSound('../../public/sounds/crashChoke.mp3'),
  rideCymbal: createSound('../../public/sounds/rideEdge1.mp3'),
  rideBell: createSound('../../public/sounds/rideBell1.mp3'),
  rideChoke: createSound('../../public/sounds/rideChoke1.mp3'),
  highTom: createSound('../../public/sounds/hTom1.mp3'),
  mediumTom: createSound('../../public/sounds/mTom1.mp3'),
  floorTom: createSound('../../public/sounds/fTom1.mp3'),
};

// Create a pattern with 16 steps
const steps = Array.from({ length: 16 }, (_, index) => index);

const Tab = () => {
  const [pattern, setPattern] = useState({
    kick: Array(16).fill(false),
    snare: Array(16).fill(false),
    hiHat: Array(16).fill(false),
    crash: Array(16).fill(false),
    rideCymbal: Array(16).fill(false),
    highTom: Array(16).fill(false),
    mediumTom: Array(16).fill(false),
    floorTom: Array(16).fill(false),
  });

  const [currentSnare, setCurrentSnare] = useState('snare');
  const [currentCrash, setCurrentCrash] = useState('crash');
  const [currentRide, setCurrentRide] = useState('rideCymbal');

  const [tempo, setTempo] = useState(100); // Default tempo
  const intervalRef = useRef(null);
  const sheetRef = useRef(null);

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
      Object.keys(pattern).forEach((drum) => {
        if (pattern[drum][step]) {
          if (drum === 'snare') {
            sounds[currentSnare].play();
          } else if (drum === 'crash') {
            sounds[currentCrash].play();
          } else if (drum === 'rideCymbal') {
            sounds[currentRide].play();
          } else {
            sounds[drum].play();
          }
        }
      });

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
    Object.values(sounds).forEach((sound) => sound.stop());
  };

  const handleTempoChange = (e) => {
    setTempo(Number(e.target.value));
  };

  const handleRightClick = (e, row) => {
    e.preventDefault();
    if (row === 'snare') {
      const nextSnare = currentSnare === 'snare'
        ? 'rimshot'
        : currentSnare === 'rimshot'
        ? 'sidestick'
        : 'snare';
      setCurrentSnare(nextSnare);
    } else if (row === 'crash') {
      const nextCrash = currentCrash === 'crash'
        ? 'crashChoke'
        : 'crash';
      setCurrentCrash(nextCrash);
    } else if (row === 'rideCymbal') {
      const nextRide = currentRide === 'rideCymbal'
        ? 'rideBell'
        : currentRide === 'rideBell'
        ? 'rideChoke'
        : 'rideCymbal';
      setCurrentRide(nextRide);
    }
  };

  const Barline = () => (
    <div
      style={{
        width: '2px',
        height: '100%',
        backgroundColor: '#333',
        margin: '0 5px',
      }}
    />
  );

  const transposeToSheet = () => {
    // Create ABC notation based on the pattern
    let abcNotation = 'X:1\nT:Drum Pattern\nM:4/4\nL:1/4\nK:C\n';

    Object.keys(pattern).forEach((drum, rowIndex) => {
      let drumPattern = pattern[drum].map((hit) => (hit ? 'x' : '-')).join('');
      abcNotation += `V:1\n${drumPattern} | `;
    });

    // Display the sheet music using abcjs
    abcjs.renderAbc(sheetRef.current, abcNotation);
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
            marginRight: '10px',
          }}
        />
        <input
          type="range"
          value={tempo}
          onChange={handleTempoChange}
          min="40"
          max="200"
          style={{
            width: '200px',
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

      <button
        onClick={transposeToSheet}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Add Sheet
      </button>

      <div ref={sheetRef} style={{ marginTop: '20px' }}>
        {/* Sheet music will be rendered here */}
      </div>

      {Object.keys(pattern).map((row) => (
        <div key={row} style={{ marginBottom: '20px' }}>
          <h2>{row === 'snare' ? currentSnare : row === 'crash' ? currentCrash : row === 'rideCymbal' ? currentRide : row}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {steps.map((step) => (
              <React.Fragment key={step}>
                <button
                  onClick={() => toggleNote(row, step)}
                  onContextMenu={(e) => handleRightClick(e, row)} // Add right-click handler for all rows
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: pattern[row][step] ? '#007bff' : '#ccc',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                />
                {(step + 1) % 8 === 0 && <Barline />} {/* Insert barline every 8 steps */}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tab;