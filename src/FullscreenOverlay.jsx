import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FullscreenOverlay.css';

const teamMembers = [
  { name: 'Ryan Franci', role: 'Business Analyst', image: 'https://randomuser.me/api/portraits/men/32.jpg', top: '15%', left: '25%' },
  { name: 'Marilyn Mango', role: 'Developer', image: 'https://randomuser.me/api/portraits/women/32.jpg', top: '20%', left: '50%' },
  { name: 'Maria Rosser', role: 'Test Analyst', image: 'https://randomuser.me/api/portraits/women/42.jpg', top: '51%', left: '25%' },
  { name: 'Randy Carder', role: 'Project Manager', image: 'https://randomuser.me/api/portraits/men/52.jpg', top: '50%', left: '50%' },
  { name: 'Mira Carder', role: 'Project Manager', image: 'https://randomuser.me/api/portraits/women/22.jpg', top: '15%', left: '30%' },
  { name: 'Terry Passaqu', role: 'Developer', image: 'https://randomuser.me/api/portraits/men/12.jpg', top: '20%', left: '60%' },
  { name: 'Angel Vaccaro', role: 'Test Analyst', image: 'https://randomuser.me/api/portraits/women/17.jpg', top: '51%', left: '25%' },
  { name: 'Adison Culhane', role: 'Business Analyst', image: 'https://randomuser.me/api/portraits/men/18.jpg', top: '50%', left: '50%' },
];

const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

const getDirectionalOffset = (top, left) => {
  const t = parseFloat(top);
  const l = parseFloat(left);
  const offset = 200;

  if (t < 50 && l < 50) return { x: -offset, y: -offset };
  if (t < 50 && l >= 50) return { x: offset, y: -offset };
  if (t >= 50 && l < 50) return { x: -offset, y: offset };
  return { x: offset, y: offset };
};

const FullscreenOverlay = () => {
  const teamChunks = chunkArray(teamMembers, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % teamChunks.length);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
      setCurrentIndex(0);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, teamChunks.length]);

  return (
    <motion.div
      className="fullscreen-box"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="blur-spot" />
      <h1 className="project-text">Project Resources</h1>
      <p className="project-description">
        We provide skilled professionals to help businesses successfully <br />
        deliver business and IT projects.
      </p>

      <AnimatePresence mode="wait">
        {teamChunks[currentIndex].map((member, index) => {
          const offset = getDirectionalOffset(member.top, member.left);

          return (
            <motion.div
              key={member.name}
              className="team-member"
              initial={{ opacity: 0, x: offset.x, y: offset.y }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: offset.x, y: offset.y }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              style={{
                position: 'absolute',
                top: member.top,
                left: member.left,
                zIndex: 10,
              }}
            >
              <img src={member.image} alt={member.name} />
              <div className="name-role">
                <div className="name">{member.name}</div>
                <div className="role">{member.role}</div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default FullscreenOverlay;
