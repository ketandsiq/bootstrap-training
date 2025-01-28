// import { useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function ImageCarousel({ data, idx }) {//eslint-disable-line
  // const [index, setIndex] = useState(idx);

    return (
      <div
        // style={{
        //   display: "flex",
        //   position: "absolute",
        //   backgroundColor: "rgba(0, 0, 0, 0.5)",
        //   top: 0,
        //   height: "100vh",
        //   width: "100vw",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   zIndex: 1000,
        // }}
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
        <ImageGallery items={data} s/>
      </div>
    );
}

export default ImageCarousel;
