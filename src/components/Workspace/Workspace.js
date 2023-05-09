import React, { useContext, useEffect, useState } from "react";
import "./workspace.scss";
import Context from "../../context/context";
import { DBServiceI } from "../../DBService";

const Workspace = () => {
  const { selectedNote, setSelectedNote, isEdit, setList, list } =
    useContext(Context);

  const { date, title, text } = selectedNote;

  const [titleArea, setTitleArea] = useState(title || "");
  const [textArea, setTextArea] = useState(text || "");

  const [heightTitle, setHeightTitle] = useState("auto");
  const [height, setHeight] = useState("-webkit-fill-available");
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [textErrorTitle, settextErrorTitle] = useState('');
  
  const textChange = (event) => {
    setTextArea(event.target.value);
    setHeight(`${event.target.scrollHeight}px`);
  };

  const titleChange = (event) => {
    if (isValidTitle) {
      setTitleArea(event.target.value);
      setHeightTitle(`${event.target.scrollHeight}px`);
    }
  };

  const titleKeyDown = (event) => {
    if(titleArea.length >= 100){
      settextErrorTitle('Довжина поля "Заголовок" повинно бути меньше 100');
      setIsValidTitle(false)
    }

    if (event.key === "Enter") {
      settextErrorTitle('У полі "Заголовок" не можна роботи перенос строки');
      setIsValidTitle(false);
    }else if(event.key !== "Enter" && !isValidTitle && titleArea.length <= 100){
      setIsValidTitle(true);
      settextErrorTitle('');
    }

    if(event.key === "Delete" || event.key === "Backspace"){
      setIsValidTitle(true);
      settextErrorTitle('');
    }
  };

  useEffect(() => {
    if (!isEdit && Object.keys(selectedNote).length !== 0) {
      DBServiceI.updateNote({
        ...selectedNote,
        title: titleArea,
        text: textArea,
        date: new Date(),
      })
        .then((message) => {
          setSelectedNote({
            ...selectedNote,
            title: titleArea,
            text: textArea,
            date: new Date(),
          });

          const updatedArray = list.map((obj) => {
            if (obj.id === selectedNote.id) {
              return {
                ...selectedNote,
                title: titleArea,
                text: textArea,
                date: new Date(),
              };
            }
            return obj;
          });

          setList(updatedArray);
        })
        .catch((error) => {
          console.error(error);
        });
        setIsValidTitle(true);
      settextErrorTitle('');
    } else {
      setTitleArea(title || "");
      setTextArea(text || "");
    }
  }, [isEdit]);

  //перевірка, якщо об'єкт пустий, то ми нічого е виводемо на єкран
  if (Object.keys(selectedNote).length === 0) {
    return;
  }

  //налаштування формата дати
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleString("en-US", options);

  const textWithLineBreaks = text.split("\n").map((line, index) => (
    <p key={index} className="workspace__text">
      {line}
      <br />
    </p>
  ));

  return (
    <div className="workspace" style={{ display: isEdit && "flex" }}>
      
      {!isEdit ? (
        <>
          <p className="workspace__date">{formattedDate}</p>
          <p className="workspace__title">{title}</p>
          {/* <p className="workspace__text">{text}</p> */}
          {textWithLineBreaks}
        </>
      ) : (
        <>
          <p className="workspace__date">{formattedDate}</p>
          <textarea
            className="workspace__title-area"
            style={{
              background: !titleArea && "rgb(221 221 221)",
              border: !isValidTitle && "1.5px red solid",
              height: heightTitle,
            }}
            value={titleArea === undefined ? title : titleArea}
            onChange={titleChange}
            onKeyDown={titleKeyDown}
          />
          {!isValidTitle && <p style={{color: 'red', fontSize: 16}}>{textErrorTitle}</p>}
          <textarea
            className="workspace__text-area"
            style={{
              background: !textArea && "rgb(221 221 221)",
              height: height,
            }}
            value={textArea === undefined ? text : textArea}
            onChange={textChange}
          />
        </>
      )}
    </div>
  );
};

export default Workspace;
