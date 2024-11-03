import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CategoryType } from '../types/Types';

const CategoryPage = () => {
    const {categoryId} = useParams();
    const [category,setCategory] = useState<CategoryType>();
    
    useEffect(()=>{

    },[])
    return (
    <div>{categoryId}</div>
  )
}

export default CategoryPage