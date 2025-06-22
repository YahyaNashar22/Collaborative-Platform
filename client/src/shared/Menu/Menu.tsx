import { useState } from "react";
import styles from "./Menu.module.css";

const Menu = ({ data }: { data: { label: string }[] }) => {
  const [collapsesItems, setCollapsesItems] = useState<number[]>([]);

  const handleClick = (itemIndex: number) => {
    if (collapsesItems.includes(itemIndex)) {
      setCollapsesItems((prev) => [
        ...prev.filter((elem) => elem !== itemIndex),
      ]);
    } else setCollapsesItems((prev) => [...prev, itemIndex]);
  };
  return (
    <ul className={`${styles.wrapper} d-f f-dir-col`}>
      {data.map((term: { label: string }, index: number) => (
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime ad
            fugit eligendi ullam necessitatibus enim eius, modi tempora, odio a
            earum cumque deleniti assumenda corporis, quos repellendus!
            Pariatur, maxime eius? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Provident distinctio sapiente nihil neque nobis
            recusandae et porro enim aut nulla debitis, odit voluptatibus.
            Rerum, iure? Possimus recusandae voluptatum corrupti iure.
          </div>
        </div>
      ))}
    </ul>
  );
};

export default Menu;
