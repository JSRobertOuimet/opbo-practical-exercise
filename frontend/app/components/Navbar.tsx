import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router";
import type { Locale } from "~/i18n";

const Navbar = ({ locale }: { locale: Locale }) => {
    const { t } = useTranslation();
    const location = useLocation();

    const makeLocalePath = (targetLocale: Locale) => {
        const segments = location.pathname.split("/").filter(Boolean);

        if (segments.length === 0) {
            return `/${targetLocale}`;
        }

        segments[0] = targetLocale;

        const path = `/${segments.join("/")}`;
        return `${path}${location.search}${location.hash}`;
    };

    return (
        <header>
            <nav>
                <NavLink to={`/${locale}`}>
                    {t("nav.cafeteria")}
                </NavLink>
                <NavLink to={`/${locale}/catering-services`}>
                    {t("nav.cateringServices")}
                </NavLink>
                <NavLink to={makeLocalePath("en")}>
                    {t("nav.english")}
                </NavLink>{" "}
                {" | "}
                <NavLink to={makeLocalePath("fr")}>
                    {t("nav.french")}
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
