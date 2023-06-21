import { useState, useEffect, forwardRef, SyntheticEvent } from "react";
import Modal from "react-bootstrap/Modal";
// @ts-ignore
import { ShortThoughtsAPI } from "../API/ShortThoughtsAPI";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Thought, ThoughtValues } from "../interfaces";
import styles from "../home.module.css";
import Button from "../utils/Form/Button/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import MyForm from "../utils/Form/Form";

type Props = {
  show: boolean;
  toggleShow(): void;
  item: Thought | undefined;
  getData(): Promise<void>;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ThoughtModalEdit = ({ show, toggleShow, item, getData }: Props) => {
  const [title, setTitle] = useState<ThoughtValues>({} as ThoughtValues);
  const [text, setText] = useState<ThoughtValues>({} as ThoughtValues);
  const [date, setDate] = useState<ThoughtValues>({} as ThoughtValues);
  const id = item?.id;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (e?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const assignValues = () => {
    if (id) {
      setTitle(item.values[0]);
      setText(item.values[1]);
      setDate(item.values[2]);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    toggleShow();
    ShortThoughtsAPI.updateItem(id, JSON.stringify([title, text, date]))
      .then(() => {
        setTimeout(() => {
          getData();
        }, 2500);
      })
      .then(() => {
        setOpenSnackbar(true);
      });
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
            formType="edit"
          />
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button className="btn btn-outline-success" onClick={handleSubmit}>
            Submit edit
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
          Thought updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ThoughtModalEdit;
