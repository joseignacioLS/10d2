"use client";

import React, { useContext } from "react";
import styles from "./Toast.module.css";
import { ToastContext } from "@/src/store/toast";

export const Toast: React.FC<{}> = () => {
  const { message, isOpen, type } = useContext(ToastContext);
  if (!isOpen) return null;
  return (
    <div key={type + message} className={`${styles.toast} ${styles[type]}`}>
      {message}
    </div>
  );
};
