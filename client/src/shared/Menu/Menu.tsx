import { useState } from "react";
import styles from "./Menu.module.css";

const Menu = ({ data }: { data: { label: string; content: string }[] }) => {
  const [collapsesItems, setCollapsesItems] = useState<number[]>([]);

  const handleClick = (itemIndex: number) => {
    if (collapsesItems.includes(itemIndex)) {
      setCollapsesItems((prev) => prev.filter((elem) => elem !== itemIndex));
    } else {
      setCollapsesItems((prev) => [...prev, itemIndex]);
    }
  };
  return (
    <ul className={`${styles.wrapper} d-f f-dir-col`}>
      {data.map((term, index) => (
        <div
          key={index}
          className={`${styles.containerItem} ${
            collapsesItems.includes(index) ? styles.collapsas : ""
          }`}
        >
          <li
            className={`${styles.item} d-f align-center justify-between w-100 pointer`}
            onClick={() => handleClick(index)}
          >
            <div className={`bold ${styles.left}`}>{term.label}</div>
            <div className={`${styles.right} purple`}>{">"}</div>
          </li>
          <div
            className={`${styles.collapsesContent} ${
              collapsesItems.includes(index) ? styles.show : ""
            } align-text`}
          >
            {term.content}
          </div>
        </div>
      ))}
    </ul>
  );
};

export default Menu;
