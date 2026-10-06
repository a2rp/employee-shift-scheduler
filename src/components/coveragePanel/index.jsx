import { FiAlertCircle, FiCheck, FiClock } from "react-icons/fi";
import { formatDayName, formatMonthDay, getDateKey } from "../../utils/dates.js";
import styles from "./styles.module.css";

const dailyTarget = 6;

const CoveragePanel = ({ weekDays, shifts }) => {
    const days = weekDays.map((day) => {
        const count = shifts.filter((shift) => shift.date === getDateKey(day)).length;
        const percent = Math.min(100, Math.round((count / dailyTarget) * 100));

        return {
            date: day,
            count,
            percent,
            remaining: Math.max(0, dailyTarget - count),
        };
    });
    const uncovered = days.reduce((total, day) => total + day.remaining, 0);
    const filledDays = days.filter((day) => day.remaining === 0).length;

    return (
        <section className={styles["coverage-panel"]} id="coverage" aria-labelledby="coverage-title">
            <div className={styles["panel-heading"]}>
                <div>
                    <span className={styles["section-index"]}>02 / THE COVERAGE</span>
                    <h2 id="coverage-title">Make every handoff count.</h2>
                    <p>Six planned shifts keep the floor covered each day.</p>
                </div>
                <div className={styles["coverage-summary"]}>
                    {uncovered === 0 ? <FiCheck aria-hidden="true" /> : <FiAlertCircle aria-hidden="true" />}
                    <span>
                        <strong>{uncovered === 0 ? "Coverage is set" : `${uncovered} open ${uncovered === 1 ? "slot" : "slots"}`}</strong>
                        <small>{filledDays} of 7 days fully covered</small>
                    </span>
                </div>
            </div>

            <div className={styles["coverage-list"]}>
                {days.map((day) => (
                    <div className={styles["coverage-row"]} key={getDateKey(day.date)}>
                        <div className={styles["coverage-date"]}>
                            <strong>{formatDayName(day.date)}</strong>
                            <span>{formatMonthDay(day.date)}</span>
                        </div>
                        <div className={styles["coverage-track"]}>
                            <span style={{ width: `${day.percent}%` }} />
                        </div>
                        <div className={styles["coverage-count"]}>
                            <strong>{day.count}<span> / {dailyTarget}</span></strong>
                            {day.remaining ? (
                                <small>{day.remaining} needed</small>
                            ) : (
                                <small className={styles["covered-label"]}>Covered</small>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles["coverage-note"]}>
                <span className={styles["note-photo"]}>
                    <img
                        src={`${import.meta.env.BASE_URL}images/planning-desk.jpg`}
                        alt="Laptop, notebook, and coffee on a planning desk"
                    />
                </span>
                <span>
                    <strong>Make the handoff easy</strong>
                    <small>Pick an open slot to plan your next shift.</small>
                </span>
                <span className={styles["note-right"]}>
                    <FiClock aria-hidden="true" />
                    Slots count one planned employee shift each
                </span>
            </div>
        </section>
    );
};

export default CoveragePanel;
