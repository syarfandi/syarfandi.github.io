import os
import re

folders = ['backend', 'cloud', 'data-analyst', 'data-engineer', 'data-scientist', 'devops', 'frontend', 'fullstack', 'mobile', 'product-manager', 'sysadmin']

for folder in folders:
    filepath = os.path.join(folder, 'index.html')
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace "/CV_" with "../public/CV_"
        new_content = content.replace('atsFile: "/CV_', 'atsFile: "../public/CV_')
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
