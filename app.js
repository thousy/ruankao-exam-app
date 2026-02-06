// ==================== 应用状态管理 ====================
const appState = {
    currentView: 'home',
    currentChapter: null,
    currentQuestion: null,
    currentQuestionIndex: 0,
    questionList: [],
    isAnswered: false
};

// 获取指定章节的题目
function getQuestionsByChapter(chapterId) {
    return examData.questions.filter(q => q.chapterId === chapterId);
}

// 获取指定 ID 的题目
function getQuestionById(id) {
    return examData.questions.find(q => q.id === id);
}

// 保存应用状态到本地存储
function saveAppState() {
    const stateToSave = {
        currentView: appState.currentView,
        currentChapter: appState.currentChapter,
        currentQuestionIndex: appState.currentQuestionIndex
    };
    localStorage.setItem('softExamAppState', JSON.stringify(stateToSave));
}

// 从本地存储加载应用状态
function loadAppState() {
    const savedState = localStorage.getItem('softExamAppState');
    if (savedState) {
        try {
            const parsedState = JSON.parse(savedState);
            appState.currentView = parsedState.currentView || 'home';
            appState.currentChapter = parsedState.currentChapter || null;
            appState.currentQuestionIndex = parsedState.currentQuestionIndex || 0;
            return true;
        } catch (e) {
            console.error('加载保存的状态失败:', e);
        }
    }
    return false;
}

// ==================== DOM 元素引用 ====================
const elements = {
    // 侧边栏
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    menuBtn: document.getElementById('menuBtn'),
    navItems: document.querySelectorAll('.nav-item'),

    // 顶部栏
    searchInput: document.getElementById('searchInput'),
    themeToggle: document.getElementById('themeToggle'),

    // 视图
    viewContainer: document.getElementById('viewContainer'),
    views: document.querySelectorAll('.view'),

    // 首页元素
    totalQuestions: document.getElementById('totalQuestions'),
    completedQuestions: document.getElementById('completedQuestions'),
    accuracyRate: document.getElementById('accuracyRate'),
    studyDays: document.getElementById('studyDays'),
    activityList: document.getElementById('activityList'),

    // 章节
    chaptersGrid: document.getElementById('chaptersGrid'),

    // 答题
    questionContainer: document.getElementById('questionContainer'),

    // 错题本和收藏
    mistakesList: document.getElementById('mistakesList'),
    favoritesList: document.getElementById('favoritesList'),
    mistakeCount: document.getElementById('mistakeCount'),
    favoriteCount: document.getElementById('favoriteCount'),

    // 进度
    overallProgress: document.getElementById('overallProgress'),
    progressText: document.getElementById('progressText'),

    // 提示
    loadingOverlay: document.getElementById('loadingOverlay'),
    toast: document.getElementById('toast')
};

// ==================== 初始化应用 ====================
function initApp() {
    // 加载主题
    loadTheme();

    // 尝试恢复状态
    const hasSavedState = loadAppState();

    // 更新首页统计
    updateHomeStats();

    // 渲染章节列表
    renderChapters();

    // 更新侧边栏进度
    updateSidebarProgress();

    // 更新错题和收藏计数
    updateBadges();

    // 绑定事件
    bindEvents();

    // 更新学习统计
    updateStudyStats();

    // 如果有保存的状态，执行深度恢复
    if (hasSavedState && appState.currentView !== 'home') {
        if (appState.currentView === 'practice' && appState.currentChapter) {
            // 恢复章节练习进度
            startChapterPractice(appState.currentChapter, true);
        } else {
            switchView(appState.currentView);
        }
    }
}

// ==================== 事件绑定 ====================
function bindEvents() {
    // 侧边栏切换
    elements.menuBtn.addEventListener('click', toggleSidebar);
    elements.sidebarToggle.addEventListener('click', toggleSidebar);

    // 导航切换
    elements.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            switchView(view);
        });
    });

    // 主题切换
    elements.themeToggle.addEventListener('click', toggleTheme);

    // 搜索
    elements.searchInput.addEventListener('input', handleSearch);

    // 快速操作卡片
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', () => {
            const action = card.dataset.action;
            handleQuickAction(action);
        });
    });
}

