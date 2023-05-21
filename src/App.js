import "./assets/styles/App.css"
import "./assets/styles/Background.css"
import "./assets/styles/Components.css"
import "./assets/styles/Sign.css"
import "./assets/styles/Layout.css"
import "./assets/styles/Pagination.css"
import "./assets/styles/Store.css"
import "./assets/styles/Homepage.css"
import "./assets/styles/Topic.css"
import "./assets/styles/Professor.css"
import "./assets/styles/Ranking.css"
import "./assets/styles/Question.css"
import "./assets/styles/Weekly.css"
import "./assets/styles/Discuss.css"
import "./assets/styles/Profile.css"
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import './assets/styles/Admin.css'

import AOS from 'aos';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import SignInForm from "./pages/Sign/signIn.js"
import SignUpForm from "./pages/Sign/signUp.js"
import SignInAdminForm from "./pages/Admin/Sign/SignIn"
import SelectRole from "./pages/Sign/selectRole.js"
import VerifyCodeEmail from "./pages/Sign/verifyCodeEmail"
import { AuthProvider } from "./auth";
import { AuthProviderAdmin } from "./authadmin"
import PendingProf from "./pages/Sign/pendingProf.js"

import AppLayout from "./layout/index.js"
import Homepage from "./pages/Home/index.js"
import Professor from "./pages/HomeProf/index"
import AddTopic from "./pages/HomeProf/addtopic"
import AddQuestion from "./pages/HomeProf/addquestion"
import AddWeeklyQuestion from "./pages/WeeklyProf/addweekly"
import Topic from "./pages/Topic/index.js"
import Question from "./pages/Question/index.js"
import QuestionProf from "./pages/QuestionProf"
import SubmissionProf from "./pages/QuestionProf/submission.js"
import TopicProf from "./pages/TopicProf/index.js"
import SubmitProf from "./pages/Submit"
import DiscussDetail from "./pages/Discuss/detail.js"
import AddDiscuss from "./pages/Discuss/addDiscuss.js"
import AdminHomepage from "./pages/Admin/Home"
import EditProfile from "./pages/Profile/editProfile.js"
import AdminUserpage from "./pages/Admin/Page/User/DescUser"

import Discuss from "./pages/Discuss/index.js"
import Ranking from "./pages/Ranking/index.js"
import Store from "./pages/Store/index.js"
import Weekly from "./pages/Weekly/index.js"
import Profile from "./pages/Profile/index.js"
import Weeklyprof from "./pages/WeeklyProf"
import SubmissionWeeklyProf from "./pages/WeeklyProf/submission"

function App() {
  AOS.init({once: true});
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/verify-code-email" element={<VerifyCodeEmail />}></Route>
          <Route path="/select-role" element={<AuthProvider><SelectRole /></AuthProvider>}></Route>
          <Route exact path="/" element={<SignInForm />} />
          <Route exact path="/sign-up" element={<SignUpForm />} />
          <Route exact path="/pending-prof" element={<PendingProf />} />
          <Route exact path="/Admin" element={<SignInAdminForm />} />
          <Route exact path="/Admin/home" element={<AuthProviderAdmin><AdminHomepage /></AuthProviderAdmin>} /> 
          
          <Route exact path="/Admin/home/User/:user" element={<AuthProviderAdmin><AdminUserpage /></AuthProviderAdmin>} />
          <Route element={<AppLayout />}>
            <Route path="/addtopic" element={<AuthProvider><AddTopic /></AuthProvider>}/>
            <Route path="/professor" element={<AuthProvider><Professor /></AuthProvider>}/>
            <Route path="/submit" element={<AuthProvider><SubmitProf /></AuthProvider>}/>
            <Route path="/professor/:topic" element={<AuthProvider><TopicProf /></AuthProvider>}/>
            <Route path="/professor/:topic/question/:question" element={<QuestionProf />}/>
            <Route path="/professor/:topic/addquestion" element={<AuthProvider><AddQuestion /></AuthProvider>}/>
            <Route path="/professor/:topic/question/:question/submission/:submission" element={<SubmissionProf />}/>
            <Route path="/professor/weekly/question/:question/submission/:submission" element={<SubmissionWeeklyProf />}/>
            <Route path="/professor/weekly" element={<AuthProvider><Weeklyprof /></AuthProvider>} /> 
            <Route path="/professor/weekly/addweekly" element={<AuthProvider><AddWeeklyQuestion /></AuthProvider>} /> 
            <Route path="/home" element={<AuthProvider><Homepage /></AuthProvider>}/>
            <Route path="/topic/:topic" element={<Topic />}/>
            <Route path="/topic/:topic/question/:question" element={<Question />}/>
            <Route path="/discuss" element={<Discuss />}/>
            <Route path="/discuss/add" element={<AddDiscuss />}/>
            <Route path="/discuss/:id" element={<DiscussDetail />}/>
            <Route path="/ranking" element={<Ranking />}/>
            <Route path="/store" element={<Store />}/>
            <Route path="/weekly" element={<Weekly />}/>
            <Route path="/profile/:id" element={<Profile />}/>
            <Route path="/profile/:id/edit" element={<EditProfile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
