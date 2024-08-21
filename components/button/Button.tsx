import styles from "./Button.module.css";

type Props = {
  text: string;
  theme?: Theme;
  size?: Size;
};
type Theme = "primary" | "dangerous";
type Size = "sm" | "md" | "lg";

const Button = ({ text, theme = "primary", size = "md" }: Props) => {
  return (
    <button className={`${styles.button} ${styles[theme]} ${styles[size]}`}>
      {text}
    </button>
  );
};

export default Button;
