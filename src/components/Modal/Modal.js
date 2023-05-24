import React from "react";
import styles from "./Modal.module.scss";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>{props.elements.children}</div>
    </div>
  );
};
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop elements={props} />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default Modal;
