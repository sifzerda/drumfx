import { useState, useRef } from "react";
import { Howl } from "howler";
import abcjs from "abcjs";

// Define the drum sounds
const createSound = (src) => new Howl({ src, html5: true });

const sounds = {
  kick: createSound("/sounds/ezd/kick1.mp3"),
  snare: createSound("/sounds/ezd/snareOn1.mp3"),
  rimshot: createSound("/sounds/ezd/rimshot1.mp3"),
  sidestick: createSound("/sounds/ezd/crosstick2.mp3"),
  hiHat: createSound("/sounds/ezd/hhX1.mp3"),
  crash: createSound("/sounds/ezd/crash1.mp3"),
  crashChoke: createSound("/sounds/ezd/crashChoke.mp3"),
  rideCymbal: createSound("/sounds/ezd/rideEdge1.mp3"),
  rideBell: createSound("/sounds/ezd/rideBell1.mp3"),
  rideChoke: createSound("/sounds/ezd/rideChoke1.mp3"),
  highTom: createSound("/sounds/ezd/hTom1.mp3"),
  mediumTom: createSound("/sounds/ezd/mTom1.mp3"),
  floorTom: createSound("/sounds/ezd/fTom1.mp3"),
};

// Create a pattern with 16 steps
const steps = Array.from({ length: 16 }, (_, index) => index);

// Initialize a new pattern
const initializePattern = () => ({
  kick: Array(16).fill(false),
  snare: Array(16).fill(false),
  hiHat: Array(16).fill(false),
  crash: Array(16).fill(false),
  rideCymbal: Array(16).fill(false),
  highTom: Array(16).fill(false),
  mediumTom: Array(16).fill(false),
  floorTom: Array(16).fill(false),
});

const Tab = () => {
  const [pattern, setPattern] = useState(initializePattern());
  const [currentSnare, setCurrentSnare] = useState("snare");
  const [currentCrash, setCurrentCrash] = useState("crash");
  const [currentRide, setCurrentRide] = useState("rideCymbal");
  const [tempo, setTempo] = useState(100); // Default tempo
  const [bars, setBars] = useState([]);

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
          if (drum === "snare") {
            sounds[currentSnare].play();
          } else if (drum === "crash") {
            sounds[currentCrash].play();
          } else if (drum === "rideCymbal") {
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
    if (row === "snare") {
      const nextSnare =
        currentSnare === "snare"
          ? "rimshot"
          : currentSnare === "rimshot"
          ? "sidestick"
          : "snare";
      setCurrentSnare(nextSnare);
    } else if (row === "crash") {
      const nextCrash = currentCrash === "crash" ? "crashChoke" : "crash";
      setCurrentCrash(nextCrash);
    } else if (row === "rideCymbal") {
      const nextRide =
        currentRide === "rideCymbal"
          ? "rideBell"
          : currentRide === "rideBell"
          ? "rideChoke"
          : "rideCymbal";
      setCurrentRide(nextRide);
    }
  };

  const Barline = () => (
    <div
      style={{
        width: "2px",
        height: "100%",
        backgroundColor: "#333",
        margin: "0 5px",
      }}
    />
  );

  const transposeToSheet = () => {
    // Clone the current pattern to append to bars
    const newPattern = JSON.parse(JSON.stringify(pattern));
  
    setBars((prevBars) => {
      const newBars = [...prevBars, newPattern];
  
      // Create ABC notation for all bars
      let abcNotation = "X:1\nT:Drum Pattern\nM:4/4\nL:1/16\nK:C\n";
  
      // Map each drum to a unique note representation
      const drumMap = {
        kick: "e,", //
        snare: "c", //
        hiHat: "x", //
        crash: "A'",  //
        highTom: "e", //
        mediumTom: "d", //
        floorTom: "a,", //
      };
  
      // Group bars into sets of four for line breaks
      let barCount = 0;
      newBars.forEach((bar, index) => {
        if (barCount > 0 && barCount % 4 === 0) {
          abcNotation += "\n"; // Add a line break every four bars
        }
  
        for (let step = 0; step < 16; step++) {
          let stepPattern = "";
          Object.keys(bar).forEach((drum) => {
            if (bar[drum][step]) {
              stepPattern += drumMap[drum];
            }
          });
          // If there are multiple drum hits at the same time, put them in brackets
          abcNotation += stepPattern ? `[${stepPattern}]` : "z";
        }
        abcNotation += "|"; // Add a barline at the end of each bar
  
        barCount++;
      });
  
      // Render the entire notation
      abcjs.renderAbc(sheetRef.current, abcNotation);
  
      return newBars;
    });
  };

  return (
    <div className="container-one">
      <h1>Playback Controls</h1>
      <div className="container-two">
        <label>Tempo:</label>
        <input
          type="number"
          value={tempo}
          onChange={handleTempoChange}
          min="40"
          max="200"
        />
        <input
          className="tempo-slider"
          type="range"
          value={tempo}
          onChange={handleTempoChange}
          min="40"
          max="200"
        />
        <span>BPM</span>
      </div>

      <button className="play-btn" onClick={playPattern}>
        Play Pattern
      </button>
      <button className="stop-btn" onClick={stopPattern}>
        Stop Pattern
      </button>

      <button className="transpose-btn" onClick={transposeToSheet}>
        Add Sheet
      </button>

      <div className="sheetref" ref={sheetRef}>
        {/* Sheet music is rendered here */}
      </div>

      {Object.keys(pattern).map((row) => (
        <div className="container-three" key={row}>
          <h2>
            {row === "snare"
              ? currentSnare
              : row === "crash"
              ? currentCrash
              : row === "rideCymbal"
              ? currentRide
              : row}
          </h2>
          <div className="container-four">
            {steps.map((step) => (
              <div
                className="container-five"
                key={step}
                onClick={() => toggleNote(row, step)}
                onContextMenu={(e) => handleRightClick(e, row)}
                style={{
                  backgroundColor: pattern[row][step] ? "#4caf50" : "#e0e0e0",
                  color: pattern[row][step] ? "white" : "black",
                  userSelect: "none",
                }}
              >
                {step + 1}
                {step % 4 === 3 && <Barline />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tab;