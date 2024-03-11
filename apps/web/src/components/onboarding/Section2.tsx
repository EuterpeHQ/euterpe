// Section2.tsx
import React from "react";

interface Section2Props {
  onBack: () => void;
  onNext: () => void;
}

const Section2: React.FC<Section2Props> = ({ onBack, onNext }) => {
  return (
    <div>
      <h2>Section 2</h2>
      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Section2;
