import React from 'react';
import { motion } from 'framer-motion';
import { TbBulbFilled } from "react-icons/tb";
import { FcTemplate } from "react-icons/fc";
import './FlipCard.css';

const FlipCard = () => {
  return (
    <div className="card-container">
      <motion.div
        className="card"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.8 }}
      >
        <div className="card-face card-front">
          <h2 className="card-heading">Building the relationship - Understanding your needs</h2>
          <p className="card-description">
            We don't start with solutions – we <br /> start with a conversation.
          </p>
          <div className="card-bottom">
            <TbBulbFilled className="icon" />
            <span>Our focus is on long-term relationships, not one-off engagements.</span>
          </div>
        </div>

        <div className="card-face card-back">
          <div className="card-point">
            <FcTemplate className="square-icon" />
            <span>
              We connect with you to understand your business, challenges and goals – whether that is
              improving operations, leveraging data, enhancing technology, or navigating digital transformation.
            </span>
          </div>
          <div className="card-point">
            <FcTemplate className="square-icon" />
            <span>
              We explore where you need support – whether it's strategic advice, hands-on experience, or
              an extra set of hands to drive results.
            </span>
          </div>
          <div className="card-point">
            <FcTemplate className="square-icon" />
            <span>
              We align on how TRIIIO can help, ensuring we engage in a way that complements your business model.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
