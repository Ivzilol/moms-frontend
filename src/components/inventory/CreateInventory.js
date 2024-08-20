import {useUser} from "../../userProvider/UserProvider";
import {useState} from "react";
import FastenersTemplate from "../createOrder/template/FastenersTemplate";
import Header from "../Header/Header";

const CreateInventory = () => {

    const user = useUser();
    const [selectedCategory, setSelectedCategory] = useState('');


    let template;

    if (selectedCategory === 'FASTENERS') {
        template = <FastenersTemplate category={selectedCategory}/>
    }

    return (
       <div>
           <Header/>
           <div className="dropdown-container">
               <div className="dropdown">
                   <label htmlFor="category">Категория:</label>
                   <select
                       id="category"
                       value={selectedCategory}
                       onChange={(e) => setSelectedCategory(e.target.value)}
                   >
                       <option value="">Изберете категория</option>
                       <option value="FASTENERS">Крепежи</option>
                       <option value="GALVANIZED_SHEET">Ламарина</option>
                       <option value="INSULATION">Изолация</option>
                       <option value="METAL">Метали</option>
                       <option value="PANELS">Панели</option>
                       <option value="REBAR">Армировка</option>
                       <option value="SET">Обшивки</option>
                       <option value="UNSPECIFIED">Други</option>
                       <option value="SERVICE">Услуги</option>
                       <option value="TRANSPORT">Транспорт</option>
                   </select>
               </div>
           </div>
           <div className="template-container">
               {template}
           </div>
       </div>
    )
}

export default CreateInventory;