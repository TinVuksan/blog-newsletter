import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// @ts-ignore
import { ShortThoughtsAPI } from "../API/ShortThoughtsAPI";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Thought, ThoughtValues } from "../interfaces";
import styles from "../home.module.css";

type Props = {
  show: boolean;
  toggleShow(): void;
  item: Thought | undefined;
  getData(): Promise<void>;
};

const ThoughtModalEdit = ({ show, toggleShow, item, getData }: Props) => {
  const [title, setTitle] = useState<ThoughtValues>({} as ThoughtValues);
  const [text, setText] = useState<ThoughtValues>({} as ThoughtValues);
  const [date, setDate] = useState<ThoughtValues>({} as ThoughtValues);
  const id = item?.id;

  const assignValues = () => {
    if (id) {
      setTitle({
        fieldId: item.values[0].fieldId,
        value: item.values[0].value,
      });
      setText({ fieldId: item.values[1].fieldId, value: item.values[1].value });
      setDate({ fieldId: item.values[2].fieldId, value: item.values[2].value });
    }
  };

  useEffect(() => {
    assignValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Modal
        show={show}
        onHide={toggleShow}
        backdrop="static"
        keyboard={false}
        className={styles.editModal}
        aria-modal="true"
        fullscreen
        contentClassName={styles["modal-content"]}
      >
        <Modal.Header closeButton>
          <Modal.Title aria-label="Modal title">My short thought</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            id="editModal"
            aria-label="Edit thought modal form element"
            onSubmit={(e): void => {
              e.preventDefault();
              toggleShow();
              ShortThoughtsAPI.updateItem(
                id,
                JSON.stringify([title, text, date])
              ).then(() => {
                setTimeout(() => {
                  getData();
                }, 2500);
              });
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="itemTitle">
                <Form.Label id="editForm-title">Title</Form.Label>
                <Form.Control
                  type="text"
                  aria-placeholder="Choose a title"
                  aria-labelledby="editForm-title"
                  placeholder="Choose a title"
                  value={title.value}
                  onChange={(e): void => {
                    setTitle({ fieldId: title.fieldId, value: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="itemDate">
                <Form.Label id="editForm-date">Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  aria-placeholder="mm/dd/YYYY"
                  aria-labelledby="editForm-date"
                  className="date"
                  value={date.value}
                  onChange={(e): void => {
                    setDate({ fieldId: date.fieldId, value: e.target.value });
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="itemBody">
                <Form.Label id="editForm-body">Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={20}
                  aria-placeholder="Write something..."
                  aria-labelledby="editForm-body"
                  aria-multiline="true"
                  placeholder="Write something..."
                  value={text.value}
                  onChange={(e): void => {
                    setText({ fieldId: text.fieldId, value: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="itemMarkdown">
                <Form.Label id="editForm-markdown">Markdown preview</Form.Label>
                <div
                  aria-labelledby="editForm-markdown"
                  aria-multiline="true"
                  aria-readonly="true"
                  className={styles["markdown"]}
                >
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            aria-label="Close modal form button"
            onClick={toggleShow}
            className="btn btn-danger"
          >
            Close
          </button>
          <button
            aria-label="Submit modal form button"
            form="editModal"
            className="btn btn-info"
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThoughtModalEdit;
