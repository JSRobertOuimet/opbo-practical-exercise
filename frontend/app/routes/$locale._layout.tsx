import { Outlet, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SUPPORTED_LOCALES = ["en", "fr"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export function loader({ params }: { params: { locale?: string } }) {
    const locale = params.locale;

    if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
        throw new Response("Not found", { status: 404 });
    }

    return { locale };
}

export default function LocaleLayout() {
    const { locale = "en" } = useParams<{ locale: Locale }>();

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
