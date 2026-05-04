import os
import re

def swap_points_in_list(list_items):
    # Find indices
    mailcow_idx = -1
    domains_idx = -1
    
    for i, item in enumerate(list_items):
        if 'Mailcow' in item:
            mailcow_idx = i
        elif '200+' in item and ('domain' in item.lower() or 'unit' in item.lower() or 'satuan kerja' in item.lower() or 'server' in item.lower()):
            domains_idx = i
            
    if mailcow_idx != -1 and domains_idx != -1:
        # Swap them
        list_items[mailcow_idx], list_items[domains_idx] = list_items[domains_idx], list_items[mailcow_idx]
        return True
    return False

# 1. Update Markdown files
directory = 'public'
md_files = [f for f in os.listdir(directory) if f.endswith('.md')]

for filename in md_files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r') as f:
        content = f.read()
    
    if 'Mailcow' not in content or '200+' not in content:
        continue
    
    # Use the same logic as before to find list blocks
    def replacer(match):
        list_str = match.group(0)
        points = list_str.strip().split('\n')
        if swap_points_in_list(points):
            return '\n'.join(points) + '\n'
        return list_str

    new_content = re.sub(r'((?:^\s*-\s+.*(?:\n|$))+)', replacer, content, flags=re.MULTILINE)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
            print(f"Updated MD: {filename}")

# 2. Update HTML files
def process_html_file(content):
    # Process desc: [ ... ]
    def desc_replacer(match):
        prefix = match.group(1)
        list_content = match.group(2)
        suffix = match.group(3)
        
        # Extract items
        items = re.findall(r'(\s*["\'].*?["\']\s*,?)', list_content, flags=re.DOTALL)
        if swap_points_in_list(items):
            # Clean up commas
            for i in range(len(items)):
                items[i] = items[i].strip().rstrip(',')
            
            # Reconstruct with commas
            reconstructed = ',\n                            '.join(items)
            return f'{prefix}\n                            {reconstructed}\n                        {suffix}'
        return match.group(0)

    new_content = re.sub(r'(desc:\s*\[)(.*?)(\])', desc_replacer, content, flags=re.DOTALL)
    return new_content

for root, dirs, files in os.walk('.'):
    for filename in files:
        if filename == 'index.html':
            filepath = os.path.join(root, filename)
            if 'node_modules' in filepath or '.git' in filepath:
                continue
            with open(filepath, 'r') as f:
                content = f.read()
            
            if 'Mailcow' in content and '200+' in content:
                new_content = process_html_file(content)
                
                if new_content != content:
                    with open(filepath, 'w') as f:
                        f.write(new_content)
                    print(f"Updated HTML: {filepath}")
