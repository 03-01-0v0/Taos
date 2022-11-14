import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import * as Yup from 'yup';
import signInApi from '../api/signInApi';

const StyledSignIn = styled.div`
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
        color: #FF3333;
        margin: 5px 0;
    }
`;

export default function SignInPage() {
    return (
        <StyledSignIn>
            <h3>Sign In</h3>
            <Formik
                initialValues={{
                    name: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={async (value) => {
                    const {name, password} = value
                    const res = await signInApi.signIn(name, password);
                    console.log(res);
                }}
            >
                <Form name='form-login'>
                    <Field
                        name='name'
                        type='text'
                        className='account'
                        placeholder='username'
                    ></Field>
                    <div className='error'>
                        <ErrorMessage name='name' />
                    </div>
                    <Field
                        name='password'
                        type='password'
                        className='account'
                        placeholder='password'
                    ></Field>
                    <div className='error'>
                        <ErrorMessage name='password' />
                    </div>
                    <button type='submit' className='btn btn-login'>
                        Sign In
                    </button>
                    <a href='#'>Forgot Password?</a>
                    <Link to='/sign-up'>Sign Up?</Link>
                </Form>
            </Formik>
        </StyledSignIn>
    );
}
