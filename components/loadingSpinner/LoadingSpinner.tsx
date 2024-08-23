"use client";

import { BarLoader, FadeLoader } from "react-spinners";
import styles from "./LoadingSpinner.module.css";

type Props = {
  type?: Type;
};
type Type = "data" | "page";

const LoadingSpinner = ({ type = "page" }: Props) => {
  return (
    <div className={styles.spinner}>
      {type === "page" ? (
        <FadeLoader color="salmon" />
      ) : (
        <BarLoader color="salmon" />
      )}
    </div>
  );
};

export default LoadingSpinner;
