

const Button = ({children, color, size, onClick, type='button', className}) => {
    const colors = {
        white:"text-white"
    }
    const sizes = {

    }
  return (
    <button className={`text-center cursor-pointer ${colors[color]} ${sizes[size]} ${className}`}
    onClick={onClick} type={type}>
        {children}
    </button>
  )
}

export default Button