// ==================== 视图切换 ====================
function switchView(viewName) {
    // 更新导航状态
    elements.navItems.forEach(item => {
        const view = item.dataset.view;
        let shouldActive = view === viewName;

        // 特殊处理练习视图的高亮
        if (viewName === 'practice') {
            if (appState.currentChapter === 'mistakes') {
                shouldActive = view === 'mistakes';
            } else if (appState.currentChapter === 'favorites') {
                shouldActive = view === 'favorites';
            } else if (appState.currentChapter) {
                // 章节练习模式：高亮“章节练习”
                shouldActive = view === 'chapters';
            } else {
                // 随机练习模式：高亮“随机练习”
                shouldActive = view === 'practice';
            }
        } else if (viewName === 'home') {
            shouldActive = view === 'home';
        }

        if (shouldActive) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 更新视图显示
    elements.views.forEach(view => {
        if (view.id === `${viewName}View`) {
            view.classList.add('active');
        } else {
            view.classList.remove('active');
        }
    });

    appState.currentView = viewName;
    saveAppState();

    // 根据视图加载相应内容
    switch (viewName) {
        case 'home':
            updateHomeStats();
            break;
        case 'chapters':
            renderChapters();
            break;
        case 'mistakes':
            renderMistakes();
            break;
        case 'favorites':
            renderFavorites();
            break;
        case 'stats':
            renderStats();
            break;
        case 'practice':
            // 如果题目列表为空，说明是从侧边栏直接点击进入的，开启随机练习
            if (!appState.questionList || appState.questionList.length === 0) {
                handleQuickAction('random');
            } else {
                renderQuestion();
            }
            break;
    }

    // 移动端自动关闭侧边栏
    if (window.innerWidth <= 1024) {
        elements.sidebar.classList.remove('active');
    }
}

// ==================== 侧边栏切换 ====================
function toggleSidebar() {
    elements.sidebar.classList.toggle('active');
}

// ==================== 主题切换 ====================
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

function loadTheme() {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// ==================== 首页统计更新 ====================
function updateHomeStats() {
    const stats = calculateOverallStats();
    const studyStats = getStudyStats();

    elements.totalQuestions.textContent = stats.totalQuestions;
    elements.completedQuestions.textContent = stats.answeredQuestions;
    elements.accuracyRate.textContent = stats.accuracyRate + '%';
    elements.studyDays.textContent = studyStats.totalStudyDays;
}

// ==================== 章节列表渲染 ====================
function renderChapters() {
    const userProgress = getUserProgress();

    elements.chaptersGrid.innerHTML = examData.chapters.map(chapter => {
        const progress = userProgress[chapter.id] || { completedQuestions: 0, correctQuestions: 0 };
        const progressPercent = chapter.totalQuestions > 0
            ? (progress.completedQuestions / chapter.totalQuestions * 100).toFixed(0)
            : 0;

        return `
            <div class="chapter-card" data-chapter-id="${chapter.id}">
                <div class="chapter-header">
                    <div class="chapter-number">${chapter.id.replace('ch', '')}</div>
                    <div class="chapter-stats">
                        <div class="chapter-progress-text">${progress.completedQuestions}/${chapter.totalQuestions}</div>
                    </div>
                </div>
                <h3 class="chapter-title">${chapter.title}</h3>
                <p class="chapter-meta">
                    <span>📝 ${chapter.totalQuestions} 题</span>
                    <span>✅ ${progress.correctQuestions} 正确</span>
                </p>
                <div class="chapter-progress-bar">
                    <div class="chapter-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>
        `;
    }).join('');

    // 绑定章节卡片点击事件
    document.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('click', () => {
            const chapterId = card.dataset.chapterId;
            startChapterPractice(chapterId);
        });
    });
}

// 开始章节练习
function startChapterPractice(chapterId, isResume = false) {
    appState.currentChapter = chapterId;
    appState.questionList = getQuestionsByChapter(chapterId);

    // 如果不是恢复模式，则重置题号
    if (!isResume) {
        appState.currentQuestionIndex = 0;
    }

    if (appState.questionList.length === 0) {
        showToast('该章节暂无题目');
        return;
    }

    switchView('practice');
    renderQuestion();
}


// ==================== 渲染题目 ====================
function renderQuestion() {
    const question = appState.questionList[appState.currentQuestionIndex];
    if (!question) return;

    appState.currentQuestion = question;
    appState.isAnswered = false;

    // 每次渲染新题时保存进度
    saveAppState();

    const userAnswers = getUserAnswers();
    const userAnswer = userAnswers[question.id];
    const favorites = getFavorites();
    const isFavorite = favorites.includes(question.id);

    const difficultyColors = {
        easy: '#43e97b',
        medium: '#ffa726',
        hard: '#f5576c'
    };

    const difficultyText = {
        easy: '简单',
        medium: '中等',
        hard: '困难'
    };

    let chapterTitle = '练习模式';
    if (appState.currentChapter === 'mistakes') {
        chapterTitle = '错题复习';
    } else if (appState.currentChapter === 'favorites') {
        chapterTitle = '收藏复习';
    } else {
        const chapter = examData.chapters.find(c => c.id === appState.currentChapter);
        chapterTitle = chapter ? chapter.title : '随机练习';
    }

    // 计算已做题目数量
    const doneCount = appState.questionList.filter(q => userAnswers[q.id] !== undefined).length;

    elements.questionContainer.innerHTML = `
        <div class="practice-layout">
            <!-- 左侧题号导航 -->
            <div class="question-nav-panel">
                <div class="nav-panel-title">
                    <span>题目导航</span>
                    <span>${doneCount} / ${appState.questionList.length}</span>
                </div>
                <div class="nav-grid" id="navGrid">
                    ${appState.questionList.map((q, idx) => {
        const isDone = userAnswers[q.id] !== undefined;
        const isCurrent = idx === appState.currentQuestionIndex;
        return `
                            <div class="nav-square ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}" 
                                 data-index="${idx}" 
                                 title="第 ${idx + 1} 题 ${isDone ? '(已做)' : '(未做)'}">
                                ${idx + 1}
                            </div>
                        `;
    }).join('')}
                </div>
            </div>

            <!-- 右侧题目内容 -->
            <div class="question-main">
                <div class="practice-header" style="margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid var(--color-bg-tertiary);">
                    <h2 style="font-size: 1.25rem; color: var(--color-primary);">${chapterTitle}</h2>
                </div>
                <div class="question-header">
                    <div class="question-info">
                        <span>题目 ${appState.currentQuestionIndex + 1} / ${appState.questionList.length}</span>
                        <span style="color: ${difficultyColors[question.difficulty]}">
                            难度: ${difficultyText[question.difficulty]}
                        </span>
                        <span>${question.tags.join(' · ')}</span>
                    </div>
                    <div class="question-actions">
                        <button class="action-btn" id="favoriteBtn" title="${isFavorite ? '取消收藏' : '收藏'}">
                            <svg viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="question-card">
                    <h3 class="question-title">题目</h3>
                    <div class="question-content">${question.content}</div>
                    ${question.image ? `
                    <div class="question-image-container" style="margin-top: 15px; border-radius: 8px; overflow: hidden; border: 1px solid var(--color-border); background: var(--color-bg-secondary); display: flex; flex-direction: column; align-items: center;">
                        <img src="${question.image}" style="max-width: 100%; height: auto; display: block; cursor: zoom-in;" onclick="window.open(this.src)" title="点击查看清晰原图">
                        <div style="width: 100%; padding: 8px; background: var(--color-bg-tertiary); font-size: 0.8rem; text-align: center; color: var(--color-text-secondary);">
                            温馨提示：此题包含图表，请参考原件截图
                        </div>
                    </div>` : ''}
                    
                    <div class="options-list" id="optionsList">
                        ${question.options.map((option, index) => `
                            <div class="option-item" data-index="${index}">
                                <div class="option-label">${String.fromCharCode(65 + index)}</div>
                                <div class="option-text">${option}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div id="explanationSection" style="display: none; margin-top: 24px; padding: 20px; background: var(--color-bg-tertiary); border-radius: var(--radius-md);">
                        <h4 style="margin-bottom: 12px; color: var(--color-text-primary);">📖 答案解析</h4>
                        <p style="color: var(--color-text-secondary); line-height: 1.8; white-space: pre-wrap;">${question.explanation}</p>
                        ${question.explanationImage ? `
                        <div class="explanation-image-container" style="margin-top: 15px; border-radius: 8px; overflow: hidden; border: 1px dashed var(--color-primary-light); background: var(--color-bg-secondary); display: flex; flex-direction: column; align-items: center;">
                            <img src="${question.explanationImage}" style="max-width: 100%; height: auto; display: block; cursor: zoom-in;" onclick="window.open(this.src)" title="点击查看清晰原图">
                            <div style="width: 100%; padding: 6px; background: var(--color-bg-tertiary); font-size: 0.75rem; text-align: center; color: var(--color-primary); font-weight: 500;">
                                💡 补充解析图示
                            </div>
                        </div>` : ''}
                    </div>
                </div>
                
                <div class="question-footer">
                    <div>
                        <button class="btn btn-outline" id="prevBtn" ${appState.currentQuestionIndex === 0 ? 'disabled' : ''}>
                            ← 上一题
                        </button>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-outline" id="showExpBtn">查看解析</button>
                        <button class="btn btn-secondary" id="submitBtn">提交答案</button>
                        <button class="btn btn-outline" id="nextBtn" ${appState.currentQuestionIndex === appState.questionList.length - 1 ? 'disabled' : ''}>
                            下一题 →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 绑定选项点击事件
    document.querySelectorAll('.option-item').forEach(option => {
        option.addEventListener('click', () => {
            if (!appState.isAnswered) {
                document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            }
        });
    });

    // 绑定导航方格点击事件
    document.querySelectorAll('.nav-square').forEach(square => {
        square.addEventListener('click', () => {
            const index = parseInt(square.dataset.index);
            if (index !== appState.currentQuestionIndex) {
                appState.currentQuestionIndex = index;
                renderQuestion();
            }
        });
    });

    // 绑定按钮事件
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (appState.currentQuestionIndex > 0) {
            appState.currentQuestionIndex--;
            renderQuestion();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (appState.currentQuestionIndex < appState.questionList.length - 1) {
            appState.currentQuestionIndex++;
            renderQuestion();
        }
    });

    document.getElementById('showExpBtn').addEventListener('click', () => {
        if (appState.isAnswered) return;

        appState.isAnswered = true;
        const currentQuestion = appState.currentQuestion;

        // 高亮正确答案
        const options = document.querySelectorAll('.option-item');
        options.forEach((option, index) => {
            if (index === currentQuestion.correctAnswer) {
                option.classList.add('correct');
            }
            option.style.pointerEvents = 'none';
        });

        // 显示解析
        document.getElementById('explanationSection').style.display = 'block';
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('showExpBtn').disabled = true;
    });

    document.getElementById('submitBtn').addEventListener('click', submitAnswer);
    document.getElementById('favoriteBtn').addEventListener('click', () => toggleQuestionFavorite(question.id));

    // 渲染时自动回滚到顶部
    if (elements.viewContainer) elements.viewContainer.scrollTop = 0;
}

