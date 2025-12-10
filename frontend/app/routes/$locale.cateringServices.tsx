import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/$locale.cateringServices";
import Header from "~/components/Header";
import {
    DEFAULT_LOCALE,
    getFixedT,
    normalizeLocale,
    type Locale,
} from "~/i18n";

type LoaderData = {
    locale: Locale;
};

export async function loader({ params }: Route.LoaderArgs) {
    const locale: Locale = normalizeLocale(params.locale);

    return {
        locale,
    };
}

export function meta({ loaderData }: Route.MetaArgs) {
    const locale =
        (loaderData as LoaderData | undefined)?.locale ?? DEFAULT_LOCALE;
    const t = getFixedT(locale);
    const title = t("pages.cateringServices.title");
    const description = t("pages.cateringServices.metaDescription");

    return [
        { title: `xtrek | ${title}` },
        {
            name: "description",
            content: description,
        },
    ];
}

export default function CateringServices() {
    const { t } = useTranslation();
    const pageTitle = t("pages.cateringServices.title");
    const audience = t("pages.cateringServices.audience");

    return (
        <>
            <Header pageTitle={pageTitle} audience={audience} />
        </>
    );
}
