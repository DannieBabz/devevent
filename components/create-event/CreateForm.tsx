"use client";

import { Container } from "@/components/shared/Container";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import React from "react";
import {
  CalendarIcon,
  LocationIcon,
  TimeIcon,
  VenueIcon,
} from "@/components/icons";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AgendaItem,
  EventFieldKind,
  EventFormFieldName,
  EventFormState,
} from "@/types/events";
import { createEventAction } from "@/app/actions/save-event";
import { EventSchema } from "@/schemas/event.schema";

interface EventDetailProps {
  title: string;
  name: EventFormFieldName;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  options?: string[];
  kind: EventFieldKind;
  accept?: string;
  required?: boolean;
}

const initialFormState: EventFormState = {
  title: "",
  date: "",
  time: "",
  venue: "",
  location: "",
  type: "",
  mode: "",
  audience: "",
  image: null,
  tags: "",
  description: "",
  overview: "",
  agenda: [{ time: "", title: "" }],
  organizerName: "",
  about: "",
};

const eventDetails: EventDetailProps[] = [
  {
    title: "Event Title",
    name: "title",
    description: "Enter event title",
    kind: "text",
    required: true,
  },
  {
    title: "Event Date",
    name: "date",
    description: "Select event date",
    icon: CalendarIcon,
    kind: "date",
    required: true,
  },
  {
    title: "Event Time",
    name: "time",
    description: "Select start time",
    icon: TimeIcon,
    kind: "time",
    required: true,
  },
  {
    title: "Event Venue",
    name: "venue",
    description: "Enter venue or online link",
    icon: VenueIcon,
    kind: "text",
    required: true,
  },
  {
    title: "Event Location",
    name: "location",
    description: "Enter city or Country",
    icon: LocationIcon,
    kind: "text",
    required: true,
  },
  {
    title: "Event Type",
    name: "type",
    description: "Select event type",
    options: ["In-Person", "Hybrid", "Online"],
    kind: "select",
    required: true,
  },
  {
    title: "Event Mode",
    name: "mode",
    description: "Enter the event mode or delivery details",
    kind: "text",
    required: true,
  },
  {
    title: "Audience",
    name: "audience",
    description: "Select the types of people invited",
    kind: "text",
    required: true,
  },
  {
    title: "Event Overview",
    name: "overview",
    description: "Add a few overview points separated by new lines",
    kind: "textarea",
    required: true,
  },
  {
    title: "Agenda",
    name: "agenda",
    description: "Add agenda items with a time and a title",
    kind: "agenda",
  },
  {
    title: "Event Image / Banner",
    name: "image",
    description: "Upload event image or banner",
    kind: "file",
    accept: "image/*",
    required: true,
  },
  { title: "Tags", name: "tags", description: "Add relevant tags", kind: "text" },
  {
    title: "Event Description",
    name: "description",
    description: "Briefly describe the event",
    kind: "textarea",
    required: true,
  },
  {
    title: "Organizer Name",
    name: "organizerName",
    description: "Enter the organizer or organization name",
    kind: "text",
    required: true,
  },
  {
    title: "About Organizer",
    name: "about",
    description: "Briefly describe your organization",
    kind: "textarea",
    required: true,
  },
];

