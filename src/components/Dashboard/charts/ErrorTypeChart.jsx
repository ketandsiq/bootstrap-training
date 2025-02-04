import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
} from "@progress/kendo-react-charts";
import ProcessedData from "../ProcessedData";

const ErrorTypeChart = (date) => {
  // console.log(date);

  const data = ProcessedData(date.startDate, date.endDate);
  return (
    <Chart className="m-5">
      <ChartTitle text="Error Count By Type" />
      <ChartLegend position="top" orientation="horizontal" />
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
  );
};

export default ErrorTypeChart;
