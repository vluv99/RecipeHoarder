import Qty from 'js-quantities';

export class UnitConverter {

    static getKnownUnits(){

        let units: string[] = [];
        const cats = ["mass", "volume", "length"];

        for (const cat of cats) {
            for (const unit of Qty.getUnits(cat)) {
                units = [...units, ...Qty.getAliases(unit)];
            }
        }

        return units;
    }

    static convert(f_amount:number, f_unit: string, t_unit: string):number | null{

        if(f_unit == "c"){
            f_unit = "cup";
        }

        if(this.getKnownUnits().includes(f_unit) &&
            this.getKnownUnits().includes(t_unit) ) {
            const from = Qty(f_amount, f_unit)

            if (from.isCompatible(t_unit)) {
                return isNaN(from.to(t_unit).scalar) ? null : from.to(t_unit).scalar;
            }
        }

        if ((f_unit == "tbsp" || f_unit == "tablespoon" || f_unit == "tablespoons") && t_unit == "g")
            return f_amount * 12.5;
        else if ((f_unit == "tsp" || f_unit == "teaspoon" || f_unit == "teaspoons") && t_unit == "g")
            return f_amount * 4.2;
        else if (f_unit == "cup" && t_unit == "g")
            return f_amount * 128;

        console.warn("Tried to convert: " + f_unit + " to " + t_unit);

        return null;

    }


}
