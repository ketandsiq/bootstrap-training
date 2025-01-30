import { Col, Container, Row } from "react-bootstrap";
import {
  Chart,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";

import ProcessedData from "./ProcessedData";


const Dashboard = () => {
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
