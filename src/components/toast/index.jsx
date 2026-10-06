import { FiCheckCircle, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const Toast = ({ message, onDismiss }) => (
    <div className={styles.toast} role="status" aria-live="polite">
        <FiCheckCircle aria-hidden="true" />
        <span>{message}</span>
        <button type="button" aria-label="Dismiss message" onClick={onDismiss}>
            <FiX aria-hidden="true" />
        </button>
    </div>
);

export default Toast;
