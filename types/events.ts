export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  type: string;
  time: string;
  overview: string[];
  venue: string;
  mode: string;
  audience: string;
  agenda: AgendaItem[];
  about: Organizer[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type AgendaItem = {
  time: string;
  title: string;
};
export type Organizer = {
  name: string;
  description: string;
};

