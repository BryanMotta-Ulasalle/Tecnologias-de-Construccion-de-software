import { useState, useEffect } from "react";

const Contador = ({version, shadow}) => {
  const [contador, setContador] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setContador((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const versions = {
    cyan:"text-cyan-400",
    purple: "text-purple-500"
  } 

  const shadows = {
    cyan: `0 0 5px #67e8f9,
      0 0 10px #67e8f9,
      0 0 20px #22d3ee,
      0 0 40px #22d3ee,
      0 0 80px #06b6d4`,
    purple: `0 0 5px #a78bfa,
      0 0 10px #a78bfa,
      0 0 20px #8b5cf6,
      0 0 40px #8b5cf6,
      0 0 80px #7c3aed`
  }
  return (
    <div
      className={` ${versions[version] || ''} text-7xl font-bold`}
      style= {{ textShadow: shadows[shadow] || '' }}
    >
      {contador}
    </div>
  );
};

export default Contador;
