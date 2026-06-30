import Button from "../../Button"

const Logo = ({isHome}) => {
  return (
    <Button className="lg:flex flex-row gap-3 justify-center items-center ">
        <div className={`w-10 h-10 rounded-lg font-black text-2xl ${isHome? "bg-orange-300 " : "bg-black text-white"}`}> S
        </div>
        <h1 className="hidden lg:inline-block text-white">Nombre</h1>
    </Button>
  )
}

export default Logo