import React from 'react';
import './assets/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from 'react-scroll-to-top';
import { RequiredAnonymous, RequiredAuth, RequiredLogin } from 'components/Auth/RequiredAuth';
import PersistLogin  from 'components/Auth/PersistLogin';

import Login from './pages/Entry/Login';
import Signup from './pages/Entry/Signup';
import JobSearching from './pages/User/Candidate/Candidate.JobSearching'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CandidateHomePage from './pages/User/Candidate/Candidate.HomePage';
import { Unauthorized } from 'pages/Other/Unauthorized';
import { NotFound } from 'pages/Other/NotFound';
import EditProfileCompany from 'pages/User/Company/Company.EditProfile';
import EditProfileCandidate from './pages/User/Candidate/Candidate.EditProfile';
import JobsManagement from './pages/User/Company/Company.JobsManagement';
import JobDetailManagement from './pages/User/Company/Company.JobDetailManagement';
import JobEdit from 'pages/User/Admin/Admin.Edit/Admin.JobEdit';
import UserAdd from 'pages/User/Admin/Admin.Add/Admin.UserAdd';
import CandidateEdit from 'pages/User/Admin/Admin.Edit/Admin.CandidateEdit';
import JobEditCompany from 'pages/User/Company/Company.JobEdit';
import CompanyEdit from 'pages/User/Admin/Admin.Edit/Admin.CompanyEdit';
import JobAddAdmin from 'pages/User/Admin/Admin.Add/Admin.JobAdd';
import JobAddCompany from 'pages/User/Company/Company.JobAdd';
import CandidateManagement from 'pages/User/Admin/Admin.Manage/Admin.CandidateManagement';
import CompanyManagement from 'pages/User/Admin/Admin.Manage/Admin.CompanyManagement';
import JobManagement from 'pages/User/Admin/Admin.Manage/Admin.JobManagement';
import JobDetail from './pages/User/Candidate/Candidate.JobDetail';
import JobByCategories from 'pages/User/Admin/Admin.Stat/Admin.JobByCategory';
import JobByPositions from 'pages/User/Admin/Admin.Stat/Admin.JobByPosition';
import JobByJobTypes from 'pages/User/Admin/Admin.Stat/Admin.JobByJobType';
import CompanyViewProfile from 'pages/common/CompanyViewProfile';

const CompanyHomePage = React.lazy(() => import('./pages/User/Company/Company.HomePage'));
const AdminHomePage = React.lazy(() => import('pages/User/Admin/Admin.HomePage'));

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
      <ScrollToTop smooth className='border border-secondary border-1 bg-dark' color='white'  />
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            {/* Public Routes */}
            <Route index element={<CandidateHomePage />} />
            <Route path='candidate/job-searching' element={<JobSearching />}/>

            {/* Other Routes */}
            <Route path='*' element={<NotFound />}/>
            <Route path='Unauthorized' element={<Unauthorized />}/>

            {/* Required Anonymous */}
            <Route element={<RequiredAnonymous />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Signup />} />
              </Route>


            {/* Required Login */}
            <Route element={<PersistLogin />}>
              <Route element={<RequiredLogin />}>
                <Route Route path='job-detail' element={<JobDetail />}>
                  <Route path=':kw' element={<JobDetail />}>
                  </Route>
                </Route>
                <Route path='company-profile/:id' element={<CompanyViewProfile />} />
              </Route>

              <Route element={<RequiredAuth allowedRole={'CANDIDATE'} />}>
                <Route path='edit-profile' element={<EditProfileCandidate />} />
              </Route>

              {/* Private Routes */}
              <Route element={<RequiredAuth allowedRole={'COMPANY'} />}>
                <Route path='company/home' element={<CompanyHomePage />}/>
                <Route path='company/jobs-management' element={<JobsManagement />} />
                <Route path='company/jobs-management/job-detail/:id' element={<JobDetailManagement />} />
                <Route path='company/add-job'  element={<JobAddCompany />} />
                <Route path='company/edit-job/:id'  element={<JobEditCompany />} />
                <Route path='company/edit-profile' element={<EditProfileCompany />} />
              </Route>

              <Route element={<RequiredAuth allowedRole={'ADMIN'} />} >
                <Route path='admin/home' element={<AdminHomePage />} />
                <Route path='admin/jobs-management' element={<JobManagement />} />
                <Route path='admin/candidates-management' element={<CandidateManagement />} />
                <Route path='admin/companies-management' element={<CompanyManagement />} />
                <Route path='admin/company-edit/:id' element={<CompanyEdit />} />
                <Route path='admin/candidate-edit/:id' element={<CandidateEdit />} />
                <Route path='admin/job-edit/:id' element={<JobEdit />}/>
                <Route path='admin/job-add' element={<JobAddAdmin />} />
                <Route path='admin/user-add' element={<UserAdd />} />
                <Route path='admin/stat/'>
                  <Route path='job/' >
                    <Route path='by-category' element={<JobByCategories />} />
                    <Route path='by-position' element={<JobByPositions />} />
                    <Route path='by-job-type' element={<JobByJobTypes />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
