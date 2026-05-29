// ==================== 题库数据结构 ====================

// 注意:这是示例数据结构,实际题目需要从PDF中提取或手动录入

const examData = {
    // 章节信息
    chapters: [
        {
            id: 'ch1-3',
            title: '第1-3章 信息化基础',
            description: '信息化的兴起、中国数字化转型、IT治理',
            totalQuestions: 0,
            completedQuestions: 0
        },
        {
            id: 'ch4',
            title: '第四章 英语专项',
            description: '软考英语历年真题汇总',
            totalQuestions: 50,
            completedQuestions: 0
        },
        {
            id: 'ch5',
            title: '第五章 选择题技巧',
            description: '选择题做题建议与技巧',
            totalQuestions: 11,
            completedQuestions: 0
        },
        {
            id: 'ch6',
            title: '第六章 计算专项',
            description: '项目管理计算题专项汇总',
            totalQuestions: 134,
            completedQuestions: 0
        },
        {
            id: 'ch7',
            title: '第七章 信息化发展',
            description: '第七章信息化发展-历年真题汇总',
            totalQuestions: 67,
            completedQuestions: 0
        },
        {
            id: 'ch8',
            title: '第八章 信息技术发展',
            description: '人工智能、区块链、云计算、大数据',
            totalQuestions: 75,
            completedQuestions: 0
        },
        {
            id: 'ch9',
            title: '第九章 信息系统治理',
            description: 'IT治理、信息系统规划',
            totalQuestions: 48,
            completedQuestions: 0
        },
        {
            id: 'ch10',
            title: '第十章 信息系统管理',
            description: '信息系统管理基础、流程管理',
            totalQuestions: 56,
            completedQuestions: 0
        },
        {
            id: 'ch11',
            title: '第十一章 信息系统工程',
            description: '软件工程、生命周期、开发方法',
            totalQuestions: 95,
            completedQuestions: 0
        },
        {
            id: 'ch12',
            title: '第十二章 系统管理概论',
            description: '系统管理、服务管理基础',
            totalQuestions: 56,
            completedQuestions: 0
        },
        {
            id: 'ch13',
            title: '第十三章 项目立项管理',
            description: '项目立项的流程、方法和管理',
            totalQuestions: 34,
            completedQuestions: 0
        },
        {
            id: 'ch14',
            title: '第十四章 项目整合管理',
            description: '项目整合管理的过程与实践',
            totalQuestions: 72,
            completedQuestions: 0
        },
        {
            id: 'ch15',
            title: '第十五章 项目范围管理',
            description: '范围规划、定义、控制',
            totalQuestions: 66,
            completedQuestions: 0
        },
        {
            id: 'ch16',
            title: '第十六章 项目进度管理',
            description: '进度规划、活动定义、排序、估算',
            totalQuestions: 60,
            completedQuestions: 0
        },
        {
            id: 'ch17',
            title: '第十七章 项目成本管理',
            description: '成本估算、预算、控制',
            totalQuestions: 68,
            completedQuestions: 0
        },
        {
            id: 'ch18',
            title: '第十八章 项目质量管理',
            description: '质量规划、保证、控制',
            totalQuestions: 64,
            completedQuestions: 0
        },
        {
            id: 'ch19',
            title: '第十九章 项目资源管理',
            description: '资源规划、获取、团队建设',
            totalQuestions: 82,
            completedQuestions: 0
        },
        {
            id: 'ch20',
            title: '第二十章 项目沟通管理',
            description: '沟通规划、管理、监控',
            totalQuestions: 60,
            completedQuestions: 0
        },
        {
            id: 'ch21',
            title: '第二十一章 项目风险管理',
            description: '风险识别、分析、应对',
            totalQuestions: 75,
            completedQuestions: 0
        },
        {
            id: 'ch22',
            title: '第二十二章 项目采购管理',
            description: '采购规划、实施、控制',
            totalQuestions: 71,
            completedQuestions: 0
        },
        {
            id: 'ch23',
            title: '第二十三章 项目干系人管理',
            description: '干系人识别、规划、管理',
            totalQuestions: 67,
            completedQuestions: 0
        },
        {
            id: 'ch24',
            title: '第二十四章 项目绩效域',
            description: '项目绩效的8大领域',
            totalQuestions: 80,
            completedQuestions: 0
        },
        {
            id: 'ch25',
            title: '第二十五章 配置与变更管理',
            description: '配置管理、变更控制',
            totalQuestions: 68,
            completedQuestions: 0
        },
        {
            id: 'ch26',
            title: '第二十六章 项目集与组合管理',
            description: '项目集、项目组合、OPM、量化管理与 CMMI',
            totalQuestions: 47,
            completedQuestions: 0
        },
        {
            id: 'ch27',
            title: '第二十七章 管理科学基础',
            description: '运筹学、线性规划、决策论、博弈论等',
            totalQuestions: 53,
            completedQuestions: 0
        },
        {
            id: 'ch28',
            title: '第二十八章 组织治理与数字化',
            description: '组织治理、数字化转型、绩效管理',
            totalQuestions: 30,
            completedQuestions: 0
        },
        {
            id: 'ch29',
            title: '第二十九章 综合管理领域',
            description: '人力资源、流程管理、知识管理、市场营销',
            totalQuestions: 35,
            completedQuestions: 0
        },
        {
            id: 'ch30',
            title: '第三十章 法律法规与标准',
            description: '相关法律法规、国家标准与规范',
            totalQuestions: 60,
            completedQuestions: 0
        }
    ],

    // 题库数据 (通过各章节 js 文件注入)
    questions: []
};

