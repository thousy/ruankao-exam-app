const ch5Questions = [
  {
    "id": "ch5_1",
    "chapterId": "ch5",
    "type": "single",
    "difficulty": "medium",
    "content": "1、真题/模拟\n一定要注意原文，一切按原文来，特别是别用数学思维去做一些语文题。\n例题: 对成本和进度进行权衡，确定如何尽量少增加费用的前提下最大限度地缩短项目所需要\n的时间，称为_ （ 40 ） 。",
    "options": [
      "人快速跟进",
 "赶进度",
 "资源平衡",
 "资源日历"
    ],
    "correctAnswer": 1,
    "explanation": "【答案】B",
    "tags": ["ch5"],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch5_2",
    "chapterId": "ch5",
    "type": "single",
    "difficulty": "medium",
    "content": "2、真题/模拟\n比如: 成本加激励、成本加奖励。这些细节一定要注意。\n例题: 买方为卖方报销履行合同工作中的所发生的的成本，完全由买方主观判断卖方的绩效来\n决定奖励费用，双方签订的是_ （ 54 ） 。",
    "options": [
      "成本加奖励合同",
 "成本加固定费用合同",
 "成本加激励合同",
 "总价加激励合同"
    ],
    "correctAnswer": 0,
    "explanation": "【答案】A",
    "tags": ["ch5"],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch5_3",
    "chapterId": "ch5",
    "type": "single",
    "difficulty": "medium",
    "content": "3、真题/模拟\n上午选择题都是单选题，一定要选1个最好的、最好的。\n\n\n\n例题: 一个项目经理被分配到一个高优先度的新项目。只有 5 个可用的资源，因为其它资源已\n经被承诺给别的项目，完成项目的资源可用时间不足所需时间的一半，并且这个项目经理不能\n说服管理层改变项目的结束日期。此时，项目经理应 （ 52 ） 。",
    "options": [
      "协调团队成员安排必要的加班，以便完成工作",
 "给团队提供良好的工作环境",
 "通过删除在限定时间内不能完成的工作来削减工作范围",
 "使用更有经验的资源，更快地完成工作"
    ],
    "correctAnswer": 2,
    "explanation": "【答案】C",
    "tags": ["ch5"],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch5_4",
    "chapterId": "ch5",
    "type": "single",
    "difficulty": "medium",
    "content": "4、真题/模拟\n注意对应关系。比如: 功能审计和物理审计是审计完整性和一致性对吗? 比如活动和工作包\n的关系是一对多，对吗?\n例题: 关于进度管理的描述，不正确的是_ （ 42 ） 。",
    "options": [
      "活动是项目工作的最基本的工作单元",
 "活动与工作包是一对一或一对多的关系",
 "活动具有持续时间，里程碑的持续时间为堆",
 "活动会占用一定的资源和成本"
    ],
    "correctAnswer": 1,
    "explanation": "【答案】B",
    "tags": ["ch5"],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  }
];
if (typeof examData !== 'undefined') {
    examData.questions = examData.questions.filter(q => q.chapterId !== 'ch5');
    examData.questions.push(...ch5Questions);
}
