import styles from "./Button.module.css";

type Props = {
  text: string;
  theme?: Theme;
  size?: Size;
  clickHandler: () => void;
};
type Theme = "primary" | "dangerous";
type Size = "sm" | "md" | "lg";

const Button = ({
  text,
  clickHandler,
  theme = "primary",
  size = "md",
}: Props) => {
  return (
    <button
      onClick={clickHandler}
      className={[styles.button, styles[theme], styles[size]].join(" ")}>
      {text}
    </button>
  );
};

export default Button;
