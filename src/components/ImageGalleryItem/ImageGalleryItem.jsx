const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt={image.tags}
        onClick={openModal}
      />
    </li>
  );
};

export default ImageGalleryItem;
