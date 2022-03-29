import "./styles.css";
import Book from "./Components/Book";
import Pages from "./Components/Pages";
import Page from "./Components/Page";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState("");
  const [pages, setPages] = useState({});
  const [booksFromBackEnd, setBooksFromBackEnd] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/books")
      .then((json) => {
        console.log("books loaded immediately:", json.data.data);
        setBooksFromBackEnd(json.data.data)
      })
      .catch((err) => console.log("err:", err));
  }, []);


  return (
    <div className="App">
      <Container className="mt-4">
        <h1>LARA Picturebook Object Selector</h1>
        <h5>(Data in LARA Picturebook format)</h5>
        <Book books={books} setBooks={setBooks} setBook={setBook} />
        <Pages pages={pages} setPages={setPages} book={book} booksFromBackEnd={booksFromBackEnd} />
        {/* <Page
          pages={pages}
          setPages={setPages}
          clickPoints={clickPoints}
          setClickPoints={setClickPoints}
        /> */}
      </Container>
    </div>
  );
}
