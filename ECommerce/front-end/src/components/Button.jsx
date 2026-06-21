

const Button = ({children, color, size, onClick, variant, type='button', className}) => {
    const colors = {
        white:"text-white",
        golden: "bg-golden text-white hover:bg-goldenHover",
        darkgray: "bg-darkGray text-white border border-white/20",
        black: "bg-black text-white hover:bg-golden"
    }
    const sizes = {
      sm:"px-2 py-1.5 text-sm"
    }

    const variants = {
      simple: "",
      normal: "px-5 py-3 font-medium"
    }
  return (
    <button className={`text-center cursor-pointer w-fit rounded-lg items-center ${variants[variant]} ${colors[color]} ${sizes[size]} ${className}`}
    onClick={onClick} type={type}>
        {children}
    </button>
  )
}

export default Button