// ==================== 提交答案 ====================
function submitAnswer() {
    if (appState.isAnswered) {
        showToast('已经提交过答案了');
        return;
    }

    const selectedOption = document.querySelector('.option-item.selected');
    if (!selectedOption) {
        showToast('请先选择一个答案');
        return;
    }

    const userAnswer = parseInt(selectedOption.dataset.index);
    const question = appState.currentQuestion;
    const isCorrect = userAnswer === question.correctAnswer;

    appState.isAnswered = true;

    // 保存答案
    saveUserAnswer(question.id, userAnswer, isCorrect);

    // 更新错题本
    if (!isCorrect) {
        addMistake(question.id);
    } else {
        removeMistake(question.id);
    }

    // 更新进度
    updateProgress(question.chapterId, isCorrect);

    // 显示答案和解析
    const options = document.querySelectorAll('.option-item');
    options.forEach((option, index) => {
        if (index === question.correctAnswer) {
            option.classList.add('correct');
        } else if (index === userAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
        option.style.pointerEvents = 'none';
    });

    document.getElementById('explanationSection').style.display = 'block';
    document.getElementById('submitBtn').textContent = isCorrect ? '✓ 回答正确' : '✗ 回答错误';
    document.getElementById('submitBtn').disabled = true;

    // 更新左侧导航状态
    const navPanel = document.querySelector('.question-nav-panel');
    if (navPanel) {
        const currentSquare = navPanel.querySelector(`.nav-square[data-index="${appState.currentQuestionIndex}"]`);
        if (currentSquare) currentSquare.classList.add('done');

        // 更新进度文字
        const userAnswers = getUserAnswers();
        const doneCount = appState.questionList.filter(q => userAnswers[q.id] !== undefined).length;
        const progressSpan = navPanel.querySelector('.nav-panel-title span:last-child');
        if (progressSpan) progressSpan.textContent = `${doneCount} / ${appState.questionList.length}`;
    }

    // 更新全局统计数据
    updateHomeStats();
    updateSidebarProgress();
    updateBadges();

    showToast(isCorrect ? '回答正确!' : '回答错误,请查看解析');
}

// ==================== 更新进度 ====================
function updateProgress(chapterId, isCorrect) {
    const progress = getUserProgress();

    if (!progress[chapterId]) {
        progress[chapterId] = {
            totalQuestions: 0,
            completedQuestions: 0,
            correctQuestions: 0
        };
    }

    // 检查是否是新完成的题目
    const question = appState.currentQuestion;
    const userAnswers = getUserAnswers();
    const previousAnswer = userAnswers[question.id];

    if (!previousAnswer || previousAnswer.timestamp !== userAnswers[question.id].timestamp) {
        progress[chapterId].completedQuestions++;
        if (isCorrect) {
            progress[chapterId].correctQuestions++;
        }
    }

    saveUserProgress(progress);
}

// ==================== 切换收藏 ====================
function toggleQuestionFavorite(questionId) {
    const isFavorite = toggleFavorite(questionId);
    const btn = document.getElementById('favoriteBtn');
    const svg = btn.querySelector('svg');

    svg.setAttribute('fill', isFavorite ? 'currentColor' : 'none');
    btn.title = isFavorite ? '取消收藏' : '收藏';

    updateBadges();
    showToast(isFavorite ? '已添加到收藏夹' : '已从收藏夹移除');
}

// ==================== 渲染错题本 ====================
function renderMistakes() {
    const mistakes = getMistakes();

    if (mistakes.length === 0) {
        elements.mistakesList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                </svg>
                <p>太棒了!暂无错题</p>
            </div>
        `;
        return;
    }

    const mistakeQuestions = mistakes.map(id => getQuestionById(id)).filter(q => q);

    // 增加“练习全部”和“清空”按钮
    elements.mistakesList.innerHTML = `
        <div style="grid-column: 1 / -1; margin-bottom: 20px; display: flex; gap: 12px;">
            <button class="btn btn-primary" id="practiceAllMistakes">🔥 练习全部错题 (${mistakes.length})</button>
            <button class="btn btn-outline" id="clearAllMistakes" style="border-color: var(--color-danger); color: var(--color-danger);">🗑️ 一键清空错题</button>
        </div>
        ${mistakeQuestions.map((question, index) => `
            <div class="chapter-card" data-idx="${index}" style="cursor: pointer;">
                <div class="chapter-header">
                    <div class="chapter-number">${index + 1}</div>
                </div>
                <h3 class="chapter-title">${question.content.substring(0, 50)}...</h3>
                <p class="chapter-meta">
                    <span>${question.tags.join(' · ')}</span>
                </p>
            </div>
        `).join('')}
    `;

    // 绑定练习全部
    document.getElementById('practiceAllMistakes').addEventListener('click', () => {
        startMistakesPractice(0);
    });

    // 绑定清空全部
    document.getElementById('clearAllMistakes').addEventListener('click', () => {
        if (confirm('确定要清空所有错题吗？该操作不可恢复。')) {
            clearMistakes();
            renderMistakes();
            updateBadges();
            showToast('错题本已清空');
        }
    });

    // 绑定卡片点击
    elements.mistakesList.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.dataset.idx);
            startMistakesPractice(idx);
        });
    });
}

// 开始错题练习模式
function startMistakesPractice(startIndex = 0) {
    const mistakes = getMistakes();
    const questions = mistakes.map(id => getQuestionById(id)).filter(q => q);

    if (questions.length === 0) return;

    appState.currentChapter = 'mistakes';
    appState.questionList = questions;
    appState.currentQuestionIndex = startIndex;
    switchView('practice');
    renderQuestion();
}

function renderFavorites() {
    const favorites = getFavorites();

    if (favorites.length === 0) {
        elements.favoritesList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2"/>
                </svg>
                <p>暂无收藏题目</p>
            </div>
        `;
        return;
    }

    const favoriteQuestions = favorites.map(id => getQuestionById(id)).filter(q => q);

    elements.favoritesList.innerHTML = `
        <div style="grid-column: 1 / -1; margin-bottom: 20px;">
            <button class="btn btn-primary" id="practiceAllFavorites">⭐ 练习全部收藏 (${favorites.length})</button>
        </div>
        ${favoriteQuestions.map((question, index) => `
            <div class="chapter-card" data-idx="${index}" style="cursor: pointer;">
                <div class="chapter-header">
                    <div class="chapter-number">${index + 1}</div>
                </div>
                <h3 class="chapter-title">${question.content.substring(0, 50)}...</h3>
                <p class="chapter-meta">
                    <span>${question.tags.join(' · ')}</span>
                </p>
            </div>
        `).join('')}
    `;

    document.getElementById('practiceAllFavorites').addEventListener('click', () => {
        startFavoritesPractice(0);
    });

    elements.favoritesList.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.dataset.idx);
            startFavoritesPractice(idx);
        });
    });
}

