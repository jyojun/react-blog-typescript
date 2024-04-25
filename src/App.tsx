import { useEffect, useState } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "components/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/Loader";

function App() {
  const auth = getAuth(app);

  // auth 체크하기 전 (initialize 전)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </>
  );
}

export default App;
