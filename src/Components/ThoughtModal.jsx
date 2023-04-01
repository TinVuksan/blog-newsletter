import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ShortThoughtsAPI } from '../API/ShortThoughtsAPI';

const ThoughtModal = (props) => {
  const [title, setTitle] = useState({fieldId:props.title.fieldId, value:props.title.value});
  const [text, setText] = useState({fieldId:props.text.fieldId, value:props.text.value}); 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <>
      <Button onClick={handleShow} variant="info" size="sm">Show more</Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="editModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>My short thought</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='editModal' onSubmit={(e) => {
            e.preventDefault();
            console.log('Submit edita');
            console.log(JSON.stringify([title, text, props.date]));
            
            ShortThoughtsAPI.updateItem(props.id, JSON.stringify([title, text, props.date]));
            
          }}>
            <Form.Group className="mb-3" controlId="itemTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Choose a title"
              value={title.value}
              onChange = {(e) => {setTitle({fieldId: title.fieldId, value: e.target.value})}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="itemBody">
              <Form.Label>Text</Form.Label>
              <Form.Control 
              as="textarea" 
              rows={8} 
              placeholder="Write something..."
              value={text.value}
              onChange = {(e) => {setText({fieldId: text.fieldId, value: e.target.value})}}
              />
              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="btn btn-danger">Close</button>
          <button form='editModal' className="btn btn-info">Update</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ThoughtModal;