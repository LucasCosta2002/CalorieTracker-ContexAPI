import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

export default function CalorieTracker() {
 
    const { caloriesConsumed, netCalories, caloriesBorn} = useActivity();

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBorn}
                    text="Quemadas"
                />
                <CalorieDisplay
                    calories={netCalories}
                    text="Dieferencia"
                />
            </div>
        </>
    )
}
