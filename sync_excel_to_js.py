import pandas as pd
import json
import os
import re

def get_file_structure(filename):
    var_name = None
    prefix = ""
    postfix = ""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Find the variable declaration
            match = re.search(r'(const|let|var)\s+(\w+)\s*=\s*\[', content)
            if match:
                var_name = match.group(2)
                prefix_end = match.end() - 1
                prefix = content[:prefix_end]
                
                # Now find the end of the array to get postfix
                bracket_count = 0
                in_string = False
                escape = False
                quote_char = ''
                end_idx = -1
                
                for i in range(prefix_end, len(content)):
                    c = content[i]
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
                                end_idx = i
                                break
                
                if end_idx != -1:
                    postfix = content[end_idx+1:]
    except Exception as e:
        print(f"Warning: Could not read structure from {filename}")
        
    if not var_name:
        # Fallback
        chapter = filename.split('_')[-1].split('.')[0]
        var_name = f"{chapter.replace('-', '_')}Questions"
        prefix = f"const {var_name} = "
        postfix = ";\n"
        
    return prefix, postfix

def excel_to_js():
    print("Reading questions_bank.xlsx...")
    df = pd.read_excel('questions_bank.xlsx')
    df.fillna('', inplace=True)
    
    grouped = df.groupby('sourceFile')
    
    for filename, group in grouped:
        print(f"Updating {filename}...")
        questions = []
        for _, row in group.iterrows():
            opts = []
            if str(row.get('option_A', '')) != '': opts.append(str(row['option_A']))
            if str(row.get('option_B', '')) != '': opts.append(str(row['option_B']))
            if str(row.get('option_C', '')) != '': opts.append(str(row['option_C']))
            if str(row.get('option_D', '')) != '': opts.append(str(row['option_D']))
            
            tags = [t.strip() for t in str(row.get('tags', '')).split(',') if t.strip()]
            
            difficulty = str(row.get('difficulty', '')) if str(row.get('difficulty', '')) else "medium"
            q_type = str(row.get('type', '')) if str(row.get('type', '')) else "single"
            
            correctAnswer = row.get('correctAnswer', 0)
            if isinstance(correctAnswer, float):
                try: correctAnswer = int(correctAnswer)
                except: correctAnswer = 0
            elif str(correctAnswer).isdigit():
                correctAnswer = int(correctAnswer)
            elif correctAnswer == '':
                correctAnswer = 0
                
            q = {
                "id": str(row['id']),
                "chapterId": str(row['chapterId']),
                "type": str(q_type),
                "difficulty": str(difficulty),
                "content": str(row['content']),
                "options": opts,
                "correctAnswer": correctAnswer,
                "explanation": str(row['explanation']),
                "tags": tags,
                "userAnswer": None,
                "isCorrect": None,
                "isFavorite": False,
                "attemptCount": 0,
                "lastAttemptDate": None
            }
            questions.append(q)
            
        json_str = json.dumps(questions, ensure_ascii=False, indent=2)
        prefix, postfix = get_file_structure(filename)
        
        # Sometimes prefix includes the [ already depending on my regex, wait. 
        # My prefix ends just before the '[' because match.end() - 1 is the index of '['.
        # But my get_file_structure uses content[:prefix_end], so it excludes '['.
        # json.dumps gives a string starting with '['. So we just concatenate them!
        
        js_content = prefix + json_str + postfix
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(js_content)
            
    print("Successfully updated all JS files from Excel!")

if __name__ == "__main__":
    if os.path.exists('questions_bank.xlsx'):
        excel_to_js()
    else:
        print("Error: questions_bank.xlsx not found.")
