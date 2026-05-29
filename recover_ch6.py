import re
import codecs
import json

def normalize_js_string(text):
    # Fix corrupted image source and class attributes
    # Convert all \\" to \" 
    text = text.replace(r'\\"', r'\"')
    
    # Fix the specific pattern where a double quote escaped with a single backslash is followed by images/
    # \"images/ -> \"images/ (this is usually correct)
    
    # Fix double-double quotes \"\"
    text = text.replace(r'\"\"', r'\"')
    
    # Fix the \"images/ something \" class=\"...\" sequence that got mangled
    # Often it looks like ...-img\">\"images/ch6_...
    text = re.sub(r'class=\\\"question-img\\\">\"images/', r'class=\"question-img\"><br><img src=\"images/', text)
    
    # Fix spaces in image paths
    text = re.sub(r'src=\\\"images/\s+', r'src=\"images/', text)
    
    return text

def fix_file():
    path = r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js'
    with codecs.open(path, 'r', 'utf-8') as f:
        content = f.read()
    
    # 1. First, let's fix the drift. 
    # It seems many properties are on their own lines but indented incorrectly.
    # We can try to normalize the lines first.
    
    lines = content.split('\n')
    cleaned_lines = []
    for line in lines:
        # Strip massive leading spaces that grew during drift
        stripped = line.lstrip()
        cleaned_lines.append(stripped)
    
    temp_content = '\n'.join(cleaned_lines)
    
    # 2. Fix the corrupted strings globally
    # Fix the src=\<br> and other mess
    temp_content = temp_content.replace(r'<br><img src=\<br>', r'<br>')
    temp_content = temp_content.replace(r'src=\<br>', r'<br>')
    temp_content = temp_content.replace(r'src=\<img', r'<br><img')
    
    # Normalizing escaped quotes
    # The goal is that keys are "key" and values are "value"
    # Inside "value", quotes are \"
    
    # Handle the specific mess: class=\"question-img\">"images/ch6_q15.png\"
    temp_content = re.sub(r'class=\\\"question-img\\\">\"images/([^\"]+)\\\"', r'class=\"question-img\"><br><img src=\"images/\1\"', temp_content)
    
    # Fix line 959 specific mess:
    # "explanation": "...<img src=\"images/ch6_q28.png\" class=\\"question-img\\"><br><img src=\\"images/ ch6_q28_exp1.png\" class=\"question-img\">"
    # We want it to be:
    # "explanation": "...<img src=\"images/ch6_q28.png\" class=\"question-img\"><br><img src=\"images/ch6_q28_exp1.png\" class=\"question-img\">"
    
    # Let's use a very broad regex to fix all double-slash escaped quotes
    temp_content = temp_content.replace(r'\\"', r'\"')
    
    # Remove any stray " before images/ that are not part of an attribute
    temp_content = re.sub(r'question-img\">\"images/', r'question-img\"><br><img src=\"images/', temp_content)

    # 3. Try to extract and parse the array
    match = re.search(r'const ch6Questions = (\[.*\]);', temp_content, re.DOTALL)
    if match:
        arr_str = match.group(1)
        # Final safety check on JSON validity
        # Remove any remaining src=\ and replace with src=\"
        arr_str = re.sub(r'src=\\([^\s>]+)', r'src=\"\1\"', arr_str)
        
        # Try to parse
        try:
            # First attempt: as is
            data = json.loads(arr_str)
            print("Parsed successfully!")
        except json.JSONDecodeError as e:
            print(f"JSON Error at {e.lineno}:{e.colno}: {e.msg}")
            # Try to fix common issues on that line
            lines_arr = arr_str.split('\n')
            err_line = lines_arr[e.lineno-1]
            print(f"Error context: {err_line}")
            
            # More manual fixes
            arr_str = arr_str.replace(r'images/ ', r'images/')
            arr_str = re.sub(r'class=\\\"question-img\\\">\"images/', r'class=\"question-img\"><br><img src=\"images/', arr_str)
            
            try:
                data = json.loads(arr_str)
                print("Parsed after second fix set!")
            except:
                print("Still failing. Writing partially cleaned file.")
                with codecs.open(path, 'w', 'utf-8') as f:
                    f.write(temp_content)
                return

        # If parsed, dump beautifully
        final_json = json.dumps(data, indent=2, ensure_ascii=False)
        with codecs.open(path, 'w', 'utf-8') as f:
            f.write(f"const ch6Questions = {final_json};")
        print("File recovered and reformatted!")
    else:
        print("Couldn't find the Questions array variable.")

if __name__ == "__main__":
    fix_file()
