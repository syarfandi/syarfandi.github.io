const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../public');

const projectsEN = [
  "- **[Kawan Sedarah (Blood Stock)](https://kawansedarah.org)**: A **command center** dashboard that tracks **blood stock** availability across donor units in **real-time**, powered by **Supabase** as its core backend.",
  "- **[Portal Data Sulsel](https://datasulsel.kemenag.go.id)**: A unified information system delivering **data visualization**, **monitoring**, and religious **statistical analysis** across all districts in South Sulawesi in **real-time**.",
  "- **[AI Virtual Assistant](https://asistenvirtual.vercel.app)**: A **Conversational AI**-powered virtual assistant featuring **Realtime Lipsync** on 3D avatars, backed by **Voice AI** and **LLM** for immersive conversational interactions.",
  "- **[GetKasir Enterprise POS](https://getkasir.xyz)**: A large-scale **Enterprise** POS ecosystem with **100+ modules**, integrating **AI**-driven sales prediction, **biometric** authentication, and a scalable **cloud-native** architecture.",
  "- **[PPID Kemenag Kota Parepare](https://ppidparepare.vercel.app)**: A public information disclosure portal for **PPID Kemenag** providing access to **official documents**, **performance reports**, and an intelligent chatbot powered by **Google Gemini AI**.",
  "- **[OP Tracker](https://optracks.vercel.app)**: A premium logbook for tracking **One Piece** watch progress without login — equipped with automatic **filler filter**, **saga & arc** navigation map, and a gamified **pirate rank** system.",
  "- **[QR Scanner Presence App](https://creativebooster.vercel.app)**: A modern **attendance solution** leveraging **QR Code** scanning for instant participant check-in, built on a **Next.js** + **Supabase** stack with **real-time** sync.",
  "- **[Malmora (Reseller & Dropship)](https://malmora.com)**: A **reseller & dropship** marketplace tailored for Muslim lifestyle products, enabling anyone to sell without physical stock across **Sulawesi and Eastern Indonesia**.",
  "- **[Email Server Makassar Gov](https://mail.makassarkota.go.id)**: A city-scale **Mailcow**-based email cluster serving **200+ official domains** for Makassar City Government, hardened with **SPF/DKIM/DMARC** security protocols and **high-availability** setup.",
  "- **Helpdesk Kota Makassar**: An **e-government** system for handling **citizen complaints** digitally — featuring **real-time ticket tracking**, automated escalation, and cross-department integration across **Makassar City agencies**.",
  "- **Virtual Museum Makassar**: An immersive digital museum experience with **360° panoramic** tours, interactive **3D artifact** collections, and **audio-visual** narratives preserving South Sulawesi cultural heritage.",
  "- **Al-Haram VR**: A high-precision **virtual reality** simulation of **Al-Masjid Al-Haram** and **Al-Masjid An-Nabawi**, developed in **Unity** and optimized for both **VR headsets** and mobile devices as a Hajj & Umrah educational tool.",
  "- **Paralluta (Lalu Lintas)**: A smart platform for **traffic management** in Makassar City — covering **road condition monitoring**, violation logging, and centralized **field officer coordination**.",
  "- **SOP Pelaporan Insiden Siber**: A **SOP** framework and **cyber incident response protocols** designed for **Makassar City Government** IT infrastructure, aligned with **BSSN** and **NIST Cybersecurity Framework** standards."
];

