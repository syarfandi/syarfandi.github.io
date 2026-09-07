import re

with open('cv/index.html', 'r') as f:
    content = f.read()

# Extract translations object
trans_match = re.search(r'const translations = (\{.*?\n        \});', content, re.DOTALL)
if trans_match:
    translations_json = trans_match.group(1)
else:
    print("Could not find translations")
    exit(1)

new_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Syarfandi "Andi" Achmad | Daftar Riwayat Hidup</title>
    <meta name="description" content="Daftar Riwayat Hidup Syarfandi 'Andi' Achmad">
    <link rel="icon" type="image/png" href="/profile.png">
    <!-- Using a standard serif font for traditional look like Times New Roman -->
    <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {{
            --text-main: #000000;
            --bg: #ffffff;
        }}

        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Times New Roman', Times, serif;
            background-color: #f0f0f0;
            color: var(--text-main);
            line-height: 1.5;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }}

        .nav-container {{
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            font-family: Arial, sans-serif;
        }}

        .nav-group {{
            display: flex;
            gap: 8px;
            align-items: center;
        }}

        .btn-compact {{
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            background: #fff;
            color: #000;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
        }}

        .btn-compact:hover {{
            background: #e0e0e0;
        }}

        .cv-container {{
            background: var(--bg);
            width: 100%;
            max-width: 800px; /* A4 width roughly */
            min-height: 1131px; /* A4 height roughly */
            margin-top: 60px;
            padding: 60px 80px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }}

        h1.cv-title {{
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 30px;
            text-transform: uppercase;
        }}

        .bio-data {{
            width: 100%;
            margin-bottom: 30px;
        }}

        .bio-data tr td {{
            padding: 5px 0;
            vertical-align: top;
            font-size: 14px;
        }}

        .bio-data tr td:nth-child(1) {{
            width: 220px;
        }}
        
        .bio-data tr td:nth-child(2) {{
            width: 15px;
        }}

        .section-title {{
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 10px;
            margin-top: 20px;
            text-transform: uppercase;
        }}

        table.cv-table {{
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 14px;
        }}

        table.cv-table th, table.cv-table td {{
            border: 1px solid #000;
            padding: 8px 10px;
            vertical-align: top;
        }}

        table.cv-table th {{
            text-align: left;
            font-weight: bold;
        }}

        table.cv-table th.col-no, table.cv-table td.col-no {{
            width: 40px;
            text-align: center;
        }}
        
        table.cv-table th.col-year, table.cv-table td.col-year {{
            width: 150px;
            text-align: center;
        }}

        .signature-section {{
            margin-top: 50px;
            text-align: right;
            font-size: 14px;
        }}

        .signature-section .date {{
            margin-bottom: 60px;
        }}

        @media print {{
            @page {{
                size: A4 portrait;
                margin: 20mm;
            }}
            body {{
                background: none;
                padding: 0;
            }}
            .nav-container {{
                display: none !important;
            }}
            .cv-container {{
                box-shadow: none;
                margin-top: 0;
                padding: 0;
                width: 100%;
                max-width: none;
                min-height: auto;
            }}
        }}
    </style>
