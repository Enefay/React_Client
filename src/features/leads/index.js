import moment from "moment"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { showNotification } from '../common/headerSlice'
import axios from "axios"
import { useNavigate } from "react-router-dom";




const TopSideButtons = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Talep Ekle", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right"> 
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>POPUP</button>
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => navigate(`/app/leadscreate`)}>Talep Ekle</button>
        </div>
    )
}

function Leads() {

    // api
    const navigate = useNavigate();
    const [demands, setDemands] = useState([]);

    useEffect(() => {
        (() => Get())();
    }, []);

    function Get() {
        axios.get("https://localhost:7054/api/Demand/Get")
            .then(result => {
                return (
                    setDemands(result.data)
                );
            })
            .catch(error => { console.error(error); throw error; });

    }
    function Delete() {
        const result = axios.get("https://localhost:7054/api/Demand/GetById?id=");
        setDemands(result);
        console.log(result);
    }
    function Save() {
        const result = axios.get("https://localhost:7054/api/Demand/GetById?id=");
        setDemands(result);
        console.log(result);
    }
    // api

    const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLeadsContent())
    }, [])

    const getDummyStatus = (index) => {
        //talep durumları taslak / yönetici onay/ satın alma/ teklif
        if (index % 4 === 0) return <div className="badge">Taslak</div> 
        else if (index % 4 === 1) return <div className="badge badge-success">Yönetici Onayı Bekleniyor</div>
        else if (index % 4 === 2) return <div className="badge badge-secondary">Teklif Aşaması</div>
        else if (index % 4 === 3) return <div className="badge badge-accent">Satın Alma Bekleniyor</div>
        else return <div className="badge badge-ghost">Taslak</div>
    }

    const deleteCurrentLead = (index) => {
        dispatch(openModal({
            title: "Talebi İptal Et", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Talebi iptal Etmek İstiyor Musunuz ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
        }))
    }

    return (
        <>

            <TitleCard title="Talep Listesi" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Talep Kodu</th>
                                <th>Adı</th>
                                <th>Durumu</th>
                                <th>Onay Verecek Yönetici</th>
                                <th>Yönetici Onay Tarihi</th>
                                <th>Onay Verecek Satın Alma Sorumlusu</th>
                                <th>Satın Alma Onay Tarihi</th>
                                <th>Güncelle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                demands.map(function fn(item){
                                    return (
                                        <tr key={item}>
                                        <td >{item.id || "-" }</td>
                                        <td>{item.code || "-" }</td>
                                        <td>{item.name || "-" }</td>
                                        <td>{getDummyStatus(item.status) || "-" }</td>
                                        <td>{item.manager?.userName || "-" }</td>
                                        <td>{item.managerApproveDate || "-" }</td>
                                        <td>{item.purchasingResponsible?.userName || "-" }</td>
                                        <td>{item.purchasingApproveDate  || "-" }   </td>
                                        <td><button className="btn btn-square btn-warning" onClick={() => navigate(`/app/demand-detail/${item.id}`)}><PencilSquareIcon className="w-5" /></button></td>
                                        <td><button className="btn btn-square bg-red-700 " onClick={() => deleteCurrentLead(item)}><TrashIcon className="w-5" /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Leads