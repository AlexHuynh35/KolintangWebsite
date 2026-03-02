"use client";

import { DayPicker /*, getDefaultClassNames*/ } from "react-day-picker";
import { addMonths } from "date-fns";
import "react-day-picker/dist/style.css";

type CalendarProps = {
  onDateSubmit: (date: Date | undefined) => void;
};

export default function Calendar({ onDateSubmit }: CalendarProps) {
  //const defaultClassNames = getDefaultClassNames();

  return (
    <div className="w-fit bg-accent-dark p-3 rounded-xl">
      <DayPicker
        fixedWeeks
        showOutsideDays
        mode="single"
        navLayout="around"
        onSelect={onDateSubmit}
        hidden={{
          before: new Date(),
          after: addMonths(new Date(), 12),
        }}
        disabled={{ before: new Date() }}
        classNames={{
          //button_next: "",
          //button_previous: "",
          //caption_after_enter: "",
          //caption_after_exit: "",
          //caption_before_enter: "",
          //caption_before_exit: "",
          //caption_label: "",
          chevron: `fill-white hover:fill-gray-200`,
          day: `w-5 h-5 rounded-xl hover:text-accent-medium hover:bg-gray-100`,
          //day_button: "",
          //disabled: "",
          //dropdown: "",
          //dropdown_root: "",
          //dropdowns: "",
          //focused: "",
          //footer: "",
          //hidden: "",
          month: `text-white text-sm`,
          //month_caption: "",
          //month_grid: "",
          //months: "",
          //months_dropdown: "",
          //nav: "",
          //outside: "",
          //range_end: "",
          //range_middle: "",
          //range_start: "",
          //root: "",
          selected: "text-accent-medium bg-gray-200 hover:bg-gray-300",
          today: `text-black`,
          //week: "",
          //week_number: "",
          //week_number_header: "",
          //weekday: "",
          //weekdays: "",
          //weeks: "",
          //weeks_after_enter: "",
          //weeks_after_exit: "",
          //weeks_before_enter: "",
          //weeks_before_exit: "",
          //years_dropdown: "",
        }}
      />
    </div>
  );
}
