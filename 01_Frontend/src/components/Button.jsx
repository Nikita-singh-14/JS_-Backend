import React from 'react'

const Button = ({text}) => {
  return (
    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200">
          {text}
    </button>
  )
}

export default Button