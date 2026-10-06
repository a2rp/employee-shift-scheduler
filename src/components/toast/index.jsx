import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const Toast = ({ message, type = "success", onDismiss }) => {
    const ToastIcon =
        type === "error" ? FiAlertCircle : type === "warning" ? FiAlertTriangle : FiCheckCircle;
    const isError = type === "error";

    return (
        <div
            className={`${styles.toast} ${styles[type] || styles.success}`}
            role={isError ? "alert" : "status"}
            aria-atomic="true"
        >
            <ToastIcon aria-hidden="true" />
            <span>{message}</span>
            <button type="button" aria-label="Dismiss message" onClick={onDismiss}>
                <FiX aria-hidden="true" />
            </button>
        </div>
    );
};

export default Toast;
