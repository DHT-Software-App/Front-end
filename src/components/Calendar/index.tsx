import React, { useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer, Event } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

// dummy data
const events: Event[] = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2022, 9, 0),
    end: new Date(2022, 9, 0)
  },
  {
    title: 'Vacation',
    allDay: true,
    start: new Date(2022, 9, 0),
    end: new Date(2022, 9, 0)
  },
  {
    title: 'Conference',
    allDay: true,
    start: new Date(2022, 9, 2),
    end: new Date(2022, 9, 0)
  }
]

export function Calendar() {
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const [allEvents, setAllEvents] = useState<Event[]>(events);

  // handler
  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  }
  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={events}
        endAccessor="end"
        className='flex-1 m-14' />
    </div>
  )
}
