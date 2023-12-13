/** @format */

import { FC, useCallback, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import eye from "../../assets/images/8872392_eye_no_icon.svg";
import styles from "./Login.module.css";
import { AuthContext } from "../../Context/AuthContextProvider";
import axios from "axios";
import { TextField } from "@mui/material";
interface FormData {
  email: string;
  password: string;
}
const Login: FC = () => {
  const { baseUrl, isLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
        setShowPassword(!showPassword);
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const handleLoginUser: SubmitHandler<FormData> = useCallback(
    (data) => {
      axios
        .post(`${baseUrl}/Users/Login`, data)
        .then((response: any) => {
          localStorage.setItem("tokenUser", response.data.token);
          console.log(response);
          navigate("/dashboard");
        })
        .catch((error) => console.log(error));
    },
    [navigate]
  );

  return (
    <>
 
  <div className=" vh-100 auth-container d-flex justify-content-center align-items-center">
     
     <div className={`${styles.bgAuth} login-wrapper p-5 w-50 rounded`} >
       <h6 className="text-white">welcome to PMS</h6>
       <h2 className={`${styles.baseColor}`}>
         <span className="text-decoration-underline text-capitalize">
           login
         </span>
       </h2>

       <form action="" onSubmit={handleSubmit(handleLoginUser)}>
         <div className="form-group mt-3">
           <label htmlFor="" className={`${styles.baseColor}`}>
             E-mail
           </label>
           <TextField 
            variant="standard"
             type="email"
             placeholder="Enter Your E-mail"
             className="w-100"

             {...register("email", {
               required: true,
               pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
             })}
           />
           {errors.email && errors.email.type === "required" && (
             <span className="text-danger "> email is required </span>
           )}
           {errors.email && errors.email.type === "pattern" && (
             <span className="text-danger ">Invalid email </span>
           )}
         </div>
         <div className="form-group mt-3 position-relative">
           <label htmlFor="" className={`${styles.baseColor}`}>
             Password
           </label>

           <TextField 
           autoComplete="password"
           type={showPassword ? 'text' : 'password'}
            placeholder="Enter Your Password"
            variant="standard"
           className="w-100"
            {...register("password", {
              required: true,
            })}
            />          
           <img onClick={togglePassword} src={eye} alt="" className={`${styles.togglePass}`} />
         </div>
         {errors.password && errors.password.type === "required" && (
             <span className="text-danger"> password is required </span>
           )}
           
         <div className="form-group mt-3">
           <Link
             className="text-white text-decoration-none d-flex justify-content-end mt-2"
             to={"/request-reset"}
           >
             Foget Password ?
           </Link>
         </div>
         <div className="form-group mt-3">
           <button className= {`${styles.loginBtn} ${styles.baseBgColor} btn btn-warning  w-100 mt-3`}>
             Login
           </button>
         </div>
       </form>
     </div>

   </div>
    </>
 
  );
};
export default Login;
