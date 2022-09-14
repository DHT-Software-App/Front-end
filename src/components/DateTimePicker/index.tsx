import React from 'react'

import "./index.css"
import Picker from 'react-datetime-picker'

type DateTimePicker = {
  label: string,
  required?: boolean,
  disableClock?: boolean;
  value: Date,
  maxDate?: Date,
  minDate?: Date,
  onChange: (date: Date) => void
}

function DateTimePicker({
  label,
  required = false,
  disableClock = false,
  onChange,
  value,
  maxDate,
  minDate
}: DateTimePicker) {

  return (
    <div className="flex flex-col">
      <label
        className="text-base font-semibold text-slate-700"
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <Picker
        onChange={onChange}
        value={value}
        calendarClassName="dateTimePicker"
        maxDate={maxDate}
        minDate={minDate}
      />


    </div>


  )
}

export default DateTimePicker