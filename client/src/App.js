import axios from 'axios'
import { useEffect, useState } from 'react';
import { getAll, post } from './api/requests';
function App() {
  // cloudinary qydxwwdk
  const [selectedImage, setSelectedImage] = useState(null)
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
    getAll().then((res)=>{
      setData(res)
    })
  },[])

  function uploadImage(file) {
    setLoading(true)
    const formData = new FormData();
    formData.append('file', selectedImage)
    formData.append('upload_preset', 'qydxwwdk')
    axios.post(" https://api.cloudinary.com/v1_1/djapa9ble/image/upload", formData)
      .then((res) => {
        const newData = {
          name:name,
          imageURL: res.data.secure_url
        }
        setData([...data, newData])
        post(newData)
        setLoading(false)
      })
  }
  return (
    <>
      {loading ? <div>loading...</div> : 
      <>
      <form onSubmit={(e) => {
        e.preventDefault();
        uploadImage();


      }}>
        <input type='text' onChange={(e)=>{
          setName(e.target.value)
        }} placeholder='enter name'/>
        <input onChange={(e) => {
          setSelectedImage(e.target.files[0])
        }} type="file" />

        <button type="submit">add</button>
      </form>
      
      <ul>
        {data && data.map((res,idx)=>{
          return <li key={idx}>
            <p>{res.name}</p>
            <img width={100} height={100} alt='image' src={res.imageURL} />
          </li>
        })}
      </ul>
      </>}
    </>
  );
}

export default App;
