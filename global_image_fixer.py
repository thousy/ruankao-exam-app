import os
import re

src_dir = r'f:\软考资料\202605\exam-app'
images_dir = os.path.join(src_dir, 'images')

# List all question JS files
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

# Helper to find image for a question
def find_image(ch_id, q_num):
    # Common patterns
    patterns = [
        f"{ch_id}_q{q_num}.png", f"{ch_id}_q{q_num}.jpg", f"{ch_id}_q{q_num}.jpeg",
        f"{ch_id}_{q_num}.png", f"{ch_id}_{q_num}.jpg",
        f"{ch_id}_q{q_num}_raw.png",
        # Sometimes there are underscores or different formats
        f"{ch_id}_q{q_num}_table.png", f"{ch_id}_q{q_num}_chart.png",
        f"{ch_id}_q{q_num}_matrix.png"
    ]
    for p in patterns:
        if os.path.exists(os.path.join(images_dir, p)):
            return p
    return None

def find_exp_image(ch_id, q_num):
    patterns = [
        f"{ch_id}_q{q_num}_exp.png", f"{ch_id}_q{q_num}_exp.jpg",
        f"{ch_id}_q{q_num}_analysis.png", f"{ch_id}_q{q_num}_exp1.png"
    ]
    for p in patterns:
        if os.path.exists(os.path.join(images_dir, p)):
            return p
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
    # Note: Using a robust regex to find the whole object
    blocks = re.findall(r'(\{\s*"id":\s*"(ch[\d-]+_(\d+))".*?\n\s*\})', content, re.DOTALL)
    
    new_content = content
    for block_text, q_id, q_num in blocks:
        fixed_block = block_text
        
        # Check content image
        if '<img' not in block_text:
            img = find_image(ch_id, q_num)
            if img:
                content_match = re.search(r'("content":\s*")(.*?)(")', fixed_block, re.DOTALL)
                if content_match:
                    prefix, q_content, suffix = content_match.groups()
                    if any(k in q_content for k in keywords) or True: # Aggressive for matched files
                        new_block_content = q_content + f'<br><img src=\\"images/{img}\\" class=\\"question-img\\">'
                        fixed_block = fixed_block.replace(f'{prefix}{q_content}{suffix}', f'{prefix}{new_block_content}{suffix}')
                        print(f"Fixed Content: Added {img} to {q_id}")

        # Check explanation image
        if 'exp.png' not in fixed_block and 'exp.jpg' not in fixed_block:
            exp_img = find_exp_image(ch_id, q_num)
            if exp_img:
                exp_match = re.search(r'("explanation":\s*")(.*?)(")', fixed_block, re.DOTALL)
                if exp_match:
                    prefix_exp, q_exp, suffix_exp = exp_match.groups()
                    new_exp = q_exp + f'<br><img src=\\"images/{exp_img}\\" class=\\"question-img\\">'
                    fixed_block = fixed_block.replace(f'{prefix_exp}{q_exp}{suffix_exp}', f'{prefix_exp}{new_exp}{suffix_exp}')
                    print(f"Fixed Explanation: Added {exp_img} to {q_id}")
        
        if fixed_block != block_text:
            new_content = new_content.replace(block_text, fixed_block)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Global Image Fixer Completed.")
