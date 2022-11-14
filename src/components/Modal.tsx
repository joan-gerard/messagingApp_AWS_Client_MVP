import "./Modal.css";
import { Button } from "@aws-amplify/ui-react";

export const Modal = ({ handleClose, show, children }: any) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <Button size="small" onClick={handleClose}>
          Close
        </Button>
      </section>
    </div>
  );
};
