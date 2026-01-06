import {
  Project,
  BlogPost,
  Skill,
  StudyExperience,
  CompeteExperience,
  HonorExperience,
  PreWorkExperience,
  WorkExperience,
  ProjectExperience,
} from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Aura 智能分析平台',
    description: '一个功能齐全的企业级分析平台，利用机器学习预测消费者行为，提供实时数据可视化和决策支持。',
    tags: ['React', 'Python', 'FastAPI', 'PyTorch', 'PostgreSQL', 'Docker'],
    imageUrl: 'https://picsum.photos/seed/aura/800/600',
    github: 'https://github.com/nova/aura-analytics',
    link: 'https://aura-demo.example.com',
  },
  {
    id: '2',
    title: 'CryptoTrack Pro 加密货币追踪',
    description: '实时加密货币投资组合管理器，具有高级图表、价格预警和跨交易所自动交易功能。',
    tags: ['Next.js', 'TypeScript', 'D3.js', 'Tailwind', 'WebSocket', 'Node.js'],
    imageUrl: 'https://picsum.photos/seed/crypto/800/600',
    link: 'https://cryptotrack.example.com',
    github: 'https://github.com/nova/cryptotrack-pro',
  },
  {
    id: '3',
    title: 'EcoSphere 物联网框架',
    description: '一个用于监控家庭自动化中可持续能源使用的开源物联网框架，支持实时数据采集和智能控制。',
    tags: ['Node.js', 'C++', 'React Native', 'MQTT', 'InfluxDB', 'Grafana'],
    imageUrl: 'https://picsum.photos/seed/eco/800/600',
    github: 'https://github.com/nova/ecosphere-iot',
  },
  {
    id: '4',
    title: 'MediCare AI 医疗助手',
    description: '基于深度学习的医疗影像分析系统，辅助医生进行早期疾病检测和诊断决策。',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Medical Imaging', 'OpenCV'],
    imageUrl: 'https://picsum.photos/seed/medical/800/600',
    link: 'https://medicare-ai.example.com',
    github: 'https://github.com/nova/medicare-ai',
  },
  {
    id: '5',
    title: 'EduFlow 在线学习平台',
    description: '全栈在线教育平台，支持视频课程、实时互动、自动评分和个性化学习路径推荐。',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'WebRTC', 'Redis', 'AWS'],
    imageUrl: 'https://picsum.photos/seed/eduflow/800/600',
    link: 'https://eduflow.example.com',
    github: 'https://github.com/nova/eduflow-platform',
  },
  {
    id: '6',
    title: 'SmartCity 智慧城市仪表盘',
    description: '为城市管理者提供的实时数据仪表盘，整合交通、环境、能源等多维度城市运行数据。',
    tags: ['React', 'TypeScript', 'Mapbox', 'WebGL', 'Kafka', 'Elasticsearch'],
    imageUrl: 'https://picsum.photos/seed/smartcity/800/600',
    link: 'https://smartcity-demo.example.com',
    github: 'https://github.com/nova/smartcity-dashboard',
  },
];

export const STUDY_EXPERIENCE: StudyExperience[] = [
  {
    id: 'e1',
    company: '武汉理工大学 计算机科学与人工智能学院',
    role: '计算机科学与技术学士',
    period: '2020 - 2024',
    description: ['主修计算机科学与技术，GPA 3.85/5.00，前15%。', '毕业论文：《分布式版本控制系统的设计与实现》。'],
  },
];

export const COMPETE_EXPERIENCE: CompeteExperience[] = [
  {
    id: 'e1',
    role: '在校竞赛经历',
    description: [
      { name: '参加校数学竞赛，获得三等奖', period: '2020 - 2021' },
      { name: '参加了第十三届全国大学生数学竞赛，获得初赛一等奖', period: '2021 - 2022' },
      { name: '参加了校数学建模选拔赛，获得校二等奖', period: '2022 - 2022' },
    ],
  },
  {
    id: 'e2',
    role: '社会竞赛经历',
    description: [{ name: 'leetcode周赛 前1000', period: '2026 - 2026' }],
  },
];

