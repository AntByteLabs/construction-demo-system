import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.service.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.contactInquiry.deleteMany();
  await prisma.media.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.homepageContent.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.settings.deleteMany();

  await prisma.admin.create({
    data: {
      email: "admin@antbytelabs.com",
      password: "admin123",
      name: "Demo Admin",
    },
  });

  await prisma.settings.create({ data: { id: "singleton" } });
  await prisma.homepageContent.create({ data: { id: "singleton" } });

  const testimonials = [
    {
      quote:
        "Fantastic experience. The team was professional, attentive, and completed our project with great care. Our new deck and siding look amazing.",
      name: "Jessica Parker",
      role: "Homeowner",
      sortOrder: 1,
      isFeatured: true,
    },
    {
      quote:
        "Outstanding experience from initial planning to final execution. Their team was professional, attentive, and detail-oriented. Every part of our porch was handled with care.",
      name: "Michael Thompson",
      role: "Homeowner",
      sortOrder: 2,
    },
    {
      quote:
        "Excellent craftsmanship and attention to detail. The team handled our project professionally from start to finish. Our renovation exceeded expectations.",
      name: "Sarah Williams",
      role: "Homeowner",
      sortOrder: 3,
    },
    {
      quote:
        "Extremely happy with the work. Professionally and efficiently repaired our roof, taking all our requests into account. Communication was smooth throughout.",
      name: "David Miller",
      role: "Property owner",
      sortOrder: 4,
    },
    {
      quote:
        "Thrilled with the custom deck. Craftsmanship is exceptional, and they paid attention to every detail. The team was friendly and completed work on time.",
      name: "Emily Johnson",
      role: "Homeowner",
      sortOrder: 5,
    },
    {
      quote:
        "Extremely satisfied with the remodeling. They transformed our space, turning our ideas into reality with great attention to detail. Courteous, responsive, and on schedule.",
      name: "Michael Davis",
      role: "Homeowner",
      sortOrder: 6,
    },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  const faqs = [
    {
      question: "What types of projects do you take on?",
      answer:
        "We specialize in framing, siding, custom decks, porches, and full-scope remodeling. If you're not sure whether we can help, send us the details — we'll give you an honest answer.",
      sortOrder: 1,
    },
    {
      question: "Do you offer free estimates?",
      answer:
        "Yes — free, no-obligation estimates. We visit the site, walk through the scope, and send a written quote within 48 hours.",
      sortOrder: 2,
    },
    {
      question: "How long will my project take?",
      answer:
        "Timelines depend on scope and current schedule. Most residential projects take 2–12 weeks. We give a realistic range after our first visit and keep you updated throughout.",
      sortOrder: 3,
    },
    {
      question: "Can you help with design ideas?",
      answer:
        "Yes. We offer design suggestions and sketches, especially for decks, porches, and larger remodels. Many clients come to us with an idea and leave with a plan.",
      sortOrder: 4,
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Yes. We carry full general liability and workers' comp insurance, and we're licensed in every state we operate in. Documentation available on request.",
      sortOrder: 5,
    },
    {
      question: "How do I get started?",
      answer:
        "Call (913) 297-3000 or use the contact form. We'll schedule a free consultation, visit the site, and walk you through scope and schedule.",
      sortOrder: 6,
    },
  ];
  for (const f of faqs) {
    await prisma.faq.create({ data: f });
  }

  const services = [
    {
      slug: "residential-construction",
      title: "Residential Construction",
      icon: "Home",
      shortDesc: "Custom homes and multi-family developments engineered with precision, built to last generations.",
      content: "From custom family homes to luxury estates, we handle every stage of residential construction with uncompromising attention to detail. Our in-house architects, engineers, and craftsmen work as one team so your vision becomes a home that stands the test of time.",
      imageLabel: "Modern residential project",
      features: JSON.stringify([
        "Custom single-family homes",
        "Multi-family developments",
        "Luxury estates & villas",
        "Smart home integration",
        "Sustainable building practices",
        "Turn-key project delivery",
      ]),
      sortOrder: 1,
    },
    {
      slug: "commercial-construction",
      title: "Commercial Construction",
      icon: "Building2",
      shortDesc: "Office towers, retail spaces, and mixed-use developments delivered on time and on budget.",
      content: "We build the spaces where business happens. Office campuses, retail centers, hospitality projects, and mixed-use developments — delivered with the rigor, transparency, and schedule-discipline that commercial clients demand.",
      imageLabel: "Commercial tower exterior",
      features: JSON.stringify([
        "Office buildings & corporate campuses",
        "Retail & shopping centers",
        "Hospitality & hotels",
        "Mixed-use developments",
        "Tenant build-outs",
        "LEED-certified construction",
      ]),
      sortOrder: 2,
    },
    {
      slug: "industrial-construction",
      title: "Industrial & Infrastructure",
      icon: "Factory",
      shortDesc: "Warehouses, manufacturing plants, and civil infrastructure built to heavy-duty standards.",
      content: "When the project demands scale, precision, and compliance, we deliver. Our industrial division handles everything from distribution centers to manufacturing plants with certified safety protocols and engineering excellence.",
      imageLabel: "Industrial warehouse site",
      features: JSON.stringify([
        "Warehouses & distribution centers",
        "Manufacturing facilities",
        "Civil infrastructure",
        "Utility & energy projects",
        "Heavy structural engineering",
        "OSHA-compliant operations",
      ]),
      sortOrder: 3,
    },
    {
      slug: "interior-design-fitout",
      title: "Interior Design & Fit-out",
      icon: "Sofa",
      shortDesc: "Transform raw spaces into elegant, functional environments with our design-build interior team.",
      content: "Our interior division goes beyond aesthetics. We engineer spaces that perform — combining bespoke design, premium materials, and meticulous project management for residential, hospitality, and corporate interiors.",
      imageLabel: "Luxury interior space",
      features: JSON.stringify([
        "Corporate office fit-outs",
        "Luxury residential interiors",
        "Restaurant & hospitality design",
        "Retail experience spaces",
        "Custom millwork & joinery",
        "Furniture & styling",
      ]),
      sortOrder: 4,
    },
    {
      slug: "renovation-remodeling",
      title: "Renovation & Remodeling",
      icon: "Hammer",
      shortDesc: "Modernize, expand, or restore existing structures without compromise.",
      content: "Whether preserving heritage character or reimagining a space entirely, our renovation team delivers surgical precision. From structural upgrades to cosmetic transformations, we turn existing buildings into the spaces you always wanted.",
      imageLabel: "Renovation before/after",
      features: JSON.stringify([
        "Full-home remodels",
        "Historic building restoration",
        "Commercial refurbishment",
        "Structural modifications",
        "Kitchen & bathroom renovations",
        "Energy-efficiency upgrades",
      ]),
      sortOrder: 5,
    },
    {
      slug: "project-management",
      title: "Project Management & Consulting",
      icon: "ClipboardCheck",
      shortDesc: "End-to-end oversight for complex projects — from feasibility to handover.",
      content: "Bring in our team as your trusted partner from day one. We provide feasibility studies, cost engineering, scheduling, procurement, and full-cycle project management — so you stay in control without drowning in detail.",
      imageLabel: "Architectural planning table",
      features: JSON.stringify([
        "Feasibility & cost studies",
        "Procurement management",
        "Schedule & risk control",
        "Quality assurance programs",
        "Sustainability consulting",
        "Owner's representation",
      ]),
      sortOrder: 6,
    },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  const team = [
    {
      name: "Marcus Chen",
      role: "Founder & CEO",
      bio: "25+ years leading landmark construction projects across three continents. Marcus founded Antbytelabs with a vision of combining old-world craftsmanship with modern engineering discipline.",
      photoLabel: "Marcus Chen portrait",
      email: "marcus@antbytelabs.com",
      linkedin: "https://linkedin.com/in/marcuschen",
      twitter: "https://twitter.com/marcuschen",
      sortOrder: 1,
    },
    {
      name: "Sofia Martinez",
      role: "Chief Operations Officer",
      bio: "Former VP at a Fortune-100 construction firm. Sofia runs our day-to-day operations with an obsession for schedule, safety, and client communication.",
      photoLabel: "Sofia Martinez portrait",
      email: "sofia@antbytelabs.com",
      linkedin: "https://linkedin.com/in/sofiamartinez",
      sortOrder: 2,
    },
    {
      name: "James Okonkwo",
      role: "Principal Architect",
      bio: "Award-winning architect with designs featured in Architectural Digest and Dezeen. Leads our in-house design studio.",
      photoLabel: "James Okonkwo portrait",
      email: "james@antbytelabs.com",
      linkedin: "https://linkedin.com/in/jamesokonkwo",
      twitter: "https://twitter.com/jamesokonkwo",
      sortOrder: 3,
    },
    {
      name: "Priya Raman",
      role: "Director of Engineering",
      bio: "Structural engineer with deep experience in high-rise and industrial projects. Priya ensures every project meets the highest engineering standards.",
      photoLabel: "Priya Raman portrait",
      email: "priya@antbytelabs.com",
      linkedin: "https://linkedin.com/in/priyaraman",
      sortOrder: 4,
    },
    {
      name: "Daniel Brooks",
      role: "Head of Construction",
      bio: "Former site superintendent on some of the largest commercial builds in the region. Daniel runs our field teams and keeps sites running like clockwork.",
      photoLabel: "Daniel Brooks portrait",
      email: "daniel@antbytelabs.com",
      linkedin: "https://linkedin.com/in/danielbrooks",
      sortOrder: 5,
    },
    {
      name: "Aisha Nakamura",
      role: "Sustainability Director",
      bio: "LEED Fellow and sustainability strategist. Aisha leads our green building programs and environmental certifications.",
      photoLabel: "Aisha Nakamura portrait",
      email: "aisha@antbytelabs.com",
      linkedin: "https://linkedin.com/in/aishanakamura",
      twitter: "https://twitter.com/aishanakamura",
      sortOrder: 6,
    },
    {
      name: "Tomás Ribeiro",
      role: "Interior Design Lead",
      bio: "Designer whose work has shaped hotels, restaurants, and corporate HQs on four continents. Leads our interior studio.",
      photoLabel: "Tomás Ribeiro portrait",
      email: "tomas@antbytelabs.com",
      linkedin: "https://linkedin.com/in/tomasribeiro",
      sortOrder: 7,
    },
    {
      name: "Elena Volkov",
      role: "Client Relations Director",
      bio: "Your single point of contact from first call through final handover. Elena makes sure every client feels like our only client.",
      photoLabel: "Elena Volkov portrait",
      email: "elena@antbytelabs.com",
      linkedin: "https://linkedin.com/in/elenavolkov",
      sortOrder: 8,
    },
  ];

  for (const t of team) {
    await prisma.teamMember.create({ data: t });
  }

  const categories = [
    { slug: "industry-insights", name: "Industry Insights" },
    { slug: "sustainability", name: "Sustainability" },
    { slug: "design-innovation", name: "Design & Innovation" },
    { slug: "company-news", name: "Company News" },
    { slug: "project-stories", name: "Project Stories" },
  ];

  const savedCats: Record<string, string> = {};
  for (const c of categories) {
    const cat = await prisma.blogCategory.create({ data: c });
    savedCats[c.slug] = cat.id;
  }

  const projects = [
    {
      slug: "meridian-tower",
      title: "Meridian Tower",
      category: "Commercial",
      location: "Downtown Metro City, CA",
      client: "Meridian Holdings",
      completionDate: new Date("2025-08-15"),
      description: "A 42-story Class-A office tower anchoring the revitalized downtown financial district.",
      content: "Meridian Tower represents the new standard for urban commercial development. Over 38 months, our team delivered 920,000 square feet of Class-A office space, a three-level retail podium, and a rooftop amenity deck — all to LEED Platinum standards. The project integrates advanced seismic engineering, bird-friendly glazing, and a district-scale thermal loop that reduces energy use by 38% compared to baseline.",
      coverLabel: "Meridian Tower at dusk",
      isFeatured: true,
      sortOrder: 1,
      images: [
        { label: "Tower exterior wide shot", caption: "The 42-story tower completed in summer 2025" },
        { label: "Lobby atrium interior", caption: "Triple-height lobby with custom limestone" },
        { label: "Sky lounge rooftop", caption: "Level 41 amenity deck" },
        { label: "Construction progress aerial", caption: "Site at month 22" },
      ],
    },
    {
      slug: "oakwood-residences",
      title: "Oakwood Residences",
      category: "Residential",
      location: "Hillside District, CA",
      client: "Oakwood Living LLC",
      completionDate: new Date("2025-03-20"),
      description: "A luxury 48-unit hillside residential community with panoramic views.",
      content: "Oakwood Residences brought hillside luxury living to the next level. Each of the 48 units was custom-crafted with bespoke finishes, floor-to-ceiling glazing, and private outdoor terraces. The community features a resort-style pool, wellness center, and dedicated EV infrastructure.",
      coverLabel: "Oakwood Residences exterior",
      isFeatured: true,
      sortOrder: 2,
      images: [
        { label: "Community overview", caption: "Hillside community" },
        { label: "Model unit living room", caption: "Penthouse floorplan" },
        { label: "Pool deck", caption: "Resort-style amenities" },
      ],
    },
    {
      slug: "summit-logistics-hub",
      title: "Summit Logistics Hub",
      category: "Industrial",
      location: "Inland Empire, CA",
      client: "Summit Distribution Co.",
      completionDate: new Date("2024-11-10"),
      description: "A 1.2M sq ft state-of-the-art distribution and fulfillment center.",
      content: "Summit Logistics Hub is a next-generation distribution center optimized for automated fulfillment. The facility includes 140 dock doors, mezzanine office space, 48 MW of rooftop solar, and truck staging for 400+ trailers.",
      coverLabel: "Summit Logistics exterior",
      isFeatured: false,
      sortOrder: 3,
      images: [
        { label: "Warehouse exterior", caption: "Completed facility" },
        { label: "Interior racking", caption: "36-ft clear height" },
        { label: "Solar rooftop", caption: "48 MW rooftop array" },
      ],
    },
    {
      slug: "heritage-theatre-restoration",
      title: "Heritage Theatre Restoration",
      category: "Renovation",
      location: "Old Town, CA",
      client: "City of Metro",
      completionDate: new Date("2025-01-25"),
      description: "A meticulous restoration of a 1926 historic performing arts theatre.",
      content: "Our team lovingly restored the Heritage Theatre to its 1926 grandeur while seamlessly integrating modern systems. Hand-painted ceiling frescoes, original gilded plasterwork, and restored velvet drapery sit alongside contemporary acoustic engineering, climate control, and accessibility upgrades.",
      coverLabel: "Restored theatre interior",
      isFeatured: true,
      sortOrder: 4,
      images: [
        { label: "Main auditorium", caption: "1,400-seat main hall" },
        { label: "Restored proscenium", caption: "Original 1926 plasterwork" },
        { label: "Lobby chandelier", caption: "Restored grand foyer" },
      ],
    },
    {
      slug: "verdant-headquarters",
      title: "Verdant Tech Headquarters",
      category: "Commercial",
      location: "Innovation District, CA",
      client: "Verdant Systems Inc.",
      completionDate: new Date("2024-07-08"),
      description: "A 320,000 sq ft net-zero corporate campus for a leading clean-tech firm.",
      content: "Built as a showpiece of sustainable design, Verdant HQ achieves true net-zero energy through an integrated geothermal system, 4.2 MW solar array, and aggressive envelope insulation. Interior spaces feature biophilic design, wellness pavilions, and a full campus cafeteria.",
      coverLabel: "Verdant HQ atrium",
      isFeatured: false,
      sortOrder: 5,
      images: [
        { label: "Campus aerial", caption: "Full campus aerial view" },
        { label: "Biophilic atrium", caption: "Six-story central atrium" },
        { label: "Rooftop solar", caption: "4.2 MW solar array" },
      ],
    },
    {
      slug: "azure-hotel-resort",
      title: "Azure Hotel & Spa",
      category: "Commercial",
      location: "Coastal Highway, CA",
      client: "Azure Hospitality Group",
      completionDate: new Date("2025-06-12"),
      description: "A 220-key luxury beachfront resort with full spa and conference facilities.",
      content: "From foundations on complex coastal soils to handcrafted interior finishes, Azure Hotel delivers a resort experience that competes with the world's best. The project includes 220 keys, three restaurants, a 15,000 sq ft spa, and beach-level event facilities.",
      coverLabel: "Azure Hotel beachfront",
      isFeatured: true,
      sortOrder: 6,
      images: [
        { label: "Beachfront facade", caption: "Ocean-facing elevation" },
        { label: "Spa treatment room", caption: "15,000 sq ft wellness facility" },
        { label: "Pool deck evening", caption: "Infinity pool at sunset" },
      ],
    },
    {
      slug: "linden-loft-conversion",
      title: "Linden Loft Conversion",
      category: "Interior",
      location: "Arts District, CA",
      client: "Linden Capital",
      completionDate: new Date("2024-09-30"),
      description: "Adaptive re-use of a 1908 warehouse into 64 luxury loft apartments.",
      content: "Preserving the raw industrial character of this century-old warehouse, we created 64 distinctive loft apartments. Original brick, timber beams, and steel trusses remain on full display, complemented by custom millwork, contemporary kitchens, and spa-grade bathrooms.",
      coverLabel: "Loft living space",
      isFeatured: false,
      sortOrder: 7,
      images: [
        { label: "Loft interior", caption: "Preserved warehouse aesthetic" },
        { label: "Original brick wall", caption: "1908 original masonry" },
        { label: "Kitchen detail", caption: "Custom millwork kitchen" },
      ],
    },
    {
      slug: "riverfront-parkway",
      title: "Riverfront Parkway Bridge",
      category: "Industrial",
      location: "River District, CA",
      client: "State DOT",
      completionDate: new Date("2024-12-05"),
      description: "A 1,400-ft cable-stayed pedestrian and cyclist bridge crossing the Metro River.",
      content: "The Riverfront Parkway Bridge is an architectural signature piece and vital transportation link. The cable-stayed design features a single asymmetric pylon, LED architectural lighting, and seismic isolation bearings engineered for the region's fault lines.",
      coverLabel: "Riverfront bridge at night",
      isFeatured: false,
      sortOrder: 8,
      images: [
        { label: "Bridge at sunset", caption: "Asymmetric cable-stayed design" },
        { label: "Pylon detail", caption: "Single-tower pylon" },
        { label: "Deck cycling path", caption: "Dedicated bike and pedestrian lanes" },
      ],
    },
    {
      slug: "brightwood-academy",
      title: "Brightwood Academy Campus",
      category: "Commercial",
      location: "Suburban District, CA",
      client: "Brightwood Education Trust",
      completionDate: new Date("2025-02-18"),
      description: "A 180,000 sq ft K-12 private academy campus with five academic buildings.",
      content: "Designed around a central quad, Brightwood Academy includes five connected academic buildings, a 500-seat performing arts center, athletic facilities, and outdoor learning environments. Every space is engineered for modern pedagogy with flexible classrooms and integrated technology.",
      coverLabel: "Academy central quad",
      isFeatured: false,
      sortOrder: 9,
      images: [
        { label: "Central quad", caption: "Campus heart" },
        { label: "Performing arts center", caption: "500-seat auditorium" },
        { label: "Science wing", caption: "Lab classrooms" },
      ],
    },
  ];

  for (const p of projects) {
    const { images, ...rest } = p;
    await prisma.project.create({
      data: {
        ...rest,
        images: {
          create: images.map((img, i) => ({ ...img, sortOrder: i })),
        },
      },
    });
  }

  const posts = [
    {
      slug: "future-of-sustainable-construction-2026",
      title: "The Future of Sustainable Construction in 2026",
      excerpt: "Mass timber, carbon-negative concrete, and AI-driven site optimization — the sustainability revolution is here.",
      content: "<h2>A new decade of building</h2><p>Construction is entering a sustainability renaissance. After years of incremental progress, three breakthrough technologies are converging to transform how we build: mass timber systems, carbon-negative concrete, and AI-driven site optimization.</p><h3>Mass timber at scale</h3><p>What was once reserved for boutique projects is now structurally viable for 20-story buildings. Cross-laminated timber offers a <strong>70% reduction in embodied carbon</strong> versus equivalent steel and concrete structures.</p><h3>Concrete's second life</h3><p>New formulations incorporating captured atmospheric CO₂ are delivering concrete that's stronger than traditional Portland cement while actively sequestering carbon throughout its lifespan.</p><h3>AI on the jobsite</h3><p>From predictive scheduling to computer-vision safety monitoring, AI is now making real-world impact. We've deployed these systems on three major projects with measurable improvements in schedule adherence and incident rates.</p><p>The future isn't sustainable construction as an option — it's sustainable construction as the only serious path forward.</p>",
      coverLabel: "Sustainable building concept",
      author: "Aisha Nakamura",
      authorRole: "Sustainability Director",
      readMinutes: 7,
      tags: JSON.stringify(["sustainability", "innovation", "future"]),
      status: "published",
      publishedAt: new Date("2026-03-22"),
      isFeatured: true,
      categorySlug: "sustainability",
    },
    {
      slug: "5-lessons-from-meridian-tower",
      title: "5 Lessons From Delivering Meridian Tower",
      excerpt: "Our CEO shares hard-won insights from delivering a 42-story flagship project on time and on budget.",
      content: "<p>Meridian Tower was the largest project in Antbytelabs history. Over 38 months, our team navigated supply chain disruptions, labor shortages, and an ambitious LEED Platinum target. Here's what we learned.</p><h3>1. Pre-construction is where projects are won</h3><p>Every hour invested in pre-construction planning saved us twenty hours on site.</p><h3>2. Transparency beats optimism</h3><p>We told our client the unvarnished truth weekly — even when it was uncomfortable.</p><h3>3. The supply chain is strategy</h3><p>Long-lead items went under contract 14 months early.</p><h3>4. Culture is a schedule driver</h3><p>Our zero-blame, high-accountability site culture drove a 40% reduction in rework.</p><h3>5. The last 5% is 50% of the work</h3><p>We budgeted the last 5% of construction as if it were 50% — and we were right.</p>",
      coverLabel: "Meridian Tower construction photo",
      author: "Marcus Chen",
      authorRole: "Founder & CEO",
      readMinutes: 6,
      tags: JSON.stringify(["project-stories", "leadership", "delivery"]),
      status: "published",
      publishedAt: new Date("2026-03-01"),
      isFeatured: false,
      categorySlug: "project-stories",
    },
    {
      slug: "why-design-build-beats-design-bid-build",
      title: "Why Design-Build Beats Design-Bid-Build in 2026",
      excerpt: "The integrated project delivery model is finally having its moment. Here's why.",
      content: "<p>For decades, the construction industry defaulted to design-bid-build — a delivery model that separates design from construction. That model is finally losing ground, and for good reason.</p><h3>Speed</h3><p>Design-build projects finish <strong>30% faster</strong> on average.</p><h3>Cost certainty</h3><p>A single point of accountability eliminates change-order wars.</p><h3>Quality</h3><p>Designers and builders collaborating from day one yields better buildings.</p><p>At Antbytelabs, design-build isn't a trend — it's our default delivery model.</p>",
      coverLabel: "Design-build workflow diagram",
      author: "James Okonkwo",
      authorRole: "Principal Architect",
      readMinutes: 5,
      tags: JSON.stringify(["industry-insights", "delivery-models"]),
      status: "published",
      publishedAt: new Date("2026-02-14"),
      isFeatured: false,
      categorySlug: "industry-insights",
    },
    {
      slug: "how-we-engineer-safety-culture",
      title: "How We Engineer a Zero-Incident Safety Culture",
      excerpt: "Safety isn't a poster on the wall — it's an operating system. Here's ours.",
      content: "<p>We haven't had a recordable incident in 18 months across seven active sites. That's not luck — it's design.</p><h3>Leading indicators over lagging ones</h3><p>We measure near-misses, not just injuries. Our behavior-based observation program logs 40+ observations per site per day.</p><h3>Stop-work authority for everyone</h3><p>Any worker on any site can stop work for safety, no questions asked, no repercussions.</p><h3>Daily huddles</h3><p>Every site starts the day with a 10-minute huddle — hazards, plan, and commitments.</p>",
      coverLabel: "Safety huddle on site",
      author: "Daniel Brooks",
      authorRole: "Head of Construction",
      readMinutes: 4,
      tags: JSON.stringify(["safety", "operations", "culture"]),
      status: "published",
      publishedAt: new Date("2026-01-28"),
      isFeatured: false,
      categorySlug: "industry-insights",
    },
    {
      slug: "interior-design-trends-2026",
      title: "Interior Design Trends Shaping 2026",
      excerpt: "Biophilic layering, acoustic sculpting, and the return of craft — six trends we're putting into projects this year.",
      content: "<p>Our interior studio completes 40+ projects a year. Here's what we're actively designing into 2026 spaces.</p><h3>1. Biophilic layering</h3><p>Plants are table stakes. We're layering living walls, natural materials, and daylight modeling into every surface decision.</p><h3>2. Acoustic sculpting</h3><p>Open offices killed productivity. Great interiors now engineer sound as carefully as they do light.</p><h3>3. The return of craft</h3><p>Handmade tile, custom millwork, and artisan finishes are back — and clients are willing to pay for them.</p>",
      coverLabel: "Modern biophilic interior",
      author: "Tomás Ribeiro",
      authorRole: "Interior Design Lead",
      readMinutes: 5,
      tags: JSON.stringify(["design", "interiors", "trends"]),
      status: "published",
      publishedAt: new Date("2026-02-05"),
      isFeatured: false,
      categorySlug: "design-innovation",
    },
    {
      slug: "antbytelabs-welcomes-new-partners",
      title: "Antbytelabs Welcomes Three New Partners",
      excerpt: "We're proud to announce three long-time leaders are joining the partnership.",
      content: "<p>Today we're announcing that Sofia Martinez, Priya Raman, and Aisha Nakamura have been elevated to partners at Antbytelabs Construction. Each has shaped our firm in ways that go far beyond any title.</p><p>Their elevation reflects our commitment to developing leadership from within and rewarding long-term contribution.</p>",
      coverLabel: "Partners announcement",
      author: "Marcus Chen",
      authorRole: "Founder & CEO",
      readMinutes: 3,
      tags: JSON.stringify(["company-news", "leadership"]),
      status: "published",
      publishedAt: new Date("2026-03-15"),
      isFeatured: false,
      categorySlug: "company-news",
    },
  ];

  for (const post of posts) {
    const { categorySlug, ...rest } = post;
    await prisma.blogPost.create({
      data: {
        ...rest,
        categoryId: savedCats[categorySlug],
      },
    });
  }

  const inquiries = [
    { name: "Robert Hayes", email: "robert.hayes@example.com", phone: "+1 555-0142", subject: "Office tower development", message: "We're planning a 200,000 sq ft office development and would like to discuss pre-construction services.", isRead: false, createdAt: new Date("2026-04-18") },
    { name: "Linda Park", email: "linda@greentree.com", phone: "+1 555-0188", subject: "Residential remodel inquiry", message: "Looking for a premium contractor for a full home remodel in the Hillside District.", isRead: false, createdAt: new Date("2026-04-17") },
    { name: "Alex Rivera", email: "alex@riveradev.co", phone: null, subject: "Warehouse build-to-suit", message: "Interested in exploring a 400k sq ft BTS warehouse project in the Inland Empire.", isRead: true, createdAt: new Date("2026-04-14") },
    { name: "Michelle Chen", email: "m.chen@hospitality.io", phone: "+1 555-0209", subject: "Hotel renovation", message: "We manage three boutique hotels and need a partner for ongoing refurbishment.", isRead: true, createdAt: new Date("2026-04-10") },
    { name: "Tariq Hassan", email: "tariq@hassan-group.com", phone: "+1 555-0257", subject: "Mixed-use development", message: "Evaluating design-build partners for a 12-acre mixed-use development.", isRead: false, createdAt: new Date("2026-04-09") },
  ];

  for (const inq of inquiries) {
    await prisma.contactInquiry.create({ data: inq });
  }

  const media = [
    { label: "Hero background - construction site", category: "hero", aspectRatio: "16/9" },
    { label: "Team photo 1", category: "team", aspectRatio: "1/1" },
    { label: "Team photo 2", category: "team", aspectRatio: "1/1" },
    { label: "Project gallery 1", category: "project", aspectRatio: "4/3" },
    { label: "Project gallery 2", category: "project", aspectRatio: "4/3" },
    { label: "Service icon residential", category: "service", aspectRatio: "1/1" },
    { label: "Blog feature image 1", category: "blog", aspectRatio: "16/9" },
    { label: "Blog feature image 2", category: "blog", aspectRatio: "16/9" },
    { label: "Company logo", category: "branding", aspectRatio: "1/1" },
    { label: "Favicon", category: "branding", aspectRatio: "1/1" },
  ];

  for (const m of media) {
    await prisma.media.create({ data: m });
  }

  console.log("Seed complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
