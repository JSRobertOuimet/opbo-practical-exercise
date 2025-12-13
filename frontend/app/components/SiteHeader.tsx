// Internationalization
import { useTranslation } from "react-i18next";

// React Router
import { Link, NavLink, useLocation } from "react-router";

// Types
import type { Locale } from "~/i18n";

type SiteHeaderProps = {
    locale: Locale;
};

const SiteHeader = ({ locale }: SiteHeaderProps) => {
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

    const baseClassName = "outline-offset-8";
    const activeClassName = "font-bold text-xtrek-teal outline-offset-8";

    return (
        <header>
            <nav className="fixed flex w-full flex-col border-b border-neutral-200 bg-white">
                <div className="bg-neutral-100">
                    <div className="container mx-auto flex justify-end gap-2 px-4 py-1 text-sm">
                        {locale === "en" ? (
                            <NavLink
                                to={makeLocalePath("fr")}
                                className="outline-offset-3"
                            >
                                {t("nav.french")}
                            </NavLink>
                        ) : (
                            <NavLink
                                to={makeLocalePath("en")}
                                className="outline-offset-3"
                            >
                                {t("nav.english")}
                            </NavLink>
                        )}
                    </div>
                </div>
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <Link to={`/${locale}`} className="outline-offset-8">
                        <picture>
                            <source
                                media="(width < 40rem)"
                                srcSet="/logos/logo-mark.svg"
                                className="h-8"
                            />
                            <img
                                src="/logos/logo-brandname.svg"
                                alt={t("nav.logo_alt")}
                                className="h-8"
                            />
                        </picture>
                    </Link>
                    <div className="flex gap-4 text-end">
                        <NavLink
                            to={`/${locale}`}
                            className={({ isActive }) =>
                                isActive ? activeClassName : baseClassName
                            }
                            end
                        >
                            {t("nav.cafeteria")}
                        </NavLink>
                        <NavLink
                            to={`/${locale}/catering-services`}
                            className={({ isActive }) =>
                                isActive ? activeClassName : baseClassName
                            }
                            end
                        >
                            {t("nav.catering_services")}
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default SiteHeader;
