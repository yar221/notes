import React, { useContext, useEffect } from "react";
import SeacrhBox from "../SearchBox/SeacrhBox";
import "./header.scss";
import {
  ArrowBarRight,
  Check,
  List,
  PencilSquare,
  Plus,
  Trash,
} from "react-bootstrap-icons";
import { DBServiceI } from "../../DBService";
import Context from "../../context/context";

const Header = () => {
  const {
    selectedNote,
    setSelectedNote,
    list,
    setList,
    isEdit,
    setIsEdit,
    setIsModal,
    isDelete,
    setIsDelete,
    setIsBurgerDown,
  } = useContext(Context);

  const createNewNote = () => {
    let newNote = {
      title: "Заголовок",
      text: "Текст нотатки",
      date: new Date(),
    };

    DBServiceI.addNote(newNote)
      .then((res) => {
        newNote = { ...newNote, id: res };
        setList([...list, newNote]);
        setSelectedNote(newNote);
      })
      .catch((error) => {
        console.error(error);
      });

    if (window.innerWidth <= 596) {
      setIsBurgerDown(true);
    }
  };

  useEffect(() => {
    if (isDelete) {
      DBServiceI.deleteNote(selectedNote.id)
        .then((message) => {
          setList(list.filter((item) => item.id !== selectedNote.id));
          setSelectedNote({});
          setIsEdit(false);
          setIsDelete(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isDelete]);

  return (
    <header>
      <div className="tools">
        <button
          className="tools__item"
          onClick={createNewNote}
          disabled={isEdit ? true : false}
        >
          <Plus />
        </button>
        <button
          className="tools__item"
          onClick={() => {
            setIsModal(true);
            if (window.innerWidth <= 596) {
              setIsBurgerDown(false);
            }
          }}
          disabled={
            (Object.keys(selectedNote).length === 0) | isEdit ? true : false
          }
        >
          <Trash />
        </button>
        <button
          className="tools__item"
          disabled={Object.keys(selectedNote).length === 0 ? true : false}
          onClick={() => {
            setIsEdit((prevState) => !prevState);
            if (window.innerWidth <= 596) {
              setIsBurgerDown(false);
            }
          }}
        >
          {!isEdit ? <PencilSquare /> : <Check />}
        </button>
      </div>

      {/* компонент який здійснює пошук */}
      <SeacrhBox />
    </header>
  );
};

export default Header;
