import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import ErrorTypeChart from "./charts/ErrorTypeChart";


import { useState } from "react";
import DateSelector from "./DateSelector";
import DropDown from "./dropdown/DropDown";

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dateRange, setDateRange] = useState({
    start: "Wed Jan 29 2025 00:00:00 GMT+0530 (India Standard Time) ",
    end: "Wed Jan 29 2025 00:00:00 GMT+0530 (India Standard Time) ",
  });
  console.log(dateRange.start, dateRange.end)
  
  const handleDateRangeChange = (range) => {
    setDateRange(range);

  };
  
  //   const location = useLocation();


  // useEffect(() => {
  //   const handleNavigation = () => {
  //     // Remove auth token whenever the user changes the URL
  //       localStorage.removeItem("authToken");
  //   };

  //   // Run on mount (if user navigates manually to /dashboard)
  //   handleNavigation();

  //   return () => {
  //     handleNavigation(); // Runs when component unmounts (leaving dashboard)
  //   };
  // }, [location.pathname]);

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col md={1} className="bg-info-subtle p-0">
          <Button variant="primary" onClick={handleShow}>
            Launch
          </Button>
        </Col>
        <Offcanvas show={show} onHide={handleClose} scroll="true">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
        <Col className="bg-warning-subtle">
          <Row>
            <Row className="d-flex justify-content-end">
              <DropDown></DropDown>
              <DateSelector onDateRangeChange={handleDateRangeChange} />
            </Row>
            <Row>
              <Col>
                <ErrorTypeChart startDate={dateRange.start} endDate={dateRange.end} />
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
      <Row className="d-flex bg-body-tertiary h-25">test</Row>
    </Container>
  );
};

export default Dashboard;
