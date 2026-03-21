import { Seo } from "@/components/common/Seo";
import { aboutProfile } from "@/data/about";
import { SectionTitle } from "@/components/common/SectionTitle";
import { withBase } from "@/lib/site";

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <Seo title="关于我" />
      <SectionTitle
        eyebrow="About me"
        title="关于这个作者"
        description="用一个轻量、真实、适合个人品牌展示的页面来承接博客内容之外的信息。"
      />
      <section className="grid gap-8 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[280px_minmax(0,1fr)] md:p-12">
        <div className="space-y-5">
          <img
            src={withBase(aboutProfile.avatar)}
            alt={aboutProfile.name}
            className="h-56 w-56 rounded-[2rem] object-cover shadow-soft"
          />
          <div>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{aboutProfile.name}</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{aboutProfile.role}</p>
          </div>
        </div>
        <div className="space-y-8">
          <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">{aboutProfile.intro}</p>
          <div>
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">技能栈</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {aboutProfile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">联系我</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {aboutProfile.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
