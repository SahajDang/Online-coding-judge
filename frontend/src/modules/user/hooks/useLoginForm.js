import {useForm} from 'react-hook-form';
import { loginDefaultValues, loginSchema } from '../../../schema/user-schema';
import {zodResolver} from '@hookform/resolvers/zod';
import { doLogin } from '../api/user-api';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues : loginDefaultValues,
        resolver : zodResolver(loginSchema)
    });
    const onSubmit = form.handleSubmit(async (values) => {
        console.log('Values', values);
        try{
            const data = await doLogin(values);
            console.log('Data is ', data);
            alert(data.message + " " + data.user.name);
            localStorage.token = data.token;
            localStorage.role = data.user.role;
            if(data.user.role == 'teacher'){
                navigate('/dashboard/teacher');
            }else{
                navigate('/dashboard/student');
            }
        }catch(err){
            console.log('Login Backend call fails', err);
            alert("Login Fails....");
        }
    })
    return {form, onSubmit};
}