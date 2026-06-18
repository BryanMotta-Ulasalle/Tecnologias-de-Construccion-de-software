

const H2 = ({children, color}) => {

    const colors = {
        white: "text-white"
    }

  return (
    <h2 className={`${colors[color]}`}
    >{children}</h2>
  )
}

export default H2