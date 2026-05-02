import os
import re

directories = [
    'backend', 'cloud', 'data-analyst', 'data-engineer', 'data-scientist',
    'devops', 'frontend', 'fullstack', 'mobile', 'product-manager', 'sysadmin'
]

desc_id = [
    "<strong>Platform</strong> reseller & dropship produk muslim yang berfokus di Sulawesi dan Indonesia Timur.",
    "<strong>Memudahkan</strong> pengguna berjualan online tanpa perlu memikirkan pengemasan dan pengiriman barang.",
    "<strong>Mengoptimalkan</strong> sistem distribusi digital untuk menjangkau pasar regional yang lebih luas."
]

desc_en = [
    "<strong>Reseller</strong> & dropship platform for Muslim products focusing on Sulawesi and Eastern Indonesia.",
    "<strong>Simplifying</strong> online selling for users by handling packaging and logistics automatically.",
    "<strong>Optimizing</strong> digital distribution systems to reach broader regional markets."
]

def format_desc(desc_list):
    return '[\n' + ',\n'.join(f'                            "{d}"' for d in desc_list) + '\n                        ]'

for dir_name in directories:
    file_path = os.path.join(dir_name, 'index.html')
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Look for Malmora block
        sections = re.split(r'id:\s*\{', content)
        if len(sections) == 2:
            en_part = sections[0]
            id_part = 'id: {' + sections[1]
            
            # Update EN
            en_part = re.sub(r'(company:\s*"Malmora[^"]*",\s+date:\s*"[^"]*",\s+desc:\s*)\[[^\]]+\]', r'\1' + format_desc(desc_en), en_part)
            # Update ID
            id_part = re.sub(r'(company:\s*"Malmora[^"]*",\s+date:\s*"[^"]*",\s+desc:\s*)\[[^\]]+\]', r'\1' + format_desc(desc_id), id_part)
            
            content = en_part + id_part
            
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Updated {file_path}")
