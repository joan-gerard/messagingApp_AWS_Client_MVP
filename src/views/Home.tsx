import { Link } from "react-router-dom";
import { AiFillWechat } from "react-icons/ai";
import { CreateGroup } from "./CreateGroup";
import { JoinGroup } from "./JoinGroup";

interface HomeProps {
  groups: GroupDetails[];
  listMyGroups: () => void;
  joinOrCreate: (data: {
    action: string;
    groupName?: string;
    groupId?: string;
  }) => void;
}

export const Home = ({ groups, listMyGroups, joinOrCreate }: HomeProps) => {
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
    <div className="group__nav">
      <div className="joinOrCreateGroup-container">
        <JoinGroup onSubmit={joinGroup} />
        <CreateGroup onSubmit={createGroup} />
      </div>
      <div className="all-groups">
        {groups.map(({ groupName, groupId }) => {
          return (
            <div key={groupId} className="group__name">
              <h2>{groupName}</h2>
              <p>{groupId}</p>
              {/* <h2>{groupId}</h2> */}
              <Link to={`group/${groupId}`}>
                <AiFillWechat />
              </Link>
            </div>
          );
        })}
      </div>
      <button onClick={listMyGroups}>Refresh Group</button>
    </div>
  );
};
