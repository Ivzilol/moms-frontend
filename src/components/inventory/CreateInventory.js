import {useState} from "react";
import FastenersTemplate from "../createOrder/template/FastenersTemplate";
import Header from "../Header/Header";
import GalvanizedSheetTemplate from "../createOrder/template/GalvanizedSheetTemplate";
import InsulationTemplate from "../createOrder/template/InsulationTemplate";
import MetalTemplate from "../createOrder/template/MetalTemplate";
import PanelsTemplate from "../createOrder/template/PanelsTemplate";
import RebarTemplate from "../createOrder/template/RebarTemplate";
import SetTemplate from "../createOrder/template/SetTemplate";
import UnspecifiedTemplate from "../createOrder/template/UnspecifiedTemplate";

const CreateInventory = () => {

    const [selectedCategory, setSelectedCategory] = useState('');


    let template;
    switch (selectedCategory) {
        case 'FASTENERS':
            template = <FastenersTemplate category={selectedCategory}/>
            break;
        case 'GALVANIZED_SHEET':
            template = <GalvanizedSheetTemplate category={selectedCategory}/>
            break;
        case 'INSULATION':
            template = <InsulationTemplate category={selectedCategory}/>
            break;
        case 'METAL':
            template = <MetalTemplate category={selectedCategory}/>
            break;
        case 'PANELS':
            template = <PanelsTemplate category={selectedCategory}/>
            break;
        case 'REBAR':
            template = <RebarTemplate category={selectedCategory}/>
            break
        case 'SET':
            template = <SetTemplate category={selectedCategory}/>
            break;
        case 'UNSPECIFIED':
            template = <UnspecifiedTemplate category={selectedCategory}/>
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