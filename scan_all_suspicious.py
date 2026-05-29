import os
import re

src_dir = r'f:\软考资料\202605\exam-app'
keywords = ["图", "表", "EMV", "计算", "下图", "如图", "下表", "如表"]

js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

suspicious_questions = []

for js_file in js_files:
    file_path = os.path.join(src_dir, js_file)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        continue

    # Split into question blocks
    blocks = re.findall(r'(\{\s*"id":\s*"(ch[\d-]+_\d+)".*?\n\s*\})', content, re.DOTALL)
    
    for block_text, q_id in blocks:
        if '<img' not in block_text:
            # Check content and explanation
            content_match = re.search(r'"content":\s*"(.*?)"', block_text, re.DOTALL)
            exp_match = re.search(r'"explanation":\s*"(.*?)"', block_text, re.DOTALL)
            
            combined_text = ""
            if content_match: combined_text += content_match.group(1)
            if exp_match: combined_text += exp_match.group(1)
            
            if any(k in combined_text for k in keywords):
                # Ignore some false positives
                if "计算" in combined_text and len(combined_text) < 50:
                    continue # Likely just a short text
                
                suspicious_questions.append({
                    "id": q_id,
                    "file": js_file,
                    "reason": "Has keyword but no <img> tag"
                })

print(f"Total suspicious questions found: {len(suspicious_questions)}")
for s in suspicious_questions:
    print(f"ID: {s['id']} in {s['file']}")
