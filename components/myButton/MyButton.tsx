// "use client";

import React from "react";
import styles from "./MyButton.module.css";

type Props = {
  text: string;
  theme?: Theme;
  size?: Size;
  onClick?: () => void;
};
type Theme = "primary" | "dangerous";
type Size = "sm" | "md" | "full";

const MyButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ text, onClick, theme = "primary", size = "md" }: Props, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={[styles.button, styles[theme], styles[size]].join(" ")}>
        {text}
      </button>
    );
  }
);

export default MyButton;
