import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Request } from '../utils/requests';

interface Props {
  imageId?: string;
  width: string;
  height: string;
}

const Image = ({ imageId, width, height }: Props) => {
  const imageUrl = `https://fullstack.exercise.applifting.cz/images/${imageId}`;

  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>();

  const { data } = useQuery(
    `image${imageId}`,
    async () => {
      return Request.loadImage(imageId);
    },
    {
      onSuccess(data) {
        const response: any = data;
        const imageToBlob = async () => {
          const imageBlob = await data.data;
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          reader.onloadend = () => {
            const base64data = reader.result;
            setImgUrl(base64data);
          };
        };
        imageToBlob();
      }
    }
  );

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
