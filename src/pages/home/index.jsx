import { useSelector } from 'react-redux';
import Card from '../../components/card';
import Loader from "../../components/loader"
import Error from "../../components/error"
import "./home.scss"

const Home = () => {

  const { jobs, isLoading, error } = useSelector((store) => store.jobReducer);

  // bir dizi içerisindeki verileri status değerlerine göre gruplandırarak birden fazla dizi oluşturmak istiyorum

  const grouped = jobs.reduce((grouped, job) => {
    // eğer yeni oluşturduğumuz nesnede status e karşılık gelen bir dizi yoksa boş bir dizi oluştur

    if(!grouped[job.status]) {
      grouped[job.status] = [];
    }

    // işin status değerine karşılık gelen diziye işi pushla
    grouped[job.status].push(job);
    
    // nesnenin son halini return et
    return grouped;
  }, {});

  console.log(grouped);

  return (
    <div className='home-page'>
      {isLoading ? ( <Loader />
      ) : error ? ( <Error info={error} /> 
      ) : (
        <div className='layout'>
          {Object.keys(grouped).map((status) => (
            <div key={status} className='group'>
              <h1 className='title'>{status} ({grouped[status].length})</h1>

              <div className='list'>
                {grouped[status].map((job) => (
                  <Card key={job.id} job={job} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )
      
      }
    </div>
  )
}

export default Home