import styles from "./LibButton.module.css";

type LibButtonType = {
  label: string;
  outlined?: boolean;
  backgroundColor?: string;
  onSubmit: () => void;
  disabled: boolean;
  hoverColor?: string;
  styleClass?: string;
  padding?: string;
};

const LibButton = ({
  label,
  disabled,
  outlined,
  backgroundColor,
  onSubmit,
  hoverColor,
  styleClass,
  padding,
}: LibButtonType) => {
  return (
    <div
      className={`${styles.buttonWrapper} d-f justify-end align-center ${
        outlined ? styles.outlined : ""
      }`}
    >
      <button
        type="submit"
        className={`${styles.button} ${
          styleClass ? styles[styleClass] : ""
        } justify-center`}
        style={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : outlined
            ? "transparent"
            : "#6550b4",
          ["--hover-bg" as string]: hoverColor ? hoverColor : "#563db1",
          padding: padding ? padding : "0 10px",
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
