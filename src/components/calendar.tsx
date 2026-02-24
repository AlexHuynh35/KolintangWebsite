"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { addMonths } from "date-fns";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import "react-day-picker/dist/style.css";

export default function Calendar() {
  const [selected, setSelected] = useState<Date | undefined>();
  const [available, setAvailable] = useState<boolean>(false);
  const defaultClassNames = getDefaultClassNames();
  const onSelect = (day: Date | undefined) => {
    setSelected(day)
    day ? setAvailable(true) : setAvailable(false);
  }

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 gap-6 flex flex-col-reverse md:flex-row justify-center items-center rounded-xl shadow-sm bg-white">
      <div className="w-fit bg-green-800 p-6 rounded-xl">
        <DayPicker
          fixedWeeks
          showOutsideDays
          mode="single"
          navLayout="around"
          selected={selected}
          onSelect={onSelect}
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
            day: `${defaultClassNames.day} rounded-xl hover:text-green-700 hover:bg-gray-100`,
            //day_button: "",
            //disabled: "",
            //dropdown: "",
            //dropdown_root: "",
            //dropdowns: "",
            //focused: "",
            //footer: "",
            //hidden: "",
            month: `text-white`,
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
            selected: "text-green-700 bg-gray-200 hover:bg-gray-300",
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
      <div className="flex flex-[1] flex-col justify-center items-center">
        <h1 className="text-xl text-gray-800 mb-3"><strong>Date: </strong> {selected ? formatDate(selected) : "Choose A Date"}</h1>
        <h1 className="flex flex-row justify-center items-center gap-3 text-xl text-gray-800 mb-3">
          <strong>Availability: </strong>
          <Image
            src={available ? "/media/icons/check.svg" : "/media/icons/cross.svg"}
            alt={available ? "Date Available" : "Date Not Available"}
            width={20}
            height={20}
            className="object-cover rounded-full"
          />
        </h1>
        <button
          disabled={!available}
          onClick={() => console.log("Hello")}
          className={`text-xl text-white px-6 py-3 border border-4 ${!available ? "bg-gray-600 border-gray-700" : "bg-green-800 hover:bg-green-700 border-green-900"}`}
        >
          Book Performance
        </button>
      </div>
    </div>
  );
}
