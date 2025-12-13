// React hooks
import { useEffect } from "react";
import { useLoaderData } from "react-router";

// Internationalization
import { useTranslation } from "react-i18next";
import { DEFAULT_LOCALE, getFixedT, normalizeLocale } from "~/i18n";

// Types
import type { Route } from "./+types/$locale.cafeteria";
import { type Locale } from "~/i18n";

// Components
import HeroImage from "~/components/HeroImage";
import PageHeader from "~/components/PageHeader";

type MenuOptionPrices = Record<string, number>;
type LoaderData = {
    locale: Locale;
    intlLocale: string;
    formattedDate: string;
    menuOptionPrices: MenuOptionPrices;
};

import { CAFETERIA_IDS } from "~/constants/cafeterias";

export async function loader({ params }: Route.LoaderArgs) {
    const locale: Locale = normalizeLocale(params.locale);
    const intlLocale = locale === "fr" ? "fr-CA" : "en-CA";

    const date = new Date();
    const formattedDate = date.toLocaleDateString(intlLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const apiUrl = process.env.API_URL;

    if (!apiUrl) {
        return Response.json({
            message: "The environment variable 'API_URL' is not defined.",
            status: 500,
        });
    }

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return Response.json({
                message: "Failed to fetch cafeteria menu.",
                status: response.status,
            });
        }

        const jsonData: unknown = await response.json();

        if (!isMenuOptionPrices(jsonData)) {
            return Response.json({
                message: "Unexpected cafeteria menu payload.",
                status: 502,
            });
        }

        return {
            locale,
            intlLocale,
            formattedDate,
            menuOptionPrices: jsonData,
        };
    } catch (error) {
        return Response.json({
            message: "Unable to load cafeteria menu.",
            status: 502,
        });
    }

    function isMenuOptionPrices(value: unknown): value is MenuOptionPrices {
        if (typeof value !== "object" || value === null) {
            return false;
        }

        return Object.values(value).every((item) => typeof item === "number");
    }
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

    useEffect(() => {
        CAFETERIA_IDS.forEach((id) => {
            // Best-effort prefetch; ignore errors since this is just warming
            fetch(`/api/cafeteria-prices/${id}`).catch(() => {
                // Intentionally swallow errors: the real flow will still
                // handle failures on the catering page if needed.
            });
        });
    }, []);

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
                            className="rounded border border-neutral-200 bg-white px-6 pt-6 pb-4 not-last:mb-8"
                        >
                            <div className="mb-4 flex items-end justify-between text-2xl font-bold">
                                <h3>{option.name}</h3>
                                <p>{option.price}</p>
                            </div>
                            <p className="mb-4">{option.description}</p>
                            <details className="cursor-pointer">
                                <summary className="mb-4 text-sm outline-offset-8">
                                    {t("pages.cafeteria.ingredients")}
                                </summary>
                                <p className="mb-4 text-sm">
                                    {option.ingredients}
                                </p>
                            </details>
                        </div>
                    ))}

                    <p className="text-center text-sm text-balance">
                        {t("pages.cafeteria.note")}
                    </p>
                </div>
            </div>
        </>
    );
}
