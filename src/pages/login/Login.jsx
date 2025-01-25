import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../../services/index"; 
import styles from "./login.module.css";
import loginBanner from "../../assets/loginBanner.png";
import cuvetteIcon from "../../assets/cuvetteIcon.svg";
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    // Redirect to home if the user is already logged in (i.e., a token exists in localStorage)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            navigate('/dashboard');
        }
    }, []);

    //      function for validating the form inputs by using regex
    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        //      check if the email input is empty
        if (!loginFormData.email.trim()) {
            errors.email = "Email is required";
            //  check if the email format is correct
        } else if (!emailRegex.test(loginFormData.email)) {
            errors.email = "Invalid email format";
        }
        //      check if the password input is empty
        if (!loginFormData.password.trim()) {
            errors.password = "Password is required";
        }
        //      set the error state 
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    //      Fucntion for user login
    const handleLogin = async (e) => {
        e.preventDefault();                     // Prevents the default form submission behavior (like refreshing the page)

        if (!validateForm()) return;

        try {
            const res = await login(loginFormData);    // Calls the `signin` function with the form data
            if(res.status === 200) {                // Checks if the response status indicates success
                const data = await res.json();
                const token = data.result.token;
                const userId = data.result.userId;
                const name = data.result.name;

                localStorage.setItem('token', token);      // Save token for later use
                localStorage.setItem('userId', userId);      // Save userId for later use
                localStorage.setItem('name', name);      // Save name for later use

                // Reset form data after successful registration
                setLoginFormData({
                    email: '',
                    password: '',
                });

                toast.success("Logged in Successfully");
                navigate('/dashboard');
            } else {                                // Handles any errors by logging the response and showing an alert
                const errorData = await res.json();
                const errorMessage = errorData.message || "An error occurred";
                toast.error(errorMessage);  // Show the error message from the backend
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred:", error);
        };
    };

    //              function for handle the sign up 
    const hanldeSignUp = () => {
        navigate('/register');
    };

    return (
        <div className={styles.loginPageContainer}>
            {/*         left section                */}
            <div className={styles.imgContainer}>
                <img className={styles.loginImg} src={loginBanner} alt="login banner image" />
                <img className={styles.onImgLine} src={cuvetteIcon} alt="cuvette icon" />
            </div>
            {/*         right section               */}
            <div className={styles.loginSection}>
                <div className={styles.btnsNav}>
                    <span onClick={hanldeSignUp}>SignUp</span>
                    <button>Login</button>
                </div>
                <div className={styles.loginContainer}>
                    <p className={styles.loginHeading}>Login</p>
                    {/*         Form for user login */}
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        {/*         email       */}
                        <div className={styles.inputContainer}>
                            <input className={styles.input} type="email" name="email" value={loginFormData.email} placeholder="Email id" onChange={(e) => setLoginFormData({...loginFormData, [e.target.name]: e.target.value})} />
                        </div>
                        <div className={styles.errorContainer}>
                            {errors.email ? ( <p className={styles.errorMessage}>{errors.email}</p>) : 
                            (<p className={styles.errorMessage}>&nbsp;</p>)}
                        </div>
                        {/*         password     */}
                        <div className={`${styles.inputContainer}`}>
                            <input className={styles.input}  type="password" name="password" value={loginFormData.password} placeholder="Password" onChange={(e) => setLoginFormData({...loginFormData, [e.target.name]: e.target.value})} />
                        </div>
                        <div className={styles.errorContainer}>
                            {errors.password ? (<p className={styles.errorMessage}>{errors.password}</p>) : 
                            (<p className={styles.errorMessage}>&nbsp;</p>)}
                        </div>
                        {/*         login btn     */}
                        <div>
                            <button type="submit" className={styles.loginBtn} >Login</button>
                        </div>
                    </form>
                    <div className={styles.bottomLine}>
                        <span>Don't have an account?</span>&nbsp;&nbsp;
                        <span className={styles.clickable} onClick={hanldeSignUp}>SignUp</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;
