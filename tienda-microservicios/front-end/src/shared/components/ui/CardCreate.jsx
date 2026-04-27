

const CardCreate = ({children, variant = "normal"}) => {

  const variants = {
    normal:"w-100 h-110 ",
    big: "w-150 h-170 "
  }


  return (
    <div className={`border z-9 bg-chart1 border-tableBorder rounded-2xl ${variants[variant]}`}  >
      {children}  
    </div>
  )
}

export default CardCreate
