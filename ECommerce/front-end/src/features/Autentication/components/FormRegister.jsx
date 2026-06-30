import Button from "../../../components/Button"
import { ArrowLeft } from 'lucide-react';
import P from "../../../components/P"
import H2 from './../../../components/H2';
import LabelInput from "../../../components/LabelInput";
import ButtonLink from "../../../components/ButtonLink";

const FormRegister = ({ name, nameOnChange, email, emailOnChange, password, passOnChange, role, roleOnChange, isLoading, error, onSubmit }) => {
    return (
        <div className="flex flex-col gap-6 w-120">
            <div className="">
                <ButtonLink to="/login" className="flex gap-2" color="gray"><ArrowLeft className="w-4 h-4" /> Atrás</ButtonLink>
            </div>
            <div>
                <H2>Crear Cuenta</H2>
                <P>Unete a Ecommerce ahora</P>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <LabelInput label="Nombre Completo" type="text" value={name} onChange={nameOnChange} placeholder="Bryan Motta Bedregal" />
                <LabelInput label="Correo Electronico" type="email" value={email} onChange={emailOnChange} placeholder="tu@ejemplo.com" />
                <LabelInput label="Contraseña" type="password" value={password} onChange={passOnChange} placeholder="********" />
                <label className="font-medium">Rol</label>
                <select value={role} onChange={roleOnChange} className="border border-gray-200 bg-white px-4 py-2 rounded-lg">
                    <option value="">Selecciona un rol</option>
                    <option value="3">Usuario</option>
                    <option value="2">Empleado</option>
                    <option value="1">Administrador</option>
                </select>
                <Button disabled={isLoading} type="submit" color="black" size="md" className="w-full">Crear Cuenta</Button>
                {error && <p>{error}</p>}

            </form>
        </div>
    )
}

export default FormRegister
