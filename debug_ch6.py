import codecs
import os

files = [
    r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js',
    r'f:\软考资料\202605\exam-app\mobile_dist\ocr_questions_ch6.js'
]

for path in files:
    if os.path.exists(path):
        with codecs.open(path, 'r', 'utf-8') as f:
            content = f.read()
        
        # Replace the export logic with a more robust version + logging
        new_export = """
;
console.log('Chapter 6 data loading...');
if (typeof ch6Questions !== 'undefined' && Array.isArray(ch6Questions)) {
    console.log('Chapter 6 questions array found:', ch6Questions.length);
    if (typeof examData !== 'undefined' && examData.questions) {
        examData.questions = examData.questions.filter(function(q) { return q.chapterId !== 'ch6'; });
        for (var i = 0; i < ch6Questions.length; i++) {
            examData.questions.push(ch6Questions[i]);
        }
        console.log('Total questions in examData now:', examData.questions.length);
    } else {
        console.error('examData not found when loading ch6');
    }
} else {
    console.error('ch6Questions array not found!');
}
"""
        # Find the end of the array
        end_array_pos = content.rfind('];')
        if end_array_pos != -1:
            final_content = content[:end_array_pos+2] + new_export
            with codecs.open(path, 'w', 'utf-8') as f:
                f.write(final_content)
            print(f'Applied robust export to {path}')
        else:
            print(f'Could not find array end in {path}')
