/**
 * Luxury Logistics - Premium Dataset
 * Exposes window.LuxuryLogisticsData for application logic.
 */
window.LuxuryLogisticsData = {
  services: [
    {
      id: "home-relocation",
      title: "Residences Relocation",
      tagline: "Ultra-care moving for elite homes",
      shortDesc: "End-to-end luxury packing and relocation for premium residential estates and apartments.",
      fullDesc: "Our residential relocation service is designed for those who value absolute security and seamless transitions. We deploy an elite team of certified packers and organizers, using custom double-walled wooden crates and premium vibration-dampening packing material. From handling rare art pieces and fine porcelain to white-glove setup at your new residence, we ensure everything is placed precisely where it belongs.",
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
      features: ["White-Glove Art & Antique Handling", "Climate-Controlled Wrapping", "Full Interior Unpacking & Organization", "Debris Removal & Recycle Service"],
      priceMultiplier: 1.0,
      image: "assets/images/service_home.jpg"
    },
    {
      id: "office-relocation",
      title: "Corporate Relocation",
      tagline: "Zero-downtime workplace transitions",
      shortDesc: "Strategic packing and swift transportation of IT infrastructure, furniture, and documents.",
      fullDesc: "We understand that business continuity is paramount. Our corporate relocation service coordinates office moves over weekends or overnight to eliminate operational downtime. We utilize specialized anti-static packaging for servers, digital systems, and precise cataloging protocols for sensitive archives. A dedicated logistics manager oversees the plan from start to finish.",
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`,
      features: ["Anti-Static IT Packing & Assembly", "Weekend & Overnight Schedules", "Asset Cataloging & Labeling System", "Secure Disposal & Shredding Options"],
      priceMultiplier: 1.25,
      image: "assets/images/service_office.jpg"
    },
    {
      id: "international-moving",
      title: "Global Relocations",
      tagline: "Seamless cross-border freight & customs",
      shortDesc: "Premium international freight forwarding, customs clearance, and global air/ocean shipping.",
      fullDesc: "Relocating internationally requires meticulous compliance and planning. Our global relocation package handles all customs paperwork, maritime/air freight coordination, and partner logistics abroad. With full real-time marine tracking and comprehensive door-to-door transit protection, your assets cross boundaries seamlessly.",
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9c1.657 0 3 4.03 3 9s-1.343 9-3 9m0-18c-1.657 0-3 4.03-3 9s1.343 9 3 9m-9-9a9 9 0 019-9"/></svg>`,
      features: ["Customs Documentation & Clearances", "High-Security Ocean Containers", "Global Air Freight Network", "End-to-End Intermodal Tracking"],
      priceMultiplier: 2.5,
      image: "assets/images/service_global.webp"
    },
    {
      id: "vehicle-transportation",
      title: "Elite Auto Transport",
      tagline: "Enclosed, secure transport for supercars",
      shortDesc: "State-of-the-art enclosed vehicle carriers for luxury, sports, and antique automobiles.",
      fullDesc: "Protect your automotive investments. We provide specialized vehicle transportation utilizing luxury enclosed hydraulic-ramp transport trucks. This shields your car from dust, road debris, and weather elements during transport. All vehicles are loaded with low-angle ramps to protect carbon fiber ground effects and are monitored 24/7 via internal GPS camera systems.",
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`,
      features: ["Low-Profile Enclosed Carriers", "Soft Nylon Wheel Tie-Downs", "Multi-Million Dollar Cargo Coverage", "Internal Cabin CCTV Telemetry"],
      priceMultiplier: 1.5,
      image: "assets/images/service_auto.webp"
    },
    {
      id: "warehouse-storage",
      title: "Climate-Controlled Storage",
      tagline: "Safe vaults for your valuable possessions",
      shortDesc: "Class-A high-security warehouses with precise climate control and individual vaults.",
      fullDesc: "Our high-security storage facilities are engineered to hold your items indefinitely with complete protection. The vaults are fully dust-controlled, humidity-stabilized at 50% relative humidity, and maintained at 21°C. Equipped with clean-agent fire suppression, biometric access controls, and round-the-clock armed security patrols.",
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
      features: ["Microclimate Control (50% RH, 21°C)", "Biometric Security & CCTV Monitor", "Eco-Friendly Inert Gas Suppression", "Custom Velvet-Lined Crates"],
      priceMultiplier: 0.75,
      image: "assets/images/service_storage.webp"
    },
    {
      id: "packing-services",
      title: "White-Glove Packing",
      tagline: "Master-craft packaging & custom crating",
      shortDesc: "Custom wooden crating, archival tissue wraps, and professional packing services.",
      fullDesc: "Packing is an art. Our certified master packers construct custom timber crates for oversized, heavy, or delicate articles. We utilize archival-grade acid-free paper, premium shock-absorbent bubble layers, and vacuum-sealed vapor barriers to protect materials from humidity, static charge, or impact damage.",
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>`,
      features: ["Custom Engineered Timber Crates", "Archival Acid-Free Protective Wraps", "Shock & Tilt Indicators", "Structured Packing Inventories"],
      priceMultiplier: 0.5,
      image: "assets/images/service_packing.webp"
    },
    {
      id: "commercial-logistics",
      title: "Enterprise Logistics",
      tagline: "Optimized supply chain & distributing",
      shortDesc: "Integrated freight logistics, bulk inventory movement, and contract distribution.",
      fullDesc: "Scale your distribution seamlessly. Our Enterprise Logistics division handles bulk transit, retail replenishment, and specialized cargo contracts. Backed by route optimization software and multi-modal transit networks, we keep your inventory moving without delay.",
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16h2m-6 0h2m0 0h2m0 0h2m-1-4h3l3 3V16h-3"/></svg>`,
      features: ["API Integration with ERP Systems", "Flexible Dedicated Routes", "Bulk Shipping & LTL Options", "Automated Load Verification"],
      priceMultiplier: 1.4,
      image: "assets/images/service_commercial.webp"
    },
    {
      id: "industrial-transportation",
      title: "Heavy Industrial Transport",
      tagline: "Oversized machinery and plant relocations",
      shortDesc: "Heavy-haul multi-axle trailers, cranes, and engineering logistics for factories.",
      fullDesc: "Moving manufacturing equipment requires precision logistics and engineering. We provide hydraulic flatbeds, dropdeck trailers, and heavy cranes to relocate CNC machines, print lines, or entire factory units. Our engineers handle permits, structural assessments, and safety clearances for heavy cargo routes.",
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
      features: ["Multi-Axle Modular Trailers", "Route Survey & Escort Coordination", "Cranes & Heavy Rigging Access", "Structural Feasibility Engineering"],
      priceMultiplier: 2.2,
      image: "assets/images/service_industrial.webp"
    }
  ],

  fleet: [
    {
      id: "v-cargo-van",
      name: "Nexus Cargo Sprinter",
      type: "Cargo Vans",
      capacity: "1.5 Tons",
      volume: "12 m³",
      dimensions: "3.2m x 1.7m x 1.9m",
      engine: "Electric High-Torque AWD",
      speed: "110 km/h",
      baseRate: 45,
      ratePerKm: 1.5,
      image: "assets/images/fleet_van.webp",
      desc: "Perfect for local deliveries, white-glove art relocation, and secure small-scale residential transfers."
    },
    {
      id: "v-mini-truck",
      name: "Aero EV Mini Carrier",
      type: "Mini Trucks",
      capacity: "3.5 Tons",
      volume: "24 m³",
      dimensions: "4.5m x 2.1m x 2.2m",
      engine: "Dual Motor EV",
      speed: "95 km/h",
      baseRate: 75,
      ratePerKm: 2.0,
      image: "assets/images/fleet_mini.webp",
      desc: "Ideal for 1-2 bedroom apartments and inner-city corporate relocations with tight alleyway access."
    },
    {
      id: "v-truck",
      name: "Triton Premium Rigid Carrier",
      type: "Trucks",
      capacity: "8.5 Tons",
      volume: "48 m³",
      dimensions: "7.2m x 2.4m x 2.5m",
      engine: "Clean Diesel Hybrid",
      speed: "90 km/h",
      baseRate: 150,
      ratePerKm: 3.5,
      image: "assets/images/fleet_truck.jpg",
      desc: "Our workhorse for medium corporate relocations and massive estate transitions with full suspension buffering."
    },
    {
      id: "v-container",
      name: "Atlas Enclosed Logistics Liner",
      type: "Container Vehicles",
      capacity: "18.0 Tons",
      volume: "95 m³",
      dimensions: "13.6m x 2.45m x 2.7m",
      engine: "Hydrogen Fuel Cell",
      speed: "85 km/h",
      baseRate: 280,
      ratePerKm: 5.0,
      image: "assets/images/fleet_container.webp",
      desc: "High-security container for inter-state operations, containing dual climate controls and vibration dampers."
    },
    {
      id: "v-heavy",
      name: "Goliath Heavy Multi-Axle Hauler",
      type: "Heavy Transport",
      capacity: "45.0 Tons",
      volume: "Variable",
      dimensions: "16.5m x 3.0m x 3.2m",
      engine: "16-Cylinder Heavy-Duty Biofuel",
      speed: "70 km/h",
      baseRate: 500,
      ratePerKm: 8.5,
      image: "assets/images/fleet_heavy.webp",
      desc: "Configurable multi-axle carrier designed exclusively for heavy industrial machinery, generators, and aerospace assets."
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Alexander Sterling",
      role: "Art Curator",
      company: "Sterling Galleries",
      rating: 5,
      feedback: "The absolute pinnacle of logistics. They relocated a multi-million dollar collection of historical oil paintings with custom climate cases and complete security. The team conducted themselves with flawless elegance.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
      logo: `<span class="text-xs uppercase tracking-widest text-slate-400 font-semibold">Sterling Art</span>`
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "VP of Operations",
      company: "InnovateTech Corp",
      rating: 5,
      feedback: "Moving our headquarters was a terrifying prospect. They handled 150 servers and workstations, complete with anti-static wrapping and strict tracking, over a single Sunday. We were up and running on Monday morning without a single error.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
      logo: `<span class="text-xs uppercase tracking-widest text-slate-400 font-semibold">InnovateTech</span>`
    },
    {
      id: 3,
      name: "Marcus Aurelius Vance",
      role: "Private Homeowner",
      company: "Vance Estate",
      rating: 5,
      feedback: "For a residential move, I expected friction, but they handled the packing and cataloging perfectly. Every crystal glassware, every antique cabinet arrived untouched. Truly a luxury service.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
      logo: `<span class="text-xs uppercase tracking-widest text-slate-400 font-semibold">Vance Real Estate</span>`
    }
  ],

  faqs: [
    {
      question: "How do you ensure the safety of delicate art pieces or antiques?",
      answer: "We employ our 'White-Glove' packing standard for fragile items. This includes custom shock-absorbent wooden crates manufactured on-site by our carpenters, layered with archival acid-free wrapping and climate protection barriers. Furthermore, our vehicles contain air-suspension systems to minimize vibration in transit.",
      category: "Security"
    },
    {
      question: "Can I track my shipment in real-time?",
      answer: "Yes, every vehicle is fitted with high-frequency GPS transponders and telemetry modules. Once your relocation is dispatched, you receive a digital tracking code which provides you real-time coordinates, speed metrics, cabin temperature, and estimated time of arrival.",
      category: "Tracking"
    },
    {
      question: "Do you offer full transit insurance coverage?",
      answer: "Absolutely. We offer complete Comprehensive Value Protection policies. Unlike basic moving companies that pay by the weight, our insurance covers the replacement value of your assets. High-value goods are certified by appraisers before the move.",
      category: "Pricing"
    },
    {
      question: "What is your typical corporate moving process?",
      answer: "We perform a thorough pre-move layout survey using CAD models, code every department and computer unit, pre-pack IT racks with specialized crates, relocate overnight/weekends, and complete assembly and network connectivity at the destination so you have zero downtime.",
      category: "Services"
    },
    {
      question: "Do you handle international customs documentation?",
      answer: "Yes, our global relocations division handles all customs declaration, port authorities clearance, consular stamps, and cross-border transport permits for both ocean containers and air freight.",
      category: "International"
    }
  ],

  blogs: [
    {
      title: "Securing Tech Assets: The Art of Corporate Logistics",
      category: "Corporate",
      date: "June 24, 2026",
      readTime: "6 Min Read",
      excerpt: "An in-depth look at anti-static packaging, secure server arrays transport, and minimal-downtime office relocations.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      title: "White-Glove Packing: Handling Fine Art & Historic Antiques",
      category: "Guide",
      date: "May 12, 2026",
      readTime: "8 Min Read",
      excerpt: "Expert insights into humidity barriers, timber crate load engineering, and archival protection protocols.",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      title: "The Future of Logistics: Fleet Decarbonization and EV Carriers",
      category: "Innovation",
      date: "April 05, 2026",
      readTime: "5 Min Read",
      excerpt: "Exploring our new fleet of hydrogen-fuel heavy haulers and electric cargo sprinters designed for green cities.",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600&h=400"
    }
  ],

  industries: [
    { name: "Residential", icon: "🏠", desc: "Private estates, luxury high-rises, and personal villa relocations with complete discretion." },
    { name: "Corporate", icon: "🏢", desc: "Enterprise headquarters, server arrays, and corporate campuses moved with zero downtime." },
    { name: "Healthcare", icon: "🏥", desc: "High-value laboratory gear, MRI systems, and medical supply chain distributions." },
    { name: "Retail", icon: "🛍️", desc: "Boutique fashion distribution, inventory replenishment, and display logistics." },
    { name: "Manufacturing", icon: "⚙️", desc: "Industrial plant machinery, heavy CNC setups, and raw material transport." },
    { name: "E-commerce", icon: "📦", desc: "Rapid fulfillment logistics, custom integrations, and bulk shipping contracts." },
    { name: "Government", icon: "🏛️", desc: "Secure agency relocations, confidential records transport, and public utilities moves." },
    { name: "Hospitality", icon: "🏨", desc: "Complete resort setups, custom fixtures, and hotel renovations logistics." }
  ],

  jobs: [
    {
      id: "logistics-coordinator",
      title: "Operations Logistics Manager",
      department: "Control Center",
      location: "Metropolis Headquarters",
      type: "Full-Time",
      salary: "$85,000 - $110,000 / Yr",
      description: "Direct real-time dispatch, route planning, customs procedures, and fleet coordinates using our automated dashboard.",
      requirements: ["5+ years in international logistics or fleet dispatching.", "Expertise with GIS, ERP, and route-optimization software.", "Outstanding problem-solving and rapid resolution skills under pressure."]
    },
    {
      id: "white-glove-packer",
      title: "Art & Antique Craters Specialist",
      department: "White-Glove Division",
      location: "Metropolis Hub / On-site",
      type: "Full-Time",
      salary: "$25 - $35 / Hour",
      description: "Measure, design, and assemble custom timber storage vaults and vibration-insulated protective cases for rare items.",
      requirements: ["Experienced carpenter or museum handler background preferred.", "Thorough knowledge of archival wrapping materials and moisture prevention.", "High physical detail orientation."]
    },
    {
      id: "heavy-vehicle-operator",
      title: "Heavy Haul Transport Specialist",
      department: "Fleet Division",
      location: "Interstate Routes",
      type: "Contract",
      salary: "$90,000 - $130,000 / Yr",
      description: "Operate our hydrogen-power flatbed trucks and oversized load carriers for major commercial infrastructure moves.",
      requirements: ["Class-A CDL with double/triple trailers and hazmat endorsements.", "Clean driving record spanning 7+ years.", "Experience coordinating with highway patrol escorts and route surveyors."]
    }
  ],

  // Active simulated shipment statuses for the tracker
  simulatedShipments: {
    "NEXUS-7789": {
      id: "NEXUS-7789",
      sender: "Alexander Sterling",
      recipient: "Guggenheim Museum",
      origin: "New York Hub, NY",
      destination: "Los Angeles Depo, CA",
      status: "In-Transit",
      statusPercent: 65,
      lastUpdated: "Just now",
      currentLocation: "Denver, Colorado Ridge",
      temp: "19.5 °C",
      humidity: "48.2 % RH",
      eta: "July 04, 2026 - 15:30",
      history: [
        { time: "July 02, 10:00", event: "Artworks inspected and sealed in customized vacuum wood crates." },
        { time: "July 02, 12:30", event: "Dispatched from New York Luxury Hub via Climate Container Atlas-04." },
        { time: "July 03, 04:15", event: "Arrived at Chicago Intermodal Sorting. Cargo environment verified stable." },
        { time: "July 03, 08:30", event: "Departed Chicago. Currently routing southwest around weather system." }
      ],
      coordinates: { x: 380, y: 160 } // For internal SVG map rendering
    },
    "AERO-4412": {
      id: "AERO-4412",
      sender: "InnovateTech Corp",
      recipient: "Nexus Silicon Center",
      origin: "Austin Terminal, TX",
      destination: "San Francisco HQ, CA",
      status: "Delivered",
      statusPercent: 100,
      lastUpdated: "4 hours ago",
      currentLocation: "San Francisco HQ, CA",
      temp: "20.8 °C",
      humidity: "50.1 % RH",
      eta: "Completed (July 02 - 14:15)",
      history: [
        { time: "June 30, 09:00", event: "Asset tagging and anti-static wrapping completed." },
        { time: "June 30, 15:00", event: "Dispatched on Aero EV Mini Carriers." },
        { time: "July 01, 11:00", event: "Midway secure garage inspection completed in Phoenix, AZ." },
        { time: "July 02, 14:15", event: "Delivered, assembled, and servers integrated into server racks. Signed off." }
      ],
      coordinates: { x: 200, y: 120 }
    },
    "OCEAN-9901": {
      id: "OCEAN-9901",
      sender: "Vance Yachting Co",
      recipient: "Monte Carlo Harbour",
      origin: "Miami Terminal, FL",
      destination: "Monaco Port, FR",
      status: "Customs Inspection",
      statusPercent: 40,
      lastUpdated: "1 hour ago",
      currentLocation: "Le Havre Customs Terminal, FR",
      temp: "18.1 °C",
      humidity: "58.4 % RH",
      eta: "July 08, 2026 - 09:00",
      history: [
        { time: "June 25, 08:00", event: "Luxury Yachting components secured in custom heavy ocean rig container." },
        { time: "June 26, 14:00", event: "Container loaded onto vessel 'Ocean Crest' at Port of Miami." },
        { time: "July 02, 18:00", event: "Vessel docked at Le Havre. Container unloaded and moved to customs warehouse." }
      ],
      coordinates: { x: 550, y: 95 }
    }
  }
};