// 开始收藏练习模式
function startFavoritesPractice(startIndex = 0) {
    const favorites = getFavorites();
    const questions = favorites.map(id => getQuestionById(id)).filter(q => q);

    if (questions.length === 0) return;

    appState.currentChapter = 'favorites';
    appState.questionList = questions;
    appState.currentQuestionIndex = startIndex;
    switchView('practice');
    renderQuestion();
}

// ==================== 开始单题练习 ====================
function startSingleQuestion(questionId) {
    const question = getQuestionById(questionId);
    if (!question) return;

    appState.questionList = [question];
    appState.currentQuestionIndex = 0;
    switchView('practice');
    renderQuestion();
}

// ==================== 更新侧边栏进度 ====================
function updateSidebarProgress() {
    const stats = calculateOverallStats();
    const progressPercent = stats.totalQuestions > 0
        ? (stats.answeredQuestions / stats.totalQuestions * 100).toFixed(0)
        : 0;

    elements.overallProgress.style.width = progressPercent + '%';
    elements.progressText.textContent = `${stats.answeredQuestions} / ${stats.totalQuestions}`;
}

// ==================== 更新徽章 ====================
function updateBadges() {
    const mistakes = getMistakes();
    const favorites = getFavorites();

    elements.mistakeCount.textContent = mistakes.length;
    elements.favoriteCount.textContent = favorites.length;
}

