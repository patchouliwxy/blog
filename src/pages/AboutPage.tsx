import { Seo } from "@/components/common/Seo";
import { aboutProfile } from "@/data/about";
import { withBase } from "@/lib/site";

export default function AboutPage() {
  return (
    <div className="space-y-12 pt-8">
      <Seo title="关于我" />

      <section className="grid gap-10 rounded-2xl bg-white p-8 shadow-card dark:bg-neutral-800/60 md:grid-cols-[260px_minmax(0,1fr)] md:p-10">
        <div className="space-y-4">
          <img
            src={withBase(aboutProfile.avatar)}
            alt={aboutProfile.name}
            className="h-56 w-56 rounded-2xl object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{aboutProfile.name}</h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{aboutProfile.role}</p>
          </div>
        </div>

        <div className="space-y-8">
          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">{aboutProfile.intro}</p>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
              技能栈
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {aboutProfile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
              联系我
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {aboutProfile.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-400"
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
