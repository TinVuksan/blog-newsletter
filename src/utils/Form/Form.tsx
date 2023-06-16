import Input from "./Input/Input";
import Textarea from "./Textarea/Textarea";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// @ts-ignore
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styles from "./styles.module.css";
import { ChangeEvent, Dispatch, FormEventHandler, SetStateAction } from "react";
import { ThoughtValues } from "../../interfaces";

type Props = {
  title: ThoughtValues;
  date: ThoughtValues;
  text: ThoughtValues;
  setTitle: Dispatch<SetStateAction<ThoughtValues>>;
  setDate: Dispatch<SetStateAction<ThoughtValues>>;
  setText: Dispatch<SetStateAction<ThoughtValues>>;
  onSubmit?: FormEventHandler<HTMLElement>;
  formType: string;
};

const Form = ({
  title,
  date,
  text,
  setTitle,
  setDate,
  setText,
  onSubmit,
  formType,
}: Props) => {
  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <Input
        label="Title"
        name="Title"
        placeholder="Some title"
        type="text"
        value={title.value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle({ fieldId: title.fieldId, value: e.target.value });
        }}
      />
      <Input
        label="Date"
        name="Date"
        placeholder="Some title"
        type="date"
        value={date.value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setDate({ fieldId: date.fieldName, value: e.target.value });
        }}
      />
      <Textarea
        label="Text input"
        name="Text"
        placeholder="Some text"
        cols={40}
        rows={5}
        value={text.value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setText({ fieldId: date.fieldName, value: e.target.value });
        }}
      />
      <div className={styles["markdown"]}>
        {/* Custom React component for displaying Markdown */}
        <ReactMarkdown
          children="Some text"
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={materialDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </form>
  );
};

export default Form;
