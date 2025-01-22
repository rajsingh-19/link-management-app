import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { register } from "../../services/index"; 
import styles from "./register.module.css";
import loginBanner from "../../assets/loginBanner.png";
import cuvetteIcon from "../../assets/cuvetteIcon.svg";
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [registerFormData, setRegisterFormData] = useState({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    // Form validation logic
    const validateForm = () => {
      const errors = {};

      if (!registerFormData.name.trim()) {
        errors.name = "Name is required.";
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerFormData.email)) {
        errors.email = "Invalid email format.";
      };

      if(registerFormData.mobile.length < 10 ) {
          errors.mobile = "Enter 10 digit mobile number.";
      };

      if (registerFormData.password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
      };

      if (registerFormData.password !== registerFormData.confirmPassword) {
        errors.confirmPassword = "Passwords should match.";
      };

      setErrors(errors);
      return Object.keys(errors).length === 0;
    };

    //               Function to handle form submission and register the user
    const handleRegisterUser = async (e) => {
      e.preventDefault();                         // Prevents the default form submission behavior (like refreshing the page)

      if (!validateForm()) {
          return;
      };

      try {
          const res = await register(registerFormData);       // Calls the `register` function with the form data
          if(res.status === 201) {                    // Checks if the response status indicates success
              setRegisterFormData({
                  name: '',
                  email: '',
                  mobile: '',
                  password: ''  
              });

              toast.success("Registered Successfully");
              navigate('/');  
          } else {                                      // Handles any errors by logging the response and showing an alert
              const errorData = await res.json();
              const errorMessage = errorData.message || "An error occurred";
              toast.error(errorMessage);  // Show the error message from the backend
          }
      } catch (error) {
          console.log(error);
          toast.error("An unexpected error occurred:", error);
      }
    };

    //              function for handle the login 
    const handleLogin = () => {
      navigate('/');
    };

    return (
        <div className={styles.registerPageContainer}>
            {/*         left section                */}
            <div className={styles.imgContainer}>
                <img className={styles.loginImg} src={loginBanner} alt="login banner image" />
                <img className={styles.onImgLine} src={cuvetteIcon} alt="cuvette icon" />
            </div>
            {/*         right section               */}
            <div className={styles.registerSection}>
                <div className={styles.btnsNav}>
                    <span>SignUp</span>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div className={styles.registerContainer}>
                    <p className={styles.registerHeading}>Join us Today!</p>
                    {/* Form for user registration */}
                    <form onSubmit={handleRegisterUser} className={styles.registerForm}>
                      {/*     name       */}
                      <div className={styles.inputContainer}>
                          <input className={styles.input} type="text" name='name' value={registerFormData.name} placeholder="Name" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                      </div>
                      <div className={styles.errorContainer}>
                        {errors.name ? ( <p className={styles.errorMessage}>{errors.name}</p>) : 
                        (<p className={styles.errorMessage}>&nbsp;</p>)}
                      </div>
                      {/*     email      */}
                      <div className={styles.inputContainer}>
                          <input className={styles.input} type="email" name='email' value={registerFormData.email} placeholder="Email" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                      </div>
                      <div className={styles.errorContainer}>
                        {errors.email ? ( <p className={styles.errorMessage}>{errors.email}</p>) : 
                        (<p className={styles.errorMessage}>&nbsp;</p>)}
                      </div>
                      {/*     mobile     */}
                      <div className={styles.inputContainer}>
                          <input className={styles.input} type="number" name='mobile' value={registerFormData.mobile} placeholder="Mobile" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                      </div>
                      <div className={styles.errorContainer}>
                        {errors.mobile ? ( <p className={styles.errorMessage}>{errors.mobile}</p>) : 
                        (<p className={styles.errorMessage}>&nbsp;</p>)}
                      </div>
                      {/*     password   */}
                      <div className={styles.inputContainer}>
                          <input className={styles.input} type="password" name='password' value={registerFormData.password} placeholder="Password" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                      </div>
                      <div className={styles.errorContainer}>
                        {errors.password ? (<p className={styles.errorMessage}>{errors.password}</p>) : 
                        (<p className={styles.errorMessage}>&nbsp;</p>)}
                      </div>
                      {/*     confirm password */}
                      <div className={styles.inputContainer}>
                          <input className={styles.input} type="password" name='confirmPassword' value={registerFormData.confirmPassword} placeholder="Confirm Password" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                      </div>
                      <div className={styles.errorContainer}>
                        {errors.confirmPassword ? (<p className={styles.errorMessage}>{errors.confirmPassword}</p>) : 
                        (<p className={styles.errorMessage}>&nbsp;</p>)}
                      </div>
                      {/*     register btn     */}
                      <div>
                          <button type="submit" className={styles.loginBtn}>Register</button>
                      </div>
                    </form>
                    <div className={styles.bottomLine}>
                        <span>Already have an account?</span>&nbsp;&nbsp;
                        <span className={styles.clickable} onClick={handleLogin}>Login</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;
