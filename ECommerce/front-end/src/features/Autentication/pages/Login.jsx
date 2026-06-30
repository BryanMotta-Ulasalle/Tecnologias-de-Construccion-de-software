import { useNavigate } from "react-router-dom";
import FormLogin from "../components/FormLogin"
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import image from "../../../assets/login-photo.webp"


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)

  const { login, isLoading } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)

    try {
      await login({
        email,
        password
      })
      navigate("/")
    } catch (error) {
      setError(error.response?.data?.detail || "Error al iniciar sesión");
    }
  }

  return (
    <section className='w-dvw h-dvh flex flex-row'>
      <div className='flex-1 bg-gray-400 relative'>
          <div className="absolute w-full h-full bg-black/50"></div>
          <img className="object-cover w-full h-full " src={image} alt="imageLogin" />
      </div>
      <div className='flex-1 bg-bgLight flex justify-center items-center'>
        <FormLogin email={email} password={password} emailOnChange={(e) => setEmail(e.target.value)} passOnChange={(e) => setPassword(e.target.value)} onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      </div>

    </section>
  )
}

export default Login
