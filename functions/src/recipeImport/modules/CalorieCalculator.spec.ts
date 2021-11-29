import {Ingredient} from "../../../../shared/model/Ingredient";
import {CalorieCalculator} from "./CalorieCalculator";

const ingredientsList = [
    new Ingredient("apple", 2, "kg"), //52
    new Ingredient("chicken breast", 1, "kg"), //263
    new Ingredient("ketchup", 0.5, "tbsp") //118
]

const failIngredientsList = [
    new Ingredient("egg", 2, "pieces") ,
    new Ingredient("chips", 1, "package")
]

const res = [1040, 1430, 6]

describe("The calorie calculator component", function () {
    const module = new CalorieCalculator();

    for (let i = 0; i < ingredientsList.length; i++) {
        const ing = ingredientsList[i];
        it('should find the KCAL value for '+ ing.name, async function () {
            const kcal = await module.runFoodAPI(ing)

            expect(kcal).toBe(res[i]);
        });
    }

    for (let i = 0; i < failIngredientsList.length; i++) {
        const ing = failIngredientsList[i];
        it("shouldn't be able to find "+ ing.name, async function () {
            const kcal = await module.runFoodAPI(ing)

            expect(kcal).toBe(null);
        });
    }
})