</head>
<body>
    <div class="nav-container">
        <div class="nav-group">
            <a href="/" class="btn-compact"><i data-lucide="arrow-left" style="width:16px"></i> <span>Kembali</span></a>
            <button id="downloadBtn" class="btn-compact"><i data-lucide="download" style="width:16px"></i> <span>PDF</span></button>
        </div>
    </div>

    <div class="cv-container" id="cv-content">
        <h1 class="cv-title">DAFTAR RIWAYAT HIDUP</h1>
        
        <table class="bio-data">
            <tr>
                <td>Nama</td><td>:</td><td id="d-nama">Syarfandi "Andi" Achmad</td>
            </tr>
            <tr>
                <td>Jenis Kelamin</td><td>:</td><td>Laki-laki</td>
            </tr>
            <tr>
                <td>Tempat, Tanggal Lahir</td><td>:</td><td>Makassar, [Isi Tanggal Lahir]</td>
            </tr>
            <tr>
                <td>Pekerjaan</td><td>:</td><td id="d-pekerjaan">Software Engineer & IT Expert</td>
            </tr>
            <tr>
                <td>Alamat</td><td>:</td><td id="d-alamat">Makassar, Indonesia</td>
            </tr>
            <tr>
                <td>Nomor Telepon/HP</td><td>:</td><td id="d-hp">+62 852-5652-2335</td>
            </tr>
            <tr>
                <td>Email</td><td>:</td><td id="d-email">syarfandi.achmad@gmail.com</td>
            </tr>
        </table>

        <div class="section-title">RIWAYAT PENDIDIKAN FORMAL</div>
        <table class="cv-table">
            <thead>
                <tr>
                    <th class="col-no">No</th>
                    <th>PENDIDIKAN</th>
                    <th class="col-year">TAHUN LULUS</th>
                </tr>
            </thead>
            <tbody id="d-pendidikan">
                <!-- Data will be injected -->
            </tbody>
        </table>

        <div class="section-title">PENGALAMAN PEKERJAAN</div>
        <table class="cv-table">
            <thead>
                <tr>
                    <th class="col-no">No</th>
                    <th>PEKERJAAN</th>
                    <th class="col-year">TAHUN</th>
                </tr>
            </thead>
            <tbody id="d-pengalaman">
            </tbody>
        </table>
        
        <div class="section-title">PROYEK / ORGANISASI</div>
        <table class="cv-table">
            <thead>
                <tr>
                    <th class="col-no">No</th>
                    <th>PROYEK / ORGANISASI</th>
                    <th class="col-year">TAHUN</th>
                </tr>
            </thead>
            <tbody id="d-proyek">
            </tbody>
        </table>

        <div class="section-title">SEMINAR / PELATIHAN / KURSUS / SERTIFIKASI</div>
        <table class="cv-table">
            <thead>
                <tr>
                    <th class="col-no">No</th>
                    <th>SEMINAR / PELATIHAN / KURSUS</th>
                    <th class="col-year">TAHUN</th>
                </tr>
            </thead>
            <tbody id="d-sertifikasi">
            </tbody>
        </table>

        <div class="section-title">KEMAMPUAN / SKILL</div>
        <table class="cv-table">
            <thead>
                <tr>
                    <th class="col-no">No</th>
                    <th>KEMAMPUAN / SKILL</th>
                    <th class="col-year">TINGKAT</th>
                </tr>
            </thead>
            <tbody id="d-skill">
            </tbody>
        </table>

        <div class="signature-section">
            <div class="date" id="d-date">September 2025</div>
            <div class="name">(Syarfandi Achmad)</div>
        </div>
    </div>

    <script>
        const translations = {translations_json};

        function renderCV() {{
            const data = translations.id; // Gunakan bahasa indonesia

            // Pendidikan
            document.getElementById('d-pendidikan').innerHTML = `
                <tr>
                    <td class="col-no">1</td>
                    <td>S.Kom - UIN Alauddin Makassar</td>
                    <td class="col-year">-</td>
                </tr>
            `;

            // Pengalaman Kerja
            let htmlPengalaman = '';
            data.experiences.forEach((exp, idx) => {{
                htmlPengalaman += `
                    <tr>
                        <td class="col-no">${{idx + 1}}</td>
                        <td><strong>${{exp.title}}</strong> di ${{exp.company}}</td>
                        <td class="col-year">${{exp.date}}</td>
                    </tr>
                `;
            }});
            document.getElementById('d-pengalaman').innerHTML = htmlPengalaman;

            // Proyek
            let htmlProyek = '';
            data.projects.forEach((proj, idx) => {{
                htmlProyek += `
                    <tr>
                        <td class="col-no">${{idx + 1}}</td>
                        <td><strong>${{proj.title}}</strong> - ${{proj.desc}}</td>
                        <td class="col-year">-</td>
                    </tr>
                `;
            }});
            document.getElementById('d-proyek').innerHTML = htmlProyek;

            // Sertifikasi
            let htmlSertifikasi = '';
            data.certs.forEach((cert, idx) => {{
                htmlSertifikasi += `
                    <tr>
                        <td class="col-no">${{idx + 1}}</td>
                        <td><strong>${{cert.title}}</strong> (${{cert.issuer}})</td>
                        <td class="col-year">${{cert.date || '-'}}</td>
                    </tr>
                `;
            }});
            document.getElementById('d-sertifikasi').innerHTML = htmlSertifikasi;

            // Skill
            let htmlSkill = '';
            data.skills.forEach((skill, idx) => {{
                htmlSkill += `
                    <tr>
                        <td class="col-no">${{idx + 1}}</td>
                        <td>${{skill.name}}</td>
                        <td class="col-year">${{skill.level}}%</td>
                    </tr>
                `;
            }});
            document.getElementById('d-skill').innerHTML = htmlSkill;

            // Tanda tangan tanggal
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const today = new Date();
            document.getElementById('d-date').innerText = "Makassar, " + today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();
            
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }}

        renderCV();

        document.getElementById('downloadBtn').addEventListener('click', () => {{
            const originalTitle = document.title;
            document.title = `Daftar_Riwayat_Hidup_Syarfandi`;
            window.print();
            setTimeout(() => {{
                document.title = originalTitle;
            }}, 1000);
        }});
    </script>
</body>
</html>
"""

with open('cv/index.html', 'w') as f:
    f.write(new_html)

