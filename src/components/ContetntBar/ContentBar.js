import React, { useContext } from "react";
import "./contentBar.scss";
import Sidebar from "../Sidebar/Sidebar";
import Workspace from "../Workspace/Workspace";
import { ArrowBarRight, ArrowBarLeft } from "react-bootstrap-icons";
import Context from "../../context/context";

//компонент який з'єдную sidebar та workspace
const ContentBar = () => {
  const { isBurgerDown, setIsBurgerDown } = useContext(Context);

  return (
    <div className="contentbar">
      <div
        className="contentbar__burger"
        onClick={() => setIsBurgerDown((prev) => !prev)}
        style={{ left: isBurgerDown && "250px" }}
      >
        {!isBurgerDown ? <ArrowBarRight /> : <ArrowBarLeft />}
      </div>

      <Sidebar />
      <Workspace />
      {isBurgerDown && (
        <div
          className="contentbar__shadow"
          onClick={() => {
            if (window.innerWidth <= 596) {
              setIsBurgerDown(false);
            }
          }}
        ></div>
      )}
    </div>
  );
};

export default ContentBar;
