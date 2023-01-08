import "./assets/styles/App.css"
import { BrowserRouter , Route , Routes} from "react-router-dom";

import SignInForm from "./pages/Sign_in/signIn.js"

function App() {
  return (
    <div className="App bg-color-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
