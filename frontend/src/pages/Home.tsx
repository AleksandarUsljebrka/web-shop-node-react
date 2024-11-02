import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import catImg from "../../../storage/photos/thumb/2024922-7781004412-hdd.jpg";
import CategoryCard from "../components/category/CategoryCard";
import AllCategories from "../components/category/AllCategories";
import { CategoryService } from "../services/CategoryService";
import { CategoryType } from "../types/Types";

const Home = () => {
  const { user } = useAuth();
  const { getAllCategories } = CategoryService;
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(user.token);
        if (
          response.status < 200 ||
          response.status >= 300 ||
          response.data.status === "error"
        ) {
          throw new Error(response.data.message);
        }
        setCategories(response.data);
      } catch (error: any) {
        alert(error?.message || "Fetching categories failed!");
      }
    };
    fetchCategories();
  },[]);

  return <AllCategories categories = {categories}/>;
};

export default Home;
