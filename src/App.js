import DigitalClock from "./components/DigitalClock";
import Stopwatch from "./components/StopWatch";

function App() {
  return(
    <div style={{textAlign: "center", marginTop: "50px"}}>
      <DigitalClock />
      <hr />
      <Stopwatch />
    </div>
  );
}

export default App;