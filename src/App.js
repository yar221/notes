import { useState } from "react";
import ContentBar from "./components/ContetntBar/ContentBar.js";
import Header from "./components/Header/Header.js";
import Context from "./context/context.js";


function App() {
  //цей стан відповідає за відображення данних нотатки 
  const [selectedNote, setSelectedNote] = useState({})
  //використовуємо для запису тексту, який ми ввели у пошукову строку
  const [searchedText, setSearchedText] = useState('')

  return (
    <div className="App">
      <Context.Provider value={{selectedNote, setSelectedNote, searchedText, setSearchedText}}>
        <Header />
        <ContentBar />
      </Context.Provider>
    </div>
  );
}

export default App;
