import { Button, Card } from "react-bootstrap";
import Logo from "./Logo";


const CardItem = ({ title, desc }) => { //eslint-disable-line
  return (
    <Card className="text-bg-secondary " style={{ width: "15rem" }}>
      <div>
        <Logo height="100" width="100" />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{desc}</Card.Text>
        <Button variant="primary">Okay</Button>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
