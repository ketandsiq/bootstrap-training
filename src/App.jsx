import "@progress/kendo-theme-default/dist/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Gallery } from "react-grid-gallery";
import { Container, Overlay } from "react-bootstrap";
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import { useRef, useState } from "react";
import StackGrid from "react-stack-grid";
import "./style.css";

// console.log(data);
const data = [
  {
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    original: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 320,
    height: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    original: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 320,
    height: 212,
    caption: "Boats (Jeshu John - designerspics.com)",
  },
  {
    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    original: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 320,
    height: 212,
    caption: "Color Pencils (Jeshu John - designerspics.com)",
  },
  {
    thumbnail: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
    original: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
    width: 320,
    height: 213,
    caption: "Red Apples with other Red Fruit (foodiesfeed.com)",
  },
  {
    thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    original: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    width: 320,
    height: 183,
    caption: "37H (gratispgraphy.com)",
  },
  {
    thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
    original: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
    width: 240,
    height: 320,
    caption: "8H (gratisography.com)",
  },
  {
    thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
    original: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
    width: 320,
    height: 190,
    caption: "286H (gratisography.com)",
  },
  {
    thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
    original: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
    width: 320,
    height: 148,
    caption: "315H (gratisography.com)",
  },
  {
    thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    original: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    width: 320,
    height: 213,
    caption: "201H (gratisography.com)",
  },
  {
    thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
    original: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
    alt: "Big Ben - London",
    width: 248,
    height: 320,
    caption: "Big Ben (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
    original: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
    alt: "Red Zone - Paris",
    width: 320,
    height: 113,
    caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
    original: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
    alt: "Wood Glass",
    width: 313,
    height: 320,
    caption: "Wood Glass (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    original: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    width: 320,
    height: 213,
    caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
    original: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
    width: 320,
    height: 194,
    caption: "Old Barn (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
    original: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
    alt: "Cosmos Flower",
    width: 320,
    height: 213,
    caption: "Cosmos Flower Macro (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
    original: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
    width: 271,
    height: 320,
    caption: "Orange Macro (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
    original: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
    width: 320,
    height: 213,
    caption: "Surfer Sunset (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
    original: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
    width: 320,
    height: 213,
    caption: "Man on BMX (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
    original: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
    width: 320,
    height: 213,
    caption: "Ropeman - Thailand (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
    original: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
    width: 320,
    height: 213,
    caption: "Time to Think (Tom Eversley - isorepublic.com)",
  },
  {
    thumbnail: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
    original: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
    width: 320,
    height: 179,
    caption: "Untitled (Jan Vasek - jeshoots.com)",
  },
  {
    thumbnail: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
    original: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
    width: 320,
    height: 215,
    caption: "Untitled (moveast.me)",
  },
  {
    thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
    original: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
    width: 257,
    height: 320,
    caption: "A photo by 贝莉儿 NG. (unsplash.com)",
  },
  {
    thumbnail: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
    original: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
    width: 226,
    height: 320,
    caption: "A photo by Matthew Wiebe. (unsplash.com)",
  },
];
const App = () => {
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
                className="stack-grid-image"
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
export default App;
