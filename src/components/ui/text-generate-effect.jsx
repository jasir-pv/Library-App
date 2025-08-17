"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="word"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={`text-generate ${className}`}>
      <div className="inner-text">{renderWords()}</div>

      {/* Local CSS inside the same file */}
      <style jsx>{`
        .text-generate {
          font-weight: bold;
        }

        .inner-text {
          margin-top: 1rem;
          color: black;
          font-size: 1.5rem; /* 2xl */
          line-height: 1.5;
          letter-spacing: 0.05em;
        }

        .word {
          color: black;
          opacity: 0;
        }

        :global(body.dark) .inner-text {
          color: white;
        }

        :global(body.dark) .word {
          color: white;
        }
      `}</style>
    </div>
  );
};
