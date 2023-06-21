import { forwardRef, SyntheticEvent, useState } from "react";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Props = {
  show: boolean;
  toggleShow(): void;
  getData(): Promise<void>;
};

const ThoughtModalAdd = ({ show, toggleShow, getData }: Props) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
  const data = { values: [title, text, date] };

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnackbarClose = (e?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    toggleShow();
    console.log(data);
    e.preventDefault();
    ShortThoughtsAPI.addItem(JSON.stringify(data))
      .then(() => {
        setTimeout(() => {
          getData();
        }, 3000);
      })
      .then(() => {
        setOpenSnackbar(true);
      });
  };
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
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button className="btn btn-outline-success" onClick={handleSubmit}>
            Add new thought
          </Button>
        </Modal.Footer>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thought added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ThoughtModalAdd;
