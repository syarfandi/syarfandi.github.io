import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Download, ChevronDown, Award, Briefcase, GraduationCap, Code, Github, Star, GitFork, Moon, Sun, Languages, Shield, Layout, Monitor, Cpu, FileText, Lock, ShieldAlert, CheckCircle2, Linkedin, Server, Globe } from 'lucide-react';

const translations = {
  id: {
    heroRole: "Full Stack Developer, DevOps & SRE",
    heroGreeting: "Hai, Saya",
    heroDesc: "Bersemangat membangun <strong>solusi web full stack</strong> yang tangguh, merancang <strong>arsitektur cloud (SRE/DevOps)</strong> yang scalable, dan mengotomatisasi <strong>CI/CD pipelines</strong> untuk inovasi enterprise maupun layanan publik.",
    hireMe: "Chat Me",
    viewProjects: "Lihat Proyek",
    resume: "Resume",
    selectResume: "Pilih Versi Resume",
    close: "Tutup",
    pinTitle: "Masukkan PIN",
    pinDesc: "Masukkan PIN untuk mengakses daftar resume",
    pinWrong: "PIN salah, coba lagi",
    pinUnlock: "Buka Kunci",
    aboutMe: "Tentang",
    me: "Saya",
    aboutDesc: [
      "Saya adalah seorang <strong>Full Stack Developer</strong> dengan <strong>lebih dari 8 tahun pengalaman</strong> merancang dan membangun ekosistem aplikasi web dari ujung ke ujung (end-to-end). Fokus utama saya adalah menciptakan <strong>antarmuka pengguna (UI/UX) yang intuitif</strong> serta mengembangkan <strong>arsitektur backend yang tangguh</strong> (React, Node.js, PostgreSQL) untuk menghasilkan <strong>solusi web enterprise</strong> berkinerja tinggi.",
      "Sebagai nilai tambah, saya memiliki fondasi kuat di bidang <strong>DevOps & Site Reliability Engineering (SRE)</strong>. Hal ini memungkinkan saya untuk tidak hanya menulis kode, tetapi juga memastikan keandalan sistem, mendeploy, menskalakan, dan mengelola infrastruktur secara mandiri menggunakan arsitektur <strong>cloud-native (AWS/GCP)</strong> dan otomatisasi <strong>CI/CD</strong> yang andal.",
      "Selama karir saya, saya sukses memimpin digitalisasi di sektor publik—melalui portal data terintegrasi—serta merintis sistem <i>agile</i> untuk startup retail dengan penerapan <strong>clean code</strong> dan <strong>best practices</strong>. Saat ini saya terbuka untuk peluang baru dan sepenuhnya <strong>Remote-Ready</strong> untuk berkolaborasi dengan tim global."
    ],
    location: "Lokasi",
    education: "Pendidikan",
    availability: "Ketersediaan",
    languages: "Bahasa",
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
    coreDesc: "Keahlian teknis dan manajerial yang dibangun selama bertahun-tahun dalam mengelola infrastruktur cloud, keamanan siber, dan rekayasa perangkat lunak full stack.",
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

    exp1Title: "Tenaga Ahli DevOps & Infrastruktur",
    exp1Company: "Dinas Kominfo & Disbud Kota Makassar",
    exp1Desc: "Mengelola infrastruktur Virtual Tour Lorong Wisata, Virtual Museum Makassar, dan server email pemerintah.",

    exp7Title: "SQA & DevOps Engineer",
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
    certBSSN8: "National Cyber Exercise #8 - BSSN",
    certSamsung: "Winner Top 10 - Samsung Indonesia Next Apps 4.0 Gear VR Challenge",
    certEnglish: "IELTS 5.5 & TOEFL Proficiency - Access English School",
    certBlender: "Workshop Animasi Blender 3D",
    certCityApp: "Microsoft CityApp Appathon Participant"
  },
  en: {
    heroRole: "Full Stack Developer, DevOps & SRE",
    heroGreeting: "Hi, I'm",
    heroDesc: "Passionate about building robust <strong>full stack web solutions</strong>, alongside designing scalable <strong>cloud architectures (SRE/DevOps)</strong> and automating <strong>CI/CD pipelines</strong> for enterprise and public service innovations.",
    hireMe: "Chat Me",
    viewProjects: "View Projects",
    resume: "Resume",
    selectResume: "Select Resume Version",
    close: "Close",
    pinTitle: "Enter PIN",
    pinDesc: "Enter PIN to access resume list",
    pinWrong: "Wrong PIN, try again",
    pinUnlock: "Unlock",
    aboutMe: "About",
    me: "Me",
    aboutDesc: [
      "I am a passionate <strong>Full Stack Developer</strong> with <strong>over 8 years of experience</strong> architecting and building end-to-end web application ecosystems. My primary focus lies in crafting <strong>intuitive user interfaces (UI/UX)</strong> and developing <strong>robust backend architectures</strong> (React, Node.js, PostgreSQL) to deliver high-performance <strong>enterprise web solutions</strong>.",
      "Additionally, my strong foundation in <strong>DevOps & Site Reliability Engineering (SRE)</strong> empowers me to go beyond writing code. I am able to ensure system reliability, independently deploy, scale, and manage digital infrastructures using <strong>cloud-native architectures (AWS/GCP)</strong> and reliable <strong>CI/CD automation</strong>.",
      "Throughout my career, I have successfully spearheaded digital transformation in the public sector—delivering integrated data portals—and pioneered agile systems for retail startups using <strong>clean code</strong> and <strong>best practices</strong>. I am fully <strong>Remote-Ready</strong> and currently open to new opportunities to collaborate with global teams."
    ],
    location: "Location",
    education: "Education",
    availability: "Availability",
    languages: "Languages",
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
    coreDesc: "Technical and managerial expertise built over years of managing cloud infrastructure, cyber security, and full stack software engineering.",
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

    exp1Title: "DevOps & Infrastructure Expert",
    exp1Company: "Dinas Kominfo & Disbud Makassar",
    exp1Desc: "Managing infrastructure for Virtual Tour Lorong Wisata, Virtual Museum Makassar, and gov email servers.",

    exp7Title: "SQA & DevOps Engineer",
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
    certBSSN8: "National Cyber Exercise #8 - BSSN",
    certSamsung: "Winner Top 10 - Samsung Indonesia Next Apps 4.0 Gear VR Challenge",
    certEnglish: "IELTS 5.5 & TOEFL Proficiency - Access English School",
    certBlender: "Blender 3D Animation Workshop",
    certCityApp: "Microsoft CityApp Appathon Participant"
  }
};

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

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
      <main className="app-container">
        <motion.div className="progress-bar" style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-color)', transformOrigin: '0%', zIndex: 100 }} />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ExperienceSection />
        <GithubSection />
        <SkillsSection />
        <CertificatesSection />
        <ContactSection />
        <Footer />
      </main>
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
      <button onClick={toggleTheme} className="glass nav-btn icon-only" aria-label="Toggle Theme">
        {theme === 'light' ? <Moon size={20} color="var(--primary-color)" /> : <Sun size={20} color="var(--primary-color)" />}
      </button>
    </div>
  );
};