export const HONOR_EXPERIENCE: HonorExperience[] = [
  {
    id: 'e1',
    name: '武汉理工大学校学习标兵',
    period: '2021 - 2021',
  },
  {
    id: 'e2',
    name: '武汉理工大学校优秀共青团员代表',
    period: '2022 - 2022',
  },
];

export const PREWORK_EXPERIENCE: PreWorkExperience[] = [
  {
    id: 'e1',
    company: '',
    role: '华为校园大使',
    period: '2023 - 2024',
    description: ['参与华为校园活动的运营'],
  },
  {
    id: 'e2',
    company: '武汉金山办公软件有限公司',
    role: 'C++实习生',
    period: '2023.7 - 2023.9',
    description: [
      '用C++完成线程池的实现，并完成访问阻塞队列资源互斥的问题',
      '将金山待办网页版，实现为金山待办客户端版本',
      '用com组件方式，将com组件注册到注册表中，完成可执行函数器',
      '通过调用 windows api 实现对 windows 系统下对 文件及文件夹创建、重命名、删除等操作的监控',
    ],
  },
  {
    id: 'e3',
    company: '广州溢信科技有限公司',
    role: 'java实习生',
    period: '2023.10 - 2024.6',
    description: [
      '主要参与了 dsmp 文档管理平台的开发工作，文档管理平台主要是用来为内网用户做文件交换，进行安全域隔离',
      '用户管理和角色管理模块',
      '系统监控：监控 windows 和 linux 系统下的一些性能参数',
      '邮箱配置：配置邮箱服务器，分发邮件',
      '对接授权系统',
      '初次部署和再次启动，系统初始化，系统升级',
    ],
  },
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: 'e1',
    company: '苏州山石网科科技有限公司',
    role: 'UI开发',
    period: '2024.7 - 2025.12',
    description: [
      '维护负责的模块以及新的FR的开发',
      'portal页面的开发，维护和重构',
      '快速迭代portal的开发',
      'playwright 自动化测试工具调研',
    ],
  },
];

