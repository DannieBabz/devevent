import React from 'react'
import { Container } from '../shared/Container'
import { Button } from '../ui/button'

const HeroSection = () => {
  return (
    <section className="my-15">
        <Container className="flex flex-col items-center  justify-start min-h-full md:justify-center  lg:min-h-screen text-center text-accent">
            <div className="max-w-xs lg:max-w-2xl">
                <h1 className="text-2xl text-center lg:text-6xl font-bold mb-4">The Hub for Every Dev Event You Can't Miss</h1>
                <p className="text-sm md:text-lg mb-8">Hackathons, Meetups, and Conferences, All in One Place.</p>
                <Button variant="outline" className="px-6 py-5 rounded-full hover:bg-accent-dark transition bg-[#0D161A] border-2 border-foreground hover:bg-[#59DECA] hover:text-primary">Explore Events</Button>
            </div>
        </Container>
    </section>
  )
}

export default HeroSection