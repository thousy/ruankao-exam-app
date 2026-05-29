import re
import json
import os

def fix_ch6():
    txt_path = r'f:\软考资料\202605\exam-app\exports\ch6_题目导出_校对版.txt'
    js_path = r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js'
    
    # 我们从备份中找图片，或者从现有的记录里找
    # 既然刚才运行失败了，我手动列出所有需要插入图的题目映射，确保万无一失
    hardcoded_images = {
        "ch6_16": {"c": ["ch6_q16.png"]},
        "ch6_25": {"c": ["ch6_q25.png"]},
        "ch6_27": {"c": ["ch6_q27.png"]},
        "ch6_28": {"e": ["ch6_q28_exp1.png", "ch6_q28_exp2.png"]},
        "ch6_32": {"c": ["ch6_q32.png"]},
        "ch6_33": {"c": ["ch6_q33.png"]},
        "ch6_35": {"c": ["ch6_q35.png"]},
        "ch6_36": {"c": ["ch6_q36.png"]},
        "ch6_37": {"c": ["ch6_q37.png"]},
        "ch6_38": {"c": ["ch6_q38.png"]},
        "ch6_39": {"c": ["ch6_q39.png"]},
        "ch6_40": {"c": ["ch6_q40.png"]},
        "ch6_41": {"c": ["ch6_q41.png"]},
        "ch6_42": {"c": ["ch6_q42.png"]},
        "ch6_44": {"c": ["ch6_q44.png"], "e": ["ch6_q44_exp.png"]},
        "ch6_46": {"c": ["ch6_q46.png"]},
        "ch6_47": {"c": ["ch6_q47.png"]},
        "ch6_48": {"c": ["ch6_q48.jpg"]},
        "ch6_49": {"c": ["ch6_q49.png"], "e": ["ch6_q49_exp.png"]}
    }

    with open(txt_path, 'r', encoding='utf-8') as f:
        txt_raw = f.read()
    
    header_end = txt_raw.find("[ID: ch6_1]")
    if header_end != -1:
        txt_raw = txt_raw[header_end:]
    
    blocks = re.split(r'-{40,}', txt_raw)
    new_questions = []
    
    for block in blocks:
        block = block.strip()
        if not block: continue
        
        id_match = re.search(r'\[ID:\s*(ch6_\d+)\]', block)
        if not id_match: continue
        qid = id_match.group(1)
        
        # 提取题干 (排除 ID 行和选项行)
        inner_lines = block.split('\n')
        content_lines = []
        for line in inner_lines:
            line = line.strip()
            if not line: continue
            if '[ID:' in line: continue
            if re.match(r'^[A-D][:：.．、]', line): break
            if re.match(r'^（\s*\d+\s*）$', line): break # 分割填空的标记
            content_lines.append(line)
        
        raw_content = "<br>".join(content_lines).strip()
        # 移除前面的题号 1、2、等
        raw_content = re.sub(r'^\d+、', '', raw_content).strip()

        # 解析
        exp_match = re.search(r'\[解析\]:\s*(.*)', block, re.DOTALL)
        explanation = exp_match.group(1).strip() if exp_match else ""
        
        # 提取 slots
        parts = re.split(r'\[答案:\s*([A-D])\]', block)
        slots = []
        
        for i in range(0, len(parts)-1, 2):
            text_block = parts[i]
            answer = parts[i+1]
            
            # 使用更严格的正则匹配选项
            opts = re.findall(r'\n[A-D][:：.．、]\s*(.*?)(?=\n[A-D][:：.．、]|$|(?:\n\s*（))', '\n'+text_block, re.DOTALL)
            opts = [o.strip() for o in opts][:4]
            while len(opts) < 4: opts.append("未识别")
            
            label = "请选择答案"
            labels = re.findall(r'（\s*(\d+)\s*）', text_block)
            if labels:
                label = f"考点 {labels[-1]}"
            elif i == 0:
                nums = re.findall(r'（\s*(\d+)\s*）', raw_content)
                if nums:
                    label = f"考点 {nums[0]}"
            
            slots.append({
                "label": label,
                "options": opts,
                "answer": answer
            })

        q_obj = {
            "id": qid,
            "chapterId": "ch6",
            "type": "multi" if len(slots) > 1 else "single",
            "difficulty": "medium",
            "content": raw_content,
            "slots": slots,
            "explanation": explanation.replace('\n', '\\n'),
            "tags": ["ch6"],
            "userAnswer": None,
            "isCorrect": None,
            "isFavorite": False,
            "attemptCount": 0,
            "lastAttemptDate": None,
            "options": slots[0]["options"] if slots else [],
            "correctAnswer": ord(slots[0]["answer"]) - 65 if slots else -1
        }
        
        # 注入图片HTML
        if qid in hardcoded_images:
            mapping = hardcoded_images[qid]
            if "c" in mapping:
                for img_name in mapping["c"]:
                    tag = f'<br><img src="images/{img_name}" class="question-img">'
                    q_obj["content"] += tag
            
            if "e" in mapping:
                for img_name in mapping["e"]:
                    tag = f'<br><img src="images/{img_name}" class="question-img">'
                    if qid == "ch6_44" and "exp" in img_name:
                         q_obj["explanation"] = q_obj["explanation"].replace("C的自由时差", tag + "\\nC的自由时差")
                    elif qid == "ch6_49" and "exp" in img_name:
                         q_obj["explanation"] = q_obj["explanation"].replace("由图可知", tag + "\\n由图可知")
                    elif qid == "ch6_28":
                        # 28题有两个解析图，按顺序排还是怎么的？
                        q_obj["explanation"] += tag
                    else:
                        q_obj["explanation"] += tag

        new_questions.append(q_obj)

    js_header = "const ch6Questions = "
    js_data = json.dumps(new_questions, ensure_ascii=False, indent=2)
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_header + js_data + ";\n")
        f.write("\nif (typeof examData !== 'undefined') {\n")
        f.write("  examData.questions = examData.questions.filter(q => q.chapterId !== 'ch6');\n")
        f.write("  examData.questions.push(...ch6Questions);\n")
        f.write("}\n")

    print(f"Successfully refactored {len(new_questions)} questions with slots.")

fix_ch6()
