import { useRef, useState } from "react";
import { Container, Overlay } from "react-bootstrap";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import StackGrid from "react-stack-grid";
import { data } from "../../data";
import style from "./Gallery.module.css";

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const handleClickEvent = (indx) => {
    setShow(!show);
    console.log(indx);
    setIndex(indx);
  };
  const [show, setShow] = useState(false);

  const target = useRef(null);

  return (
    <>
      {show && (
        <Overlay target={target.current} show={show}>
          <ImageCarousel data={data} idx={index} />
        </Overlay>
      )}
      <Container>
        <StackGrid
          columnWidth="33.33%"
          // gutterWidth={10}
          gutterHeight={10}
        >
          {data.map((item, imgIndex) => (
            <div
              key={imgIndex}
              style={{
                width: "100%",
              }}
              onClick={() => {
                handleClickEvent(imgIndex);
              }}
            >
              <img
                src={item.thumbnail}
                alt={`Item ${imgIndex}`}
                className={style["stack-grid-image"]}
              />
            </div>
          ))}
        </StackGrid>
        {/* <Row className="g-0 justify-content-center">
          <Col xs={8}>
            <Gallery
              images={data}
              onClick={(index) => {
                handleClickEvent(index);
              }}
              enableImageSelection={false}
            />
          </Col>
        </Row> */}
      </Container>
    </>
  );
};
export default Gallery;
