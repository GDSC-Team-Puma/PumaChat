import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      <NavBar />
      {!user ? (
        <Login />
      ) : (
        <>
          <Homepage />
        </>
      )}
    </div>
  );
}
export default App;