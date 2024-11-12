import React, { useState } from "react";

interface InterruptorProps {
  onToggle?: (isOn: boolean) => void;
}

const Interruptor: React.FC<InterruptorProps> = ({ onToggle }) => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsOn(!isOn);

    if (onToggle) {
      onToggle(!isOn);
    }
  };

  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 
                  ${isOn ? "bg-green-500" : "bg-gray-300"}`}
      onClick={handleToggle}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 
                    ${isOn ? "translate-x-6" : "translate-x-1"}`}
      />
    </div>
  );
};

export default Interruptor;
