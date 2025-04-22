import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CodeEditor.css';

const codeLines = [
  'from discord.ext import commands',
  'bot = commands.Bot(">")',
  '@bot.command("ping")',
  'async def ping(ctx: commands.Context):',
  '    await ctx.',
  'bot.run("TOKEN")',
];

const CodeEditor = () => {
  const [displayedLines, setDisplayedLines] = useState(['']);
  const [isTyping, setIsTyping] = useState(true);
  const [isUndo, setIsUndo] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let typingInterval;
    let undoInterval;

    const typeLine = () => {
      if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        if (currentChar <= line.length) {
          setDisplayedLines(prev => {
            const updated = [...prev];
            updated[currentLine] = line.substring(0, currentChar);
            return updated;
          });
          currentChar++;
        } else {
          currentLine++;
          currentChar = 0;
          setDisplayedLines(prev => [...prev, '']);
        }
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setIsUndo(true);
      }
    };

    const undoLine = () => {
      let currentLineIndex = displayedLines.length - 1;
      let currentCharIndex = displayedLines[currentLineIndex]?.length;

      if (currentCharIndex > 0) {
        currentCharIndex--;
        setDisplayedLines(prev => {
          const updated = [...prev];
          updated[currentLineIndex] = codeLines[currentLineIndex].substring(0, currentCharIndex);
          return updated;
        });
      } else if (currentLineIndex > 0) {
        setDisplayedLines(prev => prev.slice(0, currentLineIndex));
      } else {
        clearInterval(undoInterval);
        setIsUndo(false);
      }
    };

    if (isTyping) {
      setDisplayedLines(['']);
      typingInterval = setInterval(typeLine, 50);
    } else if (isUndo) {
      undoInterval = setInterval(undoLine, 50);
    }

    return () => {
      clearInterval(typingInterval);
      clearInterval(undoInterval);
    };
  }, [isTyping, isUndo]);

  return (
    <div className="code-editor-wrapper">
      <motion.div className="code-editor-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="header-inside">
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'red',
              display: 'inline-block',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'yellow',
              display: 'inline-block',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'green',
              display: 'inline-block',
            }}
          />
        </div>
        <pre className="code">
          {displayedLines.map((line, idx) => (
            <div key={idx}>
              <span className="line-number">{idx + 1}</span>
              {line}
              {idx === displayedLines.length - 1 && <span className="cursor">|</span>}
            </div>
          ))}
        </pre>
      </motion.div>

      <div className="text-content">
        <h2 className="text-heading">Software <br />Development</h2>
        <p>
          We help businesses harness the power of <br />
          custom software solutions.
        </p>
      </div>
    </div>
  );
};

export default CodeEditor;
