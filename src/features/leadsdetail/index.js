import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';


function LeadsDetail() {
    const { id } = useParams();
    const [leadData, setLeadData] = useState(null);


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


    //Malzeme Listesi İşlemleri Start
    const [materials, setMaterials] = useState([]);
    const [materialSelection, setMaterialSelection] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState("");
    const [description, setDescription] = useState("");
    const [requestedDate, setRequestedDate] = useState("");


    const addMaterial = () => {
        if (materialSelection && quantity && unit && description && requestedDate) {
            const newRow = {
                siraNo: materials.length + 1,
                malzeme: materialSelection,
                miktar: quantity,
                birim: unit, 
                aciklama: description, 
                tarih: requestedDate, 
            };
            setMaterials([...materials, newRow]);
            setMaterialSelection('');
            setQuantity('');
            setUnit('');
            setDescription('');
            setRequestedDate('');
        } else {
            alert('Yeni Malzeme Eklerken Eksik Veri Girdiniz. Lütfen Tüm Alanları Doldurun.');
        }
    };
    

    //Malzeme Listesi İşlemleri End

    //malzeme silme start
    const deleteMaterial = (index) => {
        const updatedMaterials = [...materials];
        updatedMaterials.splice(index, 1);
        setMaterials(updatedMaterials);
    };
    // malsemesilmeend

    useEffect(() => {
        axios.get(`https://localhost:7054/api/Demand/GetById?id=${id}`)
            .then(response => {
                setLeadData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);



    //silme...


    if (!leadData) {
        return <p>Yükleniyor...</p>;
    }

    return (
        <TitleCard title="Talep Formu Düzenleme" topMargin="mt-2">
            <div className="p-4">
                <div className="mt-4">
                    <div className="flex items-center">
                        <p className="text-gray-500">Tarih: Create Date</p>
                        <p className="text-gray-500 ml-4">Talep No: {leadData.code}</p>
                        <div className="ml-auto">
                            <p className="text-gray-600 font-semibold">Talep Durumu:</p>
                            <label className="ml-2">
                                <input type="radio" name="talepDurumu" value="acil" /> Acil
                            </label>
                            <label className="ml-4">
                                <input type="radio" name="talepDurumu" value="normal" /> Normal
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p>Departman:</p>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <p>Talep Nedeni:</p>
                            <input type="text" className="w-full border rounded p-2" defaultValue={leadData.name} />
                        </div>
                        <div>
                            <p>Kullanım Yeri:</p>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <p>Masraf Merkezi:</p>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <p>Proje Kodu:</p>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <p>Proje Kodu:</p>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <p>Açıklama:</p>
                            <textarea className="w-full border rounded p-2"></textarea>
                        </div>
                        <div>
                            <p>Not:</p>
                            <textarea className="w-full border rounded p-2"></textarea>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border" />

                {/* Malzeme Listesi */}
                <h2 className="text-2xl font-semibold my-8 ">Yeni Malzeme Ekle</h2>

                <div className="mt-4">
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p>Malzeme:</p>
                            <select
                                className="w-full border rounded p-2"
                                value={materialSelection}
                                onChange={(e) => setMaterialSelection(e.target.value)}
                                id='meterial'
                            >
                                <option key='0' value=''>
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
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Birimi (ADET/KG vb):</p>
                            <input type="text" className="w-full border rounded p-2" value={unit}
                                onChange={(e) => setUnit(e.target.value)} placeholder='ADET/KG vb.' />
                        </div>
                        <div>
                            <p>Talep Edilen Temin Tarihi:</p>
                            <input type="datetime-local" className="w-full border rounded p-2" value={requestedDate}
                                onChange={(e) => setRequestedDate(e.target.value)} />
                        </div>
                        <div>
                            <p>Açıklama / Ürün Kodu</p>
                            <textarea className="w-full border rounded p-2" value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 text-white w-1/3 border rounded p-2 ml-2 mt-5"
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
                            {materials.map((material, index) => (
                                <tr key={index}>
                                    <td>{material.siraNo}</td>
                                    <td>{material.malzeme}</td>
                                    <td>{material.miktar}</td>
                                    <td>{material.birim}</td>
                                    <td>{material.aciklama}</td>
                                    <td>{material.tarih}</td>
                                    <td>
                                    <button className="btn btn-square bg-red-700" onClick={() => deleteMaterial(index)}><TrashIcon className="w-5" /></button></td>
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
