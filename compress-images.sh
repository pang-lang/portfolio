#!/bin/bash

echo "🗜️  Compressing images to WebP..."
echo "Original size:"
du -sh public/assets/

# Create backup if it doesn't exist
if [ ! -d "public/assets-backup" ]; then
    echo "📦 Creating backup..."
    cp -r public/assets public/assets-backup
else
    echo "📦 Backup already exists, skipping..."
fi

# Convert all images to WebP at 80% quality using ImageMagick
find public/assets -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read file; do
    output="${file%.*}.webp"
    echo "Compressing: $file -> $output"
    convert "$file" -quality 80 "$output"
    # Remove original after successful conversion
    if [ -f "$output" ]; then
        rm "$file"
        echo "  ✓ Converted and removed original"
    else
        echo "  ✗ Failed to convert"
    fi
done

echo ""
echo "✅ Done! New size:"
du -sh public/assets/

echo ""
echo "💾 Backup saved at public/assets-backup"
echo "🔍 Now updating code to use .webp extensions..."
