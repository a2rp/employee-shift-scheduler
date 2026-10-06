const storageKey = "shiftline-schedule-v1";

export const readSchedule = (starterShifts) => {
    try {
        const saved = window.localStorage.getItem(storageKey);
        if (!saved) return starterShifts;

        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : starterShifts;
    } catch {
        return starterShifts;
    }
};

export const saveSchedule = (shifts) => {
    try {
        window.localStorage.setItem(storageKey, JSON.stringify(shifts));
    } catch {
        return false;
    }

    return true;
};
