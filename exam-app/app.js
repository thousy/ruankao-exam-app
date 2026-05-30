// ==================== 应用状态管理 ====================
const appState = {
    currentView: 'home',
    currentChapter: null,
    currentQuestion: null,
    currentQuestionIndex: 0,
    questionList: [],
    isAnswered: false,
    studyMode: 'practice', // 'practice' or 'recite'
    fontSize: 16
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
        currentQuestionIndex: appState.currentQuestionIndex,
        studyMode: appState.studyMode,
        fontSize: appState.fontSize
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
            appState.studyMode = parsedState.studyMode || 'practice';
            appState.fontSize = parsedState.fontSize || 16;

            // 应用加载的设置
            applyFontSize(appState.fontSize);
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
    navItems: document.querySelectorAll('.nav-item[data-view]'),

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

    // 设置元素
    settingsBtn: document.getElementById('settingsBtn'),
    modePractice: document.getElementById('modePractice'),
    modeRecite: document.getElementById('modeRecite'),
    fontSizeSlider: document.getElementById('fontSizeSlider'),
    fontSizeDisplay: document.getElementById('fontSizeDisplay'),

    // 提示
    loadingOverlay: document.getElementById('loadingOverlay'),
    toast: document.getElementById('toast')
};

// ==================== 初始化应用 ====================
function initApp() {
    console.log('App: [Step 1] 正在初始化...');
    try {
        // 加载主题
        loadTheme();
        console.log('App: [Step 2] 主题加载完成');

        // 尝试恢复状态
        const hasSavedState = loadAppState();
        console.log('App: [Step 3] 状态加载完成, hasSavedState:', hasSavedState);

        // 更新首页统计
        updateHomeStats();
        console.log('App: [Step 4] 首页统计更新完成');

        // 渲染章节列表
        renderChapters();
        console.log('App: [Step 5] 章节列表渲染完成');

        // 更新侧边栏进度
        updateSidebarProgress();
        console.log('App: [Step 6] 侧边栏进度更新完成');

        // 更新错题和收藏计数
        updateBadges();
        console.log('App: [Step 7] 计数徽章更新完成');

        // 绑定事件
        bindEvents();
        console.log('App: [Step 8] 事件绑定完成');

        // 更新学习统计
        updateStudyStats();
        console.log('App: [Step 9] 学习统计更新完成');

        // 如果有保存的状态，执行深度恢复
        if (hasSavedState && appState.currentView !== 'home') {
            console.log('App: [Step 10] 正在恢复视图:', appState.currentView);
            if (appState.currentView === 'practice' && appState.currentChapter) {
                // 恢复章节练习进度
                startChapterPractice(appState.currentChapter, true);
            } else if (appState.currentView === 'practice' && !appState.currentChapter) {
                // 恢复随机练习
                handleQuickAction('random');
            } else {
                switchView(appState.currentView);
            }
        }
        console.log('App: [Finish] 初始化顺利完成');
    } catch (error) {
        console.error('App: [Error] 初始化失败', error);
        alert('应用启动失败，请检查浏览器控制台。错误详情：' + error.message);
    }
}

// 安全绑定监听器工具
const safeAddListener = (element, event, handler) => {
    if (element) {
        element.addEventListener(event, handler);
    } else {
        // console.debug(`Warning: Listener not bound, target is null for event: ${event}`);
    }
};

const safeSetText = (element, text) => {
    if (element) {
        element.textContent = text;
    }
};

