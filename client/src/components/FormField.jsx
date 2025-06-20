import React from 'react'

const FormField = ({lableName,placeHolder,inputType,isTextArea,value,handleChange}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
        {lableName && (
            <span className="font-epilouge font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{lableName}</span>
        )}

        {isTextArea?(
            <textarea
             required
            value={value}
            onChange={handleChange}
            rows={10}
            placeholder={placeHolder}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] brder-[#3a3a43] bg-transparent text-white font-epilogue text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
            
            />
        ):
        (
            <input
            required
            value={value}
            onChange={handleChange}
            type={inputType}
            step="0.1"
            placeholder={placeHolder}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] brder-[#3a3a43] bg-transparent text-white font-epilogue text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
            
            />
        )}

    </label>
  )
}


export default FormField
