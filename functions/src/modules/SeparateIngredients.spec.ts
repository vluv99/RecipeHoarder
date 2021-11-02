import {SeparateIngredients} from "./SeparateIngredients";
import {Ingredient} from "../../../shared/model/Ingredient";

const ingredeintTestValues = [
    {text: "¼ cup unsalted butter", res: new Ingredient("unsalted butter", 0.25, "cup")},
    {text: "¼ teaspoon olive oil", res: new Ingredient("olive oil", 0.25, "teaspoon")},

    {text: "3 cups diced mushrooms", res: new Ingredient("diced mushrooms", 3, "cups")},
    {text: "1 ½ cups Arborio rice", res: new Ingredient("Arborio rice", 1.5, "cups")},

    {text: "salt and ground black pepper to taste", res: new Ingredient("salt and ground black pepper to taste", 1, "")},
    {text: "1 pound flank steak, thinly sliced", res: new Ingredient("flank steak, thinly sliced", 1, "pound")},

    {text: "1 orange , ½ sliced and ½ juiced", res: new Ingredient("orange , ½ sliced and ½ juiced", 1, "piece")},
    {text: "100ml milk", res: new Ingredient("milk", 100, "ml")},
    {text: "3 tablespoons white sugar", res: new Ingredient("white sugar", 3, "tablespoons")},
    {text: "½ a bunch of basil , (15g)", res: new Ingredient("a bunch of basil , (15g)", 0.5, "piece")},
    {text: "1 courgette", res: new Ingredient("courgette", 1, "piece")},
    {text: "8 to 10 black olives , (stone in)", res: new Ingredient("black olives , (stone in)", 8, "pieces")},

    {text: "2 tablespoons unsalted butter", res: new Ingredient("unsalted butter", 2, "tablespoons")},

    //{text: "1 x 125 g ball of mozzarella cheese", res: new Ingredient("ball of mozzarella cheese", 125, "g")},

]

describe("The separate ingredients component", function () {
    let module = new SeparateIngredients();

    it('should find the amount', function () {
        expect(module.parseNumber("¼")).toBe(0.25);
    });

    it('should parse the array of text ingredients correctly', function () {
        for (const i of ingredeintTestValues) {
            let ing = new Ingredient(i.text, -1, "")
            module.parseIngredient(ing)

            expect(ing).toEqual(i.res);
        }
    });
})
