import re
import json
import os

def parse_ch27_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 按 [ID: ch27_X] 分割
    blocks = re.split(r'\[ID: ch27_\d+\]', content)
    ids = re.findall(r'\[ID: ch27_(\d+)\]', content)
    
    blocks = blocks[1:]
    
    questions = []
    for i, block in enumerate(blocks):
        block = block.strip()
        q_id = f"ch27_{ids[i]}"
        
        # 分离解析部分
        parts = re.split(r'\[解析\]:', block)
        main_part = parts[0].strip()
        explanation = parts[1].strip() if len(parts) > 1 else ""
        explanation = re.sub(r'-{10,}', '', explanation).strip()
        
        lines = main_part.split('\n')
        title = lines[0].strip()
        
        # 寻找“选项区域”的起始位置
        # 情况 1: 多空题，会有 (65) A: ... (66) A: ...
        # 情况 2: 单话题，直接 A: B: C: D:
        
        # 寻找所有槽位定义头部 (形如 (65) 且后面跟着 A:)
        all_slot_defs = list(re.finditer(r'[\(（]\s*(\d+|\s*)\s*[\)）]\s*\n?\s*[A-D][:：]', main_part))
        
        slots = []
        if all_slot_defs:
            # 题干是到第一个真正“选项定义”之前的所有内容
            q_content = main_part[:all_slot_defs[0].start()].strip()
            
            # 提取每一个槽位的数据
            for j, match in enumerate(all_slot_defs):
                m_text = match.group(0)
                # 确定 Label (如：考点 65)
                num_match = re.search(r'\d+', m_text)
                label = f"考点 {num_match.group(0)}" if num_match else f"选项 {j+1}"
                
                # 确定该槽位的数据范围
                start = match.start()
                end = all_slot_defs[j+1].start() if j + 1 < len(all_slot_defs) else len(main_part)
                slot_block = main_part[start:end].strip()
                
                # 提取选项
                opts = re.findall(r'[A-D][:：]\s*(.*?)(?=[A-D][:：]|$|\[答案:)', slot_block, re.DOTALL)
                opts = [o.strip() for o in opts]
                
                # 寻找答案
                # 优先在 slot_block 里找
                ans_m = re.search(r'\[答案:\s*([A-D])\]', slot_block)
                ans = ans_m.group(1).strip() if ans_m else ""
                
                # 如果没找到，尝试在整个 main_part 里找（有些题目的答案放在最后）
                if not ans:
                    all_ans = re.findall(r'\[答案:\s*([A-D\s]+)\]', main_part)
                    if len(all_ans) > j:
                        raw_ans = all_ans[j].replace(" ", "")
                        if len(raw_ans) > 0: ans = raw_ans[0]
                
                if opts:
                    slots.append({
                        "label": label,
                        "options": opts,
                        "answer": ans
                    })
        else:
            # 单选模式 (没有 (65) 这种显式的槽位定义头部)
            # 题干是到第一个 A: 之前
            first_opt_m = re.search(r'[A-D][:：]', main_part)
            if first_opt_m:
                q_content = main_part[:first_opt_m.start()].strip()
                
                opts = re.findall(r'[A-D][:：]\s*(.*?)(?=[A-D][:：]|$|\[答案:)', main_part, re.DOTALL)
                opts = [o.strip() for o in opts]
                
                ans_m = re.search(r'\[答案:\s*([A-D])\]', block)
                ans = ans_m.group(1).strip() if ans_m else ""
                
                if opts:
                    slots.append({
                        "label": "请选择答案",
                        "options": opts,
                        "answer": ans
                    })
            else:
                # 连选项都没找到，可能是数据异常
                q_content = main_part

        # 整理导出
        difficulty = "medium"
        if any(kw in q_content + explanation for kw in ["线性规划", "伏格尔", "匈牙利"]):
            difficulty = "hard"
        
        tags = ["ch27", "运筹学"]
        if len(slots) > 1: tags.append("多空题")

        # 核心：绝对不修改 q_content 中的内容，保留原始文本
        questions.append({
            "id": q_id,
            "title": title,
            "difficulty": difficulty,
            "tags": tags,
            "content": q_content,
            "slots": slots,
            "explanation": explanation
        })
        
    return questions

