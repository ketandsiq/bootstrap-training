import { useEffect, useRef, useState } from "react";
import { Container, Overlay } from "react-bootstrap";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import StackGrid from "react-stack-grid";
import { data } from "../../data";
import style from "./gallery.module.css";

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      setTimeout(() => {
        gridRef.current.updateLayout();
      }, 500); 
    }
  }, []);

  const handleClickEvent = (indx) => {
    setShow(!show);
    setIndex(indx);
  };

  return (
    <>
      {show && (
        <Overlay target={target.current} show={show}>
          <ImageCarousel data={data} idx={index} />
        </Overlay>
      )}
      <Container>
        <StackGrid ref={gridRef} columnWidth="33.33%" gutterHeight={10}>
          {data.map((item, imgIndex) => (
            <div
              key={imgIndex}
              style={{ width: "100%" }}
              onClick={() => handleClickEvent(imgIndex)}
            >
              <img
                src={item.thumbnail}
                alt={`Item ${imgIndex}`}
                className={style["stack-grid-image"]}
                onLoad={() => gridRef.current?.updateLayout()}
              />
            </div>
          ))}
        </StackGrid>
      </Container>
    </>
  );
};

export default Gallery;
