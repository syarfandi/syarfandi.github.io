import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Download, ChevronDown, Award, Briefcase, GraduationCap, Code, Github, Star, GitFork, Moon, Sun, Languages, Shield, Layout, Monitor, Cpu, FileText } from 'lucide-react';

const translations = {
  id: {
    heroRole: "IT Professional, DevSecOps & Developer",
    heroGreeting: "Hai, Saya",
    heroDesc: "Bersemangat dalam membangun solusi digital yang berdampak, membina kerja sama tim yang solid, dan menghadirkan inovasi layanan publik yang prima.",
    hireMe: "Rekrut Saya",
    resume: "Pilih Resume",
    selectResume: "Pilih Versi Resume",
    close: "Tutup",
    aboutMe: "Tentang",
    me: "Saya",
    aboutDesc: "Saya memiliki semangat alami untuk bekerja dalam tim untuk mencapai tim yang solid dan berkarakter. Memiliki kemampuan komunikasi yang baik, dapat bekerja dengan cepat dan efisien, serta selalu berkomitmen untuk memberikan pelayanan terbaik.",
    location: "Lokasi",
    education: "Pendidikan",
    yearsExp: "Tahun Pengalaman",
    projectsDelivered: "Proyek Selesai",
    commitment: "Komitmen",
    publicSector: "Pakar Sektor Publik",
    retailIndustry: "Pakar Industri Retail",
    bizSector: "Biz",
    professional: "Perjalanan",
    journey: "Profesional",
    present: "Sekarang",
    featured: "Proyek",
    projects: "Pilihan",
    viewRepo: "Lihat Repositori",
    privateRepo: "Repositori Privat",
    core: "Kompetensi",
    competencies: "Inti",
    coreDesc: "Keahlian teknis dan manajerial yang dibangun selama bertahun-tahun dalam mengelola infrastruktur IT, keamanan siber, dan pengembangan aplikasi interaktif.",
    certifications: "Sertifikasi",
    awards: "& Penghargaan",
    readyCollab: "Siap",
    collaborate: "Berkolaborasi?",
    discussValue: "Mari diskusikan bagaimana keahlian saya dapat memberikan nilai tambah bagi tim Anda.",
    email: "Email",
    phone: "Telepon/WA",
    address: "Alamat",
    allRightsReserved: "Hak Cipta Dilindungi.",
    openSource: "Karya Kode",
    contributions: "& Inovasi Digital",
    loadingRepos: "Memuat repositori...",

    // Experiences
    exp9Title: "Pranata Komputer (ASN)",
    exp9Company: "Kanwil Kementerian Agama Prov. Sulawesi Selatan",
    exp9Desc: "Mengelola transformasi digital layanan keagamaan, infrastruktur portal data (Data Sulsel), dan keamanan sistem informasi publik di lingkungan wilayah Sulawesi Selatan.",

    exp1Title: "Tenaga Ahli DevSecOps & Infrastruktur",
    exp1Company: "Dinas Kominfo & Disbud Kota Makassar",
    exp1Desc: "Mengelola infrastruktur Makassar Metaverse (Makaverse), Virtual Tour Lorong Wisata, Virtual Museum Makassar, dan server email pemerintah.",

    exp7Title: "SQA & DevSecOps Engineer",
    exp7Company: "Malmora (Startup)",
    exp7Desc: "Platform reseller & dropship produk muslim yang berfokus di Sulawesi dan Indonesia Timur, memudahkan pengguna berjualan online tanpa ribet logistik.",

    exp8Title: "Co-Founder",
    exp8Company: "GetKasir (Startup)",
    exp8Desc: "Memimpin visi strategis, pengembangan bisnis, dan arsitektur teknologi untuk ekosistem retail enterprise dengan 100+ modul.",

    exp2Title: "Staff Admin",
    exp2Company: "PT. Hammer Konstruksi Indonesia",
    exp2Desc: "Manajemen data operasional perusahaan, dokumentasi mitra strategis, dan koordinasi teknis lapangan untuk proyek konstruksi.",

    exp3Title: "Staff Admin HD/ODC",
    exp3Company: "PT. Mutiara Jaya Perkasa",
    exp3Desc: "Pemeliharaan infrastruktur jaringan, troubleshooting sistem komputer, dan perancangan denah fiber optik menggunakan AutoCAD.",

    exp4Title: "Freelance AR/VR Developer",
    exp4Company: "Self-Employed",
    exp4Desc: "Mengembangkan berbagai aplikasi interaktif 3D (Al-Haram VR, BSD City VR, Zoo VR) dan memenangkan Samsung Indonesia Next Apps 4.0 Challenge.",

    exp5Title: "Sekretaris",
    exp5Company: "Masjid Nurul Huda",
    exp5Desc: "Mengelola administrasi organisasi, koordinasi pengurus periode 2021-2026, dan optimalisasi manajemen aset komunitas.",

    exp6Title: "Badan Pengurus Organisasi",
    exp6Company: "EXOMATIK Study Club",
    exp6Desc: "Menetapkan visi organisasi, strategi pengembangan anggota, serta menciptakan lingkungan belajar inklusif bagi mahasiswa IT.",

    // Project types
    typeVR: "VR/AR & Metaverse",
    typeWeb: "Web & Enterprise",
    typeInfra: "Infrastruktur IT",
    typeSecurity: "Keamanan Siber",

    // Certificates details
    certBSSN: "National Cyber Exercise #10 - BSSN",
    certSamsung: "Winner Top 10 - Samsung Indonesia Next Apps 4.0 Gear VR Challenge",
    certEnglish: "IELTS 5.5 & TOEFL Proficiency - Access English School",
    certBlender: "Workshop Animasi Blender 3D",
    certCityApp: "Microsoft CityApp Appathon Participant"
  },
  en: {
    heroRole: "IT Professional, DevSecOps & Developer",
    heroGreeting: "Hi, I'm",
    heroDesc: "Passionate about building impactful digital solutions, fostering solid teamwork, and delivering excellent public service innovations.",
    hireMe: "Hire Me",
    resume: "Select Resume",
    selectResume: "Select Resume Version",
    close: "Close",
    aboutMe: "About",
    me: "Me",
    aboutDesc: "I have a natural passion for working in a team to achieve a solid and character-driven dynamic. I possess good communication skills, can work quickly and efficiently, and am always committed to providing the best service.",
    location: "Location",
    education: "Education",
    yearsExp: "Years Experience",
    projectsDelivered: "Projects Delivered",
    commitment: "Commitment",
    publicSector: "Public Sector Expert",
    retailIndustry: "Retail Industry Expert",
    bizSector: "Biz",
    professional: "Professional",
    journey: "Journey",
    present: "Present",
    featured: "Featured",
    projects: "Projects",
    viewRepo: "View Repository",
    privateRepo: "Private Repository",
    core: "Core",
    competencies: "Competencies",
    coreDesc: "Technical and managerial expertise built over years of managing IT infrastructure, cyber security, and interactive application development.",
    certifications: "Certifications",
    awards: "& Awards",
    readyCollab: "Ready to",
    collaborate: "Collaborate?",
    discussValue: "Let's discuss how my expertise can add value to your team.",
    email: "Email",
    phone: "Phone/WA",
    address: "Address",
    allRightsReserved: "All rights reserved.",
    openSource: "Code Works",
    contributions: "& Digital Innovation",
    loadingRepos: "Loading repositories...",

    // Experiences
    exp9Title: "Computer Specialist (Civil Servant)",
    exp9Company: "Ministry of Religious Affairs (South Sulawesi)",
    exp9Desc: "Managing digital transformation for religious services, regional data portal infrastructure (Data Sulsel), and public information system security.",

    exp1Title: "DevSecOps & Infrastructure Expert",
    exp1Company: "Dinas Kominfo & Disbud Makassar",
    exp1Desc: "Managing infrastructure for Makassar Metaverse (Makaverse), Virtual Tour Lorong Wisata, Virtual Museum Makassar, and gov email servers.",

    exp7Title: "SQA & DevSecOps Engineer",
    exp7Company: "Malmora (Startup)",
    exp7Desc: "Reseller & dropship platform for Muslim products in Sulawesi and Eastern Indonesia, simplifying online selling by handling logistics.",

    exp8Title: "Co-Founder",
    exp8Company: "GetKasir (Startup)",
    exp8Desc: "Leading strategic vision, business development, and technology architecture for an enterprise retail ecosystem with 100+ modules.",

    exp2Title: "Admin Staff",
    exp2Company: "PT. Hammer Konstruksi Indonesia",
    exp2Desc: "Management of company operational data, strategic partner documentation, and field technical coordination for construction projects.",

    exp3Title: "Admin Staff HD/ODC",
    exp3Company: "PT. Mutiara Jaya Perkasa",
    exp3Desc: "Maintenance of network infrastructure, computer system troubleshooting, and fiber optic plan design using AutoCAD.",

    exp4Title: "Freelance AR/VR Developer",
    exp4Company: "Self-Employed",
    exp4Desc: "Developed various interactive 3D applications (Al-Haram VR, BSD City VR, Zoo VR) and won Samsung Indonesia Next Apps 4.0 Challenge.",

    exp5Title: "Secretary",
    exp5Company: "Nurul Huda Mosque",
    exp5Desc: "Managed organizational administration, coordinated the 2021-2026 board, and optimized community asset management.",

    exp6Title: "Organization Board",
    exp6Company: "EXOMATIK Study Club",
    exp6Desc: "Defined organizational vision, member development strategies, and created an inclusive learning environment for IT students.",

    // Project types
    typeVR: "VR/AR & Metaverse",
    typeWeb: "Web & Enterprise",
    typeInfra: "IT Infrastructure",
    typeSecurity: "Cyber Security",

    // Certificates details
    certBSSN: "National Cyber Exercise #10 - BSSN",
    certSamsung: "Winner Top 10 - Samsung Indonesia Next Apps 4.0 Gear VR Challenge",
    certEnglish: "IELTS 5.5 & TOEFL Proficiency - Access English School",
    certBlender: "Blender 3D Animation Workshop",
    certCityApp: "Microsoft CityApp Appathon Participant"
  }
};

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.location.pathname === '/devops' || window.location.pathname === '/devops/') {
      window.location.href = '/devops/index.html';
      return;
    }
    document.documentElement.className = 'light';
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
  };

  const toggleLang = () => setLang(lang === 'id' ? 'en' : 'id');
  const t = (key) => translations[lang][key] || key;

  return (
    <ThemeContext.Provider value={{ lang, theme, t, toggleTheme, toggleLang }}>
      <div className="app-container">
        <motion.div className="progress-bar" style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-color)', transformOrigin: '0%', zIndex: 100 }} />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <PortfolioSection />
        <GithubSection />
        <SkillsSection />
        <CertificatesSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

