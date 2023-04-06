import { useState, memo, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { ShortThoughtsAPI } from '../API/ShortThoughtsAPI';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const ThoughtModalEdit = (props) => {
  const [title, setTitle] = useState({});
  const [text, setText] = useState({});
  const [date, setDate] = useState({});
  const id = props.item.id;

  const assignValues = () => {
    if(id) {
      setTitle({fieldId: props.item.values[0].fieldId, value: props.item.values[0].value});
      setText({fieldId: props.item.values[1].fieldId, value: props.item.values[1].value});
      setDate({fieldId: props.item.values[2].fieldId, value: props.item.values[2].value});
    }
  }

  useEffect(() => {
    assignValues();
    }, [id])


  return (
    <>
      <Modal
        show={props.show}
        onHide={props.toggleShow}
        backdrop="static"
        keyboard={false}
        className="editModal"
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>My short thought</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='editModal' onSubmit={(e) => {
            e.preventDefault();
            props.toggleShow();
            ShortThoughtsAPI.updateItem(id, JSON.stringify([title, text, date]))
            .then(() => {
              setTimeout(() => {
                props.getData();
              }, 2500)   
              
            }); 

          }}>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="itemTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control 
              type="text"
              placeholder="Choose a title"
              value={title.value}
              onChange = {(e) => {
                setTitle({fieldId: title.fieldId, value: e.target.value});
              }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemBody">
              <Form.Label>Date</Form.Label>
              <Form.Control 
              type="date" 
              placeholder="Date"
              value={date.value}
              onChange = {(e) => {
                setDate({fieldId:date.fieldId, value:e.target.value});
              }}
              />
              
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="itemBody">
              <Form.Label>Text</Form.Label>
              <Form.Control 
              as="textarea" 
              rows={20}
              placeholder="Write something..."
              value={text.value}
              onChange = {(e) => {
                setText({fieldId: text.fieldId, value: e.target.value});
              }}
              />
            </Form.Group>
            
            <Form.Group as = {Col} controlId="itemBody">
              <Form.Label>Markdown preview</Form.Label>
              <div className="markdown">
              <ReactMarkdown 
              children={text.value}
              remarkPlugins={[remarkGfm]}
              components={{
                code({node,inline,className,children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={materialDark}
                    language = {match[1]}
                    PreTag="div"
                    {...props}
                    />
                  ) : (
                    <code className = {className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
              />
              </div>
            </Form.Group>            
            </Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={props.toggleShow} className="btn btn-danger">Close</button> 
          <button form='editModal' className="btn btn-info">Update</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(ThoughtModalEdit);