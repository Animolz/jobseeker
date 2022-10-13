import './assets/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Entry/Login';
import Signup from './pages/Entry/Signup';
import JobSearching from './pages/User/Candidate/JobSearching'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JobSeaching from './pages/User/Candidate/JobSearching';
import JobDetail from './pages/User/Candidate/JobDetail';
import HomeCandidate from './pages/User/Candidate/HomeCandidate';
import EditProfile from './pages/User/Candidate/EditProfile';
import JobsManagement from './pages/User/Company/JobsManagement';
import HomeCompany from './pages/User/Company/HomeCompany';
import JobDetailManagement from './pages/User/Company/JobDetailManagement'


function App() {
  return (
    <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={5}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<HomeCandidate />} />

            <Route path='login' element={<Login />} />

            <Route path='register' element={<Signup />} />

            <Route path='candidate/job-searching' element={<JobSearching />}/>

            <Route path='candidate/job-detail' element={<JobDetail />}>
              <Route path=':kw' element={<JobDetail />}>
              </Route>
            </Route>

            <Route path='edit-profile' element={<EditProfile />} />

            <Route path='company/home' element={<HomeCompany />}/>

            <Route path='company/jobs-management' element={<JobsManagement />} />
            
            <Route path='company/jobs-management/job-detail/:id' element={<JobDetailManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
