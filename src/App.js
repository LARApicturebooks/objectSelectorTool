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
  const [id, setId] = useState("");
  const [pages, setPages] = useState({});
  const [booksFromBackEnd, setBooksFromBackEnd] = useState([]);
  const [booksIds, setBooksIds] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://lara-picturebooks-backend.herokuapp.com/api/books")
      .then((json) => {
        console.log("books loaded immediately:", json.data.data);
        setBooksFromBackEnd(json.data.data)
        let bookList = []
        let booksIdsDict = {}
        json.data.data.forEach(b => {
          bookList.push(b.attributes.Title)
          booksIdsDict[b.attributes.Title] = b.id
        })
        setBooks(bookList)
        setBooksIds(booksIdsDict)
        setIsLoading(false);
        //console.log('booksIds:', booksIds)
      })
      .catch((err) => console.log("err:", err));
  }, []);

  return (
    <div className="App">
      <Container className="mt-4">
        <h1>LARA Picturebook Object Selector</h1>
        <h5>(Data in LARA Picturebook format)</h5>
        <Book books={books} setBooks={setBooks} setBook={setBook} isLoading={isLoading} />
        <Pages pages={pages} setPages={setPages} book={book} booksFromBackEnd={booksFromBackEnd} booksIds={booksIds} />
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
