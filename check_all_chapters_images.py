import os
import re

src_dir = r'f:\软考资料\202605\exam-app'
images_dir = os.path.join(src_dir, 'images')

# Match pattern for ocr_questions_ch*.js
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

report = []

for js_file in js_files:
    # Try to extract chapter ID
    match = re.search(r'ocr_questions_(ch[\d-]+)\.js', js_file)
    if not match:
        continue
    
    ch_id = match.group(1)
    file_path = os.path.join(src_dir, js_file)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Prefix for images of this chapter, e.g., ch10_q
    prefix = f"{ch_id}_q"
    
    # List images matching this prefix
    ch_images = [img for img in os.listdir(images_dir) if img.startswith(prefix)]
    
    missing_in_js = []
    for img in ch_images:
        # Check if the image filename is mentioned in the JS content
        # Use word boundary or quotes to avoid subset matches
        if img not in content:
            missing_in_js.append(img)
            
    if missing_in_js:
        report.append({
            "chapter": ch_id,
            "js_file": js_file,
            "missing_count": len(missing_in_js),
            "missing_files": missing_in_js
        })

if not report:
    print("All chapters have their respective images correctly referenced!")
else:
    print(f"Found {len(report)} chapters with missing image references:")
    for item in report:
        print(f"\n--- Chapter: {item['chapter']} ({item['js_file']}) ---")
        print(f"Missing references: {item['missing_count']}")
        # Only show first 10 if too many
        for img in item['missing_files'][:10]:
            print(f"  - {img}")
        if item['missing_count'] > 10:
            print(f"  ... and {item['missing_count'] - 10} more.")
