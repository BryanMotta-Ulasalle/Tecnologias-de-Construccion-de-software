import { useState, useEffect } from "react";

const Contador = () => {
  const [contador, setContador] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setContador((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="text-cyan-400 text-7xl font-bold"
      style={{
        textShadow: `
       0 0 5px #67e8f9,
      0 0 10px #67e8f9,
      0 0 20px #22d3ee,
      0 0 40px #22d3ee,
      0 0 80px #06b6d4
    `,
      }}
    >
      {contador}
    </div>
  );
};

export default Contador;
