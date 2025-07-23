import { useEffect, useState } from "react";
import styles from "./TagSelector.module.css";
import SelectInput from "../../libs/common/lib-select-input/SelectInput";
import { multiSelectType } from "../../interfaces/registerSignup";

interface TagSelectorProps {
  label: string;
  name: string;
  placeholder?: string;
  options: {
    assigned: multiSelectType[];
    unassigned: multiSelectType[];
  };
  required?: boolean;
  onReady?: (getAssigned: () => multiSelectType[]) => void;
}

const TagSelector = ({
  label,
  name,
  placeholder,
  options,
  required = false,
  onReady,
}: TagSelectorProps) => {
  const [lockedAssigned, setLockedAssigned] = useState<multiSelectType[]>([]);
  const [sessionAssigned, setSessionAssigned] = useState<multiSelectType[]>([]);
  const [unassigned, setUnassigned] = useState<multiSelectType[]>([]);

  useEffect(() => {
    setLockedAssigned(options.assigned || []);
    setSessionAssigned([]);
    setUnassigned(options.unassigned || []);
  }, [options]);

  useEffect(() => {
    if (onReady) {
      onReady(() => [...lockedAssigned, ...sessionAssigned]);
    }
  }, [lockedAssigned, sessionAssigned, onReady]);

  const handleAdd = (id: string, label: string) => {
    const selected = { label, value: id };
    setSessionAssigned((prev) => [...prev, selected]);
    setUnassigned((prev) => prev.filter((p) => p.value !== id));
  };

  const handleRemove = (id: string) => {
    if (!sessionAssigned.find((p) => p.value === id)) return;

    const removed = sessionAssigned.find((p) => p.value === id);
    if (!removed) return;

    setSessionAssigned((prev) => prev.filter((p) => p.value !== id));
    setUnassigned((prev) => [...prev, removed]);
  };

  return (
    <div className={styles.container}>
      <SelectInput
        label={label}
        name={name}
        type="select"
        value=""
        placeholder={placeholder}
        options={unassigned}
        onChange={(id, label) => handleAdd(id as string, label)}
        required={required}
        disabled={unassigned.length === 0}
      />
      <div className={styles.tags}>
        {/* 🔒 Locked assigned tags (non-removable) */}
        {lockedAssigned.map((item) => (
          <div className={styles.tag} key={item.value}>
            {item.label}
            <span className={styles.locked}>🔒</span>
          </div>
        ))}

        {/* 🆕 Session assigned tags (removable) */}
        {sessionAssigned.map((item) => (
          <div className={styles.tag} key={item.value}>
            {item.label}
            <button
              type="button"
              onClick={() => handleRemove(item.value)}
              aria-label={`Remove ${item.label}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
