import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Header from './components/header'
import api from "./utils/api";
import { useDispatch } from 'react-redux'
import { setError, setJobs, setLoading } from './redux/slices/jobSlice'
import Form from './pages/form';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());
    api
    .get("/jobs")
    .then((res) => dispatch(setJobs(res.data)))
    .catch((err) => dispatch(setError(err))); 
  }, []);

  return (
     <BrowserRouter>
     <Header />
     
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/job/:mode' element={<Form />} />
     </Routes>
     
     </BrowserRouter>
  )
}

export default App