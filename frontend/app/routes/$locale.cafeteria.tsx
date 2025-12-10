import { useLoaderData } from "react-router";
import type { Route } from "./+types/$locale.cafeteria";
import Header from "~/components/Header";

export async function loader({ params }: Route.LoaderArgs) {
    const localeParam = params.locale ?? "en";
    const intlLocale = localeParam === "fr" ? "fr-CA" : "en-CA";
    const pageTitle = localeParam === "fr" ? "Cafétéria" : "Cafeteria";
    const audience =
        localeParam === "fr" ? "Pour le personal" : "For employees";
    const date = new Date();
    const formattedDate = date.toLocaleDateString(intlLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return {
        locale: localeParam,
        intlLocale,
        pageTitle,
        audience,
        formattedDate,
    };
}

export function meta({ loaderData }: Route.MetaArgs) {
    if (!loaderData) {
        return [
            { title: "xtrek | Cafeteria" },
            {
                name: "description",
                content: "xtrek’s cafeteria menu.",
            },
        ];
    }

    const { pageTitle, locale, formattedDate } = loaderData;
    const description =
        locale === "fr"
            ? `Menu du ${formattedDate}.`
            : `Menu for ${formattedDate}.`;

    return [
        { title: `xtrek | ${pageTitle}` },
        {
            name: "description",
            content: description,
        },
    ];
}

export default function Cafeteria() {
    const { locale, pageTitle, audience, formattedDate } =
        useLoaderData();

    return (
        <>
            <Header pageTitle={pageTitle} audience={audience} />
            <h2>
                {locale === "fr"
                    ? `Menu du ${formattedDate}`
                    : `Menu for ${formattedDate}`}
            </h2>
        </>
    );
}
