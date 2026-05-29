import re

fpath = r'f:\软考资料\202605\exam-app\exports\ch4_题目导出.txt'
with open(fpath, 'r', encoding='utf-8') as f:
    content = f.read()

ids = [int(m) for m in re.findall(r'\[ID:\s*ch4_(\d+)\]', content)]
print(f"Total IDs: {len(ids)}")
print(f"IDs: {ids}")
