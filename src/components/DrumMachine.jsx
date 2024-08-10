// src/DrumMachine.js
import { useState, useEffect } from 'react';
import drumKitPic from '../assets/drum-kit.jpg';

// put this in separate component once finalized
const drumPads = [
  { keyCode: 81, key: 'agogo High', sound: 'sounds/ezd/agogoHigh.mp3', label: 'agogô high' }, // key: Q
  { keyCode: 87, key: 'agogo Low', sound: 'sounds/ezd/agogoLow.mp3', label: 'agogô low' }, // key: W
  { keyCode: 69, key: 'cowbell', sound: 'sounds/ezd/cowbell.mp3', label: 'Cowbell' }, // key: E
  { keyCode: 82, key: 'crash 1', sound: 'sounds/ezd/crash1.mp3', label: 'Crash low' }, // key: A
  { keyCode: 84, key: 'crash choke', sound: 'sounds/ezd/crashChoke.mp3', label: 'Crash choke' }, // key: S
  { keyCode: 89, key: 'crash 2 (high)', sound: 'sounds/ezd/crash2.mp3', label: 'Crash 2' }, // key: D
  { keyCode: 85, key: 'crash 2 choke', sound: 'sounds/ezd/crash2Choke.mp3', label: 'Crash 2 choke' }, // key: Z
  { keyCode: 73, key: 'side-stick 1', sound: 'sounds/ezd/crosstick1.mp3', label: 'Side stick 1' }, // key: X
  { keyCode: 79, key: 'side-stick 2', sound: 'sounds/ezd/crosstick2.mp3', label: 'Side stick 2' }, // key: C
  { keyCode: 80, key: 'floor tom 1', sound: 'sounds/ezd/fTom1.mp3', label: 'Floor Tom 1' }, // key: Q
  { keyCode: 68, key: 'floor tom 2 (low)', sound: 'sounds/ezd/fTom2.mp3', label: 'Floor Tom 2' }, // key: W
  { keyCode: 70, key: 'high-hat pedal', sound: 'sounds/ezd/hhFoot1.mp3', label: 'High-hat Pedal' }, // key: E
  { keyCode: 71, key: 'high-hat (open)', sound: 'sounds/ezd/hhO1.mp3', label: 'High-hat Open' }, // key: A
  { keyCode: 72, key: 'high-hat (closed)', sound: 'sounds/ezd/hhX1.mp3', label: 'High-hat Closed' }, // key: S
  { keyCode: 74, key: 'high tom', sound: 'sounds/ezd/hTom1.mp3', label: 'High Tom' }, // key: D
  { keyCode: 75, key: 'high tom 2', sound: 'sounds/ezd/hTom2.mp3', label: 'High Tom 2' }, // key: Z
  { keyCode: 76, key: 'kick', sound: 'sounds/ezd/kick1.mp3', label: 'Kick' }, // key: X
  { keyCode: 90, key: 'low tom', sound: 'sounds/ezd/mTom1.mp3', label: 'Low Tom' }, // key: C
  { keyCode: 88, key: 'ride bell', sound: 'sounds/ezd/rideBell1.mp3', label: 'Ride Bell' }, // key: Q
  { keyCode: 67, key: 'ride choke', sound: 'sounds/ezd/rideChoke1.mp3', label: 'Ride Choke' }, // key: W
  { keyCode: 86, key: 'ride edge', sound: 'sounds/ezd/rideEdge1.mp3', label: 'Ride Edge' }, // key: E
  { keyCode: 66, key: 'ride bow', sound: 'sounds/ezd/rideMid1.mp3', label: 'Ride Bow' }, // key: A
  { keyCode: 78, key: 'snare rimshot', sound: 'sounds/ezd/rimshot1.mp3', label: 'Rimshot' }, // key: S
  { keyCode: 77, key: 'snare (on)', sound: 'sounds/ezd/snareOn1.mp3', label: 'Snare On' }, // key: D
  { keyCode: 96, key: 'splash', sound: 'sounds/ezd/splash1.mp3', label: 'Splash' }, // key: Z
  { keyCode: 49, key: 'splash choke', sound: 'sounds/ezd/splashChoke.mp3', label: 'Splash Choke' }, // key: X];
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

  // snare pad img onclick
  const handleSnareButtonClick = () => {
    const snarePad = drumPads.find(p => p.key === 'snare (on)');
    if (snarePad) {
      playSound(snarePad.key, snarePad.label);
    }
  };

  // handle kick button click
  const handleKickButtonClick = () => {
    const kickPad = drumPads.find((p) => p.key === 'kick');
    if (kickPad) {
      playSound(kickPad.key, kickPad.label);
    }
  };

  // handle high-hat button click
  const handleHighHatButtonClick = () => {
    const highHatPad = drumPads.find((p) => p.key === 'high-hat (closed)');
    if (highHatPad) {
      playSound(highHatPad.key, highHatPad.label);
    }
  };

  // handle crash button click
  const handleCrashButtonClick = () => {
    const crashPad = drumPads.find((p) => p.key === 'crash 2 (high)');
    if (crashPad) {
      playSound(crashPad.key, crashPad.label);
    }
  };

  // handle crash2 button click
  const handleCrash2ButtonClick = () => {
    const crash2Pad = drumPads.find((p) => p.key === 'crash 1');
    if (crash2Pad) {
      playSound(crash2Pad.key, crash2Pad.label);
    }
  };

  // handle ride button click
  const handleRideButtonClick = () => {
    const ridePad = drumPads.find((p) => p.key === 'ride edge');
    if (ridePad) {
      playSound(ridePad.key, ridePad.label);
    }
  };

  // handle hh pedal button click
  const handleHighHatPedalButtonClick = () => {
    const highHatPedalPad = drumPads.find((p) => p.key === 'high-hat pedal');
    if (highHatPedalPad) {
      playSound(highHatPedalPad.key, highHatPedalPad.label);
    }
  };

  // handle high tom button click
  const handleHighButtonClick = () => {
    const highPad = drumPads.find((p) => p.key === 'high tom 2');
    if (highPad) {
      playSound(highPad.key, highPad.label);
    }
  };

  // handle med tom button click
  const handleMedButtonClick = () => {
    const medPad = drumPads.find((p) => p.key === 'low tom');
    if (medPad) {
      playSound(medPad.key, medPad.label);
    }
  };

  // handle floor button click
  const handleFloorButtonClick = () => {
    const floorPad = drumPads.find((p) => p.key === 'floor tom 1');
    if (floorPad) {
      playSound(floorPad.key, floorPad.label);
    }
  };

  // handle agogo button click
  const handleAgogo1ButtonClick = () => {
    const floorPad = drumPads.find((p) => p.key === 'agogo High');
    if (floorPad) {
      playSound(floorPad.key, floorPad.label);
    }
  };

  // handle agogo2 button click
  const handleAgogo2ButtonClick = () => {
    const floorPad = drumPads.find((p) => p.key === 'agogo Low');
    if (floorPad) {
      playSound(floorPad.key, floorPad.label);
    }
  };

  // handle agogo2 button click
  const handleCowbellButtonClick = () => {
    const floorPad = drumPads.find((p) => p.key === 'cowbell');
    if (floorPad) {
      playSound(floorPad.key, floorPad.label);
    }
  };

  return (
    <div>
      <div className="image-container" style={{ position: 'relative' }}>
        <img src={drumKitPic} alt="Drum Machine" style={{ width: '100%' }} />
        {/* Non-working button layered over the image */}
        <button className="snare-btn" onClick={handleSnareButtonClick}></button>
        <button className="kick-btn" onClick={handleKickButtonClick}></button>
        <button className="hihat-btn" onClick={handleHighHatButtonClick}></button>
        <button className="crash-btn" onClick={handleCrashButtonClick}></button>
        <button className="crash2-btn" onClick={handleCrash2ButtonClick}></button>
        <button className="ride-btn" onClick={handleRideButtonClick}></button>
        <button className="hihat-pedal-btn" onClick={handleHighHatPedalButtonClick}></button>
        <button className="high-tom-btn" onClick={handleHighButtonClick}></button>
        <button className="med-tom-btn" onClick={handleMedButtonClick}></button>
        <button className="floor-tom-btn" onClick={handleFloorButtonClick}></button>

        <button className="agogo1-btn" onClick={handleAgogo1ButtonClick}></button>
        <button className="agogo2-btn" onClick={handleAgogo2ButtonClick}></button>
        <button className="cowbell-btn" onClick={handleCowbellButtonClick}></button>

      </div>
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
    </div>
  );
}

export default DrumMachine;