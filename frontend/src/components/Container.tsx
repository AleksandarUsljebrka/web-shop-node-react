import React from "react";

interface ContainerProps{
    icon:string;
    title:string;
    children:React.ReactNode;
}
const Container:React.FC<ContainerProps> = ({icon, title,children}) => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pl-5 pr-5 min-h-screen  ">
        <div className="border px-4 py-4 flex flex-col ">
          <div className="w-full flex items-center ">
            <img
              className="w-12 h-12 sm:h-14 sm:w-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
              src={icon}
              alt="Icon"
            />
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-2 text-gray-900 justify-self-start">
              {title}
            </h3>
          </div>
          <div className="border border-white mb-4 w-11/12 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-4 justify-items-center items-center ">
            {children}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Container;
