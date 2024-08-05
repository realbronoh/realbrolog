import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const StyledMarkdown = (props: { markdown: string }) => {
  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            component: 'h1',
            props: {
              className: 'text-4xl font-bold my-6',
            },
          },
          h2: {
            component: 'h2',
            props: {
              className: 'text-3xl font-semibold my-5',
            },
          },
          p: {
            component: 'p',
            props: {
              className: 'text-lg leading-relaxed my-4',
            },
          },
          ul: {
            component: 'ul',
            props: {
              className: 'list-disc list-inside my-4',
            },
          },
          ol: {
            component: 'ol',
            props: {
              className: 'list-decimal list-inside my-4',
            },
          },
          li: {
            component: 'li',
            props: {
              className: 'my-2',
            },
          },
          blockquote: {
            component: 'blockquote',
            props: {
              className:
                'border-l-4 border-gray-500 pl-4 italic my-4 text-gray-700',
            },
          },
          img: {
            component: 'img',
            props: {
              className: 'max-w-full h-auto my-4 rounded',
            },
          },
          a: {
            component: 'a',
            props: {
              className: 'text-blue-600 hover:underline',
            },
          },
          pre: {
            component: MarkdownPreBlock,
          },
        },
      }}
    >
      {props.markdown}
    </Markdown>
  );
};

type MarkdownPreBlockProps = {
  children: JSX.Element | JSX.Element[];
};

export const MarkdownPreBlock = ({
  children,
  ...rest
}: MarkdownPreBlockProps) => {
  if ('type' in children && children['type'] === 'code') {
    return MarkdownCodeBlock({
      children: children['props']['children'],
      className: children['props']['className'],
    });
  }
  return <pre {...rest}>{children}</pre>;
};

type MarkdownCodeBlockProps = {
  children: string;
  className: string;
};

export const MarkdownCodeBlock = ({
  children,
  className,
}: MarkdownCodeBlockProps) => {
  const language = className?.replace('lang-', '');

  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      className="markdown-codeblock-styled"
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default StyledMarkdown;
