import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoPowerSharp } from 'react-icons/io5';
import './PowerButton.css';

const PowerButton = () => {
  const [isOn, setIsOn] = useState(false);
  const dots = Array.from({ length: 36 });

  return (
    <div className="power-button-container">
      <motion.div
        className={`power-button ${isOn ? 'on' : ''}`}
        onClick={() => setIsOn(!isOn)}
        whileTap={{ scale: 0.95 }}
      >
        <div className="outer-ring">
          <div className={`metal-ring-wrapper ${isOn ? 'glow-on' : ''}`}>
            <div className="metal-ring">
              <div className="icon"><IoPowerSharp /></div>
              <div className="led"></div>
            </div>
          </div>
        </div>

        <div className="ring">
          {dots.map((_, i) => {
            const angle = i * 10;
            if (angle >= 50 && angle <= 130) return null;
            return (
              <span
                key={i}
                className="ring-dot"
                style={{
                  transform: `rotate(${angle}deg) translate(130px)`
                }}
              />
            );
          })}
        </div>
      </motion.div>

      <h1 className="heading">Your challenges.<br /> our solutions.</h1>
    </div>
  );
};

export default PowerButton;
