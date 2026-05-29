import os
import re

src_dir = r'f:\软考资料\202605\exam-app'
images_dir = os.path.join(src_dir, 'images')

# Match pattern for ocr_questions_ch*.js
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

report = []

for js_file in js_files:
    # Try to extract chapter ID (e.g., ch10, ch1-3)
    match = re.search(r'ocr_questions_(ch[\d-]+)\.js', js_file)
    if not match:
        continue
    
    ch_id = match.group(1)
    file_path = os.path.join(src_dir, js_file)
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {js_file}: {e}")
        continue
    
    # Prefix for images of this chapter, e.g., ch10_
    prefix = f"{ch_id}_"
    
    # List images matching this prefix (e.g., ch10_3_dcmm.png, ch10_q1.png)
    ch_images = [img for img in os.listdir(images_dir) if img.startswith(prefix)]
    
    missing_in_js = []
    for img in ch_images:
        # Check if the image filename is mentioned in the JS content
        if img not in content:
            missing_in_js.append(img)
            
    # Also check if any referenced image in JS actually exists
    # Find all <img> src="images/..."
    referenced_images = re.findall(r'src=\\"images/(.*?)\\"', content)
    referenced_images += re.findall(r'src="images/(.*?)"', content)
    
    dead_links = []
    for ref in referenced_images:
        if not os.path.exists(os.path.join(images_dir, ref)):
            dead_links.append(ref)

    if missing_in_js or dead_links:
        report.append({
            "chapter": ch_id,
            "js_file": js_file,
            "missing_count": len(missing_in_js),
            "missing_files": missing_in_js,
            "dead_links_count": len(dead_links),
            "dead_links": dead_links
        })

if not report:
    print("All chapters have their respective images correctly referenced and verified!")
else:
    print(f"Found {len(report)} chapters with image issues:")
    for item in report:
        print(f"\n--- Chapter: {item['chapter']} ({item['js_file']}) ---")
        if item['missing_count'] > 0:
            print(f"  [!] Missing references in JS (File exists but not used): {item['missing_count']}")
            for img in item['missing_files'][:5]:
                print(f"    - {img}")
        if item['dead_links_count'] > 0:
            print(f"  [X] Dead links in JS (Referenced but file missing): {item['dead_links_count']}")
            for img in item['dead_links'][:5]:
                print(f"    - {img}")
