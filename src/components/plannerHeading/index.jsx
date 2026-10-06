import {
    FiCalendar,
    FiChevronDown,
    FiChevronLeft,
    FiChevronRight,
    FiClock,
    FiCopy,
    FiPlus,
    FiSearch,
    FiUsers,
} from "react-icons/fi";
import { departments, locations } from "../../data/roster.js";
import styles from "./styles.module.css";

const PlannerHeading = ({
    weekRange,
    isCurrentWeek,
    shiftCount,
    scheduledHours,
    openSlots,
    teamCount,
    onPreviousWeek,
    onNextWeek,
    onCurrentWeek,
    onDuplicatePrevious,
    onAddShift,
    search,
    onSearchChange,
    department,
    onDepartmentChange,
    location,
    onLocationChange,
}) => (
    <section className={styles["planner-heading"]} id="top">
        <div className={styles["hero-topline"]}>
            <span>HARBOR HOUSE / PEOPLE OPERATIONS</span>
            <span className={styles["open-indicator"]}>
                <span />
                ROSTER IN PROGRESS
            </span>
        </div>

        <div className={styles["hero-main"]}>
            <div className={styles["hero-copy"]}>
                <p className={styles.eyebrow}>WEEKLY SHIFT PLANNER</p>
                <h1>
                    Put the week
                    <br />
                    <span>in rhythm.</span>
                </h1>
                <p className={styles["hero-description"]}>
                    A clear roster for the people who keep Harbor House moving.
                </p>
            </div>

            <div className={styles["date-picker"]} aria-label="Choose a week">
                <button
                    className={styles["date-arrow"]}
                    type="button"
                    aria-label="Show previous week"
                    onClick={onPreviousWeek}
                >
                    <FiChevronLeft aria-hidden="true" />
                </button>
                <div className={styles["date-range"]}>
                    <span>{isCurrentWeek ? "CURRENT WEEK" : "SCHEDULE WEEK"}</span>
                    <strong>{weekRange}</strong>
                </div>
                <button
                    className={styles["date-arrow"]}
                    type="button"
                    aria-label="Show next week"
                    onClick={onNextWeek}
                >
                    <FiChevronRight aria-hidden="true" />
                </button>
                {!isCurrentWeek && (
                    <button
                        className={styles["today-button"]}
                        type="button"
                        onClick={onCurrentWeek}
                    >
                        <FiCalendar aria-hidden="true" />
                        This week
                    </button>
                )}
            </div>
        </div>

        <div className={styles["week-ribbon"]}>
            <div className={styles["ribbon-label"]}>
                <span className={styles["ribbon-icon"]}>
                    <FiCalendar aria-hidden="true" />
                </span>
                <span>
                    <small>THE ROSTER</small>
                    <strong>One week, at a glance</strong>
                </span>
            </div>
            <div className={styles["ribbon-stat"]}>
                <strong>{shiftCount}</strong>
                <span>shifts planned</span>
            </div>
            <div className={styles["ribbon-stat"]}>
                <strong>{scheduledHours.toFixed(0)}<small>h</small></strong>
                <span>scheduled hours</span>
            </div>
            <div className={`${styles["ribbon-stat"]} ${styles["ribbon-stat-alert"]}`}>
                <strong>{openSlots}</strong>
                <span>open cover slots</span>
            </div>
            <div className={styles["ribbon-team"]}>
                <FiUsers aria-hidden="true" />
                <strong>{teamCount}</strong>
                <span>people on rota</span>
            </div>
        </div>

        <div className={styles["toolbar"]}>
            <div className={styles["toolbar-title"]}>
                <span>01 / THE PLAN</span>
                <h2 id="schedule-title">Weekly roster</h2>
            </div>
            <div className={styles["toolbar-controls"]}>
                <label className={styles["search-control"]}>
                    <FiSearch aria-hidden="true" />
                    <input
                        type="search"
                        aria-label="Search the team"
                        placeholder="Find a person"
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                    />
                </label>
                <label className={styles["select-control"]}>
                    <FiUsers aria-hidden="true" />
                    <select
                        aria-label="Filter by team"
                        value={department}
                        onChange={(event) => onDepartmentChange(event.target.value)}
                    >
                        {departments.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <FiChevronDown aria-hidden="true" />
                </label>
                <label className={styles["select-control"]}>
                    <FiCalendar aria-hidden="true" />
                    <select
                        aria-label="Filter by location"
                        value={location}
                        onChange={(event) => onLocationChange(event.target.value)}
                    >
                        {locations.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <FiChevronDown aria-hidden="true" />
                </label>
                <button
                    className={styles["copy-button"]}
                    type="button"
                    onClick={onDuplicatePrevious}
                    title="Copy shifts from the previous week"
                >
                    <FiCopy aria-hidden="true" />
                    <span>Copy last week</span>
                </button>
                <button
                    className={styles["add-button"]}
                    type="button"
                    onClick={onAddShift}
                >
                    <FiPlus aria-hidden="true" />
                    <span>Add shift</span>
                </button>
            </div>
        </div>
        <div className={styles["toolbar-note"]}>
            <FiClock aria-hidden="true" />
            <span>Times shown in local store time</span>
        </div>
    </section>
);

export default PlannerHeading;
