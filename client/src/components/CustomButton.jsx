import React from 'react'

const CustomButton = ({btnType,title,handleClick,styles}) => {
  return (
  <button
  type={btnType}
  
  className={` font-semibold text-[16px] leading-[26px] text-white px-4 rounded-[10px] ${styles}`}
  onClick={handleClick}>
{title}
    </button>
  )
}

export default CustomButton

