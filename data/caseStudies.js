export const caseStudies = [
  {
    slug: "fintech-ledger-platform",
    title: "Ledger — Real-time Fintech Platform",
    client: "Ledger Financial",
    category: "Web · Fintech",
    gradient: "from-accent/40 via-ink-soft to-cyan/30",
    summary:
      "Rebuilt a legacy transaction platform into a real-time, horizontally-scalable system handling 2M+ daily transactions.",
    challenge:
      "Ledger's legacy monolith couldn't handle transaction volume during peak trading hours, causing timeouts and lost revenue.",
    solution:
      "We re-architected the core ledger service around event sourcing, introduced read replicas, and migrated the frontend to Next.js with real-time updates via WebSockets.",
    results: [
      { label: "Transaction throughput", value: "12x" },
      { label: "P99 latency", value: "-84%" },
      { label: "Uptime since launch", value: "99.98%" },
    ],
  },
  {
    slug: "healthcare-patient-app",
    title: "CareLoop — Patient Engagement App",
    client: "CareLoop Health",
    category: "Mobile · Healthtech",
    gradient: "from-cyan/30 via-ink-soft to-accent/40",
    summary:
      "Designed and built a cross-platform patient app that lifted appointment adherence by 35%.",
    challenge:
      "CareLoop needed a HIPAA-aware mobile experience patients would actually use between visits, replacing a clunky patient portal.",
    solution:
      "We shipped a React Native app with appointment reminders, secure messaging, and medication tracking, backed by a FHIR-compliant API layer.",
    results: [
      { label: "Appointment adherence", value: "+35%" },
      { label: "App store rating", value: "4.8/5" },
      { label: "Monthly active patients", value: "60k+" },
    ],
  },
  {
    slug: "logistics-ops-dashboard",
    title: "FleetOS — Logistics Operations Suite",
    client: "FleetOS",
    category: "SaaS · Logistics",
    gradient: "from-accent/30 via-ink-soft to-accent-bright/30",
    summary:
      "Built a real-time fleet operations dashboard consolidating five legacy tools into one platform.",
    challenge:
      "FleetOS's dispatchers juggled five disconnected tools, causing delays and manual data entry errors.",
    solution:
      "We consolidated the workflow into a single Next.js dashboard with live GPS tracking, automated dispatch suggestions, and a unified reporting layer.",
    results: [
      { label: "Dispatch time", value: "-52%" },
      { label: "Tools consolidated", value: "5 → 1" },
      { label: "Fleet utilization", value: "+21%" },
    ],
  },
];
