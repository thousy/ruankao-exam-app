import os
import re

js_file = r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js'
images_dir = r'f:\软考资料\202605\exam-app\images'

with open(js_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all src in <img> tags
img_srcs = re.findall(r'<img src=\\"(.*?)\\"', content)

missing = []
for src in img_srcs:
    # Handle both forward and backward slashes
    clean_src = src.replace('/', os.sep).replace('\\', os.sep)
    # The path is relative to the root, e.g., images/ch6_q1.png
    # But images_dir is the full path to the images folder.
    # So if src is "images/ch6_q1.png", it should be in images_dir as "ch6_q1.png".
    filename = os.path.basename(clean_src)
    full_path = os.path.join(images_dir, filename)
    
    if not os.path.exists(full_path):
        missing.append(src)

print(f"Total images referenced in JS: {len(img_srcs)}")
print(f"Missing images: {len(missing)}")
for m in missing[:20]:
    print(f"  Missing: {m}")
