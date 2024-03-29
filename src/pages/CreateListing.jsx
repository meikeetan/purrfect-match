import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid'
import Spinner from "../components/Spinner";

function CreateListing() {
  // eslint-disable-next-line
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "adoption",
    name: "",
    years: 0,
    months: 0,
    gender: true,
    vaccination: true,
    sterilisation: true,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
  });

  const {
    type,
    name,
    years,
    months,
    gender,
    vaccination,
    sterilisation,
    regularPrice,
    discountedPrice,
    images,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => { 
    e.preventDefault();
    console.log('hi')

    setLoading(true);

    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error('Discounted price needs to be less than regular price');
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Max 6 images");
      return;
    }

  // Store image in firebase
  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage()
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

      const storageRef = ref(storage, 'images/' + fileName)

      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          reject(error)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const imgUrls = await Promise.all(
    [...images].map((image) => storeImage(image))
  ).catch(() => {
    setLoading(false)
    toast.error('Images not uploaded')
    return
  })

  const formDataCopy = {
    ...formData,
    imgUrls,
    timestamp: serverTimestamp()
  }

    delete formDataCopy.images
    !formDataCopy.sterilisation && delete formDataCopy.discountedPrice

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
    setLoading(false)
    toast.success('Listing saved')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
}

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>

      <main>
      <form onSubmit={onSubmit}>
          <label className="formLabel">Cats for Adoption / Sale</label>
          <div className="formButtons">
          <button
              type="button"
              className={type === "adoption" ? "formButtonActive" : "formButton"}
              id="type"
              value="adoption"
              onClick={onMutate}
            >
              Adoption
            </button>
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>
          </div>

          <label className="formLabel">Name of Cat</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="3"
            required
          />

            <div className='formAge flex'>
            <div>
              <label className='formLabel'>Years</label>
              <input
                className='formInputSmall'
                type='number'
                id='years'
                value={years}
                onChange={onMutate}
                min='0'
                max='30'
                required
              />
            </div>
            <div>
              <label className='formLabel'>Months</label>
              <input
                className='formInputSmall'
                type='number'
                id='months'
                value={months}
                onChange={onMutate}
                min='0'
                max='12'
                required
              />
            </div>
          </div>

          <label className='formLabel'>Gender</label>
          <div className='formButtons'>
            <button
              className={gender ? 'formButtonActive' : 'formButton'}
              type='button'
              id='gender'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Male
            </button>
            <button
              className={
                !gender && gender !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='gender'
              value={false}
              onClick={onMutate}
            >
              Female
            </button>
          </div>

          <label className='formLabel'>Vaccination</label>
          <div className='formButtons'>
            <button
              className={vaccination ? 'formButtonActive' : 'formButton'}
              type='button'
              id='vaccination'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !vaccination && vaccination !== null
                  ? 'formButtonActive'
                  : 'formButton'
              }
              type='button'
              id='vaccination'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

<label className='formLabel'>Sterilisation</label>
          <div className='formButtons'>
            <button
              className={sterilisation ? 'formButtonActive' : 'formButton'}
              type='button'
              id='sterilisation'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !sterilisation && sterilisation !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='sterilisation'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
            />
            {type === 'adoption' && <p className='formPriceText'>$ / Month</p>}
          </div>

<label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;