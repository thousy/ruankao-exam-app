import os
import re

file_path = r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js'
images_dir = r'f:\软考资料\202605\exam-app\images'

with open(file_path, 'r', encoding='utf-8') as f:
    orig_content = f.read()

# Find all ch6_q images
img_files = [f for f in os.listdir(images_dir) if f.startswith('ch6_q')]

# Map of question number -> image filename
q_map = {}
for img in img_files:
    match = re.search(r'ch6_q(\d+)', img)
    if match:
        q_num = match.group(1)
        if '_exp' in img:
            continue # Handle separately if needed
        q_map[q_num] = img

# Pattern to find each question block
question_blocks = re.findall(r'(\{\s*"id":\s*"ch6_\d+".*?\n\s*\})', orig_content, re.DOTALL)

def fix_question(q_text):
    match = re.search(r'"id":\s*"ch6_(\d+)"', q_text)
    if not match:
        return q_text
    
    q_num = match.group(1)
    
    if q_num in q_map:
        img_filename = q_map[q_num]
        if img_filename not in q_text:
            # Append to content
            content_match = re.search(r'("content":\s*")(.*?)(")', q_text, re.DOTALL)
            if content_match:
                prefix, q_content, suffix = content_match.groups()
                new_content = q_content + f'<br><img src=\\"images/{img_filename}\\" class=\\"question-img\\">'
                q_text = q_text.replace(f'{prefix}{q_content}{suffix}', f'{prefix}{new_content}{suffix}')
                print(f"Mapped {img_filename} to ch6_{q_num}")
                
    return q_text

new_content = orig_content
for q_block in question_blocks:
    fixed_block = fix_question(q_block)
    if fixed_block != q_block:
        new_content = new_content.replace(q_block, fixed_block)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