// ==================== 快速操作处理 ====================
function handleQuickAction(action) {
    switch (action) {
        case 'continue':
            // 继续上次学习
            const lastChapter = localStorage.getItem('lastChapter');
            if (lastChapter) {
                startChapterPractice(lastChapter);
            } else {
                startChapterPractice(examData.chapters[0].id);
            }
            break;
        case 'random':
            // 随机练习
            appState.currentChapter = null;
            appState.questionList = getRandomQuestions(10);
            appState.currentQuestionIndex = 0;
            switchView('practice');
            renderQuestion();
            break;
        case 'mistakes':
            // 错题巩固
            switchView('mistakes');
            break;
        case 'exam':
            // 模拟考试
            showToast('模拟考试功能开发中...');
            break;
    }
}

// ==================== 搜索处理 ====================
function handleSearch(e) {
    const keyword = e.target.value.toLowerCase().trim();

    if (!keyword) {
        renderChapters();
        return;
    }

    const filteredQuestions = examData.questions.filter(q =>
        q.content.toLowerCase().includes(keyword) ||
        q.tags.some(tag => tag.toLowerCase().includes(keyword))
    );

    if (filteredQuestions.length === 0) {
        showToast('未找到相关题目');
        return;
    }

    appState.questionList = filteredQuestions;
    appState.currentQuestionIndex = 0;
    switchView('practice');
    renderQuestion();
}

