import React, { useEffect, useState } from "react";

const Typewriter = () => {
  const text =
    "Share your thoughts, stories, and ideas with the world.\nEasy to use, beautifully designed.";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <pre className="whitespace-pre-wrap text-lg md:text-xl text-white/90 drop-shadow-[0_1px_6px_rgba(255,255,255,0.25)] min-h-[100px] font-medium text-center">
      {displayedText}

    </pre>
  );
};

export default Typewriter;
