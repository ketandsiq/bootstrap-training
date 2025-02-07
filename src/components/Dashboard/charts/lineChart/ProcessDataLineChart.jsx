import { useSelector, useDispatch } from "react-redux";
import DateRangeLineChart from "./dateRangeLineChart";
import errorData from "../../../../errors4.json";
import { setProcessedData } from "../../../../store/reducer/lineChartSlice";

const ProcessDataLineChart = () => {
  const dispatch = useDispatch();

  // 1. Build the full timeline using the overall start/end dates from Redux.
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
  // For example, fullTimeline:
  // ["2025-02-01", "2025-02-02", "2025-02-03", "2025-02-04", "2025-02-05"]

  // 2. Get the sparse breakpoint dates from DateRangeLineChart and format them.
  const dateRange = DateRangeLineChart();
  const breakpoints = dateRange[0].dates.map((date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  });
  // For example, breakpoints might be: ["2025-02-01", "2025-02-03", "2025-02-05"]

  // 3. Get the selected error subcategories from Redux.
  const selectedValuesStore = useSelector(
    (state) => state.user.multiSelect.selectedValues
  );
  const selectedSubcategories = selectedValuesStore.map((item) => item.text);

  // 4. For each selected subcategory, build a daily count over the full timeline.
  //    We'll count errors for each day (comparing dates in "YYYY-MM-DD" format).
  const dailyCountsBySubcategory = {};
  selectedSubcategories.forEach((subcat) => {
    dailyCountsBySubcategory[subcat] = {};
    fullTimeline.forEach((dateStr) => {
      const count = errorData.reduce((acc, error) => {
        // Format the error timestamp to "YYYY-MM-DD" using local date methods.
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
  // Now, dailyCountsBySubcategory[subcat] is an object mapping each fullTimeline day to its count.

  // 5. Aggregate counts into the breakpoints.
  //    For i == 0: use count on that day.
  //    For i > 0: sum counts for all days d in fullTimeline such that (d > previous breakpoint AND d <= current breakpoint).
  const result = selectedSubcategories.map((subcat) => {
    const aggregatedCounts = [];
    for (let i = 0; i < breakpoints.length; i++) {
      if (i === 0) {
        // For the first breakpoint, count errors on that day.
        aggregatedCounts.push(
          dailyCountsBySubcategory[subcat][breakpoints[i]] || 0
        );
      } else {
        let sum = 0;
        const prevBP = breakpoints[i - 1];
        const currentBP = breakpoints[i];
        fullTimeline.forEach((day) => {
          // Include days that are after the previous breakpoint and up to & including the current breakpoint.
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

  // 6. Dispatch the processed data to the Redux store.
  dispatch(setProcessedData(result));
  console.log(result);
  return result;
};

export default ProcessDataLineChart;
