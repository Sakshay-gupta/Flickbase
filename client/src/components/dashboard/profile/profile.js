import { useFormik } from 'formik';
import { useDispatch, useSelector} from 'react-redux';

import { errorHandler } from '../../../utils/tools';
import { updateUserProfile } from '../../../store/actions/users'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserProfile = () => {
    const { firstname, lastname, age } = useSelector(state => state.users.data)

    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {firstname, lastname, age},
        onSubmit:((values) => {
            dispatch(updateUserProfile(values))
        })
    })

    return(
        <>
            <form className='mt-3 article_form' style={{ maxWidth:'250px'}}
                onSubmit={formik.handleSubmit}
            >
                <div className='form-group'>
                    <TextField 
                        style={{width:'100%'}}
                        name="firstname"
                        label="Enter your Firstname"
                        variant='outlined'
                        {...formik.getFieldProps('firstname')}
                        {...errorHandler(formik, 'firstname')}
                    />
                </div>

                <div className='form-group'>
                    <TextField 
                        style={{width:'100%'}}
                        name="lastname"
                        label="Enter your Lastname"
                        variant='outlined'
                        {...formik.getFieldProps('lastname')}
                        {...errorHandler(formik, 'lastname')}
                    />
                </div>

                <div className='form-group'>
                    <TextField 
                        style={{width:'100%'}}
                        name="age"
                        label="Enter your Age"
                        variant='outlined'
                        {...formik.getFieldProps('age')}
                        {...errorHandler(formik, 'age')}
                    />
                </div>

                <Button
                    className='mt-3'
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Edit Profile
                </Button>
            </form>
        </>
    )
}

export default UserProfile;