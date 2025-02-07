// import * as React from "react";
import { useSelector } from "react-redux";

import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartTooltip,
} from "@progress/kendo-react-charts";


const ErrorLineChart = () => {
  const dateRange = useSelector(state => state.user.lineChart);
  const lineDataArray = dateRange.processedData.map(item => item.line_data);
  const errorTypeArray = dateRange.processedData.map(item => item.error_type);

  return (
    <Chart className="m-5">
      <ChartTooltip />
      <ChartTitle text="Error By Dates" />
      <ChartLegend position="top" orientation="horizontal" />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          title={{ text: "Dates" }}
          categories={lineDataArray[0]?.dates || []} // Handle possible undefined values
        />
      </ChartCategoryAxis>
      <ChartSeries>
        {
          lineDataArray.map((element, index) => (
            <ChartSeriesItem 
              key={index}
              type="line" 
              data={element.count_per_date} 
              name={errorTypeArray[index]} // Assigning a label to each series
            />
          ))
        }
      </ChartSeries>
    </Chart>
  );
};

export default ErrorLineChart;