export const PROJECT_EXPERIENCE: ProjectExperience[] = [
  {
    id: '1',
    name: 'Aura 智能分析平台',
    description: [
      '设计并实现了一个企业级数据分析平台，集成机器学习模型预测消费者行为，准确率提升 30%。',
      '开发了实时数据可视化仪表盘，支持多维度数据钻取，帮助业务团队快速做出决策。',
      '构建了微服务架构，使用 FastAPI 和 PostgreSQL 处理高并发请求，系统日均处理 100 万+ 事件。',
      '实现了自动化报表生成和预警系统，减少人工分析时间 70%。',
    ],
    technologies: ['React', 'Python', 'FastAPI', 'PyTorch', 'PostgreSQL', 'Docker', 'Kubernetes'],
  },
  {
    id: '2',
    name: 'CryptoTrack Pro 加密货币追踪',
    description: [
      '开发了全栈加密货币投资组合管理应用，支持实时价格追踪、跨交易所资产同步。',
      '实现了基于 WebSocket 的实时价格推送，延迟低于 100ms，提供高级图表分析工具。',
      '集成自动化交易策略引擎，支持用户自定义条件触发买卖操作，回测收益率达 25%。',
      '设计了响应式 UI 并优化前端性能，首屏加载时间减少 40%。',
    ],
    technologies: ['Next.js', 'TypeScript', 'D3.js', 'Tailwind', 'WebSocket', 'Node.js', 'Redis'],
  },
];
export const SKILLS: Skill[] = [
  {
    category: '资格证',
    items: ['CET-4', 'CET-6', '中级软件工程师资格证'],
  },
  {
    category: '前端开发',
    items: ['React', 'Vue', 'Next.js', 'Ext.js'],
  },
  {
    category: '后端开发',
    items: ['Python', 'Java', 'Spring', 'Spring Boot', 'PHP', 'C++', 'C'],
  },
  {
    category: 'AI / 机器学习',
    items: [
      'TensorFlow',
      'PyTorch',
      'OpenCV',
      'Scikit-learn',
      'LangChain',
      'Gemini API',
      'OpenAI API',
      '计算机视觉',
      '自然语言处理',
    ],
  },
  {
    category: 'DevOps & 云平台',
    items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'CI/CD', 'Git', 'GitHub Actions', 'Terraform', 'Nginx', 'Linux'],
  },
  {
    category: '设计 & 工具',
    items: ['Figma', 'Adobe XD', 'Webpack', 'Vite', 'ESLint', 'Prettier', 'Jira', 'Confluence', '敏捷开发', 'Scrum'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'AI 在 Web 开发中的未来：从 Copilot 到自主编码代理',
    excerpt: '生成式 AI 正在如何改变我们编写代码和设计用户界面的方式，探讨未来开发工作流的演变。',
    content:
      '人工智能已不再仅仅是一个科幻概念，它正在深刻地改变着 Web 开发的图景。从自动补全代码的 GitHub Copilot 到能够生成复杂界面的 LLM 模型，AI 正在成为开发者的得力助手。本文将探讨 AI 在代码生成、UI 设计、测试和部署等方面的应用，并展望未来自主编码代理的可能性。',
    date: '2024年3月15日',
    author: 'Nova',
    tags: ['AI', '技术趋势', 'Web 开发', '未来展望'],
    coverImage: 'https://picsum.photos/seed/future/1200/600',
  },
  {
    id: 'b2',
    title: '掌握 TypeScript：高手进阶技巧与最佳实践',
    excerpt: '每个 TypeScript 开发者都应该知道的高级模式和工具类型，提升代码类型安全性和开发效率。',
    content:
      'TypeScript 已成为大规模 Web 应用的行业标准。在这篇文章中，我们将探讨映射类型、条件类型和模板字面量类型等高级概念，以及如何利用泛型约束和类型守卫编写更健壮的代码。同时分享一些在实际项目中的最佳实践和常见陷阱。',
    date: '2024年2月28日',
    author: 'Nova',
    tags: ['TypeScript', '编程技巧', '最佳实践', '前端开发'],
    coverImage: 'https://picsum.photos/seed/ts/1200/600',
  },
  {
    id: 'b3',
    title: '微服务架构实战：从单体到分布式的演进之路',
    excerpt: '分享我们在高流量电商平台中将单体应用拆分为微服务架构的经验教训和技术选型。',
    content:
      '随着业务规模的扩大，传统的单体架构逐渐暴露出扩展性、可维护性和部署灵活性的问题。本文将详细介绍我们如何将一个日均处理数百万请求的电商平台从单体架构逐步迁移到微服务架构，包括服务拆分策略、通信机制、数据一致性和监控体系的构建。',
    date: '2024年1月20日',
    author: 'Nova',
    tags: ['微服务', '架构设计', '分布式系统', '后端开发'],
    coverImage: 'https://picsum.photos/seed/microservices/1200/600',
  },
  {
    id: 'b4',
    title: 'React 性能优化完全指南：从理论到实践',
    excerpt: '深入探讨 React 应用性能优化的各种技术，包括渲染优化、内存管理和代码分割等。',
    content:
      'React 应用的性能问题往往在项目规模扩大后逐渐显现。本文将系统性地介绍 React 性能优化的各个方面：使用 React.memo 和 useMemo 避免不必要的重新渲染、实现虚拟列表处理大数据集、通过代码分割和懒加载减少初始包大小、使用性能分析工具定位瓶颈等。',
    date: '2023年12月10日',
    author: 'Nova',
    tags: ['React', '性能优化', '前端工程', '最佳实践'],
    coverImage: 'https://picsum.photos/seed/react-performance/1200/600',
  },
  {
    id: 'b5',
    title: '现代 CSS 布局：Grid 与 Flexbox 的深度应用',
    excerpt: '探索 CSS Grid 和 Flexbox 在现代 Web 布局中的高级用法和实际案例。',
    content:
      'CSS Grid 和 Flexbox 彻底改变了 Web 布局的方式。本文将深入探讨这两种布局系统的核心概念、适用场景和高级技巧，包括响应式设计、复杂网格布局、对齐控制和嵌套布局等。通过实际案例展示如何构建现代化、自适应且优雅的界面布局。',
    date: '2023年11月5日',
    author: 'Nova',
    tags: ['CSS', '布局', '响应式设计', '前端开发'],
    coverImage: 'https://picsum.photos/seed/css-layout/1200/600',
  },
  {
    id: 'b6',
    title: '容器化与 Kubernetes：云原生应用的部署实践',
    excerpt: '从 Docker 基础到 Kubernetes 集群管理，分享我们在生产环境中的容器化部署经验。',
    content:
      '容器化和 Kubernetes 已成为现代云原生应用的标准部署方式。本文将介绍如何将应用容器化、构建高效的 Docker 镜像、配置 Kubernetes 部署和服务，以及实现自动扩缩容、滚动更新和健康检查。同时分享我们在生产环境中遇到的挑战和解决方案。',
    date: '2023年10月18日',
    author: 'Nova',
    tags: ['Docker', 'Kubernetes', 'DevOps', '云原生'],
    coverImage: 'https://picsum.photos/seed/kubernetes/1200/600',
  },
  {
    id: 'b7',
    title: 'GraphQL 与 REST API：如何选择适合的 API 设计',
    excerpt: '对比 GraphQL 和 REST API 的优缺点，探讨在不同场景下的最佳选择和实践建议。',
    content:
      '在构建现代 Web 应用时，API 设计是至关重要的决策。GraphQL 和 REST 是两种主流的 API 设计风格，各有其优势和适用场景。本文将深入比较两者的差异，包括数据获取效率、类型系统、缓存机制和开发体验，并提供实际项目中的选择指南。',
    date: '2023年9月12日',
    author: 'Nova',
    tags: ['GraphQL', 'REST API', '后端开发', 'API 设计'],
    coverImage: 'https://picsum.photos/seed/graphql/1200/600',
  },
  {
    id: 'b8',
    title: '前端测试策略：从单元测试到 E2E 测试的全方位指南',
    excerpt: '构建可靠的前端应用需要全面的测试策略，本文分享我们在大型项目中的测试实践。',
    content:
      '前端测试是保证应用质量的关键环节。本文将系统介绍前端测试的各个层次：单元测试（Jest）、组件测试（React Testing Library）、集成测试和端到端测试（Cypress）。分享如何制定测试策略、编写可维护的测试代码，以及将测试集成到 CI/CD 流程中。',
    date: '2023年8月25日',
    author: 'Nova',
    tags: ['测试', '前端工程', 'Jest', 'Cypress', '质量保证'],
    coverImage: 'https://picsum.photos/seed/testing/1200/600',
  },
  {
    id: 'b9',
    title: 'Serverless 架构实战：无服务器计算的机遇与挑战',
    excerpt: '探索 Serverless 架构在现代应用开发中的应用，分享我们在 AWS Lambda 和 Vercel 上的实践经验。',
    content:
      'Serverless 架构正在改变我们构建和部署应用的方式。本文将介绍 Serverless 的核心概念、优势（如自动扩缩容、按需付费）和挑战（如冷启动、调试困难）。通过实际案例展示如何使用 AWS Lambda、API Gateway 和 Vercel 构建无服务器应用，并分享性能优化技巧。',
    date: '2023年7月18日',
    author: 'Nova',
    tags: ['Serverless', 'AWS Lambda', '云原生', '后端架构'],
    coverImage: 'https://picsum.photos/seed/serverless/1200/600',
  },
  {
    id: 'b10',
    title: 'Web 可访问性（A11Y）最佳实践：构建包容性数字体验',
    excerpt: 'Web 可访问性不仅是法律要求，更是构建优秀产品的关键。本文分享实现 A11Y 的实用技巧。',
    content:
      'Web 可访问性（Accessibility，简称 A11Y）确保所有用户，包括残障人士，都能平等地访问和使用网站。本文将介绍 WCAG 标准、ARIA 属性、键盘导航、屏幕阅读器兼容性等核心概念，并提供具体的代码示例和测试工具，帮助开发者构建更具包容性的 Web 应用。',
    date: '2023年6月10日',
    author: 'Nova',
    tags: ['可访问性', 'A11Y', '前端开发', '用户体验', 'WCAG'],
    coverImage: 'https://picsum.photos/seed/a11y/1200/600',
  },
];
