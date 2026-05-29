import codecs
import json
import re

path = r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js'
with codecs.open(path, 'r', 'utf-8') as f:
    text = f.read()

# Extract JSON part
start = text.find('[')
end = text.rfind(']') + 1
if start != -1 and end > start:
    json_text = text[start:end]
    
    # Try removing trailing commas
    json_text = re.sub(r',\s*\]', ']', json_text)
    json_text = re.sub(r',\s*\}', '}', json_text)

    try:
        json.loads(json_text)
        print('JSON parsing successful!')
    except json.JSONDecodeError as e:
        print(f'JSON Error on Line {e.lineno}, Col {e.colno}')
        lines = json_text.split('\n')
        if e.lineno - 2 >= 0:
            print(f'PREV: {lines[e.lineno - 2]}')
        if e.lineno - 1 < len(lines):
            print(f'ERR: {lines[e.lineno - 1]}')
        if e.lineno < len(lines):
            print(f'NEXT: {lines[e.lineno]}')
else:
    print('Could not find array brackets.')
