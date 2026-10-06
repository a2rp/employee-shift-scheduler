import { useEffect, useRef, useState } from "react";
import {
    FiCalendar,
    FiChevronDown,
    FiClock,
    FiMapPin,
    FiMenu,
} from "react-icons/fi";
import styles from "./styles.module.css";

const navItems = [
    ["Schedule", "schedule"],
    ["Coverage", "coverage"],
    ["Team", "team"],
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const closeOnOutsideClick = (event) => {
            if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles["header-inner"]}>
                <a className={styles.brand} href="#top" aria-label="Shiftline home">
                    <span className={styles["brand-mark"]}>
                        <FiCalendar aria-hidden="true" />
                    </span>
                    <span className={styles["brand-name"]}>
                        shiftline<span>.</span>
                    </span>
                </a>

                <nav className={styles["desktop-nav"]} aria-label="Main navigation">
                    {navItems.map(([label, target]) => (
                        <a key={target} href={`#${target}`}>
                            {label}
                        </a>
                    ))}
                </nav>

                <div className={styles["header-actions"]}>
                    <div className={styles["location-chip"]}>
                        <FiMapPin aria-hidden="true" />
                        <span>Harbor House</span>
                    </div>
                    <div className={styles["header-divider"]} />
                    <div className={styles.identity}>
                        <span className={styles["identity-avatar"]}>LM</span>
                        <span className={styles["identity-copy"]}>
                            Leigh Morgan
                            <small>Workspace lead</small>
                        </span>
                    </div>
                    <div className={styles["mobile-menu-wrap"]} ref={menuRef}>
                        <button
                            className={styles["mobile-menu-trigger"]}
                            type="button"
                            aria-expanded={menuOpen}
                            aria-haspopup="true"
                            aria-label="Open sections menu"
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <FiMenu aria-hidden="true" />
                            <span>Sections</span>
                            <FiChevronDown aria-hidden="true" />
                        </button>
                        {menuOpen && (
                            <nav
                                className={styles["mobile-menu"]}
                                aria-label="Page sections"
                            >
                                {navItems.map(([label, target], index) => (
                                    <a
                                        key={target}
                                        href={`#${target}`}
                                        onClick={closeMenu}
                                    >
                                        {index === 0 ? <FiCalendar /> : <FiClock />}
                                        <span>{label}</span>
                                    </a>
                                ))}
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
