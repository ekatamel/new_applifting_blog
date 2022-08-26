import { useState } from 'react';
import { useQuery } from 'react-query';
import { Request } from '../utils/requests';

interface Props {
  imageId?: string;
  className?: string;
}

const Image = ({ imageId, className }: Props) => {
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
    <>
      <div
        className={className}
        style={{
          backgroundImage: `url(${imgUrl})`
        }}></div>
    </>
  );
};

export default Image;
