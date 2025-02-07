import { Col, Container, Row } from "react-bootstrap";
import ErrorTypeChart from "./charts/ErrorTypeChart";

// import { useState } from "react";
import DateSelector from "./DateSelector";
import DropDown from "./dropdown/DropDown";
import ErrorCodeDropdown from "./dropdown/multiselect/ErrorCodeDropdown";
import SidebarDashboard from "./sidebar/SideBarDashboard";
import ErrorLineChart from "./charts/lineChart/ErrorLineChart";
import DataGrid from "./datagrid/DataGird";

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

const Dashboard = () => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // console.log(dateRange.start, dateRange.end)

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
      <Row>
        <Col lg="auto" className="p-0">
          <SidebarDashboard />
        </Col>

        <Col >
          <Row className="d-flex justify-content-center">
            <Row
              className="d-flex justify-content-around"
              
            >
              <DropDown />

              <ErrorCodeDropdown />

              <DateSelector />
            </Row>
            <Row>
              <Col>
                <ErrorTypeChart />
              </Col>
              <Col>
                <ErrorLineChart />
              </Col>
            </Row>
            <Row style={{ maxWidth: "90%", justifyContent: "flex-end" }}>
              <DataGrid />
            </Row>
          </Row>
        </Col>
      </Row>
      <Row className="d-flex bg-body-tertiary h-25 ms-5">test</Row>
    </Container>
  );
};

export default Dashboard;
