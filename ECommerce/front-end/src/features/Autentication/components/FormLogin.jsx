import P from "../../../components/P"
import H2 from './../../../components/H2';
import LabelInput from "../../../components/LabelInput";
import Button from './../../../components/Button';
import ButtonLink from "../../../components/ButtonLink";
import { ArrowLeft } from 'lucide-react';

const FormLogin = ({email, password, emailOnChange, passOnChange, onSubmit,isLoading,error}) => {
    return (
        <div className="flex flex-col gap-10 w-100">
            <ButtonLink to="/" className="flex gap-2" color="gray"><ArrowLeft className="w-4 h-4" /> Inicio</ButtonLink>
            <div className="flex flex-col gap-2">
                <H2>Bienvenido de nuevo</H2>
                <P>Inicia sesion con tu cuenta registrada</P>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <LabelInput label="Correo Electronico" type="email" value={email} onChange={emailOnChange} placeholder="Ej: usuario@usuario.com"/>
                <LabelInput label="Contraseña" type="password" value={password} onChange={passOnChange} placeholder="********"/>
                <Button disabled={isLoading} type="submit" color="black" size="md" className="w-full">Iniciar Sesion</Button>
                {error && <p>{error}</p>}
                <div className="flex gap-1 items-center">
                    <P>¿No tienes una cuenta?</P>
                    <ButtonLink to="/register" color="black">Crea una</ButtonLink>
                </div>
            </form>
        </div>
    )
}

export default FormLogin
