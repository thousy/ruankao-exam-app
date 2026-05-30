const ch11Questions = [
  {
    "id": "ch11_1",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "1、2023 年5月第9题 （此题常规重点考题，建议举一反三）\n在常用的 OOD原则中 （ 9 ） 原则是一个对象应当对其他对象有尽可能少的了解，该原则与结构化方法的 （ 9 ） 原则是一致的。",
    "options": [
      "单职 高内聚",
 "组合重用 低耦合",
 "迪米特 \t 低耦合",
 "开闭 高内聚"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查 OOD 的原则，必须会。\nP139 页。迪米特原则 最少知识法则） :一个对象应当对其他对象有尽可能少的了解。本原则与结构化方法的低耦合原则是一致的。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_2",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "2、2023 年5月第10题（此题常规重点考题，建议举一反三）\n （ 10 ） 是 （ 10 ） 的基础，二者的目的都是为了在系统崩溃或灾难发生时能够恢复数据或系统。",
    "options": [
      "数据容灾 数据备份",
 "数据存储 数据安全",
 "数据安全 数据存储",
 "数据备份 数据容灾"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据容灾的内容，必须会。\nP155 页。数据备份是数据容灾的基础。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_3",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "3、2023 年5月第11题（此题常规重点考题，建议举一反三）\n从信息系统集成技术角度来看， （ 11 ） 在最上层。主要解决 （ 11 ） 问题。",
    "options": [
      "数据集成 互通",
 "网络集成 互连",
 "软件集成 互适应",
 "应用集成 互操作性"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查的是应用集成的内容，必须会。\nP169 页。从信息系统集成技术的角度看，在集成的堆栈上，应用集成在最上层，主要解决应用的互操作性的问题。\n如下图：<img src=\"images/ch11_4_stack.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_4",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "4、2023 年5月第12题（此题常规重点考题，建议举一反三）\n （ 12 ） 是防止非法实体对交换数据的修改、插入、删除以及在数据交换过程中的数据丢失。<br><img src=\"images/ch11_4_stack.png\" class=\"question-img\">",
    "options": [
      "对等实体认证服务",
 "数据保密服务",
 "数据完整性服务",
 "数据源点认证服务"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查的是安全服务的内容，必须会。\nP173 页。数据完整性服务用以防止非法实体对交换数据的修改、插入、删除以及在数据交换过程中的数据丢失。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_5",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "5、我根据23 年11月第1批考点原创的模拟题 （此题常规重点考题，建议举一反三）\n（     ）包括多种保密服务，为了防止网络中各系统之间的数据被截获或被非法存取而泄密，提供密码加密保护。",
    "options": [
      "数据保密服务",
 "对等实体认证服务",
 "数据完整性服务 “",
 "禁止否认服务"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查安全服务的内容，必须会。\nP173-P174, 安全服务包括对等实体认证服务、数据保密服务、数据完整性服务、数据源点认证服务、禁止否认服务和犯罪证据提供服务等。\n （ 1 ） 对等实体认证服务。对等实体认证服务用于两个开放系统同等层中的实体建立链接或数据传输时，对对方实体的合法性、真实性进行确认，以防假冒。\n （ 2 ） 数据保密服务。数据保密服务包括多种保密服务，为了防止网络中各系统之间的数据被截获或被非法存取而泄密，提供密码加密保护。数据保密服务可提供链接方式和无链接方式两种数据保密，同时也可对用户可选字段的数据进行保护。\n （ 3 ） 数据完整性服务。数据完整性服务用以防止非法实体对交换数据的修改、插入、删除以及在数据交换过程中的数据丢失。\n （ 4 ） 数据源点认证服务。数据源点认证服务用于确保数据发自真正的源点，防止假冒。\n （ 5 ） 禁止否认服务。禁止否认服务用以防止发送方在发送数据后否认自己发送过此数据，接收方在收到数据后否认自己收到过此数据或伪造接收数据，由两种服务组成: 不得否认发送和不得否认接收。\n （ 6 ） 犯罪证据提供服务。指为违反国内外法律法规的行为或活动，提供各类数字证据、信息线索等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_6",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "6、我根据23 年11月第2 批考点原创的模拟题\n数据标准化的主要内容不包含（     ）。",
    "options": [
      "数据安全化标准",
 "数据元标准化",
 "元数据标准化",
 "数据标准化管理"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查数据标准化的相关内容，尽力会。\nP149，数据标准化的主要内容包括元数据标准化、数据元标准化、数据模式标准化、数据分类与编码标准化和数据标准化管理。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_7",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "7、我根据23 年11月第2批考点原创的模拟题\n以下说法中，错误的是（     ）。",
    "options": [
      "CORB是 OMG 进行标准化分布式对象计算的基础",
 "DCOM 作为 COM 的扩展,不仅继承了 COM 优点，而且针对分布环境还提供了一些新的特性，如位置透明性、网络安全性、跨平台调用",
 "COMT+为 COM 的新发展或 COM 更高层次上的应用，其底层结构仍然以 COM 为基础，几乎包容了 COM 的所有内容",
 "J2EE 的体系结构可以分为客户端层、服务器端组件层和信息系统层。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查 J2EE 等相关内容，尽力会。\nP168-169，J2EE 的体系结构可以分为客户端层、服务器端组件层、EJB 层和信息系统层。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_8",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "8、我根据23 年11月第3批考点原创的模拟题 （此题常规重点考题，建议举一反三）\n网络服务主要包括互联网服务、多媒体信息检索、信息点播、信息广播、远程计算和事务处理以及其他信息服务等是（     ）的内容。",
    "options": [
      "传输子系统",
 "交换子系统",
 "网络操作系统",
 "服务子系统"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查网络集成的相关内容，必须会。\nP165，服务子系统。网络服务是网络应用最核心的问题。带宽再高的网络，如果没有好的网络服务，就不能发挥网络的效益。网络服务主要包括互联网服务、多媒体信息检索、信息点播、信息广播、远程计算和事务处理以及其他信息服务等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_9",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "9、我根据23 年11月第3 批考点原创的模拟题\n（     ）描述了一般事物与该事物中的特殊种类之间的关系，也就是父类与子类之间的关系。",
    "options": [
      "泛化",
 "继承",
 "实现",
 "依赖"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查类之间关系的相关知识，必须会。\nP138，泛化关系描述了一般事物与该事物中的特殊种类之间的关系，也就是父类与子类之间的关系。继承关系是泛化关系的反关系，也就是说，子类继承了父类，而父类则是子类的泛化。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_10",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "10、我根据23 年11月第3批考点原创的模拟题\n以下关于数据清理的说法中，错误的是（     ）。",
    "options": [
      "数据分析: 是指从数据中发现控制数据的一般规则，比如字段域、业务规则等，通过对数据的分析，定义出数据清理的规则，并选择合适的清理算法。",
 "数据检测: 是指根据预定义的清理规则及相关数据清理算法，检测数据是否正确，比如是否满足字段域、业务规则等，或检测记录是否重复。",
 "数据修正: 是指手工或自动地修正检测到的错误数据或重复的记录。",
 "数据清理主要包括数据分析、数据检测和数据修正、数据导入四个步骤"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据清理的相关知识，必须会。\nP156-P157，数据清理的三个步骤:\n （ 1 ） 数据分析: 是指从数据中发现控制数据的一般规则，比如字段域、业务规则等，通过对数据的分析，定义出数据清理的规则，并选择合适的清理算法。\n （ 2 ） 数据检测: 是指根据预定义的清理规则及相关数据清理算法,检测数据是否正确，比如是否满足字段域、业务规则等，或检测记录是否重复。\n （ 3 ） 数据修正: 是指手工或自动地修正检测到的错误数据或重复的记录。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_11",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "11、我根据23 年11月第3批考点原创的模拟题\n层次模型、网状模型、关系模型、面向对象模型和对象关系模型属于（     ）。",
    "options": [
      "概念模型",
 "逻辑模型",
 "物理模型",
 "信息模型"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查数据模型的相关知识，必须会。\nP148, 丈辑模型: 是在概念模型的基础上确定模型的数据结构，目前主要的数据结构有层次模型、网状模型、关系模型、面向对象模型和对象关系模型。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_12",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "12、2023 年11月第4批 （此题常规重点考题，建议举一反三）\n（     ）是指当有新版本发布的时候，先少量用户使用新版本，并且观察新版本是否存在问题。如果出现问题，就及时处理并重新发布; 如果一切正常，就稳步地将新版本适配给所有的用户。",
    "options": [
      "蓝绿部署",
 "金丝雀部署",
 "虚拟机部署",
 "持续部署"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查部署原则，必须会。\nP144，在部署原则中提到两大部署方式为蓝绿部署和金丝雀部署。蓝绿部署是指在部署的时候准备新旧两个部署版本，通过域名解析切换的方式将用户使用环境切换到新版本中，当出现问题的时候，可以快速地将用户环境切回旧版本，并对新版本进行修复和调整。金丝雀部署是指当有新版本发布的时候，先让少量用户使用新版本，并且观察新版本是否存在问题。如果出现问题，就及时处理并重新发布; 如果一切正常，就稳步地将新版本适配给所有的用户。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_13",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "13、2023 年11月第4批\n（     ） 确立代码与事物或概念之间的一一对应关系，以保证数据的准确性和相容性，为信息集成与资源共享提供良好的基础。",
    "options": [
      "元数据标准化",
 "数据元标准化",
 "数据模式标推化",
 "数据分类与编码标准化"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据分类与编码标准化，必须会。\nP153, 数据分类与编码标准化是简化信息交换、实现信息处理和信息资源共享的重要前提，是建立各种信息管理系统的重要技术基础和信息保障依据。通过分类与编码标准化，可以最大限度地消除对信息命名、描述、分类和编码的不一致造成的混乱、误解等现象，可以减少信息的重复采集、加工、存储等操作，使事物的名称和代码的含义统一化、规范化，确立代码与事物或概念之间的一一对应关系，以保证数据的准确性和相容性，为信息集成与资源共享提供良好的基础。数据分类与编码的作用主要包括用于信息系统的共享和互操作，统一数据的表示法和提高信息处理效率。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_14",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "14、2023 年11月第4批 （此题常规重点考题，建议举一反三）\n（     ）不属于应用集成的技术要求。",
    "options": [
      "系统中应用分布的透明性",
 "应用间数据的存储",
 "分布式环境中应用的可移植性",
 "应用间的互操作性"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查应用集成技术要求的内容，必须会。\nP169, 对应用集成的技术要求大致有:\n （ 1 ） 具有应用间的互操作性\n （ 2 ） 具有分布式环境中应用的可移植性\n （ 3 ） 具有系统中应用分布的透明性",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_15",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "15、2024 年5月第1批（此题常规重点考题，建议举一反三）\n软件过程能力成熟度模型（CSMM）包括治理、开发与交付、管理与支持、（     ）四个能力域。",
    "options": [
      "数据管理",
 "组织管理",
 "战略管理",
 "运营管理"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查软件过程能力成熟度模型的相关内容，必须会。\nP144 页，软件过程能力是组织基于软件过程、技术、资源和人员能力达成业务目标的综合能力。包括治理能力、开发与交付能力、管理与支持能力、组织管理能力等方面。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_16",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "16、2024 年5月第1批\n依据 ISSE-CMM 中公共特性的成熟度等级定义，（     ）不属于 ISSE-CMM 的 Level2:规划和跟踪级。",
    "options": [
      "将过程域执行的方法形成标准化和程序化文档",
 "对组织的标准化过程族进行裁剪",
 "在执行过程域中，使用文档化的标准和程序",
 "验证过程与可用标准的一致性"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查 1SSE-CMM 的相关内容，必须会。\nP179，请见下表。<img src=\"images/ch11_16_level3.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_17",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "17、2024 年5月第1批（此题常规重点考题，建议举一反三）\n（     ）定位于在并发事务中保证数据库中数据的逻辑一致性。",
    "options": [
      "保证数据库的完整性",
 "保证数据的操作完整性",
 "保证数据的语义完整性",
 "防止非法的数据访问"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查数据库安全对策的相关内容，必须会。\nP161 页，请见下表<img src=\"images/ch11_17_db_sec.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_18",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "18、2024 年5月第1批 （此题常规重点考题，建议举一反三）\n在应用集成中，有多个组件帮助协调连接各种应用。其中 （     ）利用特定的数据结构，帮助开发人员快速访问其他应用的功能。",
    "options": [
      "事件驱动型操作",
 "API",
 "数据映射",
 "RNN"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查应用集成的相关内容，必须会。\nP170 页，可以帮助协调连接各种应用的组件有:\n （ 1 ） 应用编程接口 AP （ 1 ） :AP1 是定义不同软件交互方式的程序和规则，可以支持应用之间相互通信。AP1 利用特定的数据结构，帮助开发人员快速访问其他应用的功能。\n （ 2 ） 事件驱动型操作: 当和触发器 即事件） 启动一个程序或一组操作时，系统就会执行事件驱动型操作。例如: 在订单提交后，进行计费并向客户开具发票; 管理从ERP 系统到 CRM 系统的“业务机会到订单”工作流。\n （ 3 ） 数据映射: 将数据从一个系统映射到另一个系统，可以定义数据的交换方式，从而简化后续的数据导出、分组或分析工作。例如，用户在一个应用中填写联系信息表，那么这些信息将被映射到相邻应用的相应字段。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_19",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "19、2024 年5月第2批（此题常规重点考题，建议举一反三）\n（     ）不属于白盒测试方法。",
    "options": [
      "基态测试",
 "功能测试",
 "人工检查代码逻辑",
 "语名覆盖"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查白金测试的相关内容，必须会。\nP141 页 。白金测试也称为结构测试，主要用于软件单元测试中。它的主要思想是，将程序看作是一个透明的白盒，测试人员完全清楚程序的结构和处理算法，按照程序内部远辑结构设计测试用例，检测程序中的主要执行通路是否都能按预定要求正确工作。白金测试方法主要有控制流测试、数据流测试和程序变异测试等。另外，使用静态测试的方法也可以实现白金测试。例如，使用人工检查代码的方法来检查代码的远辑问题，也属于和白盒测试的范畴。白盒测试方法中,最常用的技术是逻辑履盖，即使用测试数据运行被测程序,考查对程序远辑的履盖程度。主要的履盖标准有语句履盖、判定履盖、条件履盖、条件/判定覆盖、条件组合覆盖、修正的条件/判定履盖和路径覆盖等。黑盒测试也称为功能测试，主要用于集成测试、确认测试和系统测试中。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_20",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "20、2024年5月第2批\n由安全机制、OSI 网络参考模型、安全服务三个轴形成的信息安全系统三维空间中，操作系统漏洞检测与修复属于（     ）。",
    "options": [
      "平台安全",
 "应用完全",
 "通信安全",
 "授权和审计安全"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查信息安全系统的相关内容，必须会。\nP172 页。平台安全主要包括操作系统漏洞检测与修复、网络基础设施漏洞检测与修复、通用基础应用程序漏洞检测与修复、网络安全产品部署等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_21",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "21、2024 年5月第2批\n实现异构数据源的数据集成，首先需要（     ）。",
    "options": [
      "进行数据清洗",
 "实施数据标注",
 "获取原始数据",
 "矫正数据质量"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查数据集成的相关内容，必须会。\nP166 页。实现异构数据源的数据集成，首先要解决的问题是原始数据的提取。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_22",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "22、2024年5月第2批\n制定一个数据元标准的步骤是（     ）。\n①界定业务范围\n②开展业务流程分析与信息建模\n③描述数据的内容，质量等信息\n④外提取数据元并规范属性\n⑤发布数据元标准并维护",
    "options": [
      "①②③⑤④",
 "③①②④⑤",
 "①④②③⑤",
 "③①④②⑤"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查制定数据元标准的步骤，必须会。\nP151 页。制定数据元标准的步骤:\n （ 1 ） 描述\n （ 2 ） 界定业务范围\n （ 3 ） 开展业务流程分析与信息建模\n （ 4 ） 借助于信息模型，提取数据元，并按照一定的规则规范其属性\n （ 5 ） 对于代码型的数据元，编制其值域，即代码表\n （ 6 ） 与现有的国家标准或行业标准进行协调\n （ 7 ） 发布实施数据元标准并建立相应的动态维护管理机制",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_23",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "23、2025 年5月第1批 （此题常规重点考题，建议举一反三）\n在安全工程中，关于安全服务的描述，正确的是（     ）。",
    "options": [
      "禁止否认服务由不得否认发送和不得否认接收两种服务组成",
 "数据完整性服务不包括数据交换过程中的数据丢失",
 "对等实体认证服务用于确认通信双方实体的合法性及有效性",
 "数据保密服务可提供链接方式、环接方式和桥接方式三种数据保密"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查安全服务的相关内容，必须会。\nP173，禁止否认服务由不得否认发送和不得否认接收两种服务组成。\nB包含数据丢失。C 是合法性和真实性。D 是数据保密服务可提供链接方式和无链接方式两种数据保密，同时也可对用户可选字段的数据进行保护。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_24",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "24、2025 年5月第1批\n在软件集成中，关于软件标准的描述，正确的是（     ）。",
    "options": [
      "DCOM 是分布式组件对象模型，主要用于本地组件通信",
 "COM+把 COM 组件软件提升到应用层，与操作系统的结合更加紧密",
 "J2EE 是一种基于 Java 的桌面应用程序开发平台",
 "CORBA是一种基于. NET 框架的集成技术"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查软件标准的相关内容，必须会。\n在软件集成中，关于软件标准的正确描述如下:\n选项A错误。DCOM 分布式组件对象模型） 是 COM 的扩展，用于支持跨网络的分布式组件通信，而非仅限于本地组件通信。\n选项B 正确。COM+在 COM基础上增加了事务处理、对象池等企业级服务，将其提升到应用层，并与操作系统 如Windows） 深度集成。\n选项 C 错误。J2EE Java 企业版） 是面向服务器端和企业级分布式应用的开发平台，而非桌面应用程序 桌面应用属于 Java SE 范畴）。\n选项 D 错误。CORBA 是独立于. NET 框架的跨语言、跨平台分布式对象技术，与.NET 无关。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_25",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "25、2025 年5月第1批\n数据只有得到充分的0才能发挥出它的作用。通过数据集成、数据挖掘和数据服务、数据\n可视化、信息检索等技术手段帮助数据用户从0中找到所需要的数据，并将数据以一定的方式\n展现出来，实现对数据的（     ）。",
    "options": [
      "开发利用 数据目录 价值共享",
 "开发利用 数据资源 开发利用",
 "价值评估 数据资源 价值共享",
 "价值评估 数据目录 开发利用"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查数据工程的相关内容，必须会。\nP157, 数据只有得到充分的开发利用才能发挥出它的作用。通过数据集成、数据挖据和数据\n服务目录服务、查询服务、浏览和下载服务、数据分发服务） 、数据可视化、信息检索等技术\n手段，帮助数据用户从数据资源中找到所需要的数据，并将数据以一定的方式展现出来，实现\n对数据的开发利用。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_26",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "26、2025 年5月第1批 此丘纹常褒重点考题，建议兴一友三） （此题常规重点考题，建议举一反三）\n软件过程能力成熟度模型CSMMD （ 4 ） 个能力域包括（     ）。\n①战略与规划 ②开发与交付 ③管理与支持 ④四组织管理 ⑤治理",
    "options": [
      "①②④⑤",
 "①②③④",
 "①②③⑤",
 "②③④⑤"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查软件过程能力成熟度模型的相关内容，必须会。\nP145。CSMM 模型由4 个能力域、20 个能力子域、161 个能力要求组成:\n （ 1 ） 治理:包括战略与治理、目标管理能力子域，用于确定组织的战略、产品的方向、组织的业务目标，并确保目标的实现。\n （ 2 ） 开发与交付:包括需求、设计、开发、测试、部署、服务、开源应用能力子域，这些能力子域确保通过软件工程过程交付满足需求的软件，为顾客与利益干系人增加价值。\n （ 3 ） 管理与支持:包括项目策划、项目监控、项目结项、质量保证、风险管理、配置管理、供应商管理能力子域这些能力子域覆盖了软件开发项目的全过程，以确保软件项目能够按照既定的成本、进度和质量交付，能够满足顾客与利益干系人的要求。\n （ 4 ） 组织管理:包括过程管理、人员能力管理、组织资源管理、过程能力管理能力子域，对软件组织能力进行综合管理",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_27",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "27、2025 年5月第1批\n在如下数据表的相关描述中，4003、王亮、45 是（     ）。\nUser ID User Name Age\n4003 王亮 45\n4004 张三 20",
    "options": [
      "主数据",
 "数据元",
 "元数据",
 "元元数据"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查数据实例的相关内容，必须会。\n在数据表中，4003、王亮、45 是具体的数据实例，属于以下分类:\n数据元: 指数据的基本单位，即某个字段的具体值 如 User 1D=4003，User Name=王亮，Age= （ 45 ） 。\n主数据: 指业务核心实体的完整记录 （ 如用户、产品），而非单个字段值。\n元数据: 描述数据的数据（ 如字段名“User ID”、字段类型、长度等） 。\n元元数据: 描述元数据的数据 （ 如定义元数据的标准或规则）。\n题目中的 4003、王亮、45 均为具体数据项的值，属于 数据元，故正确答案为 B。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_28",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "28、2025 年5月第2批\n对于新建信息系统的数据源提取，一般适用（     ）提取法? 在（     ）的基础上分析提取数据源及其属性。",
    "options": [
      "自下而上 概念数据模型和逻辑数据模型",
 "自上而下 概念数据模型和逻辑数据模型",
 "自上而下 逻辑数据模型和物理数据模型",
 "自下而上 逻辑数据模型和物理数据模型"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查数据元提取相关知识，必须掌握。\nP151，对于新建系统的数据元提取，一般适用“自上而下”的提取法。基本步骤是在流程\n和功能分析的基础上，通过建模分析，确立关心的“对象”\"。在概念数据模型和罗辑数据模型的基础上，分析提取数据元及其属性。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_29",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "29、2025 年5月第2 批\n数据集成的目的是为应用提供（     ）的访问支持，因此集成后的数据必须保证（     ）。",
    "options": [
      "实时 正确性",
 "实时 完整性",
 "统一 正确性",
 "统一 完整性"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据集成相关知识，必须掌握。\nP166，数据集成的目的是为应用提供统一的访问支持，因此集成后的数据必须保证一定的完整性，包括数据完整性和约束完整性。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_30",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "30、2025 年5月第2批 （此题常规重点考题，建议举一反三）\n关于数据挖掘与传统数据分析的描述，不正确的是（     ）。",
    "options": [
      "两者都是主要运用统计学的方法和手段对数据进行分析",
 "数据挖掘通常是预测型和发现型的，预测未来的情况",
 "数据挖掘所需的数据量比传统数据分析所需的数据量大",
 "传统数据分析通常是回顾型和验证型的，分析已经发生了什么"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查数据挖气相关知识，必须掌握。\nP158，数据挖据与传统数据分析不同:\n①两者分析对象的数据量有差异，数据挖据所需的数据量比传统数据分析所需的数据量大，数据量越大，数据挖气的效果越好; ②两者运用的分析方法有差异，传统数据分析主要运用统计学的方法、手段对数据进行分析，而数据挖掘综合运用数据统计、人工智能、可视化等技术对数据进行分析;\n③两者分析侧重有差异，传统数据分析通常是回顾型和验证型的，通常分析已经发生了什么，而数据挖所通常是预测型和发现型的，预测未来的情况，解释发生的原因;\n④两者成熟度不同，传统数据分析由于研究较早，其分析方法相当成熟，而数据挖据除基于统计学等方法外，部分方法仍处于发展阶段。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_31",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "31、2025 年5月第2批 （此题常规重点考题，建议举一反三）\n以下测试内容属于黑盒测试方法的是 （     ），该方法属于（     ）。",
    "options": [
      "控制流测试 静态测试",
 "结构测试 静态测试",
 "功能测试 动态测试",
 "代码走查 动态测试"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查软件测试相关知识，必须掌握。\nP141，坎件测试方法可分为静态测试和动态测试。\n①静态测试是指被测试程序不在机器上运行，而采用人工检测和计算机辅助静态分析的手段对程序进行检测。静态测试包括对文档的静态测试和对代码的静态测试。对文档的静态测试主要以检查单的形式进行，而对代码的静态测试一般采用桌前检查、代码走查和代码审查。\n②动态测试是指在计算机上实际运行程序进行软件测试，一般采用和白盒测试和黑盒测试方法。白盒测试也称为结构测试，主要用于软件单元测试中。白盒测试方法主要有控制流测试、数据流测试和程序变异测试等。另外，使用静态测试的方法也可以实现白盒测试。例如，使用人工检查代码的方法来检查代码的还辑问题，也属于白金测试的范畸。\n黑盒测试也称为功能测试，主要用于集成测试、确认测试和系统测试中。黑金测试将程序看作是一个不透明的黑金，完全不考虑或不了解） 程序的内部结构和处理算法，而只检查程序功能是否能按照 SRS 的要求正常使用,程序是否能适当地接收输入数据并产生正确的输出信息，程序运行过程中能否保持外部信息例如，文件和数据库等） 的完整性等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_32",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "1、以下说法中，错误的是（     ）。",
    "options": [
      "从目前已有的软件架构评估技术来看，可以归纳为三类主要的评估方式，分别是基于调查问卷（ 或检查表） 的方式、基于场景的方式和基于度量的方式。",
 "独立构件风格是指包括进程通信和事件驱动的系统",
 "需求是多层次的，包括业务需求、用户需求和系统需求",
 "QFD 将软件需求分为三类，分别是常规需求、期望需求和过渡需求。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查软件需求分类，必须会。\nP131, QFD 将软件需求分为三类，分别是常规需求、期望需求和意外需求。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_33",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "2、以下说法中，错误的是（     ）。",
    "options": [
      "需求过程: 主要包括需求获取、需求分析、需求规格说明书编制、需求验证与确认等",
 "使用结构化分析（SA） 方法进行需求分析。一般使用实体关系图 （E-R 图） 表示数据模型，用数据流图（DFD） 表示功能模型，用状态转换图（ STD） 表示行为模型。",
 "构件图描述一个封装的类和它的接口、端口，以及由内嵌的构件和连接件构成的内部结构。",
 "面向对象设计（OOD） 是 OOA方法的延续，其基本思想包括抽象、封装和可扩展性，其中可扩展性主要通过继承和泛化来实现。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查面向对象设计的相关内容，必须会。\nP139, 面向对象设计 （OOD） 是 OOA方法的延续，其基本思想包括抽象、封装和可扩展性，其中可扩展性主要通过继承和多态来实现。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_34",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "3、以下说法中，错误的是（     ）。",
    "options": [
      "使用静态测试的方法也可以实现白盒测试。例如，使用人工检查代码的方法来检查代码的届辑问题，也属于白盒测试的范畴",
 "容器技术目前是部署中最流行的技术。",
 "蓝绿部署是指当有新版本发布的时候，先让少量用户使用新版本，并且观察新版本是否存在问题。如果出现问题，就及时处理并重新发布，如果一切正常，就稳步地将新版本适配给所有的用户。",
 "不可变服务器是一种部署模式，是指除了更新和安装补丁程序以外，不对服务器进行任何更改。"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查部署原则的相关内容，必须会。\nP144, 金丝怎部署是指当有新版本发布的时候，先让少量用户使用新版本，并且观察新版本是否存在问题。如果出现问题，就及时处理并重新发布; 如果一切正常，就稳步地将新版本适配给所有的用户。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_35",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "4、CSMM 模型中，组织管理能力域包括过程管理、人员能力管理、组织资源管理、（     ）能力子域。",
    "options": [
      "过程能力管理",
 "项目监控",
 "开源应用",
 "质量保证"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查 CSMM 的相关内容，必须会。\nP145, CSMM 模型由4个能力域、20 个能力子域、161 个能力要求组成:\n （ 1 ） 治理: 包括战略与治理、目标管理能力子域，用于确定组织的战略、产品的方向、组织的业务目标，并确保目标的实现。\n （ 2 ） 开发与交付: 包括需求、设计、开发、测试、部署、服务、开源应用能力子域，这些能力子域确保通过软件工程过程交付满足需求的软件，为顾客与利益干系人增加价值。\n （ 3 ） 管理与支持: 包括项目策划、项目监控、项目结项、质量保证、风险管理、配置管理、供应商管理能力子域，这些能力子域履盖了软件开发项目的全过程，以确保软件项目能够按照既定的成本、进度和质量交付，能够满足顾客与利益干系人的要求。\n （ 4 ） 组织管理: 包括过程管理、人员能力管理、组织资源管理、过程能力管理能力子域，对软件组织能力进行综合管理。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_36",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "5、在软件过程能力成熟度等级中，其中: 在组织范围内能够稳定地实现预期的项目目标，属于（     ）的结果特征。",
    "options": [
      "初始级",
 "项目规范级",
 "组织改进级",
 "量化提升级"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查软件过程能力成熟度等级，必须会。\nP145-P146, 见下表<img src=\"images/ch11_37_csmm.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_37",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "6、（     ）是考虑各种具体的技术实现因素，进行数据库体系结构设计，真正实现数据在数据库中的存放。<br><img src=\"images/ch11_37_csmm.png\" class=\"question-img\">",
    "options": [
      "概念模型",
 "逻辑模型",
 "物理模型",
 "信息模型"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查物理模型等相关名词，必须会。\nP147-P148\n （ 1 ） 概念模型: 也称信息模型，它是按用户的观点来对数据和信息建模，也就是说，把现实世界中的客观对象抽象为某一种信息结构，这种信息结构不依赖于具体的计算机系统，也不对应某个具体的 DBMS，它是概念级别的模型。\n （ 2 ） 逻辑模型: 是在概念模型的基础上确定模型的数据结构，目前主要的数据结构有层次模型、网状模型、关系模型、面向对象模型和对象关系模型。其中，关系模型成为目前最重要的一种逻辑数据模型。\n （ 3 ） 物理模型: 是在远辑数据模型的基础上，考虑各种具体的技术实现因素，进行数据库体系结构设计，真正实现数据在数据库中的存放。物理数据模型的目标是如何用数据库模式来实现逻辑数据模型，以及真正地保存数据。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_38",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "7、以下说法中，错误的是（     ）。",
    "options": [
      "数据建模过程包括数据需求分析、概念模型设计、逮辑模型设计和物理模型设计等过程",
 "元数据是关于数据的数据",
 "数据元是数据库、文件和数据交换的基本数据单元。",
 "数据备份结构可以分为四种: NAS 备份结构、基于 LAN 的备份结构、LANFREE 备份结构和SERVER-FREE 备份结构。常见的备份策略主要有三种: 完全备份、差分备份和增量备份。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据备份等相关内容，必须会。\nP154, 数据备份结构可以分为四种: DAS 备份结构、基于 LAN 的备份结构、LANFREE 备份结构和 SERVER-FREE 备份结构。常见的备份策略主要有三种: 完全备份、差分备份和增量备份。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_39",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "8、以下说法中，错误的是（     ）。",
    "options": [
      "数据质量元素分为数据质量定量元素和数据质量非定量元素。",
 "数据产品的质量控制分成前期控制、中期控制和后期控制三部分。",
 "数据清理的三个步骤: 数据分析、数据检测和数据修正。",
 "数据服务主要包括数据目录服务、数据查询与浏览及下载服务、数据分发服务。"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查数据产品的质量控制，必须会。\nP15G, 数据产品的质量控制分成前期控制和后期控制两部分。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_40",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "9、以下说法中，错误的是（     ）。",
    "options": [
      "数据可视化主要运用计算机图形学和图像处理技术，将数据转换成为图形或图像在屏幕上显示出来，并能进行交互处理。",
 "传输介质分为无线传输介质和有线传输介质两大类。常用的无线传输介质主要包括无线电波、微波、红外线等，常用的有线传输介质主要包括双绞线、同轴电缆、光纤等。",
 "数据集成可以分为基本数据集成、多级视图集成、模式集成和多粒度数据集成四个层次。",
 "ISSE 将信息安全系统工程实施过程分解为: 工程过程、风险过程和保证过程、控制过程四部分。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查 1SSE 的相关内容，必须会。\nP175, 1SSE 将信息安全系统工程实施过程分解为: 工程过程、风险过程和保证过程三部分。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_41",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "10、下面说法错误的是 （     ）。",
    "options": [
      "在架构评估过程中，评估人员所关注的是系统的质量属性。",
 "UML 是一种定义良好、易于表达、功能强大且普遍适用的编程语言。",
 "使用结构化分析（ SA ） 方法进行需求分析，其建立的模型的核心是数据字典。",
 "软件需求规格说明书（ SRS） 是需求开发活动的产物。"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查 UML 的相关内容，必须会。\nP133, 统一建模语言 （ UML ） 是一种定义良好、易于表达、功能强大且普遍适用的建模语言。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_42",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "11、在结构化设计中需要遵循的基本原则是（     ）。",
    "options": [
      "高内聚高耦合",
 "继承和多态",
 "高内聚低耦合",
 "封装和可扩展"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查结构化设计的原则，必须会。\nP139, 在 SD 中，需要遵循一个基本的原则: 高内聚，低磷合。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_43",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "12、下列说法不正确的是（     ）。",
    "options": [
      "对代码的动态测试一般采用桌前检查、代码走查和代码审查;",
 "Alpha 测试是指由用户在开发环境下进行测试: Beta 测试是指由用户在实际使用环境下进行",
 "黑盒测试也称为功能测试，主要用于集成测试、确认测试和系统测试中",
 "白盒测试方法主要有控制流测试、数据流测试和程序变异测试等。"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查软件测试的相关内容，必须会。\nP141, 对代码的静态测试一般采用案前检查、代码走查和代码审查。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_44",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "13、下面哪项不属于安全服务的内容（     ）。",
    "options": [
      "对等实体认证服务",
 "数据保密服务",
 "数据验证服务",
 "禁止否认服务"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查安全服务的内容，必须会。\nP173, 安全服务包括对等实体认证服务、数据保密服务、数据完整性服务、数据源点认证服\n务、禁止否认服务和犯罪证据提供服务等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_45",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "14、（     ）是将数据模型转换为真正的数据库结构，还需要针对具体的 DBMS 进行物理模型设计，\n使数据模型走向数据存储应用环节。",
    "options": [
      "数据需求分析",
 "概念模型设计",
 "逻辑模型设计",
 "物理模型设计"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查物理模型设计等相关内容，必须会。\nP148-P149, 通常来说，数据建模过程包括数据需求分析、概念模型设计、逻辑模型设计和物理模型设计等过程。\n （ 1 ） 数据需求分析。简单地说，数据需求分析就是分析用户对数据的需要和要求。\n （ 2 ） 概念模型设计。将需求分析得到结果抽象为概念模型的过程就是概念模型设计，其任务是确定实体和数据及其关联。\n （ 3 ） 逻辑模型设计。膛辑模型设计的任务就是将概念模型中实体、属性和关联转换为关系模型结构中的关系模式。\n （ 4 ） 物理模型设计。将数据模型转换为真正的数据库结构，还需要针对具体的 DBMS 进行物理模型设计，使数据模型走向数据存储应用环节。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_46",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "15、ISSE-CMM 体系结构中，建立可测度的质量目标是 （     ）的公共特性。",
    "options": [
      "量化控制级",
 "充分定义级",
 "持续改进级",
 "规划和跟踪级"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查 1SSE-CMM 的相关内容，尽力会。\nP179-P180, 具体可以见前面的考点里的表格。<img src=\"images/ch11_46_level4.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_47",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "16、（     ）对已经获取到的需求进行提炼、分析和审查，以确保所有的项目干系人都明白其含义并找出其中的错误、遗漏或其他不足的地方。",
    "options": [
      "需求获取",
 "需求分析",
 "需求验证",
 "需求确认"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查需求分析等相关名词的定义，必须会。\nP131, 需求分析对已经获取到的需求进行提炼、分析和审查，以确保所有的项目干系人都明白其含义并找出其中的错误、遗漏或其他不足的地方。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_48",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "17、（     ）包括解释器和基于规则的系统。",
    "options": [
      "虚拟机风格",
 "独立构件风格",
 "数据流风格",
 "仓库风格"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查架构模式，必须会。\nP130，<img src=\"images/ch11_48_arch.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_49",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "18、以下说法中，错误的是（     ）。",
    "options": [
      "从目前已有的软件架构评估技术来看，可以归纳为三类主要的评估方式，分别是基于调查问",
 "需求是多层次的，包括业务需求、用户需求和系统需求。",
 "QFD将软件需求分为三类，分别是常规需求、期望需求和意外需求。",
 "需求过程主要包括需求获取、需求分析、需求规格说明书编制、需求验证与确认等"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查软件架构评估技术，必须会。\nP130，从目前已有的软件架构评估技术来看，可以归纳为三类主要的评估方式，分别是基于调查问老（ 或检查表） 的方式、基于场景的方式和基于度量的方式。这三种评估方式中，基于场景的评估方式最为常用。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_50",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "19、以下说法中，错误的是 （     ）。",
    "options": [
      "一般使用实体关系图（ E-R图 ） 表示数据模型，用数据流图（DFD） 表示功能模型，用状态转换图 （STD） 表示行为模型。",
 "软件需求规格说明书（ SRS ） 是需求开发活动的产物，编制该文档的目的是使项目干系人与开发团队对系统的初始规定有一个共同的理解，使之成为整个开发工作的基础。",
 "需求评审就是对SRS进行技术评审，SRS的评审可以发现那些二义性的或不确定性的需求， 为项目干系人提供在需求问题上达成共识的方法。",
 "把杂乱无章的用户要求和期望转化为用户需求，这就是需求分析的工作。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查需求分析等内容，必须会。\nP131，把杂乱无章的用户要求和期望转化为用户需求，这就是需求分析的工作。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_51",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "20、（     ）描述一组对象之间连接的结构关系。",
    "options": [
      "依赖",
 "关联",
 "泛化",
 "实现"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查关联等相关名词的定义，必须会。\nP134，<img src=\"images/ch11_51_rel.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_52",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "21、（     ）强调消息跨越不同对象或参与者的实际时间，而不仅仅只是关心消息的相对顺序。",
    "options": [
      "类图",
 "构件图",
 "组合结构图",
 "定时图"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查 UML 的相关内容，尽力会。\nP134-P135，<img src=\"images/ch11_52_uml.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_53",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "22、（     ）视图对组成基于系统的物理代码的文件和构件进行建模。",
    "options": [
      "逻辑视图",
 "进程视图",
 "实现视图",
 "部署视图"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查 UML 视图的相关内容，尽力会。\nP135-P136，<img src=\"images/ch11_53_views.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_54",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "23、关于面向对象设计 （ OOD ） 的原则，说法错误的是 （     ）。",
    "options": [
      "开闭原则: 对扩展封闭，对修改开放。",
 "单职原则: 设计功能单一的类。本原则与结构化方法的高内聚原则是一致的。",
 "李氏蔡换原则: 子类可以替换父类。",
 "组合重用原则: 要尽量使用组合，而不是继承关系达到重用目的。"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查面向对象设计的原则，必须会。\nP139，面向对象设计 （ OOD ） 是 OOA 方法的延续，其基本思想包括抽象、封装和可扩展性，其中可扩展性主要通过继承和多态来实现。常用的 OOD 原则包括:\n （ 1 ） 单职原则: 设计功能单一的类。本原则与结构化方法的高内聚原则是一致的。\n （ 2 ） 开闭原则: 对扩展开放，对修改封阁。\n （ 3 ） 李氏替换原则: 子类可以替换父类。\n （ 4 ） 依赖倒置原则: 要依赖于抽象，而不是具体实现; 要针对接口编程，不要针对实现编\n （ 5 ） 接口隔离原则: 使用多个专门的接口比使用单一的总接口要好。\n （ 6 ） 组合重用原则: 要尽量使用组合，而不是继承关系达到重用目的。\n （ 7 ） 迪米特原则（ 最少知识法则） :一个对象应当对其他对象有尽可能少的了解。本原则与结构化方法的低耦合原则是一致的。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_55",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "24、以下关于设计模式，说法错误的是（     ）。",
    "options": [
      "根据处理范围不同，设计模式可分为类模式和对象模式。",
 "类模式处理类和子类之间的关系，这些关系通过继承建立，在编译时刻就被确定下来，属于",
 "根据目的和用途不同，设计模式可分为创建型模式、结构型模式和行为型模式三种。",
 "结构型模式主要用于处理类或对象的组合"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查设计模式的相关内容，必须会。\nP139，类模式处理类和子类之间的关系，这些关系通过继承建立，在编译时刻就被确定下来，属于静态关系。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_56",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "25、编码效率主要包括（     ）。\n①程序效率 ②算法效率 ③存储效率 ④I/O效率",
    "options": [
      "①②",
 "①②③",
 "③④",
 "①②③④"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查编码效率，尽力会。\nP139，编码效率主要包括①程序效率②算法效率③存储效率④l/O 效率",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_57",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "26、以下关于软件测试的说法中，错误的是（     ）。",
    "options": [
      "静态测试是指被测试程序不在机器上运行,而采用人工检测和计算机辅助静态分析的手段对程序进行检测。静态测试包括对文档的静态测试和对代码的静态测试。",
 "对文档的静态测试主要以检查单的形式进行,而对代码的静态测试一般采用桌前检查、代码走查和代码审查。",
 "白盒测试方法中，最常用的技术是逻辑覆盖，即使用测试数据运行被测程序，考查对程序罗辑的覆盖程度。",
 "白盒测试也称为功能测试，主要用于集成测试、确认测试和系统测试中。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查软件测试，必须会。\nP139，黑使测试也称为功能测试，主要用于集成测试、确认测试和系统测试中。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_58",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "27、以下说法中，错误的是（     ）。",
    "options": [
      "持续交付是一系列开发实践方法，用来确保让代码能够快速、安全地部署到生产环境中。",
 "在开发测试阶段，做到持续集成，让测试人员尽早进入项目开始测试",
 "持续交付让软件在整个生命周期内都处于可部署的状态",
 "持续交付让软件版本边界模糊化，不便于管理"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查持续交付的相关内容，必须会。\nP142，持续交付能够简化部署步又，使软件版本更加清晰。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_59",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "28、关于持续部署，说法错误的是（     ）。",
    "options": [
      "容器技术上手简单，轻量级架构，体积很小",
 "容器技术的集合性更好，能更容易对环境和软件进行打包复制和发布;",
 "部署方式采用蓝绿部署或金丝淮部署。",
 "应根据环境的不同，使用不同的部署方式"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查持续部署的相关内容，必须会。\nP143，所有的环境使用相同的部署方式。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_60",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "29、在软件过程能力成熟度等级中，在组织范围内能够稳定地实现预期的项目目标属于（     ）的特征。",
    "options": [
      "1级:初始级",
 "2级:项目规范级",
 "3级:组织改进级",
 "4级:量化提升级"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查软件过程能力成熟度等级，必须会。<img src=\"images/ch11_60_csmm.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_61",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "30、以下关于数据模型的说法中，错误的是（     ）。",
    "options": [
      "可以将数据模型划分为三类: 概念模型、轴辑模型和物理模型 。",
 "概念模型: 也称信息模型，它是按用户的观点来对数据和信息建模，也就是说，把现实世界",
 "概念模型是对现实世界的抽象和概括，它应该真实、充分地反映现实世界中事物和事物之间的联系，有丰富的语义表达能力，能表达用户的各种需求。",
 "逻辑模型是考虑各种具体的技术实现因素，进行数据库体系结构设计，真正实现数据在数据库中的存放。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据模型的相关内容，必须会。\nP148。根据模型应用目的不同，可以将数据模型划分为三类: 概念模型、逻辑模型和物理模型。\n （ 1 ） 概念模型: 也称信息模型，它是按用户的观点来对数据和信息建模，也就是说，把现实世界中的客观对象抽象为某一种信息结构，这种信息结构不依赖于具体的计算机系统，也不对应某个具体的 DBMS，它是概念级别的模型。\n （ 2 ） 还辑模型: 是在概念模型的基础上确定模型的数据结构，目前主要的数据结构有层次模型、网状模型、关系模型、面向对象模型和对象关系模型。其中，关系模型成为目前最重要的一种远辑数据模型。\n （ 3 ） 物理模型: 是在远辑数据模型的基础上，考虑各种具体的技术实现因素，进行数据库体系结构设计，真正实现数据在数据库中的存放。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_62",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "31、以下关于元数据和数据元的说法中，错误的是（     ）。",
    "options": [
      "数据元是数据库、文件和数据交换的基本数据单元。",
 "常用的数据元提取方法有两种: 自上而下提取法和自下而上提取法。",
 "对于新建系统的数据元提取,一般适用“自上而下”的提取法; 对于已建系统的数据元提取，一般适用自下而上提取法。",
 "元数据一般来说由三部分组成: ①对象②特性③表示"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查元数据和数据元，必须会。\nP151。数据元一般来说由三部分组成: ①对象②特性③表示",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_63",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "32、数据管理机构对提交的数据标准建议、现行数据标准的修改或封存建议进行审查属于（     ）阶段的工作。",
    "options": [
      "确定数据需求",
 "制定数据标准",
 "批准数据标准",
 "实施数据标准"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查数据标准化的相关内容，必须会。\nP153。数据标准化阶段的具体过程包括确定数据需求、制定数据标准、批准数据标准和实施数据标准四个阶段。\n （ 1 ） 确定数据需求。本阶段将产生数据需求及相关的元数据、域值等文件。在确定数据需求时应考虑现行的法规、政策，以及现行的数据标准。\n （ 2 ） 制定数据标准。本阶段要处理“确定数据需求”阶段提出的数据需求。如果现有的数据推荐的、新的或修改的数据标准记录于数据字典中。这个阶段将产生供审查和批准的成套建议。\n （ 3 ） 批准数据标准。本阶段的数据管理机构对提交的数据标准建议、现行数据标准的修改或封存建议进行审查。一经批准，该数据标准将扩充或修改数据模型。\n （ 4 ） 实施数据标准。本阶段涉及在各信息系统中实施和改进已批准的数据标准。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_64",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "33、以下说法中，错误的是（     ）。",
    "options": [
      "数据备份结构可以分为四种: DAS备份结构、基于LAN的备份结构、LANFREE备份结构和SERVER-FREE备份结构。",
 "常见的备份策略主要有三种:完全备份、差分备份和增量备份",
 "备份软件主要分为两大类: 一是操作系统自带的软件，如该麟操作系统的“备份”工具，这类软件实现的功能都很简单;二是专业备份软件，其能够实现比较全面的功能。",
 "数据容灾是数据备份的基础。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据备份的内容，必须会。\nP155。数据备份是数据容灾的基础。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_65",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "34、以下关于数据质量的说法中，错误的是（     ）。",
    "options": [
      "数据质量可以通过数据质量元素来描述, 数据质量元素分为数据质量定量元素和数据质量非定量元素。",
 "数据质量评价方法分为直接评价法和间接评价法",
 "数据产品的质量控制分成前期控制和后期控制两个大部分",
 "数据清理主要包括数据分析、数据检测和数据修正、数据导入四个步骤"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据质量的相关内容，必须会。\nP15G。数据清理主要包括数据分析、数据检测和数据修正三个步骤。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_66",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "35、数据挖掘与传统数据分析不同点包括（     ）。\n①两者分析对象的数据量有差异，数据挖掘所需的数据量比传统数据分析所需的数据量大，数据量越大，数据挖掘的效果越好\n②两者运用的分析方法有差异，传统数据分析主要运用统计学的方法、手段对数据进行分析，而数据挖气综合运用数据统计、人工智能、可视化等技术对数据进行分析\n③两者分析侧重有差异，传统数据分析通常是回顾型和验证型的，通常分析已经发生了什么，而数据挖掘通常是预测型和发现型的，预测未来的情况，解释发生的原因\n④两者成熟度不同，传统数据分析由于研究较早，其分析方法相当成熟，而数据挖掘除基于统计学等方法外，部分方法仍处于发展阶段。",
    "options": [
      "①②",
 "①②③",
 "①②③④",
 "②③④"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查数据挖据的相关内容，尽力会。\nP158。把上面的答案读下就好。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_67",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "36、以下说法中，错误的是（     ）。",
    "options": [
      "数据服务主要包括数据目录服务、数据查询与浏览及下载服务、数据分发服务。",
 "数据查询、浏览和下载是网上数据共享服务的重要方式,用户使用数据的方式有查询数据和下载数据两种。",
 "层次数据实际上是二维数据的一种特例, 即二维中有一维是时间轴。它以图形方式显示随着时间变化的数据，是可视化信息最常见、最有用的方式之一",
 "网络数据指与任意数量的其他节点有关系的节点的数据。 网络数据中的节点不受与它有关系的其他节点数量的约束不同于层次节点有且只有一个父节点）, 网络数据没有固有的层次结构，两个节点之间可以有多条连接路径，也就是说节点间关系的属性和数量是可变的"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查数据可视化的相关内容，尽力会。\nP159-P160。<img src=\"images/ch11_67_viz.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_68",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "37、（     ）是指从大量的、不完全的、模糊的、随机的数据中，提取隐含在其中且人们事先不知道的潜在、有用的信息和知识的过程。",
    "options": [
      "全文检索",
 "字段检索",
 "基于内容的多媒体检索",
 "数据挖掘"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据挖据的相关内容，必须会。\nP160。信息检索的主要方法如下:\n （ 1 ） 全文检索。以文本数据为主要处理对象，根据数据资料的内容而不是外在特征来实现的信息检索手段。\n （ 2 ） 字段检索。把检索对象按一定标准在不同字段中进行著录，并把不同字段作为检索依据。\n （ 3 ） 基于内容的多媒体检索。按检索内容可分为图像检索、视频检索和声音检索等。\n （ 4 ） 数据挖掘。从大量的、不完全的、模糊的、随机的数据中，提取隐含在其中且人们事先不知道的潜在、有用的信息和知识的过程。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_69",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "38、（     ）主要是通过检索式中的专门符号来规定检索词在结果中的相对位置。在某些情况下，\n若不限制检索词之间的位置关系则会造成误检，影响查准率。",
    "options": [
      "布尔罗辑检索技术",
 "截词检索技术",
 "临近检索技术",
 "限制检索技术"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查信息检索的技术，必须会。\nP160-P161。信息检索的常用技术包括布尔逻辑检索技术、蕉词检索技术、临近检索技术、限定字段检索技术、限制检索技术等。\n （ 1 ） 布尔逻辑检索技术。严格意义上的布尔检索法是指利用布尔远辑运算符连接各个检索词，然后由计算机进行相应的逻辑运算，以找出所需信息的方法。\n （ 2 ） 截词检索技术。截词检索技术是指用截断的词的一个局部进行检索，并认为凡是满足这个词局部的所有字符的信息，都为命中的信息。截词符用“?”或“#”表示 不同系统、不同数据库，其代表的含义有所不同） 。\n （ 3 ） 临近检索技术。临近检索又称位置检索，主要是通过检索式中的专门符号来规定检索词在结果中的相对位置。在某些情况下，若不限制检索词之间的位置关系则会造成误检，影响查准率。\n （ 4 ） 限定字段检索技术。限定字段检索即指定检索词在记录中出现的字段。检索时，计算机只对限定字段进行匹配运算，以提高检索效率和查准率。\n （ 5 ） 限制检索技术。限制检索是通过限制检索范围，达到优化检索的方法。限制检索的方式有很多种，例如进行字段检索，使用限制符，采用限制检索命令等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_70",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "39、（     ） 是数据库的第一道安全防线，是授权、审计等的前提条件。",
    "options": [
      "标识和认证",
 "机密数据管理",
 "多级保护",
 "限界"
    ],
    "correctAnswer": 0,
    "explanation": "本题考试数据库的相关内容，尽力会。\nP162。标识和认证也是数据库的第一道安全防线。标识和认证是授权、审计等的前提条件。<img src=\"images/ch11_70_db_policy.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_71",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "40、系统集成在技术上需要遵循的基本原则包括: 开放性、结构化、先进性和主流化。其中 （     ）是把一个复杂系统分解成相对独立和简单的子系统，每一个子系统又分解成更简单的模块，这样自顶向下逐层模块化分解，直到底层每一个模块都是可具体说明和可执行的为止。",
    "options": [
      "开放性",
 "结构化",
 "先进性",
 "主流化"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查系统集成的原则，人必须会。\nP163-P164。系统集成的原则包括: 开放性、结构化、先进性和主流化。\n （ 1 ） 开放性。系统硬软件平台、通信接口、软件开发工具、网络结构的选择要遵循工业开放标准，这是关系到系统生命周期长短的重要问题。只有开放的系统才能满足可互操作性、可移植性以及可伸缩性的要求，才可能与另一个标准兼容的系统实现“无缝”的互操作，应用程序才可能由一种系统移植到另一种系统，不断地为系统的扩展、升级创造条件。\n （ 2 ） 结构化。复杂系统设计的最基本方法依然是结构化系统分析设计方法。把一个复杂系统分解成相对独立和简单的子系统，每一个子系统又分解成更简单的模块，这样自顶向下逐层模块化分解，直到底层每一个模块都是可具体说明和可执行的为止。\n （ 3 ） 先进性。先进性有两层意义: 目前先进性和未来先进性。系统的先进性是建立在技术先进性之上的，只有先进的技术才有较强的发展生命力，系统采用先进的技术才能确保系统的优势和较长的生存周期。系统的先进性还表现在系统设计的先进性: 先进技术的有机集成、问题的合理划分，以及应用软件符合人们认知特点等。系统设计的先进性贯穿在系统开发的整个生命周期，乃至整个系统生存周期的各个环节，一定要认真对待。\n （ 4 ） 主流化。系统构成的每一个产品应属于该产品发展的主流，有可靠的技术支持，有成熟的使用环境，并具有良好的升级发展势头。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_72",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "41、（     ）主要任务是调度和管理网络资源，并为网络用户提供统一、透明使用网络资源的手段。",
    "options": [
      "网络操作系统",
 "服务子系统",
 "服务器子系统",
 "网管子系统"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查网络操作系统等名词定义，必须会。\nP164-P165。网络操作系统的主要任务是调度和管理网络资源，并为网络用户提供统一、透明使用网络资源的手段。网络资源主要包括网络服务器、工作站、打印机、网桥、路由器、交换机、网关、共享软件和应用软件等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_73",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "42、下列关于数据集成的说法中，错误的是（     ）。",
    "options": [
      "数据集成可以分为基本数据集成、多级视图集成、模式集成和多粒度数据集成四个层次。",
 "多级视图机制有助于对数据源之间的关系进行集成: 底层数据表示方式为局部模型的局部格式，高级数据表示为综合模型格式。",
 "多粒度数据集成是异构数据集成中最难处理的问题, 理想的多粒度数据集成模式是自动逐步抽象。",
 "数据集成处理的主要对象是系统中各种异构数据库中的数据。数据库技术是数据集成的关键。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查数据集成处理的相关内容，必须会。\nP165。数据集成处理的主要对象是系统中各种异构数据库中的数据。数据仓库技术是数据",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_74",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "43、下列关于软件集成的说法中，错误的是（     ）。",
    "options": [
      "CORBA是OMG进行标准化分布式对象计算的基础。",
 "COM对象可能由各种编程语言实现，并为各种编程语言所引用。COM对象作为某个应用程序的构成单元，不但可以作为该应用程序中的其他部分，而且还可以单独地为其他应用程序系统提供服务。",
 "DCOM作为COM的扩展，不仅继承了COM优点，而且针对分布环境还提供了一些新的特性，如位置透明性、网络安全性、跨平台调用。COM+为COM的新发展或COM更高层次上的应用。",
 "J2EE的体系结构可以分为客户端层、服务器端组件层、EJB层3层。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查软件集成的相关内容，必须会。\nP168-P169。J2EE 的体系结构可以分为客户端层、服务器端组件层、EJB 层和信息系统层。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_75",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "44、下列关于应用集成的说法中，错误的是（     ）。",
    "options": [
      "用语言做比喻，语法、语义、语用三者对应到系统集成技术上，网络集成解决语法的问题，数据集成解决语义的问题，应用集成解决语用的问题。",
 "对应用集成的技术要求大致有: 具有应用间的互操作性、 具有分布式环境中应用的可移植性、具有系统中应用分布的透明性",
 "如果一个子系统（构件或部分） 可以从一个环境移植到另一个环境，称它是互操作的。",
 "应用集成既可以部署在云端，集成SaaS CRM等云应用，也可以部署在受防火墙保护的本地，集成传统ERP系统等,还可以部署在混合环境中, 集成本地应用和托管在专用服务器上的云应用。"
    ],
    "correctAnswer": 2,
    "explanation": "本题考查应用集成的相关内容，必须会。\nP169-P170。如果一个开放系统提供在系统各构件之间交换信息的机制， 也称该系统支持互操作性。如果一个子系统 构件或部分） 可以从一个环境移植到另一个环境，称它是可移植的。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_76",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "45、在信息安全空间中，说法错误的是 （     ）。",
    "options": [
      "X轴是“安全机制”",
 "Y轴是“OSI网络参考模型”",
 "2Z轴是“安全服务”",
 "由X、Y、2Z三个轴形成的信息安全系统三维空间就是信息系统的“安全空间\"。具有认证、权限、完整、加密和可审计五大要素，也叫作“安全空间”的五大属性。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查信息安全空间的相关内容，必须会。\nP172。由 X、Y、Z 三个轴形成的信息安全系统三维空间就是信息系统的“安全空间”。具有认证、权限、完整、加密和不可否认五大要素，也叫作“安全空间”的五大属性。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_77",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "46、（     ）主要包括操作系统漏洞检测与修复、网络基础设施漏洞检测与修复、通用基础应用程序漏洞检测与修复、网络安全产品部署等。",
    "options": [
      "基础设施实体安全",
 "平台安全",
 "数据安全",
 "通信安全"
    ],
    "correctAnswer": 1,
    "explanation": "本题考查平台安全的相关内容，必须会。\nP172。平台安全主要包括操作系统漏洞检测与修复、网络基础设施漏洞检测与修复、通用基础应用程序漏洞检测与修复、网络安全产品部署等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_78",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "47、（     ）用于确保数据发自真正的源点，防止假冒。",
    "options": [
      "对等实体认证服务",
 "数据保密服务",
 "数据完整性服务",
 "数据源点认证服务"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查安全服务的相关内容，必须会。\nP173-P174。安全服务包括对等实体认证服务、数据保密服务、数据完整性服务、数据源点认证服务、禁止否认服务和犯罪证据提供服务等。\n （ 1 ） 对等实体认证服务。对等实体认证服务用于两个开放系统同等层中的实体建立链接或数据传输时，对对方实体的合法性、真实性进行确认，以防假冒。\n （ 2 ） 数据保密服务。数据保密服务包括多种保密服务，为了防止网络中各系统之间的数据被截获或被非法存取而泄密，提供密码加密保护。\n （ 3 ） 数据完整性服务。数据完整性服务用以防止非法实体对交换数据的修改、插入、删除以及在数据交换过程中的数据丢失。\n （ 4 ） 数据源点认证服务。数据源点认证服务用于确保数据发自真正的源点，防止假冒。\n （ 5 ） 禁止否认服务。禁止否认服务用以防止发送方在发送数据后否认自己发送过此数据，接收方在收到数据后否认自己收到过此数据或伪造接收数据。\n （ 6 ） 犯罪证据提供服务。指为违反国内外法律法规的行为或活动， 提供各类数字证据、信息线索等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_79",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "48、以下说法中，错误的是（     ）。",
    "options": [
      "信息安全系统工程能力成熟度模型ISSE-CMM） 主要适用于工程组织、获取组织和评估组织。",
 "ISSE将信息安全系统工程实施过程分解为: 工程过程、风险过程和保证过程三部分。",
 "规范化执行属于第2级: 规划和跟踪级的特征",
 "建立可测度的质量目标属于第5级: 持续改进级的特性。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查信息安全的相关内容，尽力会。\nP179-P180。<img src=\"images/ch11_79_isse.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_80",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "49、信息安全 （     ）包含系统集成商、应用开发商、产品提供商和服务提供商等，这些组织可以使用ISSE-CMM对工程能力进行自我评估。",
    "options": [
      "工程组织",
 "获取组织",
 "评估组织",
 "实施组织"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查信息安全的相关内容，尽力会。\nP175，信息安全工程组织包含系统集成商、应用开发商、产品提供商和服务提供商等，这些组织可以使用 1SSE-CMM 对工程能力进行自我评估。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_81",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "50、以下说法中，错误的是 （     ）。",
    "options": [
      "需求过程主要包括需求获取、需求分析、需求规格说明书编制、需求验证与确认等。",
 "需求获取是一个确定和理解不同的项目干系人的需求和约束的过程。",
 "需求分析对已经获取到的需求进行提炼、分析和审查，以确保所有的项目干系人都明白其含义并找出其中的错误、遗漏或其他不足的地方。",
 "需求测试就是对SRS进行技术评审。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查需求的相关内容，必须会。\nP133，在实际工作中，一般通过需求评审和需求测试工作来对需求进行验证。需求评审就是对 SRS 进行技术评审。只有在业务需求基本明确,用户需求部分确定时，同步进行需求测试，才可能及早发现问题，从而在需求开发阶段以较低的代价解决这些问题。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_82",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "51、（     ）表示类之间的整体与部分的关系。“部分”只能属于一个“整体”,“部分”与“整体”的生命周期相同。",
    "options": [
      "组合聚集",
 "共享聚集",
 "实现",
 "泛化"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查类的关系的相关内容，必须会。\nP138，如图。<img src=\"images/ch11_82_composition.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_83",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "52、以下关于软件设计的相关内容，说法中，错误的是（     ）。",
    "options": [
      "结构化设计（SD）是一种面向数据流的方法, 它以SRS和SA阶段所产生的DFD和数据字典等文档为基础，是一个自顶向下、逐步求精和模块化的过程。",
 "在SD中，需要遵循一个基本的原则: 高内聚，低耦合。",
 "紧密耦合表示模块之间联系非常强，松散耦合表示模块之间联系比较弱，非耦合则表示模块之间无任何联系，是完全独立的。",
 "李氏替换原则: 扩展开放，对修改封闭。"
    ],
    "correctAnswer": 3,
    "explanation": "本题考查软件设计的相关内容，必须会。\nP139，开闭原则: 对扩展开放，对修改封阁。李氏替换原则: 子类可以替换父类。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_84",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "53、数据的完整性和保密性是通过给予用户权限来实现的，用户只能访问拥有的权限所对应级别的数据，属于（     ）技术。",
    "options": [
      "多级保护",
 "限界",
 "机密数据管理",
 "标识和认证"
    ],
    "correctAnswer": 0,
    "explanation": "本题考查数据库安全策略的相关内容，尽力会。\nP162，如下所示。<img src=\"images/ch11_84_multilevel.png\" style=\"max-width: 100%; margin-top: 10px;\">",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_85",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "54、2017 年11月第27题（此题常规重点考题，建议举一反三）\n （ 27 ） 又称为设计视图，它表示了设计模型中在架构方面具有重要意义的部分，即类、子系统、包和用例实现的子集。",
    "options": [
      "逻辑视图",
 "进程视图",
 "实现视图",
 "用例视图"
    ],
    "correctAnswer": 0,
    "explanation": "考查的是 UML 的相关知识, 尽力掌握。\n这个题目就是定义题。\n逻辑视图又称为设计视图，它表示了设计模型中在架构方面具有重要意义的部分，即类、子系统、包和用例实现的子集。其余4个视图，大家也可以学习下。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_86",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "55、2018 年5月第7题\n老于是某银行的系统架构师，他为银行投资管理系统设计的软件架构包括进程通信和事件\n驱动的系统，该软件架构风格属于 （ 7 ） 。",
    "options": [
      "数据流风格",
 "独立构件风格",
 "仓库风格",
 "虚拟机风格"
    ],
    "correctAnswer": 1,
    "explanation": "考查的是软件构件的相关知识，必须掌握。\n将软件架构风格分为5 大类:\n （ 1 ） 数据流风格: 包括批处理序列架构风格和管道/过滤器架构风格。\n （ 2 ） 调用/返回风格: 包括主程序/子程序架构风格、数据抽象和面向对象架构风格及层次结构架构风格。\n （ 3 ） 独立构件风格: 包括进程通信架构风格和事件驱动架构风格。\n （ 4 ） 虚拟机风格: 包括解释器架构风格和基于规则的系统架构风格。\n （ 5 ） 仓库风格: 包括数据库架构风格和黑板架构风格。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_87",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "56、2018 年5月第9题 （此题常规重点考题，建议举一反三）\n软件测试是发现软件错误 （缺陷） 的主要手段,软件测试方法可以分为静态测试和动态测试，其中 （ 9 ） 属于静态测试。",
    "options": [
      "代码走查",
 "功能测试",
 "黑盒测试",
 "白盒测试"
    ],
    "correctAnswer": 0,
    "explanation": "考查的是测试的相关知识，必须掌握\n静态测试包括对文档的静态测试和对代码的静态测试。对文档的静态测试主要以检查单的形式进行，而对代码的静态测试一般采用桌前检查、代码走查和代码审查。\n黑金测试（ 功能测试 ）、和白金测试属于动态测试内容。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_88",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "57、2018 年11月第7题 （此题常规重点考题，建议举一反三）\n软件需求是多层次的，包括业务需求、用户需求、系统需求，其中业务需求 （ 7 ） 。",
    "options": [
      "反应了企业或客户对系统高层次的目标需求",
 "描述了用户具体目标或者用户要求系统必须完成的任务",
 "从系统角度来说明软件的需求，包括功能需求、非功能需求和设计约束",
 "描述了用户任务系统应该具备的功能和性能"
    ],
    "correctAnswer": 0,
    "explanation": "考查需求的层次相关知识，必须掌握。\n业务需求是指反映企业或客户对系统高层次的目标要求，通常来自项目投资人、购买产品的客户、客户单位的管理人员、市场营销部门或产品策划部门等。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_89",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "58、2018 年11月第8题\n关于设计模式的描述，不正确的是 （ 8 ） 。",
    "options": [
      "设计模式包括模式名称、问题、目的、解决方案、效果、实例代码和相关设计模式等基本要素",
 "根据处理范围不同，设计模式分为类模式和对象模式",
 "根据目的和用途不同，设计模式分为创建型模式、结构型模式和行为型模式",
 "对象模式处理对象之间的关系，这些关系通过继承建立，在编译的时刻就被确定下来，属于静态关系"
    ],
    "correctAnswer": 3,
    "explanation": "考查的是设计模式相关的概念，尽力掌握。\n设计模式是前人的经验总结，它使人们可以方便地复用成功的软件设计。\n类模式处理类和子类之间的关系，这些关系通过继承建立，在编译时刻被确定下来，属于静态关系; 对象模式处理对象之间的关系，这些关系在运行时刻变化，更具动态性。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_90",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "59、2018 年11月第27题（此题常规重点考题，建议举一反三）\nUML 的 （ 27 ） 描述了一个特定对象的所有可能状态以及由于各种事件的发生而引起的状态之间的转移。",
    "options": [
      "控制图",
 "状态图",
 "协作图",
 "序列图"
    ],
    "correctAnswer": 1,
    "explanation": "考查 UML，尽力掌握。\n状态图描述一个状态机，它由状态、转移、事件和活动组成。状态图给出了对象的动态视图。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_91",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "60、2019 年5月第7题 （此题常规重点考题，建议举一反三）\n软件架构中 （ 7 ） 模式包括主程序/子程序、数据抽象和面向对象，以及层次结构。",
    "options": [
      "数据流",
 "调用/返回",
 "虚拟机",
 "独立构件"
    ],
    "correctAnswer": 1,
    "explanation": "考查的是软件架构模式的相关知识，必须掌握。\nGarlan 和 Shaw 将软件架构风格分为5大类:\n （ 1 ） 数据流风格: 包括批处理序列架构风格和管道/过滤器架构风格。\n （ 2 ） 调用/返回风格: 包括主程序/子程序架构风格、数据抽象和面向对象架构风格及层次结构架构风格。\n （ 3 ） 独立构件风格: 包括进程通信架构风格和事件驱动架构风格。\n （ 4 ） 虚拟机风格: 包括解释器架构风格和基于规则的系统架构风格。\n （ 5 ） 仓库风格: 包括数据库架构风格和黑板架构风格。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_92",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "61、2019 年11月第7题",
    "options": [
      "数据流图、状态转换图",
 "状态转换图、E-R 图",
 "状态转换图、数据流图",
 "E-R 图、状态转换图"
    ],
    "correctAnswer": 0,
    "explanation": "考查的是需求分析的相关知识。必须掌握。\n需求分析在实际工作中，一般使用实体联系图 （ E-R 图） 表示数据模型，用数据流图表示功能模型，用状态转换图表示行为模型。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_93",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "62、2020 年11月第8题 （此题常规重点考题，建议举一反三）\n软件工程需求分析阶段，使用实体联系图表示 （ 8 ） 模型。",
    "options": [
      "行为",
 "数据",
 "功能",
 "状态"
    ],
    "correctAnswer": 1,
    "explanation": "考查的是实体联系图的相关知识。必须掌握。\n在实际工作中，一般使用实体联系图 （E-R 图） 表示数据模型，用数据流图 （DFD） 表示功能模型，用状态转换图 （STD） 表示行为模型。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_94",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "63、2021 年5月第9题\n质量功能部署 （QFD） 将软件需求分为常规需求、 （ 9 ） 和意外需求。",
    "options": [
      "期望需求",
 "业务需求",
 "系统需求",
 "行为需求"
    ],
    "correctAnswer": 0,
    "explanation": "考查的是软件需求的相关知识。必须掌握。\n质量功能部署是一种可以将用户需求转化为软件需求的技术，它将需求分为三类: 常规需求、期望需求和意外需求。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  },
  {
    "id": "ch11_95",
    "chapterId": "ch11",
    "type": "single",
    "difficulty": "medium",
    "content": "64、2022 年5月第9题\n使用结构化分析 （SA）方法进行需求分析，围绕数据字典建立三个层次的的模型不包括 （ 9 ） ",
    "options": [
      "实体关系图",
 "业务流程图",
 "数据流图",
 "状态转换图"
    ],
    "correctAnswer": 1,
    "explanation": "考查的是需求分析的相关知识。必须掌握。\n结构化开发方法（ SA） 方法进行需求分析，其建立的模型的核心是数据字典，有三个层次的模型，分别是数据模型、功能模型和行为模型也称为状态模型） 。",
    "tags": [
      "ch11"
    ],
    "userAnswer": null,
    "isCorrect": null,
    "isFavorite": false,
    "attemptCount": 0,
    "lastAttemptDate": null
  }
];

if (typeof examData !== 'undefined') {
  examData.questions = examData.questions.filter(q => q.chapterId !== 'ch11');
  examData.questions.push(...ch11Questions);
}
