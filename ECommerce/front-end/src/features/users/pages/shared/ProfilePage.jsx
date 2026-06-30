import useAuth from "../../../../hooks/useAuth"
import NameProfile from "../../components/NameProfile"
import InformationProfile from "../../components/InformationProfile"
import { useState, useEffect } from "react"
import useUpdateProfile from "../../hooks/useUpdateProfile"

const ProfilePage = () => {

    const { user, isLoading } = useAuth()
    const [formData, setFormData] = useState({
    name: "",
    email: ""
});
    const { update } = useUpdateProfile()

    

    const handleSubmit = async (e) => {
        e.preventDefault()

        await update(formData)
    }

    useEffect(() => {
        if (!user) return;
        
        setFormData({
        name: user.name ?? "",
        email: user.email ?? ""
    });


    }, [user])

    if (isLoading) {
        return <span>Cargando datos...</span>
    }

    return (
        <div className="flex flex-col py-20 justify-center items-center">
            <div className=" flex flex-col gap-5 w-120 z-10">
                <NameProfile name={user?.name} email={user?.email} role={user?.role?.name} />
                <InformationProfile nameValue={formData.name} nameOnChange={(e) => setFormData({...formData, name: e.target.value})} emailValue={formData.email} emailOnChange={(e) => setFormData({...formData, email: e.target.value})} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default ProfilePage
