import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { errorHandler, Loader } from '../../../../utils/tools'
import { changeEmail } from '../../../../store/actions/users'

import {
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel
} from '@mui/material'

const EmailStepper = ({users, closeModal}) => {
    const [activeStep,setActiveStep] = useState(0);
    const steps = ['Enter old email','Enter new email','Are you sure ?'];
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{email:'', newemail:''},
        validationSchema:Yup.object({
            email: Yup.string()
            .required('Sorry This is required')
            .email('This is not a valid Email')
            .test('match','Sorry the Email does not matches', (email) => {
                return email === users.data.email
            }),
            newemail: Yup.string()
            .required('Sorry This is required')
            .email('This is not a valid Email')
            .test('equal','Sorry, enter a new Email', (newemail) => {
                return newemail !== users.data.email
            })
        }),
        onSubmit:((values) => {
            dispatch(changeEmail(values))
            .unwrap()
            .then(() => {
                closeModal()
            })
        })
    })

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const nextBtn = () => (
        <Button className='mt-3' variant='contained' color='primary' onClick={handleNext}>
            Next
        </Button>
    )

    const backBtn = () => (
        <Button className='mt-3 me-2' variant='contained' color='primary' onClick={handleBack}>
            Back
        </Button>
    )
    return(
        <>
            {users.loading ? 
                <Loader /> 
            :<>
                <Stepper activeStep={activeStep}>
                    { steps.map(label => {
                        return(
                            <Step key={label}>
                                <StepLabel>
                                    {label}
                                </StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
            </>
            }
            <form className='mt-3 stepper_form' onSubmit={formik.handleSubmit}>
                { activeStep === 0 ? 
                    <div className='form-group'>
                        <TextField
                            style={{width:'100%'}}
                            name="email"
                            label="Enter your Email"
                            variant='outlined'
                            {...formik.getFieldProps('email')}
                            {...errorHandler(formik, 'email')}
                        />
                        {formik.values.email && !formik.errors.email ? 
                            nextBtn()
                        :null}
                    </div>
                :null}

                { activeStep === 1 ? 
                    <div className='form-group'>
                        <TextField
                            style={{width:'100%'}}
                            name="newemail"
                            label="Enter your New Email"
                            variant='outlined'
                            {...formik.getFieldProps('newemail')}
                            {...errorHandler(formik, 'newemail')}
                        />
                        {backBtn()}
                        {formik.values.newemail && !formik.errors.newemail ? 
                            nextBtn()
                        :null}
                    </div>
                :null}

                {activeStep === 2 ?
                    <div className='form-group'>
                        <Button className='mt-3 me-2' variant='contained' color='primary'
                            onClick={formik.submitForm}> 
                            {/* we do like through formik like this */}
                                Yes Change my Email
                        </Button> 
                        { backBtn() }
                    </div>
                :null}
            </form>
        </>
    )
}

export default EmailStepper;