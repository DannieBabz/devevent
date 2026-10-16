import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Event } from "@/types/events";
import { formatDate } from "@/lib/format-date";

interface EventTableProps {
  events: Event[];
}

export default function EventTable({ events }: EventTableProps) {
  return (
    <section className="my-8">
      <div className="overflow-hidden rounded-2xl">
        <Table>
          <TableHeader className="bg-[#182830]">
            <TableRow className="text-accent">
              <TableHead className="text-accent">Events</TableHead>
              <TableHead className="text-accent">Location</TableHead>
              <TableHead className="text-accent">Date</TableHead>
              <TableHead className="text-accent">Time</TableHead>
              <TableHead className="text-accent">Booked Spot</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#0D161A] w-full">
            {events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>
                    <Link
                      href={`/events/${event._id}`}
                      className="flex items-center gap-x-3 hover:underline"
                    >
                      <Image
                        src={event.imageUrl}
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                      {event.title}
                    </Link>
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.bookingCount ?? 0}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-gray-400"
                >
                  No events found. Create an event to see it listed here.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
