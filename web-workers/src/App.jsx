import { Link } from "react-router-dom";
import video from "./assets/204925-925628390_medium.mp4";
import H1 from "./components/H1";
function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsinline
        className=" h-full w-full absolute inset-0 object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-20">
        <H1 h1="Analiza datos del universo sin detener la exploración." />
        <div className="flex gap-10">
          <Link
            to="/with-workers"
            className="text-2xl border border-cyan-400 px-8  py-4 rounded-xl bg-cyan-400 hover:bg-cyan-600 text-white transition-colors duration-300"
          >
            Prueba con Workers
          </Link>
          <Link
            to="/without-workers"
            className="text-2xl border-3 border-purple-500 px-8  py-4 rounded-xl text-white bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
          >
            Prueba sin Workers
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
