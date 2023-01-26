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
  


    const handleLogin = (event: React.FormEvent, email: string, password: string, setEmailError: any) => {
        event.preventDefault()
        setLoad(true)
        setEmailError('')

        new Promise<FetchPromise>((resolve, reject) => {

            
            
            setTimeout(() => {
                const userFind = users.filter((user) => {
                    if(user.email === email){
                        if(user.password === password){
                            return user
                        }  
                    }
                })

                if(!userFind.length){
                    setEmailError('Неправильное имя или пароль')
                    reject({status: 401, message: 'Неправильное имя или пароль'})
                    return
                }
                
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