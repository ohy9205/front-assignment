"use client";

import styles from "./Checkbox.module.css";

type Props = {
  value: string;
  checked?: boolean;
};

const Checkbox = ({ checked = false, value }: Props) => {
  return (
    <>
      <input
        type="checkbox"
        className={styles.input}
        id={value}
        defaultChecked={checked}
      />
      <span className={styles.span}></span>
    </>
  );
};

export default Checkbox;
