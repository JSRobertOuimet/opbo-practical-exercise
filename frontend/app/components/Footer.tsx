import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer>
            {t("footer.copyright", { year })}
        </footer>
    );
};

export default Footer;
