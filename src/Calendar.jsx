import { useState, useMemo, useCallback } from "react";
import dayjs from "dayjs";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const Calendar = ({ date }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(date));
  const currentMonth = selectedDate.toDate().getMonth();
  const currentDay = selectedDate.toDate().getDate();

  const isDateValid = useMemo(() => dayjs(date).isValid(), [date]);

  const getFirstDayOfMonth = useMemo(
    () => selectedDate.startOf("month"),
    [selectedDate]
  );

  const getStartDateOfWeek = useMemo(
    () => dayjs(getFirstDayOfMonth).startOf("week"),
    [getFirstDayOfMonth]
  );

  const getFirstDayOfEachWeek = useCallback((day) => {
    const startOfWeek = [day];
    for (let i = 1; i < 6; i++) {
      const date = day.add(i, "week");
      startOfWeek.push(date);
    }
    return startOfWeek;
  }, []);

  const createMonthCalendar = useCallback((day) => {
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      const date = day.add(i, "day").toDate();
      weekdays.push(date);
    }
    return weekdays;
  }, []);

  const getWeeksOfTheMonth = useMemo(() => {
    const firstDayOfEachWeek = getFirstDayOfEachWeek(getStartDateOfWeek);
    return firstDayOfEachWeek.map((date) => createMonthCalendar(date));
  }, [getFirstDayOfEachWeek, getStartDateOfWeek, createMonthCalendar]);

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className="flex flex-col w-72 bg-gray-800 shadow-2xl rounded-xl p-3">
        {isDateValid ? (
          <>
            <div className="flex items-center flex-row justify-center pb-4 gap-x-2">
              <h2
                data-testid="calendar-label"
                className="font-semibold text-gray-50"
              >
                {selectedDate.format("MMMM YYYY")}
              </h2>
            </div>
            <div
              data-testid="weekdays"
              className="flex flex-row items-center justify-between pb-3"
            >
              {WEEKDAYS.map((name) => (
                <div key={name} className="text-gray-50 first:pl-1 last:pr-2">
                  {name}
                </div>
              ))}
            </div>
            {getWeeksOfTheMonth.map((week, index) => (
              <div
                data-testid="week-row-cell"
                className="flex flex-row justify-between py-2 border-b-[1px] border-gray-700 last:border-0"
                key={`week-${index}`}
              >
                {week.map((day, index) => (
                  <div
                    data-testid={`day-item-${index}`}
                    key={day}
                    className={`flex items-center justify-center min-h-[30px] min-w-[30px] hover:bg-gray-600 rounded-md  ${
                      currentMonth !== day.getMonth()
                        ? "text-gray-700"
                        : "text-gray-50"
                    } ${
                      currentDay !== day.getDate()
                        ? "bg-transparent"
                        : "bg-gray-600 font-bold"
                    }`}
                  >
                    {day.getDate()}
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          <div
            data-testid="invalid"
            className="flex flex-col text-gray-50  p-4 "
          >
            <h2 className="text-center font-bold">
              Oops something went wrong Calendar unavaliable.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
