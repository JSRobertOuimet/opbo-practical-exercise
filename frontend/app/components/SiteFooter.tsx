import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="sticky top-[100vh] mt-12 bg-neutral-100 px-4 pt-8 pb-4">
            <div className="container mx-auto flex flex-col items-center text-center text-sm">
                <img
                    src="/logos/logo-full.svg"
                    alt={t("nav.logo_alt")}
                    className="mb-8 size-32"
                />
                {t("footer.copyright", { year })}
            </div>
        </footer>
    );
};

export default Footer;
