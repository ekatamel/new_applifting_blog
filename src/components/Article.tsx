import { ArticleType } from "../types/ArticleInterface";
import axios from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios-instance";

interface ArticleProps {
  data: ArticleType;
}

const Article = ({ data }: ArticleProps) => {
  const [imageURL, setImageURL] = useState(null);

  const loadImage = async () => {
    const response = await axiosInstance.get(`images/${data.imageId}`);
    // console.log(response.data);

    setImageURL(response.data);

    // console.log(response.data);

    // console.log(URL.createObjectURL(response.data));
  };

  useEffect(() => {
    loadImage();
  }, []);

  console.log("image", imageURL);

  return (
    <div>
      {imageURL && <img src={URL.createObjectURL(imageURL)} alt="" />}

      <h2></h2>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p></p>
      <a href=""></a>
      <span></span>
    </div>
  );
};

export default Article;
