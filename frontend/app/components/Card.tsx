// React
import { createElement } from "react";

// Internationalization
import { useTranslation } from "react-i18next";

// Types
import type { Meal } from "~/types/types";
type CardProps = {
    meal: Meal;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};

// Components
import Tag from "./Tag";

const Card = ({ meal, headingLevel = 3 }: CardProps) => {
    const { t } = useTranslation();

    const formatPrice = (price: number | null) => {
        if (price == null) return;
        return `$${price}`;
    };

    const headingTags = {
        1: "h1",
        2: "h2",
        3: "h3",
        4: "h4",
        5: "h5",
        6: "h6",
    } as const;

    const HeadingTag = headingTags[headingLevel] as
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6";

    if (meal.price === null) {
        return (
            <div className="flex flex-col items-center justify-center rounded border border-neutral-200 bg-neutral-50 p-6 text-neutral-600 not-last:mb-8">
                <p className="text-lg">
                    {t("pages.catering_services.menu_options.not_available", {
                        meal: meal.name.toLowerCase(),
                    })}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col rounded border border-neutral-200 bg-white px-6 pt-6 pb-4 not-last:mb-8">
            <div className="mb-4 flex items-end justify-between text-2xl font-bold">
                {createElement(HeadingTag, null, meal.name)}
                <span>{formatPrice(meal.price)}</span>
            </div>

            <p className="mb-4">{meal.description}</p>

            {meal.dietaryOptions.length > 0 && (
                <ul className="mb-4 flex w-full flex-wrap gap-x-8 gap-y-2">
                    {meal.dietaryOptions.map((option) => (
                        <Tag key={option} option={option} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Card;
