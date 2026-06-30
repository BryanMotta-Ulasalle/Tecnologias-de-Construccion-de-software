import H5 from "../../../components/H5"
import LabelInput from "../../../components/LabelInput"
import Button from "../../../components/Button"

const InformationProfile = ({nameValue, nameOnChange, emailValue, emailOnChange, onSubmit}) => {
  return (
    <div className="bg-white px-5 py-10 rounded-xl border border-gray-200 flex flex-col gap-5">
        <H5>Informacion de la cuenta</H5>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <LabelInput isProfile="true" label="Nombre Completo" type="text" value={nameValue} onChange={nameOnChange}/>
            <LabelInput isProfile="true" label="Correo Electronico" type="email" value={emailValue} onChange={emailOnChange}/>
            <Button color="black" size="md" type="submit">Guardar Cambios</Button>
        </form>
        
    </div>
  )
}

export default InformationProfile
