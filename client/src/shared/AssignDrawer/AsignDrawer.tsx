import { useState } from "react";
import styles from "./AsignDrawer.module.css";
import LibButton from "../../libs/common/lib-button/LibButton";

type AssignModalProps = {
  requestId: string;
  onClose: () => void;
};

const AssignModal = ({ requestId, onClose }: AssignModalProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Replace with actual provider list
  const providers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Ali Saeed" },
  ];

  const handleAssign = () => {
    if (!selectedProvider) return;

    // TODO: call API to assign provider here

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Assign Request to Provider</h3>
        <select
          className={styles.select}
          value={selectedProvider || ""}
          onChange={(e) => setSelectedProvider(e.target.value)}
        >
          <option value="">-- Select a Provider --</option>
          {providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>

        <div className={styles.actions}>
          <LibButton label="Cancel" onSubmit={onClose} outlined />
          <LibButton
            label="Assign"
            onSubmit={handleAssign}
            bold
            disabled={!selectedProvider}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
