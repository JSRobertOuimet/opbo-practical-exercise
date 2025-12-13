// React hooks
import { useEffect, useMemo } from "react";
import { useSearchParams, useFetcher } from "react-router";

// Internationalization
import { useTranslation } from "react-i18next";
import { DEFAULT_LOCALE, getFixedT, normalizeLocale } from "~/i18n";

// Utils
import { createBaseMenu } from "~/utils/menuFactory";

// Types
import type { Route } from "./+types/$locale.catering-services";
import type { Locale } from "~/i18n";
import type { MealTier, MealType, MenuByMeal } from "~/types/types";

type LoaderData = {
    locale: Locale;
};

type PricesByMeal = Record<MealType, number | null>;
type PricesByTier = Record<MealTier, PricesByMeal>;

type CafeteriaMeta = {
    id: string;
    label: string;
    region: string;
};

type PricesFetcherData = {
    id: string;
    prices: PricesByTier;
    cached: boolean;
};

// Components
import HeroImage from "~/components/HeroImage";
import PageHeader from "~/components/PageHeader";
import Notification from "~/components/Notification";
import TabButton from "~/components/TabButton";
import Card from "~/components/Card";

export async function loader({ params }: Route.LoaderArgs) {
    const locale: Locale = normalizeLocale(params.locale);

    return {
        locale,
    };
}

export function meta({ loaderData }: Route.MetaArgs) {
    const data = loaderData as LoaderData;
    const locale = data?.locale ?? DEFAULT_LOCALE;
    const t = getFixedT(locale);

    return [
        { title: `xtrek | ${t("pages.catering_services.title")}` },
        {
            name: "description",
            content: t("pages.catering_services.meta_description"),
        },
    ];
}

