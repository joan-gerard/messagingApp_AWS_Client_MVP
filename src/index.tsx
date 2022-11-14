import React from "react";
import ReactDOM from "react-dom/client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import awsExports from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

Amplify.configure(awsExports);

const formFields = {
  signUp: {
    // component
    // email: {
    //   order: 1,
    //   labelHidden: true,
    //   placeholder: "email ph",
    //   isRequired: true,
    //   label: "email label:",
    // },
    family_name: {
      order: 2,
      labelHidden: true,
      placeholder: "Username",
      isRequired: true,
      label: "",
    },
    password: {
      order: 5,
    },
    confirm_password: {
      order: 6,
    },
    username: {
      order: 3,
      labelHidden: true,
      placeholder: "Email",
      isRequired: true,
      label: "",
    },
  },
};

root.render(
  <BrowserRouter>
    <Authenticator
      formFields={formFields}
      socialProviders={["amazon", "apple", "facebook", "google"]}
    >
      {({ signOut, user }) => <App signOut={signOut} user={user} />}
    </Authenticator>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
