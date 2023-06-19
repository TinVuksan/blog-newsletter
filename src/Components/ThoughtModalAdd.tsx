import { useState } from "react";
import Button from "../utils/Form/Button/Button";
import Modal from "react-bootstrap/Modal";
// @ts-ignore
import { ShortThoughtsAPI } from "../API/ShortThoughtsAPI";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ThoughtValues } from "../interfaces";
import MyForm from "../utils/Form/Form";
import styles from "../home.module.css";

type Props = {
  show: boolean;
  toggleShow(): void;
  getData(): Promise<void>;
};
const ThoughtModalAdd = ({ show, toggleShow }: Props) => {
  const [title, setTitle] = useState<ThoughtValues>({
    fieldName: "title",
    value: "",
  });

  const [text, setText] = useState<ThoughtValues>({
    fieldName: "body",
    value: "",
  });
  const [date, setDate] = useState<ThoughtValues>({
    fieldName: "creation_date",
    value: "",
  });
  //const data = { values: [title, text, date] };
  return (
    <>
      <Button className="btn btn-info btn-lg" onClick={toggleShow}>
        Button
      </Button>
      <Modal
        show={show}
        onHide={toggleShow}
        backdrop="static"
        keyboard={true}
        className={styles["modal-edit"]}
        aria-modal="true"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>New short thought</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyForm
            title={title}
            text={text}
            date={date}
            setTitle={setTitle}
            setDate={setDate}
            setText={setText}
            formType="add"
          />
          {/* <Form
            id="editModal"
            onSubmit={(e) => {
              //Add item function
              toggleShow();
              e.preventDefault();
              ShortThoughtsAPI.addItem(JSON.stringify(data)).then(() => {
                setTimeout(() => {
                  getData();
                }, 3000);
              });
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="itemTitle">
                <Form.Label id="addThoughtForm-title">Title</Form.Label>
                <Form.Control
                  type="text"
                  aria-placeholder="Choose a title"
                  aria-labelledby="addThoughtForm-title"
                  placeholder="Choose a title"
                  value={title.value}
                  onChange={(e) => {
                    setTitle({
                      fieldName: title.fieldName,
                      value: e.target.value,
                    });
                  }}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="itemDate">
                <Form.Label id="addThoughtForm-date">Date</Form.Label>
                <Form.Control
                  type="date"
                  aria-placeholder="MM/DD/YYYY"
                  aria-labelledby="addThoughtForm-date"
                  placeholder="MM/DD/YYYY"
                  value={date.value}
                  onChange={(e) => {
                    setDate({
                      fieldName: date.fieldName,
                      value: e.target.value,
                    });
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="itemBody">
                <Form.Label id="addThoughtForm-body">Text</Form.Label>
                <Form.Control
                  as="textarea"
                  aria-multiline="true"
                  aria-placeholder="Write something"
                  aria-labelledby="addThoughtForm-body"
                  rows={20}
                  placeholder="Write something..."
                  value={text.value}
                  onChange={(e) => {
                    setText({
                      fieldName: text.fieldName,
                      value: e.target.value,
                    });
                  }}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="itemMarkdown">
                <Form.Label id="addThoughtForm-markdown">
                  Markdown preview
                </Form.Label>
                <div
                  aria-placeholder="Markdown preview"
                  aria-labelledby="addThoughtForm-markdown"
                  aria-multiline="true"
                  aria-readonly="true"
                  className={styles["markdown"]}
                >
                  Custom React component for displaying Markdown
                  <ReactMarkdown
                    children={text.value}
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
              </Form.Group>
            </Row>
          </Form>*/}
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button className="btn btn-outline-success" form="editModal">
            Add new thought
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThoughtModalAdd;
