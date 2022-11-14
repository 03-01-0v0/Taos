import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import * as Yup from 'yup';

const StyledSignUp = styled.div`
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 5px;
    text-align: center;
    padding: 20px 40px;
    box-shadow: 2px 2px 2px 2px #888888;
    h3 {
        text-shadow: 2px 2px 5px gray;
        margin-bottom: 20px;
    }
    .btn {
        width: 100%;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        outline: none;
        border: none;
        margin-top: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.5s;
    }
    .btn-login {
        background: #386fe4;
        margin-bottom: 10px;
    }
    .btn-login-google {
        background: #ee4d2d;
    }
    .btn-login-fb {
        background: #386fe6;
    }
    .login .btn:hover {
        opacity: 0.9;
    }
    .account {
        width: 100%;
        outline: none;
        padding: 10px;
        margin-bottom: 15px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        border: 1px solid #a59797;
    }
    a {
        text-decoration: none;
        margin-bottom: 15px;
        margin-right: 50px;
        margin-left: 50px;
        padding-top: 15px;
    }
    .error {
        color: #ff3333;
        margin: 5px 0;
    }
`;

export default function SignUpPage() {
    return (
        <StyledSignUp className='login'>
            <h3>Sign Up</h3>
            <Formik
                initialValues={{
                    name: '',
                    password: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    password: Yup.string().required('Required'),
                    email: Yup.string().email('Required Email').required('Required'),
                    phoneNumber: Yup.string()
                        .min(10, 'Must have 10 character')
                        .max(10, 'Must have 10 character')
                        .required('Required'),
                    address: Yup.string().required('Required'),
                })}
                onSubmit={(value) => {
                    console.log(value);
                }}
            >
                <Form name='form-login'>
                    <Field type='text' className='account' placeholder='username' name='name' />
                    <div className='error'>
                        <ErrorMessage name='name' />
                    </div>
                    <Field
                        type='password'
                        className='account'
                        placeholder='password'
                        name='password'
                    />
                    <div className='error'>
                        <ErrorMessage name='password' />
                    </div>
                    <Field type='email' className='account' placeholder='email' name='email' />
                    <div className='error'>
                        <ErrorMessage name='email' />
                    </div>
                    <Field
                        type='text'
                        className='account'
                        placeholder='phone number'
                        name='phoneNumber'
                    />
                    <div className='error'>
                        <ErrorMessage name='phoneNumber' />
                    </div>
                    <Field type='text' className='account' placeholder='address' name='address' />
                    <div className='error'>
                        <ErrorMessage name='address' />
                    </div>
                    <button type='button' className='btn btn-login'>
                        Sign Up
                    </button>
                    <Link to='/sign-in'>Sign In?</Link>
                </Form>
            </Formik>
        </StyledSignUp>
    );
}
