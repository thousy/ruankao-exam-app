import os
import re

src_dir = r'f:\软考资料\202605\exam-app'
images_dir = os.path.join(src_dir, 'images')

# List all question JS files
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

# Pre-index all images for speed
all_images = os.listdir(images_dir)

def find_best_image(ch_id, q_num):
    # Flexible matching: starts with chN_, followed by qM or M, then potentially more description
    # Example: ch10_3_dcmm.png matches ch10_3
    # Try exact matches first
    exact_patterns = [
        f"{ch_id}_q{q_num}.png", f"{ch_id}_q{q_num}.jpg",
        f"{ch_id}_{q_num}.png", f"{ch_id}_{q_num}.jpg"
    ]
    for p in exact_patterns:
        if p in all_images: return p
    
    # Try fuzzy matches
    # Pattern: ^chN_q?M(_|.)
    regex1 = re.compile(rf'^{ch_id}_q?{q_num}(_|\.)', re.IGNORECASE)
    for img in all_images:
        if regex1.match(img) and "_exp" not in img:
            return img
    return None

def find_best_exp_image(ch_id, q_num):
    regex_exp = re.compile(rf'^{ch_id}_q?{q_num}_exp', re.IGNORECASE)
    for img in all_images:
        if regex_exp.match(img):
            return img
    return None

keywords = ["图", "表", "EMV", "计算", "下图", "如图", "下表", "如表"]

for js_file in js_files:
    file_path = os.path.join(src_dir, js_file)
    match = re.search(r'ocr_questions_(ch[\d-]+)\.js', js_file)
    if not match: continue
    ch_id = match.group(1)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Identify question blocks
    blocks = re.findall(r'(\{\s*"id":\s*"(ch[\d-]+_(\d+))".*?\n\s*\})', content, re.DOTALL)
    
    new_content = content
    for block_text, q_id, q_num in blocks:
        fixed_block = block_text
        
        # Check content image
        if '<img' not in block_text:
            img = find_best_image(ch_id, q_num)
            if img:
                content_match = re.search(r'("content":\s*")(.*?)(")', fixed_block, re.DOTALL)
                if content_match:
                    prefix, q_content, suffix = content_match.groups()
                    # If it has keywords or if it's a "suspicious" ID (manual check)
                    # For now, let's be fairly aggressive if a matching image exists
                    new_block_content = q_content + f'<br><img src=\\"images/{img}\\" class=\\"question-img\\">'
                    fixed_block = fixed_block.replace(f'{prefix}{q_content}{suffix}', f'{prefix}{new_block_content}{suffix}')
                    print(f"Aggressively Fixed Content: Added {img} to {q_id}")

        # Check explanation image
        if 'exp.png' not in fixed_block and 'exp.jpg' not in fixed_block:
            exp_img = find_best_exp_image(ch_id, q_num)
            if exp_img:
                exp_match = re.search(r'("explanation":\s*")(.*?)(")', fixed_block, re.DOTALL)
                if exp_match:
                    prefix_exp, q_exp, suffix_exp = exp_match.groups()
                    new_exp = q_exp + f'<br><img src=\\"images/{exp_img}\\" class=\\"question-img\\">'
                    fixed_block = fixed_block.replace(f'{prefix_exp}{q_exp}{suffix_exp}', f'{prefix_exp}{new_exp}{suffix_exp}')
                    print(f"Aggressively Fixed Explanation: Added {exp_img} to {q_id}")
        
        if fixed_block != block_text:
            new_content = new_content.replace(block_text, fixed_block)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Ultimate Global Image Fixer Completed.")
