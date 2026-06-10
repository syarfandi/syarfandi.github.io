import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
        <PortfolioSection />
        <ExperienceSection />
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
  const { t, theme, lang } = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinValue, setPinValue] = useState('');
  const [pinError, setPinError] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);
  const pinInputRef = useRef(null);

  const handlePinChange = async (val) => {
    const cleanVal = val.replace(/\D/g, '').slice(0, 6);
    setPinValue(cleanVal);
    setPinError(false);

    if (cleanVal.length === 6) {
      const salt = "syarfandi_portfolio_2026_!@#";
      const msgUint8 = new TextEncoder().encode(cleanVal + salt);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      if (hashHex === 'e33280798c9d1d5b0229c4fa3e667e757483f0b748566aab80dbc513e0b5132f') {
        setPinSuccess(true);
        setTimeout(() => {
          setPinUnlocked(true);
          setShowPinModal(false);
          setShowResumeModal(true);
          setPinSuccess(false);
          setPinValue('');
        }, 800);
      } else {
        setPinError(true);
        setTimeout(() => setPinValue(''), 500);
      }
    }
  };

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
              <img src="/Andi.png" alt='Syarfandi "Andi" Achmad' className="hero-img-main" />
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
            <p className="hero-description" dangerouslySetInnerHTML={{ __html: t('heroDesc') }} />
            <div className="hero-buttons">
              <a href="#portfolio" className="btn btn-primary glass">{t('viewProjects')}</a>
              <a href="#contact" className="btn btn-outline glass" style={{ color: 'var(--text-primary)' }}>{t('hireMe')}</a>
              <button onClick={() => {
                if (pinUnlocked) {
                  setShowResumeModal(true);
                } else {
                  setShowPinModal(true);
                  setPinValue('');
                  setPinError(false);
                  setPinSuccess(false);
                  setTimeout(() => pinInputRef.current?.focus(), 100);
                }
              }} className="btn btn-outline glass">
                <span style={{ color: 'var(--text-primary)' }}>{t('resume')}</span>
              </button>
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
            className="adaptive-pin-card glass"
            style={{ maxWidth: '800px', width: '90%' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 className="heading-tertiary" style={{ margin: 0 }}>{t('selectResume')}</h3>
            </div>
            <div className="resume-options-grid">
              {resumeOptions.map((opt, i) => (
                <a key={i} href={opt.path} target="_blank" rel="noreferrer" className="glass resume-opt-btn" onClick={() => setShowResumeModal(false)}>
                  <span>{opt.title}</span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button onClick={() => setShowResumeModal(false)} className="btn btn-outline glass" style={{ padding: '0.5rem 1.5rem', color: 'var(--text-primary)' }}>
                {t('close')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Adaptive Glass PIN Modal */}
      {showPinModal && (
        <div className="adaptive-pin-overlay" onClick={() => setShowPinModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            className="adaptive-pin-card glass"
          >
            <motion.div
              animate={pinError ? { x: [-10, 10, -7, 7, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="adaptive-pin-inner"
            >
              <div className={`adaptive-pin-icon ${pinError ? 'error' : ''} ${pinSuccess ? 'success' : ''}`}>
                {pinSuccess ? <CheckCircle2 size={32} /> : (pinError ? <ShieldAlert size={32} /> : <Lock size={32} />)}
              </div>

              <h3 className="adaptive-pin-title">{pinSuccess ? (lang === 'id' ? "Akses Diberikan" : "Access Granted") : t('pinTitle')}</h3>
              <p className="adaptive-pin-desc">{pinSuccess ? (lang === 'id' ? "Membuka daftar resume..." : "Unlocking resumes...") : t('pinDesc')}</p>

              <div className="adaptive-pin-slots" onClick={() => pinInputRef.current?.focus()}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`adaptive-pin-slot ${pinValue.length > i ? 'filled' : ''} ${pinValue.length === i ? 'active' : ''} ${pinError ? 'error' : ''} ${pinSuccess ? 'success' : ''}`}>
                    {pinValue[i] ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="slot-dot" />
                    ) : (
                      pinValue.length === i && !pinSuccess && !pinError && <div className="slot-cursor" />
                    )}
                  </div>
                ))}
              </div>

              <input
                ref={pinInputRef}
                type="tel"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={pinValue}
                onChange={e => handlePinChange(e.target.value)}
                className="pin-hidden-input"
              />

              {pinError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="adaptive-pin-error">
                  {t('pinWrong')}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}

      <style>{`
        .adaptive-pin-overlay { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .dark .adaptive-pin-overlay { background: rgba(0, 0, 0, 0.7); }
        
        .adaptive-pin-card { padding: 3rem 2rem; border-radius: 30px; text-align: center; max-width: 360px; width: 92%; box-shadow: 0 40px 100px rgba(0,0,0,0.15); border: 1px solid var(--glass-border); position: relative; overflow: hidden; }
        
        .adaptive-pin-icon { width: 64px; height: 64px; border-radius: 18px; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .adaptive-pin-icon.error { background: #ef4444; transform: scale(1.1); }
        .adaptive-pin-icon.success { background: #10b981; transform: scale(1.1); }
        
        .adaptive-pin-title { color: var(--text-primary); font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .adaptive-pin-desc { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2.5rem; line-height: 1.5; }
        
        .adaptive-pin-slots { display: flex; gap: 10px; justify-content: center; margin-bottom: 1rem; }
        .adaptive-pin-slot { width: 44px; height: 56px; border-radius: 14px; border: 2px solid var(--glass-border); background: var(--glass-bg); display: flex; align-items: center; justify-content: center; transition: all 0.2s; position: relative; }
        
        .adaptive-pin-slot.active { border-color: var(--primary-color); box-shadow: 0 0 0 4px rgba(var(--primary-rgb, 96, 165, 250), 0.15); transform: translateY(-2px); }
        .adaptive-pin-slot.filled { border-color: var(--primary-color); }
        .adaptive-pin-slot.error { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
        .adaptive-pin-slot.success { border-color: #10b981; background: rgba(16, 185, 129, 0.05); }
        
        .slot-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--text-primary); }
        .slot-cursor { width: 2px; height: 20px; background: var(--primary-color); animation: adaptiveBlink 1s infinite; }
        @keyframes adaptiveBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        
        .pin-hidden-input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
        .adaptive-pin-error { color: #ef4444; font-size: 0.85rem; margin-top: 1.5rem; font-weight: 700; letter-spacing: 0.02em; }
        
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(120px); z-index: -1; opacity: 0.2; }
        .orb-1 { background: var(--primary-color); width: 600px; height: 600px; top: -200px; left: -200px; }
        .orb-2 { background: var(--secondary-color); width: 700px; height: 700px; bottom: -300px; right: -200px; }
        .hero-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 4rem; align-items: center; }
        .hero-title { font-size: clamp(2.5rem, 8vw, 5rem); line-height: 1.2; margin-bottom: 2.5rem; font-weight: 800; }
        .hero-subheading { font-size: 1.25rem; color: var(--primary-color); margin-bottom: 2rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; }
        .hero-description { font-size: 1.15rem; color: var(--text-secondary); max-width: 750px; margin-bottom: 4rem; line-height: 1.8; }
        .hero-buttons { display: flex; gap: 2rem; flex-wrap: wrap; margin-top: 2rem; }
        .resume-modal-inline { overflow: hidden; margin-top: 2rem; }
        .resume-options-grid { padding: 1.5rem; border-radius: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.75rem; }
        .resume-opt-btn { text-decoration: none; padding: 0.85rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; text-align: center; }
        .resume-opt-btn span { color: var(--text-primary); font-size: 0.95rem; font-weight: 600; }
        
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
  const { t } = useTheme();
  return (
    <section id="about" className="container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="glass about-card">
        <div className="about-grid">
          <div className="about-info">
            <h2 className="heading-secondary" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{t('aboutMe')} <span className="text-gradient">{t('me')}</span></h2>
            {Array.isArray(t('aboutDesc')) ? t('aboutDesc').map((desc, idx) => (
              <p key={idx} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.2rem', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: desc }} />
            )) : (
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.2rem', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: t('aboutDesc') }} />
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div className="info-item">
                <MapPin color="var(--primary-color)" size={24} />
                <div><h4 style={{ color: 'var(--text-primary)' }}>{t('location')}</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Makassar, Indonesia</p></div>
              </div>
              <div className="info-item">
                <GraduationCap color="var(--primary-color)" size={24} />
                <div><h4 style={{ color: 'var(--text-primary)' }}>{t('education')}</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>S1 Teknik Informatika (Computer Science)</p></div>
              </div>
              <div className="info-item">
                <Globe color="var(--primary-color)" size={24} />
                <div><h4 style={{ color: 'var(--text-primary)' }}>{t('availability')}</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Remote & Full-Time</p></div>
              </div>
              <div className="info-item">
                <Languages color="var(--primary-color)" size={24} />
                <div><h4 style={{ color: 'var(--text-primary)' }}>{t('languages')}</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Indonesian (Native), English</p></div>
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
            <Code color="var(--primary-color)" size={32} />
            <div><h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Full Stack Excellence</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>React, Node.js, PostgreSQL</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Server color="var(--primary-color)" size={32} />
            <div><h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Cloud-Native Infra</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Docker, K8s, AWS, GCP</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Shield color="var(--primary-color)" size={32} />
            <div><h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Secure & Automated</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>CI/CD Pipelines & BSSN Standard</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Monitor color="var(--primary-color)" size={32} />
            <div><h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Site Reliability</h4><p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Monitoring & High Availability</p></div>
          </div>
        </div>
      </motion.div>
      <style>{`
        .about-card { padding: 4rem; }
        .about-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        .about-info { max-width: 100%; text-align: justify; }
        .info-item { display: flex; align-items: flex-start; gap: 1rem; text-align: left; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; justify-content: center; }
        .stat-card { padding: 2rem 1rem; text-align: center; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-card h3 { font-size: 2.5rem; margin-bottom: 0.5rem; }
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
      <h2 className="heading-secondary">{t('professional')} <span className="text-gradient">{t('journey')}</span></h2>
      <div className="experience-grid">
        {experiences.map((exp, index) => (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} key={index} className="experience-card glass">
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
        .experience-card { padding: 2rem; display: flex; flex-direction: column; transition: all 0.3s ease; }
        .experience-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border-color: var(--primary-color); }
        .experience-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .experience-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(30, 58, 138, 0.1); color: var(--primary-color); display: flex; align-items: center; justify-content: center; }
        .period { color: var(--accent-color); font-size: 0.85rem; font-weight: 700; background: var(--surface-color); padding: 0.4rem 1rem; border-radius: 50px; }
        .experience-card h3 { font-size: 1.25rem; margin-bottom: 0.25rem; font-weight: 700; line-height: 1.4; }
        .company { color: var(--text-secondary); font-weight: 600; margin-bottom: 1rem; font-size: 0.95rem; }
        .experience-card p { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7; flex-grow: 1; }
        
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

  // All projects unified — sorted by complexity, mixed between featured & repo
  const allProjects = [
    { id: 'getkasir', title: 'GetKasir Enterprise POS', desc: lang === 'id' ? 'Ekosistem retail raksasa kelas Enterprise yang menggabungkan kecanggihan AI, keamanan biometrik, dan skalabilitas cloud (100+ Modul).' : 'Enterprise-class giant retail ecosystem combining AI sophistication, biometric security, and cloud scalability (100+ Modules).', badge: 'JavaScript', url: 'https://getkasir.com' },
    { id: 'asistenvirtual', title: 'Lipsync Realtime Avatar AI', desc: lang === 'id' ? 'Aplikasi Conversational AI canggih berbasis web yang menggabungkan kecerdasan buatan mutakhir (Lipsync Realtime, Voice AI, LLM) dengan antarmuka visual yang memukau.' : 'Advanced web-based Conversational AI app combining cutting-edge AI (Lipsync Realtime, Voice AI, LLM) with stunning visual interfaces.', badge: 'TypeScript', url: 'https://asistenvirtual.ai' },
    { id: 'malmora', title: 'Malmora (Reseller & Dropship)', desc: lang === 'id' ? 'Platform aplikasi reseller & dropship yang berfokus pada produk kebutuhan muslim-muslimah, memudahkan pengguna berjualan online tanpa memikirkan pengemasan dan pengiriman di wilayah Sulawesi & Indonesia Timur.' : 'Reseller & dropship app platform focused on Muslim lifestyle products, enabling users to sell online without handling packaging or shipping across Sulawesi and Eastern Indonesia.', badge: t('typeWeb'), url: 'https://malmora.com' },
    { id: 'datasulsel', title: 'Portal Data Sulsel', desc: lang === 'id' ? 'Portal data terpadu untuk pengelolaan, monitoring, dan analisis statistik data keagamaan di seluruh wilayah Sulawesi Selatan secara real-time.' : 'Integrated data portal for real-time management, monitoring, and analysis of religious statistical data across South Sulawesi.', badge: 'PLpgSQL', url: 'https://datasulsel.com' },
    { id: 'emailserver', title: 'Email Server Makassar Gov', desc: lang === 'id' ? 'Infrastruktur email cluster berbasis Mailcow yang mendukung lebih dari 200 domain pemerintah Kota Makassar dengan keamanan SPF/DKIM/DMARC dan high-availability setup.' : 'Mailcow-based email cluster infrastructure supporting 200+ Makassar government domains with SPF/DKIM/DMARC security hardening and high-availability configuration.', badge: t('typeInfra'), url: 'https://surat.makassarkota.go.id' },
    { id: 'ppidparepare', title: 'PPID Kemenag Kota Parepare', desc: lang === 'id' ? 'Portal Resmi PPID Kemenag Kota Parepare untuk transparansi informasi publik, laporan kinerja, dan integrasi Google Gemini AI.' : 'Official PPID Kemenag Kota Parepare Portal for public information transparency, performance reports, and Google Gemini AI integration.', badge: 'TypeScript', url: 'https://ppid.kemenag.go.id/parepare' },
    { id: 'helpdesk', title: 'Helpdesk Kota Makassar', desc: lang === 'id' ? 'Portal layanan warga Kota Makassar berbasis web untuk manajemen pengaduan publik, tracking tiket real-time, dan integrasi dengan unit kerja Pemkot Makassar.' : 'Citizen service portal for Makassar City enabling public complaint management, real-time ticket tracking, and integration across municipal work units.', badge: t('typeWeb'), url: 'https://helpdesk.makassarkota.go.id' },
    { id: 'kegiatansulsel', title: 'Manajemen Kegiatan Sulsel', desc: lang === 'id' ? 'Sistem Manajemen Kehadiran dan Pendaftaran Peserta Kegiatan Sulawesi Selatan berbasis Next.js, Supabase, dan QR Code.' : 'South Sulawesi Activity Participant Registration and Attendance Management System based on Next.js, Supabase, and QR Code.', badge: 'TypeScript', url: 'https://kegiatansulsel.com' },
    { id: 'virtualmuseum', title: 'Virtual Museum Makassar', desc: lang === 'id' ? 'Museum digital interaktif Kota Makassar dengan navigasi panorama 360°, galeri artefak 3D, dan tur audio-visual untuk pelestarian warisan budaya Sulawesi Selatan.' : 'Interactive digital museum of Makassar City featuring 360° panoramic navigation, 3D artifact galleries, and audio-visual tours for South Sulawesi cultural heritage preservation.', badge: t('typeVR'), url: 'https://dikemas.makassarkota.go.id/virtualtour' },
    { id: 'kawansedarah', title: 'Kawan Sedarah (Blood Stock)', desc: lang === 'id' ? 'Command center platform monitoring stok darah real-time yang terintegrasi dengan Supabase.' : 'Command center platform for real-time blood stock monitoring integrated with Supabase.', badge: 'TypeScript', url: 'https://kawansedarah.com' },
    { id: 'alharamvr', title: 'Al-Haram VR', desc: lang === 'id' ? 'Rekonstruksi virtual reality presisi tinggi dari Masjidil Haram dan Masjid Nabawi menggunakan Unity, dioptimalkan untuk headset VR dan mobile sebagai alat edukasi ibadah haji & umrah.' : 'High-fidelity virtual reality reconstruction of Al-Masjid Al-Haram and Al-Masjid An-Nabawi in Unity, optimized for VR headsets and mobile as a Hajj & Umrah educational tool.', badge: t('typeVR'), url: null },
    { id: 'paralluta', title: 'Paralluta (Lalu Lintas)', desc: lang === 'id' ? 'Sistem informasi manajemen lalu lintas berbasis web untuk monitoring kondisi jalan, pencatatan pelanggaran, dan koordinasi petugas lapangan Kota Makassar.' : 'Web-based traffic management information system for road condition monitoring, violation recording, and field officer coordination across Makassar City.', badge: t('typeWeb'), url: null },
    { id: 'sopsiber', title: 'SOP Pelaporan Insiden Siber', desc: lang === 'id' ? 'Dokumen SOP komprehensif dan protokol respons insiden siber yang diformulasikan untuk jaringan IT Pemerintah Kota Makassar, sesuai standar BSSN dan NIST Cybersecurity Framework.' : 'Comprehensive SOP documentation and cyber incident response protocols formulated for Makassar City Government IT networks, aligned with BSSN and NIST Cybersecurity Framework standards.', badge: t('typeSecurity'), url: null },
  ];

  const formatName = (name) => {
    return name.split(/[-._]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const knownRepoNames = allProjects.map(p => p.id);

  useEffect(() => {
    const excludedRepos = ['syarfandi.github.io', 'MagiskOnWSA'];
    fetch('https://api.github.com/users/syarfandi/repos?sort=updated&per_page=15')
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(repo => !knownRepoNames.includes(repo.name) && !excludedRepos.includes(repo.name))
          .slice(0, 6)
          .map(repo => ({ id: repo.name, title: formatName(repo.name), desc: repo.description || 'No description available.', badge: repo.language || 'Mixed', url: repo.html_url, isPublicRepo: true }));
        setPublicRepos(filtered);
        setLoading(false);
      })
      .catch(() => { setPublicRepos([]); setLoading(false); });
  }, [lang]);

  const combined = [...allProjects, ...publicRepos];

  return (
    <section id="portfolio" className="container">
      <h2 className="heading-secondary">{t('featured')} <span className="text-gradient">{t('projects')}</span></h2>

      <div className="portfolio-grid">
        {combined.map((item, idx) => (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: idx * 0.03 }} key={item.id} className="portfolio-card glass">
            <div className="card-image-container">
              <img src={`https://picsum.photos/seed/${item.id}/600/400`} alt={item.title} className="card-image" loading="lazy" />
            </div>
            <div className="card-content">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge">{item.badge}</span>
              </div>
              <h3 style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.7 }}>{item.desc}</p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noreferrer" className="project-link">
                  {item.isPublicRepo ? t('viewRepo') : (lang === 'id' ? 'Lihat Aplikasi' : 'View App')} <ExternalLink size={16} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
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
          .card-header { flex-direction: column; gap: 1rem; align-items: center; }
        }
        .portfolio-card { padding: 0; display: flex; flex-direction: column; transition: all 0.3s ease; overflow: hidden; }
        .portfolio-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border-color: var(--primary-color); }
        .card-image-container { width: 100%; height: 170px; overflow: hidden; border-bottom: 1px solid var(--glass-border); }
        .card-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .portfolio-card:hover .card-image { transform: scale(1.05); }
        .card-content { padding: 1.5rem 1.75rem; display: flex; flex-direction: column; flex-grow: 1; }
        .card-header { margin-bottom: 1.25rem; }
        .badge { background: rgba(30, 58, 138, 0.1); color: var(--primary-color); padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
        .portfolio-card h3 { font-size: 1.3rem; margin-bottom: 1.5rem; font-weight: 700; }
        .project-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--primary-color); font-size: 0.95rem; font-weight: 700; transition: all 0.3s ease; }
        .project-link:hover { color: var(--accent-color); transform: translateX(5px); }
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
          .skills-layout { grid-template-columns: 1fr; gap: 3rem; text-align: center; } 
          .heading-secondary { text-align: center !important; }
        }
        @media (max-width: 600px) {
          .skill-info { font-size: 0.9rem; }
          .skill-item { text-align: left; }
          .skill-bar-bg { height: 10px; }
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
          <a href="https://linkedin.com/in/syarfandi" target="_blank" rel="noreferrer" className="contact-item glass">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color: '#0077b5' }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            <h4 style={{ color: 'var(--text-primary)' }}>LinkedIn</h4>
            <p>linkedin.com/in/syarfandi</p>
          </a>
          <a href="mailto:syarfandi.achmad@gmail.com" className="contact-item glass">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color: '#EA4335' }}><path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.39l-9 6.58-9-6.58V21H1.5c-.85 0-1.5-.65-1.5-1.5v-15c0-1.15.95-1.75 1.85-1.15L12 9.81l10.15-7.31c.9-.6 1.85 0 1.85 1.15z" /></svg>
            <h4 style={{ color: 'var(--text-primary)' }}>{t('email')}</h4>
            <p>syarfandi.achmad@gmail.com</p>
          </a>
          <a href="https://wa.me/6285256522335" target="_blank" rel="noreferrer" className="contact-item glass">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color: '#25D366' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            <h4 style={{ color: 'var(--text-primary)' }}>WhatsApp</h4>
            <p>+62 852-5652-2335</p>
          </a>
        </div>
      </div>
      <style>{`
        .contact-card { padding: 5rem; border-radius: 32px; }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
        .contact-item { padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; transition: all 0.3s ease; border-radius: 24px; }
        .contact-item:hover { transform: translateY(-10px); border-color: var(--primary-color); background: rgba(255,255,255,0.05); }
        .contact-item h4 { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
        .contact-item p, .contact-item h3 { color: var(--text-secondary); font-size: 1rem; font-weight: 500; }
        @media (max-width: 768px) { 
          .contact-card { padding: 3rem 1.5rem; }
          .contact-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .contact-item { padding: 2rem; }
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
