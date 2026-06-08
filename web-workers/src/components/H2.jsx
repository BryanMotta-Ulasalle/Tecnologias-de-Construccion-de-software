import React from "react";

const H2 = ({ h2 }) => {
  return (
    <h2
      className="text-3xl font-bold mb-4 text-cyan-400 "
      style={{
        textShadow: "0 0 10px rgba(0,0,0,0.8)",
      }}
    >
      {h2}
    </h2>
  );
};

export default H2;
