import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/great-vibes/400.css";
import "./styles/index.css";
import { InvitationApp } from "./invitation/Invitation.jsx";

createRoot(document.getElementById("root")).render(<React.StrictMode><InvitationApp /></React.StrictMode>);
