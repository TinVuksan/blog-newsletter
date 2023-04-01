import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { ShortThoughtsAPI } from "../API/ShortThoughtsAPI";
import ThoughtModal from "./ThoughtModal";

const ThoughtTable = () => {
  const [data,setData] = useState([]);

  const getData = async () => {
      const array = await ShortThoughtsAPI.getAll();
      setData(array);

  }
  useEffect(() => {
    getData();
    }, [])



  console.log(data);
  return(
    <Container>
      <Table responsive bordered>
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
          <td>{item.values[1].value.length > 30 ? item.values[1].value.substring(0,30)+'...' : item.values[1].value}</td>
          <td>{item.values[2].value}</td>
          <td><ThoughtModal id ={item.id} title={item.values[0]} text={item.values[1]} date={item.values[2]}/></td>
          
        </tr>
        )}
      </tbody>
    </Table>
    </Container>
      
  

  );
}

export default ThoughtTable;