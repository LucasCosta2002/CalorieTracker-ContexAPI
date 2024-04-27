import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { useActivity } from "../hooks/useActivity"


const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}

export default function Form() {

    const { state, dispatch } = useActivity();
    const [ activity, setActivity ] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])
    

    const handlechange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)  => {
        //comprobar que el campo es numerico,
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        //si es category o calories, lo convertimos a number
        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value
        })
    } 

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0
    }

    const handlesubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        //disparador del action en activity-reducer
        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        //reiniciamos el state y limpia el id con un registro nuevo
        setActivity({...initialState, id: uuidv4()})
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handlesubmit }
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select 
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handlechange}
                >
                    {categories.map( category => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>                        
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input 
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Ej: Comida, Jugo de Naranja, Pesas, etc"
                    value={activity.name}
                    onChange={handlechange}
                />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input 
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Ej calorias: 300"
                    onChange={handlechange}
                    value={activity.calories}
                />
            </div>

            <input 
                type="submit"
                className="bg-gray-600 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-45"
                value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
