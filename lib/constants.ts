import { AudienceIcon, CalendarIcon, LocationIcon, TimeIcon, VenueIcon } from '@/components/icons';

export const NAVBAR_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Create Events",
    href: "/create-events",
  },
  {
    label: "Dash",
    href: "/dashboard",
  },
];

export const FEATURED_EVENTS = [
    {
        id: 1,
        title: "GitHub Universe 2024",
        description: "GitHub’s two-day developer event celebrating innovation, collaboration, and the boundless potential of AI-powered development.",
        date: "29th October 2025",
        location: "San Francisco, CA",
        imageUrl: "/item-1.png",
        time: "12:25pm - 2:45pm",
        overview: [
            "GitHub Universe 2025 is back, bringing together developers, innovators, and industry leaders from around the world. This flagship event dives deep into the future of software, open source, and AI-driven development.",
            "Expect hands-on sessions, inspiring keynotes, and networking with the brightest minds shaping the future of tech."
        ],
        details: [
            {
                icon: CalendarIcon,
                label: "Date: 28th October 2025 – 29th October 2025",
            },
            {
                icon: TimeIcon,
                label: "Time: 9:30 AM – 5:00 PM (PDT)",
            },
            {
                icon: LocationIcon,
                label: "Venue: Yerba Buena Center for the Arts, San Francisco, CA",
            },
            {
                icon: VenueIcon,
                label: "Mode: Hybrid (In-person + Online Streaming)",
            },
            {
                icon: AudienceIcon,
                label: "Audience: Developers, DevOps engineers, cloud architects, tech leaders",
            },
        ],
        agenda: [
            "09:30 AM – 10:30 AM | Opening Keynote: The Future of AI & Open Source",
            "10:45 AM – 12:00 PM | Breakout Sessions (Security, DevOps, Cloud, AI)",
            "12:00 PM – 1:00 PM | Lunch & Networking",
            "01:00 PM – 02:15 PM | Panel Discussion: Scaling Open Source Communities",
            "02:30 PM – 04:00 PM | Expert Workshops & Demos",
            "04:15 PM – 05:00 PM | Closing Fireside Chat",
        ],
        about: [
            "GitHub is the world’s leading platform for developers to build, share, and maintain code. From open source to enterprise, GitHub empowers millions of developers and organizations to innovate faster and more securely.",
            "GitHub Universe is its annual developer conference, uniting the global dev community to share knowledge, tools, inspiration that shape the future of software."
        ],
        tags: ["AI", "Frontend", "Backend", "Open Source"]
    },
    {
        id: 2,
        title: "Infobip Shift 2025 Conference",
        description: "Join us for a day of React talks and workshops.",
        date: "13th September 2025",
        location: "Zadar, Croatia",
        imageUrl: "/item-2.png",
        time: "12:25pm - 2:40pm",
        overview: [
            "Infobip Shift 2025 is the premier event for developers and marketers to learn about the latest trends in digital communication and automation.",
            "Discover how to leverage cutting-edge technologies to enhance customer engagement and drive business growth."
        ],
        details: [
            {
                icon: CalendarIcon,
                label: "Date: 13th September 2025",
            },
            {
                icon: TimeIcon,
                label: "Time: 9:00 AM – 5:00 PM (CET)",
            },
            {
                icon: LocationIcon,
                label: "Venue: Zadar, Croatia",
            },
            {
                icon: VenueIcon,
                label: "Mode: In-person",
            },
            {
                icon: AudienceIcon,
                label: "Audience: Developers, marketers, business leaders",
            },
        ],
        agenda: [
            "09:00 AM – 10:00 AM | Registration & Welcome Coffee",
            "10:00 AM – 11:30 AM | Keynote: The Future of Digital Communication",
            "11:30 AM – 12:30 PM | Breakout Sessions (AI, Automation, Customer Engagement)",
            "12:30 PM – 01:30 PM | Lunch & Networking",
            "01:30 PM – 03:00 PM | Panel Discussion: Driving Business Growth with Technology",
        ],
        about: [
            "Infobip is a global leader in omnichannel communication, providing businesses with the tools to connect with their customers across multiple channels.",
            "The Infobip Shift Conference is an annual event that brings together industry experts, developers, and marketers to explore the latest trends and innovations in digital communication."
        ],
        tags: ["Communication", "Marketing", "Technology", "Innovation"]
    },
    {
        id: 3,
        title: "React & Frontend Magic",
        description: "Join us for a day of React talks and workshops.",
        date: "7th February 2024",
        location: "San Francisco, CA",
        imageUrl: "/item-3.png",
        time: "12:25pm - 5:00pm",
        overview: [
            "React & Frontend Magic is a comprehensive workshop designed to help developers master the latest techniques in React development.",
            "Learn how to build scalable and maintainable frontend applications using modern React patterns and best practices."
        ],
        details: [
            {
                icon: CalendarIcon,
                label: "Date: 7th February 2024",
            },
            {
                icon: TimeIcon,
                label: "Time: 12:25 PM – 5:00 PM (PST)",
            },
            {
                icon: LocationIcon,
                label: "Venue: San Francisco, CA",
            },
            {
                icon: VenueIcon,
                label: "Mode: In-person",
            },
            {
                icon: AudienceIcon,
                label: "Audience: Developers",
            },
        ],
        agenda: [
            "12:25 PM – 1:25 PM | Introduction to Modern React",
            "1:25 PM – 2:25 PM | Advanced React Patterns",
            "2:25 PM – 3:25 PM | State Management in React",
            "3:25 PM – 4:25 PM | Performance Optimization",
            "4:25 PM – 5:00 PM | Q&A and Networking"
        ],
        about: [
            "React & Frontend Magic is a comprehensive workshop designed to help developers master the latest techniques in React development.",
            "Learn how to build scalable and maintainable frontend applications using modern React patterns and best practices."
        ],
        tags: ["React", "Frontend", "Development", "Workshop"],
    },
    {
        id: 4,
        title: "DevWorld 2025",
        description: "Join us for a day of React talks and workshops.",
        date: "13th November 2025",
        location: "Zadar, Croatia",
        imageUrl: "/item-4.png",
        time: "10:25pm - 2:00pm",
        overview: [
            "DevWorld 2025 is the ultimate conference for developers, offering a deep dive into the latest technologies, frameworks, and best practices in software development.",
            "Join industry experts and thought leaders for an immersive experience that will elevate your skills and knowledge."
        ],
        details: [
            {
                icon: CalendarIcon,
                label: "Date: 13th November 2025",
            },
            {
                icon: TimeIcon,
                label: "Time: 10:25 PM – 2:00 PM (CET)",
            },
            {
                icon: LocationIcon,
                label: "Venue: Zadar, Croatia",
            },
            {
                icon: VenueIcon,
                label: "Mode: In-person",
            },
            {
                icon: AudienceIcon,
                label: "Audience: Developers, software engineers, tech enthusiasts",
            },
        ],
        agenda: [
            "10:25 PM – 11:25 PM | Registration & Welcome Drinks",
            "11:25 PM – 12:30 AM | Keynote: The Future of Software Development",
            "12:30 AM – 01:30 AM | Breakout Sessions (Cloud, DevOps, Security)",
            "01:30 AM – 02:30 AM | Networking & Refreshments"
        ],
        about: [
            "DevWorld 2025 is the ultimate conference for developers, offering a deep dive into the latest technologies, frameworks, and best practices in software development.",
            "Join industry experts and thought leaders for an immersive experience that will elevate your skills and knowledge."
        ],
        tags: ["Conference", "Software Development", "Technology", "Innovation"],
    },
    {
        id: 5,
        title: "Cloudinary User Summit",
        description: "Join us for a day of React talks and workshops.",
        date: "22nd October 2025",
        location: "The Midway, SF",
        imageUrl: "/item-5.png",
        time: "12:25pm - 2:00pm",
        overview: [
            "The Cloudinary User Summit is a premier event for developers, designers, and marketers who want to learn about the latest innovations in image and video optimization.",
            "Connect with industry experts and peers to share knowledge and best practices."
        ],
        details: [
            {
                icon: CalendarIcon,
                label: "Date: 22nd October 2025",
            },
            {
                icon: TimeIcon,
                label: "Time: 12:25 PM – 2:00 PM (PST)",
            },
            {
                icon: LocationIcon,
                label: "Venue: The Midway, SF",
            },
            {
                icon: VenueIcon,
                label: "Mode: In-person",
            },
            {
                icon: AudienceIcon,
                label: "Audience: Developers, designers, marketers",
            },
        ],
        agenda: [
            "12:25 PM – 1:25 PM | Registration & Welcome Coffee",
            "1:25 PM – 2:25 PM | Keynote: The Future of Image Optimization",
            "2:25 PM – 3:25 PM | Breakout Sessions (Performance, Accessibility, SEO)",
            "3:25 PM – 4:25 PM | Networking & Refreshments"
        ],
        about: [
            "Cloudinary is a leading cloud-based image and video management platform that helps businesses deliver high-quality visual experiences.",
            "The Cloudinary User Summit is an annual event that brings together developers, designers, and marketers to explore the latest trends and innovations in visual media."
        ],
        tags: ["Image Optimization", "Video Management", "Cloud", "Marketing"],
    },
    {
        id: 6,
        title: "Vercel Ship",
        description: "Join us for a day of React talks and workshops.",
        date: "7th February 2025",
        location: "New York City",
        imageUrl: "/item-6.png",
        time: "12:25pm - 2:40pm",
        overview: [
            "Vercel Ship is the ultimate event for developers building modern web applications.",
            "Learn how to leverage Vercel's platform to deploy, optimize, and scale your projects."
        ],
        details: [
            {
                icon: CalendarIcon,
                label: "Date: 7th February 2025",
            },
            {
                icon: TimeIcon,
                label: "Time: 12:25 PM – 2:40 PM (EST)",
            },
            {
                icon: LocationIcon,
                label: "Venue: New York City",
            },
            {
                icon: VenueIcon,
                label: "Mode: In-person",
            },
            {
                icon: AudienceIcon,
                label: "Audience: Developers",
            },
        ],
        agenda: [
            "12:25 PM – 1:25 PM | Registration & Welcome Coffee",
            "1:25 PM – 2:25 PM | Keynote: The Future of Web Development",
            "2:25 PM – 3:25 PM | Breakout Sessions (Performance, Accessibility, SEO)",
            "3:25 PM – 4:25 PM | Networking & Refreshments"
        ],
        about: [
            "Vercel is a leading platform for frontend developers, providing tools to build, deploy, and optimize web applications.",
            "Vercel Ship is an annual event that brings together developers to explore the latest trends and innovations in web development."
        ],
        tags: ["Web Development", "Frontend", "Performance", "Optimization"],
    },
    {
        id: 7,
        title: "Infobip Shift 2025 Conference",
        description: "Join us for a day of React talks and workshops.",
        date: "13th September 2025",
        location: "Zadar, Croatia",
        imageUrl: "/item-7.png",
        time: "12:25pm - 2:00pm",
        overview: [
            "Infobip Shift 2025 is the premier conference for developers and professionals in the telecommunications and messaging industry.",
            "Discover the latest trends, innovations, and best practices in real-time communications."
        ],
        details: [
            {
                icon: CalendarIcon,
                label: "Date: 13th September 2025",
            },
            {
                icon: TimeIcon,
                label: "Time: 12:25 PM – 2:00 PM (CET)",
            },
            {
                icon: LocationIcon,
                label: "Venue: Zadar, Croatia",
            },
            {
                icon: VenueIcon,
                label: "Mode: In-person",
            },
            {
                icon: AudienceIcon,
                label: "Audience: Developers, engineers, product managers",
            },
        ],
        agenda: [
            "12:25 PM – 1:25 PM | Registration & Welcome Coffee",
            "1:25 PM – 2:25 PM | Keynote: The Future of Real-Time Communications",
            "2:25 PM – 3:25 PM | Breakout Sessions (APIs, Integration, Security)",
            "3:25 PM – 4:25 PM | Networking & Refreshments"
        ],
        about: [
            "Infobip is a global leader in omnichannel communication, providing businesses with the tools to connect with their customers across multiple channels.",
            "The Infobip Shift Conference is an annual event that brings together industry experts, developers, and marketers to explore the latest trends and innovations in digital communication."
        ],
        tags: ["Communication", "Messaging", "Telecommunications", "Innovation"],
    },
    {
        id: 8,
        title: "Google Chrome Conference",
        description: "Join us for a day of React talks and workshops.",
        date: "10th December 2025",
        location: "San Francisco, CA",
        imageUrl: "/item-8.png",
        time: "12:25pm - 1:00pm",
        overview: [
            "The Google Chrome Conference is the premier event for developers and designers working with the latest web technologies.",
            "Learn about the newest features and capabilities of Google Chrome and how to leverage them in your projects."
        ],
        details: [
            {
                icon: CalendarIcon,
                label: "Date: 10th December 2025",
            },
            {
                icon: TimeIcon,
                label: "Time: 12:25 PM – 1:00 PM (PST)",
            },
            {
                icon: LocationIcon,
                label: "Venue: San Francisco, CA",
            },
            {
                icon: VenueIcon,
                label: "Mode: In-person",
            },
            {
                icon: AudienceIcon,
                label: "Audience: Developers, designers",
            },
        ],
        agenda: [
            "12:25 PM – 1:25 PM | Registration & Welcome Coffee",
            "1:25 PM – 2:25 PM | Keynote: The Future of Web Browsers",
            "2:25 PM – 3:25 PM | Breakout Sessions (Performance, Accessibility, SEO)",
            "3:25 PM – 4:25 PM | Networking & Refreshments"
        ],
        about: [
            "Google Chrome is the world’s most popular web browser, providing developers with powerful tools and features to create rich web experiences.",
            "The Google Chrome Conference is an annual event that brings together developers and designers to explore the latest trends and innovations in web development."
        ],
        tags: ["Web Development", "Browsers", "Performance", "Innovation"],
    },
    {
        id: 9,
        title: "The DOM Summit",
        description: "Join us for a day of React talks and workshops.",
        date: "7th February 2026",
        location: "Zagreb, Croatia",
        imageUrl: "/item-9.png",
        time: "12:25pm - 5:00pm",
        overview: [
            "The DOM Summit is the premier event for developers and designers working with the latest web technologies.",
            "Learn about the newest features and capabilities of the Document Object Model and how to leverage them in your projects."
        ],
        details: [
            {
                icon: CalendarIcon,
                label: "Date: 7th February 2026",
            },
            {
                icon: TimeIcon,
                label: "Time: 12:25 PM – 5:00 PM (CET)",
            },
            {
                icon: LocationIcon,
                label: "Venue: Zagreb, Croatia",
            },
            {
                icon: VenueIcon,
                label: "Mode: In-person",
            },
            {
                icon: AudienceIcon,
                label: "Audience: Developers, designers",
            },
        ],
        agenda: [
            "12:25 PM – 1:25 PM | Registration & Welcome Coffee",
            "1:25 PM – 2:25 PM | Keynote: The Future of the Document Object Model",
            "2:25 PM – 3:25 PM | Breakout Sessions (Performance, Accessibility, SEO)",
            "3:25 PM – 4:25 PM | Networking & Refreshments"
        ],
        about: [
            "The DOM Summit is the premier event for developers and designers working with the latest web technologies.",
            "Learn about the newest features and capabilities of the Document Object Model and how to leverage them in your projects."
        ],
        tags: ["Web Development", "DOM", "Performance", "Innovation"],
    },
];