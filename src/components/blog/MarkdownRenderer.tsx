import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "@/utils/prism";
import { slugify } from "@/utils/format";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ children }) => {
        const text = String(children);
        return (
          <h1 id={slugify(text)} className="mt-10 scroll-mt-24 text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            {children}
          </h1>
        );
      },
      h2: ({ children }) => {
        const text = String(children);
        return (
          <h2 id={slugify(text)} className="mt-10 scroll-mt-24 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            {children}
          </h2>
        );
      },
      h3: ({ children }) => {
        const text = String(children);
        return (
          <h3 id={slugify(text)} className="mt-8 scroll-mt-24 text-2xl font-semibold text-slate-950 dark:text-white">
            {children}
          </h3>
        );
      },
      p: ({ children }) => <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">{children}</p>,
      ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">{children}</ul>,
      ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300">{children}</ol>,
      blockquote: ({ children }) => (
        <blockquote className="mt-6 border-l-4 border-primary-500 bg-primary-50/70 px-5 py-4 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {children}
        </blockquote>
      ),
      code(props) {
        const { className, children, ...rest } = props;
        const inline = Boolean((props as { inline?: boolean }).inline);
        const match = /language-(\w+)/.exec(className || "");
        const rawCode = String(children).replace(/\n$/, "");

        if (inline) {
          return (
            <code className="rounded bg-slate-100 px-1.5 py-1 text-sm text-primary-700 dark:bg-slate-800 dark:text-primary-300" {...rest}>
              {children}
            </code>
          );
        }

        const language = match?.[1] ?? "typescript";
        const grammar = Prism.languages[language] ?? Prism.languages.typescript;
        const html = Prism.highlight(rawCode, grammar, language);

        return (
          <pre className="mt-6 overflow-x-auto rounded-[1.5rem] bg-[#0f172a] p-5 text-sm leading-7 text-slate-100">
            <code dangerouslySetInnerHTML={{ __html: html }} {...rest} />
          </pre>
        );
      }
    }}
  >
    {content}
  </ReactMarkdown>
);
