import styles from "./libButton.module.css";

type LibButtonType = {
  outlined?: boolean;
  backgroundColor?: string;
  onSubmit: () => void;
  disabled: boolean;
  hoverColor?: string;
};

const LibButton = ({
  disabled,
  outlined,
  backgroundColor,
  onSubmit,
  hoverColor,
}: LibButtonType) => {
  return (
    <div
      className={`${styles.buttonWrapper} d-f justify-end ${
        outlined ? styles.outlined : ""
      }`}
    >
      <button
        type="submit"
        className={styles.button}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : "#6550b4",
          ["--hover-bg" as string]: hoverColor ? hoverColor : "#563db1",
        }}
        onClick={onSubmit}
        disabled={disabled}
      >
        Submit
      </button>
    </div>
  );
};

export default LibButton;
