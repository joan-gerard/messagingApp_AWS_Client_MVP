import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Button } from "@aws-amplify/ui-react";
import { Route, Link, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home } from "./views/Home";
import { MessageInterface } from "./views/MessageInterface";
import "./App.css";

const websocketUrl = process.env.REACT_APP_WS_URL;

function App(props: { signOut: ((data?: any) => void) | undefined }) {
  const [messages, setMessages] = useState<Record<string, any[]>>({});
  const [socket, setSocket] = useState<WebSocket>();
  const [groups, setGroups] = useState<GroupDetails[]>([]);

  const websocketConnect = async () => {
    if (socket) return;
    const user = await Auth.currentSession();
    const token = user.getIdToken().getJwtToken();

    const ws = new WebSocket(websocketUrl + `?token=${token}`);

    setSocket(ws);
  };

  useEffect(() => {
    websocketConnect();
  }, []);

  const listMyGroups = () => {
    const data = {
      action: "listMyGroups",
    };
    socket?.send(JSON.stringify(data));
    return;
  };

  socket?.addEventListener("open", () => {
    listMyGroups();
  });

  socket?.addEventListener("message", function (event) {
    try {
      const messageData = JSON.parse(event.data);
      console.log("messageData", messageData);
      if (messageData.message === "Internal server error") return;

      switch (messageData.type) {
        case "err":
          toast(messageData.message);
          return;
        case "message":
          const { groupId, ...rest } = messageData;

          setMessages({
            ...messages,
            [groupId]: [...messages[groupId], rest],
          });
          return;
        case "groupData":
          setGroups(messageData.data);
          return;
        case "info":
          toast(messageData.message);
          return;
        default:
          toast(`unrecognised message type: ${messageData.type}`);
      }
    } catch (e) {
      console.log("error in event listener", e);
      //toast("unable to parse the event");
    }
  });
  socket?.addEventListener("close", function (event) {
    console.log("Websocket disconnected");
    setSocket(undefined);
  });

  const joinOrCreate = (data: JoinOrCreateParams) => {
    socket?.send(JSON.stringify(data));
    setTimeout(() => {
      listMyGroups();
    }, 4000);
  };

  const sendMessage = ({ message, groupId }: SendMessageParams) => {
    const data = {
      action: "message",
      message,
      groupId,
    };

    socket?.send(JSON.stringify(data));
    setMessages({
      ...messages,
      [groupId]: [
        ...(messages[groupId] || []),
        { message, mine: true, type: "message" },
      ],
    });
  };

  const handleRequest = ({
    action,
    requestId,
    groupId,
    userId,
  }: HandleRequestParams) => {
    const data = {
      action,
      requestId,
      groupId,
      userId,
    };

    socket?.send(JSON.stringify(data));
  };

  const setInitialMessages = ({
    initialMessages,
    groupId,
  }: SetInitialMessagesParams) => {
    setMessages({
      ...messages,
      [groupId]: [...initialMessages],
    });

    console.log({ storedMessages: messages });
  };

  return (
    <div className="App">
      <ToastContainer />
      {!socket ? (
        <>
          <h2>Connecting</h2>
        </>
      ) : (
        <div>
          <nav className="nav">
            <Link to="">
              <button>Home</button>
            </Link>
            <button onClick={props.signOut}>Sign Out</button>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  groups={groups}
                  listMyGroups={listMyGroups}
                  joinOrCreate={joinOrCreate}
                />
              }
            />
            {/*
            <Route path="/creategroup/" element={<CreateGroup />} />
          */}
            <Route
              path="/group/:id"
              element={
                <MessageInterface
                  messages={messages}
                  sendMessage={sendMessage}
                  setInitialMessages={setInitialMessages}
                  handleRequest={handleRequest}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
