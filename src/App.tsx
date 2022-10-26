import { useState } from "react";
import reactLogo from "./assets/react.svg";
import LandingPage from "./pages/landing page";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
