import { useEffect, useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { ShortThoughtsAPI } from "../API/ShortThoughtsAPI";
import ThoughtModalEdit from "./ThoughtModalEdit";
import ThoughtModalAdd from "./ThoughtModalAdd";
import { Thought } from "../interfaces";
import styles from "./thoughts.module.css";

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

  /*  const openEditModal = (selectedItem: Thought): void => {
        setSelectedThought(selectedItem);
        toggleShow();
      };*/

  //DATE FORMAT
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    const formatedDate = [day, month, year].join("-");
    return formatedDate;
  };

  const dateDifference = (dateString: string): number => {
    const currentDate = new Date();
    const dateOfCreation = new Date(dateString);
    const timeDifference = Math.abs(
      currentDate.getTime() - dateOfCreation.getTime()
    );
    const resultDate = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return resultDate;
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Row>
        <h3>
          Feeling inspired? Write it down &#8594;{" "}
          <ThoughtModalAdd
            getData={getData}
            show={showAdd}
            toggleShow={toggleShowAdd}
          />
        </h3>
      </Row>
      <div role="presentation" className={styles.cardsContainer}>
        {data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item.id}
              bg="light"
              text="dark"
              border="info"
              className={styles.card}
            >
              <Card.Body>
                <Card.Title>{item.values[0].value}</Card.Title>
                <Card.Text className={styles.cardText}>
                  {item.values[1].value.length > 80
                    ? item.values[1].value.substring(0, 80) + "..."
                    : item.values[1].value}
                </Card.Text>
              </Card.Body>
              <Card.Footer className={styles.cardFooter}>
                {/*<Button onClick={() => openEditModal(item)} variant="info">*/}
                {/*  Open*/}
                {/*</Button>*/}
                {/*/!* Delete button *!/*/}
                {/*<Button*/}
                {/*  onClick={() => {*/}
                {/*    if (window.confirm(`Delete thought no. ${item.id} ?`)) {*/}
                {/*      ShortThoughtsAPI.deleteItem(item.id).then(() => {*/}
                {/*        setTimeout(() => {*/}
                {/*          getData();*/}
                {/*        }, 1500);*/}
                {/*      });*/}
                {/*    }*/}
                {/*  }}*/}
                {/*  variant="danger"*/}
                {/*>*/}
                {/*  Delete*/}
                {/*</Button>*/}
                <small>
                  Created {formatDate(item.values[2].value)} -{" "}
                  {dateDifference(item.values[2].value)} days ago{<br />} ID: #
                  {item.id}
                </small>
              </Card.Footer>
            </Card>
          ))
        ) : (
          <h1>
            Seems like you haven't written any thoughts yet. &#x1F615; <br />
            Click on the button above to add your new thoughts!
          </h1>
        )}
      </div>

      {/*<Row>*/}
      {/*  <Table bordered responsive style={{ background: "rgba(0,0,0,0.3)" }}>*/}
      {/*    <thead style={{ color: "white" }}>*/}
      {/*      <tr className={styles.tableHeaders}>*/}
      {/*        <th id="id-table-header" aria-label="Thought ID column header">*/}
      {/*          ID*/}
      {/*        </th>*/}
      {/*        <th id="title-table-header">Title</th>*/}
      {/*        <th id="body-table-header">Body</th>*/}
      {/*        <th id="date-table-header">Date</th>*/}
      {/*        <th id="actions-table-header">Actions</th>*/}
      {/*      </tr>*/}
      {/*    </thead>*/}
      {/*    <tbody style={{ color: "white" }}>*/}
      {/*      {data &&*/}
      {/*        data.map((item) => (*/}
      {/*          <tr key={item.id}>*/}
      {/*            <td>{item.id}</td>*/}
      {/*            <td>{item.values[0].value}</td>*/}
      {/*             If message is longer than 30 characters, don't display all of it */}
      {/*            <td>*/}
      {/*              <ReactMarkdown>*/}
      {/*                {item.values[1].value.length > 30*/}
      {/*                  ? item.values[1].value.substring(0, 30) + "..."*/}
      {/*                  : item.values[1].value}*/}
      {/*              </ReactMarkdown>*/}
      {/*            </td>*/}
      {/*            <td>{formatDate(item.values[2].value)}</td>*/}
      {/*            <td className="actions-column">*/}
      {/*              <div className={styles.buttonsDiv}>*/}
      {/*                 Edit item button */}
      {/*                <Button*/}
      {/*                  onClick={() => openEditModal(item)}*/}
      {/*                  variant="info"*/}
      {/*                  size="sm"*/}
      {/*                >*/}
      {/*                  Show more*/}
      {/*                </Button>*/}
      {/*                 Delete button */}
      {/*                <Button*/}
      {/*                  onClick={() => {*/}
      {/*                    if (*/}
      {/*                      window.confirm(`Delete thought no. ${item.id} ?`)*/}
      {/*                    ) {*/}
      {/*                      ShortThoughtsAPI.deleteItem(item.id).then(() => {*/}
      {/*                        setTimeout(() => {*/}
      {/*                          getData();*/}
      {/*                        }, 1500);*/}
      {/*                      });*/}
      {/*                    }*/}
      {/*                  }}*/}
      {/*                  variant="danger"*/}
      {/*                  size="sm"*/}
      {/*                >*/}
      {/*                  Delete*/}
      {/*                </Button>*/}
      {/*              </div>*/}
      {/*            </td>*/}
      {/*          </tr>*/}
      {/*        ))}*/}
      {/*    </tbody>*/}
      {/*  </Table>*/}
      {/*</Row>*/}
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
