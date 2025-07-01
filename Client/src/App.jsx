import "./App.css";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/Layouts/MainLayout";
import RegisterLayout from "./components/Layouts/RegisterLayout";
import Loader from "./components/Loader/Loader";

const Home = React.lazy(() => import("./pages/home/home"));
const Login = React.lazy(() => import("./pages/login/login"));
const Register = React.lazy(() => import("./pages/register/register"));
const Count = React.lazy(() => import("./pages/count/count"));
const Product = React.lazy(() => import("./pages/product/products"));
const Profile = React.lazy(() => import("./pages/profile/profile"));
const Chat = React.lazy(() => import("./pages/chat/chat"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
const ProtectedRoute = React.lazy(() =>
  import("./components/ProtectedRoute/ProtectedRoute")
);

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  {" "}
                  <Home />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/count"
              element={
                <ProtectedRoute>
                  {" "}
                  <Count />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  {" "}
                  <Product />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:username"
              element={
                <ProtectedRoute>
                  {" "}
                  <Profile />{" "}
                </ProtectedRoute>
              }
            />
            <Route path="/chat" element={<Chat />} />
            {/* <Route index element={<Home />} />
            <Route path="/count" element={<Count />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/chat" element={<Chat />} /> */}
          </Route>

          <Route element={<RegisterLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
