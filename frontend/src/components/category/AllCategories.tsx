import React from "react";
import CategoryCard from "./CategoryCard";
import { CategoryType } from "../../types/Types";
import catIcon from "../../images/categories_icon.png";
import { baseUrl, imagesPath } from "../../config/Config";
import Container from "../Container";

interface CategoriesProps {
  categories: CategoryType[];
}

const AllCategories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <Container title="All Categories" icon={catIcon}>
      {categories.map((category, i) => (
        <CategoryCard
          key={i}
          categoryName={category.name}
          imgSrc={baseUrl + imagesPath + "2024922-7781004412-hdd.jpg"}
        />
      ))}
    </Container>
  );
};

export default AllCategories;
