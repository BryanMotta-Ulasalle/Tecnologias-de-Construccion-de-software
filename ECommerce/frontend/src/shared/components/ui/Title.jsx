import PropTypes from 'prop-types'

const Title = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-[#11110F]">{title}</h1>
      <p className="text-lg text-[#62574D]">{description}</p>
    </div>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Title
