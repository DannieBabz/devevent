import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/button'
import EventTable from '@/components/dashboard/event-table'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <section className="my-10 text-accent">
        <Container>
            <div>
                <div className="flex items-center justify-between">
                    <h2>Event Management</h2>
                    <Button variant="secondary"><Link href="/create-event">Add Event</Link></Button>

                </div>
                <EventTable />
                <div className="flex flex-row justify-between">
                    <Button>Previous</Button>
                    <small>1 of 1</small>
                    <Button>Next</Button>
                </div>
            </div>
        </Container>
    </section>
  )
}
