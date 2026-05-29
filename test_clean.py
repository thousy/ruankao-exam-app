import re

def clean_placeholder(text):
    if not isinstance(text, str): return text
    # 更加直接的匹配：识别 1-3 位数字，其两侧紧邻括号（允许有空格）
    # 包括各种奇葩的混合括号
    brackets = '（）()《》“”[\]〈〉<>〔〕\uff08\uff09\u3008\u3009\u300a\u300b'
    b = re.escape(brackets)
    
    # 模式：匹配一个由括号和数字组成的序列
    # 我们匹配 [括号/数字/空格] 的簇，如果里面恰好有一个 1-3 位数字，就统一
    pattern = rf'[{b}\s\d]{{2,20}}'
    
    def repl(m):
        chunk = m.group(0)
        if not any(c in brackets for c in chunk): return chunk
        nums = re.findall(r'\d+', chunk) # 提取数字
        if len(nums) == 1 and len(nums[0]) < 4:
            return f' （ {nums[0]} ） '
        return chunk

    # 初步清理
    text = re.sub(pattern, repl, text)
    
    # 针对 (22) 这种标准半角括号的补漏 (b_class 有时候在 character class 里表现怪异)
    text = re.sub(r'[\(（]([0-9]{1,3})[\)）]', r' （ \1 ） ', text)
    
    # 去重多余空格
    text = re.sub(r' +', ' ', text)
    text = re.sub(r'（ +', '（ ', text)
    text = re.sub(r' +）', ' ）', text)
    return text

# 测试
test_str = '不可作为项目评估依据的是（22).'
print(f"Original: {test_str}")
print(f"Cleaned:  {clean_placeholder(test_str)}")

test_str2 = '属于（21) 的内容。'
print(f"Original: {test_str2}")
print(f"Cleaned:  {clean_placeholder(test_str2)}")
