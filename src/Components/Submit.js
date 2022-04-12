import { Row, Col, Container, Button } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { VariableContext } from "./Pages";
import axios from "axios";

export default function Submit(props) {
  const { 
    wordsData,
    setSave
  } = useContext(VariableContext);

  setInterval( submitData, 5000)
  const submitData = () => {

    console.log("props.book:", props.book);
    console.log("props.pages:", props.pages);
    console.log("props.booksFromBackEnd:", props.booksFromBackEnd);
    console.log("find id 5:", props.booksFromBackEnd.find(b => b.attributes.Title === props.book));

    let book = props.booksFromBackEnd.find(b => b.attributes.Title === props.book);
    
    if (book !== undefined) {
      axios
        .put("https://lara-picturebooks-backend.herokuapp.com/api/books/" + book.id, {
          "data": {
            "Title": props.book,
            "objectCoordinates": props.pages
          }
        })
        .then((json) => {
          console.log("after updating coords:", json);
          setSave(false)
        })
        .catch((err) => console.log("err:", err));
    } else {
      axios
        .post("https://lara-picturebooks-backend.herokuapp.com/api/books/", {
          "data": {
            "Title": props.book,
            "objectCoordinates": props.pages
          }
        })
        .then((json) => {
          console.log("after creating coords:", json);
          setSave(false)
        })
        .catch((err) => console.log("err:", err));
    } 

    //console.log("props.pages:", props.pages);
    //const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      //JSON.stringify(props.pages)
    //)}`;
    //const link = document.createElement("a");
    //link.href = jsonString;
    //link.download = "data.json";
    //link.click();
  };

  return (
    <Container>
      <Row className="m-1">
        <Col>
          <Button
            variant="success"
            //onClick={removePoly}
            className={props.showHideImage}
            hidden
            id="saveData"
            onClick={submitData}
            size="lg"
          >
            Download
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
