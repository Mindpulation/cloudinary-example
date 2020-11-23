import {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");


  function UploadFile() {
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData();
    formData.append('file', files[0]);
// replace this with your upload preset name
    formData.append('upload_preset', 'ml_default');
    const options = {
      method: 'POST',
      body: formData,
    };

// replace cloudname with your Cloudinary cloud_name
    return fetch('https://api.cloudinary.com/v1_1/kotakjualan/image/upload', options)
      .then(res => res.json())
      .then(res => {
        console.log(res)

        setImageUrl(res.secure_url);
        setImageAlt(`An image of ${res.original_filename}`);
      })
      .catch(err => console.log(err));
  }

  return (
  <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form method="post" encType="multipart/form-data">
          <input type="file" name="files[]" multiple />
          <button type="button" value="Upload Files" name="submit" onClick={UploadFile} >Upload Via Widget</button>
        </form>
      </main>

      <footer className={styles.footer}>
        <p>The resulting image will be displayed here</p>
        {imageUrl && (
          <img src={imageUrl} alt={imageAlt} className="displayed-image"/>
        )}
      </footer>
    </div>
  )
}
