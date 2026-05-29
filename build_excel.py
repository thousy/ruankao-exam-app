import os, json, re
import pandas as pd

def clean_js_to_json(js_content):
    match = re.search(r'(const|let|var)\s+\w+\s*=\s*\[', js_content)
    if not match: return None
    start_idx = match.end() - 1
    
    bracket_count = 0
    in_string = False
    escape = False
    quote_char = ''
    
    for i in range(start_idx, len(js_content)):
        c = js_content[i]
        if in_string:
            if escape: escape = False
            elif c == '\\': escape = True
            elif c == quote_char: in_string = False
        else:
            if c in ('"', "'", '`'):
                in_string = True
                quote_char = c
            elif c == '[': bracket_count += 1
            elif c == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    return js_content[start_idx:i+1]
    return None

def js_to_excel():
    files = [f for f in os.listdir('.') if f.startswith('ocr_questions_ch') and f.endswith('.js')]
    files.sort()
    
    sheet_dict = {}
    total_count = 0
    
    for f in files:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            json_str = clean_js_to_json(content)
            
            if json_str:
                try:
                    data = json.loads(json_str)
                    rows = []
                    for q in data:
                        opts = q.get('options', [])
                        row = {
                            'id': q.get('id', ''),
                            'chapterId': q.get('chapterId', ''),
                            'type': q.get('type', ''),
                            'difficulty': q.get('difficulty', ''),
                            'content': q.get('content', ''),
                            'option_A': opts[0] if len(opts)>0 else '',
                            'option_B': opts[1] if len(opts)>1 else '',
                            'option_C': opts[2] if len(opts)>2 else '',
                            'option_D': opts[3] if len(opts)>3 else '',
                            'correctAnswer': q.get('correctAnswer', ''),
                            'explanation': q.get('explanation', ''),
                            'tags': ','.join(q.get('tags', [])),
                            'sourceFile': f
                        }
                        rows.append(row)
                        
                    if rows:
                        # Extract a short, valid excel sheet name, e.g., "ch4" from "ocr_questions_ch4.js"
                        try:
                            sheet_name = f.split('_')[-1].split('.')[0]
                        except:
                            sheet_name = f[:30]
                        sheet_dict[sheet_name] = pd.DataFrame(rows)
                        total_count += len(rows)
                except Exception as e:
                    print(f"Error decoding JSON in {f}: {e}")
            else:
                print(f"Could not find array in {f}")
                
    if sheet_dict:
        # Create ExcelWriter
        with pd.ExcelWriter('questions_bank.xlsx') as writer:
            # Sort sheets by chapter number if possible
            def sort_key(k):
                match = re.search(r'\d+', k)
                return int(match.group()) if match else 0
            
            for sheet_name in sorted(sheet_dict.keys(), key=sort_key):
                df = sheet_dict[sheet_name]
                df.to_excel(writer, sheet_name=sheet_name[:31], index=False)
                
        print(f"Excel file 'questions_bank.xlsx' created successfully with {total_count} questions across {len(sheet_dict)} sheets.")
    else:
        print("No data extracted.")

js_to_excel()
