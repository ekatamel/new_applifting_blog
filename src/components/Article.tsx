import { ArticleType } from "../types/ArticleInterface";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios-instance";

import { FC } from "react";

interface ArticleProps {
  data: ArticleType;
}

const Article: FC<ArticleProps> = ({ data }) => {
  const [imageURL, setImageURL] = useState<string>();

  const loadImage = async () => {
    const response = await axiosInstance.get(`images/${data.imageId}`);

    setImageURL(response.data);
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div>
      {/* {imageURL && <img src={URL.createObjectURL(imageURL)} alt="" />} */}

      <h2>{data.title}</h2>
      <div>
        <span></span>
        <span></span>
        {/* <span>{data.createdAt}</span> */}
      </div>
      <p>{data.perex}</p>
      <a href={`/articles/${data.articleId}`}>Read whole article</a>
      <span></span>
    </div>
  );
};

export default Article;
