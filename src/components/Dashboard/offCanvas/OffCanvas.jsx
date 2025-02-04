import { useState } from "react";
import { Offcanvas } from "react-bootstrap";

const OffCanvas = (test) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <Offcanvas show={show} onHide={handleClose} scroll="true">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvas;
