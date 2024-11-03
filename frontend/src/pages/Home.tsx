
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import AllCategories from "../components/category/AllCategories";
// import { CategoryService } from "../services/CategoryService";
// import { CategoryType } from "../types/Types";
// import { baseUrl, imagesPath } from "../config/Config";
// import AllArticles from "../components/article/AllArticles";

// const Home = () => {
//   const { user } = useAuth();
//   const { getAllCategories } = CategoryService;
//   const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
//   const [mainCategories, setMainCategories] = useState<CategoryType[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
//     null
//   );
//   const [categoryStack, setCategoryStack] = useState<CategoryType[]>([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getAllCategories(user.token);
//         const allCategories: CategoryType[] = response.data;
//         const mainCategories = allCategories.filter(
//           (c) => c.parentCategoryId === null
//         );
//         setMainCategories(mainCategories);
//         setAllCategories(allCategories);
//       } catch (error) {
//         alert("Fetching categories failed!");
//       }
//     };
//     fetchCategories();
//   }, [user.token]);

//   const handleOpenCategory = (categoryId: number) => {
//     const category = allCategories.find((c) => c.categoryId === categoryId);
//     if (category) {
//       setCategoryStack([...categoryStack, category]);
//       setSelectedCategory(category);
//     }
//   };

//   const handleBackToCategories = () => {
//     const newStack = [...categoryStack];
//     newStack.pop();
//     setCategoryStack(newStack);
//     setSelectedCategory(newStack[newStack.length - 1] || null);
//   };

//   return (
//     <>
      
//       {selectedCategory ? (
//         selectedCategory.categories &&
//         selectedCategory.categories.length > 0 ? (
//           <AllCategories
//             onBack={handleBackToCategories}
//             categories={selectedCategory.categories}
//             handleOpenCategory={handleOpenCategory}
//             title={selectedCategory.name}
//           />
//         ) : selectedCategory.articles &&
//           selectedCategory.articles.length > 0 ? (
//          <AllArticles articles={selectedCategory.articles} title={selectedCategory.name}/>
//         ) : (
//           <p>No articles available</p>
//         )
//       ) : (
//         <AllCategories
//           categories={mainCategories}
//           handleOpenCategory={handleOpenCategory}
//         />
//       )}
//     </>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AllCategories from "../components/category/AllCategories";
import { CategoryService } from "../services/CategoryService";
import { CategoryType } from "../types/Types";
import { baseUrl, imagesPath } from "../config/Config";
import AllArticles from "../components/article/AllArticles";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const { user } = useAuth();
    const { getAllCategories, getCategoryById } = CategoryService;
    const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
    const [currentSubCategories, setCurrentSubCategories] = useState<CategoryType[]>([]);
    const [previousSubCategories, setPreviousSubCategories] = useState<{ categories: CategoryType[], id:number|null }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getAllCategories(user.token);

          const allCategories: CategoryType[] = response.data;
          const mainCategories = allCategories.filter(c => c.parentCategoryId === null);
          
          setCurrentSubCategories(mainCategories);
          setAllCategories(allCategories);
        } catch (error) {
          alert("Fetching categories failed!");
        }
      };
      fetchCategories();
    }, [user.token]);
  
    const handleOpenCategory = async (categoryId: number) => {
      try {
        const response = await getCategoryById(categoryId, user.token);
        const openedCategory = response.data;
  
        setPreviousSubCategories([...previousSubCategories, { categories: currentSubCategories, id: selectedCategory?.categoryId||null}]);
        
        setSelectedCategory(openedCategory);
        setCurrentSubCategories(openedCategory.categories);
      } catch (error) {
        alert("Fetching categories failed!");
      }
    };
  
    const handleBackToCategories = () => {
      const lastSubCategory = previousSubCategories.pop();
      
      if (lastSubCategory) {
        setCurrentSubCategories(lastSubCategory.categories);
        let  newSelectedCategory = allCategories.find(cat => cat.categoryId === lastSubCategory.id)||null;
        setSelectedCategory(newSelectedCategory);
      } else {
        setCurrentSubCategories([]); 
      }
      
      setPreviousSubCategories([...previousSubCategories]);
    };
  
    return (
      <>
        {selectedCategory ? (
          selectedCategory.categories && selectedCategory.categories.length > 0 ? (
            <AllCategories
              onBack={handleBackToCategories}
              categories={currentSubCategories}
              handleOpenCategory={handleOpenCategory}
              title={selectedCategory.name}
            />
          ) : selectedCategory.articles && selectedCategory.articles.length > 0 ? (
            <AllArticles articles={selectedCategory.articles} title={selectedCategory.name}/>
          ) : (
            <p>No articles available</p>
          )
        ) : (
          <AllCategories
            categories={currentSubCategories}
            handleOpenCategory={handleOpenCategory}
            title="Main Categories"
          />
        )}
      </>
    );
  };
  
  export default Home;