def update_js_file(questions, target_path):
    questions_json = json.dumps(questions, ensure_ascii=False, indent=4)
    # 逻辑代码保持不变
    logic_code = r"""
const PROGRESS_KEY = 'ch27_interactive_progress';

let currentIndex = 0;
let userStates = questionsData.map(q => ({
    selected: q.slots.map(() => null),
    isAnswered: false,
    showAnalysis: false
}));

function saveProgress() {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
        currentIndex,
        userStates
    }));
}

function loadProgress() {
    try {
        const saved = localStorage.getItem(PROGRESS_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            if (data.userStates && data.userStates.length === questionsData.length) {
                currentIndex = data.currentIndex || 0;
                userStates = data.userStates;
            }
        }
    } catch (e) {
        console.error('加载进度失败:', e);
    }
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('exam_favorites') || '[]');
}

function toggleFavorite(id) {
    let favs = getFavorites();
    const idx = favs.indexOf(id);
    if (idx > -1) favs.splice(idx, 1);
    else favs.push(id);
    localStorage.setItem('exam_favorites', JSON.stringify(favs));
    render();
}

const difficultyColors = { easy: '#43e97b', medium: '#ffa726', hard: '#f5576c' };
const difficultyText = { easy: '简单', medium: '中等', hard: '困难' };

function render() {
    const q = questionsData[currentIndex];
    if (!q) return;
    const state = userStates[currentIndex];
    const isFavorite = getFavorites().includes(q.id);
    const container = document.getElementById('mainContainer');

    const navGridHtml = questionsData.map((_, idx) => 
        `<div class="nav-square ${idx === currentIndex ? 'current' : ''} ${userStates[idx].isAnswered ? 'done' : ''}" onclick="jumpTo(${idx})">${idx + 1}</div>`
    ).join('');

    const slotsHtml = q.slots.map((slot, sIdx) => {
        const userChoice = state.selected[sIdx];
        return `
        <div class="slot-box">
            <div class="slot-label">
                <span>📍 ${slot.label}</span>
                ${state.isAnswered ? `<span class="ref-ans">参考答案: ${slot.answer}</span>` : ''}
            </div>
            <div class="options-list">
                ${slot.options.map((opt, oIdx) => {
                    const label = String.fromCharCode(65 + oIdx);
                    let cls = 'option-item';
                    if (state.isAnswered) {
                        if (label === slot.answer) cls += ' correct';
                        else if (label === userChoice) cls += ' incorrect';
                    } else if (label === userChoice) cls += ' selected';
                    return `<div class="${cls}" onclick="handleOptionClick(${sIdx}, '${label}')"><div class="option-label">${label}</div><div class="option-text">${opt}</div></div>`;
                }).join('')}
            </div>
        </div>`;
    }).join('');

    container.innerHTML = `
        <div class="practice-layout">
            <div class="question-nav-panel">
                <div class="nav-panel-title"><span>题目导航</span><span>${userStates.filter(s => s.isAnswered).length}/${questionsData.length}</span></div>
                <div class="nav-grid">${navGridHtml}</div>
            </div>
            <div class="question-main">
                <div class="question-header">
                    <div class="question-info">
                        <span>题目 ${currentIndex + 1} / ${questionsData.length}</span>
                        <span style="color: ${difficultyColors[q.difficulty]}">难度: ${difficultyText[q.difficulty]}</span>
                        <div class="tags-row">${q.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                    </div>
                    <div class="question-actions">
                        <button class="action-btn" onclick="toggleFavorite('${q.id}')" title="${isFavorite ? '取消收藏' : '收藏'}">
                            <svg viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="question-card">
                    <h3 class="question-title">题目</h3>
                    <div class="question-content">${q.content}</div>
                    <div class="slots-container">${slotsHtml}</div>
                    <div class="explanation-box ${state.showAnalysis ? 'show' : ''}">
                        <h4>📖 答案解析</h4>
                        <p>${q.explanation.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>
                <div class="question-footer">
                    <button class="btn btn-outline" onclick="prevQ()" ${currentIndex === 0 ? 'disabled' : ''}>← 上一题</button>
                    <div class="action-group">
                        <button class="btn btn-outline" onclick="showExplanation()" ${state.showAnalysis ? 'disabled' : ''}>查看解析</button>
                        <button class="btn btn-secondary" onclick="submitAnswer()" ${state.isAnswered ? 'disabled' : ''}>提交答案</button>
                        <button class="btn btn-outline" onclick="nextQ()" ${currentIndex === questionsData.length - 1 ? 'disabled' : ''}>下一题 →</button>
                    </div>
                </div>
            </div>
        </div>`;
}

function handleOptionClick(sIdx, label) {
    const s = userStates[currentIndex];
    if (s.isAnswered) return;
    s.selected[sIdx] = (s.selected[sIdx] === label) ? null : label;
    saveProgress();
    render();
}

function submitAnswer() {
    const s = userStates[currentIndex];
    if (s.isAnswered || s.selected.some(x => x === null)) return;
    s.isAnswered = s.showAnalysis = true;
    saveProgress();
    render();
}

function showExplanation() {
    const s = userStates[currentIndex];
    s.isAnswered = s.showAnalysis = true;
    saveProgress();
    render();
}

function jumpTo(i) { currentIndex = i; saveProgress(); render(); }
function nextQ() { if (currentIndex < questionsData.length - 1) { currentIndex++; saveProgress(); render(); } }
function prevQ() { if (currentIndex > 0) { currentIndex--; saveProgress(); render(); } }

window.onload = () => {
    loadProgress();
    render();
};
"""
    full_content = f"/**\n * 第 27 章 互动做题系统 - 纯净内容版 (保留原始括号)\n */\nconst questionsData = {questions_json};\n{logic_code}"
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(full_content)

if __name__ == "__main__":
    txt_path = r"f:\软考资料\202605\exam-app\ch27_待校对题库.txt"
    js_path = r"f:\软考资料\202605\exam-app\review_ch27_q4.js"
    print("正在开始纯净解析...")
    qs = parse_ch27_txt(txt_path)
    print(f"解析成功！共提取 {len(qs)} 道题目，已保留原始文本内容。")
    update_js_file(qs, js_path)
    print("数据已成功注入。")
