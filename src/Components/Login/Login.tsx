import { Link } from 'react-router-dom'
import './Login.css'
import eye from '../../assets/images/8872392_eye_no_icon.svg'
import { useForm } from 'react-hook-form'

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data:any) => {
    console.log(data);

  }

  return (
    <div className=' vh-100 auth-container d-flex justify-content-center align-items-center'>
      <div className='login-wrapper bg-auth p-5 w-50 rounded'>
        <h6 className='text-white'>welcome to PMS</h6>
        <h2 className='base-color'><span className='text-decoration-underline'>L</span>ogin</h2>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mt-3">
            <label htmlFor="" className='base-color'>E-mail</label>
            <input type="email"
              placeholder='Enter Your E-mail'
              className='form-control'
              {...register("email",
                {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                }
              )}

            />
            {errors.email && errors.email.type === "required" && <span className='text-warning '> email is required </span>}
            {errors.email && errors.email.type === "pattern" && <span className='text-warning '>Invalid email </span>}
          </div>
          <div className="form-group mt-3 position-relative">
            <label htmlFor="" className='base-color'>Password</label>
            {/* <TextField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"/> */}
            <input type="password"
              placeholder='Enter Your Password'
              className='form-control'
              {...register("password",
                {
                  required: true

                }
              )}
            />
            {errors.password && errors.password.type === "required" && <span className='text-warning'> password is required </span>}

            <img src={eye} alt="" className='toggle-pass' />
          </div>
          <div className="form-group mt-3">
            <Link className='text-white text-decoration-none d-flex justify-content-end mt-2' to={"/request-reset"}>
              Foget Password ?
            </Link>
          </div>
          <div className="form-group mt-3">

            <button className='btn btn-warning base-bg-color w-100 mt-3 login-btn'>Login</button>
          </div>
        </form>



      </div>
    </div>
  )
}
