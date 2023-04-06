import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ShortThoughtsAPI } from '../API/ShortThoughtsAPI';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const ThoughtModalAdd = (props) => {
  const [title, setTitle] = useState({fieldName: 'title', value: ''});
  const [text, setText] = useState({fieldName: 'body', value: ''});
  const [date, setDate] = useState({fieldName: 'creation_date', value: ''});
  const data = {values: [title,text,date]};

  return (
    <>
      <Button onClick={props.toggleShow} variant="info" size="sm"><strong>Click here</strong></Button>

      <Modal
        show={props.show}
        onHide={props.toggleShow}
        backdrop="static"
        keyboard={false}
        className="editModal"
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title><strong>New short thought</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='editModal' onSubmit={(e) => {
            props.toggleShow();
            e.preventDefault();
            ShortThoughtsAPI.addItem(JSON.stringify(data))
            .then(() => {
              setTimeout(() => {
                props.getData();
              }, 3000)   
              
            });
          }}>
            <Row className = "mb-3">
            <Form.Group as={Col} controlId="itemTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Choose a title"
              value={title.value}
              onChange = {(e) => {setTitle({fieldName: title.fieldName, value: e.target.value})}}
              required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemBody">
              <Form.Label>Date</Form.Label>
              <Form.Control 
              type="date" 
              placeholder="Date"
              value = {date.value}
              onChange = {(e) => {setDate({fieldName:date.fieldName, value:e.target.value})}}
              required
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
              value = {text.value}
              onChange = {(e) => {setText({fieldName: text.fieldName, value: e.target.value})}}
              required
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
        <Modal.Footer className="modal-footer">
          <button form='editModal' className="btn btn-info m-auto"><strong>Add new thought</strong></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ThoughtModalAdd;