import React, { useContext } from "react";
import "./DeleteConfirmationModal.scss";
import Context from "../../context/context";

function DeleteConfirmationModal() {
  const { setIsModal, isDelete, setIsDelete } = useContext(Context);

  const onDelete = () => {
    setIsModal(false)
    setIsDelete(true)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">Підтвердіть видалення</h3>
        <p className="modal-text">Ви впевнені, що хочете видалити нотатку?</p>
        <div className="modal-actions">
          <button onClick={onDelete}>Видалити</button>
          <button onClick={() => setIsModal(false)}>Відміна</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
