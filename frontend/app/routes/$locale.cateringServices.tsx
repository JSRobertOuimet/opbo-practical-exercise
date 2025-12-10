import { useLoaderData } from "react-router";
import type { Route } from "./+types/$locale.cafeteria";
import Header from "~/components/Header";

export async function loader({ params }: Route.LoaderArgs) {
    const localeParam = params.locale ?? "en";
    const intlLocale = localeParam === "fr" ? "fr-CA" : "en-CA";
    const pageTitle =
        localeParam === "fr"
            ? "Service de traiteur"
            : "Catering Services";
    const audience =
        localeParam === "fr"
            ? "Pour le grand public"
            : "For the general public";

    return {
        locale: localeParam,
        intlLocale,
        pageTitle,
        audience,
    };
}

export function meta({ loaderData }: Route.MetaArgs) {
    if (!loaderData) {
        return [
            { title: "xtrek | Catering Services" },
            {
                name: "description",
                content: "xtrek’s catering services.",
            },
        ];
    }

    const { locale, pageTitle } = loaderData;
    const description =
        locale === "fr"
            ? `Service de traiteur de xtrek.`
            : `xtrek’s catering services.`;

    return [
        { title: `xtrek | ${pageTitle}` },
        {
            name: "description",
            content: description,
        },
    ];
}

export default function Cafeteria() {
    const { pageTitle, audience } = useLoaderData();

    return (
        <>
            <Header pageTitle={pageTitle} audience={audience} />
        </>
    );
}
