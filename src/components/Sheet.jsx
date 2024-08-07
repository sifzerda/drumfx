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
    if (divRef.current) {
      // Clear the div to re-render
      divRef.current.innerHTML = '';

      // Create an SVG renderer and attach it to the div
      const renderer = new VF.Renderer(divRef.current, VF.Renderer.Backends.SVG);

      // Configure the rendering context
      const context = renderer.getContext();
      renderer.resize(500, 120 * measures.length); // Adjust height based on the number of measures

      measures.forEach((_, index) => {
        // Create a stave for each measure
        const stave = new VF.Stave(10, index * 100, 400);
        stave.addClef('treble').addTimeSignature('4/4');
        stave.setContext(context).draw();
      });
    }
  }, [measures]);

  return (
    <div>
      <button onClick={addMeasure}>Add Bar</button>
      <div ref={divRef}></div>
    </div>
  );
};

export default Sheet;