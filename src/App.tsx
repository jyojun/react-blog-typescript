import { useState } from "react";
import Router from "./components/Router";

function App() {
  const [state, setstate] = useState(initialState);
  return <Router />;
}

export default App;
