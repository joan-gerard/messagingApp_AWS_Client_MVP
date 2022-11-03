interface GroupDetails {
  groupId: string;
  groupName: string;
}

type Message = UserMessage | InfoMessage | GroupDataMessage;

interface InfoMessage {
  type: "info";
  message: string;
}
interface GroupDataMessage {
  type: "groupData";
  data: GroupDetails[];
}

interface UserMessage {
  type: "message";
  message: string;
  from: string;
  date: number;
  mine?: boolean;
}

interface MessageHistory {
  messages: UserMessage[];
}

// App.tsx - start
type JoinOrCreateParams = {
  action: string;
  groupName?: string;
  groupId?: string;
};
type SendMessageParams = {
  message: string;
  groupId: string;
};
type HandleRequestParams = {
  action: "acceptJoinRequest" | "rejectJoinRequest";
  requestId: string;
  groupId: string;
  userId: string;
};
type SetInitialMessagesParams = {
  initialMessages: any[];
  groupId: string;
};
// App.tsx - end
