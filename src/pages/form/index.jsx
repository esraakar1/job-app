import React, { useEffect, useState } from 'react'
import Input from './input'
import { statusOptions, typeOptions } from '../../utils/constants'
import "./form.scss"
import api from '../../utils/api'
import { useDispatch } from 'react-redux'
import { createJob, updateJob } from '../../redux/slices/jobSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getJob } from '../../utils/service'
import { toast } from 'react-toastify'


const Form = () => {

  const [editItem, setEditItem] = useState(null);

 // sadece status değerini state te tutuyoruz cünkü seçilen status e göre inputunun label ve name değerleri değişecek
  const [status, setStatus] = useState(editItem?.status || "Mülakat");

  const dispatch = useDispatch()
  // Fonksiyon içinde yönlendirme yapmak için kullanılan metod
  const navigate = useNavigate()
  const { mode } = useParams();


  useEffect(() => {
    // oluşturma modunda ise fonksiyon dursun
    if (mode === "create") return setEditItem(null);

    // güncelleme modunda ise elemanın bilgilerini al
    getJob(mode).then((data) => 
    {  setEditItem(data);
      setStatus(data.status);
    });
  }, [mode])

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const jobData = Object.fromEntries(formData.entries());

    if(!editItem) {

    api
    .post("/jobs", jobData)
    .then((res) => {
      dispatch(createJob(res.data))

      // kullanıcıyı başvurular sayfasına yönlendir
      navigate("/")

      // bildirim ver
      toast.success("Başvuru Oluşturuldu");
    })
    .catch((err) => {
      toast.error("Başvuru Oluşturma Başarısız")
    });
  } else {
    api.patch(`/jobs/${editItem.id}`, jobData)
    .then((res) => {
      dispatch(updateJob(res.data))

      // kullanıcıyı başvurular sayfasına yönlendir
      navigate("/")

      // bildirim ver
      toast.success("Güncelleme Başarılı");
    })
    .catch((err) => {
      toast.error("Güncelleme Başarısız")
    });
  }
  }

//  date alanının name değeri 
const dateName = 
editItem?.status === "Mülakat" 
? "interview_date" 
: editItem?.status === "Reddedildi" 
? "rejection_date" 
: "date";

const dateValue = editItem && new Date(editItem[dateName])
.toISOString().slice(0, editItem.status === "Mülakat" ? 16 : 10);

  return (
    <div className='create-page'>
      <section>
      <h2>{editItem ? "Başvuruyu Güncelle" : "Yeni başvuru Oluştur"}</h2>
    <form onSubmit={handleSubmit}>
      <Input label="Pozisyon" name="position" value={editItem?.position} />

      <Input label="Şirket" name="company" value={editItem?.company} />

      <Input label="Lokasyon" name="location"value={editItem?.location}/>

      <Input label="Durum" name="status" options={statusOptions} handleChange={(e) => setStatus(e.target.value)} value={editItem?.status} />

      <Input label="Tür" name="type" options={typeOptions} value={editItem?.type} />

      <Input 
      label={
        status === "Mülakat" 
        ? "Mülakat Tarihi" 
        : status === "Reddedildi" 
        ? "Reddedilme Tarihi" 
        : "Başvuru Tarihi"
        } 
        name={status === "Mülakat" 
          ? "interview_date" 
          : status === "Reddedildi" 
          ? "rejection_date" 
          : "date"} 
        type={status === "Mülakat" 
        ? "datetime-local" 
        : "date"
        } 
        value={dateValue} />

      <div className='btn-wrapper'>
      <button>{editItem ? "Kaydet" : "Oluştur"} </button>
      </div>

    </form>
    </section>
    </div>
  )
}

export default Form