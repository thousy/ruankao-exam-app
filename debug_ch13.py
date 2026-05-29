import re

def clean_placeholder(text):
    if not isinstance(text, str): return text
    brackets = '（）()《》“”[\]〈〉<>〔〕\uff08\uff09\u3008\u3009\u300a\u300b'
    b_chars = r'\(\)（）《》“”\[\]〈〉<>〔〕'
    pattern = rf'[{b_chars}\s\d]{{2,20}}'
    def repl(m):
        chunk = m.group(0)
        if not any(c in brackets for c in chunk): return chunk
        nums = re.findall(r'\d+', chunk)
        if len(nums) == 1 and len(nums[0]) < 4:
            return f' （ {nums[0]} ） '
        return chunk
    res = re.sub(pattern, repl, text)
    res = re.sub(r'[\(（]([0-9]{1,3})[\)）]', r' （ \1 ） ', res)
    res = re.sub(r' +', ' ', res)
    res = re.sub(r'（ +', '（ ', res)
    res = re.sub(r' +）', ' ）', res)
    res = re.sub(r'（\s*（\s*(\d+)\s*）\s*）', r'（ \1 ）', res)
    return res

content = "2、2023 年5月第22题 （此题为常规重点考题，建议举一反三）\n不可作为项目评估依据的是（22)。"
cleaned = clean_placeholder(content)
print(f"Input:   {repr(content)}")
print(f"Output:  {repr(cleaned)}")
print(f"Changed: {content != cleaned}")
