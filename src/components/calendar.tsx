"use client";

import { DayPicker } from "react-day-picker";
import { addMonths, subMonths } from "date-fns";
import "react-day-picker/dist/style.css";

export default function Calendar() {
  return (
    <div className="max-w-4xl mx-auto my-6 p-6 flex flex-col md:flex-row rounded-xl shadow-sm bg-green-800">
      <div className="bg-neutral-900 p-6 rounded-xl">
        <DayPicker
          fixedWeeks
          showOutsideDays
          mode="single"
          hidden={{
            before: subMonths(new Date(), 1),
            after: addMonths(new Date(), 12),
          }}
          classNames={{
            /*
            button_next: "",
            button_previous: "",
            caption_after_enter: "",
            caption_after_exit: "",
            caption_before_enter: "",
            caption_before_exit: "",
            caption_label: "",
            chevron: "",
            day: "",
            day_button: "",
            disabled: "",
            dropdown: "",
            dropdown_root: "",
            dropdowns: "",
            focused: "",
            footer: "",
            hidden: "",
            month: "",
            month_caption: "",
            month_grid: "",
            months: "",
            months_dropdown: "",
            nav: "",
            outside: "",
            range_end: "",
            range_middle: "",
            range_start: "",
            root: "",
            selected: "",
            today: "",
            week: "",
            week_number: "",
            week_number_header: "",
            weekday: "",
            weekdays: "",
            weeks: "",
            weeks_after_enter: "",
            weeks_after_exit: "",
            weeks_before_enter: "",
            weeks_before_exit: "",
            years_dropdown: "",
            */
          }}
        />
      </div>
    </div>
  );
}
