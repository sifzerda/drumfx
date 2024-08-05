// src/DrumMachine.js
import { useState, useEffect } from 'react';

const drumPads = [
    { keyCode: 81, key: 'Q', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', label: 'Heater 1' },
    { keyCode: 87, key: 'W', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', label: 'Heater 2' },
    { keyCode: 69, key: 'E', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', label: 'Heater 3' },
    { keyCode: 65, key: 'A', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', label: 'Heater 4' },
    { keyCode: 83, key: 'S', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', label: 'Clap' },
    { keyCode: 68, key: 'D', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', label: 'Open-HH' },
    { keyCode: 90, key: 'Z', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', label: 'Kick-n-Hat' },
    { keyCode: 88, key: 'X', sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', label: 'Kick' },
    { keyCode: 67, key: 'C', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', label: 'Closed-HH' },
    { keyCode: 49, key: '1', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', label: 'Chord 1' },
    { keyCode: 50, key: '2', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3', label: 'Chord 2' },
    { keyCode: 51, key: '3', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', label: 'Chord 3' },
    { keyCode: 52, key: '4', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3', label: 'Shaker' },
    { keyCode: 53, key: '5', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3', label: 'Dry-Ohh' },
    { keyCode: 54, key: '6', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3', label: 'Bld-H1' },
    { keyCode: 55, key: '7', sound: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', label: 'Punchy Kick' },
    { keyCode: 56, key: '8', sound: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', label: 'Side Stick' },
    { keyCode: 57, key: '9', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', label: 'Snare' },
    { keyCode: 48, key: '0', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', label: 'Chord 1' },
    { keyCode: 189, key: '-', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3', label: 'Chord 2' },
    { keyCode: 187, key: '=', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', label: 'Chord 3' },
    { keyCode: 219, key: '[', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', label: 'Heater 1' },
    { keyCode: 221, key: ']', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', label: 'Heater 2' },
    { keyCode: 220, key: '\\', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', label: 'Heater 3' },
    { keyCode: 186, key: ';', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', label: 'Heater 4' },
    { keyCode: 222, key: "'", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', label: 'Clap' },
    { keyCode: 188, key: ',', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', label: 'Open-HH' },
    { keyCode: 190, key: '.', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', label: 'Kick-n-Hat' },
    { keyCode: 191, key: '/', sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', label: 'Kick' }
  ];

  function DrumMachine() {
    const [display, setDisplay] = useState('');
  
    const playSound = (key, label) => {
      const audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.play();
      setDisplay(label);
    };
  
    const handleKeyPress = (e) => {
      const pad = drumPads.find(p => p.keyCode === e.keyCode);
      if (pad) {
        playSound(pad.key, pad.label);
      }
    };
  
    useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, []);
  
    return (
      <div className="drum-machine" id="drum-machine">
        <div className="display" id="display">{display}</div>
        <div className="drum-pads">
          {drumPads.map(pad => (
            <button
              key={pad.key}
              className="drum-pad"
              id={pad.label}
              onClick={() => playSound(pad.key, pad.label)}
            >
              {pad.key}
              <audio className="clip" id={pad.key} src={pad.sound}></audio>
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default DrumMachine;