// ==================== 事件绑定 ====================
function bindEvents() {
    console.log('App: 开始绑定事件');

    // 侧边栏切换
    safeAddListener(elements.menuBtn, 'click', toggleSidebar);
    safeAddListener(elements.sidebarToggle, 'click', toggleSidebar);

    // 导航切换
    elements.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;

            // 特殊处理：如果是点击侧边栏的“随机练习”，强制重新生成题目
            const span = item.querySelector('span');
            if (view === 'practice' && span && span.textContent === '随机练习') {
                console.log('App: 侧边栏触发随机练习');
                handleQuickAction('random');
            } else {
                switchView(view);
            }
        });
    });

    // 主题切换
    safeAddListener(elements.themeToggle, 'click', toggleTheme);

    // 搜索
    safeAddListener(elements.searchInput, 'input', handleSearch);

    // 快速操作卡片
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', () => {
            const action = card.dataset.action;
            console.log('App: 触发快速操作', action);
            handleQuickAction(action);
        });
    });

    // 重置系统
    const resetBtn = document.getElementById('resetSystemBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetSystem();
        });
    }
    const settingsResetBtn = document.getElementById('settingsResetBtn');
    if (settingsResetBtn) {
        settingsResetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetSystem();
        });
    }
    const exportToJsBtn = document.getElementById('exportToJsBtn');
    if (exportToJsBtn) {
        exportToJsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            exportQuestionsToJS();
        });
    }

    // 导入 Excel 题库
    const excelFileInput = document.getElementById('excelFileInput');
    if (excelFileInput) {
        excelFileInput.addEventListener('change', handleExcelImport);
    }
    const homeExcelFileInput = document.getElementById('homeExcelFileInput');
    if (homeExcelFileInput) {
        homeExcelFileInput.addEventListener('change', handleExcelImport);
    }
    const settingsExcelFileInput = document.getElementById('settingsExcelFileInput');
    if (settingsExcelFileInput) {
        settingsExcelFileInput.addEventListener('change', handleExcelImport);
    }

    // 设置相关事件
    safeAddListener(elements.settingsBtn, 'click', () => switchView('settings'));

    safeAddListener(elements.modePractice, 'click', () => {
        appState.studyMode = 'practice';
        if (elements.modePractice) elements.modePractice.classList.add('active');
        if (elements.modeRecite) elements.modeRecite.classList.remove('active');
        saveAppState();
        showToast('已切换到做题模式');
    });

    safeAddListener(elements.modeRecite, 'click', () => {
        appState.studyMode = 'recite';
        if (elements.modeRecite) elements.modeRecite.classList.add('active');
        if (elements.modePractice) elements.modePractice.classList.remove('active');
        saveAppState();
        showToast('已切换到背题模式');
    });

    if (elements.fontSizeSlider) {
        elements.fontSizeSlider.addEventListener('input', (e) => {
            const size = parseInt(e.target.value);
            appState.fontSize = size;
            applyFontSize(size);
        });

        elements.fontSizeSlider.addEventListener('change', () => {
            saveAppState();
        });
    }
}

