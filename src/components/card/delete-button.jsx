import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteJob } from '../../redux/slices/jobSlice';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const DeleteButton = ({ id }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        

        if(!confirm("silmek istediğinizden emin misiniz?")) return;

        api.delete(`/jobs/${id}`)
        .then(() => {
            //  kaldırılma olayını reducer a haber ver
            dispatch(deleteJob(id))
            
            // bildirim gönder
            toast.success("Başvuru Listeden Kaldırıldı");
        })
        .catch((err) => {
            toast.error("Başvuru Silinirken Bir Hata Oluştu")
        });
    };

  return (
    <button className='delete' onClick={handleDelete} >
        <FaTrashAlt />
    </button>
  )
}

export default DeleteButton;