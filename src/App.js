import { useState } from "react";
import ContentBar from "./components/ContetntBar/ContentBar.js";
import Header from "./components/Header/Header.js";
import Context from "./context/context.js";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal/DeleteConfirmationModal.js";

function App() {
  //цей стан відповідає за відображення данних нотатки
  const [selectedNote, setSelectedNote] = useState({});
  //використовуємо для запису тексту, який ми ввели у пошукову строку
  const [searchedText, setSearchedText] = useState("");

  const [list, setList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [isBurgerDown, setIsBurgerDown] = useState(false);

  return (
    <div className="App">
      <Context.Provider
        value={{
          selectedNote,
          setSelectedNote,
          searchedText,
          setSearchedText,
          list,
          setList,
          isEdit,
          setIsEdit,
          setIsModal,
          isDelete,
          setIsDelete,
          isBurgerDown,
          setIsBurgerDown,
        }}
      >
        <Header />
        <ContentBar />
        {isModal && <DeleteConfirmationModal />}
      </Context.Provider>
    </div>
  );
}

export default App;
