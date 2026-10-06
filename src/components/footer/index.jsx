import { FiArrowUpRight, FiMail } from "react-icons/fi";
import styles from "./styles.module.css";

const socialLinks = [
    ["Portfolio", "https://www.ashishranjan.net"],
    ["GitHub", "https://github.com/a2rp"],
    ["CodePen", "https://codepen.io/ash1198"],
    ["LinkedIn", "https://www.linkedin.com/in/aashishranjan"],
    ["Facebook", "https://www.facebook.com/theash.ashish/"],
    ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1"],
    ["Email", "mailto:ash.ranjan09@gmail.com"],
];

const supportLinks = [
    ["Support", "https://a2rp-donation-page.netlify.app/"],
    ["Buy Me a Coffee", "https://buymeacoffee.com/ashishranjan"],
    ["Patreon", "https://www.patreon.com/ashishranjan"],
];

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles["footer-main"]}>
            <div className={styles["footer-owner"]}>
                <a
                    className={styles["footer-logo"]}
                    href="https://www.ashishranjan.net"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Ashish Ranjan portfolio"
                >
                    <img
                        src={`${import.meta.env.BASE_URL}logo.png`}
                        alt="Ashish Ranjan logo"
                    />
                </a>
                <p>
                    © {new Date().getFullYear()} {" "}
                    <a href="https://github.com/a2rp" target="_blank" rel="noreferrer">
                        Ashish Ranjan
                    </a>
                    . All rights reserved.
                </p>
            </div>

            <div className={styles["footer-link-groups"]}>
                <div className={styles["footer-link-group"]}>
                    <span>Links</span>
                    {socialLinks.map(([label, href]) => (
                        <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                            {label === "Email" && <FiMail aria-hidden="true" />}
                            {label}
                            <FiArrowUpRight aria-hidden="true" />
                        </a>
                    ))}
                </div>
                <div className={styles["footer-link-group"]}>
                    <span>Support</span>
                    {supportLinks.map(([label, href]) => (
                        <a key={label} href={href} target="_blank" rel="noreferrer">
                            {label}
                            <FiArrowUpRight aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
        <div className={styles["footer-bottom"]}>
            <span>Shiftline / Harbor House roster</span>
            <a href="#top">Back to top <FiArrowUpRight aria-hidden="true" /></a>
        </div>
    </footer>
);

export default Footer;
