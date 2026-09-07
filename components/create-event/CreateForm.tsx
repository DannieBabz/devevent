"use client"
import { Container } from '@/components/shared/Container'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group'
import React from 'react'
import { CalendarIcon, LocationIcon, TimeIcon } from '@/components/icons'
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type EventFieldKind = "text" | "date" | "time" | "select" | "file" | "textarea";

interface EventDetailProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  options?: string[];
  kind: EventFieldKind;
}

const eventDetails: EventDetailProps[] = [
  { title: "Event Title", description: "Enter event title", kind: "text" },
  { title: "Event Date", description: "Select event date", icon: CalendarIcon, kind: "date" },
  { title: "Event Time", description: "Select start time", icon: TimeIcon, kind: "time" },
  { title: "Event Venue", description: "Enter venue or online link", icon: LocationIcon, kind: "text" },
  {
    title: "Event Type",
    description: "Select event type",
    options: ["Workshop", "Seminar", "Conference", "Tech Event", "Business Event", "Social Event", "Other"],
    kind: "select",
  },
  { title: "Event Image / Banner", description: "Upload event image or banner", kind: "file" },
  { title: "Tags", description: "Add relevant tags", kind: "text" },
  { title: "Event Description", description: "Briefly describe the event", kind: "textarea" },
];

const CreateEvent = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <section className="my-10 text-accent">
      <Container>
        <div className="text-2xl font-bold mb-5">
          <h2 className="text-center">Create an Event</h2>
        </div>
        <FieldGroup className="bg-[#0D161A] rounded-xl p-4 mt-5 max-w-full lg:w-1/2 h-fit mx-auto">
          <Field>
            {eventDetails.map((detail) => (
              <div key={detail.title} className="flex flex-col gap-y-2">
                <FieldLabel className="text-lg ">{detail.title}</FieldLabel>

                {detail.kind === "date" && (
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          data-empty={!date}
                          className="justify-start text-left font-normal bg-[#182830] data-[empty=true]:text-muted-foreground"
                        />
                      }
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>{detail.description}</span>}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} />
                    </PopoverContent>
                  </Popover>
                )}

                {detail.kind === "time" && (
                  <InputGroup className="bg-[#182830]">
                    <InputGroupInput type="time" className="py-5 text-lg" />
                    <InputGroupAddon>
                      {detail.icon ? <detail.icon /> : null}
                    </InputGroupAddon>
                  </InputGroup>
                )}

                {detail.kind === "select" && (
                  <Select>
                    <SelectTrigger className="w-full bg-[#182830] py-5 text-lg">
                      <SelectValue placeholder={detail.description} />
                    </SelectTrigger>
                    <SelectContent>
                      {detail.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {detail.kind === "file" && (
                  <InputGroup className="bg-[#182830]">
                    <InputGroupInput type="file" accept="image/*" className="py-5 text-white text-lg" />
                  </InputGroup>
                )}

                {detail.kind === "text" && (
                  <InputGroup className="bg-[#182830]">
                    <InputGroupInput placeholder={detail.description} className="py-5 text-lg" />
                    <InputGroupAddon>
                      {detail.icon ? <detail.icon /> : null}
                    </InputGroupAddon>
                  </InputGroup>
                )}

                {detail.kind === "textarea" && (
                  <InputGroup className="bg-[#182830]">
                    <InputGroupTextarea placeholder={detail.description} className="py-5 text-lg" />
                  </InputGroup>
                )}
              </div>
            ))}
            <Button className="my-4" variant="secondary">Create Event</Button>
          </Field>
        </FieldGroup>
      </Container>
    </section>
  )
}

export default CreateEvent