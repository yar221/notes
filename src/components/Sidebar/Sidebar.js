import React, { useState, useEffect, useContext } from "react";
import "./sidebar.scss";
import ListItem from "../ListItem/ListItem";
import Context from "../../context/context";
import { DBServiceI } from "../../DBService";

const Sidebar = () => {

  const { searchedText, list, setList, isBurgerDown } = useContext(Context);
  
  useEffect(() => {
    DBServiceI.getAllNotes().then((res) => {
      setList(res);
    });
  }, []);
  
  // Если searchedText изменяется, фильтруем массив заметок
  useEffect(() => {
    if (searchedText === "") {
      // Если строка поиска пустая, показываем все заметки
      DBServiceI.getAllNotes().then((res) => {
        setList(res);
      });
    } else {
      // Фильтруем заметки по строке поиска
      const searchResults = list.filter(
        (obj) =>
          obj.title.toLowerCase().includes(searchedText.toLowerCase()) ||
          obj.text.toLowerCase().includes(searchedText.toLowerCase())
      );

      setList(searchResults);
    }
  }, [searchedText]);
  
  return (
    <div className="sidebar" style={{left: isBurgerDown && '0'}}>
      <ul className="list">
        {[...list].reverse().map((item, key) => (
          <ListItem key={key} note={item} />
        ))}
        {list.length === 0 ? (
          searchedText !== "" ? (
            <div className="list__undefinedels">Таких нотаток не існує</div>
          ) : (
            <div className="list__undefinedels">Нотаток поки нема</div>
          )
        ) : null}
      </ul>
    </div>
  );
}

export default Sidebar