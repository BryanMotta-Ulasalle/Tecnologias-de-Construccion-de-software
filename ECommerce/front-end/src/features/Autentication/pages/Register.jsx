import FormRegister from "../components/FormRegister"
import useRegister from "../hooks/useRegister"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);
  const navigate = useNavigate()

  const { registerUser, isLoading, error } = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await registerUser({
      name,
      email,
      password,
      role_id: role
    })

    if (result) {
      navigate("/login");
    }
  }

  return (
    <section className='w-dvw h-dvh bg-bgLight flex justify-center items-center'>
      <FormRegister name={name} nameOnChange={(e) => setName(e.target.value)} email={email} emailOnChange={(e) => setEmail(e.target.value)} 
      password={password} passOnChange={(e)=> setPassword(e.target.value)} role={role} roleOnChange={(e)=> setRole(Number(e.target.value))}
       isLoading={isLoading} error={error} onSubmit={handleSubmit}/>
    </section>
  )
}

export default Register
