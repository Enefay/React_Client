import { useParams } from "react-router-dom"

import TitleCard from "../../components/Cards/TitleCard";

import InputText from "../../components/Input/InputText";

import TextAreaInput from "../../components/Input/TextAreaInput";

import axios from "axios";

import { useEffect } from "react";

import { useState } from "react";

import { useDispatch } from "react-redux";

import { showNotification } from "../common/headerSlice";

import { root } from "postcss";





function Deneme() {

    debugger

    const { id } = useParams();

    const [result, setResult] = useState([{ code: "", name: "", unitOfMeasure: "", stockQuantity: "" }]);

    const dispatch = useDispatch();



    //useeffect

    useEffect(() => {

        debugger

        (() => Get())();

    }, []);



    // Call API to update profile settings changes

    function Get() {

        axios.get(`https://localhost:7054/api/Meterial/GetById/?id=1`)
            .then(result => {
                console.log(result); return (
                    setResult(result.data)

                );
            })

            .catch(error => { console.error(error); throw error; });

    }







    // Call API to update profile settings changes

    function Save() {

        debugger;

        console.log(result);

        dispatch(showNotification({ message: "Profile Updated", status: 1 }))

    }



    const ChangeField = (fieldName, value) => {

        setResult(prevResult => ({
            ...prevResult,
            [fieldName]: value
        }));

        // switch (fieldName) {

        //     case "code": result.code = value; break;

        //     case "name": result.name = value; break;

        //     case "unitOfMeasure": result.unitOfMeasure = value; break;

        //     case "stockQuantity": result.stockQuantity = value; break;

        // }

        // return(

        // setResult(result)

        // )

    }



    return (



        <>



            <TitleCard title="Profile Settings" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="form-control w-full">

                        <label className="label"><span className="label-text text-base-content">Kodu</span></label>

                        <input type="text" value={result.code} className="input  input-bordered w-full " onChange={(e) => ChangeField("code", e.target.value)} />
                    </div>
                    <div className="form-control w-full">

                        <label className="label"><span className="label-text text-base-content">Adı</span></label>

                        <input type="text" id="name" value={result.name} className="input  input-bordered w-full " onChange={(e) => { ChangeField("name", e.target.value) }} />

                    </div>

                    <div className="form-control w-full">

                        <label className="label"><span className="label-text text-base-content">Birimi</span></label>

                        <input type="text" id="unitOfMeasure" value={result.unitOfMeasure} className="input  input-bordered w-full " onChange={(e) => { ChangeField("unitOfMeasure", e.target.value) }} />

                    </div>

                    <div className="form-control w-full">

                        <label className="label"><span className="label-text text-base-content">Stok Miktarı</span></label>

                        <input type="text" id="stockQuantity" value={result.stockQuantity} className="input  input-bordered w-full " onChange={(e) => { ChangeField("stockQuantity", e.target.value) }} />

                    </div>

                </div>



                <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => { Save() }}>Kaydet</button></div>

            </TitleCard>



        </>

    )

}



export default Deneme