const HeroSection = () => {
  const { t, theme, lang } = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [pinUnlocked, setPinUnlocked] = useState(false);

  useEffect(() => {
    let currentPin = '';
    const handleKeyDown = async (e) => {
      if (pinUnlocked) return;
      
      if (/^\d$/.test(e.key)) {
        currentPin += e.key;
        if (currentPin.length > 6) {
          currentPin = currentPin.slice(-6);
        }
        
        if (currentPin.length === 6) {
          const salt = "syarfandi_portfolio_2026_!@#";
          const msgUint8 = new TextEncoder().encode(currentPin + salt);
          const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

          if (hashHex === 'e33280798c9d1d5b0229c4fa3e667e757483f0b748566aab80dbc513e0b5132f') {
            setPinUnlocked(true);
            setShowResumeModal(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pinUnlocked]);

  const resumeOptions = [
    { title: "Fullstack Developer", path: "/fullstack/" },
    { title: "DevOps / SRE Engineer", path: "/devops/" },
    { title: "Cloud Engineer", path: "/cloud/" },
    { title: "Frontend Developer", path: "/frontend/" },
    { title: "Backend Developer", path: "/backend/" },
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
              <img src="/Andi.webp" alt='Syarfandi "Andi" Achmad' className="hero-img-main" width="280" height="500" fetchpriority="high" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
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
              <span className="hero-greeting">{t('heroGreeting')}</span> <br />
              <span className="hero-name-blue">Syarfandi "Andi" <br /> Achmad</span>
            </h1>
            <p className="hero-description" dangerouslySetInnerHTML={{ __html: t('heroDesc') }} />
            <div className="hero-buttons">
              <a href="#portfolio" className="hero-btn-primary">{t('viewProjects')}</a>
              <a href="#contact" className="hero-btn-secondary">{t('hireMe')}</a>
              {pinUnlocked && (
                <button onClick={() => setShowResumeModal(true)} className="hero-btn-secondary">
                  <span>{t('resume')}</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, color: 'var(--text-primary)' }}>
        <ChevronDown size={32} />
      </motion.div>

      {/* Resume Selection Modal */}
      {showResumeModal && (
        <div className="adaptive-pin-overlay" onClick={() => setShowResumeModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            className="resume-modal-card"
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 className="heading-tertiary" style={{ margin: 0, fontSize: '1.8rem', color: 'var(--text-primary)' }}>{t('selectResume')}</h3>
            </div>
            <div className="resume-options-grid">
              {resumeOptions.map((opt, i) => (
                <a key={i} href={opt.path} target="_blank" rel="noreferrer" className="resume-opt-btn" onClick={() => setShowResumeModal(false)}>
                  <span>{opt.title}</span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <button onClick={() => setShowResumeModal(false)} className="btn btn-outline" style={{ padding: '0.8rem 2.5rem', color: 'var(--text-primary)', borderRadius: '9999px', fontWeight: 'bold' }}>
                {t('close')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .adaptive-pin-overlay { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .dark .adaptive-pin-overlay { background: rgba(0, 0, 0, 0.7); }
        
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(120px); z-index: -1; opacity: 0.2; }
        .orb-1 { background: var(--primary-color); width: 600px; height: 600px; top: -200px; left: -200px; }
        .orb-2 { background: var(--secondary-color); width: 700px; height: 700px; bottom: -300px; right: -200px; }
        .hero-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 4rem; align-items: center; }
        .hero-title { font-size: clamp(3rem, 6vw, 5.5rem); line-height: 1.1; margin-bottom: 2rem; font-weight: 900; letter-spacing: -0.02em; }
        .hero-greeting { color: var(--text-primary); }
        .hero-name-blue { color: var(--primary-color); }
        .hero-subheading { font-size: 1.1rem; color: var(--primary-color); margin-bottom: 1.5rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 800; }
        .hero-description { font-size: 1.25rem; color: var(--text-secondary); max-width: 750px; margin-bottom: 3.5rem; line-height: 1.7; }
        .hero-description strong { color: var(--text-primary); font-weight: 700; }
        .hero-buttons { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .hero-btn-primary { background: var(--primary-color); color: white; border-radius: 9999px; padding: 1.2rem 2.5rem; font-weight: 700; font-size: 1.1rem; text-decoration: none; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(37, 99, 235, 0.25); display: inline-flex; align-items: center; justify-content: center; }
        .hero-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(37, 99, 235, 0.35); }
        .hero-btn-secondary { background: var(--bg-primary); color: var(--text-primary); border-radius: 9999px; padding: 1.2rem 2.5rem; font-weight: 700; font-size: 1.1rem; text-decoration: none; border: 1px solid var(--glass-border); cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05); display: inline-flex; align-items: center; justify-content: center; }
        .hero-btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1); }
        .resume-modal-inline { overflow: hidden; margin-top: 2rem; }
        
        .resume-modal-card { padding: 3rem 2rem; border-radius: 24px; text-align: center; width: 92%; max-width: 900px; box-shadow: 0 40px 100px rgba(0,0,0,0.15); border: 1px solid var(--glass-border); position: relative; max-height: 90vh; overflow-y: auto; background: var(--surface-color); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); margin: auto; }
        .resume-options-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .resume-opt-btn { text-decoration: none; padding: 1.2rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; text-align: center; background: var(--bg-primary); border: 1px solid var(--glass-border); box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
        .resume-opt-btn span { color: var(--text-primary); font-size: 1rem; font-weight: 700; }
        .resume-opt-btn:hover { background: var(--primary-color) !important; transform: translateY(-3px); border-color: var(--primary-color); }
        .resume-opt-btn:hover span { color: white !important; }
        
        .hero-image-container { position: relative; }
        .image-stack { position: relative; width: 100%; max-width: 450px; margin: 0 auto; }
        .image-bg-blob { position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; filter: blur(40px); opacity: 0.4; animation: morph 6s ease-in-out infinite; z-index: 0; }
        .hero-img-main { position: relative; width: 100%; height: auto; border-radius: 30px; z-index: 1; filter: drop-shadow(0 20px 50px rgba(0,0,0,0.1)); -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%); -webkit-mask-composite: source-in; mask-image: linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%); mask-composite: intersect; }
        .floating-card { position: absolute; bottom: 20px; left: -30px; padding: 1rem 1.5rem; border-radius: 20px; display: flex; align-items: center; gap: 0.75rem; z-index: 2; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .floating-card span { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }

        @keyframes morph {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 4rem; }
          .hero-buttons { justify-content: center; }
          .hero-description { margin-inline: auto; font-size: 1.15rem; }
          .hero-image-container { order: -1; }
          .image-stack { max-width: 350px; }
          .hero-title { font-size: 3.5rem; }
          .floating-card { left: 50%; transform: translateX(-50%); bottom: -20px; }
        }

        @media (max-width: 600px) {
          .hero-title { font-size: 2.5rem; margin-bottom: 2rem; }
          .hero-subheading { font-size: 1.1rem; margin-bottom: 1.5rem; }
          .hero-description { font-size: 1rem; margin-bottom: 3rem; }
          .hero-buttons { gap: 1rem; flex-direction: column; width: 100%; }
          .btn { width: 100%; justify-content: center; }
          .floating-card { left: 0; right: 0; margin: 0 auto; width: max-content; bottom: -10px; }
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
  const { t, lang } = useTheme();
  return (
    <section id="about" className="container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="glass about-card">
        <div className="about-grid">
          <div className="about-info">
            <h2 style={{ textAlign: 'center', fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {t('aboutMe')} <span style={{ color: 'var(--primary-color)' }}>{t('me')}</span>
            </h2>
            {Array.isArray(t('aboutDesc')) ? t('aboutDesc').map((desc, idx) => (
              <p key={idx} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.2rem', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: desc }} />
            )) : (
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.2rem', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: t('aboutDesc') }} />
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div className="info-item">
                <MapPin color="var(--primary-color)" size={24} />
                <div><h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{t('location')}</h3><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Makassar, Indonesia</p></div>
              </div>
              <div className="info-item">
                <GraduationCap color="var(--primary-color)" size={24} />
                <div><h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{t('education')}</h3><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{lang === 'en' ? 'Bachelor of Computer Science' : 'S1 Teknik Informatika (Computer Science)'}</p></div>
              </div>
              <div className="info-item">
                <Globe color="var(--primary-color)" size={24} />
                <div><h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{t('availability')}</h3><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Remote & Full-Time</p></div>
              </div>
              <div className="info-item">
                <Languages color="var(--primary-color)" size={24} />
                <div><h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{t('languages')}</h3><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Indonesian (Native), English</p></div>
              </div>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card"><h3>8+</h3><p>{t('yearsExp')}</p></div>
            <div className="stat-card"><h3>20+</h3><p>{t('projectsDelivered')}</p></div>
            <div className="stat-card"><h3>100%</h3><p>{t('commitment')}</p></div>
            <div className="stat-card"><h3>Gov</h3><p>{t('publicSector')}</p></div>
            <div className="stat-card"><h3>{t('bizSector')}</h3><p>{t('retailIndustry')}</p></div>
          </div>
        </div>
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Code color="var(--primary-color)" size={32} />
            <div><h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: '0 0 0.2rem 0' }}>Full Stack Excellence</h3><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>React, Node.js, PostgreSQL</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Server color="var(--primary-color)" size={32} />
            <div><h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: '0 0 0.2rem 0' }}>Cloud-Native Infra</h3><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Docker, K8s, AWS, GCP</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Shield color="var(--primary-color)" size={32} />
            <div><h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: '0 0 0.2rem 0' }}>Secure & Automated</h3><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>CI/CD Pipelines & BSSN Standard</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Monitor color="var(--primary-color)" size={32} />
            <div><h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: '0 0 0.2rem 0' }}>Site Reliability</h3><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Monitoring & High Availability</p></div>
          </div>
        </div>
      </motion.div>
      <style>{`
        .about-card { padding: 4rem; }
        .about-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        .about-info { max-width: 100%; text-align: justify; }
        .info-item { display: flex; align-items: flex-start; gap: 1rem; text-align: left; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; justify-content: center; }
        .stat-card { background: var(--bg-primary); border: 1px solid var(--glass-border); border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); padding: 2.5rem 1rem; text-align: center; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .stat-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
        .stat-card h3 { font-size: 3rem; margin-bottom: 0.5rem; font-weight: 900; color: var(--primary-color); letter-spacing: -0.02em; }
        .stat-card p { color: var(--text-secondary); font-size: 0.9rem; font-weight: 500; }
        
        @media (max-width: 1024px) { 
          .about-card { padding: 3rem; }
          .stats-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .about-card { padding: 2.5rem 1.25rem; text-align: center; }
          .info-item { flex-direction: column; align-items: center; text-align: center; }
          .stats-grid { grid-template-columns: 1fr; gap: 1rem; }
          .stat-card { padding: 1.5rem 1rem; }
          .stat-card h3 { font-size: 2rem; }
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
    // { title: t('exp5Title'), company: t('exp5Company'), period: "2021 - 2026", desc: t('exp5Desc') },
    { title: t('exp3Title'), company: t('exp3Company'), period: "2018 - 2019", desc: t('exp3Desc') },
    { title: t('exp6Title'), company: t('exp6Company'), period: "2014 - 2017", desc: t('exp6Desc') },
    { title: t('exp4Title'), company: t('exp4Company'), period: "2016 - 2019", desc: t('exp4Desc') },
  ];
  return (
    <section id="experience" className="container">
      <h2 style={{ textAlign: 'center', fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '3rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
        {t('professional')} <span style={{ color: 'var(--primary-color)' }}>{t('journey')}</span>
      </h2>
      <div className="experience-grid">
        {experiences.map((exp, index) => (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} key={index} className="experience-card">
            <div className="experience-header">
              <div className="experience-icon"><Briefcase size={20} /></div>
              <span className="period">{exp.period}</span>
            </div>
            <h3 style={{ color: 'var(--text-primary)' }}>{exp.title}</h3>
            <h4 className="company">{exp.company}</h4>
            <p>{exp.desc}</p>
          </motion.div>
        ))}
      </div>
      <style>{`
        .experience-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        @media (min-width: 1280px) { .experience-grid { grid-template-columns: repeat(4, 1fr); } }
        .experience-card { background: var(--bg-primary); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; transition: all 0.3s ease; border: 1px solid var(--glass-border); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03); }
        .experience-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08); border-color: var(--primary-color); }
        .experience-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .experience-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(37, 99, 235, 0.08); color: var(--primary-color); display: flex; align-items: center; justify-content: center; }
        .period { color: var(--primary-color); font-size: 0.85rem; font-weight: 800; }
        .experience-card h3 { font-size: 1.3rem; margin-bottom: 0.5rem; font-weight: 900; line-height: 1.3; letter-spacing: -0.01em; color: var(--text-primary); }
        .company { color: var(--text-secondary); font-weight: 800; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .experience-card p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; flex-grow: 1; }
        
        @media (max-width: 768px) {
          .experience-grid { grid-template-columns: 1fr; }
          .experience-card { padding: 1.5rem; }
        }
      `}</style>
    </section>
  );
};

const PortfolioSection = () => {
  const { t, lang } = useTheme();
  const [publicRepos, setPublicRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "200px" });

  // All projects unified — sorted by priority
  const allProjects = [
    { id: 'kawansedarah', title: 'Kawan Sedarah (Blood Stock)', desc: lang === 'id' ? 'Dashboard <strong>command center</strong> untuk memantau ketersediaan <strong>stok darah</strong> secara <strong>real-time</strong> di berbagai unit donor, ditenagai oleh <strong>Supabase</strong> sebagai backend utama.' : 'A <strong>command center</strong> dashboard that tracks <strong>blood stock</strong> availability across donor units in <strong>real-time</strong>, powered by <strong>Supabase</strong> as its core backend.', url: 'https://kawansedarah.org' },
    { id: 'datasulsel', title: 'Portal Data Sulsel', desc: lang === 'id' ? 'Sistem informasi terpadu yang menyajikan <strong>visualisasi data</strong>, <strong>monitoring</strong>, dan <strong>analisis statistik</strong> keagamaan untuk seluruh kabupaten/kota di Sulawesi Selatan secara <strong>real-time</strong>.' : 'A unified information system delivering <strong>data visualization</strong>, <strong>monitoring</strong>, and religious <strong>statistical analysis</strong> across all districts in South Sulawesi in <strong>real-time</strong>.', url: 'https://datasulsel.kemenag.go.id' },
    { id: 'asistenvirtual', title: 'AI Virtual Assistant', desc: lang === 'id' ? 'Asisten virtual berbasis <strong>Conversational AI</strong> dengan kemampuan <strong>Lipsync Realtime</strong> pada avatar 3D, didukung <strong>Voice AI</strong> dan <strong>LLM</strong> untuk interaksi percakapan yang imersif.' : 'A <strong>Conversational AI</strong>-powered virtual assistant featuring <strong>Realtime Lipsync</strong> on 3D avatars, backed by <strong>Voice AI</strong> and <strong>LLM</strong> for immersive conversational interactions.', url: 'https://asistenvirtual.vercel.app' },
    { id: 'getkasir', title: 'GetKasir Enterprise POS', desc: lang === 'id' ? 'Ekosistem POS kelas <strong>Enterprise</strong> berskala besar dengan <strong>100+ modul</strong>, mengintegrasikan <strong>AI</strong> untuk prediksi penjualan, autentikasi <strong>biometrik</strong>, dan arsitektur <strong>cloud-native</strong> yang dapat diskalakan.' : 'A large-scale <strong>Enterprise</strong> POS ecosystem with <strong>100+ modules</strong>, integrating <strong>AI</strong>-driven sales prediction, <strong>biometric</strong> authentication, and a scalable <strong>cloud-native</strong> architecture.', url: 'https://getkasir.xyz' },
    { id: 'ppidparepare', title: 'PPID Kemenag Kota Parepare', desc: lang === 'id' ? 'Portal keterbukaan informasi <strong>PPID Kemenag</strong> yang menyediakan akses publik terhadap <strong>dokumen resmi</strong>, <strong>laporan kinerja</strong>, dan fitur chatbot cerdas berbasis <strong>Google Gemini AI</strong>.' : 'A public information disclosure portal for <strong>PPID Kemenag</strong> providing access to <strong>official documents</strong>, <strong>performance reports</strong>, and an intelligent chatbot powered by <strong>Google Gemini AI</strong>.', url: 'https://ppidparepare.vercel.app' },
    { id: 'optracks', title: 'OP Tracker', desc: lang === 'id' ? 'Logbook premium untuk melacak progres menonton <strong>One Piece</strong> tanpa perlu login — dilengkapi <strong>filter filler</strong> otomatis, peta navigasi <strong>saga & arc</strong>, dan sistem <strong>rank bajak laut</strong> yang gamified.' : 'A premium logbook for tracking <strong>One Piece</strong> watch progress without login — equipped with automatic <strong>filler filter</strong>, <strong>saga & arc</strong> navigation map, and a gamified <strong>pirate rank</strong> system.', url: 'https://optracks.vercel.app' },
    { id: 'kegiatansulsel', title: 'QR Scanner Presence App', desc: lang === 'id' ? 'Solusi <strong>presensi modern</strong> yang memanfaatkan pemindaian <strong>QR Code</strong> untuk mencatat kehadiran peserta secara instan, dibangun di atas stack <strong>Next.js</strong> + <strong>Supabase</strong> dengan sinkronisasi <strong>real-time</strong>.' : 'A modern <strong>attendance solution</strong> leveraging <strong>QR Code</strong> scanning for instant participant check-in, built on a <strong>Next.js</strong> + <strong>Supabase</strong> stack with <strong>real-time</strong> sync.', url: 'https://creativebooster.vercel.app' },
    { id: 'malmora', title: 'Malmora (Reseller & Dropship)', desc: lang === 'id' ? 'Marketplace <strong>reseller & dropship</strong> yang dirancang khusus untuk produk kebutuhan muslim, memungkinkan siapa saja berjualan tanpa stok fisik di kawasan <strong>Sulawesi & Indonesia Timur</strong>.' : 'A <strong>reseller & dropship</strong> marketplace tailored for Muslim lifestyle products, enabling anyone to sell without physical stock across <strong>Sulawesi and Eastern Indonesia</strong>.', url: 'https://malmora.com' },
    { id: 'emailserver', title: 'Email Server Makassar Gov', desc: lang === 'id' ? 'Kluster email berskala kota berbasis <strong>Mailcow</strong> yang melayani <strong>200+ domain</strong> resmi Pemerintah Kota Makassar, diperkuat dengan protokol keamanan <strong>SPF/DKIM/DMARC</strong> dan konfigurasi <strong>high-availability</strong>.' : 'A city-scale <strong>Mailcow</strong>-based email cluster serving <strong>200+ official domains</strong> for Makassar City Government, hardened with <strong>SPF/DKIM/DMARC</strong> security protocols and <strong>high-availability</strong> setup.', url: 'https://mail.makassarkota.go.id' },
    { id: 'helpdesk', title: 'Helpdesk Kota Makassar', desc: lang === 'id' ? 'Sistem <strong>e-government</strong> untuk penanganan <strong>aduan warga</strong> secara digital — mencakup <strong>tracking tiket real-time</strong>, eskalasi otomatis, dan integrasi lintas <strong>OPD Kota Makassar</strong>.' : 'An <strong>e-government</strong> system for handling <strong>citizen complaints</strong> digitally — featuring <strong>real-time ticket tracking</strong>, automated escalation, and cross-department integration across <strong>Makassar City agencies</strong>.', url: null },
    { id: 'virtualmuseum', title: 'Virtual Museum Makassar', desc: lang === 'id' ? 'Pengalaman museum digital yang imersif dengan tur <strong>panorama 360°</strong>, koleksi <strong>artefak 3D</strong> interaktif, dan narasi <strong>audio-visual</strong> untuk melestarikan warisan budaya Sulawesi Selatan.' : 'An immersive digital museum experience with <strong>360° panoramic</strong> tours, interactive <strong>3D artifact</strong> collections, and <strong>audio-visual</strong> narratives preserving South Sulawesi cultural heritage.', url: null },
    { id: 'alharamvr', title: 'Al-Haram VR', desc: lang === 'id' ? 'Simulasi <strong>virtual reality</strong> berpresisi tinggi dari <strong>Masjidil Haram</strong> dan <strong>Masjid Nabawi</strong>, dikembangkan dengan <strong>Unity</strong> dan dioptimalkan untuk <strong>headset VR</strong> maupun perangkat mobile sebagai media edukasi haji & umrah.' : 'A high-precision <strong>virtual reality</strong> simulation of <strong>Al-Masjid Al-Haram</strong> and <strong>Al-Masjid An-Nabawi</strong>, developed in <strong>Unity</strong> and optimized for both <strong>VR headsets</strong> and mobile devices as a Hajj & Umrah educational tool.', url: null },
    { id: 'paralluta', title: 'Paralluta (Lalu Lintas)', desc: lang === 'id' ? 'Platform cerdas untuk <strong>manajemen lalu lintas</strong> Kota Makassar — meliputi <strong>pemantauan kondisi jalan</strong>, pencatatan pelanggaran, dan <strong>koordinasi petugas lapangan</strong> secara terpusat.' : 'A smart platform for <strong>traffic management</strong> in Makassar City — covering <strong>road condition monitoring</strong>, violation logging, and centralized <strong>field officer coordination</strong>.', url: null },
    { id: 'sopsiber', title: 'SOP Pelaporan Insiden Siber', desc: lang === 'id' ? 'Kerangka kerja <strong>SOP</strong> dan <strong>protokol respons insiden siber</strong> yang disusun untuk infrastruktur IT <strong>Pemerintah Kota Makassar</strong>, mengacu pada standar <strong>BSSN</strong> dan <strong>NIST Cybersecurity Framework</strong>.' : 'A <strong>SOP</strong> framework and <strong>cyber incident response protocols</strong> designed for <strong>Makassar City Government</strong> IT infrastructure, aligned with <strong>BSSN</strong> and <strong>NIST Cybersecurity Framework</strong> standards.', url: null },
  ];

  const formatName = (name) => {
    return name.split(/[-._]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const knownRepoNames = allProjects.map(p => p.id);

  useEffect(() => {
    if (!isInView) return;
    const excludedRepos = ['syarfandi.github.io', 'MagiskOnWSA', 'ECC'];
    fetch('https://api.github.com/users/syarfandi/repos?sort=updated&per_page=15')
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(repo => !knownRepoNames.includes(repo.name) && !excludedRepos.includes(repo.name))
          .slice(0, 6)
          .map(repo => ({ id: repo.name, title: formatName(repo.name), desc: repo.description || 'No description available.', url: repo.html_url, isPublicRepo: true }));
        setPublicRepos(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [isInView]);

  const combined = [...allProjects, ...publicRepos];

  return (
    <section id="portfolio" ref={sectionRef} className="container">
      <h2 style={{ textAlign: 'center', fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '3rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
        {lang === 'id' ? (
          <>Pro<span style={{ color: 'var(--primary-color)' }}>yek</span></>
        ) : (
          <>Pro<span style={{ color: 'var(--primary-color)' }}>jects</span></>
        )}
      </h2>

      <div className="portfolio-grid">
        {combined.map((item, idx) => {
          const CardWrapper = item.url ? 'a' : 'div';
          const linkProps = item.url ? { href: item.url, target: '_blank', rel: 'noreferrer' } : {};
          return (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: idx * 0.03 }} key={item.id} style={{ display: 'flex', height: '100%' }}>
              <CardWrapper {...linkProps} className={`portfolio-card ${!item.url && !item.isPublicRepo ? 'text-only' : ''}`}>
                {item.url && (
                  <div className="card-image-container">
                    <img
                      src={
                        item.isPublicRepo
                          ? `https://opengraph.githubassets.com/1/${item.url.replace('https://github.com/', '')}`
                          : `/projects/${item.id}.webp`
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.style.display = 'none';
                      }}
                      alt={item.title}
                      className="card-image"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: item.desc }} />
                </div>
              </CardWrapper>
            </motion.div>
          );
        })}
      </div>

      {loading && <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>{t('loadingRepos')}</div>}

      <style>{`
        .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }
        @media (max-width: 1024px) {
          .portfolio-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        }
        @media (max-width: 768px) {
          .portfolio-grid { grid-template-columns: 1fr; }
          .portfolio-card { text-align: center; align-items: center; }
        }
        .portfolio-card { background: var(--bg-primary); border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03); padding: 0; display: flex; flex-direction: column; transition: all 0.3s ease; overflow: hidden; border: 1px solid var(--glass-border); text-decoration: none; cursor: pointer; height: 100%; }
        .portfolio-card.text-only { height: 100%; }
        .portfolio-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08); border-color: var(--primary-color); }
        .card-image-container { width: 100%; height: 200px; overflow: hidden; border-bottom: 1px solid var(--glass-border); }
        .card-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .portfolio-card:hover .card-image { transform: scale(1.05); }
        .card-content { padding: 2rem; display: flex; flex-direction: column; flex-grow: 1; }
        .portfolio-card h3 { font-size: 1.4rem; margin-bottom: 1rem; font-weight: 900; color: var(--text-primary); letter-spacing: -0.01em; line-height: 1.3; }
        .portfolio-card .card-content p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; flex-grow: 1; }
        .portfolio-card .card-content p strong { color: var(--text-primary); font-weight: 800; }
      `}</style>
    </section>
  );
};

