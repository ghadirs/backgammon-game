import React, { useEffect, useRef, useState } from "react";
import styles from "./basicLayout.module.scss";

interface IProps {
  className?: string;
  children: React.ReactNode;
}

const BasicLayoutComponent: React.FC<IProps> = ({ children, className }) => {
  return (
    <main className={`${styles.mainWrapper} ${className}`}>{children}</main>
  );
};

export default BasicLayoutComponent;
