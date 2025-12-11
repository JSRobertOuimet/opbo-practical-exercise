import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/$locale.cafeteria";
import {
    DEFAULT_LOCALE,
    getFixedT,
    normalizeLocale,
    type Locale,
} from "~/i18n";

import HeroImage from "~/components/HeroImage";
import PageHeader from "~/components/PageHeader";
import Notification from "~/components/Notification";

type MenuOptionPrices = Record<string, number>;
type LoaderData = {
    locale: Locale;
    intlLocale: string;
    formattedDate: string;
    menuOptionPrices: MenuOptionPrices;
};

function getIntlLocale(locale: Locale): string {
    return locale === "fr" ? "fr-CA" : "en-CA";
}

export async function loader({ params }: Route.LoaderArgs) {
    const locale: Locale = normalizeLocale(params.locale);
    const intlLocale = getIntlLocale(locale);

    const date = new Date();
    const formattedDate = date.toLocaleDateString(intlLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const apiUrl = process.env.API_URL;

    if (!apiUrl) {
        throw createJsonResponse(
            { message: "The environment variable 'API_URL' is not defined." },
            500,
        );
    }

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw createJsonResponse(
                { message: "Failed to fetch cafeteria menu." },
                response.status,
            );
        }

        const jsonData: unknown = await response.json();

        if (!isMenuOptionPrices(jsonData)) {
            throw createJsonResponse(
                { message: "Unexpected cafeteria menu payload." },
                502,
            );
        }

        return {
            locale,
            intlLocale,
            formattedDate,
            menuOptionPrices: jsonData,
        };
    } catch (error) {
        if (error instanceof Response) {
            throw error;
        }

        throw createJsonResponse(
            { message: "Unable to load cafeteria menu." },
            502,
        );
    }
}

function isMenuOptionPrices(value: unknown): value is MenuOptionPrices {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    return Object.values(value).every((item) => typeof item === "number");
}

function createJsonResponse(body: object, status: number): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export function meta({ loaderData }: Route.MetaArgs) {
    const data = loaderData as LoaderData;
    const locale = data?.locale ?? DEFAULT_LOCALE;
    const t = getFixedT(locale);
    const formattedDate = data?.formattedDate;

    return [
        { title: `xtrek | ${t("pages.cafeteria.title")}` },
        {
            name: "description",
            content: t("pages.cafeteria.meta_description", {
                date: formattedDate,
            }),
        },
    ];
}

export default function Cafeteria() {
    const { t } = useTranslation();
    const { formattedDate, menuOptionPrices } = useLoaderData<LoaderData>();

    const menuOptions = Object.entries(menuOptionPrices).map(
        ([key, price]) => ({
            key,
            name: t(`pages.cafeteria.menu_options.${key}.name`),
            description: t(`pages.cafeteria.menu_options.${key}.description`),
            ingredients: t(`pages.cafeteria.menu_options.${key}.ingredients`),
            price: `$${price.toFixed(2)}`,
        }),
    );

    return (
        <>
            <HeroImage src="/images/menu.jpeg" alt="" />
            <div className="container mx-auto px-4">
                <PageHeader
                    pageTitle={t("pages.cafeteria.title")}
                    audience={t("pages.cafeteria.audience")}
                />

                <div className="lg:mx-auto lg:w-2/3 xl:w-1/2">
                    <h2 className="mb-8 text-center text-3xl">
                        {t("pages.cafeteria.heading", {
                            date: formattedDate,
                        })}
                    </h2>

                    {menuOptions.map((option) => (
                        <div
                            key={option.key}
                            className="rounded-sm border border-neutral-200 bg-white px-6 py-2 not-last:mb-8"
                        >
                            <div className="flex items-end justify-between">
                                <h3 className="my-4 text-2xl font-bold">
                                    {option.name}
                                </h3>
                                <p className="mb-4 text-2xl">{option.price}</p>
                            </div>
                            <p className="mb-4">{option.description}</p>
                            <details className="cursor-pointer">
                                <summary className="mb-4 text-sm">
                                    {t("pages.cafeteria.ingredients")}
                                </summary>
                                <p className="mb-4 text-sm">
                                    {option.ingredients}
                                </p>
                            </details>
                        </div>
                    ))}

                    <Notification message={t("pages.cafeteria.notification")} />
                </div>
            </div>
        </>
    );
}
