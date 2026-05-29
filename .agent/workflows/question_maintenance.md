---
description: 软考题库全自动维护指南 (图片处理与题库导入)
---

# 软考题库维护标准作业程序 (SOP)

## 1. 图片全自动捕获协议 (Full-Auto Image Capture)

当用户发送图片并要求插入特定题目时，必须执行以下步骤：

1. **定位源文件**：搜索系统缓存目录 `C:\Users\admin\.gemini\antigravity\brain\` 下最新产生的 `.png` 文件。
2. **规范化命名**：
   - 格式：`images/ch{章节号}_q{题号}_{简洁描述}.png`
   - 示例：`images/ch24_q64_blank.png`
3. **代码注入**：
   - 修改对应的 `ocr_questions_ch{XX}.js` 文件。
   - 在 `content`（题干）或 `explanation`（解析）末尾插入 HTML 标签：
     `<br><img src='images/文件名.png'>`
   - 保持极简风格，不添加多余的 style 除非用户要求。

## 2. 章节重新导入协议 (Chapter Import)

1. **执行脚本**：运行目录下的 `import_ch{XX}.py`。
2. **校验逻辑**：
    - 必须包含 `examData.questions` 的自动合并逻辑（先 filter 掉旧章节，再 push 新数据）。
3. **同步统计**：
    - 根据脚本输出的“成功导入 X 题”，立即更新 `data.js` 中的 `totalQuestions` 字段。
4. **保留原始格式**：在解析题干内容时，必须保留行首的原始序号（如 `1、`、`2.` 等），不可将其作为冗余信息删除。

## 3. 协作准则 (Interaction Rules)

- **禁止过度工程**：不要擅自修改用户未要求的字段。**必须保留题干开头的原始序号**，不要进行题号纠错或自动去重，除非得到明确授权。
- **proactiveness (主动性)**：直接执行“查图-搬运-改代码”闭环，不要反复询问用户文件名。
- **事实依据**：所有操作以 `ocr_questions_chXX.js` 的实际 ID 和内容为准。

---
*最后更新日期：2026-02-06 23:44*
