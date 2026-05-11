import PropTypes from 'prop-types'

const Title = ({ title, description }) => {
  return (
    <div>
        <h1 className='text-4xl font-bold text-white'>{title}</h1>
        <p className='text-text1 text-lg'>{description}</p>
      
    </div>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Title
