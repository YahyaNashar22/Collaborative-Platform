import styles from "./LibButton.module.css";

type LibButtonType = {
  label: string;
  outlined?: boolean;
  backgroundColor?: string;
  onSubmit: () => void;
  disabled?: boolean;
  hoverColor?: string;
  styleClass?: string;
  padding?: string;
  color?: string;
  bold?: boolean;
};

const LibButton = ({
  label,
  disabled = false,
  outlined,
  backgroundColor,
  onSubmit,
  hoverColor,
  styleClass,
  padding,
  color,
  bold,
}: LibButtonType) => {
  return (
    <div
      className={`${styles.buttonWrapper} d-f justify-end align-center ${
        outlined ? styles.outlined : ""
      }`}
    >
      <button
        type="submit"
        className={`${styles.button} ${styleClass ? styles[styleClass] : ""} ${
          bold ? "bold" : ""
        } justify-center`}
        style={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : outlined
            ? "transparent"
            : "#6550b4",
          ["--hover-bg" as string]: hoverColor ? hoverColor : "#563db1",
          padding: padding ? padding : "0 10px",
          color: color ? color : "white",
        }}
        onClick={onSubmit}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default LibButton;