const CreateEvent = () => {
  const [formData, setFormData] = React.useState<EventFormState>(initialFormState);
  const [date, setDate] = React.useState<Date>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionMessage, setSubmissionMessage] = React.useState("");

  const updateField = (name: EventFormFieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getFieldValue = (name: EventFormFieldName): string => {
    const value = formData[name];
    return typeof value === "string" ? value : "";
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const updateAgendaItem = (
    index: number,
    field: keyof AgendaItem,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addAgendaItem = () => {
    setFormData((prev) => ({
      ...prev,
      agenda: [...prev.agenda, { time: "", title: "" }],
    }));
  };

  const removeAgendaItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const validatedForm = EventSchema.safeParse(formData);
    if (!validatedForm.success) {
      setSubmissionMessage(
        validatedForm.error.issues
          .map((issue) => issue.message)
          .join(". "),
      );
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage("");

    try {
      const payload = new FormData();
      const values = validatedForm.data;

      for (const field of [
        "title",
        "description",
        "date",
        "time",
        "venue",
        "location",
        "type",
        "mode",
        "audience",
        "overview",
        "organizerName",
        "about",
        "tags",
      ] as const) {
        payload.append(field, values[field]);
      }
      payload.append("agenda", JSON.stringify(values.agenda));
      payload.append("image", values.image);

      const result = await createEventAction(payload);
      if (!result.success) {
        setSubmissionMessage(result.error || "Failed to create the event");
        return;
      }

      setFormData(initialFormState);
      setDate(undefined);
      setSubmissionMessage("Event created successfully.");
    } catch (error) {
      console.error("Event creation failed:", error);
      setSubmissionMessage(
        error instanceof Error ? error.message : "Failed to create the event",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="my-10 text-accent">
      <Container>
        <div className="text-2xl font-bold mb-5">
          <h2 className="text-center">Create an Event</h2>
        </div>

        <form onSubmit={handleFormSubmit}>
          {submissionMessage && (
            <p className="text-center" role="status" aria-live="polite">
              {submissionMessage}
            </p>
          )}
          <FieldGroup className="bg-[#0D161A] rounded-xl p-4 mt-5 max-w-full lg:w-1/2 h-fit mx-auto">
            <Field>
              {eventDetails.map((detail) => (
                <div key={detail.name} className="flex flex-col gap-y-2">
                  <FieldLabel className="text-lg">{detail.title}</FieldLabel>

                  {detail.kind === "date" && (
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            type="button"
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            if (selectedDate) {
                              updateField("date", format(selectedDate, "yyyy-MM-dd"));
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}

                  {detail.kind === "time" && (
                    <InputGroup className="bg-[#182830]">
                      <InputGroupInput
                        name={detail.name}
                        type="time"
                        value={formData.time}
                        onChange={(event) => updateField("time", event.target.value)}
                        className="py-5 text-lg"
                      />
                      <InputGroupAddon>
                        {detail.icon ? <detail.icon /> : null}
                      </InputGroupAddon>
                    </InputGroup>
                  )}

                  {detail.kind === "select" && (
                    <Select
                      value={formData.type}
                      onValueChange={(value) => updateField("type", value ?? "")}
                    >
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
                      <InputGroupInput
                        type="file"
                        accept={detail.accept}
                        onChange={(event) => handleFileChange(event.target.files?.[0] || null)}
                        className="py-5 text-white text-lg"
                      />
                    </InputGroup>
                  )}

                  {detail.kind === "agenda" && (
                    <div className="flex flex-col gap-y-3">
                      {formData.agenda.map((item, index) => (
                        <div key={index} className="flex items-center gap-x-2">
                          <InputGroup className="bg-[#182830] w-32 shrink-0">
                            <InputGroupInput
                              type="time"
                              value={item.time}
                              onChange={(event) =>
                                updateAgendaItem(index, "time", event.target.value)
                              }
                              className="py-5 text-lg"
                            />
                          </InputGroup>
                          <InputGroup className="bg-[#182830] flex-1">
                            <InputGroupInput
                              value={item.title}
                              placeholder="Agenda item (e.g. Registration)"
                              onChange={(event) =>
                                updateAgendaItem(index, "title", event.target.value)
                              }
                              className="py-5 text-lg"
                            />
                          </InputGroup>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAgendaItem(index)}
                            disabled={formData.agenda.length === 1}
                            aria-label="Remove agenda item"
                            className="shrink-0 text-muted-foreground hover:text-accent"
                          >
                            &times;
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addAgendaItem}
                        className="self-start bg-[#182830]"
                      >
                        + Add agenda item
                      </Button>
                    </div>
                  )}

                  {detail.kind === "text" && (
                    <InputGroup className="bg-[#182830]">
                      <InputGroupInput
                        name={detail.name}
                        value={getFieldValue(detail.name)}
                        placeholder={detail.description}
                        required={detail.required}
                        onChange={(event) => updateField(detail.name, event.target.value)}
                        className="py-5 text-lg"
                      />
                      <InputGroupAddon>
                        {detail.icon ? <detail.icon /> : null}
                      </InputGroupAddon>
                    </InputGroup>
                  )}

                  {detail.kind === "textarea" && (
                    <InputGroup className="bg-[#182830]">
                      <InputGroupTextarea
                        name={detail.name}
                        value={getFieldValue(detail.name)}
                        placeholder={detail.description}
                        required={detail.required}
                        onChange={(event) => updateField(detail.name, event.target.value)}
                        className="py-5 text-lg"
                      />
                    </InputGroup>
                  )}
                </div>
              ))}

              <Button className="my-4" variant="secondary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Container>
    </section>
  );
};

export default CreateEvent;