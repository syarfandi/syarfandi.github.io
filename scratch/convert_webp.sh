#!/bin/bash
for file in public/*.png public/*.jpg public/projects/*.jpg public/projects/*.png; do
    [ -e "$file" ] || continue
    filename="${file%.*}"
    npx -y cwebp-bin "$file" -o "${filename}.webp"
    rm "$file"
done
