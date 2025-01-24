import "@progress/kendo-theme-default/dist/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import * as React from "react";

// import { data } from "./ch-weather-data.js";
import { Col, Container, Row } from "react-bootstrap";

// console.log(data);
const data = [
  {
    description: "Lady with a Teddy",
    "image-url":
      "https://images.pexels.com/photos/29937530/pexels-photo-29937530/free-photo-of-stunning-northern-lights-over-british-columbia.jpeg",
  },
  {
    description: "Girl with camera",
    "image-url":
      "https://images.pexels.com/photos/30254787/pexels-photo-30254787/free-photo-of-cozy-coffee-setup-with-plants-and-books.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    description: "Beautiful Girl with Glasses",
    "image-url":
      "https://images.pexels.com/photos/30305131/pexels-photo-30305131/free-photo-of-colorful-hindu-temple-at-batu-caves-malaysia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    description: "Redhead with frackles",
    "image-url":
      "https://images.pexels.com/photos/16762023/pexels-photo-16762023/free-photo-of-village-with-church-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    description: "Girl in black dress",
    "image-url":
      "https://images.pexels.com/photos/9943963/pexels-photo-9943963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    description: "Girl Sitting on Chair",
    "image-url":
      "https://images.pexels.com/photos/6691721/pexels-photo-6691721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    description: "Girl Sitting on Chair",
    "image-url":
      "https://images.pexels.com/photos/6691721/pexels-photo-6691721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    description: "Girl Sitting on Chair",
    "image-url":
      "https://images.pexels.com/photos/6691721/pexels-photo-6691721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    description: "Girl Sitting on Chair",
    "image-url":
      "https://images.pexels.com/photos/6691721/pexels-photo-6691721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    description: "Girl Sitting on Chair",
    "image-url":
      "https://images.pexels.com/photos/6691721/pexels-photo-6691721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    description: "Girl Sitting on Chair",
    "image-url":
      "https://images.pexels.com/photos/6691721/pexels-photo-6691721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
const App = () => {
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Split images into groups of 3
  const imageChunks = chunkArray(data, 3);
  console.log(imageChunks);

  const handleClickEvent = (event) => {
    const imgSrc = event.target.src;
    alert(`Image clicked: ${imgSrc}`);
  };

  return (
    <Container as={Row}>
      {imageChunks.map((chunk, rowIndex) => (
        <Row key={rowIndex} className="h-100">
          {chunk.map((image, colIndex) => (
            <Col xs={4} key={colIndex} className="g-2">
              <img
                onClick={(e) => handleClickEvent(e)}
                id={"image" + rowIndex + colIndex || " "}
                src={image["image-url"]}
                alt={`image-${rowIndex}-${colIndex}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};
export default App;
