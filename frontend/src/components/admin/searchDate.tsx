"use client";

import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchTrack } from "@/types/track";

const SearchDate = ({ tracks, setTracks }: SearchTrack) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [originalTracks, setOriginalTracks] = useState(tracks);

  useEffect(() => {
    setOriginalTracks(tracks);
  }, [tracks]);

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);

    if (!range?.from && !range?.to) {
      setTracks(originalTracks);
      return;
    }

    const from = range?.from ? new Date(range.from).getTime() : 0;
    const to = range?.to
      ? new Date(range.to).setHours(23, 59, 59, 999)
      : new Date().getTime();

    const filtered = originalTracks.filter((track) => {
      const createdAt = new Date(track.createdAt).getTime();
      return createdAt >= from && createdAt <= to;
    });

    setTracks(filtered);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="
            w-fit 
            justify-center text-left font-normal
            text-sm sm:text-base
            px-3 py-2
          "
        >
          <CalendarIcon className="mr-0 sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy/MM/dd")} -{" "}
                  {format(date.to, "yyyy/MM/dd")}
                </>
              ) : (
                format(date.from, "yyyy/MM/dd")
              )
            ) : (
              "Огноогоор шүүх"
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDate;
