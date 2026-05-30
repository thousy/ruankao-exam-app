const ch31Questions = [];
if (typeof examData !== 'undefined') {
    examData.questions = examData.questions.filter(q => q.chapterId !== 'ch31');
    examData.questions.push(...ch31Questions);
}
