import { useMemo } from 'react'
import { Calendar } from "types/Calendar"
import FullCalendar, { EventSourceInput, EventInput, EventApi, EventClickArg, DateSelectArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin
import interactionPlugin from '@fullcalendar/interaction'
import { format } from 'date-fns'


type CalendarProps = {
  values: Calendar[];
  onEdit: (calendar: Calendar) => void;
  onSelection?: (calendar: Calendar) => void;
}

export function CalendarTable({ values, onEdit, onSelection }: CalendarProps) {
  const displayInputs = useMemo((): EventSourceInput => {
    if (values) {
      return values.map((value): EventInput => {
        return {
          id: `${value.id}`,
          title: `${value.employee?.firstname} ${value.employee?.lastname}`,
          start: value.start_date?.toISOString(),
          end: value.end_date?.toISOString(),
        }
      })
    }

    return []
  }, [values]);


  const handleDateClick = (arg: EventClickArg) => {
    const event: EventApi = arg.event;
    const calendar: Calendar = values.find((value: Calendar) => value.id == +event.id)!;
    onEdit(calendar)
  }

  const handleSelection = ({ start, end }: DateSelectArg) => {
    const calendar: Calendar = {
      address: '',
      contacts: [],
      end_date: end,
      start_date: start,
      notes: ''
    }

    onSelection?.(calendar)
  }

  return <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    selectable={true}
    eventClick={handleDateClick}
    select={handleSelection}
    events={displayInputs}
    viewClassNames="bg-white flex-1"
    dayHeaderClassNames="bg-zinc-100 text-zinc-600 text-base uppercase py-2"
    eventClassNames='mx-2 my-1 rounded-md py-1 px-2'
    eventContent={EventContent}

  />
}

const EventContent = (eventContent?: any) => {
  const event: EventApi = eventContent.event;

  return <div className='flex items-center justify-between text-base'>
    <span className='font-normal'>{format(event.end!, 'hh:mm a')}</span>
    <span className='font-semibold'>{event.title}</span>
  </div>
}
