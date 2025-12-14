// React hooks
import { useEffect } from "react";

// React Router
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useMatches,
} from "react-router";

// Internationalization
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n, { normalizeLocale } from "~/utils/i18n";

// Types
import type { Route } from "./+types/root";
import type { Locale } from "~/constants/locales";

// Styles
import "./app.css";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    const matches = useMatches();
    const localeMatch = matches.find((match) => match.params?.locale);
    const locale: Locale = normalizeLocale(localeMatch?.params?.locale);

    useEffect(() => {
        if (i18n.language !== locale) {
            void i18n.changeLanguage(locale);
        }
    }, [locale]);

    return (
        <html lang={locale}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
                <link
                    rel="icon"
                    href="/favicon-light.ico"
                    media="(prefers-color-scheme: light)"
                />
                <link
                    rel="icon"
                    href="/favicon-dark.ico"
                    media="(prefers-color-scheme: dark)"
                />
            </head>
            <body className="h-screen">
                <I18nextProvider i18n={i18n}>
                    {children}
                    <ScrollRestoration />
                    <Scripts />
                </I18nextProvider>
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    const matches = useMatches();
    const localeMatch = matches.find((match) => match.params?.locale);
    const locale: Locale = normalizeLocale(localeMatch?.params?.locale);
    const { t } = useTranslation();

    useEffect(() => {
        if (i18n.language !== locale) {
            void i18n.changeLanguage(locale);
        }
    }, [locale]);

    let message = t("errors.oops");
    let details = t("errors.unexpected_error");
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message =
            error.status === 404 ? t("errors.not_found") : t("errors.error");
        details =
            error.status === 404
                ? t("errors.page_not_found")
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
