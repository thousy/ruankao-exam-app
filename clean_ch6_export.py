import os
import re

def clean_ocr_errors(file_path):
    if not os.path.exists(file_path):
        print(f"错误: 找不到文件 {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. 基础文字和术语替换字典
    replacements = {
        "远辑": "逻辑",
        "数宇": "数字",
        "分折": "分析",
        "己工厂": "乙工厂",
        "兴后": "滞后",
        "斐观": "悲观",
        "结算法": "估算法",
        "蕉至": "截至",
        "纹常讽": "常规",
        "举一友三": "举一反三",
        "送分额": "送分题",
        "国假定": "因假定",
        "业例": "案例",
        "虎目": "题目",
        "笛听下": "重听下",
        "基础梨": "基础课",
        "不在讲解": "不再讲解",
        "服从有 分布": "服从 β 分布",
        "服从B分布": "服从 β 分布",
        # 专业术语
        "CP1": "CPI",
        "SP1": "SPI",
        "SYV": "SV",
        # 常见 OCR 乱码片段清理
        "HERG, RADA,": "",
        "Lear) HED AHH, SAKE.": "",
    }

    # 执行基础替换
    for old, new in replacements.items():
        content = content.replace(old, new)

    # 2. 使用正则表达式处理复杂模式
    # 处理百分比误认: 909%6 -> 90%, 496 -> 4%
    content = re.sub(r'909%6', '90%', content)
    content = re.sub(r'无效率是496', '无效率是4%', content)
    
    # 处理公式中的权重符号: #4 或 *# -> *4
    content = re.sub(r'(\d+)#(\d+%)', r'\1*\2', content)
    content = re.sub(r'(\d+)\*#(\d+%)', r'\1*\2', content)
    content = re.sub(r'(\d+)#(\d+)', r'\1*\2', content) # 通用数字相乘
    
    # 修正特定段落的逻辑错误
    content = content.replace("CPI A （ 59 ）", "CPI 是 （ 59 ）")
    content = content.replace("CPI叫成本绩效指数", "CPI叫成本绩效指数") # 确保已替换

    # 3. 保存结果
    output_path = file_path.replace(".txt", "_校对版.txt")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ 校对完成！")
    print(f"📄 原始文件: {file_path}")
    print(f"✨ 校对文件: {output_path}")

if __name__ == "__main__":
    # 指定目标文件路径
    target = r"f:\软考资料\202605\exam-app\exports\ch6_题目导出.txt"
    clean_ocr_errors(target)
