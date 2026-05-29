import re
import codecs

path = r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js'
with codecs.open(path, 'r', 'utf-8') as f:
    text = f.read()

# 1. Fix the most common corruption
text = text.replace(r'src=\<br>', r'')
text = text.replace(r'src=\<img', r'<img')
text = text.replace(r'src=\"\"', r'src=\"')
text = text.replace(r'\"\" class', r'\" class')

# 2. Fix the indentation drift (remove all leading whitespace and then re-add basic indent)
lines = text.split('\n')
new_lines = []
indent = 0
for line in lines:
    stripped = line.strip()
    if not stripped:
        continue
    
    # Very basic indentation logic
    if stripped.startswith('}') or stripped.startswith(']'):
        indent = max(0, indent - 2)
    
    new_lines.append(' ' * indent + stripped)
    
    if stripped.endswith('{') or stripped.endswith('['):
        indent += 2

# 3. Final check on image paths that got doubled quotes by my previous failed script
final_text = '\n'.join(new_lines)
final_text = re.sub(r'src=\\\"\"images/', r'src=\"images/', final_text)
final_text = re.sub(r'\.png\\\"\"', r'.png\"', final_text)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(final_text)

print("Simplified cleanup complete.")
