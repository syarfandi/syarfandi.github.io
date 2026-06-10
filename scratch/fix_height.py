import glob

files = glob.glob('/Users/andi/Projects/syarfandi.github.io/*/index.html')
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # replace height back to ternary
    content = content.replace(
        "height: ${heightMm}mm !important;",
        "height: ${isPremium ? heightMm + 'mm' : 'auto'} !important;"
    )
    
    # replace overflow back to ternary
    content = content.replace(
        "overflow: hidden !important;",
        "overflow: ${isPremium ? 'hidden' : 'visible'} !important;"
    )
    
    with open(file, 'w') as f:
        f.write(content)
