import shutil
import os

src = r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js'
dsts = [
    r'f:\软考资料\202605\exam-app\mobile_dist\ocr_questions_ch6.js',
    r'f:\软考资料\202605\exam-app\Android_Project\app\src\main\assets\ocr_questions_ch6.js'
]

if os.path.exists(src):
    for dst in dsts:
        if os.path.exists(os.path.dirname(dst)):
            shutil.copy2(src, dst)
            print(f'Synced to {dst}')
        else:
            print(f'Skip {dst} (dir not found)')
else:
    print('Source not found')
