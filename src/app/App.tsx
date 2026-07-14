import { useState } from "react";
import {
  Home, Calendar, Pill, UserRound, Phone, MapPin, Clock,
  ChevronRight, Menu, X, Star, CheckCircle, HeartPulse,
  Stethoscope, Microscope, Ambulance, Baby, Eye, BrainCircuit,
  Bone, ShieldCheck, Mail, MessageSquare, ArrowRight, Dumbbell,
  Lock, LogOut, Users, CalendarCheck, Bell, Trash2, Search,
  BarChart3, AlertCircle, ChevronDown,
} from "lucide-react";

type Page = "home" | "doctors" | "appointment" | "pharmacy" | "contact" | "admin";

/* ── types ── */
interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  cnic: string;
  doctor: string;
  date: string;
  time: string;
  type: string;
  notes: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  bookedAt: string;
}

/* ── constants ── */
const BRAND = {
  name: "Pak Federal Medical Centre",
  short: "PFMC",
  address: "Khanna Pull, Near TM CNG, Street 1, Islamabad",
  phone: "+92-3285288587",
  emergency: "+92-51-111-911-911",
  email: "info@pfmc.gov.pk",
  hours: "Mon–Sat: 8:00 AM – 10:00 PM  |  Emergency: 12/7",
};

const ADMIN_PASSWORD = "pfmc@2024";

