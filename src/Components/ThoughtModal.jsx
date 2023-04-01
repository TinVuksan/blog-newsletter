import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ThoughtModal = () => {
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
      >
        <Modal.Header closeButton>
          <Modal.Title>My short thought</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='editModal'>
            <Form.Group className="mb-3" controlId="itemTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Choose a title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="itemBody">
              <Form.Label>Text</Form.Label>
              <Form.Control as="textarea" rows={8} placeholder="Write something..." />
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