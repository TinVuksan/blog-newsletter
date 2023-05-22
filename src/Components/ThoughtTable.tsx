import { useEffect, useState } from "react";
import { Container, Table, Row, Button } from "react-bootstrap";
import { ShortThoughtsAPI } from "../API/ShortThoughtsAPI";
import ThoughtModalEdit from "./ThoughtModalEdit";
import ThoughtModalAdd from "./ThoughtModalAdd";
import ReactMarkdown from 'react-markdown';
import {Thought} from "../interfaces";
import styles from "../home.module.css";

const ThoughtTable = () => {
  const [data,setData] = useState<Thought[]>([]);
  const [show,setShow] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [selectedThought, setSelectedThought] = useState<Thought | undefined>(undefined);

  const toggleShow = ():void => {
    setShow(!show);
  }

  const toggleShowAdd = () => {
    setShowAdd(!showAdd);
  }

  //Fetch data from API
  const getData = async () => {
      setData(await ShortThoughtsAPI.getAll());
  }

  const openEditModal = (id:number):void => {
    const item = data!.find(x => x.id === id);
    console.log(item);
    setSelectedThought(item);
    toggleShow();
  }
  
  useEffect(() => {
    getData();
    console.log(data);
    }, [])

  return(
    <Container>
      <Row>
        <h3 aria-label="Title with button" aria-description="Header with a button for adding a short thought through a modal form">Feeling inspired? Write it down  &#8594; <ThoughtModalAdd getData = {getData} show={showAdd} toggleShow = {toggleShowAdd} /></h3>
      </Row>
      <Row>
      <Table bordered responsive style={{background:"rgba(0,0,0,0.5)"}}>
      <thead style={{color:"white"}}>
        <tr className = {styles.tableHeaders}>
          <th id = "id-table-header" aria-label = "Thought ID column header">ID</th>
          <th id = "title-table-header" aria-label = "Thought title column header">Title</th>
          <th id = "body-table-header" aria-label = "Thought body column header">Body</th>
          <th id = "date-table-header" aria-label = "Thought date column header">Date</th>
          <th id = "actions-table-header" aria-label = "Column header that contains Show more/Delete buttons">Actions</th>
        </tr>
      </thead>
      <tbody style={{color:"white"}}>
        { data && data.map((item) =>
        <tr key={item.id}>
          <td aria-placeholder = "Thought ID" aria-labelledby = "id-table-header">{item.id}</td>
          <td aria-placeholder = "My thought title" aria-labelledby = "title-table-header">{item.values[0].value}</td>
          {/* If message is longer than 30 characters, don't display all of it */}
          <td aria-placeholder = "Some text with markdown preview" aria-labelledby = "body-table-header"><ReactMarkdown>{item.values[1].value.length > 30 ? item.values[1].value.substring(0,30)+'...' : item.values[1].value}</ReactMarkdown></td>
          <td aria-placeholder = "YYYY-MM-DD" aria-labelledby = "date-table-header">{item.values[2].value}</td>
          <td aria-placeholder = "Show more or Delete" aria-labelledby = "actions-table-header" className="actions-column"><div className={styles.buttonsDiv}>
          {/* Edit item button */}
          <Button aria-label = "Show more button" onClick={() => openEditModal(item.id)} variant="info" size="sm">Show more</Button>
          {/* Delete button */}
          <Button
          aria-label = "Delete thought button"
          onClick={() => {
            if(window.confirm(`Delete thought no. ${item.id} ?`)) {
              ShortThoughtsAPI.deleteItem(item.id).then(() => {
                setTimeout(() => {
                  getData();
                }, 1500)
              });
            }
            
          }}
          variant="danger" 
          size="sm">Delete
          </Button>
          </div>
          </td>
          
        </tr>
        )}
      </tbody>
    </Table>
      </Row>
    <ThoughtModalEdit
          show={show} 
          toggleShow = {toggleShow}
          item = {selectedThought}
          getData = {getData}
    />
    </Container>
      
  

  );
}

export default ThoughtTable;