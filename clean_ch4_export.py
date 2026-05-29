import re
import os

input_path = r'f:\软考资料\202605\exam-app\exports\ch4_题目导出.txt'
output_path = r'f:\软考资料\202605\exam-app\exports\ch4_题目导出_校对版.txt'

def clean_ch4(text):
    replacements = {
        # English Typos
        r'qulity': 'quality',
        r'Knowm': 'Known',
        r'peerson': 'person',
        r'lodical': 'logical',
        r'availity': 'availability',
        r'cccountability': 'accountability',
        r'Equaipment': 'Equipment',
        r'accepttance': 'acceptance',
        r'1TIS': 'It is',
        r'betampered': 'be tampered',
        r'developmet': 'development',
        r'techinical': 'technical',
        r'projec': 'project',
        r'Interity': 'Integrity',
        r'Proiect': 'Project',
        r'ensurecommunication': 'ensure communication',
        r'arge Language Model': 'Large Language Model',
        r'perational': 'Operational',
        r'Sequence activitie': 'Sequence activities',
        r'suchas': 'such as',
        r'Chian': 'China',
        r'eriod': 'period',
        r'Intelligentize': 'Intelligence', # Or intelligentization
        r'intellgentize': 'intelligentize', 
        
        # Chinese Typos
        r'事物互联网': '物联网',
        r'人工每能': '人工智能',
        r'葡改': '篡改',
        r'答阵': '矩阵',
        r'和否认证据': '不可否认的证据',
        r'庶拟现实': '虚拟现实',
        r'租任': '租赁',
        r'轰驶': '驾驶',
        r'各项历时': '各项历时',
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
        r'\nO ': '\n（     ）',
        r'\nO': '\n（     ）',
        
        # Option markers cleanup
        r'AL\s+': 'A、',
        r'BL\s+': 'B、',
        r'CL\s+': 'C、',
        r'DL\s+': 'D、',
        r'Cc\.': 'C、',
        r'Dy\s+': 'D、',
        r'By\s+': 'B、',
    }

    # 执行字典替换
    for pattern, replacement in replacements.items():
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

    # 进一步清理一些特定模式
    # 修复 [解析] 里的重复 ID 或杂质
    text = re.sub(r'\[解析\]: \d+、', '[解析]: ', text)
    
    # 修复 ID 序列 (虽然之前检查是连续的，但如果用户要求，可以强制刷一遍)
    # 这里保持现状，因为 check_ch4_ids 确认了 1-50 是正确的。
    
    # 修正一些明显的标点/空格
    text = re.sub(r'\s{2,}', ' ', text)
    text = re.sub(r' \n', '\n', text)
    
    return text

if __name__ == "__main__":
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
    else:
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        cleaned_content = clean_ch4(content)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(cleaned_content)
            
        print(f"✅ 校对完成！")
        print(f"📄 原始文件: {input_path}")
        print(f"✨ 校对文件: {output_path}")