export default function CateringServices() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pricesFetcher = useFetcher<PricesFetcherData>();
    const { t } = useTranslation();

    const mealOrder: MealType[] = ["breakfast", "lunch", "dinner"];
    const cafeterias: CafeteriaMeta[] = [
        {
            id: "britannia",
            label: t("pages.catering_services.locations.britannia"),
            region: "ottawa",
        },
        {
            id: "glebe",
            label: t("pages.catering_services.locations.glebe"),
            region: "ottawa",
        },
        {
            id: "mitigomijokan",
            label: t("pages.catering_services.locations.mitigomijokan"),
            region: "gatineau",
        },
        {
            id: "versant",
            label: t("pages.catering_services.locations.versant"),
            region: "gatineau",
        },
    ];

    const locationFromUrl = searchParams.get("location");
    const selectedLocationId =
        cafeterias.some((cafeteria) => cafeteria.id === locationFromUrl) &&
        locationFromUrl
            ? locationFromUrl
            : null;
    const tierFromUrl = searchParams.get("tier") as MealTier | null;
    const selectedTier: MealTier =
        tierFromUrl === "premium" || tierFromUrl === "standard"
            ? tierFromUrl
            : "standard";

    useEffect(() => {
        if (!selectedLocationId) return;

        pricesFetcher.load(`/api/cafeteria-prices/${selectedLocationId}`);
    }, [selectedLocationId]);

    const handleLocationChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = event.target.value;

        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);

                if (value) {
                    next.set("location", value);
                } else {
                    next.delete("location");
                    next.delete("tier");
                }

                return next;
            },
            { preventScrollReset: true },
        );
    };

    const handleTierChange = (tier: MealTier) => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);

                next.set("tier", tier);

                return next;
            },
            { preventScrollReset: true },
        );
    };

    const ottawaCafeterias = cafeterias.filter(
        (cafeteria) => cafeteria.region === "ottawa",
    );
    const gatineauCafeterias = cafeterias.filter(
        (cafeteria) => cafeteria.region === "gatineau",
    );

    const hasSelectedLocation = Boolean(selectedLocationId);

    const isLoadingPrices =
        hasSelectedLocation &&
        pricesFetcher.state !== "idle" &&
        (!pricesFetcher.data || pricesFetcher.data.id !== selectedLocationId);

    const fetchedPricesForSelectedLocation =
        hasSelectedLocation &&
        pricesFetcher.data &&
        pricesFetcher.data.id === selectedLocationId
            ? pricesFetcher.data.prices
            : null;

    const menuForTier: MenuByMeal | null = useMemo(() => {
        if (!hasSelectedLocation || isLoadingPrices) return null;

        const baseMenu = createBaseMenu(t);

        if (fetchedPricesForSelectedLocation) {
            (["standard", "premium"] as const).forEach((mealTier) => {
                (["breakfast", "lunch", "dinner"] as const).forEach(
                    (mealType) => {
                        baseMenu[mealTier][mealType].price =
                            fetchedPricesForSelectedLocation[mealTier][
                                mealType
                            ];
                    },
                );
            });
        }

        return baseMenu[selectedTier];
    }, [
        t,
        hasSelectedLocation,
        isLoadingPrices,
        fetchedPricesForSelectedLocation,
        selectedTier,
    ]);

    return (
        <>
            <HeroImage src="/images/catering.jpeg" alt="" />

            <div className="container mx-auto px-4">
                <PageHeader
                    title={t("pages.catering_services.title")}
                    subtitle={t("pages.catering_services.audience")}
                />

                <div className="lg:mx-auto lg:w-2/3 xl:w-1/2">
                    <Notification
                        message={t("pages.catering_services.instructions")}
                    />

                    <div className="mb-8 flex flex-col gap-1">
                        <label htmlFor="location" className="font-bold">
                            {t(
                                "pages.catering_services.location_label",
                                "Location",
                            )}
                        </label>
                        <select
                            id="location"
                            className={`rounded border p-2 ${
                                isLoadingPrices
                                    ? "cursor-not-allowed border-neutral-200 bg-transparent"
                                    : "border-neutral-300 bg-white"
                            }`}
                            value={selectedLocationId ?? ""}
                            onChange={handleLocationChange}
                            disabled={isLoadingPrices}
                        >
                            <option value="">
                                {t(
                                    "pages.catering_services.location_placeholder",
                                )}
                            </option>
                            <optgroup
                                label={t(
                                    "pages.catering_services.regions.ottawa",
                                )}
                            >
                                {ottawaCafeterias.map((cafeteria) => (
                                    <option
                                        key={cafeteria.id}
                                        value={cafeteria.id}
                                    >
                                        {cafeteria.label}
                                    </option>
                                ))}
                            </optgroup>
                            <optgroup
                                label={t(
                                    "pages.catering_services.regions.gatineau",
                                )}
                            >
                                {gatineauCafeterias.map((cafeteria) => (
                                    <option
                                        key={cafeteria.id}
                                        value={cafeteria.id}
                                    >
                                        {cafeteria.label}
                                    </option>
                                ))}
                            </optgroup>
                        </select>
                    </div>

                    {isLoadingPrices && (
                        <p className="mb-8 flex flex-col items-center justify-center">
                            {t("pages.catering_services.loading_menu_options")}
                        </p>
                    )}

                    {hasSelectedLocation && !isLoadingPrices && (
                        <div className="mb-8">
                            <div
                                role="tablist"
                                aria-label={t(
                                    "pages.catering_services.menu_options.tabs_label",
                                )}
                                className="mx-auto mb-8 flex w-fit gap-2"
                            >
                                <TabButton
                                    id="tab-standard"
                                    controls="tabpanel-standard"
                                    isSelected={selectedTier === "standard"}
                                    label={t(
                                        "pages.catering_services.menu_options.tab_standard_label",
                                    )}
                                    onSelect={() =>
                                        handleTierChange("standard")
                                    }
                                />

                                <TabButton
                                    id="tab-premium"
                                    controls="tabpanel-premium"
                                    isSelected={selectedTier === "premium"}
                                    label={t(
                                        "pages.catering_services.menu_options.tab_premium_label",
                                    )}
                                    onSelect={() => handleTierChange("premium")}
                                />
                            </div>

                            {menuForTier && (
                                <div
                                    id={`tabpanel-${selectedTier}`}
                                    role="tabpanel"
                                    aria-labelledby={`tab-${selectedTier}`}
                                    className="grid"
                                >
                                    {mealOrder.map((mealType) => {
                                        const meal = menuForTier[mealType];

                                        return (
                                            <Card
                                                key={`${selectedTier}-${mealType}`}
                                                meal={meal}
                                                headingLevel={2}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    <p className="text-center text-sm text-balance">
                        {t("pages.catering_services.note")}
                    </p>
                </div>
            </div>
        </>
    );
}
