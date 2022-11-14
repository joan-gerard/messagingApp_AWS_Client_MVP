import { useState } from "react";
import { Modal } from "../components/Modal";
import { Button } from "@aws-amplify/ui-react";

interface Props {
  onSubmit: ({
    action,
    groupName,
  }: {
    action: string;
    groupName: string;
  }) => void;
}

export const CreateGroup = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const create = () => {
    onSubmit({
      groupName: name,
      action: "createGroup",
    });
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <h2>Create Group</h2>
        <div>
          <span>Group Name</span>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <Button onClick={() => create()}>Create</Button>
      </Modal>
      <Button
        size="small"
        onClick={() => setShowModal(true)}
        className="createGroup-button"
      >
        Create
      </Button>
    </>
  );
};
