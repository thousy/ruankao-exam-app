const ch1_3Questions = [];
if (typeof examData !== 'undefined') {
    examData.questions = examData.questions.filter(q => q.chapterId !== 'ch1-3');
    examData.questions.push(...ch1_3Questions);
}
