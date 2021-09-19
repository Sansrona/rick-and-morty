import React from 'react'

import {LoginForm} from "../../components/ui/layout/"

import styles from './login.module.scss';

const Login = () => {
    return (
        <>
        <div className={styles.title} />
          <LoginForm />  
        </>
    )
}

export default Login;
