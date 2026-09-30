// Site content, taken from "Catch Global Website Content Build Pack" (final
// handover, 30 September 2026) in /docs. Items the pack marks as internal notes,
// permission-dependent or pending approval are deliberately left out.

export const company = {
  name: 'Catch Global',
  legalName: 'CATCH GLOBAL PTY LTD',
  legalNameTitle: 'Catch Global Pty Ltd',
  abn: '19 702 264 122',
  acn: '702 264 122',
  locality: 'Springfield Lakes, QLD 4300',
  locationLong: 'Springfield Lakes, Queensland 4300, Australia',
  region: 'Brisbane / Queensland',
  since: 'March 2026',
  // Recommended in the pack but NOT yet confirmed as an active mailbox.
  // Swap for the live address once Microsoft 365 is set up.
  email: 'enquiries@catchglobal.com.au',
  emailConfirmed: false,
  // Approved business phone not supplied yet — leave empty to hide it.
  phone: '',
  tagline: 'Technology, digital growth, brand and creative services for Australian businesses and organisations.',
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Technology', to: '/technology' },
  { label: 'Our Work', to: '/our-work' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

// Per-page <title> and meta description (pack section 12).
export const seo = {
  '/': {
    title: 'Catch Global | Technology, Digital & Creative Services Australia',
    description: 'Technology, software, automation, SEO, branding, content and media services for Australian businesses and organisations. Explore Catch Global services and work.',
  },
  '/about': {
    title: 'About Catch Global | Australian Digital & Technology Team',
    description: 'Learn about Catch Global, our Australian operations since March 2026, our multidisciplinary delivery team and the way we approach technology, digital and creative projects.',
  },
  '/services': {
    title: 'Digital, Technology & Creative Services | Catch Global',
    description: 'Explore Catch Global services across software, SaaS, automation, AI, SEO, digital marketing, branding, content and media documentation.',
  },
  '/technology': {
    title: 'Software, SaaS, Automation & AI Solutions | Catch Global',
    description: 'Custom software, SaaS, workflow automation, mobile and web applications, AI-enabled solutions and selected technology products from Catch Global’s wider delivery team.',
  },
  '/our-work': {
    title: 'Our Work | Catch Global Australia',
    description: 'See Catch Global work across event documentation, live streaming, social media content, SEO, brand establishment and digital growth for Australian clients.',
  },
  '/team': {
    title: 'Our Team | Catch Global',
    description: 'Meet the Catch Global leadership, operations, technology and creative specialists supporting client delivery.',
  },
  '/contact': {
    title: 'Get a Quote | Catch Global',
    description: 'Tell Catch Global what you need to build, improve or communicate. Submit a project enquiry for a tailored scope and quotation.',
  },
  '/privacy': { title: 'Privacy Policy | Catch Global', description: 'How Catch Global collects, uses and protects enquiry and website data.' },
  '/terms': { title: 'Terms & Conditions | Catch Global', description: 'Terms of use for the Catch Global website.' },
}

export const home = {
  hero: {
    title: 'Technology, digital and creative solutions for growing organisations.',
    sub: 'Catch Global helps Australian businesses and organisations build digital systems, improve visibility, strengthen brands and document the work that matters — from software and automation to SEO, content, brand development and media production.',
    support: ['Australian operations since March 2026', 'Brisbane / Queensland'],
  },
  intro: {
    title: 'One team across strategy, technology and creative delivery.',
    body: 'Business problems rarely sit in one box. A website may need better search visibility. A growing team may need a new workflow system. A new brand may need positioning, content and an e-commerce experience at the same time. Catch Global coordinates these connected needs through one delivery approach, with specialists across technology, digital growth, branding and creative production.',
  },
  work: {
    title: 'Work already delivered in Australia.',
    body: 'From multicultural events and community organisations to local retail, hospitality, footwear and wellness brands, our Australian portfolio has grown through practical delivery across content, SEO, brand work and digital documentation.',
  },
  products: {
    title: 'Selected technology products.',
    body: 'Explore business automation, e-commerce operations and AI-assisted career tools developed within our wider technology ecosystem.',
  },
  why: [
    { icon: 'layers', title: 'Coordinated delivery', text: 'A single project conversation can connect strategy, technology, digital marketing and creative production instead of splitting the work across unrelated vendors.' },
    { icon: 'pin', title: 'Australian client focus', text: 'Client communication, project scoping and delivery coordination are structured around Australian business needs and timelines.' },
    { icon: 'users', title: 'Scalable specialist team', text: 'Projects can draw on software engineers, digital strategists, designers, video specialists and project coordinators according to scope.' },
    { icon: 'compass', title: 'Custom scope, not fixed packages', text: 'We don’t publish fixed prices. Each enquiry is reviewed and quoted against the actual work required.' },
    { icon: 'chart', title: 'Evidence-led growth', text: 'For SEO and digital work, reporting focuses on measurable search visibility, content delivery and conversion actions rather than vague activity counts.' },
  ],
}

export const cta = {
  title: 'Have a project, process or digital growth problem to solve?',
  body: 'Tell us what you are trying to achieve. We will review the requirement, identify the right capability and prepare a tailored scope and quotation.',
  button: 'Get a Quote',
}

export const about = {
  title: 'One coordinated team for technology, digital growth, brand and creative delivery.',
  paragraphs: [
    'Catch Global Pty Ltd commenced Australian operations in March 2026 with a simple focus: provide businesses and organisations with one coordinated team for technology, digital growth, brand and creative delivery.',
    'Our first Australian client was Multicultural Mailer. That work began with event and digital documentation for Eid For All 2026 and Parliament Eid Evening 2026, producing documentary-style video, interviews and social-first content. From there, the Australian portfolio expanded into community event coverage, live streaming, ongoing social media content, SEO, brand establishment, product presentation and broader digital support.',
    'Today, Catch Global combines Australian-facing project coordination with a wider delivery team covering software and SaaS development, process automation, AI-enabled applications, web and mobile development, SEO, digital marketing, brand and creative production. This allows us to scope work around the problem rather than force every client into a single service category.',
    'We work with local businesses, community organisations, growing brands and organisations that need practical support to build, improve or communicate something digital. Each project starts with the requirement. We then define the right combination of strategy, technology and creative delivery, with a clear scope and customised quotation.',
  ],
  // Milestones for the About hero — dates as stated in the build pack.
  timeline: [
    { when: 'March 2026', what: 'Australian operations begin' },
    { when: '28 March 2026', what: 'Eid For All 2026 — first client, Multicultural Mailer' },
    { when: '21 April 2026', what: 'Parliament Eid Evening at Queensland Parliament' },
    { when: 'ANZAC Day 2026', what: 'Full-event coverage for Greater Springfield RSL' },
    { when: 'Now', what: 'Ongoing SEO, social content and brand work for local businesses' },
  ],
  facts: [
    { label: 'Australian operations', value: 'Since March 2026' },
    { label: 'First Australian client', value: 'Multicultural Mailer' },
    { label: 'Core capability', value: 'Technology • Digital Growth • Brand • Creative' },
    { label: 'Working model', value: 'Project-specific specialist team coordinated through Catch Global' },
    { label: 'Quote model', value: 'Custom scope and quotation after enquiry review' },
  ],
}

// How a project moves from enquiry to delivery (derived from the pack's quote model).
export const process = [
  { icon: 'mail', title: 'Enquiry', text: 'Share the problem, the result you want, any existing website or system, and your timing. No technical brief needed.' },
  { icon: 'compass', title: 'Review', text: 'We review the requirement, ask the right questions and identify the capability the work needs.' },
  { icon: 'layers', title: 'Scope & quotation', text: 'You receive a tailored scope and customised quotation — not a fixed package.' },
  { icon: 'flag', title: 'Delivery', text: 'A project-specific specialist team delivers, coordinated through Catch Global.' },
]

export const servicesIntro = {
  title: 'Services built around the job that needs to be done.',
  body: 'Catch Global works across technology, digital growth, brand and creative delivery. Services can be engaged individually or combined into one project scope. Because requirements vary, we assess the project first and prepare a tailored quotation rather than publishing fixed online prices.',
}

export const services = [
  {
    id: 'technology-software',
    icon: 'code',
    title: 'Technology & Software',
    card: 'Custom software, SaaS platforms, websites, e-commerce, web applications and mobile apps built around real operational needs.',
    headline: 'Build digital products and systems around the way your organisation actually works.',
    items: ['Custom software development', 'SaaS platform development', 'Web applications', 'Business websites', 'E-commerce', 'iOS/Android or cross-platform mobile applications', 'API and system integration', 'Dashboards', 'Maintenance and technical support'],
    who: 'Suitable for businesses replacing spreadsheets/manual processes, launching a digital product, improving customer self-service, or connecting systems that currently operate separately.',
  },
  {
    id: 'automation',
    icon: 'workflow',
    title: 'Digital Transformation & Automation',
    card: 'Process mapping, workflow digitisation, dashboards, CRM/operations tools, reporting and system integrations that reduce repetitive work.',
    headline: 'Turn repetitive, fragmented processes into clearer digital workflows.',
    items: ['Process mapping', 'Workflow digitisation', 'CRM and client-management systems', 'Operational platforms', 'Digital forms', 'Approval flows', 'Task/project systems', 'Automated notifications', 'Reporting', 'Integrations and business dashboards'],
    who: 'Suitable for organisations that have grown beyond email/spreadsheets or want better visibility over work, clients, projects and internal processes.',
  },
  {
    id: 'ai-data',
    icon: 'spark',
    title: 'AI & Data Innovation',
    card: 'AI-enabled applications, intelligent workflows, data-driven tools and practical integrations designed around an agreed business use case.',
    headline: 'Apply AI where there is a clear use case, data source and business outcome.',
    items: ['AI-enabled applications', 'Conversational interfaces', 'AI-assisted document/content workflows', 'Intelligent automation', 'Data dashboards', 'Analytics', 'Data-driven tools', 'Model/API integration', 'Structured reporting and decision-support interfaces'],
    who: 'All AI work is scoped around privacy, data handling, human review and the specific business problem — not generic claims that every process can or should be automated.',
  },
  {
    id: 'seo-digital-growth',
    icon: 'chart',
    title: 'SEO & Digital Growth',
    card: 'Technical, on-page and local SEO, content planning, social media support, Google Business Profile work, analytics and campaign support.',
    headline: 'Improve how customers find, understand and act on a business online.',
    items: ['SEO audit and baseline', 'Keyword research', 'On-page optimisation', 'Technical SEO priorities', 'Local SEO', 'Google Business Profile support', 'Local landing pages', 'SEO blogs/content', 'Internal linking', 'Backlink opportunity work', 'Analytics', 'Reporting', 'Social media content planning and ongoing digital support'],
    who: 'For local businesses, the priority is search intent, location relevance, Google Business Profile, conversion actions and useful content rather than rankings alone.',
  },
  {
    id: 'brand-creative',
    icon: 'pen',
    title: 'Brand & Creative',
    card: 'Brand establishment, visual identity support, campaign creative, product presentation, graphic design, social content and motion assets.',
    headline: 'Build a consistent brand presence across the website, products, campaigns and social channels.',
    items: ['Brand establishment', 'Brand strategy support', 'Visual identity', 'Design systems', 'Social media creative', 'Motion/reels', 'Campaign creative', 'Product presentation', 'Content planning', 'Copy support', 'Digital collateral and e-commerce visual direction'],
    who: 'Useful for new brands, businesses going through a refresh, or companies whose website/social/product presentation no longer feels consistent.',
  },
  {
    id: 'media-documentation',
    icon: 'film',
    title: 'Media & Digital Documentation',
    card: 'Event documentation, documentary-style video, interviews, highlight content, reels, photography where scoped, and live streaming.',
    headline: 'Capture events, projects and stories in formats that can be used beyond the day itself.',
    items: ['Event documentation', 'Documentary-style video', 'Interviews', 'Event highlights', 'Reels and short-form content', 'Photography where scoped', 'Live streaming', 'Digital content packages and organised media archives'],
    who: 'The aim is to create a useful digital record and a bank of approved content that can support reporting, promotion, community communication and future storytelling.',
  },
]

// Search/filter terms (pack 5, "Services that should appear in the site search/filter").
export const serviceTerms = [
  ['Custom software', 'technology-software'],
  ['SaaS development', 'technology-software'],
  ['Website development', 'technology-software'],
  ['E-commerce', 'technology-software'],
  ['Mobile apps', 'technology-software'],
  ['Process automation', 'automation'],
  ['CRM and business systems', 'automation'],
  ['AI integrations', 'ai-data'],
  ['Data analytics and dashboards', 'ai-data'],
  ['SEO', 'seo-digital-growth'],
  ['Local SEO', 'seo-digital-growth'],
  ['Social media content', 'seo-digital-growth'],
  ['Digital marketing', 'seo-digital-growth'],
  ['Brand establishment', 'brand-creative'],
  ['Graphic design', 'brand-creative'],
  ['Motion/reel editing', 'brand-creative'],
  ['Event documentation', 'media-documentation'],
  ['Documentary video', 'media-documentation'],
  ['Interviews', 'media-documentation'],
  ['Live streaming', 'media-documentation'],
]

export const technology = {
  title: 'Technology should make work clearer, faster or easier to manage.',
  body: 'Our technology capability covers custom software and SaaS platforms, web and mobile applications, process automation, business systems, AI-enabled workflows and data-driven tools. We begin with the business requirement, map the user and operational needs, and then define the right technical approach.',
  capabilities: ['technology-software', 'automation', 'ai-data'],
}

export const products = [
  {
    name: 'SMICEE',
    suffix: 'Smart Office',
    tag: 'Business management',
    href: 'https://smicee.com/',
    cta: 'Explore SMICEE',
    text: 'An integrated office and business-management platform designed to connect people, projects, clients and operations within one system.',
    features: ['HR management', 'Project & task management', 'Sales, finance & accounts', 'Client & vendor management', 'CRM workflows', 'Dashboards & automated reporting'],
    blobs: [['#1e5fd6', 0.7, 0.55, 0.25, 0.3], ['#0b2a6b', 0.8, 0.6, 0.8, 0.7], ['#4aa3ff', 0.35, 0.35, 0.7, 0.2]],
  },
  {
    name: 'NextCart',
    suffix: '',
    tag: 'E-commerce operations',
    href: 'https://nextcart.app/',
    cta: 'Explore NextCart',
    text: 'A business and e-commerce platform combining online presence with operational tools.',
    features: ['Website & e-commerce building', 'Business operations management', 'Branding & marketing support', 'Business mobile app', 'WordPress integration'],
    blobs: [['#e8a917', 0.55, 0.5, 0.75, 0.3], ['#1e5fd6', 0.6, 0.55, 0.2, 0.75], ['#0b2a6b', 0.7, 0.6, 0.5, 0.5]],
  },
  {
    name: 'QuickCV',
    suffix: '',
    tag: 'AI-assisted careers',
    href: 'https://createquickcv.com/',
    cta: 'Explore QuickCV',
    text: 'An AI-assisted CV and career-profile platform for job seekers.',
    features: ['ATS-friendly CV generation', 'Job-description-based CV tailoring', 'AI-assisted cover letters', 'Shareable professional profiles', 'Video resume / public profile', 'Multiple CV versions & sync'],
    blobs: [['#f2b632', 0.6, 0.5, 0.5, 0.15], ['#6a3fd8', 0.55, 0.55, 0.3, 0.85], ['#1e5fd6', 0.5, 0.5, 0.85, 0.7]],
  },
]

export const teamExperience = {
  attribution: 'Selected technology experience from members of our wider delivery team.',
  items: [
    {
      title: 'Village Court Mobile Application',
      org: 'UNDP Bangladesh',
      paragraphs: [
        'A mobile information application designed to make village-court information easier to access and understand, including for users in remote communities and users with different accessibility needs.',
        'The solution used a hybrid mobile approach with user registration, legal information and FAQs, a geographic directory, multimedia content and external-form connections. The project also integrated 22 informational videos and considered offline/limited-connectivity use and colour-accessibility requirements.',
      ],
    },
    {
      title: 'Youth for Integrity',
      org: 'Civic technology platform',
      paragraphs: [
        'A scalable civic-engagement platform designed to support a digital campaign through interactive participation rather than static information alone.',
        'Published project information describes a custom CMS, live pledge and comment feeds with real-time database synchronisation, anonymised analytics, mobile-first design and performance optimisation for sudden traffic increases. The system was designed for future module expansion and backend data collection.',
      ],
    },
  ],
  evidence: ['Custom CMS and web-platform development', 'Mobile application development', 'Accessibility-aware digital design', 'Real-time data features', 'Analytics and behaviour tracking', 'Scalable campaign platforms', 'Content-rich public information systems', 'Offline/limited-connectivity considerations', 'Integration of video and structured information'],
}

// Australian client work (pack section 7). Performance figures are held back
// until client approval, per the pack.
export const work = [
  {
    slug: 'multicultural-mailer',
    client: 'Multicultural Mailer',
    eyebrow: 'Event & digital documentation • First Australian client',
    card: 'Digital documentation for Eid For All 2026 and Parliament Eid Evening 2026, including documentary-style video, interviews and short-form social content.',
    story: [
      'Catch Global began its Australian client work with Multicultural Mailer in March 2026. The assignment was to create more than event footage: the aim was to leave the organisation with a structured digital record that could be used for documentation, reporting and ongoing communication.',
      'The team covered Eid For All 2026 on 28 March 2026 and Parliament Eid Evening 2026 at Queensland Parliament on 21 April 2026. Across the two events, the content package included documentary-style video, interviews and social-first reels/highlight material.',
      'The work established Catch Global’s Australian event-documentation capability and created a repeatable approach for combining long-form records with shorter digital content.',
    ],
    deliverables: ['Event video documentation', 'Documentary-style edit', 'Interviews', 'Reels / short-form social content', 'Digital event archive / documentation package'],
    links: [{ label: 'multiculturalmailer.org.au', href: 'https://multiculturalmailer.org.au/' }],
    tags: ['media'],
  },
  {
    slug: 'greater-springfield-rsl',
    client: 'Greater Springfield RSL Sub-Branch',
    title: 'ANZAC Day 2026',
    eyebrow: 'Event documentation • Greater Springfield, Queensland',
    card: 'Full-event visual coverage of Greater Springfield RSL’s 2026 ANZAC Day program, documenting the commemorative and community elements of the day.',
    story: [
      'Catch Global provided visual documentation for the Greater Springfield RSL Sub-Branch’s ANZAC Day 2026 event program. The day included the inaugural veterans march into Brighton Homes Arena and the ANZAC Day AFL Cup involving Australian Defence Force and Queensland Fire and Rescue teams.',
      'The coverage focused on preserving the event as a complete visual record, capturing the formal program, community participation and key moments across the day.',
    ],
    deliverables: ['Full-event video coverage', 'Key program and community moments', 'Post-event visual documentation'],
    links: [{ label: 'Greater Springfield RSL on Facebook', href: 'https://www.facebook.com/GreaterSpringfieldRSL/' }],
    tags: ['media'],
  },
  {
    slug: 'bangladesh-association-brisbane',
    client: 'Bangladesh Association in Brisbane',
    title: 'Boishakhi Mela',
    eyebrow: 'Event documentation + live streaming',
    card: 'Visual event documentation and live streaming for a large community festival, extending access beyond the physical venue.',
    story: [
      'For the Bangladesh Association in Brisbane’s Boishakhi Mela, Catch Global combined on-site visual documentation with live streaming. This allowed the event to be recorded for future use while also giving remote audiences a way to follow the program in real time.',
      'The project expanded the Australian media portfolio from post-event documentation into live digital delivery.',
    ],
    deliverables: ['Event video documentation', 'Live streaming', 'Digital content capture for post-event use'],
    links: [],
    tags: ['media'],
  },
  {
    slug: 'fully-promoted-springfield',
    client: 'Fully Promoted Springfield',
    eyebrow: 'Ongoing digital growth • Social content + SEO',
    card: 'Ongoing social media content and SEO support for a local branded workwear, uniforms and promotional-products business in Greater Springfield.',
    story: [
      'Catch Global provides ongoing digital support to Fully Promoted Springfield, combining social media content production with an expanding local SEO program.',
      'The SEO work has focused on building suburb-specific search visibility, creating local landing pages and blogs, strengthening internal links and backlinks, and tracking conversion-oriented search performance across Springfield, Ipswich and surrounding areas.',
      'The social content stream supports consistent product and service communication across the business’s digital channels.',
    ],
    deliverables: ['Monthly social media content creation', 'SEO strategy and implementation', 'Local landing pages', 'SEO blog content', 'Backlink development', 'Google Business Profile / local visibility support', 'Performance reporting'],
    links: [{ label: 'fullypromoted.com.au/stores/springfield', href: 'https://fullypromoted.com.au/stores/springfield' }],
    tags: ['growth'],
  },
  {
    slug: 'fully-promoted-tingalpa',
    client: 'Fully Promoted Tingalpa',
    eyebrow: 'Ongoing digital growth • Social content + local SEO',
    card: 'Social media content and local SEO support focused on helping the Tingalpa store appear for high-intent uniform, workwear, embroidery and promotional-product searches.',
    story: [
      'Catch Global supports Fully Promoted Tingalpa with social media content and a local SEO program covering technical priorities, location/service pages, content, backlinks, Google Business Profile activity and search-performance monitoring.',
      'The first campaign month concentrated on building the search foundation and extending local relevance into nearby Brisbane bayside and southside suburbs.',
    ],
    deliverables: ['Social media content creation', 'Local and service landing pages', 'SEO blogs', 'Backlink development', 'Google Business Profile posts', 'On-page and technical SEO', 'Local search reporting'],
    links: [{ label: 'fullypromoted.com.au/stores/tingalpa', href: 'https://fullypromoted.com.au/stores/tingalpa' }],
    tags: ['growth'],
  },
  {
    slug: 'spice-dine',
    client: 'Spice Dine',
    title: 'Woolloongabba',
    eyebrow: 'Ongoing digital support • Hospitality',
    card: 'Social media content and SEO/digital growth support for a Bangladeshi restaurant in Woolloongabba.',
    story: [
      'Catch Global supports Spice Dine with ongoing digital content and search-focused marketing work designed to keep the restaurant visible, current and locally relevant online.',
      'The content work covers regular social media creative and reel/video content, while the SEO work supports local discovery around Woolloongabba and Brisbane food searches.',
    ],
    deliverables: ['Social media content creation', 'Reels / short-form video content', 'SEO / local digital growth support'],
    links: [{ label: 'Spice Dine on Facebook', href: 'https://www.facebook.com/profile.php?id=61574995122363' }],
    tags: ['growth', 'brand'],
  },
  {
    slug: 'balanti',
    client: 'BALANTI',
    eyebrow: 'Brand establishment • E-commerce • Product content',
    card: 'Brand-establishment and digital-launch support for an online Australian footwear brand, covering strategy, product presentation, website/e-commerce coordination, SEO and social planning.',
    story: [
      'Catch Global is supporting BALANTI as the footwear brand builds its Australian digital presence. The work is broader than social media: it combines brand establishment, website/e-commerce presentation, product imagery, content planning and search strategy.',
      'The project has included a three-month integrated marketing strategy, product photography, website product mock-up development and corrections, content/SEO planning, product naming and merchandising feedback, and detailed website QA to improve product ordering, colour accuracy, sizing information, policies and the overall shopping experience.',
      'The aim is to create a consistent digital system in which product visuals, website information, SEO and social content all present the brand in the same way.',
    ],
    deliverables: ['Brand-establishment support', 'Three-month marketing strategy', 'Product photography for website/social use', 'Product mock-ups and visual correction', 'Website/e-commerce content and QA', 'SEO strategy', 'Social media content planning', 'Product naming / merchandising feedback'],
    links: [{ label: 'balanti.com.au', href: 'https://www.balanti.com.au/' }],
    tags: ['brand', 'growth'],
  },
]

// Client/name strip order (pack 7). Names only: logos need client permission.
export const clients = [
  'Multicultural Mailer',
  'Greater Springfield RSL Sub-Branch',
  'Bangladesh Association in Brisbane',
  'Fully Promoted Springfield',
  'Fully Promoted Tingalpa',
  'Spice Dine',
  'BALANTI',
  'SCIREX',
]

export const workFilters = [
  { id: 'all', label: 'All work' },
  { id: 'media', label: 'Media & documentation' },
  { id: 'growth', label: 'SEO & digital growth' },
  { id: 'brand', label: 'Brand & content' },
]

// Team (pack 9). Only cards whose public name/title are settled are published.
// Photos: studio headshots from catchbangladesh.com/career/team where the person
// appears there; everyone else keeps an initials card until a headshot is supplied.
export const team = {
  title: 'A multidisciplinary team for technology, digital growth and creative delivery.',
  body: 'Catch Global coordinates client strategy, project management and delivery through a team covering business operations, software development, digital marketing, branding, design and media production. Team members are brought into projects according to the skills required.',
  groups: [
    {
      id: 'leadership',
      label: 'Leadership & Operations',
      people: [
        { name: 'Aktaruzzaman Rasel', role: 'Managing Director', bio: 'Leads business administration, client onboarding and commercial coordination for Catch Global.' },
        { name: 'Md Rakibul Iqbal', photo: '/team/md-rakibul-iqbal.webp', role: 'Director, Operations', bio: 'Coordinates project scoping, client communication and delivery across digital, technology and creative work.' },
        { name: 'Biswajit Kumar Paul', photo: '/team/biswajit-kumar-paul.webp', role: 'Vice President', bio: 'Supports senior coordination and delivery.' },
        { name: 'Md Rakibul Islam', role: 'Chief Technology Officer', bio: 'Technology leadership and support for Catch Global operations.' },
      ],
    },
    {
      id: 'technology',
      label: 'Technology',
      people: [
        { name: 'MD Samiur Rahman Bhuiya', photo: '/team/samiur-rahman-bhuiya.webp', role: 'Senior Software Engineer', bio: 'Software engineering and platform/application delivery.' },
        { name: 'Mostafa Musab Naveed', photo: '/team/mostafa-musab-naveed.webp', role: 'Software Engineer', bio: 'Backend engineering with experience in Python/Django and AI/system development.' },
        { name: 'Rafid Rahman', role: 'Software Engineer', bio: 'Mobile and application development, including Flutter-based field and asset-management systems.' },
        { name: 'DM Bikash', role: 'Software Engineer', bio: 'Software/application development support.' },
        { name: 'Md Rakib Hasan', photo: '/team/md-rakib-hasan.webp', role: 'Software Engineer', bio: 'Software/application development support.' },
        { name: 'Tazkir Taher', role: 'Junior Software Developer', bio: 'Backend development, APIs and AI-powered product work, including QuickCV.' },
        { name: 'Mahbub Elahi Rizvee', role: 'Junior Software Engineer', bio: 'Software/application development support.' },
      ],
    },
    {
      id: 'creative',
      label: 'Creative',
      people: [
        { name: 'S.A. Sadik', photo: '/team/sa-sadik.webp', role: 'Chief Brand Officer', bio: 'Brand strategy, creative direction and visual/technical solution development.' },
        { name: 'Arman Ahmed Jisan', photo: '/team/arman-ahmed-jisan.webp', role: 'Group Creative Director', bio: 'Visual storytelling, animation, campaign creative and creative-team leadership.' },
        { name: 'Rahat Howlader', role: 'Editor / Filmmaker', bio: 'Video editing, filmmaking, production planning and documentary/corporate visual work.' },
        { name: 'Shamiul Islam', role: 'Graphic Designer & Photographer', bio: 'Graphic design, photography and visual production.' },
        { name: 'Bashar Billah', role: 'Senior Visualizer', bio: 'Visual design and creative production support.' },
      ],
    },
  ],
}

export const enquiry = {
  title: 'Tell us what you are trying to build, improve or solve.',
  body: 'You do not need to prepare a technical brief before contacting us. Share the problem, the result you want, any existing website/system/content, and the timing you are working toward. We will review the requirement and come back with the right questions, proposed scope and a customised quotation.',
  button: 'Submit Project Enquiry',
  serviceAreas: ['Technology & Software', 'Automation', 'AI & Data', 'SEO & Digital Growth', 'Brand & Creative', 'Media & Event Documentation', 'Not sure'],
  timings: ['As soon as possible', 'Within 1 month', '1–3 months', '3–6 months', 'Flexible / not sure'],
  budgets: ['Not sure yet', 'Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+'],
  sources: ['Search engine', 'Social media', 'Referral / word of mouth', 'Event', 'Other'],
  confirmTitle: 'Thanks — your project enquiry has been received.',
  confirmBody: 'Our team will review the requirement and identify the right next step. If we need more detail before preparing a scope or quotation, we will contact you using the details provided.',
}
