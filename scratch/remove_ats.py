import re

with open('cv/index.html', 'r') as f:
    content = f.read()

# Remove marked and github markdown
content = re.sub(
    r'<link rel="stylesheet"\s*href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">\s*<script src="https://unpkg.com/lucide@latest"></script>\s*<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>',
    r'<script src="https://unpkg.com/lucide@latest"></script>',
    content
)

# Fix .resume-container
content = re.sub(
    r'\.resume-container {\s*background: var\(--bg\);\s*box-shadow: 0 10px 25px -5px rgba\(0, 0, 0, 0\.1\);\s*border-radius: 12px;\s*overflow: hidden;\s*display: grid;\s*grid-template-columns: 320px 1fr;\s*width: 100%;\s*max-width: 900px;\s*margin-top: 60px;\s*display: none;\s*}\s*\.resume-container\.active {\s*display: grid;\s*}',
    r'.resume-container {\n            background: var(--bg);\n            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);\n            border-radius: 12px;\n            overflow: hidden;\n            display: grid;\n            grid-template-columns: 320px 1fr;\n            width: 100%;\n            max-width: 900px;\n            margin-top: 60px;\n        }',
    content
)

# Remove ATS View Styles
content = re.sub(
    r'/\* ATS View Styles \(GitHub Markdown\) \*/.*?\.markdown-body {\s*padding: 60px;.*?}#ats-view\.active \.markdown-body {\s*display: block;\s*}',
    '',
    content,
    flags=re.DOTALL
)

# Clean media query ATS stuff
content = re.sub(r'\.resume-container\.active', '.resume-container', content)
content = re.sub(r'\.markdown-body {\s*padding: 30px;\s*}', '', content)
content = re.sub(r'\.markdown-body {\s*margin-top: 0 !important;\s*padding: 40px !important;\s*width: 100% !important;\s*max-width: 100% !important;\s*box-shadow: none !important;\s*border: none !important;\s*}', '', content)

# Remove toggle buttons in nav
content = re.sub(
    r'<div class="segmented-control">\s*<button id="toggleATS" class="segment-btn active">\s*<i data-lucide="file-text" style="width:14px"></i> <span id="labelATS">ATS</span>\s*</button>\s*<button id="togglePremium" class="segment-btn">\s*<i data-lucide="layout" style="width:14px"></i> <span id="labelPremium">Premium</span>\s*</button>\s*</div>',
    '',
    content
)

# Remove ATS VIEW HTML
content = re.sub(
    r'<!-- ATS VIEW -->\s*<div id="ats-view">\s*<article class="markdown-body" id="ats-content"></article>\s*</div>',
    '',
    content
)

# Remove atsFile and viewLabels from translations
content = re.sub(r'atsFile: "/CV_General_Achmad_Syarfandi.*",\s*viewLabels: { premium: "Visual", ats: "ATS" },', '', content)

# Clean up JS vars
content = re.sub(r'let view = \'ats\'; // Default to ATS', "let view = 'premium';", content)
content = re.sub(r'const atsView = document\.getElementById\(\'ats-view\'\);\s*const atsContent = document\.getElementById\(\'ats-content\'\);\s*', '', content)
content = re.sub(r'const togglePremium = document\.getElementById\(\'togglePremium\'\);\s*const toggleATS = document\.getElementById\(\'toggleATS\'\);\s*', '', content)

# Remove updating labelPremium / labelATS
content = re.sub(r'document\.getElementById\(\'labelPremium\'\)\.innerText = t\.viewLabels\.premium;\s*document\.getElementById\(\'labelATS\'\)\.innerText = t\.viewLabels\.ats;', '', content)

# Remove ATS Content fetching
content = re.sub(
    r'// ATS Content\s*fetch\(t\.atsFile\).*?\}\);',
    '',
    content,
    flags=re.DOTALL
)

# Remove setView and toggles logic
content = re.sub(
    r'function setView\(v\) \{.*toggleATS\.onclick = \(\) => setView\(\'ats\'\);',
    '',
    content,
    flags=re.DOTALL
)

# Clean up setView init
content = re.sub(r'setView\(\'ats\'\); // Initialize with ATS view', '', content)

# Modify download logic
content = re.sub(
    r'const isPremium = view === \'premium\';\s*const element = isPremium \? premiumView : atsContent;',
    'const isPremium = true;\n            const element = premiumView;',
    content
)

# Modify PDF CSS print style
content = re.sub(
    r'/\* CSS Khusus ATS \*/.*}\s*}\s*/\* CSS Khusus Visual \(Premium\) \*/',
    '/* CSS Khusus Visual (Premium) */',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'/\* CSS Khusus ATS \*/.*break-inside: avoid !important;\s*}',
    '',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'const suffix = isPremium \? "" : "_ATS";\s*document\.title = `CV_Syarfandi_SoftwareEngineer\$\{suffix\}_\$\{lang\.toUpperCase\(\)\}`;',
    r'document.title = `CV_Syarfandi_SoftwareEngineer_${lang.toUpperCase()}`;',
    content
)

with open('cv/index.html', 'w') as f:
    f.write(content)