const Navbar = () => {
  const { theme, toggleTheme, lang, toggleLang } = useTheme();
  return (
    <div className="navbar-container">
      <button onClick={toggleLang} className="glass nav-btn">
        <Languages size={18} color="var(--primary-color)" />
        <span style={{ color: 'var(--text-primary)' }}>{lang === 'id' ? 'ID' : 'EN'}</span>
      </button>
      <button onClick={toggleTheme} className="glass nav-btn icon-only">
        {theme === 'light' ? <Moon size={20} color="var(--primary-color)" /> : <Sun size={20} color="var(--primary-color)" />}
      </button>
    </div>
  );
};

const HeroSection = () => {
  const { t } = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const resumeOptions = [
    { title: "DevSecOps Engineer", path: "/devops/" },
    { title: "Cloud Engineer", path: "/cloud/" },
    { title: "Frontend Developer", path: "/frontend/" },
    { title: "Backend Developer", path: "/backend/" },
    { title: "Fullstack Developer", path: "/fullstack/" },
    { title: "Mobile Developer", path: "/mobile/" },
    { title: "Data Scientist", path: "/data-scientist/" },
    { title: "Data Analyst", path: "/data-analyst/" },
    { title: "System Administrator", path: "/sysadmin/" },
    { title: "Data Engineer", path: "/data-engineer/" },
    { title: "Product Manager", path: "/product-manager/" }
  ];

  return (
    <section ref={ref} className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <motion.div style={{ y, opacity }} className="container hero-content">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hero-image-container"
          >
            <div className="image-stack">
              <div className="image-bg-blob"></div>
              <img src="/Andi.png" alt='Syarfandi "Andi" Achmad' className="hero-img-main" />
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="floating-card glass"
              >
                <Shield size={20} color="var(--primary-color)" />
                <span>Expert Infrastructure</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-text-container"
          >
            <h2 className="hero-subheading">{t('heroRole')}</h2>
            <h1 className="hero-title">
              {t('heroGreeting')} <br />
              <span className="text-gradient">Syarfandi "Andi" Achmad</span>
            </h1>
            <p className="hero-description">{t('heroDesc')}</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary glass">{t('hireMe')}</a>
              <button onClick={() => setShowResumeModal(!showResumeModal)} className="btn btn-outline glass">
                <span style={{ color: 'var(--text-primary)' }}>{t('resume')}</span>
              </button>
            </div>

            <motion.div
              initial={false}
              animate={{ height: showResumeModal ? 'auto' : 0, opacity: showResumeModal ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="resume-modal-inline"
            >
              <div className="glass resume-options-grid">
                {resumeOptions.map((opt, i) => (
                  <a key={i} href={opt.path} target="_blank" rel="noreferrer" className="glass resume-opt-btn">
                    <span>{opt.title}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, color: 'var(--text-primary)' }}>
        <ChevronDown size={32} />
      </motion.div>
      <style>{`
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(120px); z-index: -1; opacity: 0.2; }
        .orb-1 { background: var(--primary-color); width: 600px; height: 600px; top: -200px; left: -200px; }
        .orb-2 { background: var(--secondary-color); width: 700px; height: 700px; bottom: -300px; right: -200px; }
        .hero-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 4rem; align-items: center; }
        .hero-title { fontSize: clamp(3rem, 8vw, 6rem); lineHeight: 1.2; marginBottom: 3.5rem; fontWeight: 800; }
        .hero-subheading { fontSize: 1.5rem; color: var(--primary-color); marginBottom: 2.5rem; letterSpacing: 0.2em; textTransform: uppercase; fontWeight: 700; }
        .hero-description { fontSize: 1.25rem; color: var(--text-secondary); maxWidth: 750px; marginBottom: 6rem; line-height: 1.8; }
        .hero-buttons { display: flex; gap: 2.5rem; flex-wrap: wrap; margin-top: 2rem; }
        .resume-modal-inline { overflow: hidden; margin-top: 2rem; }
        .resume-options-grid { padding: 1.5rem; border-radius: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.75rem; }
        .resume-opt-btn { text-decoration: none; padding: 0.85rem; border-radius: 12px; display: flex; alignItems: center; justifyContent: center; transition: all 0.2s ease; text-align: center; }
        .resume-opt-btn span { color: var(--text-primary); fontSize: 0.95rem; fontWeight: 600; }
        
        .hero-image-container { position: relative; }
        .image-stack { position: relative; width: 100%; max-width: 450px; margin: 0 auto; }
        .image-bg-blob { position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; filter: blur(40px); opacity: 0.4; animation: morph 6s ease-in-out infinite; z-index: 0; }
        .hero-img-main { position: relative; width: 100%; height: auto; border-radius: 30px; z-index: 1; filter: drop-shadow(0 20px 50px rgba(0,0,0,0.1)); }
        .floating-card { position: absolute; bottom: 20px; left: -30px; padding: 1rem 1.5rem; border-radius: 20px; display: flex; align-items: center; gap: 0.75rem; z-index: 2; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .floating-card span { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }

        @keyframes morph {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 3rem; }
          .hero-buttons { justify-content: center; }
          .hero-description { margin-inline: auto; }
          .hero-image-container { order: -1; }
          .image-stack { max-width: 350px; }
        }

        .btn { display: inline-flex; align-items: center; padding: 1.2rem 2.5rem; font-weight: 700; font-size: 1.1rem; border-radius: 50px; transition: all 0.3s ease; cursor: pointer; }
        .btn-primary { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white !important; border: none; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(30, 58, 138, 0.4); }
        .btn-outline { border: 1px solid var(--glass-border); }
        .btn-outline:hover { background: var(--surface-color); }
        .resume-opt-btn:hover { background: var(--primary-color) !important; transform: translateY(-3px); }
        .resume-opt-btn:hover span { color: white !important; }
      `}</style>
    </section>
  );
};

const AboutSection = () => {
  const { t } = useTheme();
  return (
    <section id="about" className="container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="glass about-card">
        <div className="about-grid">
          <div>
            <h2 className="heading-secondary" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>{t('aboutMe')} <span className="text-gradient">{t('me')}</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1rem' }}>{t('aboutDesc')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
              <div className="info-item">
                <MapPin color="var(--primary-color)" size={24} />
                <div><h4 style={{ color: 'var(--text-primary)' }}>{t('location')}</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Makassar, Indonesia</p></div>
              </div>
              <div className="info-item">
                <GraduationCap color="var(--primary-color)" size={24} />
                <div><h4 style={{ color: 'var(--text-primary)' }}>{t('education')}</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>S1 Teknik Informatika (GPA: 3.22)</p></div>
              </div>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card glass"><h3 className="text-gradient">8+</h3><p>{t('yearsExp')}</p></div>
            <div className="stat-card glass"><h3 className="text-gradient">20+</h3><p>{t('projectsDelivered')}</p></div>
            <div className="stat-card glass"><h3 className="text-gradient">100%</h3><p>{t('commitment')}</p></div>
            <div className="stat-card glass"><h3 className="text-gradient">Gov</h3><p>{t('publicSector')}</p></div>
            <div className="stat-card glass"><h3 className="text-gradient">{t('bizSector')}</h3><p>{t('retailIndustry')}</p></div>
          </div>
        </div>
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Cpu color="var(--primary-color)" size={32} />
            <div><h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Modern Architecture</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Vite + React 18 for high speed</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Monitor color="var(--primary-color)" size={32} />
            <div><h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Premium UX</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Framer Motion for fluid interactions</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Shield color="var(--primary-color)" size={32} />
            <div><h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Enterprise Ready</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Supabase + PM2 for reliability</p></div>
          </div>
        </div>
      </motion.div>
      <style>{`
        .about-card { padding: 4rem; }
        .about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; align-items: center; }
        .info-item { display: flex; align-items: flex-start; gap: 1rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; }
        .stat-card { padding: 2rem; text-align: center; transition: transform 0.3s ease; }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-card h3 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .stat-card p { color: var(--text-secondary); font-size: 0.9rem; font-weight: 500; }
        
        @media (max-width: 1024px) { 
          .about-grid { grid-template-columns: 1fr; gap: 2rem; } 
          .about-card { padding: 3rem; }
        }
        @media (max-width: 600px) {
          .about-card { padding: 2rem 1.5rem; text-align: center; }
          .info-item { flex-direction: column; align-items: center; text-align: center; }
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .stat-card { padding: 1.5rem 1rem; }
          .stat-card h3 { font-size: 1.8rem; }
        }
      `}</style>
    </section>
  );
};

const ExperienceSection = () => {
  const { t } = useTheme();
  const experiences = [
    { title: t('exp9Title'), company: t('exp9Company'), period: `2025 - ${t('present')}`, desc: t('exp9Desc') },
    { title: t('exp1Title'), company: t('exp1Company'), period: "2023 - 2025", desc: t('exp1Desc') },
    { title: t('exp8Title'), company: t('exp8Company'), period: `2019 - ${t('present')}`, desc: t('exp8Desc') },
    { title: t('exp7Title'), company: t('exp7Company'), period: "2020 - 2023", desc: t('exp7Desc') },
    { title: t('exp2Title'), company: t('exp2Company'), period: "2020 - 2023", desc: t('exp2Desc') },
    { title: t('exp5Title'), company: t('exp5Company'), period: "2021 - 2026", desc: t('exp5Desc') },
    { title: t('exp3Title'), company: t('exp3Company'), period: "2018 - 2019", desc: t('exp3Desc') },
    { title: t('exp6Title'), company: t('exp6Company'), period: "2014 - 2017", desc: t('exp6Desc') },
    { title: t('exp4Title'), company: t('exp4Company'), period: "2016 - 2019", desc: t('exp4Desc') },
  ];
  return (
    <section id="experience" className="container">
      <h2 className="heading-secondary">{t('professional')} <span className="text-gradient">{t('journey')}</span></h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.1 }} key={index} className="timeline-item glass">
            <div className="timeline-icon"><Briefcase size={20} /></div>
            <div className="timeline-content">
              <span className="period">{exp.period}</span>
              <h3 style={{ color: 'var(--text-primary)' }}>{exp.title}</h3>
              <h4 className="company">{exp.company}</h4>
              <p>{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        .timeline { position: relative; max-width: 800px; margin: 0 auto; }
        .timeline::before { content: ''; position: absolute; top: 0; left: 24px; height: 100%; width: 2px; background: var(--glass-border); }
        .timeline-item { position: relative; margin-bottom: 2rem; padding: 2rem; margin-left: 60px; }
        .timeline-icon { position: absolute; left: -60px; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; border-radius: 50%; background: var(--bg-color); border: 2px solid var(--primary-color); display: flex; align-items: center; justify-content: center; color: var(--primary-color); z-index: 1; }
        .period { color: var(--accent-color); font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; display: inline-block; }
        .timeline-content h3 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .company { color: var(--text-secondary); font-weight: 400; margin-bottom: 1rem; }
        .timeline-content p { color: var(--text-secondary); font-size: 0.95rem; }
        @media (max-width: 768px) { .timeline::before { left: 20px; } .timeline-item { margin-left: 50px; padding: 1.5rem; } .timeline-icon { left: -50px; width: 40px; height: 40px; } }
      `}</style>
    </section>
  );
};

const PortfolioSection = () => {
  const { t } = useTheme();
  const projects = [
    { title: "Makaverse (Makassar Metaverse)", link: "makaverse.makassarkota.go.id", type: t('typeVR'), icon: <Layout size={20} /> },
    { title: "Malmora (Reseller & Dropship)", link: "malmora.com", type: t('typeWeb'), icon: <Layout size={20} /> },
    { title: "Virtual Museum Makassar", link: "dikemas.makassarkota.go.id/virtualtour", type: t('typeVR'), icon: <Monitor size={20} /> },
    { title: "Al-Haram VR", link: null, type: t('typeVR'), icon: <Layout size={20} /> },
    { title: "Email Server Makassar Gov", link: "surat.makassarkota.go.id", type: t('typeInfra'), icon: <Cpu size={20} /> },
    { title: "Helpdesk Kota Makassar", link: "helpdesk.makassarkota.go.id", type: t('typeWeb'), icon: <Code size={20} /> },
    { title: "Paralluta (Lalu Lintas)", link: null, type: t('typeWeb'), icon: <Code size={20} /> },
    { title: "SOP Pelaporan Insiden Siber", link: null, type: t('typeSecurity'), icon: <Shield size={20} /> },
  ];
  return (
    <section id="portfolio" className="container">
      <h2 className="heading-secondary">{t('featured')} <span className="text-gradient">{t('projects')}</span></h2>
      <div className="portfolio-grid">
        {projects.map((project, idx) => (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: idx * 0.05 }} key={idx} className="portfolio-card glass">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="badge">{project.type}</span>
              <div style={{ color: 'var(--primary-color)' }}>{project.icon}</div>
            </div>
            <h3 style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
            {project.link && (
              <a href={"https://" + project.link} target="_blank" rel="noreferrer" className="project-link">{project.link} <ExternalLink size={16} /></a>
            )}
          </motion.div>
        ))}
      </div>
      <style>{`
        .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
        @media (max-width: 600px) { 
          .portfolio-grid { grid-template-columns: 1fr; } 
          .portfolio-card { text-align: center; align-items: center; }
          .card-header { flex-direction: column; gap: 1rem; align-items: center; }
        }
        .portfolio-card { padding: 2rem; display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .portfolio-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2); border-color: rgba(99, 102, 241, 0.3); }
        .card-header { margin-bottom: 1.5rem; }
        .badge { background: rgba(20, 184, 166, 0.1); color: var(--accent-color); padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; }
        .portfolio-card h3 { font-size: 1.2rem; margin-bottom: 1rem; flex-grow: 1; }
        .project-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--primary-color); font-size: 0.9rem; font-weight: 500; transition: all 0.3s ease; }
        .project-link:hover { color: var(--secondary-color); }
      `}</style>
    </section>
  );
};

const GithubSection = () => {
  const { t, lang } = useTheme();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatName = (name) => {
    const mapping = {
      'asistenvirtual': 'Lipsync Realtime Avatar AI',
      'datasulsel': 'Portal Data Sulsel',
      'kawansedarah': 'Kawan Sedarah (Blood Stock)',
      'getkasir': 'GetKasir Enterprise POS',
      'kegiatansulsel': 'Manajemen Kegiatan Sulsel',
      'ppidparepare': 'PPID Kemenag Kota Parepare',
      'syarfandi.github.io': 'Professional Portfolio'
    };
    if (mapping[name]) return mapping[name];
    return name.split(/[-._]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const privateRepos = [
    { id: 'private-asistenvirtual', name: 'asistenvirtual', url: 'https://asistenvirtual.ai', description: lang === 'id' ? 'Aplikasi Conversational AI canggih berbasis web yang menggabungkan kecerdasan buatan mutakhir (Lipsync Realtime, Voice AI, LLM) dengan antarmuka visual yang memukau.' : 'Advanced web-based Conversational AI app combining cutting-edge AI (Lipsync Realtime, Voice AI, LLM) with stunning visual interfaces.', language: 'TypeScript', stargazers_count: 0, forks_count: 0, isPrivate: true },
    { id: 'private-datasulsel', name: 'datasulsel', url: 'https://datasulsel.com', description: lang === 'id' ? 'Portal data terpadu untuk pengelolaan, monitoring, dan analisis statistik data keagamaan di seluruh wilayah Sulawesi Selatan secara real-time.' : 'Integrated data portal for real-time management, monitoring, and analysis of religious statistical data across South Sulawesi.', language: 'PLpgSQL', stargazers_count: 0, forks_count: 0, isPrivate: true },
    { id: 'private-kawansedarah', name: 'kawansedarah', url: 'https://kawansedarah.com', description: lang === 'id' ? 'Command center platform monitoring stok darah real-time yang terintegrasi dengan Supabase.' : 'Command center platform for real-time blood stock monitoring integrated with Supabase.', language: 'TypeScript', stargazers_count: 0, forks_count: 0, isPrivate: true },
    { id: 'private-getkasir', name: 'getkasir', url: 'https://getkasir.com', description: lang === 'id' ? 'Ekosistem retail raksasa kelas Enterprise yang menggabungkan kecanggihan AI, keamanan biometrik, dan skalabilitas cloud (100+ Modul).' : 'Enterprise-class giant retail ecosystem combining AI sophistication, biometric security, and cloud scalability (100+ Modules).', language: 'JavaScript', stargazers_count: 0, forks_count: 0, isPrivate: true },
    { id: 'private-kegiatansulsel', name: 'kegiatansulsel', url: 'https://kegiatansulsel.com', description: lang === 'id' ? 'Sistem Manajemen Kehadiran dan Pendaftaran Peserta Kegiatan Sulawesi Selatan berbasis Next.js, Supabase, dan QR Code.' : 'South Sulawesi Activity Participant Registration and Attendance Management System based on Next.js, Supabase, and QR Code.', language: 'TypeScript', stargazers_count: 0, forks_count: 0, isPrivate: true },
    { id: 'private-ppidparepare', name: 'ppidparepare', url: 'https://ppid.kemenag.go.id/parepare', description: lang === 'id' ? 'Portal Resmi PPID Kemenag Kota Parepare untuk transparansi informasi publik, laporan kinerja, dan integrasi Google Gemini AI.' : 'Official PPID Kemenag Kota Parepare Portal for public information transparency, performance reports, and Google Gemini AI integration.', language: 'TypeScript', stargazers_count: 0, forks_count: 0, isPrivate: true }
  ];

  useEffect(() => {
    const excludedRepos = ['syarfandi.github.io', 'MagiskOnWSA'];
    fetch('https://api.github.com/users/syarfandi/repos?sort=updated&per_page=15')
      .then(res => res.json())
      .then(data => {
        const publicRepos = data
          .filter(repo =>
            !privateRepos.some(p => p.name === repo.name) &&
            !excludedRepos.includes(repo.name)
          )
          .slice(0, 6)
          .map(repo => ({ ...repo, isPrivate: false }));
        setRepos([...privateRepos, ...publicRepos]);
        setLoading(false);
      })
      .catch(() => { setRepos(privateRepos); setLoading(false); });
  }, [lang]);

  return (
    <section id="github" className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <Github size={40} color="var(--primary-color)" /><h2 className="heading-secondary" style={{ marginBottom: 0 }}>{t('openSource')} <span className="text-gradient">{t('contributions')}</span></h2>
      </div>
      {loading ? (<div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{t('loadingRepos')}</div>) : (
        <div className="portfolio-grid">
          {repos.map((repo, idx) => (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} key={repo.id} className="portfolio-card glass">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Code size={14} /> {repo.language || 'Mixed'}</span>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}><span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Star size={14} /> {repo.stargazers_count}</span><span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><GitFork size={14} /> {repo.forks_count}</span></div>
              </div>
              <h3 style={{ wordBreak: 'break-word', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{formatName(repo.name)}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>{repo.description || 'No description available.'}</p>
              {repo.isPrivate ? (
                <a href={repo.url} target="_blank" rel="noreferrer" className="project-link">Lihat Aplikasi <ExternalLink size={16} /></a>
              ) : (
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="project-link">{t('viewRepo')} <ExternalLink size={16} /></a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

const SkillsSection = () => {
  const { t } = useTheme();
  const skills = [
    { name: "AR/VR Development (Unity)", level: 95 },
    { name: "3D Modeling (SketchUp)", level: 90 },
    { name: "Sys Admin & Infrastructure", level: 90 },
    { name: "Web Development (React/Next.js)", level: 85 },
    { name: "CMS Specialist (Wordpress)", level: 90 },
    { name: "AutoCAD (Network Design)", level: 85 },
    { name: "Information Security", level: 80 },
  ];
  return (
    <section id="skills" className="container">
      <div className="skills-layout">
        <div><h2 className="heading-secondary" style={{ textAlign: 'left' }}>{t('core')} <span className="text-gradient">{t('competencies')}</span></h2><p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t('coreDesc')}</p></div>
        <div className="skills-list">
          {skills.map((skill, idx) => (
            <div key={idx} className="skill-item">
              <div className="skill-info"><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span><span className="text-gradient">{skill.level}%</span></div>
              <div className="skill-bar-bg"><motion.div className="skill-bar-fill" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} /></div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .skills-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: flex-start; }
        .skill-item { margin-bottom: 1.5rem; }
        .skill-info { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .skill-bar-bg { height: 8px; background: var(--surface-color); border-radius: 4px; overflow: hidden; }
        .skill-bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--accent-color)); border-radius: 4px; }
        @media (max-width: 992px) { 
          .skills-layout { grid-template-columns: 1fr; gap: 2rem; text-align: center; } 
        }
        @media (max-width: 600px) {
          .skill-info { font-size: 0.9rem; }
          .skill-item { text-align: left; }
        }
      `}</style>
    </section>
  );
};

