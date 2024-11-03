import React from "react";
import Button from "./Button";

interface ContainerProps{
    icon?:string;
    title:string;
    children:React.ReactNode;
    onBack?:()=>void;
}
const Container:React.FC<ContainerProps> = ({icon, title,children, onBack}) => {
    const childrenCount = React.Children.count(children);
    let className;
    switch(childrenCount){
        case 1:
            className = "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1  gap-4 justify-items-center items-center ";
            break;
        case 2:
            className = "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  gap-4 justify-items-center items-center ";
            break;
        default:
            className = "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3  gap-4 justify-items-center items-center ";
            break;
        }
  return (
    <div className="min-h-screen">
      <div className="pt-24 pl-5 pr-5 min-h-screen  ">
        <div className="border px-4 py-4 flex flex-col ">
          <div className="w-full flex items-center ">
           {icon && <img
              className="w-12 h-12 sm:h-14 sm:w-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
              src={icon}
              alt="Icon"
            />}
            <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl my-2 text-gray-900 justify-self-start">
              {title}
            </h3>
            {onBack && 
            <div className="ml-auto">
                <Button buttonText="Back" onClick={onBack}/>
            </div>}
          </div>
          <div className="border border-white mb-4 w-11/12 mx-auto"></div>
          <div className={className}>
          {children}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Container;
