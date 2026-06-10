import glob
import sys

files = glob.glob('/Users/andi/Projects/syarfandi.github.io/*/index.html')
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    old_code = """const isPremium = view === 'premium';
            const element = isPremium ? premiumView : atsContent;
            
            // 1. Hitung tinggi (Tetap gunakan logika ATS yang sudah bagus, tapi perbaiki akurasi Visual)
            const heightMm = Math.ceil(element.scrollHeight * 0.264583) + (isPremium ? 20 : 40);"""
            
    new_code = """const isPremium = view === 'premium';
            const element = isPremium ? premiumView : atsContent;
            
            // Simulasikan lebar kertas cetak untuk mendapatkan tinggi yang akurat setelah text-wrap
            const originalWidth = element.style.width;
            const originalMaxWidth = element.style.maxWidth;
            element.style.width = isPremium ? '210mm' : '180mm';
            element.style.maxWidth = 'none';
            
            // 1. Hitung tinggi (Tetap gunakan logika ATS yang sudah bagus, tapi perbaiki akurasi Visual)
            const heightMm = Math.ceil(element.scrollHeight * 0.264583) + (isPremium ? 20 : 40);
            
            // Kembalikan lebar seperti semula
            element.style.width = originalWidth;
            element.style.maxWidth = originalMaxWidth;"""
            
    if old_code in content:
        content = content.replace(old_code, new_code)
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")
    else:
        print(f"Skipped {file} (Code not found)")
