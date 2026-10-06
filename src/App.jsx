import { useEffect, useMemo, useState } from "react";
import Header from "./components/header/index.jsx";
import PlannerHeading from "./components/plannerHeading/index.jsx";
import ShiftGrid from "./components/shiftGrid/index.jsx";
import CoveragePanel from "./components/coveragePanel/index.jsx";
import TeamPanel from "./components/teamPanel/index.jsx";
import ShiftDialog from "./components/shiftDialog/index.jsx";
import Footer from "./components/footer/index.jsx";
import Toast from "./components/toast/index.jsx";
import { createStarterShifts, employees } from "./data/roster.js";
import {
    addDays,
    formatWeekRange,
    getDateKey,
    getShiftHours,
    getWeekDays,
    getWeekStart,
} from "./utils/dates.js";
import { readSchedule, saveSchedule } from "./utils/scheduleStorage.js";
import styles from "./App.module.css";

const App = () => {
    const [baseWeekStart] = useState(() => getWeekStart(new Date()));
    const [weekOffset, setWeekOffset] = useState(0);
    const [shifts, setShifts] = useState(() =>
        readSchedule(createStarterShifts(getWeekStart(new Date()))),
    );
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All teams");
    const [location, setLocation] = useState("All locations");
    const [dialogShift, setDialogShift] = useState(null);
    const [toast, setToast] = useState(null);

    const weekStart = useMemo(
        () => addDays(baseWeekStart, weekOffset * 7),
        [baseWeekStart, weekOffset],
    );
    const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);
    const weekStartKey = getDateKey(weekDays[0]);
    const weekEndKey = getDateKey(weekDays[weekDays.length - 1]);
    const weekShifts = useMemo(
        () => shifts.filter((shift) => shift.date >= weekStartKey && shift.date <= weekEndKey),
        [shifts, weekStartKey, weekEndKey],
    );
    const visibleEmployees = useMemo(() => {
        const query = search.trim().toLowerCase();
        return employees.filter((employee) => {
            const matchesQuery =
                !query ||
                [employee.name, employee.role, employee.department, employee.location]
                    .join(" ")
                    .toLowerCase()
                    .includes(query);
            const matchesDepartment =
                department === "All teams" || employee.department === department;
            const matchesLocation =
                location === "All locations" ||
                employee.location === location ||
                weekShifts.some(
                    (shift) =>
                        shift.employeeId === employee.id && shift.location === location,
                );

            return matchesQuery && matchesDepartment && matchesLocation;
        });
    }, [department, location, search, weekShifts]);
    const visibleEmployeeIds = useMemo(
        () => new Set(visibleEmployees.map((employee) => employee.id)),
        [visibleEmployees],
    );
    const visibleShifts = useMemo(
        () =>
            weekShifts.filter(
                (shift) =>
                    visibleEmployeeIds.has(shift.employeeId) &&
                    (location === "All locations" || shift.location === location),
            ),
        [location, visibleEmployeeIds, weekShifts],
    );
    const scheduledHours = weekShifts.reduce(
        (total, shift) => total + getShiftHours(shift),
        0,
    );
    const openSlots = weekDays.reduce((total, day) => {
        const assigned = weekShifts.filter((shift) => shift.date === getDateKey(day)).length;
        return total + Math.max(0, 6 - assigned);
    }, 0);
    const teamCount = new Set(weekShifts.map((shift) => shift.employeeId)).size;
    const isCurrentWeek = weekOffset === 0;

    useEffect(() => {
        saveSchedule(shifts);
    }, [shifts]);

    useEffect(() => {
        if (!toast) return undefined;
        const timeout = window.setTimeout(
            () => setToast(null),
            toast.type === "error" ? 5000 : 3000,
        );
        return () => window.clearTimeout(timeout);
    }, [toast]);

    const showToast = (message, type = "success") => setToast({ message, type });

    const addShift = (employee, day) => {
        const selectedEmployee = employee || visibleEmployees[0] || employees[0];
        setDialogShift({
            employeeId: selectedEmployee.id,
            date: getDateKey(day || weekDays[0]),
            start: "09:00",
            end: "17:00",
            breakMinutes: 30,
            role: selectedEmployee.role,
            location: selectedEmployee.location,
        });
    };

    const saveShift = (form) => {
        const sameDayShift = shifts.some(
            (shift) =>
                shift.id !== form.id &&
                shift.employeeId === form.employeeId &&
                shift.date === form.date,
        );

        if (sameDayShift) {
            const employeeName = employees.find(
                (employee) => employee.id === form.employeeId,
            )?.name || "This team member";
            const shiftDate = new Date(`${form.date}T12:00:00`).toLocaleDateString(
                undefined,
                { weekday: "long", month: "short", day: "numeric" },
            );
            showToast(
                `${employeeName} already has a shift on ${shiftDate}. Choose a different day or team member.`,
                "error",
            );
            return;
        }

        const conflict = shifts.some(
            (shift) =>
                shift.id !== form.id &&
                shift.employeeId === form.employeeId &&
                shift.date === form.date &&
                form.start < shift.end &&
                shift.start < form.end,
        );

        if (conflict) {
            showToast("That time overlaps with another shift for this team member.", "error");
            return;
        }

        const savedShift = {
            ...form,
            id: form.id || `shift-${Date.now()}`,
            role: form.role || employees.find((person) => person.id === form.employeeId)?.role || "Team member",
        };

        setShifts((current) =>
            form.id
                ? current.map((shift) => (shift.id === form.id ? savedShift : shift))
                : [...current, savedShift],
        );
        setDialogShift(null);
        showToast(form.id ? "Shift changes saved." : "Shift added to the roster.");
    };

    const deleteShift = (shiftId) => {
        setShifts((current) => current.filter((shift) => shift.id !== shiftId));
        setDialogShift(null);
        showToast("Shift removed from the roster.");
    };

    return (
        <div className={styles["app-shell"]}>
            <a className={styles["skip-link"]} href="#schedule">Skip to the roster</a>
            <Header />
            <main className={styles["page-content"]}>
                <PlannerHeading
                    weekRange={formatWeekRange(weekDays)}
                    isCurrentWeek={isCurrentWeek}
                    shiftCount={weekShifts.length}
                    scheduledHours={scheduledHours}
                    openSlots={openSlots}
                    teamCount={teamCount}
                    onPreviousWeek={() => setWeekOffset((offset) => offset - 1)}
                    onNextWeek={() => setWeekOffset((offset) => offset + 1)}
                    onCurrentWeek={() => setWeekOffset(0)}
                    onAddShift={() => addShift(null, weekDays[0])}
                    search={search}
                    onSearchChange={setSearch}
                    department={department}
                    onDepartmentChange={setDepartment}
                    location={location}
                    onLocationChange={setLocation}
                />

                <ShiftGrid
                    employees={visibleEmployees}
                    weekDays={weekDays}
                    shifts={visibleShifts}
                    onAddShift={addShift}
                    onEditShift={setDialogShift}
                />

                <div className={styles["insight-grid"]}>
                    <CoveragePanel weekDays={weekDays} shifts={weekShifts} />
                    <TeamPanel employees={employees} shifts={weekShifts} />
                </div>

                <Footer />
            </main>

            {dialogShift && (
                <ShiftDialog
                    employees={employees}
                    shift={dialogShift}
                    onClose={() => setDialogShift(null)}
                    onSave={saveShift}
                    onDelete={deleteShift}
                />
            )}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onDismiss={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default App;
