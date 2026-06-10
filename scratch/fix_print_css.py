import os
import glob

folders = ['backend', 'cloud', 'data-analyst', 'data-engineer', 'data-scientist', 'devops', 'frontend', 'fullstack', 'mobile', 'product-manager', 'sysadmin']

# The problematic block we want to fix
search_str = """
            const printStyle = document.createElement('style');
            printStyle.id = 'dynamic-print-style';
            printStyle.innerHTML = `
                @media print {
                    @page { 
                        size: 210mm ${heightMm}mm; 
                        margin: 0 !important; 
                    }
                    html, body { 
                        margin: 0 !important; 
                        padding: 0 !important; 
                        width: 210mm !important;
                        height: ${heightMm}mm !important;
                        overflow: hidden !important;
                        background: white !important;
                    }
"""

replacement_str = """
            const printStyle = document.createElement('style');
            printStyle.id = 'dynamic-print-style';
            printStyle.innerHTML = `
                @media print {
                    @page { 
                        size: ${isPremium ? `210mm ${heightMm}mm` : 'a4'}; 
                        margin: ${isPremium ? '0 !important;' : '15mm !important;'} 
                    }
                    html, body { 
                        margin: 0 !important; 
                        padding: 0 !important; 
                        width: 100% !important;
                        height: ${isPremium ? heightMm + 'mm' : 'auto'} !important;
                        overflow: ${isPremium ? 'hidden' : 'visible'} !important;
                        background: white !important;
                    }
"""

search_str2 = """
                    /* CSS Khusus ATS */
                    #ats-view { 
                        display: ${!isPremium ? 'block' : 'none'} !important; 
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 210mm !important;
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: hidden !important;
                    }
                    .markdown-body { 
                        display: ${!isPremium ? 'block' : 'none'} !important;
                        padding: 30px !important; /* Kurangi sedikit padding agar lebih aman */
                        margin: 0 !important;
                        background: white !important;
                        height: auto !important;
                    }

                    * { 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                        break-inside: avoid !important;
                    }
"""

replacement_str2 = """
                    /* CSS Khusus ATS */
                    #ats-view { 
                        display: ${!isPremium ? 'block' : 'none'} !important; 
                        position: relative !important;
                        width: 100% !important;
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: visible !important;
                    }
                    .markdown-body { 
                        display: ${!isPremium ? 'block' : 'none'} !important;
                        padding: 0 !important; 
                        margin: 0 !important;
                        background: white !important;
                        height: auto !important;
                        box-shadow: none !important;
                        border: none !important;
                    }

                    * { 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    }
                    p, li, h1, h2, h3, h4, h5, h6 {
                        break-inside: auto !important;
                    }
"""

for folder in folders:
    file_path = os.path.join(folder, 'index.html')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace the first part
        content = content.replace(search_str.lstrip('\n'), replacement_str.lstrip('\n'))
        
        # Replace the second part
        content = content.replace(search_str2.lstrip('\n'), replacement_str2.lstrip('\n'))
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file_path}")
        else:
            print(f"No changes made to {file_path}")
