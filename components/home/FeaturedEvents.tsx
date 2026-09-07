import React from 'react'
import { Container } from '../shared/Container'
import { FEATURED_EVENTS } from '@/lib/constants'
import Image from 'next/image'
import { CalendarIcon, LocationIcon, TimeIcon } from '../icons'
import Link from 'next/link'

const FeaturedEvents = () => {
  return (
    <section className="my-20">
        <Container>
            <div className="text-accent mx-auto">
                <h3 className="text-lg md:text-2xl font-bold mb-5">
                    Featured Events
                </h3>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-10 items-center">
                    {FEATURED_EVENTS.map((event, id) => (
                        <Link href={`/events/${event.id}`} key={id} className="h-full gap-y-2">
                            <div className="relative h-75 w-full overflow-hidden rounded-lg">
                                <Image src={event.imageUrl} alt={event.title} width={400} height={400} className="object-cover"/>
                            </div>
                            <div className="flex flex-col justify-center gap-y-2">
                                <small className="font-mono text-gray-500 font-light text-xs inline-flex items-center gap-x-2"><LocationIcon /> {event.location}</small>
                                <h2 className="text-sm md:text-xl">{event.title}</h2>
                                <small className="font-mono text-xs text-gray-500 font-light inline-flex items-center gap-x-2"><CalendarIcon />{event.date} | <TimeIcon />{event.time}</small>
                            </div>
                        </Link>
                    ) )}
                </div>
            </div>
        </Container>
    </section>
  )
}

export default FeaturedEvents