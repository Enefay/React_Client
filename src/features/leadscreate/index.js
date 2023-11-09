import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { Link } from 'react-router-dom';


function LeadsCreate() {
    const [leadData, setLeadData] = useState({
        details: []
    });

    //apiden malzeme listeleme islemleri....start
    const [meterials, setMeterials] = useState([]);

    useEffect(() => {
        (() => GetMalzemes())();
    }, []);

    function GetMalzemes() {
        axios.get("https://localhost:7054/api/Meterial/Lookup")
            .then(result => {
                return (
                    setMeterials(result.data)
                );
            })
            .catch(error => { throw error; });
    }


    //apiden malzeme listeleme islemleri....end
    const [fullData, setFullData] = useState([]);


    const [newDemands, setNewDemands] = useState({
        code: '',
        createdDate: '',
        costCenter: '',
        demandDescription: '',
        demandNote: '',
        placeOfUse: '',
        projectCode: '',
        status: '',
        type: '',
        reasonForDemand: '',
        material: '',
        quantity: '',
        unit: '',
        demandProcurementDate: '',
        description: '',
    });

    // Yeni talep eklemek için işlev
    const addDemand = () => {
        const newDemand = {
            code: newDemands.code,
            createdDate: null,
            costCenter: newDemands.costCenter,
            demandDescription: newDemands.demandDescription,
            demandNote: newDemands.demandNote,
            placeOfUse: newDemands.placeOfUse,
            projectCode: newDemands.projectCode,
            status: 0, 
            type: 0,
            reasonForDemand: newDemands.reasonForDemand,
            details: leadData.details,
        };


        const updatedDetails = [...fullData, newDemand];
        
        setFullData(updatedDetails); 
     
        setNewDemands({
            code: '',
            createdDate: '',
            costCenter: '',
            demandDescription: '',
            demandNote: '',
            placeOfUse: '',
            projectCode: '',
            status: '',
            type: '',
            reasonForDemand: '',
            material: '',
            quantity: '',
            unit: '',
            demandProcurementDate: '',
            description: '',
        });
        
        //VTKAYDETMEISLEMLERİ
        const updatedData = capitalizeKeysRecursively(updatedDetails[0]);
        // POST İŞLEMİ
        axios.post("https://localhost:7054/api/Demand/Insert", updatedData)
            .then((response) => {
                console.log("Yanıt:", response.data);
                setFullData([])
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Hata Yanıt Verisi:", error.response.data);
                    console.error("Hata Durum Kodu:", error.response.status);
                } else {
                    console.error("Hata Mesajı:", error.message);
                }
            });

            
    };




    // Malzeme Ekleme VTSİZ START
    const [newMaterials, setNewMaterials] = useState({
        material: '',
        quantity: '',
        unit: '',
        demandProcurementDate: '',
        description: '',
    });
    const addMaterial = () => {
        if (
            newMaterials.material &&
            newMaterials.quantity &&
            newMaterials.unit 
            &&
            newMaterials.demandProcurementDate
        ) {
            const selectedMaterial = meterials.find(item => item.text === newMaterials.material);
            
            if (selectedMaterial) {
                const newMaterial = {
                    demand:{
                        id:10
                    },
                    meterial:{
                        id:selectedMaterial.id,
                        name: newMaterials.material,
                    },
                    currency:{
                        id:1
                    },
                    quantity: newMaterials.quantity,
                    unitPrice:2, //asd
                    unit: newMaterials.unit,
                    demandProcurementDate: newMaterials.demandProcurementDate,
                    description: newMaterials.description,
                };

                const updatedDetails = [
                    ...leadData.details,
                    newMaterial,
                ];
                setLeadData({
                    ...leadData,
                    details: updatedDetails,
                });
                setNewMaterials({
                    material: '',
                    quantity: '',
                    unit: '',
                    demandProcurementDate: '',
                    description: '',
                });
            } else {
                alert("Selected material not found in the list.");
            }
        } else {
            alert("Please fill in all the required information.");
        }
    };
    

    // Malzeme Ekleme VTSİZ END



    //MALZEME SİLME VTSİZ START
    const removeMaterial = (index) => {
        const updatedDetails = [...leadData.details];
        updatedDetails.splice(index, 1);
        setLeadData({
            ...leadData,
            details: updatedDetails,
        });
    };
    //MALZEME SİLME VTSİZ END
    
    //ilk harf büyütme 
    function capitalizeKeysRecursively(obj) {
        if (typeof obj !== 'object' || obj === null) {
          return obj;
        }
      
        if (Array.isArray(obj)) {
          return obj.map((item) => capitalizeKeysRecursively(item));
        }
      
        const result = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            result[capitalizedKey] = capitalizeKeysRecursively(obj[key]);
          }
        }
        return result;
      }
      
    return (

        <TitleCard title="Talep Formu Oluştur" topMargin="mt-2">
            <div className="p-4">
                <div className="mt-4">
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p>Departman:</p>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <p>Talep Nedeni:</p>
                            <input type="text" className="w-full border rounded p-2" onChange={(e) => setNewDemands({ ...newDemands, reasonForDemand: e.target.value })} />
                        </div>
                        <div>
                            <p>Kullanım Yeri:</p>
                            <input type="text" className="w-full border rounded p-2" onChange={(e) => setNewDemands({ ...newDemands, placeOfUse: e.target.value })} />
                        </div>
                        <div>
                            <p>Masraf Merkezi:</p>
                            <input type="text" className="w-full border rounded p-2" onChange={(e) => setNewDemands({ ...newDemands, costCenter: e.target.value })} />
                        </div>
                        <div>
                            <p>Proje Kodu:</p>
                            <input type="text" className="w-full border rounded p-2" onChange={(e) => setNewDemands({ ...newDemands, projectCode: e.target.value })} />
                        </div>
                        <div>
                            <p>Talep Durumu:</p>
                            <label className="w-2/4 mr-5 ">
                                <input type="radio" name="talepDurumu" value="acil" className="border rounded mt-3" /> Acil
                            </label>
                            <label className="w-2/4 mx-5">
                                <input type="radio" name="talepDurumu" value="normal" className=" border rounded mt-3"
                                /> Normal
                            </label>
                        </div>
                        <div>
                            <p>Açıklama:</p>
                            <textarea className="w-full border rounded p-2" onChange={(e) => setNewDemands({ ...newDemands, demandDescription: e.target.value })}></textarea>
                        </div>
                        <div>
                            <p>Not:</p>
                            <textarea className="w-full border rounded p-2" onChange={(e) => setNewDemands({ ...newDemands, demandNote: e.target.value })}></textarea>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border" />

                {/* Malzeme Listesi */}
                <h2 className="text-2xl font-semibold my-8">Yeni Malzeme Ekle</h2>

                <div className="mt-4">
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p>Malzeme:</p>
                            <select
                                className="w-full border rounded p-2"
                                id="material"
                                value={newMaterials.material}
                                onChange={(e) => setNewMaterials({ ...newMaterials, material: e.target.value })}
                            >
                                <option key="0" value="">
                                    Malzeme Seçiniz..
                                </option>
                                {meterials.map(function fn(item) {
                                    return (
                                        <option key={item.id} value={item.text}>
                                            {item.text}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <p>Miktar:</p>
                            <input
                                type="number"
                                className="w-full border rounded p-2"
                                placeholder="Miktar"
                                value={newMaterials.quantity}
                                onChange={(e) => setNewMaterials({ ...newMaterials, quantity: e.target.value })}
                            />
                        </div>
                        <div>
                            <p>Birimi (ADET/KG vb):</p>
                            <input
                                type="text"
                                className="w-full border rounded p-2"
                                placeholder="ADET/KG vb."
                                value={newMaterials.unit}
                                onChange={(e) => setNewMaterials({ ...newMaterials, unit: e.target.value })}
                            />
                        </div>
                         <div>
                            <p>Talep Edilen Temin Tarihi:</p>
                            <input
                                type="datetime-local"
                                className="w-full border rounded p-2"
                                value={newMaterials.demandProcurementDate}
                                onChange={(e) =>
                                    setNewMaterials({ ...newMaterials, demandProcurementDate: e.target.value })
                                }
                            />
                        </div> 
                        <div>
                            <p>Açıklama / Ürün Kodu:</p>
                            <textarea
                                className="w-full border rounded p-2"
                                value={newMaterials.description}
                                onChange={(e) => setNewMaterials({ ...newMaterials, description: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 text-white w-1/6 ml-auto border rounded p-2 ml-2 mt-5"
                            onClick={addMaterial}
                        >
                            Ekle
                        </button>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold my-8 ">Talep Edilen Malzemeler</h2>

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Sıra No</th>
                                <th>Malzeme/Hizmet Adı</th>
                                <th>Miktarı</th>
                                <th>Birimi</th>
                                <th>Açıklama / Ürün Kodu</th>
                                <th>Talep Edilen Temin Tarihi</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...leadData.details].map((detail, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{detail?.meterial?.name}</td>
                                    <td>{detail?.quantity}</td>
                                    <td>{detail?.unit}</td>
                                    <td>{detail?.description}</td>
                                    <td>{new Date(detail?.demandProcurementDate).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => removeMaterial(index)} className="btn btn-square bg-red-700">
                                            <TrashIcon className="w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                <div className="flex justify-center bg-green-600 text-white w-1/3 border rounded p-2 ml-2 mt-5">
                <Link to="/app/leads" >
                <button
                //   asd
                        onClick={addDemand}
                    >
                        Ekle
                    </button>
                </Link>
         
                </div>

            </div>
        </TitleCard>
    );
}

export default LeadsCreate;
