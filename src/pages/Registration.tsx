import React, {useState, useEffect} from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import FormRegistration from '../components/FormRegistration';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addUser, getMessage } from '../store/slice/usersSlice';

interface User{
    email: string;
    password: string;
}

interface FetchPromise{
    status: number;
    message: string;
    data: User
}



const Registration = () => {
    const dispatch = useAppDispatch()
    const {users, user} = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)




    const handleRegister = (event: React.FormEvent, email: string, password: string, repeatPassword: string, setEmailError: any, setPasswordError: any) => {
        event.preventDefault()
        setLoad(true)
        setEmailError('')
        setPasswordError('')


        new Promise<FetchPromise>((resolve, reject) => {
            const usersFind= users.find(user => user.email === email)
            if(password !== repeatPassword) {
                setPasswordError('Пароли не совпадают')
                reject({status: 401, message: 'Пароли не совпадают'})
            }
            if(password.toLowerCase() === repeatPassword || password.length < 4 || password.length > 9){
                setPasswordError('Пароль должен быть больше 3 символов или меньше 10 и соддержать хотябы одну заглавную букву')
                reject({status: 401, message: 'Пароли должен быть больше 3 символов или меньше 10 и соддержать хотябы одну заглавную букву'})
            }
            setTimeout(() => {
                if(usersFind){
                    setEmailError('Такой пользователь уже существует')
                    reject({status: 401, message: 'Такой пользователь уже существует'})
                }
                
                resolve({status: 200, message: 'Пользователь успешно зарегистрирован', data: {email, password}})
                
            }, 2000)
        }).then((res) => {
                console.log(res)
                setLoad(false)
                dispatch(addUser(res.data))
                dispatch(getMessage(res.message))
                navigate('/login')
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
            <FormRegistration handleClick={handleRegister} load={load}/>
            }
        </div>
    );
};

export default Registration;