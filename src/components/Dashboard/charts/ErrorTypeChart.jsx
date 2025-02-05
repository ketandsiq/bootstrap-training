import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartTooltip,
  ChartSeriesItem,
  ChartTitle,
} from "@progress/kendo-react-charts";
import ProcessedData from "../ProcessedData";

const ErrorTypeChart = () => {
  // console.log(date);

  const data = ProcessedData();
  console.log(data)
  return (
    <Chart className="m-5">
      <ChartTooltip />
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
