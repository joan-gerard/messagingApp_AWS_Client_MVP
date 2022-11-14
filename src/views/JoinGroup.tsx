import { useState } from "react";
import { Modal } from "../components/Modal";
import { Button } from "@aws-amplify/ui-react";

interface Props {
  onSubmit: ({ action, groupId }: { action: string; groupId: string }) => void;
}

export const JoinGroup = ({ onSubmit }: Props) => {
  const [groupId, setGroupId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const join = () => {
    onSubmit({
      action: "joinGroup",
      groupId,
    });
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <h2>Join Existing Group</h2>
        <div>
          <span>Group ID</span>
          <input type="text" onChange={(e) => setGroupId(e.target.value)} />
        </div>
        <Button size="small" onClick={() => join()}>
          Join
        </Button>
      </Modal>
      <Button
        size="small"
        onClick={() => setShowModal(true)}
        className="joinGroup-button"
      >
        Join
      </Button>
    </>
  );
};
