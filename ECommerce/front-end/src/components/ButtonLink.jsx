import { Link } from "react-router-dom"

const ButtonLink = ({children, to,variant,size,color, className}) => {

    const variants = {

    }

    const sizes = {
        md:"px-4 py-2 "
    }

    const colors = {
        golden: "bg-golden text-white hover:bg-goldenHover",
        black: "font-bold hover:text-goldenHover",
        gray: "text-pGray hover:text-black"
    }

  return (
    <Link to={to} className={`text-center cursor-pointer w-fit rounded-lg items-center ${variants[variant]} ${sizes[size]} ${colors[color]} ${className}`}>
    {children}
    </Link>
  )
}

export default ButtonLink
