import "./assets/styles/App.css"
import "./assets/styles/Background.css"
import "./assets/styles/Components.css"

import "./assets/styles/Sign.css"

import { BrowserRouter , Route , Routes} from "react-router-dom";

import SignInForm from "./pages/Sign/signIn.js"
import SignUpForm from "./pages/Sign/signUp.js"
import SelectRole from "./pages/Sign/selectRole.js"

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Uptodate 10.0.0
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInForm />}></Route>
          <Route path="/sign-up" element={<SignUpForm />}></Route>
          <Route path="/sign-up/select-role" element={<SelectRole />}></Route>
        </Routes>
      </BrowserRouter>
>>>>>>> dev-bright
    </div>
  );
}

export default App;
