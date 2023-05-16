import { useEffect, useState } from "react";
import { Container, Table, Row, Button } from "react-bootstrap";
import { ShortThoughtsAPI } from "../API/ShortThoughtsAPI";
import ThoughtModalEdit from "./ThoughtModalEdit";
import ThoughtModalAdd from "./ThoughtModalAdd";
import ReactMarkdown from 'react-markdown';
import {Thought} from "../interfaces";




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
        <h3>Feeling inspired? Write it down  &#8594; <ThoughtModalAdd getData = {getData} show={showAdd} toggleShow = {toggleShowAdd} /></h3>
      </Row>
      <Row>
      <Table bordered responsive style={{background:"rgba(0,0,0,0.5)"}}>
      <thead style={{color:"white"}}>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody style={{color:"white"}}>
        { data && data.map((item) =>
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.values[0].value}</td>
          {/* If message is longer than 30 characters, don't display all of it */}
          <td><ReactMarkdown>{item.values[1].value.length > 30 ? item.values[1].value.substring(0,30)+'...' : item.values[1].value}</ReactMarkdown></td>
          <td>{item.values[2].value}</td>
          <td className="actions-column"><div className="buttons-div">
          {/* Edit item button */}
          <Button onClick={() => openEditModal(item.id)} variant="info" size="sm">Show more</Button>
          {/* Delete button */}
          <Button 
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