import re
import os

input_path = r'f:\软考资料\202605\exam-app\exports\ch4_题目导出_校对版.txt'
output_path = r'f:\软考资料\202605\exam-app\exports\ch4_题目导出_校对版.txt' # 直接覆盖更新

def final_polish(text):
    # 1. 修正遗漏的“待定”
    # 第 17 题: Blockchain 为 B
    text = text.replace('[ID: ch4_17]\n17、2021 年11月第 72题\n', '[ID: ch4_17]\n17、2021 年11月第 72题\n')
    # 逻辑替换：如果 17 题是待定，改为 B
    text = re.sub(r'(\[ID: ch4_17\].*?)\[答案: 待定\]', r'\1[答案: B]', text, flags=re.DOTALL)
    # 第 18 题: Collect Requirements 为 B
    text = re.sub(r'(\[ID: ch4_18\].*?)\[答案: 待定\]', r'\1[答案: B]', text, flags=re.DOTALL)

    # 2. 修正产业转型选项重复
    text = text.replace('A、数字 B、 联网 C、联网 D、 信息化', 'A、数字 B、联网 C、智能化 D、信息化')
    
    # 3. 修正一些细节拼写和标点
    text = text.replace('ArtificiA、', 'Artificial ')
    text = text.replace('logicA、', 'logical ')
    text = text.replace('Intelligentize', 'Intelligent')
    text = text.replace('轰驶', '驾驶')
    
    # 4. 移除残留的 OCR 标签
    text = re.sub(r'\[S218', '', text)
    text = re.sub(r'\(S218', '', text)
    text = re.sub(r'\[BRIA', '', text)
    
    # 5. 确保 [答案: X] 独立一行且格式统一
    text = re.sub(r'\[答案:\s*([A-D])\]', r'[答案: \1]', text)
    
    # 6. 统一 ID 格式 (确保是 [ID: ch4_X])
    # 目前已经是正确的，不再改动。

    return text

if __name__ == "__main__":
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    polished = final_polish(content)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(polished)
    print("✨ 第四章校对版最终润色完成。")
