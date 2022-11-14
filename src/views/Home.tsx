import { Link } from "react-router-dom";
import { AiFillWechat } from "react-icons/ai";
import { CreateGroup } from "./CreateGroup";
import { JoinGroup } from "./JoinGroup";
import { Button, Text } from "@aws-amplify/ui-react";

interface HomeProps {
  groups: GroupDetails[];
  listMyGroups: () => void;
  joinOrCreate: (data: {
    action: string;
    groupName?: string;
    groupId?: string;
  }) => void;
  setViewChatID: (groupId: string) => void;
}

export const Home = ({
  groups,
  listMyGroups,
  joinOrCreate,
  setViewChatID,
}: HomeProps) => {
  const joinGroup = ({
    action,
    groupId,
  }: {
    action: string;
    groupId: string;
  }) => {
    joinOrCreate({
      action,
      groupId,
    });
  };
  const createGroup = ({
    action,
    groupName,
  }: {
    action: string;
    groupName: string;
  }) => {
    joinOrCreate({
      action,
      groupName,
    });
  };

  return (
    <div className="group__list">
      <div className="joinOrCreateGroup-container">
        <JoinGroup onSubmit={joinGroup} />
        <CreateGroup onSubmit={createGroup} />
      </div>
      <Text variation="tertiary" className="">Your groups:</Text>
      {groups.map(({ groupName, groupId }) => {
        return (
          <div
            key={groupId}
            className="group__name"
            onClick={() => setViewChatID(groupId)}
          >
            <h4>{groupName}</h4>
            {/* <h2>{groupId}</h2> */}
            {/* <Link to={`group/${groupId}`}>
              <AiFillWechat />
            </Link> */}
          </div>
        );
      })}
      {/* <button onClick={listMyGroups}>Refresh Group</button> */}
    </div>
  );
};

// start
