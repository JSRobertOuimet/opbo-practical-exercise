import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/$locale.cafeteria";
import Header from "~/components/Header";
import {
    DEFAULT_LOCALE,
    getFixedT,
    normalizeLocale,
    type Locale,
} from "~/i18n";

type LoaderData = {
    locale: Locale;
    intlLocale: string;
    formattedDate: string;
};

export async function loader({ params }: Route.LoaderArgs) {
    const locale: Locale = normalizeLocale(params.locale);
    const intlLocale = locale === "fr" ? "fr-CA" : "en-CA";
    const date = new Date();
    const formattedDate = date.toLocaleDateString(intlLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return {
        locale,
        intlLocale,
        formattedDate,
    };
}

export function meta({ loaderData }: Route.MetaArgs) {
    const data = loaderData as LoaderData | undefined;
    const locale = data?.locale ?? DEFAULT_LOCALE;
    const t = getFixedT(locale);
    const formattedDate = data?.formattedDate;
    const title = t("pages.cafeteria.title");
    const description = formattedDate
        ? t("pages.cafeteria.metaDescription", { date: formattedDate })
        : t("pages.cafeteria.metaDescriptionFallback");

    return [
        { title: `xtrek | ${title}` },
        {
            name: "description",
            content: description,
        },
    ];
}

export default function Cafeteria() {
    const { t } = useTranslation();
    const { formattedDate } = useLoaderData<LoaderData>();
    const pageTitle = t("pages.cafeteria.title");
    const audience = t("pages.cafeteria.audience");
    const heading = t("pages.cafeteria.heading", {
        date: formattedDate,
    });

    return (
        <>
            <Header pageTitle={pageTitle} audience={audience} />
            <h2>{heading}</h2>
        </>
    );
}
