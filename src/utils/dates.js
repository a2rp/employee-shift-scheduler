export const addDays = (date, amount) => {
    const result = new Date(date);
    result.setDate(result.getDate() + amount);
    return result;
};

export const getWeekStart = (date) => {
    const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
    return result;
};

export const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const getWeekDays = (weekStart) =>
    Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));

export const formatWeekRange = (days) => {
    const firstDay = days[0];
    const lastDay = days[days.length - 1];
    const firstMonth = new Intl.DateTimeFormat("en-US", {
        month: "short",
    }).format(firstDay);
    const lastMonth = new Intl.DateTimeFormat("en-US", {
        month: "short",
    }).format(lastDay);
    const year = lastDay.getFullYear();

    if (firstMonth === lastMonth) {
        return `${firstMonth} ${firstDay.getDate()} - ${lastDay.getDate()}, ${year}`;
    }

    return `${firstMonth} ${firstDay.getDate()} - ${lastMonth} ${lastDay.getDate()}, ${year}`;
};

export const formatDayName = (date) =>
    new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);

export const formatMonthDay = (date) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
        date,
    );

export const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    const options = minutes
        ? { hour: "numeric", minute: "2-digit" }
        : { hour: "numeric" };

    return new Intl.DateTimeFormat("en-US", options).format(date).toLowerCase();
};

export const getShiftHours = (shift) => {
    const [startHour, startMinute] = shift.start.split(":").map(Number);
    const [endHour, endMinute] = shift.end.split(":").map(Number);
    const grossMinutes = endHour * 60 + endMinute - (startHour * 60 + startMinute);
    return Math.max(0, (grossMinutes - Number(shift.breakMinutes || 0)) / 60);
};

export const formatHours = (hours) => `${hours.toFixed(1)}h`;

export const isSameDate = (left, right) => getDateKey(left) === getDateKey(right);
