"use client";

import styles from "./Checkbox.module.css";

type Props = {
  label: React.ReactNode;
  value: string;
  checked?: boolean;
};

const Checkbox = ({ label, checked = false, value }: Props) => {
  return (
    <div className={[styles.checkbox].join("")}>
      <input
        type="checkbox"
        className={styles.input}
        id={value}
        defaultChecked={checked}
      />
      <span className={styles.span}></span>
      <label className={styles.label} htmlFor={value}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