const STORAGE_KEYS = {
    USER_PROGRESS: 'exam_user_progress',
    USER_ANSWERS: 'exam_user_answers',
    FAVORITES: 'exam_favorites',
    MISTAKES: 'exam_mistakes',
    STUDY_STATS: 'exam_study_stats',
    THEME: 'exam_theme'
};

// 初始化用户数据
function initUserData() {
    if (!localStorage.getItem(STORAGE_KEYS.USER_PROGRESS)) {
        const initialProgress = {};
        examData.chapters.forEach(chapter => {
            initialProgress[chapter.id] = {
                totalQuestions: chapter.totalQuestions,
                completedQuestions: 0,
                correctQuestions: 0
            };
        });
        localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(initialProgress));
    }

    if (!localStorage.getItem(STORAGE_KEYS.USER_ANSWERS)) {
        localStorage.setItem(STORAGE_KEYS.USER_ANSWERS, JSON.stringify({}));
    }

    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
    }

    if (!localStorage.getItem(STORAGE_KEYS.MISTAKES)) {
        localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify([]));
    }

    if (!localStorage.getItem(STORAGE_KEYS.STUDY_STATS)) {
        const initialStats = {
            totalStudyDays: 0,
            lastStudyDate: null,
            studyDates: []
        };
        localStorage.setItem(STORAGE_KEYS.STUDY_STATS, JSON.stringify(initialStats));
    }
}

function getUserProgress() {
    const userAnswers = getUserAnswers();
    const progress = {};

    // 初始化所有章节为 0
    examData.chapters.forEach(chapter => {
        progress[chapter.id] = {
            totalQuestions: chapter.totalQuestions,
            completedQuestions: 0,
            correctQuestions: 0
        };
    });

    // 遍历所有已做题目并归类统计
    Object.keys(userAnswers).forEach(questionId => {
        const question = getQuestionById(questionId);
        if (question && progress[question.chapterId]) {
            progress[question.chapterId].completedQuestions++;
            if (userAnswers[questionId].isCorrect) {
                progress[question.chapterId].correctQuestions++;
            }
        }
    });

    return progress;
}

function saveUserProgress(progress) {
    // 动态计算模式下，此函数仅用于兼容性，不实际写入静态 Progress Key
    console.log('Progress logic updated to dynamic calculation');
}

function getUserAnswers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_ANSWERS) || '{}');
}

function saveUserAnswer(questionId, answer, isCorrect) {
    const answers = getUserAnswers();
    answers[questionId] = {
        answer: answer,
        isCorrect: isCorrect,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USER_ANSWERS, JSON.stringify(answers));
}

function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
}

function toggleFavorite(questionId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(questionId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(questionId);
    }

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return index === -1;
}

function getMistakes() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MISTAKES) || '[]');
}

function clearMistakes() {
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify([]));
}

function addMistake(questionId) {
    const mistakes = getMistakes();
    if (!mistakes.includes(questionId)) {
        mistakes.push(questionId);
        localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
    }
}

function removeMistake(questionId) {
    const mistakes = getMistakes();
    const index = mistakes.indexOf(questionId);
    if (index > -1) {
        mistakes.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
    }
}

function updateStudyStats() {
    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_STATS));
    const today = new Date().toDateString();

    if (!stats.studyDates.includes(today)) {
        stats.studyDates.push(today);
        stats.totalStudyDays = stats.studyDates.length;
    }

    stats.lastStudyDate = today;
    localStorage.setItem(STORAGE_KEYS.STUDY_STATS, JSON.stringify(stats));
}

function getStudyStats() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_STATS));
}

function getQuestionsByChapter(chapterId) {
    return examData.questions.filter(q => q.chapterId === chapterId);
}

function getQuestionById(questionId) {
    return examData.questions.find(q => q.id === questionId);
}

function getRandomQuestions(count) {
    const shuffled = [...examData.questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function getRecentActivity(limit = 5) {
    const userAnswers = getUserAnswers();
    const sortedAnswers = Object.entries(userAnswers)
        .sort((a, b) => new Date(b[1].timestamp) - new Date(a[1].timestamp));

    const recentChapters = [];
    const seenChapters = new Set();

    for (const [qId, answer] of sortedAnswers) {
        const question = getQuestionById(qId);
        if (question && !seenChapters.has(question.chapterId)) {
            const chapter = examData.chapters.find(c => c.id === question.chapterId);
            if (chapter) {
                recentChapters.push({
                    chapterId: chapter.id,
                    title: chapter.title,
                    timestamp: answer.timestamp,
                    lastQuestionContent: question.content.substring(0, 30) + "..."
                });
                seenChapters.add(question.chapterId);
            }
        }
        if (recentChapters.length >= limit) break;
    }

    return recentChapters;
}

function calculateOverallStats() {
    const userAnswers = getUserAnswers();
    const totalQuestions = examData.questions.length;
    const answeredQuestions = Object.keys(userAnswers).length;
    const correctQuestions = Object.values(userAnswers).filter(a => a.isCorrect).length;
    const accuracyRate = answeredQuestions > 0 ? (correctQuestions / answeredQuestions * 100).toFixed(1) : 0;

    return {
        totalQuestions,
        answeredQuestions,
        correctQuestions,
        accuracyRate
    };
}

initUserData();
