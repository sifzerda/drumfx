import { useState, useEffect, useRef } from 'react';
import Vex from 'vexflow';

const VF = Vex.Flow;

const Sheet = () => {
  const [measures, setMeasures] = useState([]);
  const divRef = useRef(null);

  const addMeasure = () => {
    setMeasures([...measures, {}]); // Add an empty object to represent a measure
  };

  useEffect(() => {
    const resizeHandler = () => {
      if (divRef.current) {
        // Clear the div to re-render
        divRef.current.innerHTML = '';

        // Get the width of the container
        const containerWidth = divRef.current.clientWidth;

        // Calculate the width per measure (4 measures per line)
        const widthPerMeasure = (containerWidth - 20) / 4;

        // Create an SVG renderer and attach it to the div
        const renderer = new VF.Renderer(
          divRef.current,
          VF.Renderer.Backends.SVG
        );

        // Configure the rendering context
        const context = renderer.getContext();
        const heightPerLine = 150; // Height per stave line

        // Calculate the total height needed for all lines
        const numberOfLines = Math.ceil(measures.length / 4);
        renderer.resize(containerWidth, numberOfLines * heightPerLine);

        measures.forEach((_, index) => {
          // Determine the line number and x, y position for each measure
          const lineNumber = Math.floor(index / 4);
          const x = 10 + (index % 4) * widthPerMeasure; // Divide the width equally among 4 staves
          const y = lineNumber * heightPerLine;

          // Create a stave for each measure
          const stave = new VF.Stave(x, y, widthPerMeasure);
          stave.addClef('treble').addTimeSignature('4/4');
          stave.setContext(context).draw();
        });
      }
    };

    resizeHandler(); // Initial render
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [measures]);

  return (
    <div>
      <button onClick={addMeasure}>Add Bar</button>
      <div ref={divRef} style={{ width: '100%', minHeight: '100vh' }}></div>
    </div>
  );
};

export default Sheet;