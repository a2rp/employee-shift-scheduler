import { useEffect, useState } from "react";
import { FiClock, FiTrash2, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const getInitialForm = (shift) => ({
    id: shift?.id || "",
    employeeId: shift?.employeeId || "",
    date: shift?.date || "",
    start: shift?.start || "09:00",
    end: shift?.end || "17:00",
    breakMinutes: shift?.breakMinutes ?? 30,
    role: shift?.role || "",
    location: shift?.location || "Harbor House",
});

const ShiftDialog = ({ employees, shift, onClose, onSave, onDelete }) => {
    const [form, setForm] = useState(() => getInitialForm(shift));
    const [error, setError] = useState("");
    const editing = Boolean(shift?.id);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [onClose]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            [name]: name === "breakMinutes" ? Number(value) : value,
        }));
        setError("");
    };

    const handleEmployeeChange = (event) => {
        const employeeId = event.target.value;
        const employee = employees.find((person) => person.id === employeeId);
        setForm((current) => ({
            ...current,
            employeeId,
            role: employee?.role || "",
            location: employee?.location || current.location,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.employeeId || !form.date) {
            setError("Choose a team member and a date to continue.");
            return;
        }
        if (form.end <= form.start) {
            setError("The end time needs to be later than the start time.");
            return;
        }

        onSave(form);
    };

    return (
        <div
            className={styles.backdrop}
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="shift-dialog-title"
            >
                <div className={styles["dialog-heading"]}>
                    <span className={styles["dialog-icon"]}>
                        <FiClock aria-hidden="true" />
                    </span>
                    <div>
                        <span>{editing ? "UPDATE THE ROSTER" : "ADD TO THE ROSTER"}</span>
                        <h2 id="shift-dialog-title">{editing ? "Edit this shift" : "Plan a shift"}</h2>
                    </div>
                    <button
                        className={styles["close-button"]}
                        type="button"
                        aria-label="Close shift form"
                        onClick={onClose}
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </div>

                <form className={styles["shift-form"]} onSubmit={handleSubmit}>
                    <label className={styles["field-label"]}>
                        Team member
                        <select
                            name="employeeId"
                            value={form.employeeId}
                            onChange={handleEmployeeChange}
                            required
                        >
                            <option value="" disabled>Select a team member</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name} - {employee.role}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className={styles["field-row"]}>
                        <label className={styles["field-label"]}>
                            Date
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className={styles["field-label"]}>
                            Location
                            <select
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                            >
                                <option value="Harbor House">Harbor House</option>
                                <option value="Market Hall">Market Hall</option>
                            </select>
                        </label>
                    </div>

                    <div className={`${styles["field-row"]} ${styles["time-row"]}`}>
                        <label className={styles["field-label"]}>
                            Starts
                            <input
                                type="time"
                                name="start"
                                value={form.start}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className={styles["field-label"]}>
                            Ends
                            <input
                                type="time"
                                name="end"
                                value={form.end}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className={styles["field-label"]}>
                            Break
                            <select
                                name="breakMinutes"
                                value={form.breakMinutes}
                                onChange={handleChange}
                            >
                                <option value={0}>No break</option>
                                <option value={15}>15 min</option>
                                <option value={30}>30 min</option>
                                <option value={45}>45 min</option>
                                <option value={60}>60 min</option>
                            </select>
                        </label>
                    </div>

                    {error && <p className={styles["form-error"]} role="alert">{error}</p>}

                    <div className={styles["form-footer"]}>
                        {editing ? (
                            <button
                                className={styles["delete-button"]}
                                type="button"
                                onClick={() => onDelete(shift.id)}
                            >
                                <FiTrash2 aria-hidden="true" />
                                Remove shift
                            </button>
                        ) : (
                            <span className={styles["form-hint"]}>Changes are saved on this device.</span>
                        )}
                        <div className={styles["form-actions"]}>
                            <button className={styles["cancel-button"]} type="button" onClick={onClose}>
                                Cancel
                            </button>
                            <button className={styles["save-button"]} type="submit">
                                {editing ? "Save changes" : "Add shift"}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ShiftDialog;
