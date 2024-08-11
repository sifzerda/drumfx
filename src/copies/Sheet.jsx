import { useState, useEffect, useRef } from 'react';
import Vex from 'vexflow';

const VF = Vex.Flow;

const Sheet = () => {
  const [measures, setMeasures] = useState([]);
  const divRef = useRef(null);

  const addMeasure = () => {
    setMeasures([...measures, { notes: [] }]);
  };

  const addFullNote = () => {
    setMeasures((prevMeasures) => {
      const newMeasures = [...prevMeasures];
      const lastMeasure = newMeasures[newMeasures.length - 1];

      if (lastMeasure && lastMeasure.notes.length === 0) {
        lastMeasure.notes.push(new VF.StaveNote({
          clef: 'treble',
          keys: ['c/4'], // C4 whole note
          duration: 'w', // Whole note
        }));
      }

      return newMeasures;
    });
  };

  useEffect(() => {
    const resizeHandler = () => {
      if (divRef.current) {
        divRef.current.innerHTML = '';

        const containerWidth = divRef.current.clientWidth;
        const widthPerMeasure = (containerWidth - 20) / 4;

        const renderer = new VF.Renderer(
          divRef.current,
          VF.Renderer.Backends.SVG
        );

        const context = renderer.getContext();
        const heightPerLine = 150;

        const numberOfLines = Math.ceil(measures.length / 4);
        renderer.resize(containerWidth, numberOfLines * heightPerLine);

        measures.forEach((measure, index) => {
          const lineNumber = Math.floor(index / 4);
          const x = 10 + (index % 4) * widthPerMeasure;
          const y = lineNumber * heightPerLine;

          const stave = new VF.Stave(x, y, widthPerMeasure);
          stave.addClef('treble').addTimeSignature('4/4');
          stave.setContext(context).draw();

          if (measure.notes.length > 0) {
            const voice = new VF.Voice({
              num_beats: 4,
              beat_value: 4,
              resolution: VF.RESOLUTION
            });

            // Add notes to the voice
            voice.addTickables(measure.notes);

            // Create a formatter to format the notes within the measure
            const formatter = new VF.Formatter().joinVoices([voice]).format([voice], widthPerMeasure - 20);

            // Draw the notes on the stave
            voice.draw(context, stave);
          }
        });
      }
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [measures]);

  return (
    <div>
      <button onClick={addMeasure}>Add Bar</button>
      <button onClick={addFullNote}>Add Whole Note</button>
      <div ref={divRef} style={{ width: '100%', minHeight: '100vh' }}></div>
    </div>
  );
};

export default Sheet;