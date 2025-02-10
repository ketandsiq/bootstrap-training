import { useSelector, useDispatch } from "react-redux";
import DateRangeLineChart from "./dateRangeLineChart";
import errorData from "../../../../errors4.json";
import { setProcessedData } from "../../../../store/reducer/lineChartSlice";

const ProcessDataLineChart = () => {
  const dispatch = useDispatch();

  const dateRangeStore = useSelector((state) => state.user.dateRange);
  const startDate = new Date(dateRangeStore.start);
  const endDate = new Date(dateRangeStore.end);

  const fullTimeline = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    const year = current.getFullYear();
    const month = (current.getMonth() + 1).toString().padStart(2, "0");
    const day = current.getDate().toString().padStart(2, "0");
    fullTimeline.push(`${year}-${month}-${day}`);
    current.setDate(current.getDate() + 1);
  }

  const dateRange = DateRangeLineChart();

  const breakpoints = dateRange.length>0 ? dateRange[0].dates.map((date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  }) : [];

  const selectedValuesStore = useSelector(
    (state) => state.user.multiSelect.selectedValues
  );
  console.log(selectedValuesStore);
  
  const selectedSubcategories = selectedValuesStore.map((item) => item.text);

  const dailyCountsBySubcategory = {};
  selectedSubcategories.forEach((subcat) => {
    dailyCountsBySubcategory[subcat] = {};
    fullTimeline.forEach((dateStr) => {
      const count = errorData.reduce((acc, error) => {
        const errorDate = new Date(error.timestamp);
        const year = errorDate.getFullYear();
        const month = (errorDate.getMonth() + 1).toString().padStart(2, "0");
        const day = errorDate.getDate().toString().padStart(2, "0");
        const formattedErrorDate = `${year}-${month}-${day}`;
        return error.error_subcategory === subcat &&
          formattedErrorDate === dateStr
          ? acc + 1
          : acc;
      }, 0);
      dailyCountsBySubcategory[subcat][dateStr] = count;
    });
  });

  const result = selectedSubcategories.map((subcat) => {
    const aggregatedCounts = [];
    for (let i = 0; i < breakpoints.length; i++) {
      if (i === 0) {
        aggregatedCounts.push(
          dailyCountsBySubcategory[subcat][breakpoints[i]] || 0
        );
      } else {
        let sum = 0;
        const prevBP = breakpoints[i - 1];
        const currentBP = breakpoints[i];
        fullTimeline.forEach((day) => {
          if (day > prevBP && day <= currentBP) {
            sum += dailyCountsBySubcategory[subcat][day] || 0;
          }
        });
        aggregatedCounts.push(sum);
      }
    }
    return {
      error_type: subcat,
      line_data: {
        count_per_date: aggregatedCounts,
        dates: breakpoints,
      },
    };
  });

  dispatch(setProcessedData(result));
  console.log(result);
  return result;
};

export default ProcessDataLineChart;
