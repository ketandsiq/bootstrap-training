// import * as React from "react";
import ProcessedData from "../../ProcessedData";
import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
} from "@progress/kendo-react-charts";

const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const ErrorLineChart = () => {
  const dateRange = ProcessedData();
  console.log(dateRange);
  

  
  return (

  <Chart className="m-5 ">
    <ChartTitle text="Units sold" />
    <ChartLegend position="right" orientation="vertical" />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem
        title={{ text: "Months" }}
        categories={categories}
      />
    </ChartCategoryAxis>
    <ChartSeries>
      <ChartSeriesItem type="line" data={[123, 276, 310, 212, 240, 156, 98]} />
      <ChartSeriesItem type="line" data={[165, 210, 287, 144, 190, 167, 212]} />
      <ChartSeriesItem type="line" data={[56, 140, 195, 46, 123, 78, 95]} />
    </ChartSeries>
  </Chart>

  )
};

export default ErrorLineChart;
