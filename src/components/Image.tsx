import React, { useEffect, useState } from 'react';

interface Props {
  imageId?: string;
  width: string;
  height: string;
}

const Image = ({ imageId, width, height }: Props) => {
  const imageUrl = `https://fullstack.exercise.applifting.cz/images/${imageId}`;

  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>();

  const getImg = async () => {
    const response = await fetch(imageUrl, {
      headers: {
        'X-API-KEY': '5c946f9a-b317-4dd2-a3f3-e188fe5ddb30',
        Authorization: 'e6c7b2c3-30c3-47b3-a831-ce277841cda7'
      }
    });
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      setImgUrl(base64data);
    };
  };

  useEffect(() => {
    getImg();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        width: width,
        height: height
      }}></div>
  );
};

export default Image;
