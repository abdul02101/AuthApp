import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import BasicExample from './components/Toasts';
import { useAppSelector } from './hooks/reduxHooks';
import Auth from './pages/Auth';
import ChangePassword from './pages/ChangePassword';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Registration from './pages/Registration';

function App() {
  const message = useAppSelector(state => state.user.message)
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 2000)
  }, [message])

  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/changepass' element={<ChangePassword />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      {show && <BasicExample message={message}/>}
    </div>
  );
}

export default App;
