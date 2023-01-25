import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAppDispatch } from '../hooks/reduxHooks';
import { logoutUser } from '../store/slice/usersSlice';
import Spinner from 'react-bootstrap/esm/Spinner';

const Header = () => {
  const dispatch = useAppDispatch()
  const [load, setLoad] = useState(false)
  const {pathname} = useLocation()

  const logout = () => {
    setLoad(true)
    new Promise<void>(resolve => {
      setTimeout(() => {
        dispatch(logoutUser())
        resolve()
    }, 2000)
    }).then(() => setLoad(false))
    
  }

    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            {pathname === '/' || pathname === '/changepass' ? 
              <>
                {load ?
                <Spinner animation="border" variant="primary" />
                :
                  <>
                    {pathname === '/changepass' ?
                    <Link className='link' to='/'>Главная</Link>
                    :
                    <Link className='link' to='/changepass'>Сменить пароль</Link>
                    }
                    
                    
                    <a className='link' onClick={() => logout()}>Выход</a>
                  </>
                }
              </>
              :     
              <>
                <Link className='link' to='/login'>Авторизация</Link>
                <Link className='link' to='/registration'>Регистрация</Link>
              </>     
            }
          
          </Nav>
          
        </Container>
      </Navbar>
    );
};

export default Header;