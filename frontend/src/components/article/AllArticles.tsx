import React from 'react'
import { Article } from '../../types/Types'
import { baseUrl, imagesPath } from '../../config/Config';
import Container from '../Container';
import noPhoto from '../../images/no-photo.png';

interface AllArticlesProps{
  articles:Article[];
  title:string;
}

const AllArticles:React.FC<AllArticlesProps> = ({articles, title}) => {
  console.log(articles)
  return (
    <Container title={title}>
      { articles.map((article) => (
            <div key={article.articleId}>
              <h3>{article.name}</h3>
              {article.photos.length>0? <img
              className="w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32"
                src={baseUrl + imagesPath + article.photos[0].imagePath}
                alt={article.name}
              />:
              <img src={noPhoto} alt="No photo" className="w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32"/>}
              
            </div>
          ))}
    </Container>
  )
}

export default AllArticles