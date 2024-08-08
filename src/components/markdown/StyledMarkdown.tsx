import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import StyledLink from '../StyledLink';

const StyledMarkdown = (props: { markdown: string }) => {
  return (
    <Markdown
      options={{
        overrides: {
          pre: {
            component: MarkdownPreBlock,
          },
          a: {
            component: StyledLink,
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
