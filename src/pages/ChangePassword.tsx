import React, {useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import FormChangePassword from '../components/FormChangePassword';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { changeUserPass, getMessage } from '../store/slice/usersSlice';

interface User{
    email: string;
    password: string;
}

interface FetchPromise{
    status: number;
    message: string;
    data: User
}


const ChangePassword = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.user)
    const [load, setLoad] = useState(false)


    const handleChangePass = (event: React.FormEvent, password: string, newPassword:string, newRepatPassword: string, setPasswordError: any, setNewRepeatPassword: any): void => {
        event.preventDefault()
        setLoad(true)
        setPasswordError('')
        setNewRepeatPassword('')


        new Promise<FetchPromise>((resolve, reject) => {
            if(password !== user?.password) {
                setPasswordError('Не верный пароль')
                reject({status: 401, message: 'Не верный пароль'})
                return
            }
            if(newPassword !== newRepatPassword) {
                setNewRepeatPassword('Пароли не совпадают')
                reject({status: 401, message: 'Пароли не совпадают'})
                return
            }

            if(newPassword.toLowerCase() === newRepatPassword || newPassword.length < 4 || newPassword.length > 9){
                setNewRepeatPassword('Пароль должен быть больше 3 символов или меньше 10 и соддержать хотябы одну заглавную букву')
                reject({status: 401, message: 'Пароли должен быть больше 3 символов или меньше 10 и соддержать хотябы одну заглавную букву'})
                return
            }

            setTimeout(() => {
                const changeuser ={
                    ...user,
                    password: newPassword,
                }
                resolve({status: 200, message: 'Пароль успешно изменен', data: {...changeuser}})
            }, 2000)
        }).then((res) => {
                console.log(res)
                setLoad(false)
                dispatch(changeUserPass(res.data))
                dispatch(getMessage('Пароль успешно изменен'))
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
        <>
        {user ? 
        <div className='container-form'>
            <FormChangePassword handleClick={handleChangePass} load={load}/>
        </div>
        
        : 
        <Navigate to="/login" replace />
        }
        </>
        
    );
};

export default ChangePassword;