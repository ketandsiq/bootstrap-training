// import { useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function ImageCarousel({ data, idx }) {//eslint-disable-line
  // const [index, setIndex] = useState(idx);

    return (
      <div
        style={{
          //   display: "flex",
          //   position: "absolute",
          backgroundColor: "rgba(124, 124, 124, 0.45)",
          //   top: 0,
          //   height: "100vh",
          //   width: "100vw",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   zIndex: 1000,
        }}
      >
        {/* <Carousel
          activeIndex={index}
          onSelect={(selectedIndex) => {
            setIndex(selectedIndex);
          }}
          interval={null}
          style={{ width: "80%", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          {data.map((image,index ) => (//eslint-disable-line
            
              <Carousel.Item
                key={index}
                style={{ height: "90vh", width: "100%" }}
              >
                <img
                  src={image["src"]}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Carousel.Item>
            )
          )}
        </Carousel> */}
        <ImageGallery
          items={data}
          startIndex={idx}
          showIndex={true} 
          showPlayButton={false} 
          showThumbnails={true}
          showBullets={true} 
          autoPlay={false} 
          renderItem={(item) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center", 
                alignItems: "center", 
                height: "100vh", 
                maxWidth: "90%",
                margin: "0 auto", 
              }}
            >
              <img
                src={item.original}
                alt="gallery"
                style={{
                  maxWidth: "100%", 
                  maxHeight: "80vh", 
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                }}
              />
            </div>
          )}
          renderThumbInner={(item) => (
            <div
              style={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={item.thumbnail}
                alt="thumb"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "80px", 
                  maxHeight: "80px",
                  borderRadius: "5px",
                  objectFit: "cover", 
                  border: "2px solid #fff", 
                }}
              />
            </div>
          )}
        />
      </div>
    );
}

export default ImageCarousel;