// ==================== 重置系统 ====================
function resetSystem() {
    const confirm1 = window.confirm('⚠️ 确定要重置系统吗？\n这将清空所有做题纪录、错题本和收藏夹！');
    if (confirm1) {
        const confirm2 = window.confirm('🚨 再次确认：此操作不可恢复！\n所有学习进度将归零。确定继续吗？');
        if (confirm2) {
            // 清除所有相关的 LocalStorage
            const keysToRemove = [
                STORAGE_KEYS.USER_PROGRESS,
                STORAGE_KEYS.USER_ANSWERS,
                STORAGE_KEYS.FAVORITES,
                STORAGE_KEYS.MISTAKES,
                STORAGE_KEYS.STUDY_STATS,
                'softExamAppState',
                'exam_custom_questions',
                'exam_custom_chapters'
            ];

            keysToRemove.forEach(key => localStorage.removeItem(key));

            showToast('系统已重置，正在重新载入...', 2000);

            // 延迟刷新页面
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
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
                appState.currentChapter = null;
                appState.questionList = getRandomQuestions(10);
                appState.currentQuestionIndex = 0;
            }
            renderQuestion();
            break;
        case 'settings':
            // 更新设置界面状态
            if (appState.studyMode === 'recite') {
                elements.modeRecite.classList.add('active');
                elements.modePractice.classList.remove('active');
            } else {
                elements.modePractice.classList.add('active');
                elements.modeRecite.classList.remove('active');
            }
            elements.fontSizeSlider.value = appState.fontSize;
            elements.fontSizeDisplay.textContent = appState.fontSize + 'px';
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
function updateThemeUI() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const isLight = document.body.classList.contains('light-theme');
    if (isLight) {
        themeToggle.title = '切换到黑夜模式';
        themeToggle.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        `;
    } else {
        themeToggle.title = '切换到明亮模式';
        themeToggle.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
        `;
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    updateThemeUI();
}

function loadTheme() {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    }
    updateThemeUI();
}

// ==================== 首页统计更新 ====================
function updateHomeStats() {
    const stats = calculateOverallStats();
    const studyStats = getStudyStats();

    safeSetText(elements.totalQuestions, stats.totalQuestions);
    safeSetText(elements.completedQuestions, stats.answeredQuestions);
    safeSetText(elements.accuracyRate, stats.accuracyRate + '%');
    safeSetText(elements.studyDays, studyStats.totalStudyDays);

    renderRecentActivity();
}

// 渲染最近学习活动
function renderRecentActivity() {
    const activity = getRecentActivity();

    if (activity.length === 0) {
        elements.activityList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                    <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
                <p>暂无学习记录</p>
            </div>
        `;
        return;
    }

    elements.activityList.innerHTML = activity.map(item => {
        const date = new Date(item.timestamp);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

        // 移除题干中的 HTML 标签
        const cleanContent = item.lastQuestionContent.replace(/<[^>]+>/g, '');

        return `
            <div class="activity-item" onclick="startChapterPractice('${item.chapterId}')" style="cursor: pointer; display: flex; align-items: center; padding: 12px; border-radius: 12px; margin-bottom: 8px; transition: background 0.2s;">
                <div class="activity-icon" style="font-size: 1.5rem; margin-right: 15px;">📚</div>
                <div class="activity-info" style="flex: 1;">
                    <div class="activity-title" style="font-weight: 600; color: var(--color-text-primary);">${item.title}</div>
                    <div class="activity-desc" style="font-size: 0.85rem; color: var(--color-text-secondary);">${cleanContent}</div>
                </div>
                <div class="activity-time" style="font-size: 0.75rem; color: var(--color-text-tertiary); min-width: 80px; text-align: right;">${dateStr}</div>
            </div>
        `;
    }).join('');
}

// ==================== 章节列表渲染 ====================
function renderChapters() {
    const userProgress = getUserProgress();

    // 如果内置和缓存题库均为空，则显示精美引导板块
    if (!examData.questions || examData.questions.length === 0) {
        elements.chaptersGrid.innerHTML = `
            <div style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 50px 20px; background: var(--color-bg-secondary); border-radius: var(--radius-lg); border: 1px dashed var(--color-border); text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 15px;">📂</div>
                <h4 style="margin: 0 0 10px 0; font-size: 1.15rem; color: var(--color-text-primary);">当前题库为空</h4>
                <p style="margin: 0 0 20px 0; font-size: 0.9rem; color: var(--color-text-secondary); max-width: 450px;">当前系统处于纯净模板状态，初始题库无内置题目。您只需点击下方或首页的按钮，即可一键导入您的 Excel 题库文件进行复习。</p>
                <label class="btn btn-primary" style="display: flex; align-items: center; gap: 6px; cursor: pointer; margin: 0;">
                    <span>📤 立即导入 Excel 题库 (.xlsx)</span>
                    <input type="file" id="chapterExcelFileInput" accept=".xlsx, .xls" style="display: none;" />
                </label>
            </div>
        `;
        const chapterExcelFileInput = document.getElementById('chapterExcelFileInput');
        if (chapterExcelFileInput) {
            chapterExcelFileInput.addEventListener('change', handleExcelImport);
        }
        return;
    }

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

    // 渲染选项区域逻辑
    let optionsHtml = '';
    // 只有当有 2 个及以上的 slots 时，才进入“多空”渲染模式
    if (question.slots && question.slots.length > 1) {
        // 多空题模式
        optionsHtml = question.slots.map((slot, sIdx) => `
            <div class="slot-container" data-slot-index="${sIdx}">
                <div class="slot-label">
                    <span>${slot.label && slot.label !== '请选择答案' ? slot.label : `空 ${sIdx + 1}`}</span>
                    <span class="slot-status"></span>
                </div>
                <div class="options-list">
                    ${slot.options.map((option, oIdx) => `
                        <div class="option-item" data-slot="${sIdx}" data-index="${oIdx}">
                            <div class="option-label">${String.fromCharCode(65 + oIdx)}</div>
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    } else {
        // 标准单选题模式 (或者只有一个 slot 的题目)
        // 优先使用根节点的 options，如果没有则尝试取第一个 slot 的
        const displayOptions = question.options && question.options.length > 0
            ? question.options
            : (question.slots && question.slots.length === 1 ? question.slots[0].options : []);

        optionsHtml = `
            <div class="options-list" id="optionsList">
                ${displayOptions.map((option, index) => `
                    <div class="option-item" data-index="${index}">
                        <div class="option-label">${String.fromCharCode(65 + index)}</div>
                        <div class="option-text">${option}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

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
                <div class="question-header">
                    <div class="question-info" style="display: flex; gap: 12px; align-items: center; width: 100%; color: var(--color-text-secondary); font-size: 0.9rem;">
                        <span style="font-weight: 600; color: var(--color-text-primary);">${chapterTitle}</span>
                        <span style="color: var(--color-text-tertiary);">|</span>
                        <span style="font-weight: 500;">题目 ${appState.currentQuestionIndex + 1} / ${appState.questionList.length}</span>
                        <span style="color: var(--color-text-tertiary);">|</span>
                        <span style="color: ${difficultyColors[question.difficulty]};">
                            难度: ${difficultyText[question.difficulty]}
                        </span>
                        ${['随机练习', '错题复习', '收藏复习'].includes(chapterTitle) ? `
                        <span style="color: var(--color-text-tertiary);">|</span>
                        <span style="color: var(--color-text-secondary);">${examData.chapters.find(c => c.id === question.chapterId)?.title || '未知章节'}</span>
                        ` : ''}
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
                    
                    ${optionsHtml}
                    
                    <div id="explanationSection" style="display: none; margin-top: 24px; padding: 20px; background: var(--color-bg-tertiary); border-radius: var(--radius-md);">
                        <h4 style="margin-bottom: 12px; color: var(--color-text-primary);">📖 答案解析</h4>
                        <div style="color: var(--color-text-secondary); line-height: 1.8; white-space: pre-wrap;">${question.explanation}</div>
                        ${question.explanationImage ? `
                        <div class="explanation-image-container" style="margin-top: 15px; border-radius: 8px; overflow: hidden; border: 1px dashed var(--color-primary-light); background: var(--color-bg-secondary); display: flex; flex-direction: column; align-items: center;">
                            <img src="${question.explanationImage}" style="max-width: 100%; height: auto; display: block; cursor: zoom-in;" onclick="window.open(this.src)" title="点击查看清晰原图">
                            <div style="width: 100%; padding: 6px; background: var(--color-bg-tertiary); font-size: 0.75rem; text-align: center; color: var(--color-primary); font-weight: 500;">
                                💡 补充解析图示
                            </div>
                        </div>` : ''}
                    </div>
                </div>
                
                <!-- 底部按钮网格布局 -->
                <div class="question-footer-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px;">
                    <button class="btn btn-outline" id="prevBtn" style="display: flex; align-items: center; justify-content: center;" ${appState.currentQuestionIndex === 0 ? 'disabled' : ''}>上一题</button>
                    <button class="btn btn-outline" id="nextBtn" style="display: flex; align-items: center; justify-content: center;" ${appState.currentQuestionIndex === appState.questionList.length - 1 ? 'disabled' : ''}>下一题</button>
                    <button class="btn btn-outline" id="showExpBtn" style="display: flex; align-items: center; justify-content: center;">查看解析</button>
                    <button class="btn btn-secondary" id="submitBtn" style="display: flex; align-items: center; justify-content: center;">提交答案</button>
                </div>
            </div>
        </div>
    `;

    // 绑定选项点击事件
    document.querySelectorAll('.option-item').forEach(option => {
        option.addEventListener('click', () => {
            if (!appState.isAnswered) {
                const slotIndex = option.dataset.slot;
                if (slotIndex !== undefined) {
                    // 多空题：只在当前组内移动
                    const group = option.parentElement;
                    group.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
                } else {
                    // 标准题：全局清除
                    document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
                }
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
    safeAddListener(document.getElementById('prevBtn'), 'click', () => {
        if (appState.currentQuestionIndex > 0) {
            appState.currentQuestionIndex--;
            renderQuestion();
        }
    });

    safeAddListener(document.getElementById('nextBtn'), 'click', () => {
        if (appState.currentQuestionIndex < appState.questionList.length - 1) {
            appState.currentQuestionIndex++;
            renderQuestion();
        }
    });

    safeAddListener(document.getElementById('showExpBtn'), 'click', () => {
        if (appState.isAnswered) return;
        showCorrectAnswers();
    });

    safeAddListener(document.getElementById('submitBtn'), 'click', submitAnswer);
    safeAddListener(document.getElementById('favoriteBtn'), 'click', () => toggleQuestionFavorite(question.id));

    // 渲染时自动回滚到顶部
    if (elements.viewContainer) elements.viewContainer.scrollTop = 0;

    // 自动滚动导航网格到当前题目
    setTimeout(() => {
        const navGrid = document.getElementById('navGrid');
        const currentSquare = navGrid ? navGrid.querySelector('.nav-square.current') : null;
        if (navGrid && currentSquare) {
            const containerHeight = navGrid.offsetHeight;
            const itemTop = currentSquare.offsetTop;
            const itemHeight = currentSquare.offsetHeight;
            navGrid.scrollTop = itemTop - (containerHeight / 2) + (itemHeight / 2);
        }
    }, 50);

    // 背题模式：自动显示答案和解析
    if (appState.studyMode === 'recite') {
        showCorrectAnswers();
    }
}

// 辅助函数：显示正确答案（不计入分数）
function showCorrectAnswers() {
    appState.isAnswered = true;
    const question = appState.currentQuestion;

    if (question.slots && question.slots.length > 1) {
        question.slots.forEach((slot, sIdx) => {
            const options = document.querySelectorAll(`.option-item[data-slot="${sIdx}"]`);
            const correctIdx = typeof slot.answer === 'string' ? slot.answer.charCodeAt(0) - 65 : slot.answer;
            options.forEach((opt, oIdx) => {
                if (oIdx === correctIdx) opt.classList.add('correct');
                opt.style.pointerEvents = 'none';
            });
        });
    } else {
        const correctIdx = (question.slots && question.slots.length === 1)
            ? (typeof question.slots[0].answer === 'string' ? question.slots[0].answer.charCodeAt(0) - 65 : question.slots[0].answer)
            : question.correctAnswer;

        const options = document.querySelectorAll('.option-item');
        options.forEach((option, index) => {
            if (index === correctIdx) {
                option.classList.add('correct');
            }
            option.style.pointerEvents = 'none';
        });
    }

    document.getElementById('explanationSection').style.display = 'block';
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('showExpBtn').disabled = true;
}

// ==================== 提交答案 ====================
function submitAnswer() {
    if (appState.isAnswered) {
        showToast('已经提交过答案了');
        return;
    }

    const question = appState.currentQuestion;
    let isCorrect = true;
    let userSelections = [];

    if (question.slots && question.slots.length > 1) {
        // 多空题提交
        const slots = document.querySelectorAll('.slot-container');
        for (let i = 0; i < question.slots.length; i++) {
            const selected = slots[i].querySelector('.option-item.selected');
            if (!selected) {
                showToast(`请完成 ${question.slots[i].label && question.slots[i].label !== '请选择答案' ? question.slots[i].label : `空 ${i + 1}`} 的选择`);
                return;
            }
            const sIdx = parseInt(selected.dataset.index);
            const correctIdx = typeof question.slots[i].answer === 'string'
                ? question.slots[i].answer.charCodeAt(0) - 65
                : question.slots[i].answer;

            userSelections.push(sIdx);
            if (sIdx !== correctIdx) isCorrect = false;
        }
    } else {
        // 标准题提交 (或只有一个 slot 的题目)
        const selectedOption = document.querySelector('.option-item.selected');
        if (!selectedOption) {
            showToast('请先选择一个答案');
            return;
        }
        const sIdx = parseInt(selectedOption.dataset.index);
        userSelections.push(sIdx);

        const correctIdx = (question.slots && question.slots.length === 1)
            ? (typeof question.slots[0].answer === 'string' ? question.slots[0].answer.charCodeAt(0) - 65 : question.slots[0].answer)
            : question.correctAnswer;

        isCorrect = (sIdx === correctIdx);
    }

    appState.isAnswered = true;

    // 保存答案
    saveUserAnswer(question.id, userSelections[0], isCorrect);

    // 更新错题本
    if (!isCorrect) {
        addMistake(question.id);
    } else {
        removeMistake(question.id);
    }

    // 显示反馈
    if (question.slots && question.slots.length > 1) {
        question.slots.forEach((slot, sIdx) => {
            const options = document.querySelectorAll(`.option-item[data-slot="${sIdx}"]`);
            const correctIdx = typeof slot.answer === 'string' ? slot.answer.charCodeAt(0) - 65 : slot.answer;
            const userIdx = userSelections[sIdx];

            options.forEach((opt, oIdx) => {
                if (oIdx === correctIdx) opt.classList.add('correct');
                if (userIdx !== undefined && oIdx === userIdx && userIdx !== correctIdx) opt.classList.add('incorrect');
                opt.style.pointerEvents = 'none';
            });
        });
    } else {
        const correctIdx = (question.slots && question.slots.length === 1)
            ? (typeof question.slots[0].answer === 'string' ? question.slots[0].answer.charCodeAt(0) - 65 : question.slots[0].answer)
            : question.correctAnswer;

        const options = document.querySelectorAll('.option-item');
        options.forEach((option, index) => {
            if (index === correctIdx) {
                option.classList.add('correct');
            } else if (index === userSelections[0] && !isCorrect) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
    }

    document.getElementById('explanationSection').style.display = 'block';
    document.getElementById('submitBtn').textContent = isCorrect ? '✓ 回答正确' : '✗ 回答错误';
    document.getElementById('submitBtn').disabled = true;

    // 更新状态
    updateNavigationStatus();
    updateHomeStats();
    updateSidebarProgress();
    updateBadges();

    showToast(isCorrect ? '回答正确!' : '回答错误,请查看解析');
}

// 提取：更新导航面板状态
function updateNavigationStatus() {
    const navPanel = document.querySelector('.question-nav-panel');
    if (navPanel) {
        const currentSquare = navPanel.querySelector(`.nav-square[data-index="${appState.currentQuestionIndex}"]`);
        if (currentSquare) currentSquare.classList.add('done');

        const userAnswers = getUserAnswers();
        const doneCount = appState.questionList.filter(q => userAnswers[q.id] !== undefined).length;
        const progressSpan = navPanel.querySelector('.nav-panel-title span:last-child');
        if (progressSpan) progressSpan.textContent = `${doneCount} / ${appState.questionList.length}`;
    }
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
    safeAddListener(document.getElementById('practiceAllMistakes'), 'click', () => {
        startMistakesPractice(0);
    });

    // 绑定清空全部
    safeAddListener(document.getElementById('clearAllMistakes'), 'click', () => {
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

    safeAddListener(document.getElementById('practiceAllFavorites'), 'click', () => {
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

    if (elements.overallProgress) elements.overallProgress.style.width = progressPercent + '%';
    safeSetText(elements.progressText, `${stats.answeredQuestions} / ${stats.totalQuestions}`);
}

// ==================== 更新徽章 ====================
function updateBadges() {
    const mistakes = getMistakes();
    const favorites = getFavorites();

    if (elements.mistakeCount) elements.mistakeCount.textContent = mistakes.length;
    if (elements.favoriteCount) elements.favoriteCount.textContent = favorites.length;
}

/* 字体调节逻辑 */
function applyFontSize(size) {
    document.documentElement.style.fontSize = size + "px";
    if (elements.fontSizeDisplay) elements.fontSizeDisplay.textContent = size + "px";
    if (elements.fontSizeSlider) elements.fontSizeSlider.value = size;
}

// ==================== 快速操作处理 ====================
function handleQuickAction(action) {
    switch (action) {
        case 'continue':
            // 继续上次学习
            const savedState = localStorage.getItem('softExamAppState');
            if (savedState) {
                try {
                    const parsed = JSON.parse(savedState);
                    if (parsed.currentChapter) {
                        // 记录了章节，则恢复进度
                        startChapterPractice(parsed.currentChapter, true);
                        return;
                    }
                } catch (e) {
                    console.error('解析存档失败:', e);
                }
            }
            // 如果没有存档，则从第一章开始
            startChapterPractice(examData.chapters[0].id);
            break;
        case 'random':
            // 随机练习
            appState.currentChapter = null;
            appState.questionList = getRandomQuestions(10);
            appState.currentQuestionIndex = 0;
            switchView('practice');
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

// ==================== 图片点击放大功能 ====================
function initImageModal() {
    // 创建模态框元素
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <span class="image-modal-close">&times;</span>
            <div class="image-modal-container">
                <img class="image-modal-content" id="modalImage">
            </div>
            <div class="image-modal-hint">滚轮缩放 | 拖拽移动 | ESC/点击背景关闭</div>
        `;
        document.body.appendChild(modal);
    }

    const modalImg = document.getElementById('modalImage');
    const closeBtn = modal.querySelector('.image-modal-close');
    const container = modal.querySelector('.image-modal-container');

    // 缩放和拖拽状态
    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;

    // 重置状态
    const resetImageState = () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateImageTransform();
    };

    // 更新图片变换
    const updateImageTransform = () => {
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    };

    // 关闭模态框
    const closeModal = () => {
        modal.classList.remove('active');
        resetImageState();
    };

    closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
        if (e.target === modal || e.target === container) {
            closeModal();
        }
    };

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 鼠标滚轮缩放
    container.addEventListener('wheel', (e) => {
        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = Math.min(Math.max(0.5, scale + delta), 5);

        // 计算鼠标位置相对于图片的偏移
        const rect = modalImg.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // 调整平移以保持鼠标位置不变
        translateX -= x * (newScale - scale) / scale;
        translateY -= y * (newScale - scale) / scale;

        scale = newScale;
        updateImageTransform();
    }, { passive: false });

    // 鼠标拖拽
    modalImg.addEventListener('mousedown', (e) => {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            modalImg.style.cursor = 'grabbing';
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateImageTransform();
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            modalImg.style.cursor = scale > 1 ? 'grab' : 'default';
        }
    });

    // 双击重置
    modalImg.addEventListener('dblclick', () => {
        resetImageState();
    });

    // 为所有question-img图片添加点击事件
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('question-img')) {
            modalImg.src = e.target.src;
            modal.classList.add('active');
            resetImageState();
        }
    });
}

// ==================== 导出题库为 JS 数据文件 ====================
function exportQuestionsToJS() {
    try {
        if (!examData.questions || examData.questions.length === 0) {
            showToast('当前没有可以导出的题目数据');
            return;
        }
        
        // 按照原系统 JS 文件数据格式格式化生成
        const jsContent = `// 导出的统一题库数据文件
const ocrQuestions = ${JSON.stringify(examData.questions, null, 2)};

if (typeof examData !== 'undefined') {
  // 清除旧数据，以最新导入的数据重新注入
  examData.questions = ocrQuestions;
}
`;
        
        // 创建文件 Blob 流下载
        const blob = new Blob([jsContent], { type: 'application/javascript;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ocr_questions.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('成功导出 ocr_questions.js！请覆盖放置在同名项目文件中。');
    } catch (e) {
        console.error('导出 JS 失败:', e);
        alert('导出 JS 失败: ' + e.message);
    }
}

// ==================== 手动导入 Excel 题库 ====================
function handleExcelImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    showLoading();
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const rawQuestions = [];
            const importedChapters = [];
            const allowedChapters = new Set();
            
            // 第一轮：搜寻并解析 catalog 章节主表，以汇总所有可用的章节标签（tags）
            const catalogSheetName = workbook.SheetNames.find(name => name.trim().toLowerCase() === 'catalog');
            const hasCatalog = (catalogSheetName !== undefined);
            
            if (hasCatalog) {
                const worksheet = workbook.Sheets[catalogSheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                rows.forEach(row => {
                    if (row.tags) {
                        const tag = String(row.tags).trim();
                        allowedChapters.add(tag);
                        importedChapters.push({
                            id: tag,
                            title: String(row.tag_contents || ''),
                            description: '',
                            totalQuestions: parseInt(row.num) || 0,
                            completedQuestions: 0
                        });
                    }
                });
                console.log(`App: 已成功搜寻并加载 catalog 注册表，注册的章节标签为:`, [...allowedChapters]);
            }
            
            // 第二轮：遍历解析所有其他章节工作表，进行章节存在性拦截过滤
            workbook.SheetNames.forEach(sheetName => {
                const trimmedSheetName = sheetName.trim();
                const lowerSheetName = trimmedSheetName.toLowerCase();
                
                // 跳过已在第一轮处理过的目录页
                if (lowerSheetName === 'catalog') {
                    return;
                }
                
                // 主拦截过滤器：如果 catalog 存在且当前工作表名未在 allowedChapters 中注册，则强行过滤不导入！
                if (hasCatalog && !allowedChapters.has(trimmedSheetName)) {
                    console.log(`App: 拦截并忽略工作表 "${trimmedSheetName}"，因为其未在 catalog 注册表中。`);
                    return;
                }
                
                const worksheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                
                rows.forEach(row => {
                    const rowChapterId = String(row.chapterId || '').trim();
                    
                    // 行级别拦截过滤器：如果行题目对应的 chapterId 未在 allowedChapters 中注册，也直接忽略！
                    if (hasCatalog && !allowedChapters.has(rowChapterId)) {
                        return;
                    }
                    
                    const opts = [];
                    if (row.option_A !== '') opts.push(String(row.option_A));
                    if (row.option_B !== '') opts.push(String(row.option_B));
                    if (row.option_C !== '') opts.push(String(row.option_C));
                    if (row.option_D !== '') opts.push(String(row.option_D));
                    
                    const tagsStr = row.tags ? String(row.tags) : '';
                    const tags = tagsStr.split(',').filter(t => t.trim() !== '');
                    
                    let correctAnswer = row.correctAnswer;
                    if (correctAnswer !== '' && !isNaN(parseInt(correctAnswer))) {
                        correctAnswer = parseInt(correctAnswer);
                    } else if (correctAnswer === '') {
                        correctAnswer = 0;
                    }
                    
                    let slots = null;
                    if (row.slots) {
                        try {
                            slots = typeof row.slots === 'string' ? JSON.parse(row.slots) : row.slots;
                        } catch (e) {
                            console.error("解析 slots 失败:", e);
                        }
                    }
                    
                    const q = {
                        id: String(row.id),
                        chapterId: rowChapterId,
                        type: String(row.type || 'single'),
                        difficulty: String(row.difficulty || 'medium'),
                        content: String(row.content || ''),
                        options: opts,
                        slots: slots,
                        correctAnswer: correctAnswer,
                        explanation: String(row.explanation || ''),
                        tags: tags,
                        userAnswer: null,
                        isCorrect: null,
                        isFavorite: false,
                        attemptCount: 0,
                        lastAttemptDate: null
                    };
                    
                    if (row.image !== undefined && row.image !== '') q.image = String(row.image);
                    if (row.explanationImage !== undefined && row.explanationImage !== '') q.explanationImage = String(row.explanationImage);
                    
                    rawQuestions.push(q);
                });
            });
            
            // 自动识别与合并多行平铺的多选题 (ID 格式如 ch6_25_1, ch6_25_2)
            const mergedQuestionsMap = new Map();
            const multiSlotTemp = new Map(); // parentId -> [ { index, q } ]
            
            rawQuestions.forEach(q => {
                if (q.type === 'multi') {
                    const match = q.id.match(/^(.+)_(\d+)$/);
                    if (match) {
                        const parentId = match[1];
                        const slotIdx = parseInt(match[2]);
                        
                        if (!multiSlotTemp.has(parentId)) {
                            multiSlotTemp.set(parentId, []);
                        }
                        multiSlotTemp.get(parentId).push({ index: slotIdx, question: q });
                        return; // 暂不放入独立题目池，后续由大题统一组装 slots
                    }
                }
                // 单选题或没有下划线后缀的多选题
                mergedQuestionsMap.set(q.id, q);
            });
            
            // 执行合并组装 slots
            multiSlotTemp.forEach((slotsInfo, parentId) => {
                // 按照空的序号顺序排列
                slotsInfo.sort((a, b) => a.index - b.index);
                
                const firstSlotInfo = slotsInfo[0];
                const parentQ = { ...firstSlotInfo.question };
                parentQ.id = parentId; // 大题 ID 移除分支后缀
                
                parentQ.slots = slotsInfo.map(info => {
                    const subQ = info.question;
                    // 正确答案索引转换成英文字母，兼容 slots 选项校验机制
                    const correctAnsLetter = typeof subQ.correctAnswer === 'number'
                        ? String.fromCharCode(65 + subQ.correctAnswer)
                        : (String(subQ.correctAnswer).trim() || 'A');
                        
                    return {
                        label: `考点 ${info.index}`,
                        options: subQ.options,
                        answer: correctAnsLetter
                    };
                });
                
                // 将大题属性以第一个空的值兜底
                parentQ.options = firstSlotInfo.question.options;
                parentQ.correctAnswer = firstSlotInfo.question.correctAnswer;
                
                mergedQuestionsMap.set(parentId, parentQ);
            });
            
            const importedQuestions = Array.from(mergedQuestionsMap.values());
            
            if (importedQuestions.length === 0) {
                throw new Error('未在 Excel 中解析出任何有效的题目数据！');
            }
            
            // 保存题目至 localStorage 实现持久化
            localStorage.setItem('exam_custom_questions', JSON.stringify(importedQuestions));
            examData.questions = importedQuestions;
            
            // 保存章节目录至 localStorage 实现持久化
            if (importedChapters.length > 0) {
                localStorage.setItem('exam_custom_chapters', JSON.stringify(importedChapters));
                examData.chapters = importedChapters;
                console.log(`App: 成功从 catalog 工作表导入了 ${importedChapters.length} 个自定义章节练习目录。`);
            } else {
                // 兜底：如果 Excel 中不包含 catalog 工作表，则从题目分布中动态推导章节目录
                const uniqueChapterIds = [...new Set(examData.questions.map(q => q.chapterId))];
                const generatedChapters = uniqueChapterIds.map(id => {
                    const chNum = id.replace('ch', '');
                    return {
                        id: id,
                        title: `第 ${chNum} 章 章节练习`,
                        description: '',
                        totalQuestions: examData.questions.filter(q => q.chapterId === id).length,
                        completedQuestions: 0
                    };
                });
                localStorage.setItem('exam_custom_chapters', JSON.stringify(generatedChapters));
                examData.chapters = generatedChapters;
                console.log(`App: Excel 未检测到 catalog 目录，已自动推导生成了 ${generatedChapters.length} 个章节练习目录。`);
            }
            
            // 重新初始化用户进度数据
            const progress = getUserProgress();
            localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
            
            // 重新渲染页面数据
            initApp();
            showToast(`成功导入 ${importedQuestions.length} 道题目！`);
            
        } catch (error) {
            console.error('导入 Excel 失败:', error);
            alert('导入 Excel 题库失败！请确保您的 Excel 模板格式正确。详细错误：' + error.message);
        } finally {
            hideLoading();
            e.target.value = '';
        }
    };
    reader.readAsArrayBuffer(file);
}

// ==================== 加载Excel题库并初始化 ====================
async function loadExcelQuestionBank() {
    try {
        // 安全防线：强制清除历史旧版的乱序 localStorage 缓存，让全新修复的有序版本即时生效！
        if (localStorage.getItem('exam_db_version') !== '2.1') {
            localStorage.removeItem('exam_custom_questions');
            localStorage.removeItem('exam_custom_chapters');
            localStorage.setItem('exam_db_version', '2.1');
            console.log('App: 已成功检测并抹除旧版乱序缓存，升级对齐至有序的数据库 V2.1 版本！');
        }
        
        if (elements.loadingOverlay) elements.loadingOverlay.classList.add('active'); // 显示加载动画
        
        const customQuestions = localStorage.getItem('exam_custom_questions');
        const customChapters = localStorage.getItem('exam_custom_chapters');
        
        // 1. 优先加载本地导入 of 自定义题库 (来自 localStorage 缓存)
        if (customQuestions) {
            console.log('App: 正在从本地缓存载入自定义题库...');
            examData.questions = JSON.parse(customQuestions);
            if (customChapters) {
                examData.chapters = JSON.parse(customChapters);
            } else {
                // 重新计算章节题目数
                examData.chapters.forEach(chapter => {
                    chapter.totalQuestions = examData.questions.filter(q => q.chapterId === chapter.id).length;
                });
            }
            
            initApp();
            initImageModal();
            return;
        }
        
        // 2. 如果静态 JS 题库已经加载了数据，则不用从 EXCEL 调用显示，直接加载使用！
        if (examData.questions && examData.questions.length > 0) {
            console.log('App: 正在从内置静态 JS 文件载入题库数据, 共 ' + examData.questions.length + ' 题');
            if (customChapters) {
                examData.chapters = JSON.parse(customChapters);
            } else {
                // 重新计算章节题目数
                examData.chapters.forEach(chapter => {
                    chapter.totalQuestions = examData.questions.filter(q => q.chapterId === chapter.id).length;
                });
            }
            
            initApp();
            initImageModal();
            return;
        }
        
        // 3. 在纯净版下，如果内置题库和缓存均为空，则以空数据初始化，不再从网络拉取 Excel
        console.log('App: 未检测到内置题库或本地缓存，以空题库状态初始化，等待用户导入。');
        examData.questions = [];
        if (customChapters) {
            examData.chapters = JSON.parse(customChapters);
        } else {
            examData.chapters.forEach(chapter => {
                chapter.totalQuestions = 0;
            });
        }
        
        initApp();
        initImageModal();
        
    } catch (error) {
        console.error('加载题库失败:', error);
        alert('无法加载题库。详细错误：' + error.message);
    } finally {
        if (elements.loadingOverlay) elements.loadingOverlay.classList.remove('active');
    }
}

// ==================== 页面加载完成后初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    loadExcelQuestionBank();
});
