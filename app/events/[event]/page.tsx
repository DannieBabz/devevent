import React from 'react'
import { FEATURED_EVENTS } from '@/lib/constants'
// import { useParams } from 'next/navigation'
import { Container } from '@/components/shared/Container';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';



interface EventDetailPageProps {
  params: Promise<{ event: string }>;
}

// interface EventDetailItem {
//   icon: IconKey;
//   label: string;
// }


const EventDetails = async ({ params }: EventDetailPageProps) => {
  const { event } = await params;
  const eventDetails = FEATURED_EVENTS.find((e) => e.id === Number(event));
  if(!eventDetails) {
    return (
      <div className="text-accent">
        <h1>Event not found </h1>
        <p>The event you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <section className="text-accent my-20">
        <Container>
          <div className=" w-3xl mb-10">
            <h1 className="text-xl md:text-5xl font-bold">{eventDetails.title}</h1>
            <p className="text-md">{eventDetails.description}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-y-10 justify-between">
            <div>
              <Image src={eventDetails.imageUrl} alt={eventDetails.title} width={600} height={400}  className="rounded-4xl"/>
            </div>
            <div>
              <div className="flex flex-col gap-y-4 w-full lg:w-sm bg-[#0D161A] py-10 px-8 rounded-xl">
                <h2 className="font-semibold text-2xl">Book Your Spot</h2>
                <Label className="text-lg">Email Address</Label>
                <Input placeholder="Enter your email" className="py-5 text-xl"/>
                <Button variant="secondary" className="text-black py-5 text-lg">Submit</Button>
              </div>
            </div>
          </div>

          <div className="max-w-3xl text-lg">
            <div>
              <h2 className="text-2xl font-bold my-5">Overview</h2>
                {eventDetails.overview.map((item, index) => (
                  <div key={index}>
                    <p>{item}</p><br />
                  </div>
                ))}
            </div>
   

            <div>
              <h2 className="text-2xl font-bold my-5">Event Details</h2>
              {eventDetails.details.map((item, index) => (
                <p key={index} className='flex gap-x-3 items-center'><span><item.icon /></span>{item.label}</p>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold my-5">Agenda</h2>
                {eventDetails.agenda.map((item, index) => (
                  <ul key={index} className="flex px-10">
                    <li className="list-disc gap-y-3">{item}</li>
                  </ul>
                ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold my-5">About the Organizer</h2>
                {eventDetails.about.map((item, index) => (
                  <div key={index}>
                    <p key={index}>{item}</p><br />
                  </div>
                ))}
            </div>
            
            <div className="flex flex-wrap gap-y-3 gap-x-3">
              {eventDetails.tags.map((item, index) => (
                <div key={index} className="bg-[#0D161A] py-2 px-5">{item}</div>
              ))}
            </div>
          </div>

        </Container>
    </section>
  )
}

export default EventDetails