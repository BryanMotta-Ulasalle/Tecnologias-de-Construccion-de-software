import Button from "../../Button"

const Logo = () => {
  return (
    <Button className="lg:flex flex-row gap-3 justify-center items-center ">
        <div className="w-10 h-10 bg-orange-300 rounded-lg font-black text-2xl"> S
        </div>
        <h1 className="hidden lg:inline-block text-white">Nombre</h1>
    </Button>
  )
}

export default Logo