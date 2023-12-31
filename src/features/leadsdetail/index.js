import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';


function LeadsDetail() {
    const { id } = useParams();
    const [leadData, setLeadData] = useState(null); //vtden gelen veri



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




    useEffect(() => {
        axios.get(`https://localhost:7054/api/Demand/GetById?id=${id}`)
            .then(response => {
                setLeadData(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [id]);





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
            newMaterials.unit &&
            newMaterials.demandProcurementDate
        ) {
            const newMaterial = {
                meterial: {
                    name: newMaterials.material,
                },
                quantity: newMaterials.quantity,
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
        }
        else {
            alert("Gerekli bilgileri girin...");
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




    if (!leadData) {
        return <p>Yükleniyor...</p>;
    }



    return (

        <TitleCard title="Talep Formu Düzenleme" topMargin="mt-2">
            <div className="p-4">
                <div className="mt-4">
                    <div className="flex items-center">
                        <p className="text-gray-500">Talep No: {leadData.code}</p>
                        <p className="text-gray-500 ml-auto">Talep Oluşturulma Tarihi: {new Date(leadData.createdDate).toLocaleString()}</p>

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p>Departman:</p>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <p>Talep Nedeni:</p>
                            <input type="text" className="w-full border rounded p-2" defaultValue={leadData.reasonForDemand} />
                        </div>
                        <div>
                            <p>Kullanım Yeri:</p>
                            <input type="text" className="w-full border rounded p-2" defaultValue={leadData.placeOfUse} />
                        </div>
                        <div>
                            <p>Masraf Merkezi:</p>
                            <input type="text" className="w-full border rounded p-2" defaultValue={leadData.costCenter} />
                        </div>
                        <div>
                            <p>Proje Kodu:</p>
                            <input type="text" className="w-full border rounded p-2" defaultValue={leadData.projectCode} />
                        </div>
                        <div>
                            <p>Talep Durumu:</p>
                            <label className="w-2/4 mr-5 ">
                                <input type="radio" name="talepDurumu" value="acil" className="border rounded mt-3"
                                    checked={leadData.type === 1}
                                    onChange={() => {
                                        setLeadData({ ...leadData, type: 1 });
                                    }}
                                /> Acil
                            </label>
                            <label className="w-2/4 mx-5">
                                <input type="radio" name="talepDurumu" value="normal" className=" border rounded mt-3" 
                                checked={leadData.type === 0} 
                                onChange={() => {
                                    setLeadData({ ...leadData, type: 0 }); 
                                }} /> Normal
                            </label>
                        </div>
                        <div>
                            <p>Açıklama:</p>
                            <textarea className="w-full border rounded p-2" defaultValue={leadData.demandDescription}></textarea>
                        </div>
                        <div>
                            <p>Not:</p>
                            <textarea className="w-full border rounded p-2" defaultValue={leadData.demandNote}></textarea>
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
                <div className="flex justify-center">
                    <button
                        className="bg-green-600 text-white w-1/3 border rounded p-2 ml-2 mt-5"
                    // onClick={}
                    >
                        Güncelle
                    </button>
                </div>
            </div>
        </TitleCard>
    );
}

export default LeadsDetail;
