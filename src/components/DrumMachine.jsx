// src/DrumMachine.js
import { useState, useEffect } from 'react';

const drumPads = [
  { keyCode: 81, key: 'agogo High', sound: 'sounds/agogoHigh.mp3', label: 'agogô high' }, // key: Q
  { keyCode: 87, key: 'agogo Low', sound: 'sounds/agogoLow.mp3', label: 'agogô low' }, // key: W
  { keyCode: 69, key: 'cowbell', sound: 'sounds/cowbell.mp3', label: 'Cowbell' }, // key: E
  { keyCode: 82, key: 'crash 1', sound: 'sounds/crash1.mp3', label: 'Crash low' }, // key: A
  { keyCode: 84, key: 'crash choke', sound: 'sounds/crashChoke.mp3', label: 'Crash choke' }, // key: S
  { keyCode: 89, key: 'crash 2 (high)', sound: 'sounds/crash2.mp3', label: 'Crash 2' }, // key: D
  { keyCode: 85, key: 'crash 2 choke', sound: 'sounds/crash2Choke.mp3', label: 'Crash 2 choke' }, // key: Z
  { keyCode: 73, key: 'side-stick 1', sound: 'sounds/crosstick1.mp3', label: 'Side stick 1' }, // key: X
  { keyCode: 79, key: 'side-stick 2', sound: 'sounds/crosstick2.mp3', label: 'Side stick 2' }, // key: C
  { keyCode: 80, key: 'floor tom 1', sound: 'sounds/fTom1.mp3', label: 'Floor Tom 1' }, // key: Q
  { keyCode: 68, key: 'floor tom 2 (low)', sound: 'sounds/fTom2.mp3', label: 'Floor Tom 2' }, // key: W
  { keyCode: 70, key: 'high-hat pedal', sound: 'sounds/hhFoot1.mp3', label: 'High-hat Pedal' }, // key: E
  { keyCode: 71, key: 'high-hat (open)', sound: 'sounds/hhO1.mp3', label: 'High-hat Open' }, // key: A
  { keyCode: 72, key: 'high-hat (closed)', sound: 'sounds/hhX1.mp3', label: 'High-hat Closed' }, // key: S
  { keyCode: 74, key: 'high tom', sound: 'sounds/hTom1.mp3', label: 'High Tom' }, // key: D
  { keyCode: 75, key: 'high tom 2', sound: 'sounds/hTom2.mp3', label: 'High Tom 2' }, // key: Z
  { keyCode: 76, key: 'kick', sound: 'sounds/kick1.mp3', label: 'Kick' }, // key: X
  { keyCode: 90, key: 'low tom', sound: 'sounds/mTom1.mp3', label: 'Low Tom' }, // key: C
  { keyCode: 88, key: 'ride bell', sound: 'sounds/rideBell1.mp3', label: 'Ride Bell' }, // key: Q
  { keyCode: 67, key: 'ride choke', sound: 'sounds/rideChoke1.mp3', label: 'Ride Choke' }, // key: W
  { keyCode: 86, key: 'ride edge', sound: 'sounds/rideEdge1.mp3', label: 'Ride Edge' }, // key: E
  { keyCode: 66, key: 'ride bow', sound: 'sounds/rideMid1.mp3', label: 'Ride Bow' }, // key: A
  { keyCode: 78, key: 'snare rimshot', sound: 'sounds/rimshot1.mp3', label: 'Rimshot' }, // key: S
  { keyCode: 77, key: 'snare (on)', sound: 'sounds/snareOn1.mp3', label: 'Snare On' }, // key: D
  { keyCode: 96, key: 'splash', sound: 'sounds/splash1.mp3', label: 'Splash' }, // key: Z
  { keyCode: 49, key: 'splash choke', sound: 'sounds/splashChoke.mp3', label: 'Splash Choke' }, // key: X];
];





//  const songs = [
//    { sound: 'sounds/agogoHigh.mp3', title: '01 The Alcoholic - Röyksopp' },
//    { sound: 'sounds/agogoLow.mp3', title: '01 The Alcoholic - Röyksopp' },

//    { url: 'sounds/shrine.mp3', title: '03 The Shrine (OKIOK Remix) - Jaga Jazzist' },
//    { url: 'sounds/aumetra.mp3', title: '04 Aumetra the Witch - cYsmix' },
//    { url: 'sounds/ouroboros.mp3', title: '05 Ouroboros - Beats Antique' },
//    { url: 'sounds/aurevoir.mp3', title: '06 Aurevoir - Pyramid' },
//    { url: 'sounds/father.mp3', title: '07 Father - Pyramid' },
//    { url: 'sounds/panthertrek.mp3', title: '08 Panther Trek - Vessels' },
//    { url: 'sounds/bhangrasaanj.mp3', title: '09 Bhangra Saanj - Beats Antique' },
 //   { url: 'sounds/占い師ft.mp3', title: '10 占い師 Fortune Teller - cYsmix' },
 //   { url: 'sounds/topaz.mp3', title: '11 Topaz - Bazz' },
//    { url: 'sounds/sunofagun.mp3', title: '12 Sun of a Gun - Bazz' },
 //   { url: 'sounds/dzjin.mp3', title: '13 Dzjin - cYsmix' },
 //   { url: 'sounds/starfire.mp3', title: '14 Starfire - Jaga Jazzist' },
 //   { url: 'sounds/oban.mp3', title: '14 Oban - Jaga Jazzist' },
//    { url: 'sounds/apex.mp3', title: '14 Apex - Jaga Jazzist' },
 // ];

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