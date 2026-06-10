import os

files = [
    '/Users/andi/Projects/syarfandi.github.io/public/CV_ProductManager_Achmad_Syarfandi.md',
    '/Users/andi/Projects/syarfandi.github.io/public/CV_ProductManager_Achmad_Syarfandi_ID.md'
]

keywords = "Product Strategy, Agile, Scrum, Kanban, Jira, Trello, PRD (Product Requirements Document), User Stories, Roadmap Planning, Wireframing, Figma, A/B Testing, Metrics/KPI Tracking, User Research, Stakeholder Management, Go-to-Market Strategy, Data-Driven Decision Making, Cross-functional Leadership."

for file in files:
    is_id = "_ID.md" in file
    with open(file, 'r') as f:
        content = f.read()
        
    if "Expertise Keywords" in content or "Kata Kunci Keahlian" in content:
        print(f"Skipping {file} - already has keywords")
        continue
        
    if is_id:
        heading = f"## Kata Kunci Keahlian Product Manager\n{keywords}\n\n"
        target_str = "## Peta Jalan Strategis Masa Depan"
    else:
        heading = f"## Product Manager Expertise Keywords\n{keywords}\n\n"
        target_str = "## Future-Ready Strategic Roadmap"
        
    if target_str in content:
        content = content.replace(target_str, heading + target_str)
        with open(file, 'w') as f:
            f.write(content)
        print(f"Added keywords to {os.path.basename(file)}")
    else:
        print(f"Target string not found in {file}")
