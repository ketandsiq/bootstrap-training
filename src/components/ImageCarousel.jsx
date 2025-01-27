import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ImageCarousel({ data }) {//eslint-disable-line
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
      <div
        style={{
          display: "flex",
          transform: "translateY(-70%)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          style={{ width: "80%", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          {data.map((image,index ) => (//eslint-disable-line
            
              <Carousel.Item
                key={index}
                style={{ height: "90vh", width: "100%" }}
              >
                <img
                  src={image["image-url"]}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Carousel.Item>
            )
          )}
        </Carousel>
      </div>
    );
}

export default ImageCarousel;
