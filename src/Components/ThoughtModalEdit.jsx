import { useState, memo } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ShortThoughtsAPI } from '../API/ShortThoughtsAPI';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const ThoughtModalEdit = (props) => {
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const [date, setDate] = useState(props.date);
  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //console.log(moment(date.value).format('YYYY-MM-DD')); RADI

  return (
    <>
      <Button onClick={props.toggleShow} variant="info" size="sm">Show more</Button>

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
            handleClose();
            e.preventDefault();
            ShortThoughtsAPI.updateItem(props.id, JSON.stringify([title, text, date]));          
          }}>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="itemTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Choose a title"
              value={title.value}
              onChange = {(e) => {setTitle({fieldId: title.fieldId, value: e.target.value})}}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemBody">
              <Form.Label>Date</Form.Label>
              <Form.Control 
              type="date" 
              placeholder="Date"
              value={date.value}
              onChange = {(e) => {setDate({fieldId:date.fieldId, value:e.target.value})}}
              disabled
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
              onChange = {(e) => {setText({fieldId: text.fieldId, value: e.target.value})}}
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