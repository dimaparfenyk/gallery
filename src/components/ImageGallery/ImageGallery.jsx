import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="ImageGallery">
      {images &&
        images.map((item) => (
          <ImageGalleryItem image={item} key={item.id} openModal={openModal} />
        ))}
    </ul>
  );
};

export default ImageGallery;
