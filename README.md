# PURRFECT MATCH 🐈🐾
Purrfect Match is a React-based web application designed to streamline the process of pet adoption and sales, specifically focusing on our beloved feline friends. 

With Purrfect Match, users can effortlessly create their own profiles and connect with others in the community to either list cats for adoption or sale, or to find their purrfect companion.

# LINK 🔗
[https://purrfect-match-one.vercel.app/](https://purrfect-match-flax.vercel.app/)

# CODE EXPLANATION 🗣️

## COMPONENTS 

randomCatPic.jsx 
 • Renders a cat image, that changes every second, that is produced through calling Cat API 

Navbar.jsx 
 • Represents a responsive navigation bar to navigate to different sections of the application, namely “Explore” and “Profile” 

ListingItem.jsx
 • Renders a list item containing details of the listing item, including its name and price 
 • Includes routing using ‘react-router-dom’ for navigation to a detailed view of the listing item

## PAGES

Profile.jsx 
 • Accesses saved user’s info information from firebase

createListings.jsx
 • Represents a form for users to create a new listing 
 • Includes fields of various details about the listings such as name of cat, age, gender, price etc

Explore.jsx 
 • Represents a page for 2 different categories: cats for adoption and cats for sale 

Category.jsx
 • Displays listings for users to browse within a specific category 
 • Fetch listings from firestone and displays them 
 • When listings are fetched, they are displayed in a list using the ListingItem component. Each listing item includes details such as the name and price of the cat adoption or sale
 • <Spinner />, a loading spinner that is displayed to indicate that data is being loaded

Listing.jsx 
 • Represents a detailed view page for a specific listing 
 • The page includes information about the listing such as name, price, gender of the cat 

# SCREENSHOTS 📸
<img width="1440" alt="Screenshot 2024-03-30 at 1 04 21 AM" src="https://github.com/meikeetan/purrfect-match/assets/152507735/a66c6471-494b-4d4a-874c-4101165de4e9">



# FUTURE ENHANCEMENTS 
 • Can have more pet categories 
 • Include filter feature to filter cats shown based on user’s preference 
 • Add input box to add remarks about cats when listing
 • Include contact details or chat function to facilitate adoption or sale process between accounts
