import React from 'react'
import Button from '../Button';

interface CategoryCardProps{
    categoryName:string;
    imgSrc:string;
}
const CategoryCard:React.FC<CategoryCardProps> = ({categoryName, imgSrc}) => {
  return (
    <div className="mx-1 px-2 border rounded-xl  py-2 w-56 h-56 md:w-56 md:h-56 lg:w-72 lg:h-72 flex flex-col justify-around items-center bg-gray-700 text-white text-sm md:text-xl lg:text-2xl">
    <h4 className='p-1 my-1 text-2xl sm:text-xl md:text-xl lg:text-2xl'>{categoryName}</h4>
    <img src={imgSrc}
        className="w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32"
    />
    <Button
        buttonText='Open'
        className='my-2'

    />
</div>
  )
}

export default CategoryCard