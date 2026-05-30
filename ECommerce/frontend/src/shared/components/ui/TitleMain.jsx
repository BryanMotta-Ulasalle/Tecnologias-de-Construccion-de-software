import PropTypes from 'prop-types'

const TitleMain = ({ icon: Icon, h1, p }) => {
  return (
    <div className="flex flex-row items-center gap-4 border-b-2 border-tableBorder px-5 py-10">
      {Icon && <Icon className="h-13 w-13 rounded-lg bg-iconBackground p-1 text-icon" />}
      <div>
        <h1 className="text-xl font-bold text-text2">{h1}</h1>
        <p className="text-text1">{p}</p>
      </div>
    </div>
  )
}

TitleMain.propTypes = {
  icon: PropTypes.elementType,
  h1: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
}

export default TitleMain
