import { FiArrowUpRight, FiCheckCircle, FiUsers } from "react-icons/fi";
import { formatHours, getShiftHours } from "../../utils/dates.js";
import styles from "./styles.module.css";

const TeamPanel = ({ employees, shifts }) => {
    const teamHours = employees.map((employee) => {
        const hours = shifts
            .filter((shift) => shift.employeeId === employee.id)
            .reduce((total, shift) => total + getShiftHours(shift), 0);
        const percent = Math.min(100, Math.round((hours / employee.targetHours) * 100));

        return { ...employee, hours, percent };
    });
    const peopleScheduled = teamHours.filter((person) => person.hours > 0).length;
    const onTarget = teamHours.filter(
        (person) => person.hours >= person.targetHours * 0.85 && person.hours <= person.targetHours,
    ).length;

    return (
        <section className={styles["team-panel"]} id="team" aria-labelledby="team-title">
            <div className={styles["team-heading"]}>
                <div>
                    <span className={styles["section-index"]}>03 / THE PEOPLE</span>
                    <h2 id="team-title">A fair share of the week.</h2>
                    <p>Hours alongside each person’s weekly target.</p>
                </div>
                <div className={styles["team-total"]}>
                    <FiUsers aria-hidden="true" />
                    <strong>{peopleScheduled}</strong>
                    <span>scheduled</span>
                </div>
            </div>

            <div className={styles["team-list"]}>
                {teamHours.map((person) => (
                    <div className={styles["team-row"]} key={person.id}>
                        <span className={`${styles["person-avatar"]} ${styles[`avatar-${person.tone}`]}`}>
                            {person.initials}
                        </span>
                        <span className={styles["person-copy"]}>
                            <strong>{person.name}</strong>
                            <small>{person.department}</small>
                        </span>
                        <span className={styles["hours-meter"]}>
                            <span>
                                <i style={{ width: `${person.percent}%` }} />
                            </span>
                        </span>
                        <span className={styles["hours-count"]}>
                            <strong>{formatHours(person.hours)}</strong>
                            <small>of {person.targetHours}h</small>
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles["team-foot"]}>
                <span>
                    <FiCheckCircle aria-hidden="true" />
                    {onTarget} people are within 15% of their weekly target
                </span>
                <a href="#schedule">
                    Back to roster
                    <FiArrowUpRight aria-hidden="true" />
                </a>
            </div>
        </section>
    );
};

export default TeamPanel;
