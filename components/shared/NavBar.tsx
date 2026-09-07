import React from 'react'
import { Container } from './Container'
import Image from 'next/image'
import Link from 'next/link'
import { NAVBAR_ITEMS } from '@/lib/constants'

const NavBar = () => {
  return (
    <nav className="bg-transparent backdrop-blur-md border-b border-neutral-800">
        <Container >
            <div className="flex items-center justify-between py-4 text-accent">
                <div className="flex items-center space-x-2">
                    <Image src="/devEventLogo.png" alt="Logo" width={40} height={40}  className="max-sm:h-5 max-sm:w-5"/>
                    <h1 className="hidden md:block md:text-xl font-bold">DevEvent</h1>
                </div>
                <div className="flex items-center space-x-4">
                    {NAVBAR_ITEMS.map((item, i) => (
                        <Link key={i} href={item.href} className="py-2 text-sm font-medium text-accent hover:text-[#138777]">
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </Container>
    </nav>
  )
}

export default NavBar