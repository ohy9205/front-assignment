"use client";

import styles from "./Checkbox.module.css";

type Props = {
  value: string;
  checked?: boolean;
  checkHandler: () => void;
};

const Checkbox = ({ checked = false, value, checkHandler }: Props) => {
  return (
    <>
      <input
        type="checkbox"
        className={styles.input}
        id={value}
        checked={checked}
        onChange={checkHandler}
      />
      <span className={styles.span} onClick={checkHandler}></span>
    </>
  );
};

export default Checkbox;
