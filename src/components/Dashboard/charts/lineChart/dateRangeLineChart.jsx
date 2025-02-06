import { useMemo } from "react";
import { useSelector } from "react-redux";

const DateRangeLineChart = () => {
  const store = useSelector((state) => state.user.dateRange);
  const { start, end } = store;

  const breakpoints = useMemo(() => {
    if (!start || !end) return [];

    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    let step;
    if (diffDays <= 7) step = 1;
    else if (diffDays <= 20) step = 3;
    else if (diffDays <= 30) step = 7;
    else step = 30;

    const points = [];
    let current = new Date(startDate); // Avoid mutation
    // console.log(current);

    while (current <= endDate) {
      points.push(current);
      current = new Date(current); // Clone date before modifying
      current.setDate(current.getDate() + step);
    }

    return [{ step, dates: points }];
  }, [start, end]); // Memoized to run only when start/end changes
//   console.log(breakpoints);

  return breakpoints;
};

export default DateRangeLineChart;
