import { useEffect, useState } from "react";
import styles from "./TagSelector.module.css";
import SelectInput from "../../libs/common/lib-select-input/SelectInput";

interface TagSelectorProps {
  label: string;
  name: string;
  placeholder?: string;
  options: {
    assigned: { [key: string]: string }[];
    unassigned: { [key: string]: string }[];
  };
  required?: boolean;
  interestedProviders?: string[];
  onReady?: (getAssigned: () => { [key: string]: string }[]) => void;
}

const TagSelector = ({
  label,
  name,
  placeholder,
  options,
  required = false,
  interestedProviders = [],
  onReady,
}: TagSelectorProps) => {
  const [lockedAssigned, setLockedAssigned] = useState<
    { [key: string]: string }[]
  >([]);
  const [sessionAssigned, setSessionAssigned] = useState<
    { [key: string]: string }[]
  >([]);
  const [unassigned, setUnassigned] = useState<{ [key: string]: string }[]>([]);
  const [, setInitialAssigned] = useState<{ [key: string]: string }[]>([]);

  useEffect(() => {
    const assigned = options.assigned || [];
    const unassignedClean =
      options.unassigned?.filter(
        (u) => !assigned.some((a) => a.value === u.value)
      ) || [];

    setLockedAssigned(assigned);
    setInitialAssigned(assigned);
    setSessionAssigned([]);
    setUnassigned(unassignedClean);
  }, [options]);

  useEffect(() => {
    if (!onReady) return;

    const currentAssigned = [...lockedAssigned, ...sessionAssigned];

    onReady(() => currentAssigned);
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

  // const areTagListsEqual = (
  //   a: { [key: string]: string }[],
  //   b: { [key: string]: string }[]
  // ) => {
  //   if (a.length !== b.length) return false;

  //   const aSorted = [...a].sort((x, y) => x.value.localeCompare(y.value));
  //   const bSorted = [...b].sort((x, y) => x.value.localeCompare(y.value));

  //   return aSorted.every((item, index) => item.value === bSorted[index].value);
  // };

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
        interestedProviders={interestedProviders}
      />
      {lockedAssigned.length === 0 &&
        sessionAssigned.length === 0 &&
        unassigned.length === 0 && (
          <div className={styles.noProvidersMessage}>
            There is no provider for this service yet.
          </div>
        )}

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
