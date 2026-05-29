import re
import os

input_path = r'f:\软考资料\202605\exam-app\exports\ch4_题目导出.txt'
output_path = r'f:\软考资料\202605\exam-app\exports\ch4_题目导出_校对版.txt'

def clean_ch4(text):
    # 1. 基础替换 (全词或带边界)
    replacements = {
        # English Typos (全词替换)
        r'\bqulity\b': 'quality',
        r'\bKnowm\b': 'Known',
        r'\bpeerson\b': 'person',
        r'\blodical\b': 'logical',
        r'\bavaility\b': 'availability',
        r'\bcccountability\b': 'accountability',
        r'\bEquaipment\b': 'Equipment',
        r'\baccepttance\b': 'acceptance',
        r'\b1TIS\b': 'It is',
        r'\bbetampered\b': 'be tampered',
        r'\bdevelopmet\b': 'development',
        r'\btechinical\b': 'technical',
        r'\bprojec\b': 'project',
        r'\bInterity\b': 'Integrity',
        r'\bProiect\b': 'Project',
        r'\barge Language Model\b': 'Large Language Model',
        r'\bperational\b': 'Operational',
        r'\bSequence activitie\b': 'Sequence activities',
        r'\bsuchas\b': 'such as',
        r'\bChian\b': 'China',
        r'\beriod\b': 'period',
        r'\bphysicA\b': 'physical',
        r'\bArtificiA\b': 'Artificial',
        r'\bnaturA\b': 'natural',
        r'\bhierarchicA\b': 'hierarchical',
        r'\btotA\b': 'total',
        r'\blogicA\b': 'logical',
        r'\bfinA\b': 'final',
        r'\bdigitA\b': 'digital',
        r'\btechnicA\b': 'technical',
        r'\bOperationA\b': 'Operational',
        r'\bindividuA\b': 'individual',
        r'\bactuA\b': 'actual',
        r'\bprojectt\b': 'project',
        
        # Chinese Typos
        r'事物互联网': '物联网',
        r'人工每能': '人工智能',
        r'葡改': '篡改',
        r'答阵': '矩阵',
        r'和否认证据': '不可否认的证据',
        r'庶拟现实': '虚拟现实',
        r'租任': '租赁',
        r'轰驶': '驾驶',
        r'约东': '约束',
        r'策咯': '策略',
        
        # Specific OCR errors
        r'（ 11 ）': '（ 71 ）',
        r'\( （   \)': '（     ）',
        r'\( \(   \)': '（     ）',
        r'\(〈 \)': '（     ）',
        r'\(〈\)': '（     ）',
        r'QO': '（     ）',
        r'QC': '（     ）',
        r'\( +\)': '（     ）',
    }

    # 执行字典替换
    for pattern, replacement in replacements.items():
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

    # 2. 修正选项标记 (处理 A、 B、 C、 D)
    # 限制在行首或大量空格后，避免误杀词中字符
    text = re.sub(r'(?m)^AL\s+', 'A、', text)
    text = re.sub(r'(?m)^BL\s+', 'B、', text)
    text = re.sub(r'(?m)^CL\s+', 'C、', text)
    text = re.sub(r'(?m)^DL\s+', 'D、', text)
    
    # 3. 修正 [答案: 待定] 逻辑，有些题目脚本未能自动匹配答案
    # 如果题目中有 [BRIA 则答案是 A
    blocks = re.split(r'-{50,}', text)
    fixed_blocks = []
    for block in blocks:
        if '[ID: ch4_' not in block:
            fixed_blocks.append(block)
            continue
            
        if '[答案: 待定]' in block:
            if '[BRIA' in block: block = block.replace('[答案: 待定]', '[答案: A]')
            elif '(S218' in block: block = block.replace('[答案: 待定]', '[答案: B]')
            elif '(S81)' in block: block = block.replace('[答案: 待定]', '[答案: D]')
            elif '(4#1c' in block: block = block.replace('[答案: 待定]', '[答案: C]')
            elif '([S&1¢' in block: block = block.replace('[答案: 待定]', '[答案: C]')
            
        fixed_blocks.append(block)
    
    output_text = '--------------------------------------------------'.join(fixed_blocks)

    # 4. 清理残留噪声
    output_text = re.sub(r'\[BRIA', '', output_text)
    output_text = re.sub(r'\(S218', '', output_text)
    output_text = re.sub(r'\(S81\)', '', output_text)
    output_text = re.sub(r'\(4#1c', '', output_text)
    output_text = re.sub(r'\(\[##\)', '', output_text)
    
    # 5. 特殊修复
    output_text = output_text.replace('projectt', 'project')
    output_text = output_text.replace('A、fe', '人工智能')
    output_text = output_text.replace('RAGE', '成本')
    
    return output_text

if __name__ == "__main__":
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    cleaned = clean_ch4(content)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(cleaned)
    print("✅ 校对版已生成。")
