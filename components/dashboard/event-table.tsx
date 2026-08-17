import React from 'react'
import { Container } from '../shared/Container'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TableData } from '@/lib/table-data'

export default function EventTable() {
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
                        {TableData.map((data, id) => (
                            <TableRow key={id}>
                                <TableCell>{data.event}</TableCell>
                                <TableCell>{data.location}</TableCell>
                                <TableCell>{data.date}</TableCell>
                                <TableCell>{data.time}</TableCell>
                                <TableCell>{data.booked_spot}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
    </section>
  )
}
