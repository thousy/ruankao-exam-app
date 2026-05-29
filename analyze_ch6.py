import re
import json

def analyze_ch6():
    fpath = r'f:\软考资料\202605\exam-app\exports\ch6_题目导出_校对版.txt'
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    blocks = re.split(r'-{40,}', content)
    multi_count = 0
    
    for block in blocks:
        block = block.strip()
        if not block: continue
        
        # 统计 [答案: ] 出现的次数
        ans_count = len(re.findall(r'\[答案:', block))
        # 统计 ( 44 ) 这种模式出现的次数
        gap_count = len(re.findall(r'（\s*\d+\s*）', block))
        
        if ans_count > 1 or gap_count > 1:
            multi_count += 1
            id_match = re.search(r'\[ID:\s*(\w+)\]', block)
            qid = id_match.group(1) if id_match else "unknown"
            print(f"ID: {qid}, Gaps: {gap_count}, Answers: {ans_count}")
            
analyze_ch6()
