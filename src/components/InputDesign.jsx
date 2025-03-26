"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import DashboardPage from "./components/dashboard/DashboardPage";
import TablerIconsStylesheet from "./components/layout/TablerIconsStylesheet";

function InputDesign() {
  return (
    <>
      <TablerIconsStylesheet />
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    </>
  );
}

export default InputDesign;
