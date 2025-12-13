import type { TFunction } from "i18next";
import type { MenuByTier } from "~/types/types";

export function createBaseMenu(t: TFunction): MenuByTier {
    return {
        standard: {
            breakfast: {
                name: t(
                    "pages.catering_services.menu_options.standard.breakfast.name",
                ),
                description: t(
                    "pages.catering_services.menu_options.standard.breakfast.description",
                ),
                dietaryOptions: [
                    t(
                        "pages.catering_services.menu_options.dietary_options.vegan",
                    ),
                    t(
                        "pages.catering_services.menu_options.dietary_options.vegetarian",
                    ),
                ],
                price: null,
            },
            lunch: {
                name: t(
                    "pages.catering_services.menu_options.standard.lunch.name",
                ),
                description: t(
                    "pages.catering_services.menu_options.standard.lunch.description",
                ),
                dietaryOptions: [
                    t(
                        "pages.catering_services.menu_options.dietary_options.nut_free",
                    ),
                    t(
                        "pages.catering_services.menu_options.dietary_options.vegetarian",
                    ),
                ],
                price: null,
            },
            dinner: {
                name: t(
                    "pages.catering_services.menu_options.standard.dinner.name",
                ),
                description: t(
                    "pages.catering_services.menu_options.standard.dinner.description",
                ),
                dietaryOptions: [
                    t(
                        "pages.catering_services.menu_options.dietary_options.nut_free",
                    ),
                    t(
                        "pages.catering_services.menu_options.dietary_options.vegetarian",
                    ),
                ],
                price: null,
            },
        },
        premium: {
            breakfast: {
                name: t(
                    "pages.catering_services.menu_options.premium.breakfast.name",
                ),
                description: t(
                    "pages.catering_services.menu_options.premium.breakfast.description",
                ),
                dietaryOptions: [
                    t(
                        "pages.catering_services.menu_options.dietary_options.nut_free",
                    ),
                    t(
                        "pages.catering_services.menu_options.dietary_options.gluten_free",
                    ),
                ],
                price: null,
            },
            lunch: {
                name: t(
                    "pages.catering_services.menu_options.premium.lunch.name",
                ),
                description: t(
                    "pages.catering_services.menu_options.premium.lunch.description",
                ),
                dietaryOptions: [
                    t(
                        "pages.catering_services.menu_options.dietary_options.vegan",
                    ),
                    t(
                        "pages.catering_services.menu_options.dietary_options.nut_free",
                    ),
                    t(
                        "pages.catering_services.menu_options.dietary_options.gluten_free",
                    ),
                    t(
                        "pages.catering_services.menu_options.dietary_options.vegetarian",
                    ),
                ],
                price: null,
            },
            dinner: {
                name: t(
                    "pages.catering_services.menu_options.premium.dinner.name",
                ),
                description: t(
                    "pages.catering_services.menu_options.premium.dinner.description",
                ),
                dietaryOptions: [
                    t(
                        "pages.catering_services.menu_options.dietary_options.gluten_free",
                    ),
                ],
                price: null,
            },
        },
    };
}
