

const Button = ({children, color, size, onClick, variant, type='button', className}) => {
    const colors = {
        white:"text-white",
        golden: "bg-golden text-white hover:bg-goldenHover",
        darkgray: "bg-darkGray text-white border border-white/20"
    }
    const sizes = {

    }

    const variants = {
      simple: "",
      normal: "px-5 py-3 font-medium"
    }
  return (
    <button className={`text-center cursor-pointer w-fit rounded-lg ${variants[variant]} ${colors[color]} ${sizes[size]} ${className}`}
    onClick={onClick} type={type}>
        {children}
    </button>
  )
}

export default Button