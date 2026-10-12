export type EventFieldKind =
  | "text"
  | "date"
  | "time"
  | "select"
  | "file"
  | "textarea"
  | "agenda";

export type EventFormFieldName =
  | "title"
  | "date"
  | "time"
  | "venue"
  | "image"
  | "location"
  | "type"
  | "mode"
  | "audience"
  | "tags"
  | "description"
  | "overview"
  | "agenda"
  | "organizerName"
  | "about";

export type AgendaItem = {
  time: string;
  title: string;
};

export type Organizer = {
  name: string;
  description: string;
};

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  imageUrl: string;
  type: "In-Person" | "Hybrid" | "Online";
  mode: string;
  audience: string;
  overview: string[];
  agenda: (AgendaItem | string)[];
  about: (Organizer | string)[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFormState {
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  type: string;
  mode: string;
  audience: string;
  image: File | null;
  tags: string;
  description: string;
  overview: string;
  agenda: AgendaItem[];
  organizerName: string;
  about: string;
}