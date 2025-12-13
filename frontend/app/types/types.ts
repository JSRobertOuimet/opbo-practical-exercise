export type MealTier = "standard" | "premium";
export type MealType = "breakfast" | "lunch" | "dinner";
export type Meal = {
    name: string;
    description: string;
    dietaryOptions: string[];
    price: number | null;
};
export type MenuByTier = Record<MealTier, MenuByMeal>;
export type MenuByMeal = Record<MealType, Meal>;
