import { SyntheticEvent, useEffect, useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { ShortThoughtsAPI } from "../API/ShortThoughtsAPI";
import ThoughtModalEdit from "./ThoughtModalEdit";
import ThoughtModalAdd from "./ThoughtModalAdd";
import { Thought } from "../interfaces";
import styles from "./thoughts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Button from "../utils/Form/Button/Button";

const ThoughtTable = () => {
  const [data, setData] = useState<Thought[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [selectedThought, setSelectedThought] = useState<Thought | undefined>(
    undefined
  );

  const toggleShow = (): void => {
    setShow(!show);
  };

  const toggleShowAdd = () => {
    setShowAdd(!showAdd);
  };

  //Fetch data from API
  const getData = async () => {
    setData(await ShortThoughtsAPI.getAll());
  };

  const openEditModal = (selectedItem: Thought): void => {
    setSelectedThought(selectedItem);
    toggleShow();
  };

  //DATE FORMAT
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    const formatedDate = [day, month, year].join("-");
    return formatedDate;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container role="presentation">
      <Row role="presentation">
        <h3>
          Feeling inspired? Write it down &#8594;{" "}
          <ThoughtModalAdd
            getData={getData}
            show={showAdd}
            toggleShow={toggleShowAdd}
          />
        </h3>
      </Row>
      <div role="presentation" className={styles["cards-container"]}>
        {data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item.id}
              bg="light"
              text="dark"
              border="info"
              className={styles.card}
              onClick={() => openEditModal(item)}
            >
              <Card.Header className={styles["card-header"]}>
                <p>Created {formatDate(item.values[2].value)}</p>
                <p>ID: #{item.id}</p>
              </Card.Header>
              <Card.Body>
                <Card.Title>{item.values[0].value}</Card.Title>
                <Card.Text className={styles["card-text"]}>
                  {item.values[1].value}
                </Card.Text>
              </Card.Body>
              <Card.Footer className={styles["card-footer"]}>
                <Button
                  className="btn btn-outline-primary"
                  onClick={() => openEditModal(item)}
                >
                  EDIT
                </Button>
                <FontAwesomeIcon
                  icon={icon({ name: "trash-can", style: "regular" })}
                  className={styles["delete-icon"]}
                  onClick={(e: SyntheticEvent) => {
                    e.stopPropagation();
                    if (window.confirm(`Delete thought no. ${item.id} ?`)) {
                      ShortThoughtsAPI.deleteItem(item.id).then(() => {
                        setTimeout(() => {
                          getData();
                        }, 1500);
                      });
                    }
                  }}
                />
              </Card.Footer>
            </Card>
          ))
        ) : (
          <h1>
            Seems like you haven't written any thoughts yet. &#x1F615; <br />
            Click on the button above to add a thought!
          </h1>
        )}
      </div>

      <ThoughtModalEdit
        show={show}
        toggleShow={toggleShow}
        item={selectedThought}
        getData={getData}
      />
    </Container>
  );
};

export default ThoughtTable;
