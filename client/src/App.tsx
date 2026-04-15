import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Contact,
  GraduationConsole,
  GraduationInvite,
  Home,
  NotFoundPage,
  Resume,
  RootPage,
  RSVP,
} from "./pages";
import { ScreenSizeProvider } from "./providers";

import "react-responsive-modal/styles.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-toastify/dist/ReactToastify.css";
import "./css/Colors.css";

import "./css/Global.css";
import "./css/Input.css";
import "./css/Text.css";
import "./css/Flex.css";
import "./css/Spacing.css";
import "./css/Positioning.css";
import "./css/Rounding.css";
import "./css/Fonts.css";
import { SnackbarProvider } from "notistack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/graduation/invite",
        element: <GraduationInvite />,
      },
      {
        path: "/graduation/rsvp",
        element: <RSVP />,
      },
      {
        path: "/graduation/console",
        element: <GraduationConsole />,
      },
      {
        path: "/*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={4000}
    >
      <ScreenSizeProvider>
        <RouterProvider router={router} />
      </ScreenSizeProvider>
    </SnackbarProvider>
  );
}

export default App;
