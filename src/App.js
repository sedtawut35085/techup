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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInForm />}></Route>
          <Route path="/sign-up" element={<SignUpForm />}></Route>
          <Route path="/select-role" element={<SelectRole />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
