import { FiPlus } from "react-icons/fi";
import {
    formatDayName,
    formatTime,
    getDateKey,
    isSameDate,
} from "../../utils/dates.js";
import styles from "./styles.module.css";

const getShiftPhase = (start) => {
    if (start < "09:00") return "opening";
    if (start < "14:00") return "daytime";
    return "closing";
};

const ShiftCell = ({ employee, day, shift, onAddShift, onEditShift }) => {
    if (!shift) {
        return (
            <button
                className={styles["empty-cell"]}
                type="button"
                aria-label={`Add a shift for ${employee.name} on ${day.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`}
                onClick={() => onAddShift(employee, day)}
            >
                <FiPlus aria-hidden="true" />
                <span>Add</span>
            </button>
        );
    }

    const phase = getShiftPhase(shift.start);

    return (
        <button
            className={`${styles["shift-card"]} ${styles[`shift-${phase}`]}`}
            type="button"
            aria-label={`Edit ${employee.name}'s ${formatTime(shift.start)} to ${formatTime(shift.end)} shift`}
            onClick={() => onEditShift(shift)}
        >
            <span className={styles["shift-time"]}>
                {formatTime(shift.start)}
                <span className={styles["time-divider"]}>to</span>
                {formatTime(shift.end)}
            </span>
            <span className={styles["shift-meta"]}>
                <span className={styles["shift-dot"]} />
                {shift.role}
            </span>
        </button>
    );
};

const ShiftGrid = ({ employees, weekDays, shifts, onAddShift, onEditShift }) => (
    <section className={styles["shift-grid"]} id="schedule" aria-labelledby="schedule-title">
        <div className={styles["grid-legend"]}>
            <div>
                <span className={styles["legend-mark"]} />
                <span>{shifts.length} shifts on the board</span>
            </div>
            <div className={styles["phase-legend"]}>
                <span><i className={styles["legend-opening"]} />Open</span>
                <span><i className={styles["legend-daytime"]} />Day</span>
                <span><i className={styles["legend-closing"]} />Close</span>
            </div>
        </div>

        <div className={styles["grid-scroll"]}>
            <div className={styles["grid-table"]} role="grid" aria-labelledby="schedule-title">
                <div className={styles["day-header"]} role="row">
                    <div className={styles["employee-heading"]} role="columnheader">
                        Team member
                    </div>
                    {weekDays.map((day) => {
                        const today = isSameDate(day, new Date());
                        return (
                            <div
                                className={`${styles["day-heading"]} ${today ? styles["day-heading-today"] : ""}`}
                                role="columnheader"
                                key={getDateKey(day)}
                            >
                                <span>{formatDayName(day)}</span>
                                <strong>{day.getDate()}</strong>
                                {today && <small>Today</small>}
                            </div>
                        );
                    })}
                </div>

                {employees.length ? (
                    employees.map((employee) => (
                        <div className={styles["employee-row"]} role="row" key={employee.id}>
                            <div className={styles["employee-info"]} role="rowheader">
                                <span
                                    className={`${styles["employee-avatar"]} ${styles[`avatar-${employee.tone}`]}`}
                                >
                                    {employee.initials}
                                </span>
                                <span className={styles["employee-copy"]}>
                                    <strong>{employee.name}</strong>
                                    <small>{employee.role}</small>
                                </span>
                            </div>
                            {weekDays.map((day) => {
                                const date = getDateKey(day);
                                const shift = shifts.find(
                                    (item) =>
                                        item.employeeId === employee.id &&
                                        item.date === date,
                                );

                                return (
                                    <div className={styles["shift-cell"]} role="gridcell" key={date}>
                                        <ShiftCell
                                            employee={employee}
                                            day={day}
                                            shift={shift}
                                            onAddShift={onAddShift}
                                            onEditShift={onEditShift}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <div className={styles["empty-roster"]}>
                        <strong>No team members match those filters.</strong>
                        <span>Try another name, team, or location.</span>
                    </div>
                )}
            </div>
        </div>
        <p className={styles["grid-footnote"]}>
            Select a shift to edit its hours. Select an open cell to add coverage.
        </p>
    </section>
);

export default ShiftGrid;
