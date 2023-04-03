import { useEffect, useState } from "react";
import { Container, Table, Row, Button } from "react-bootstrap";
import { ShortThoughtsAPI } from "../API/ShortThoughtsAPI";
import ThoughtModalEdit from "./ThoughtModalEdit";
import ThoughtModalAdd from "./ThoughtModalAdd";
import ReactMarkdown from 'react-markdown';

const ThoughtTable = () => {
  const [data,setData] = useState([]);
  const [show,setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  }

  const getData = async () => {
      setData(await ShortThoughtsAPI.getAll());

  }
  
  useEffect(() => {
    getData();
    }, [])

  return(
    <Container>
      <Row>
        <h3>Feeling inspired? Write it down  &#8594; <ThoughtModalAdd /></h3>
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
        {data.map((item) => 
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.values[0].value}</td>
          <td><ReactMarkdown>{item.values[1].value.length > 30 ? item.values[1].value.substring(0,30)+'...' : item.values[1].value}</ReactMarkdown></td>
          <td>{item.values[2].value}</td>
          <td className="actions-column"><div className="buttons-div">
          <ThoughtModalEdit 
          show={show} 
          toggleShow = {toggleShow} 
          id ={item.id} 
          title={item.values[0]} 
          text={item.values[1]} 
          date={item.values[2]}
          />
          <Button 
          onClick={() => ShortThoughtsAPI.deleteItem(item.id)} 
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
      
    </Container>
      
  

  );
}

export default ThoughtTable;