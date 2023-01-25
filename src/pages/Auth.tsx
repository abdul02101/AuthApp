import React, {useState, useEffect} from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import FormAuth from '../components/FormAuth';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getMessage, loginUser } from '../store/slice/usersSlice';

interface User{
    email: string;
    password: string;
}

interface FetchPromise{
    status: number;
    message: string;
    data: User
}


const Auth = () => {
    const dispatch = useAppDispatch()
    const {users, user} = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
  


    const handleLogin = (event: React.FormEvent, email: string, password: string, setEmailError: any, setPasswordError: any) => {
        event.preventDefault()
        setLoad(true)
        setEmailError('')
        setPasswordError('')

        new Promise<FetchPromise>((resolve, reject) => {
            if(!users.length){
                setEmailError('Пользователя не существует')
                reject({status: 401, message: 'Пользователя не существует'})
                return
            }

            users.find(user => {
                if(user.email === email){
                    if(user.password !== password){
                        setPasswordError('Не правильный пароль')
                        reject({status: 401, message: 'Не правильный пароль'})
                    }
                }else{
                    setEmailError('Пользователя не существует')
                    reject({status: 401, message: 'Пользователя не существует'})
                }
                 
            })
            setTimeout(() => {
                resolve({status: 200, message: 'Авторизация прошла успешно', data: {email, password}})
            }, 2000)
        }).then((res) => {
                console.log(res)
                setLoad(false)
                dispatch(loginUser(res.data))
                dispatch(getMessage(res.message))
                navigate('/')
            }
        )
        .catch((err) => {
            console.log(err)
            setLoad(false)
            dispatch(getMessage(err.message))
            }
        )
    }


    return (
        <div className='container-form'>
            {user ? 
                <Navigate to="/" replace />
            :
                <FormAuth handleClick={handleLogin} load={load}/>
            }
        </div>
        
    );
};

export default Auth;