const DOCTORS = [
  { id: 1, name: "Dr. Asim Raza", specialty: "Cardiologist", qualification: "MBBS, FCPS (Cardiology)", experience: "18 years", available: ["Mon", "Wed", "Fri"], rating: 4.9, reviews: 312, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&auto=format" },
  { id: 2, name: "Dr. Sadia Imtiaz", specialty: "Gynecologist", qualification: "MBBS, FCPS (Gyne/Obs)", experience: "14 years", available: ["Tue", "Thu", "Sat"], rating: 4.8, reviews: 276, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&auto=format" },
  { id: 3, name: "Dr. Tariq Mehmood", specialty: "Orthopedic Surgeon", qualification: "MBBS, FCPS (Ortho)", experience: "21 years", available: ["Mon", "Tue", "Thu"], rating: 4.7, reviews: 198, img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&auto=format" },
  { id: 4, name: "Dr. Nadia Farrukh", specialty: "Pediatrician", qualification: "MBBS, DCH, FCPS", experience: "12 years", available: ["Wed", "Fri", "Sat"], rating: 4.9, reviews: 445, img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&auto=format" },
  { id: 5, name: "Dr. Bilal Hussain", specialty: "Neurologist", qualification: "MBBS, FCPS (Neuro)", experience: "16 years", available: ["Mon", "Wed", "Sat"], rating: 4.8, reviews: 221, img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&auto=format" },
  { id: 6, name: "Dr. Amina Shaheen", specialty: "Ophthalmologist", qualification: "MBBS, DOMS, FCPS", experience: "10 years", available: ["Tue", "Thu", "Sat"], rating: 4.7, reviews: 163, img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&auto=format" },
  { id: 7, name: "Dr.Sarfaraz khan", specialty: "Physiotherapist", qualification: "DPT, MSPT", experience: "9 years", available: ["Mon", "Wed", "Fri"], rating: 4.8, reviews: 134, img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&h=300&fit=crop&auto=format" },
  { id: 8, name: "Dr. Kamran Sheikh", specialty: "General Physician", qualification: "MBBS, MCPS", experience: "11 years", available: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], rating: 4.6, reviews: 521, img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&auto=format" },
];

const SERVICES = [
  {
    icon: Baby, label: "Gynecology & Obs",
    desc: "Maternal health, prenatal care & women's wellness",
    status: "active" as const,
    img: "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?w=400&h=220&fit=crop&auto=format",
    alt: "Gynecology care",
  },
  {
    icon: Stethoscope, label: "General OPD",
    desc: "Walk-in consultations, Mon–Sat, 8AM–10PM",
    status: "active" as const,
    img: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=400&h=220&fit=crop&auto=format",
    alt: "General OPD consultations",
  },
  {
    icon: Dumbbell, label: "Physiotherapy",
    desc: "Rehab, pain management & mobility restoration",
    status: "active" as const,
    img: "https://images.unsplash.com/photo-1758654860100-32cd2e83e74a?w=400&h=220&fit=crop&auto=format",
    alt: "Physiotherapy session",
  },
  {
    icon: HeartPulse, label: "Cardiology",
    desc: "Advanced heart care & ECG diagnostics",
    status: "soon" as const,
    img: "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?w=400&h=220&fit=crop&auto=format",
    alt: "Cardiology department",
  },
  {
    icon: Bone, label: "Orthopedics",
    desc: "Bone, joint & spine surgery",
    status: "soon" as const,
    img: "https://images.unsplash.com/photo-1582380375444-275b280990a9?w=400&h=220&fit=crop&auto=format",
    alt: "Orthopedic care",
  },
  {
    icon: BrainCircuit, label: "Neurology",
    desc: "Brain & nervous system disorders",
    status: "soon" as const,
    img: "https://images.unsplash.com/photo-1758691463110-697a814b2033?w=400&h=220&fit=crop&auto=format",
    alt: "Neurology brain scan",
  },
  {
    icon: Eye, label: "Ophthalmology",
    desc: "Eye surgery & vision correction",
    status: "soon" as const,
    img: "https://images.unsplash.com/photo-1766310549795-dd0fc75d499f?w=400&h=220&fit=crop&auto=format",
    alt: "Eye examination",
  },
  {
    icon: Microscope, label: "Pathology Lab",
    desc: "Full diagnostic & blood testing",
    status: "soon" as const,
    img: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=400&h=220&fit=crop&auto=format",
    alt: "Pathology laboratory",
  },
  {
    icon: Ambulance, label: "Emergency",
    desc: "24/7 emergency trauma unit",
    status: "soon" as const,
    img: "https://images.unsplash.com/photo-1512102438733-bfa4ed29aef7?w=400&h=220&fit=crop&auto=format",
    alt: "Emergency services",
  },
];

const MEDICINES = [
  { id: 1, name: "Panadol Extra", category: "Analgesic", price: "Rs. 35", stock: "In Stock", desc: "500mg + Caffeine 65mg — 20 tablets" },
  { id: 2, name: "Amoxicillin 500mg", category: "Antibiotic", price: "Rs. 120", stock: "In Stock", desc: "Capsules — pack of 12" },
  { id: 3, name: "Metformin 500mg", category: "Antidiabetic", price: "Rs. 85", stock: "In Stock", desc: "Tablets — pack of 30" },
  { id: 4, name: "Omeprazole 20mg", category: "Antacid", price: "Rs. 95", stock: "In Stock", desc: "Capsules — pack of 14" },
  { id: 5, name: "Amlodipine 5mg", category: "Antihypertensive", price: "Rs. 65", stock: "Low Stock", desc: "Tablets — pack of 30" },
  { id: 6, name: "Atorvastatin 20mg", category: "Statin", price: "Rs. 150", stock: "In Stock", desc: "Tablets — pack of 30" },
  { id: 7, name: "Cetirizine 10mg", category: "Antihistamine", price: "Rs. 45", stock: "In Stock", desc: "Tablets — pack of 10" },
  { id: 8, name: "Vitamin D3 1000IU", category: "Supplement", price: "Rs. 180", stock: "In Stock", desc: "Soft gel capsules — pack of 60" },
  { id: 9, name: "ORS Sachet", category: "Electrolyte", price: "Rs. 20", stock: "In Stock", desc: "Orange flavour — pack of 10" },
];

const STATS = [
  { value: "25+", label: "Years of Service" },
  { value: "120+", label: "Specialist Doctors" },
  { value: "50,000+", label: "Patients Served" },
  { value: "24/7", label: "Emergency Care" },
];

const MED_CATEGORIES = ["All", "Analgesic", "Antibiotic", "Antidiabetic", "Antacid", "Antihypertensive", "Statin", "Antihistamine", "Supplement", "Electrolyte"];

/* ════════════════════════════════════════
   ROOT APP
════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: "APT-001", name: "Ahmed Nawaz", phone: "+92-300-1234567", email: "ahmed@gmail.com", cnic: "61101-1234567-1", doctor: "Dr. Sadia Imtiaz", date: "2024-12-15", time: "10:00 AM", type: "OPD", notes: "Regular checkup", status: "Confirmed", bookedAt: "2024-12-10 09:30" },
    { id: "APT-002", name: "Fatima Bibi", phone: "+92-333-9876543", email: "", cnic: "61101-7654321-2", doctor: "Dr. Kamran Sheikh", date: "2024-12-16", time: "11:30 AM", type: "Follow-up", notes: "Blood pressure follow-up", status: "Pending", bookedAt: "2024-12-11 14:20" },
    { id: "APT-003", name: "Usman Ali", phone: "+92-321-5556666", email: "usman@hotmail.com", cnic: "61101-5556666-3", doctor: "Dr. Rehana Malik", date: "2024-12-17", time: "2:00 PM", type: "OPD", notes: "Knee pain physiotherapy", status: "Pending", bookedAt: "2024-12-12 11:10" },
  ]);

  const nav = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addAppointment = (appt: Appointment) => {
    setAppointments((prev) => [appt, ...prev]);
  };

  const updateStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const navLinks: { label: string; page: Page; icon: React.ElementType }[] = [
    { label: "Home", page: "home", icon: Home },
    { label: "Doctors", page: "doctors", icon: UserRound },
    { label: "Appointment", page: "appointment", icon: Calendar },
    { label: "Pharmacy", page: "pharmacy", icon: Pill },
    { label: "Contact", page: "contact", icon: Phone },
  ];

  /* admin overlay — full page, no navbar */
  if (page === "admin") {
    return (
      <AdminPage
        loggedIn={adminLoggedIn}
        onLogin={() => setAdminLoggedIn(true)}
        onLogout={() => { setAdminLoggedIn(false); nav("home"); }}
        appointments={appointments}
        onUpdateStatus={updateStatus}
        onDelete={deleteAppointment}
        onBack={() => nav("home")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background font-[Inter,sans-serif] text-foreground overflow-x-hidden">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="flex items-center gap-2"><MapPin size={12} /> {BRAND.address}</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Clock size={12} /> {BRAND.hours}</span>
            <span className="flex items-center gap-2"><Phone size={12} /> Emergency: {BRAND.emergency}</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => nav("home")} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <HeartPulse size={22} className="text-primary-foreground" />
            </div>
            <div className="text-left">
              <div className="font-[Lora,serif] font-semibold text-primary leading-tight text-sm md:text-base">{BRAND.name}</div>
              <div className="text-muted-foreground text-[10px] tracking-widest uppercase">Federal Health Services</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <button key={l.page} onClick={() => nav(l.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${page === l.page ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {l.label}
              </button>
            ))}
            <button onClick={() => nav("appointment")}
              className="ml-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              Book Now
            </button>
            <button onClick={() => nav("admin")}
              className="ml-2 border border-border text-muted-foreground px-3 py-2 rounded-lg text-xs hover:border-primary hover:text-primary transition-colors flex items-center gap-1.5">
              <Lock size={12} /> Admin
            </button>
          </nav>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <button key={l.page} onClick={() => nav(l.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${page === l.page ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                <l.icon size={16} />{l.label}
              </button>
            ))}
            <button onClick={() => nav("admin")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted">
              <Lock size={16} /> Admin Panel
            </button>
          </div>
        )}
      </header>

      {page === "home" && <HomePage nav={nav} />}
      {page === "doctors" && <DoctorsPage nav={nav} />}
      {page === "appointment" && <AppointmentPage addAppointment={addAppointment} />}
      {page === "pharmacy" && <PharmacyPage />}
      {page === "contact" && <ContactPage />}

      {/* Footer */}
      <footer className="bg-[#0a1f1f] text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
                <HeartPulse size={18} />
              </div>
              <span className="font-[Lora,serif] font-semibold text-accent">{BRAND.short}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">Providing quality healthcare to the people of Islamabad since 1999 under the Federal Government of Pakistan.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {(["home","doctors","appointment","pharmacy","contact"] as Page[]).map((l) => (
                <li key={l}><button onClick={() => nav(l)} className="hover:text-white transition-colors capitalize">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-accent">Active Services</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>General OPD</li><li>Gynecology & Obs</li><li>Physiotherapy</li>
              <li className="text-white/30 text-xs mt-2">More coming soon InshAllah</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-accent">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5 text-accent" />{BRAND.address}</li>
              <li className="flex gap-2"><Phone size={14} className="shrink-0 mt-0.5 text-accent" />{BRAND.phone}</li>
              <li className="flex gap-2"><Mail size={14} className="shrink-0 mt-0.5 text-accent" />{BRAND.email}</li>
              <li className="flex gap-2"><Clock size={14} className="shrink-0 mt-0.5 text-accent" />Mon–Sat 8AM–10PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} {BRAND.name} — Federal Government of Pakistan.</span>
          <button onClick={() => nav("admin")} className="hover:text-white/60 transition-colors flex items-center gap-1">
            <Lock size={10} /> Staff Login
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════
   HOME
════════════════════════════════════════ */
function HomePage({ nav }: { nav: (p: Page) => void }) {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600&h=700&fit=crop&auto=format')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f1f]/92 via-[#0a6e6e]/72 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-xs px-3 py-1.5 rounded-full mb-5 font-medium">
              <ShieldCheck size={13} />
            </div>
            <h1 className="font-[Lora,serif] text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
              Pak Federal<br />Medical Centre
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
              Comprehensive, compassionate healthcare at Khanna Pull, Islamabad. Specialist doctors, a full pharmacy, and 24/7 emergency — all under one roof.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => nav("appointment")}
                className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors flex items-center gap-2">
                <Calendar size={16} /> Book Appointment
              </button>
              <button onClick={() => nav("doctors")}
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                <UserRound size={16} /> Our Doctors
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 text-center">
                <div className="text-3xl font-[Lora,serif] font-semibold text-white">{s.value}</div>
                <div className="text-white/60 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">Our Departments</p>
          <h2 className="font-[Lora,serif] text-3xl font-semibold">Medical Services</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">3 departments active now — more coming soon InshAllah.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <ServiceCard key={s.label} service={s} onBook={() => nav("appointment")} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/40 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=700&h=500&fit=crop&auto=format"
              alt="Doctors in consultation" className="rounded-2xl w-full object-cover shadow-lg bg-muted" style={{ height: 340 }} />
          </div>
          <div>
            <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">Why Choose PFMC</p>
            <h2 className="font-[Lora,serif] text-3xl font-semibold mb-6">Trusted by Thousands of Families</h2>
            <ul className="space-y-4">
              {[
                "Board-certified federal government specialists",
                "State-of-the-art diagnostic equipment & lab",
                "Subsidised treatment for low-income families",
                "In-house pharmacy with 500+ medicines",
                "Dedicated ambulance & emergency trauma unit",
                "Electronic health records & digital prescriptions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle size={16} className="text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => nav("appointment")}
              className="mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors inline-flex items-center gap-2 text-sm">
              Book a Consultation <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">Medical Team</p>
            <h2 className="font-[Lora,serif] text-3xl font-semibold">Meet Our Specialists</h2>
          </div>
          <button onClick={() => nav("doctors")} className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <ChevronRight size={15} />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DOCTORS.slice(0, 3).map((d) => (
            <DoctorCard key={d.id} doctor={d} onBook={() => nav("appointment")} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-primary text-primary-foreground py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-[Lora,serif] text-xl font-semibold">Free OPD on Fridays</p>
            <p className="text-primary-foreground/70 text-sm mt-1">Walk-in consultations every Friday, 9AM–1PM, for all citizens.</p>
          </div>
          <button onClick={() => nav("appointment")}
            className="bg-white text-primary px-6 py-3 rounded-xl font-medium text-sm hover:bg-secondary transition-colors shrink-0">
            Book Now — Free
          </button>
        </div>
      </section>
    </main>
  );
}

/* ── Service Card ── */
function ServiceCard({ service, onBook }: { service: typeof SERVICES[0]; onBook: () => void }) {
  const isActive = service.status === "active";
  return (
    <div className={`bg-card border rounded-2xl overflow-hidden transition-all group ${isActive ? "border-accent/40 hover:shadow-lg hover:border-accent/70" : "border-border hover:shadow-sm opacity-80"}`}>
      <div className="relative h-36 bg-muted overflow-hidden">
        <img src={service.img} alt={service.alt} className={`w-full h-full object-cover transition-transform duration-300 ${isActive ? "group-hover:scale-105" : "grayscale-[60%]"}`} />
        <div className={`absolute inset-0 ${isActive ? "bg-primary/20" : "bg-muted/60"}`} />
        <div className="absolute top-3 left-3">
          {isActive ? (
            <span className="bg-green-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Active Now
            </span>
          ) : (
            <span className="bg-[#0a1f1f]/70 text-white/80 text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock size={9} /> Coming Soon InshAllah
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
          <service.icon size={18} className="text-white" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1">{service.label}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-3">{service.desc}</p>
        {isActive ? (
          <button onClick={onBook}
            className="w-full bg-primary text-primary-foreground text-xs font-medium py-2 rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-1.5">
            <Calendar size={12} /> Book Appointment
          </button>
        ) : (
          <div className="w-full bg-muted text-muted-foreground text-xs font-medium py-2 rounded-lg text-center">
            Not available yet
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   DOCTORS
════════════════════════════════════════ */
function DoctorCard({ doctor, onBook }: { doctor: typeof DOCTORS[0]; onBook?: () => void }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md hover:border-accent/30 transition-all group">
      <div className="relative h-48 bg-muted overflow-hidden">
        <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-xs font-medium text-primary flex items-center gap-1">
          <Star size={10} className="fill-yellow-400 text-yellow-400" /> {doctor.rating}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-base">{doctor.name}</h3>
        <p className="text-accent text-sm font-medium">{doctor.specialty}</p>
        <p className="text-muted-foreground text-xs mt-0.5">{doctor.qualification}</p>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
          <div><p className="text-muted-foreground">Experience</p><p className="font-medium">{doctor.experience}</p></div>
          <div className="text-right"><p className="text-muted-foreground">Available</p><p className="font-medium">{doctor.available.join(", ")}</p></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{doctor.reviews} patient reviews</p>
        {onBook && (
          <button onClick={onBook}
            className="mt-4 w-full bg-secondary text-primary text-sm font-medium py-2.5 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2">
            <Calendar size={14} /> Book Appointment
          </button>
        )}
      </div>
    </div>
  );
}

function DoctorsPage({ nav }: { nav: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const filtered = DOCTORS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">Medical Team</p>
        <h1 className="font-[Lora,serif] text-3xl font-semibold mb-4">Our Specialist Doctors</h1>
        <div className="flex gap-3 flex-wrap items-center">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search by name or specialty…" value={search} onChange={(e) => setSearch(e.target.value)}
              className="bg-input-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary w-72 transition-colors" />
          </div>
          <span className="text-muted-foreground text-sm">{filtered.length} doctors found</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((d) => <DoctorCard key={d.id} doctor={d} onBook={() => nav("appointment")} />)}
      </div>
    </main>
  );
}

/* ════════════════════════════════════════
   APPOINTMENT
════════════════════════════════════════ */
function AppointmentPage({ addAppointment }: { addAppointment: (a: Appointment) => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", cnic: "", doctor: "", date: "", time: "", type: "OPD", notes: "" });
  const [submitted, setSubmitted] = useState<Appointment | null>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const appt: Appointment = {
      id: "APT-" + String(Math.floor(Math.random() * 90000) + 10000),
      ...form,
      status: "Pending",
      bookedAt: new Date().toLocaleString("en-PK"),
    };
    addAppointment(appt);
    setSubmitted(appt);
  };

  if (submitted) return (
    <main className="max-w-lg mx-auto px-6 py-20 text-center">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} className="text-primary" />
      </div>
      <h2 className="font-[Lora,serif] text-2xl font-semibold mb-3">Appointment Confirmed!</h2>
      <div className="bg-card border border-border rounded-2xl p-5 text-left space-y-2 mb-6 text-sm">
        {[
          ["Booking ID", submitted.id],
          ["Patient", submitted.name],
          ["CNIC", submitted.cnic],
          ["Contact", submitted.phone],
          ["Doctor", submitted.doctor],
          ["Date", submitted.date],
          ["Time", submitted.time],
          ["Type", submitted.type],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between border-b border-border pb-2 last:border-0 last:pb-0">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{val}</span>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground text-sm mb-6">An SMS confirmation will be sent to <strong>{submitted.phone}</strong>. Please arrive 15 minutes early with your CNIC.</p>
      <button onClick={() => setSubmitted(null)} className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
        Book Another Appointment
      </button>
    </main>
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">Appointments</p>
        <h1 className="font-[Lora,serif] text-3xl font-semibold mb-6">Book an Appointment</h1>
        <form onSubmit={submit} className="space-y-5">
          {/* Row 1 */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name <span className="text-destructive">*</span></label>
              <input required type="text" placeholder="Muhammad Ali Khan" value={form.name} onChange={(e) => set("name", e.target.value)}
                className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">CNIC / B-Form <span className="text-destructive">*</span></label>
              <input required type="text" placeholder="61101-1234567-1" value={form.cnic} onChange={(e) => set("cnic", e.target.value)}
                className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Phone Number <span className="text-destructive">*</span></label>
              <input required type="tel" placeholder="+92-300-0000000" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)}
                className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          {/* Doctor */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Select Doctor <span className="text-destructive">*</span></label>
            <div className="relative">
              <select required value={form.doctor} onChange={(e) => set("doctor", e.target.value)}
                className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors appearance-none">
                <option value="">— Choose a Specialist —</option>
                {DOCTORS.map((d) => <option key={d.id} value={d.name}>{d.name} – {d.specialty}</option>)}
              </select>
              <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          {/* Date / Time */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Preferred Date <span className="text-destructive">*</span></label>
              <input required type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Preferred Time <span className="text-destructive">*</span></label>
              <div className="relative">
                <select required value={form.time} onChange={(e) => set("time", e.target.value)}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors appearance-none">
                  <option value="">— Select Time Slot —</option>
                  {["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM"].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Appointment Type</label>
            <div className="flex gap-3 flex-wrap">
              {["OPD", "Follow-up", "Emergency", "Lab Test", "Physiotherapy"].map((t) => (
                <button type="button" key={t} onClick={() => set("type", t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${form.type === t ? "bg-primary text-primary-foreground border-primary" : "bg-input-background border-border text-muted-foreground hover:border-primary"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Notes / Symptoms</label>
            <textarea rows={3} placeholder="Briefly describe your symptoms or reason for visit…" value={form.notes} onChange={(e) => set("notes", e.target.value)}
              className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none" />
          </div>
          <button type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2">
            <Calendar size={16} /> Confirm Appointment
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">OPD Hours</h3>
          <ul className="space-y-2.5 text-sm">
            {[["Monday – Friday","8:00 AM – 10:00 PM"],["Saturday","9:00 AM – 6:00 PM"],["Sunday","Emergency Only"],["Emergency (24/7)",BRAND.emergency]].map(([day,time]) => (
              <li key={day} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                <span className="text-muted-foreground">{day}</span>
                <span className="font-medium text-xs">{time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-secondary rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3"><Ambulance size={20} className="text-primary" /><h3 className="font-semibold">Emergency?</h3></div>
          <p className="text-sm text-muted-foreground mb-4">Do not book online for emergencies. Call our 24/7 emergency line immediately.</p>
          <a href={`tel:${BRAND.emergency}`} className="block text-center bg-destructive text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">{BRAND.emergency}</a>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-3">Documents to Bring</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["CNIC / B-Form (mandatory)","Previous prescriptions","Lab / X-Ray reports","Insurance card (if applicable)"].map((d) => (
              <li key={d} className="flex items-start gap-2"><CheckCircle size={13} className="text-accent mt-0.5 shrink-0" />{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

/* ════════════════════════════════════════
   PHARMACY
════════════════════════════════════════ */
function PharmacyPage() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const filtered = MEDICINES.filter((m) => (cat === "All" || m.category === cat) && m.name.toLowerCase().includes(search.toLowerCase()));
  const toggle = (id: number) => setCart((c) => c.includes(id) ? c.filter((x) => x !== id) : [...c, id]);
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">In-House Pharmacy</p>
          <h1 className="font-[Lora,serif] text-3xl font-semibold">Pharmacy & Medicines</h1>
          <p className="text-muted-foreground text-sm mt-1">Subsidised medicines available on valid PFMC prescription.</p>
        </div>
        {cart.length > 0 && (
          <div className="bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
            <Pill size={15} /> {cart.length} item{cart.length > 1 ? "s" : ""} in list
          </div>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search medicines…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-input-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary transition-colors w-full sm:w-64" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {MED_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-input-background border-border text-muted-foreground hover:border-primary"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div key={m.id} className="bg-card border border-border rounded-2xl p-5 hover:shadow-sm hover:border-accent/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center"><Pill size={18} className="text-primary" /></div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${m.stock === "In Stock" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>{m.stock}</span>
            </div>
            <h3 className="font-semibold text-base">{m.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 mb-1">{m.desc}</p>
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{m.category}</span>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-primary font-semibold text-lg">{m.price}</span>
              <button onClick={() => toggle(m.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${cart.includes(m.id) ? "bg-primary text-primary-foreground" : "bg-secondary text-primary hover:bg-primary/10"}`}>
                {cart.includes(m.id) ? "Added" : "Add to List"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-secondary border border-border rounded-2xl p-5 flex gap-4 items-start">
        <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium mb-1">Prescription Required</p>
          <p className="text-muted-foreground">All prescription medications require a valid PFMC prescription. Present it at the pharmacy counter (Ground Floor, Block B). Hours: Mon–Sat 8AM–10PM.</p>
        </div>
      </div>
    </main>
  );
}

/* ════════════════════════════════════════
   CONTACT
════════════════════════════════════════ */
function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">Get in Touch</p>
        <h1 className="font-[Lora,serif] text-3xl font-semibold">Contact Us</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Centre Information</h3>
            <ul className="space-y-4">
              {[{icon:MapPin,label:"Address",val:BRAND.address},{icon:Phone,label:"Main Reception",val:BRAND.phone},{icon:Phone,label:"Emergency Line",val:BRAND.emergency},{icon:Mail,label:"Email",val:BRAND.email},{icon:Clock,label:"OPD Hours",val:"Mon–Sat: 8:00 AM – 10:00 PM"}].map((item) => (
                <li key={item.label} className="flex gap-3 items-start text-sm border-b border-border pb-4 last:border-0 last:pb-0">
                  <item.icon size={16} className="text-accent mt-0.5 shrink-0" />
                  <div><span className="text-muted-foreground block text-xs">{item.label}</span><span className="font-medium">{item.val}</span></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border h-56 bg-muted relative">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&h=400&fit=crop&auto=format" alt="Map Islamabad" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-primary/20 backdrop-blur-[1px]">
              <MapPin size={28} className="text-primary mb-2" />
              <p className="font-semibold text-sm">Khanna Pull, Street 1</p>
              <p className="text-xs text-muted-foreground">Near TM CNG, Islamabad</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-7">
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle size={44} className="text-primary mx-auto mb-4" />
              <h3 className="font-[Lora,serif] text-xl font-semibold mb-2">Message Received!</h3>
              <p className="text-muted-foreground text-sm mb-6">We will get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="bg-secondary text-primary px-5 py-2.5 rounded-xl text-sm font-medium">Send Another</button>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-lg mb-5 flex items-center gap-2"><MessageSquare size={18} className="text-accent" /> Send a Message</h3>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Your Name *</label>
                    <input required type="text" placeholder="Full name" value={form.name} onChange={(e) => set("name", e.target.value)}
                      className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone *</label>
                    <input required type="tel" placeholder="+92-300-0000000" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                      className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Subject</label>
                  <input type="text" placeholder="Appointment inquiry, complaint…" value={form.subject} onChange={(e) => set("subject", e.target.value)}
                    className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Message *</label>
                  <textarea required rows={5} placeholder="How can we help you?" value={form.message} onChange={(e) => set("message", e.target.value)}
                    className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2 text-sm">
                  <Mail size={15} /> Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

/* ════════════════════════════════════════
   ADMIN
════════════════════════════════════════ */
function AdminPage({
  loggedIn, onLogin, onLogout, appointments, onUpdateStatus, onDelete, onBack,
}: {
  loggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  appointments: Appointment[];
  onUpdateStatus: (id: string, s: Appointment["status"]) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}) {
  if (!loggedIn) return <AdminLogin onLogin={onLogin} onBack={onBack} />;
  return <AdminDashboard appointments={appointments} onUpdateStatus={onUpdateStatus} onDelete={onDelete} onLogout={onLogout} />;
}

function AdminLogin({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setError(false); onLogin(); }
    else { setError(true); setPw(""); }
  };
  return (
    <div className="min-h-screen bg-[#0a1f1f] flex items-center justify-center px-4 font-[Inter,sans-serif]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/30 border border-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-accent" />
          </div>
          <h1 className="font-[Lora,serif] text-2xl font-semibold text-white">Admin Portal</h1>
          <p className="text-white/50 text-sm mt-1">Pak Federal Medical Centre</p>
        </div>
        <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-4">
          <div>
            <label className="block text-white/70 text-sm font-medium mb-1.5">Admin Password</label>
            <input type="password" placeholder="Enter password" value={pw} onChange={(e) => { setPw(e.target.value); setError(false); }} autoFocus
              className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition-colors ${error ? "border-destructive" : "border-white/20 focus:border-accent"}`} />
            {error && (
              <p className="text-destructive text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Incorrect password. Try again.</p>
            )}
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2">
            <Lock size={15} /> Login to Admin Panel
          </button>
        </form>
        <p className="text-center text-white/30 text-xs mt-4">Hint: <span className="font-mono">pfmc@2024</span></p>
        <button onClick={onBack} className="mt-4 w-full text-white/40 text-sm hover:text-white/70 transition-colors">← Back to Website</button>
      </div>
    </div>
  );
}

function AdminDashboard({
  appointments, onUpdateStatus, onDelete, onLogout,
}: {
  appointments: Appointment[];
  onUpdateStatus: (id: string, s: Appointment["status"]) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | Appointment["status"]>("All");
  const [activeTab, setActiveTab] = useState<"appointments" | "stats">("appointments");

  const filtered = appointments.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) || a.doctor.toLowerCase().includes(search.toLowerCase()) || a.id.includes(search);
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "Pending").length,
    confirmed: appointments.filter((a) => a.status === "Confirmed").length,
    cancelled: appointments.filter((a) => a.status === "Cancelled").length,
  };

  const doctorCounts = DOCTORS.map((d) => ({
    name: d.name.replace("Dr. ", ""),
    count: appointments.filter((a) => a.name && a.doctor === d.name).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-[#f0f5f5] font-[Inter,sans-serif]">
      {/* Admin header */}
      <header className="bg-[#0a1f1f] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-primary/40 rounded-xl flex items-center justify-center">
            <HeartPulse size={18} className="text-accent" />
          </div>
          <div>
            <p className="font-semibold text-sm">Admin Dashboard</p>
            <p className="text-white/40 text-xs">Pak Federal Medical Centre</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={18} className="text-white/50" />
            {counts.pending > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-[9px] font-bold rounded-full flex items-center justify-center">{counts.pending}</span>
            )}
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Appointments", value: counts.total, icon: CalendarCheck, color: "text-primary bg-secondary" },
            { label: "Pending", value: counts.pending, icon: Clock, color: "text-yellow-700 bg-yellow-50" },
            { label: "Confirmed", value: counts.confirmed, icon: CheckCircle, color: "text-green-700 bg-green-50" },
            { label: "Cancelled", value: counts.cancelled, icon: X, color: "text-destructive bg-red-50" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-border rounded-2xl p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-[Lora,serif] font-semibold">{s.value}</p>
                <p className="text-muted-foreground text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["appointments", "stats"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${activeTab === t ? "bg-primary text-white" : "bg-white border border-border text-muted-foreground hover:border-primary"}`}>
              {t === "appointments" ? <span className="flex items-center gap-2"><CalendarCheck size={14} /> Appointments</span> : <span className="flex items-center gap-2"><BarChart3 size={14} /> Overview</span>}
            </button>
          ))}
        </div>

        {activeTab === "appointments" && (
          <>
            {/* Filters */}
            <div className="bg-white border border-border rounded-2xl p-4 mb-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search by name, ID, doctor…" value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-input-background border border-border rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["All", "Pending", "Confirmed", "Cancelled"] as const).map((s) => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${filterStatus === s ? "bg-primary text-white border-primary" : "bg-input-background border-border text-muted-foreground hover:border-primary"}`}>
                    {s}
                  </button>
                ))}
              </div>
              <span className="text-muted-foreground text-xs ml-auto">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {/* Table */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              {filtered.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground text-sm">No appointments found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">ID</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Patient</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Doctor</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date & Time</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((a, i) => (
                        <tr key={a.id} className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors text-foreground ${i % 2 === 0 ? "bg-white" : "bg-muted/20"}`}>
                          <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground whitespace-nowrap">{a.id}</td>
                          <td className="px-5 py-3.5 min-w-[140px]">
                            <p className="text-sm font-semibold text-foreground leading-snug">{a.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{a.cnic || "—"}</p>
                          </td>
                          <td className="px-5 py-3.5 min-w-[130px]">
                            <p className="text-xs text-foreground">{a.phone}</p>
                            {a.email && <p className="text-xs text-muted-foreground mt-0.5">{a.email}</p>}
                          </td>
                          <td className="px-5 py-3.5 text-xs text-foreground min-w-[150px]">{a.doctor}</td>
                          <td className="px-5 py-3.5 min-w-[110px]">
                            <p className="text-xs font-medium text-foreground">{a.date}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full whitespace-nowrap">{a.type}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <select value={a.status} onChange={(e) => onUpdateStatus(a.id, e.target.value as Appointment["status"])}
                              className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border-0 outline-none cursor-pointer appearance-none ${a.status === "Confirmed" ? "bg-green-100 text-green-700" : a.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-5 py-3.5">
                            <button onClick={() => onDelete(a.id)} title="Delete appointment"
                              className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-lg hover:bg-red-50">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "stats" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Doctor load */}
            <div className="bg-white border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-5 flex items-center gap-2"><Users size={16} className="text-accent" /> Appointments by Doctor</h3>
              <div className="space-y-3">
                {doctorCounts.map((d) => {
                  const pct = counts.total > 0 ? Math.round((d.count / counts.total) * 100) : 0;
                  return (
                    <div key={d.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{d.name}</span>
                        <span className="font-medium">{d.count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status breakdown */}
            <div className="bg-white border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-5 flex items-center gap-2"><BarChart3 size={16} className="text-accent" /> Status Breakdown</h3>
              <div className="space-y-4">
                {[
                  { label: "Confirmed", count: counts.confirmed, color: "bg-green-500" },
                  { label: "Pending", count: counts.pending, color: "bg-yellow-400" },
                  { label: "Cancelled", count: counts.cancelled, color: "bg-destructive" },
                ].map((s) => {
                  const pct = counts.total > 0 ? Math.round((s.count / counts.total) * 100) : 0;
                  return (
                    <div key={s.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>{s.label}</span>
                        <span className="font-semibold">{s.count} <span className="text-muted-foreground font-normal text-xs">({pct}%)</span></span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-5 border-t border-border text-center">
                <p className="text-3xl font-[Lora,serif] font-semibold text-primary">{counts.total}</p>
                <p className="text-muted-foreground text-xs mt-1">Total Appointments Registered</p>
              </div>
            </div>

            {/* Recent */}
            <div className="md:col-span-2 bg-white border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Recent Bookings</h3>
              <div className="space-y-3">
                {appointments.slice(0, 5).map((a) => (
                  <div key={a.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center text-primary font-semibold text-sm">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.doctor} — {a.date} {a.time}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${a.status === "Confirmed" ? "bg-green-100 text-green-700" : a.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
