import re

block = """{
    "id": "ch4_1",
    "chapterId": "ch4",
    "type": "single",
    "difficulty": "medium",
    "content": "1、2019 年5月第71题\\nThe （ 71 ） creates opportunities for more direct Integration of the physical world intocomputer-based systems, resulting in efficiently improvements ,economic benefits , and reducedhuman exertions.",
    "options": [
      "internet of things",
      "cloud computing",
      "big data",
      "mobile internet"
    ],
    "correctAnswer": 0,
    "explanation": "考查的是物联网的相关知识，必须掌握。\\n（     ）的建立将更多的物理设备直接集成到基于计算机的系统, 从而有效地改善经济效益, 减少人类的努力。\\nA、物联网    B、云计算      C、大数据       D、移动互联网",
    "tags": [
      "ch4"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  }"""

keywords = ["图", "表", "EMV", "计算", "下图", "如图", "下表", "如表"]
for k in keywords:
    if k in block:
        print(f"Matched keyword: {k}")
