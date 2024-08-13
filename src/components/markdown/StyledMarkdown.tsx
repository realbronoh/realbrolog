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
          img: {
            component: StyledImg,
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

const StyledImg = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="flex flex-col items-center w-full sm:w-4/5 mx-auto">
      <img src={src} alt={alt} className="mb-0" />
      <span className="text-sm text-gray-600 italic">{alt}</span>
    </div>
  );
};

export default StyledMarkdown;
