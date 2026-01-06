import React from 'react';
import { api } from '../../services/apiService';

const ResumeContent = async () => {
  try {
    const data = await api.resume.getData();
    const {
      studyExperience,
      competeExperience,
      honorExperience,
      preWorkExperience,
      workExperience,
      projectExperience,
      skills,
    } = data;

    return (
      <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 个人简介区域 */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* 个人照片 */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-blue-500/20">
                  <img
                    src="/self-photo.jpg"
                    alt="陈泽宇个人照片"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 个人信息 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">陈泽宇</h1>
              <div className="text-xl md:text-2xl font-bold text-gradient mb-4">软件开发工程师</div>

              {/* 联系信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">邮箱</div>
                    <div className="font-semibold">zeyuchen374@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">电话</div>
                    <div className="font-semibold">+86 18360791938</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">地址</div>
                    <div className="font-semibold">中国 · 苏州 </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">状态</div>
                    <div className="font-semibold">寻求开发工程师职位</div>
                  </div>
                </div>
              </div>

              {/* 社交链接 */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href="#"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold flex items-center gap-2 transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="#"
                  className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold flex items-center gap-2 transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-semibold flex items-center gap-2 transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 教育经历 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-slate-900">
            <span className="w-10 h-1.5 bg-blue-600 rounded-full"></span>
            教育经历
          </h2>
          <div className="space-y-12">
            {studyExperience.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l-2 border-slate-200 group">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-blue-600 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 mt-2 md:mt-0 px-3 py-1 bg-slate-100 rounded-full uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-slate-600 flex items-start gap-3 text-sm md:text-base">
                      <span className="text-blue-500 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 竞赛经历 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-slate-900">
            <span className="w-10 h-1.5 bg-blue-600 rounded-full"></span>
            竞赛经历
          </h2>
          <div className="space-y-12">
            {competeExperience.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l-2 border-slate-200 group">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-blue-600 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-slate-600 flex items-start justify-between gap-3 text-sm md:text-base">
                      <div className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">•</span> {/* 建议加个圆点或符号 */}
                        <span>{item.name}</span>
                      </div>

                      {/* 这里的 whitespace-nowrap 保证日期不会折行 */}
                      <span className="text-xs font-bold text-slate-500 shrink-0 px-3 py-1 bg-slate-100 rounded-full uppercase tracking-wider whitespace-nowrap">
                        {item.period}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 获奖经历 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-slate-900">
            <span className="w-10 h-1.5 bg-blue-600 rounded-full"></span>
            荣誉奖项
          </h2>
          <div className="space-y-12">
            <ul className="space-y-3">
              {honorExperience.map((exe) => (
                <li key={exe.id} className="text-slate-600 flex items-start justify-between gap-3 text-sm md:text-base">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">•</span> {/* 建议加个圆点或符号 */}
                    <span>{exe.name}</span>
                  </div>

                  {/* 这里的 whitespace-nowrap 保证日期不会折行 */}
                  <span className="text-xs font-bold text-slate-500 shrink-0 px-3 py-1 bg-slate-100 rounded-full uppercase tracking-wider whitespace-nowrap">
                    {exe.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 实习经历 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-slate-900">
            <span className="w-10 h-1.5 bg-blue-600 rounded-full"></span>
            实习经历
          </h2>
          <div className="space-y-12">
            {preWorkExperience.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l-2 border-slate-200 group">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-blue-600 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 mt-2 md:mt-0 px-3 py-1 bg-slate-100 rounded-full uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-slate-600 flex items-start gap-3 text-sm md:text-base">
                      <span className="text-blue-500 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* 工作经历 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-slate-900">
            <span className="w-10 h-1.5 bg-blue-600 rounded-full"></span>
            工作经历
          </h2>
          <div className="space-y-12">
            {workExperience.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l-2 border-slate-200 group">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-blue-600 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 mt-2 md:mt-0 px-3 py-1 bg-slate-100 rounded-full uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-slate-600 flex items-start gap-3 text-sm md:text-base">
                      <span className="text-blue-500 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 项目经历 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-slate-900">
            <span className="w-10 h-1.5 bg-blue-600 rounded-full"></span>
            项目经历
          </h2>
          <div className="space-y-12">
            {projectExperience.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l-2 border-slate-200 group">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-blue-600 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.name}</h3>
                  </div>
                </div>
                <ul className="space-y-3 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-slate-600 flex items-start gap-3 text-sm md:text-base">
                      <span className="text-blue-500 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {/* 技术栈标签 */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 技能 & 技术 */}
        <div>
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-slate-900">
            <span className="w-10 h-1.5 bg-purple-600 rounded-full"></span>
            技能 & 技术
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="glass-card !bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-200/50"
              >
                <h3 className="text-lg font-bold mb-4 text-purple-700">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch resume data:', error);
    return (
      <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">加载失败</h2>
          <p className="text-slate-600 mb-8">加载简历数据失败，请稍后重试。</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }
};

export default ResumeContent;
