import { Col, Container, Row } from "react-bootstrap";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";

import ProcessedData from "./ProcessedData";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

const Dashboard = () => {
//   const location = useLocation();

// useEffect(() => {
//   const handleNavigation = () => {
//     // Remove auth token whenever the user changes the URL\
//       localStorage.removeItem("authToken");
//   };

//   // Run on mount (if user navigates manually to /dashboard)
//   handleNavigation();

//   return () => {
//     handleNavigation(); // Runs when component unmounts (leaving dashboard)
//   };
// }, [location.pathname]); 

  const data = ProcessedData();
  console.log(data);
  return (
    <Container fluid>
      <Row className="vh-100">
        <Col md={3} className="bg-info-subtle">
          sidebar
        </Col>
        <Col md={9} className="bg-warning-subtle">
          <Row>
            <Col>
              <Chart>
                <ChartSeries>
                  {data.map((item, index) => (
                    <ChartSeriesItem
                      key={index}
                      data={[item]}
                      type="column"
                      field="count"
                      name={item.error_type} 
                      categoryField="error_type"
                    />
                  ))}
                </ChartSeries>
              </Chart>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
