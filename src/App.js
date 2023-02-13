import "./assets/styles/App.css"
import "./assets/styles/Background.css"
import "./assets/styles/Components.css"
import "./assets/styles/Sign.css"
import "./assets/styles/Layout.css"

import { BrowserRouter, Route, Routes} from "react-router-dom";

import SignInForm from "./pages/Sign/signIn.js"
import SignUpForm from "./pages/Sign/signUp.js"
import SelectRole from "./pages/Sign/selectRole.js"
import PendingProf from "./pages/Sign/pendingProf.js"

import AppLayout from "./layout/index.js"

const Home = () => <h2 style={{paddingTop: 100}}>Home</h2>;
const Discuss = () => <h2 style={{paddingTop: 100}}>Discuss</h2>;
const Raking = () => <h2 style={{paddingTop: 100}}>Raking</h2>;
const Store = () => <h2 style={{paddingTop: 100}}>Store</h2>;
const Weekly = () => <h2 style={{paddingTop: 100}}>Weekly</h2>;


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignInForm />} />
          <Route exact path="/sign-up" element={<SignUpForm />} />
          <Route exact path="/select-role" element={<SelectRole />} />
          <Route exact path="/pending-prof" element={<PendingProf />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />}/>
            <Route path="/discuss" element={<Discuss/>}/>
            <Route path="/raking" element={<Raking />}/>
            <Route path="/store" element={<Store />}/>
            <Route path="/weekly" element={<Weekly />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
