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

    while (current <= endDate) {
      points.push(new Date(current)); // Push a new Date instance
      current = new Date(current); // Clone date before modifying
      current.setDate(current.getDate() + step);
    }

    // Check if the last point is equal to the end date; if not, append endDate
    if (points.length > 0) {
      const lastPoint = points[points.length - 1];
      if (lastPoint.getTime() !== endDate.getTime()) {
        points.push(endDate);
      }
    }

    return [{ step, dates: points }];
  }, [start, end]); // Memoized to run only when start/end changes

  return breakpoints;
};

export default DateRangeLineChart;
