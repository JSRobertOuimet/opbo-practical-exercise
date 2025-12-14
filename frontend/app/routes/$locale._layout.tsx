// React Router
import { Outlet, useLoaderData } from "react-router";

// Internationalization
import { getFixedT, isSupportedLocale } from "~/utils/i18n";

// Constants
import { DEFAULT_LOCALE } from "~/constants/locales";

// Types
import type { Route } from "./+types/$locale._layout";
import type { Locale } from "~/constants/locales";

type LoaderData = { locale: Locale };

// Components
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export function loader({ params }: Route.LoaderArgs) {
    const locale = params.locale;

    if (!isSupportedLocale(locale)) {
        throw new Response("Not found", { status: 404 });
    }

    return { locale };
}

export function meta({ params }: Route.MetaArgs) {
    const locale = (params.locale as Locale) ?? DEFAULT_LOCALE;
    const t = getFixedT(locale);

    return [
        {
            title: t("layout.title"),
        },
    ];
}

export default function LocaleLayout({}: Route.ComponentProps) {
    const { locale } = useLoaderData<LoaderData>();

    return (
        <>
            <SiteHeader locale={locale} />
            <main>
                <Outlet />
            </main>
            <SiteFooter />
        </>
    );
}
