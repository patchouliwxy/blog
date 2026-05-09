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
          <h1
            id={slugify(text)}
            className="mt-10 scroll-mt-20 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            {children}
          </h1>
        );
      },
      h2: ({ children }) => {
        const text = String(children);
        return (
          <h2
            id={slugify(text)}
            className="mt-10 scroll-mt-20 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children }) => {
        const text = String(children);
        return (
          <h3
            id={slugify(text)}
            className="mt-8 scroll-mt-20 text-xl font-semibold text-neutral-900 dark:text-white"
          >
            {children}
          </h3>
        );
      },
      p: ({ children }) => (
        <p className="mt-5 text-base leading-7 text-neutral-600 dark:text-neutral-300">{children}</p>
      ),
      ul: ({ children }) => (
        <ul className="mt-4 list-disc space-y-1.5 pl-6 text-neutral-600 dark:text-neutral-300">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="mt-4 list-decimal space-y-1.5 pl-6 text-neutral-600 dark:text-neutral-300">
          {children}
        </ol>
      ),
      blockquote: ({ children }) => (
        <blockquote className="mt-6 rounded-r-lg border-l-[3px] border-accent-500 bg-neutral-50 px-5 py-3 text-neutral-600 dark:border-accent-400 dark:bg-neutral-800/60 dark:text-neutral-300">
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
            <code
              className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-sm font-medium text-accent-700 dark:bg-neutral-800 dark:text-accent-400"
              {...rest}
            >
              {children}
            </code>
          );
        }

        const language = match?.[1] ?? "typescript";
        const grammar = Prism.languages[language] ?? Prism.languages.typescript;
        const html = Prism.highlight(rawCode, grammar, language);

        return (
          <pre className="mt-6 overflow-x-auto rounded-xl bg-[#0f172a] p-5 text-sm leading-relaxed">
            <code dangerouslySetInnerHTML={{ __html: html }} {...rest} />
          </pre>
        );
      },
    }}
  >
    {content}
  </ReactMarkdown>
);
