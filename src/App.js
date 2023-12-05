// global styles
import './assets/styles/normalize.css'
import './assets/styles/global.css'
import './App.scss'

import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom"
import {useEffect, useLayoutEffect, useState} from "react"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer";
import NotFound from "./components/404/NotFound";
import FStudents from "./pages/for-students/FStudents";
import FConsults from "./pages/for-consults/FConsults";
import Universities from "./pages/universities/Universities";
import Countries from "./pages/countries/Countries";
import UniversitiesId from "./pages/universities/universities-id/UniversitiesId";
import CountriesId from "./pages/countries/countries-id/CountriesId";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AdminHeaderTop from "./pages/admin/components/header-top/AdminHeaderTop";
import AdminHeader from "./pages/admin/components/header/AdminHeader";
import MyStudentsConsult from "./pages/admin/my-students-consult/MyStudentsConsult";
import Balance from "./pages/admin/balance/Balance";
import MyApplications from "./pages/admin/my-applications/MyApplications";
import SignIn from "./pages/sign/sign-in/SignIn";
import {Toaster} from "react-hot-toast";
import $api from "./api/apiConfig";
import FUniversities from "./pages/for-universities/FUniversities";
import {LoaderProvider} from "./context/LoaderProvider";
import WorkingConditions from "./pages/working-conditions/WorkingConditions";
import {lang} from "./assets/scripts/global";
import MyStudentsUniver from "./pages/admin/my-students-university/MyStudentsUniver";


const Wrapper = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}


const App = () => {

  const scrollToTop = () => { document.documentElement.scrollTo(0, 0) }


  // colors
  useEffect(() => {
    localStorage.setItem('lang', lang)

    $api
        .get('/colors')
        .then(res => {
          document.documentElement.style.setProperty('--main-cl', res.data[0].mainColor)
          document.documentElement.style.setProperty('--admin-cl', res.data[0].adminColor)
          document.documentElement.style.setProperty('--txt-cl', res.data[0].textColor)
        })
  }, [])


  // general data
  const [general, setGeneral] = useState([])
  useEffect(() => {
    $api
        .get('/general-settings')
        .then(res => setGeneral(res.data?.[0]))
  }, [])


  // page title
  useEffect(() => {
    document.title = general?.['site-title'] || 'CHOYNAK Travel & Study Abroad'
  }, [general])


  // favicon
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'icon'
    link.href = general?.logo?.full_url

    const link2 = document.createElement('link')
    link2.rel = 'apple-touch-icon'
    link2.href = general?.logo?.full_url

    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [general])


  return (
    <div className="App">
      <BrowserRouter>
        <Wrapper>

          <LoaderProvider>

            <Header general={general} />
            <AdminHeaderTop general={general} />
            <AdminHeader general={general} />

            <Routes>

              <Route path='/' element={<Home />} />
              <Route path='/for-students' element={<FStudents />} />
              <Route path='/for-consults' element={<FConsults />} />
              <Route path='/for-universities' element={<FUniversities />} />

              <Route path='/universities' element={<Universities />} />
              <Route path='/universities/:id' element={<UniversitiesId />} />

              <Route path='/countries' element={<Countries />} />
              <Route path='/countries/:id' element={<CountriesId />} />

              <Route path='/login' element={<SignIn />} />
              {/*<Route path='/register' element={<SignUp />} />*/}

              {/* Protect-able routes */}
              <Route element={<RequireAuth />}>

                <Route path='/admin' element={<Navigate to={'/admin/dashboard'} />} />
                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route path='/admin/my-students-consult' element={<MyStudentsConsult />} />
                <Route path='/admin/my-students-university' element={<MyStudentsUniver />} />
                <Route path='/admin/my-applications' element={<MyApplications />} />
                <Route path='/admin/balance' element={<Balance />} />

              </Route>

              <Route path='/working-conditions' element={<WorkingConditions />} />
              <Route path='/*' element={<NotFound />} />

            </Routes>

            <Footer general={general} />

            <button className='scroll-top' onClick={scrollToTop}>
              <i className="fa-solid fa-arrow-up icon"/>
            </button>

            <Toaster
                containerClassName="toast"
                position="bottom-center"
                reverseOrder={false}
            />

          </LoaderProvider>

        </Wrapper>
      </BrowserRouter>
    </div>
  )
}

export default App