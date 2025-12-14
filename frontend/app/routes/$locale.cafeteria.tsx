// React hooks
import { useEffect } from "react";
import { useLoaderData } from "react-router";

// Internationalization
import { useTranslation } from "react-i18next";
import { getFixedT, normalizeLocale } from "~/utils/i18n";

// Constants
import { CAFETERIA_IDS } from "~/constants/cafeterias";
import { DEFAULT_LOCALE } from "~/constants/locales";

// Types
import type { Route } from "./+types/$locale.cafeteria";
import type { Locale } from "~/constants/locales";

type MenuOptionPrices = Record<string, number>;
type LoaderData = {
    locale: Locale;
    intlLocale: string;
    formattedDate: string;
    menuOptionPrices: MenuOptionPrices;
};

// Components
import HeroImage from "~/components/HeroImage";
import PageHeader from "~/components/PageHeader";
import Card from "~/components/Card";

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
            fetch(`/api/cafeteria-prices/${id}`).catch((error) => {
                console.error(error);
            });
        });
    }, []);

    const menuOptions = Object.entries(menuOptionPrices).map(
        ([key, price]) => ({
            key,
            name: t(`pages.cafeteria.menu_options.${key}.name`),
            description: t(`pages.cafeteria.menu_options.${key}.description`),
            ingredients: t(`pages.cafeteria.menu_options.${key}.ingredients`),
            price: price,
        }),
    );

    return (
        <>
            <HeroImage src="/images/menu.jpg" alt="" />

            <div className="container mx-auto px-4">
                <PageHeader
                    title={t("pages.cafeteria.title")}
                    subtitle={t("pages.cafeteria.audience")}
                />

                <div className="lg:mx-auto lg:w-2/3 xl:w-1/2">
                    <h2 className="mb-8 text-center text-3xl">
                        {t("pages.cafeteria.heading", {
                            date: formattedDate,
                        })}
                    </h2>

                    {menuOptions.map((option) => (
                        <Card
                            key={option.key}
                            name={option.name}
                            description={option.description}
                            ingredients={option.ingredients}
                            price={option.price}
                            headingLevel={3}
                        />
                    ))}

                    <p className="text-center text-sm text-balance">
                        {t("pages.cafeteria.note")}
                    </p>
                </div>
            </div>
        </>
    );
}
