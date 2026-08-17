import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function Page() {
  return (
    <section className="my-10 text-accent">
        <Container>
            <div>
                <div className="flex items-center justify-between">
                    <h2>Event Management</h2>
                    <Button variant="secondary">Add Event</Button>
                </div>
            </div>
        </Container>
    </section>
  )
}