const GithubSection = () => null;



const SkillsSection = () => {
  const { t } = useTheme();
  const skills = [
    { name: "DevOps & Cloud Infra (AWS/GCP)", level: 95 },
    { name: "Full Stack Web (React/Node.js)", level: 95 },
    { name: "Containerization (Docker/K8s)", level: 90 },
    { name: "CI/CD & Automation", level: 90 },
    { name: "Backend Architecture (SQL/Redis)", level: 85 },
    { name: "Frontend Engineering (Next.js/Vite)", level: 85 },
    { name: "Cybersecurity & InfoSec", level: 85 },
  ];
  return (
    <section id="skills" className="container">
      <div className="skills-layout">
        <div>
          <h2 style={{ textAlign: 'left', fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '2rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {t('core')} <span style={{ color: 'var(--primary-color)' }}>{t('competencies')}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.7 }}>{t('coreDesc')}</p>
        </div>
        <div className="skills-list">
          {skills.map((skill, idx) => (
            <div key={idx} className="skill-item">
              <div className="skill-info">
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{skill.name}</span>
                <span style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{skill.level}%</span>
              </div>
              <div className="skill-bar-bg">
                <motion.div className="skill-bar-fill" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .skills-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: flex-start; }
        .skill-item { margin-bottom: 2rem; }
        .skill-info { display: flex; justify-content: space-between; margin-bottom: 0.8rem; }
        .skill-bar-bg { height: 6px; background: rgba(37, 99, 235, 0.1); border-radius: 999px; overflow: hidden; }
        .skill-bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--accent-color)); border-radius: 999px; }
        @media (max-width: 992px) { 
          .skills-layout { grid-template-columns: 1fr; gap: 3rem; text-align: center; } 
          .skills-layout h2 { text-align: center !important; }
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
    { title: t('certBSSN8'), issuer: "BSSN", date: "2024", icon: <Shield size={32} /> },
    { title: t('certBSSN'), issuer: "BSSN", date: "2024", icon: <Shield size={32} /> },
    { title: t('certSamsung'), issuer: "Samsung Indonesia & Dicoding", date: "2017", icon: <Award size={32} /> },
    { title: t('certEnglish'), issuer: "Access English School", date: "2018", icon: <Languages size={32} /> },
    { title: t('certBlender'), issuer: "Blender Army Makassar", date: "2014", icon: <Cpu size={32} /> },
  ];
  return (
    <section id="certificates" className="container">
      <h2 style={{ textAlign: 'center', fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '3rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
        {t('certifications')} <span style={{ color: 'var(--primary-color)' }}>{t('awards')}</span>
      </h2>
      <div className="cert-grid">
        {certs.map((cert, idx) => (
          <div key={idx} className="cert-card">
            <div className="cert-icon">{cert.icon}</div>
            <h3 className="cert-title">{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <p className="cert-date">{cert.date}</p>
          </div>
        ))}
      </div>
      <style>{`
        .cert-grid { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; }
        .cert-card { background: var(--bg-primary); border-radius: 16px; border: 1px solid var(--glass-border); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03); padding: 2.5rem 2rem; text-align: center; transition: all 0.3s ease; flex: 0 1 calc(33.333% - 1rem); min-width: 280px; max-width: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .cert-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08); border-color: var(--primary-color); }
        .cert-icon { margin-bottom: 1.5rem; color: var(--primary-color); }
        .cert-title { font-size: 1.15rem; margin-bottom: 0.75rem; color: var(--text-primary); font-weight: 900; line-height: 1.4; }
        .cert-issuer { color: var(--primary-color); font-weight: 700; font-size: 0.85rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .cert-date { color: var(--text-secondary); font-size: 0.8rem; font-weight: 600; }
      `}</style>
    </section>
  );
};

const ContactSection = () => {
  const { t } = useTheme();
  const contacts = [
    {
      href: "https://linkedin.com/in/syarfandi",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
      color: '#0077b5',
      bg: 'rgba(0, 119, 181, 0.08)',
      label: 'LinkedIn',
      value: 'linkedin.com/in/syarfandi',
      external: true,
    },
    {
      href: "https://wa.me/6285256522335",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
      color: '#25D366',
      bg: 'rgba(37, 211, 102, 0.08)',
      label: 'WhatsApp',
      value: '+62 852-5652-2335',
      external: true,
    },
    {
      href: "mailto:syarfandi.achmad@gmail.com",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.39l-9 6.58-9-6.58V21H1.5c-.85 0-1.5-.65-1.5-1.5v-15c0-1.15.95-1.75 1.85-1.15L12 9.81l10.15-7.31c.9-.6 1.85 0 1.85 1.15z" /></svg>,
      color: '#EA4335',
      bg: 'rgba(234, 67, 53, 0.08)',
      label: t('email'),
      value: 'syarfandi.achmad@gmail.com',
      external: false,
    },
  ];
  return (
    <section id="contact" className="container">
      <div className="contact-split">
        <div className="contact-left">
          <h2 className="contact-heading">
            {t('readyCollab')}<br />
            <span style={{ color: 'var(--primary-color)' }}>{t('collaborate')}</span>
          </h2>
          <p className="contact-subtitle">{t('discussValue')}</p>
          <div className="contact-decoration">
            <div className="deco-line" />
            <div className="deco-dot" />
          </div>
        </div>
        <div className="contact-right">
          {contacts.map((c, i) => (
            <motion.a
              key={i}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer" : undefined}
              className="contact-row"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="contact-row-icon" style={{ background: c.bg, color: c.color }}>
                {c.icon}
              </div>
              <div className="contact-row-text">
                <h3>{c.label}</h3>
                <p>{c.value}</p>
              </div>
              <ExternalLink size={18} className="contact-row-arrow" />
            </motion.a>
          ))}
        </div>
      </div>
      <style>{`
        .contact-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .contact-heading {
          font-size: clamp(3rem, 5vw, 4.5rem);
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .contact-subtitle {
          color: var(--text-secondary);
          font-size: 1.15rem;
          line-height: 1.8;
          max-width: 420px;
        }
        .contact-decoration {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2.5rem;
        }
        .deco-line {
          width: 60px;
          height: 4px;
          background: var(--primary-color);
          border-radius: 999px;
        }
        .deco-dot {
          width: 10px;
          height: 10px;
          background: var(--accent-color);
          border-radius: 50%;
        }
        .contact-right {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .contact-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.75rem 2rem;
          background: var(--bg-primary);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .contact-row:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          border-color: var(--primary-color);
        }
        .contact-row-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .contact-row:hover .contact-row-icon {
          transform: scale(1.1);
        }
        .contact-row-text {
          flex-grow: 1;
        }
        .contact-row-text h3 {
          font-size: 1.15rem;
          font-weight: 900;
          color: var(--text-primary);
          margin: 0 0 0.25rem;
          letter-spacing: -0.01em;
        }
        .contact-row-text p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0;
        }
        .contact-row-arrow {
          color: var(--text-secondary);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .contact-row:hover .contact-row-arrow {
          opacity: 1;
          transform: translateX(0);
          color: var(--primary-color);
        }
        @media (max-width: 992px) {
          .contact-split { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
          .contact-heading { text-align: center; }
          .contact-subtitle { max-width: none; }
          .contact-decoration { justify-content: center; }
        }
        @media (max-width: 600px) {
          .contact-row { padding: 1.25rem 1.5rem; gap: 1rem; }
          .contact-row-icon { width: 48px; height: 48px; border-radius: 14px; }
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
