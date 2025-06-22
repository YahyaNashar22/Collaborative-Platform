import styles from "./Menu.module.css";

const Menu = ({ data }: { data: { label: string }[] }) => {
  return (
    <ul className={`${styles.wrapper} d-f f-dir-col`}>
      {data.map((term: { label: string }, index: number) => (
        <li
          key={index}
          className={`${styles.item} d-f align-center justify-between w-100`}
        >
          <div className={`bold ${styles.left}`}>{term.label}</div>
          <div className={`${styles.right} purple pointer`}>+</div>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
