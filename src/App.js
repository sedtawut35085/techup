import "./assets/styles/App.css"
import "./assets/styles/Background.css"
import "./assets/styles/Components.css"
import "./assets/styles/Sign.css"
import "./assets/styles/Layout.css"
import "./assets/styles/Pagination.css"
import "./assets/styles/Pages.css"
import "./assets/styles/Homepage.css"
import "./assets/styles/Topic.css"
import "./assets/styles/Ranking.css"

import { BrowserRouter, Route, Routes} from "react-router-dom";

import SignInForm from "./pages/Sign/signIn.js"
import SignUpForm from "./pages/Sign/signUp.js"
import SelectRole from "./pages/Sign/selectRole.js"
import VerifyCodeEmail from "./pages/Sign/verifyCodeEmail"
import { AuthProvider } from "./auth";
import PendingProf from "./pages/Sign/pendingProf.js"

import AppLayout from "./layout/index.js"
import Homepage from "./pages/Home/index.js"
import Topic from "./pages/Topic/index.js"
import Question from "./pages/Question/index.js"

import Discuss from "./pages/Discuss/index.js"
import Ranking from "./pages/Ranking/index.js"
import Store from "./pages/Store/index.js"
import Weekly from "./pages/Weekly/index.js"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/verify-code-email" element={<VerifyCodeEmail />}></Route>
          <Route path="/select-role" element={<AuthProvider><SelectRole /></AuthProvider>}></Route>
          <Route exact path="/" element={<SignInForm />} />
          <Route exact path="/sign-up" element={<SignUpForm />} />
          <Route exact path="/pending-prof" element={<PendingProf />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Homepage />}/>
            <Route path="/topic/:topic" element={<Topic />}/>
            <Route path="/topic/:topic/question/:question" element={<Question />}/>
            <Route path="/discuss" element={<Discuss/>}/>
            <Route path="/ranking" element={<Ranking />}/>
            <Route path="/store" element={<Store />}/>
            <Route path="/weekly" element={<Weekly />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
