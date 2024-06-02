import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Contact, Home, Resume, RootPage } from "./pages";
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
    ],
  },
]);

function App() {
  return (
    <ScreenSizeProvider>
      <RouterProvider router={router} />
    </ScreenSizeProvider>
  );
}

export default App;