// ==================== 统计页面渲染 ====================
function renderStats() {
    const stats = calculateOverallStats();
    const studyStats = getStudyStats();
    const userProgress = getUserProgress();

    const statsDashboard = document.getElementById('statsDashboard');

    statsDashboard.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                        <path d="M12 6V12L16 14" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${studyStats.totalStudyDays}</div>
                    <div class="stat-label">累计学习天数</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M9 11L12 14L22 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${stats.correctQuestions}</div>
                    <div class="stat-label">答对题目数</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                        <path d="M12 8V12M12 16H12.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${stats.answeredQuestions - stats.correctQuestions}</div>
                    <div class="stat-label">答错题目数</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M18 20V10M12 20V4M6 20V14" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${stats.accuracyRate}%</div>
                    <div class="stat-label">正确率</div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 32px;">
            <h3 class="section-title">章节完成情况</h3>
            <div class="chapters-grid">
                ${examData.chapters.map(chapter => {
        const progress = userProgress[chapter.id] || { completedQuestions: 0, correctQuestions: 0 };
        const progressPercent = chapter.totalQuestions > 0
            ? (progress.completedQuestions / chapter.totalQuestions * 100).toFixed(0)
            : 0;
        const accuracy = progress.completedQuestions > 0
            ? (progress.correctQuestions / progress.completedQuestions * 100).toFixed(0)
            : 0;

        return `
                        <div class="chapter-card">
                            <h3 class="chapter-title">${chapter.title}</h3>
                            <p class="chapter-meta">
                                <span>完成: ${progressPercent}%</span>
                                <span>正确率: ${accuracy}%</span>
                            </p>
                            <div class="chapter-progress-bar">
                                <div class="chapter-progress-fill" style="width: ${progressPercent}%"></div>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;
}

// ==================== Toast 提示 ====================
function showToast(message, duration = 3000) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, duration);
}

// ==================== 显示加载 ====================
function showLoading() {
    elements.loadingOverlay.classList.add('active');
}

function hideLoading() {
    elements.loadingOverlay.classList.remove('active');
}

// ==================== 页面加载完成后初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
