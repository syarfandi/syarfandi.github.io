import glob

files = glob.glob('/Users/andi/Projects/syarfandi.github.io/*/index.html')
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # replace height calc
    content = content.replace(
        "const heightMm = Math.ceil(element.scrollHeight * 0.264583) + (isPremium ? 20 : 15);",
        "const heightMm = Math.ceil(element.scrollHeight * 0.264583) + (isPremium ? 20 : 40);"
    )
    
    # replace size
    content = content.replace(
        "size: ${isPremium ? `210mm ${heightMm}mm` : 'a4'};",
        "size: 210mm ${heightMm}mm;"
    )
    
    # replace height
    content = content.replace(
        "height: ${isPremium ? heightMm + 'mm' : 'auto'} !important;",
        "height: ${heightMm}mm !important;"
    )
    
    # replace overflow
    content = content.replace(
        "overflow: ${isPremium ? 'hidden' : 'visible'} !important;",
        "overflow: hidden !important;"
    )
    
    with open(file, 'w') as f:
        f.write(content)
