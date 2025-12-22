import {useForm} from 'react-hook-form';
import { registerDefaultValues, registerSchema } from '../../../schema/user-schema';
import {zodResolver} from '@hookform/resolvers/zod';
import { doRegister } from '../api/user-api';
import { useNavigate } from 'react-router-dom';

export const useRegisterForm = () => {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues : registerDefaultValues,
        resolver : zodResolver(registerSchema)
    });
    const onSubmit = form.handleSubmit(async (values) => {
        console.log('Values', values);
        try{
            const data = await doRegister(values);
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
            console.log('Register Backend call fails', err);
            alert("Register Fails....");
        }
    })
    return {form, onSubmit};
}