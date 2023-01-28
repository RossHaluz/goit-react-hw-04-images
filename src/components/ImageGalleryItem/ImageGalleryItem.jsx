import { useState } from 'react';
import { GalleryItem, ImageGalleryItemImg } from './ImageGalleryItem.styled';
import LargePhotoModal from 'components/Modal';

const ImageGalleryItem = ({ items }) => {
  const [largeImage, setlargeImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const onShowLargeImg = img => {
    setIsOpen(state => !state);
    setlargeImage(img);
  };

  return (
    <>
      {items.map(({ webformatURL, largeImageURL, id }) => {
        return (
          <GalleryItem key={id} onClick={() => onShowLargeImg(largeImageURL)}>
            <ImageGalleryItemImg
              src={webformatURL}
              alt=""
              width={350}
              height={350}
            />
          </GalleryItem>
        );
      })}
      {isOpen && (
        <LargePhotoModal largeImg={largeImage} onClose={onShowLargeImg} />
      )}
    </>
  );
};

export default ImageGalleryItem;