const projectsID = [
  "- **[Kawan Sedarah (Blood Stock)](https://kawansedarah.org)**: Dashboard **command center** untuk memantau ketersediaan **stok darah** secara **real-time** di berbagai unit donor, ditenagai oleh **Supabase** sebagai backend utama.",
  "- **[Portal Data Sulsel](https://datasulsel.kemenag.go.id)**: Sistem informasi terpadu yang menyajikan **visualisasi data**, **monitoring**, dan **analisis statistik** keagamaan untuk seluruh kabupaten/kota di Sulawesi Selatan secara **real-time**.",
  "- **[AI Virtual Assistant](https://asistenvirtual.vercel.app)**: Asisten virtual berbasis **Conversational AI** dengan kemampuan **Lipsync Realtime** pada avatar 3D, didukung **Voice AI** dan **LLM** untuk interaksi percakapan yang imersif.",
  "- **[GetKasir Enterprise POS](https://getkasir.xyz)**: Ekosistem POS kelas **Enterprise** berskala besar dengan **100+ modul**, mengintegrasikan **AI** untuk prediksi penjualan, autentikasi **biometrik**, dan arsitektur **cloud-native** yang dapat diskalakan.",
  "- **[PPID Kemenag Kota Parepare](https://ppidparepare.vercel.app)**: Portal keterbukaan informasi **PPID Kemenag** yang menyediakan akses publik terhadap **dokumen resmi**, **laporan kinerja**, dan fitur chatbot cerdas berbasis **Google Gemini AI**.",
  "- **[OP Tracker](https://optracks.vercel.app)**: Logbook premium untuk melacak progres menonton **One Piece** tanpa perlu login — dilengkapi **filter filler** otomatis, peta navigasi **saga & arc**, dan sistem **rank bajak laut** yang gamified.",
  "- **[QR Scanner Presence App](https://creativebooster.vercel.app)**: Solusi **presensi modern** yang memanfaatkan pemindaian **QR Code** untuk mencatat kehadiran peserta secara instan, dibangun di atas stack **Next.js** + **Supabase** dengan sinkronisasi **real-time**.",
  "- **[Malmora (Reseller & Dropship)](https://malmora.com)**: Marketplace **reseller & dropship** yang dirancang khusus untuk produk kebutuhan muslim, memungkinkan siapa saja berjualan tanpa stok fisik di kawasan **Sulawesi & Indonesia Timur**.",
  "- **[Email Server Makassar Gov](https://mail.makassarkota.go.id)**: Kluster email berskala kota berbasis **Mailcow** yang melayani **200+ domain** resmi Pemerintah Kota Makassar, diperkuat dengan protokol keamanan **SPF/DKIM/DMARC** dan konfigurasi **high-availability**.",
  "- **Helpdesk Kota Makassar**: Sistem **e-government** untuk penanganan **aduan warga** secara digital — mencakup **tracking tiket real-time**, eskalasi otomatis, dan integrasi lintas **OPD Kota Makassar**.",
  "- **Virtual Museum Makassar**: Pengalaman museum digital yang imersif dengan tur **panorama 360°**, koleksi **artefak 3D** interaktif, dan narasi **audio-visual** untuk melestarikan warisan budaya Sulawesi Selatan.",
  "- **Al-Haram VR**: Simulasi **virtual reality** berpresisi tinggi dari **Masjidil Haram** dan **Masjid Nabawi**, dikembangkan dengan **Unity** dan dioptimalkan untuk **headset VR** maupun perangkat mobile sebagai media edukasi haji & umrah.",
  "- **Paralluta (Lalu Lintas)**: Platform cerdas untuk **manajemen lalu lintas** Kota Makassar — meliputi **pemantauan kondisi jalan**, pencatatan pelanggaran, dan **koordinasi petugas lapangan** secara terpusat.",
  "- **SOP Pelaporan Insiden Siber**: Kerangka kerja **SOP** dan **protokol respons insiden siber** yang disusun untuk infrastruktur IT **Pemerintah Kota Makassar**, mengacu pada standar **BSSN** dan **NIST Cybersecurity Framework**."
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const isId = filePath.endsWith('_ID.md');
  const projectList = isId ? projectsID : projectsEN;
  
  const lines = content.split('\n');
  let inProjectSection = false;
  let foundProjectSection = false;
  
  let preSection = [];
  let postSection = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!foundProjectSection && line.match(/^##\s.*(Project|Proyek)/i)) {
      foundProjectSection = true;
      inProjectSection = true;
      preSection.push(line);
      continue;
    }
    
    if (inProjectSection) {
      if (line.startsWith('---') || line.startsWith('## ')) {
        inProjectSection = false;
        postSection.push(line);
      }
    } else {
      if (!foundProjectSection) {
        preSection.push(line);
      } else {
        postSection.push(line);
      }
    }
  }

  // Build new content
  const newContent = [...preSection, '', ...projectList, '', ...postSection].join('\n');
  
  // Clean up excessive empty lines
  const cleanedContent = newContent.replace(/\n{3,}/g, '\n\n');
  
  fs.writeFileSync(filePath, cleanedContent, 'utf8');
  console.log(`Updated ${path.basename(filePath)} with 14 projects.`);
}

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  } 
  
  const mdFiles = files.filter(file => file.endsWith('.md') && file.startsWith('CV_'));
  
  mdFiles.forEach(file => {
    processFile(path.join(directoryPath, file));
  });
});
