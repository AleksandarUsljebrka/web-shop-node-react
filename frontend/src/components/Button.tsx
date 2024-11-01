import React from 'react'

interface ButtonProps{
    buttonText:string;
    className?:string;
}
const Button:React.FC<ButtonProps> = ({buttonText, className}) => {
    let classNameProps = "border rounded-md w-16 text-sm lg:w-32 lg:text-2xl mt-6 p-2 bg-gray-600 hover:bg-gray-400 transition duration-300 ";
    classNameProps += className? className :'';

    return (
    <button
        type="submit" 
        className={classNameProps}>
        {buttonText}
    </button>
  )
}

export default Button