import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./style.module.css";

function ImageCarousel({ data, idx }) {//eslint-disable-line
  return (
    <ImageGallery
      items={data}
      startIndex={idx}
      showIndex={true}
      zoomable={true}
      disableSwipe={true}
      disableThumbnailScroll={true}
      showPlayButton={false}
      showThumbnails={true}
      showBullets={true}
      autoPlay={false}
      renderItem={(item) => (
        <div className={styles["img-div"]}>
          <img
            src={item.original}
            alt="gallery"
            className={styles["gallery-img-item"]}
          />
        </div>
      )}
      renderThumbInner={(item) => (
        <div className={styles["gallery-img-thumb-div"]}>
          <img
            src={item.thumbnail}
            alt="thumb"
            className={styles["gallery-img-thumb-img"]}
          />
        </div>
      )}
    />
  );
}

export default ImageCarousel;
