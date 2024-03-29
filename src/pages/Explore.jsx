import { Link } from 'react-router-dom'
import adoptionCategoryImage from '../assets/jpg/adoptableCatsCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCatsCategoryImage.jpg'
import RandomCatPic from '../components/RandomCatPic'

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader' style={{position:'relative',left:'40%'}}>Purrfect Match</p> 
      </header>
      <RandomCatPic/>
      <main>
        <p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/category/adoption'>
            <img
              src={adoptionCategoryImage}
              alt='adoption'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Adoptable Feline Companions</p>
          </Link>
          <Link to='/category/sale'>
            <img
              src={sellCategoryImage}
              alt='sell'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Purebred Feline Listings</p>
          </Link>
        </div>
      </main>
      
    </div>
  )
}

export default Explore