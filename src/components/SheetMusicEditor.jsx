import { useState, useRef } from "react";
import { Howl } from "howler";
import Vex from "vexflow";

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
  const vexflowRef = useRef(null);

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

  const addToSheet = () => {
    if (!vexflowRef.current) return;

    // Create VexFlow renderer
    const VF = Vex.Flow;
    const div = vexflowRef.current;
    div.innerHTML = ""; // Clear existing sheet music

    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();
    const stave = new VF.Stave(10, 40, 400);

    stave.addClef("percussion").setContext(context).draw();

    const notes = [];

    // Convert the pattern to VexFlow notes
    steps.forEach((step) => {
      const keys = [];

      if (pattern.kick[step]) keys.push("C/4");
      if (pattern.snare[step]) keys.push("D/4");
      if (pattern.hiHat[step]) keys.push("F#/4");
      if (pattern.crash[step]) keys.push("G/4");
      if (pattern.rideCymbal[step]) keys.push("A/4");
      if (pattern.highTom[step]) keys.push("B/4");
      if (pattern.mediumTom[step]) keys.push("E/4");
      if (pattern.floorTom[step]) keys.push("G/3");

      if (keys.length > 0) {
        notes.push(
          new VF.StaveNote({
            keys: keys,
            duration: "q",
          })
        );
      } else {
        notes.push(
          new VF.StaveNote({
            keys: ["b/4"], // Rest note
            duration: "qr",
          })
        );
      }
    });

    // Create a voice and add the notes
    const voice = new VF.Voice({ num_beats: 16, beat_value: 4 });
    voice.addTickables(notes);

    // Format and draw
    new VF.Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);
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
      <button className="add-to-sheet-btn" onClick={addToSheet}>
        Add to Sheet
      </button>

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
              </div>
            ))}
          </div>
        </div>
      ))}

      <div ref={vexflowRef} />
    </div>
  );
};

export default Tab;