const CertificatesSection = () => {
  const { t } = useTheme();
  const certs = [
    { title: t('certBSSN'), issuer: "BSSN", date: "2024", icon: <Shield size={32} /> },
    { title: t('certSamsung'), issuer: "Samsung Indonesia & Dicoding", date: "2017", icon: <Award size={32} /> },
    { title: t('certEnglish'), issuer: "Access English School", date: "2018", icon: <Languages size={32} /> },
    { title: t('certBlender'), issuer: "Blender Army Makassar", date: "2014", icon: <Cpu size={32} /> },
  ];
  return (
    <section id="certificates" className="container">
      <h2 className="heading-secondary">{t('certifications')} <span className="text-gradient">{t('awards')}</span></h2>
      <div className="portfolio-grid">
        {certs.map((cert, idx) => (
          <div key={idx} className="cert-card glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', color: 'var(--primary-color)' }}>{cert.icon}</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{cert.title}</h3>
            <p style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem' }}>{cert.issuer}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{cert.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { t } = useTheme();
  return (
    <section id="contact" className="container">
      <div className="glass contact-card">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-secondary" style={{ marginBottom: '1rem' }}>{t('readyCollab')} <span className="text-gradient">{t('collaborate')}</span></h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t('discussValue')}</p>
        </div>
        <div className="contact-grid">
          <a href="mailto:syarfandi.achmad@gmail.com" className="contact-item glass"><Mail size={32} color="var(--primary-color)" /><h4 style={{ color: 'var(--text-primary)' }}>{t('email')}</h4><p>syarfandi.achmad@gmail.com</p></a>
          <a href="tel:+6285256522335" className="contact-item glass"><Phone size={32} color="var(--primary-color)" /><h4 style={{ color: 'var(--text-primary)' }}>{t('phone')}</h4><h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>+62 852-5652-2335</h3></a>
          <div className="contact-item glass"><MapPin size={32} color="var(--primary-color)" /><h4 style={{ color: 'var(--text-primary)' }}>{t('address')}</h4><p style={{ color: 'var(--text-secondary)' }}>Jl. Dg. Tata I Blok IV/G No. 2, Makassar</p></div>
        </div>
      </div>
      <style>{`
        .contact-card { padding: 4rem; background: var(--surface-color); }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; }
        .contact-item { padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; transition: transform 0.3s ease; }
        .contact-item:hover { transform: translateY(-5px); border-color: rgba(99, 102, 241, 0.3); }
        .contact-item h4 { font-size: 1.1rem; }
        .contact-item p { color: var(--text-secondary); font-size: 0.9rem; }
        @media (max-width: 768px) { 
          .contact-card { padding: 3rem 1.5rem; }
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

const Footer = () => {
  const { t } = useTheme();
  return (
    <footer style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
      <p>&copy; {new Date().getFullYear()} Syarfandi "Andi" Achmad. {t('allRightsReserved')}</p>
    </footer>
  );
};

export default App;
