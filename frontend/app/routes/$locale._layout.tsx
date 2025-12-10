// app/routes/$locale._layout.tsx
import { Outlet, useLoaderData } from "react-router";
import type { Route } from "./+types/$locale._layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    DEFAULT_LOCALE,
    getFixedT,
    isSupportedLocale,
    type Locale,
} from "~/i18n";

type LoaderData = { locale: Locale };

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
            <Navbar locale={locale} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
