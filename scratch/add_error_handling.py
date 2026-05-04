import os

folders = ['backend', 'cloud', 'data-analyst', 'data-engineer', 'data-scientist', 'devops', 'frontend', 'fullstack', 'mobile', 'product-manager', 'sysadmin']

old_fetch = """            fetch(t.atsFile)
                .then(r => r.text())
                .then(md => { atsContent.innerHTML = marked.parse(md); });"""

new_fetch = """            fetch(t.atsFile)
                .then(r => {
                    if (!r.ok) throw new Error('File not found: ' + t.atsFile);
                    return r.text();
                })
                .then(md => { atsContent.innerHTML = marked.parse(md); })
                .catch(err => {
                    console.error(err);
                    atsContent.innerHTML = `<p style="color:red; padding: 20px;">Error loading CV: ${err.message}</p>`;
                });"""

for folder in folders:
    filepath = os.path.join(folder, 'index.html')
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        if old_fetch in content:
            new_content = content.replace(old_fetch, new_fetch)
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Added error handling to {filepath}")
