// import React from "react";
// import CategoryCard from "./CategoryCard";
// import { CategoryType } from "../../types/Types";
// import catIcon from "../../images/categories_icon.png";
// import { baseUrl, imagesPath } from "../../config/Config";
// import Container from "../Container";
// import { useNavigate } from "react-router-dom";

// interface CategoriesProps {
//   categories: CategoryType[];
//   handleOpenCategory:(categoryId:number)=>void;
// }

// const AllCategories: React.FC<CategoriesProps> = ({ categories, handleOpenCategory }) => {
//     const navigate = useNavigate();

   
//   return (
//     <Container title="All Categories" icon={catIcon}>
//       {categories.map((category, i) => (
//         <CategoryCard
//          handleOpenCategory={handleOpenCategory}
//           key={i}
//           category={category}
//           imgSrc={baseUrl + imagesPath + "2024922-7781004412-hdd.jpg"}
//         />
//       ))}
//     </Container>
//   );
// };

// export default AllCategories;
import React from "react";
import CategoryCard from "./CategoryCard";
import { CategoryType } from "../../types/Types";
import catIcon from "../../images/categories_icon.png";
import { baseUrl, imagesPath } from "../../config/Config";
import Container from "../Container";

interface CategoriesProps {
  categories: CategoryType[];
  title?:string;
  handleOpenCategory: (categoryId: number) => void;
  onBack?:()=>void;
}

const AllCategories: React.FC<CategoriesProps> = ({ categories, handleOpenCategory, onBack,title }) => {
  return (
    <Container title={title? title:"All Categories"} icon={catIcon} onBack={onBack}>
      {categories.map((category, i) => (
        <CategoryCard
          key={i}
          category={category}
          imgSrc={baseUrl + imagesPath + "2024922-7781004412-hdd.jpg"}
          handleOpenCategory={handleOpenCategory}
        />
      ))}
    </Container>
  );
};

export default AllCategories;
