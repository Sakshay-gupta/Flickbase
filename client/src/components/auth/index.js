import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector} from 'react-redux';
import { errorHandler, Loader } from "../../utils/tools";
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { registerUser, signinUser } from "../../store/actions/users";
import { useNavigate } from "react-router-dom";
import PreventSignin from "../../hoc/preventSignin";


const Auth = () => {
    const [register, setRegister] = useState(false);
    let navigate = useNavigate()
    const users = useSelector(state => state.users);
    const notification = useSelector(state => state.notifications)
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{email:'', password:''},
        validationSchema:Yup.object({
            email:Yup.string()
            .required('Sorry, this is required')
            .email('Sorry, enter a valid email'),
            password:Yup.string()
            .required('Sorry, this is required')
        }),
        onSubmit:((values) => {
            handleChange(values);
        })
    })
    const handleChange = (values) => {
        if(register){
            dispatch(registerUser(values))
        }
        else{
            dispatch(signinUser(values))
        }
    }

    useEffect(() => {
        if(notification && notification.global.success){
            navigate('/dashboard')
        }
    }, [notification])
    return(
        <PreventSignin users={users}>
            <div className="auth_container">
                <h1>Authenticate</h1>
                { users.loading ? 
                    <Loader />
                :
                    <Box 
                        sx={{
                            '& .MuiTextField-root': { width:'100%',marginTop:'20px' },
                        }}
                        component="form"
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            name="email"
                            label="Enter your Email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            {...errorHandler(formik, 'email')}
                        />
                        <TextField
                            name="password"
                            label="Enter your password"
                            type="password"
                            variant='outlined'
                            {...formik.getFieldProps('password')}
                            {...errorHandler(formik, 'password')}
                        />
                        <div className="mt-2">
                            <Button variant="contained" color="primary" type="submit" size="large">
                                { register ? 'Register' : 'LOGIN'}
                            </Button>
                            <Button 
                                className='mt-3'
                                variant='outlined' 
                                color="secondary" 
                                size="small"
                                onClick={() => setRegister(!register)}
                            >
                                Want to  { !register ? "Register" : "Login"}
                            </Button>

                        </div>
                    </Box>
                }
            </div>
        </PreventSignin>
    )
}

export default Auth;