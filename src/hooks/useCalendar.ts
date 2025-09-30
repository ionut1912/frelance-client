import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarData, CalendarType, CalendarEvent } from "../models/Ui";
import calendarJson from "../components/calendar/calendar.json";

const parseCalendarData = (data: typeof calendarJson): CalendarData[] => {
  return data.map((entry) => ({
    date: new Date(entry.date),
    events: entry.events.map(
      (event): CalendarEvent => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
      }),
    ),
  }));
};

export const useCalendar = (): CalendarType => {
  return useSuspenseQuery<CalendarData[], Error>({
    queryKey: ["calendar"],
    queryFn: () => parseCalendarData(calendarJson),
  });
};
