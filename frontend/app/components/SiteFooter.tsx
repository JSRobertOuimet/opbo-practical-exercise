import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="sticky top-[100vh] container mx-auto px-4 py-4 text-center text-sm">
            {t("footer.copyright", { year })}
        </footer>
    );
};

export default Footer;
