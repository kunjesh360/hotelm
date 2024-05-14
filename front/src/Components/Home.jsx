import React, { useState } from 'react';
import one from '../assets/img/11.jpg';
import two from '../assets/img/12.jpeg';
import three from '../assets/img/03.png';
import four from '../assets/img/04.png'; 
import HOTEL from '../assets/img/hotel-1.jpg';
import SWIMINGPOOL from '../assets/img/hotel-2.jpg';
import DECK from '../assets/img/hotel-3.jpg';
import MARRIAGE from '../assets/img/hotel-5.jpg';
import GARDEN from '../assets/img/hotel-4.jpg';

import backgroundVideo from '../Components/img/hotel.mp4';  
import { Link } from 'react-router-dom';


/************************ */

import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';


// **************
const slides = [
  {
    id: 'hotel-slide',
    title: 'HOTEL RITZ-CARLTON',
    description: "India's No.1 Hotel With Luxurious Rooms",
    imgSrc: three,
    imgAlt: 'Hotel',
  },
  {
    id: 'room-slide',
    title: 'Book Your Luxurious And Super Deluxe Rooms',
    description: 'our luxurious rooms will make you feel like you are on the moon',
    imgSrc: two,
    imgAlt: 'Room',
  },
  {
    id: 'chair-slide',
    title: 'Book Your Dining Table, Reserve Your Dinner',
    description: 'our south-indian and gujarati-dish is very famous',
    imgSrc: four,
    imgAlt: 'Dining',
  },
  {
    id: 'swimming-slide',
    title: 'Enjoy With Our Flower Garden',
    description: 'our swimming pool and garden will give you a beach-like feeling',
    imgSrc: one,
    imgAlt: 'Garden',
  },
];

function Slideshow() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const { title, description, imgSrc, imgAlt } = slides[currentSlideIndex];

  return (
    <div>
      <div className="slider-controls absolute inset-0 flex justify-between">
        <button className="prev-slide w-16 h-16 m-8 bg-transparent border-2 border-black text-4xl rounded-full transform translate-y-[35vh]"
                onClick={prevSlide}>
          {'<'}
        </button>
        <button className="next-slide w-16 h-16 m-8 bg-transparent border-2 border-black text-4xl rounded-full transform translate-y-[35vh]"
                onClick={nextSlide}>
          {'>'}
        </button>
      </div>

      <div className={`${slides[currentSlideIndex].id} slide relative`}>
    <div className={`img ${slides[currentSlideIndex].id}-img w-full h-full flex justify-center items-center`}>
        <img src={imgSrc} alt={imgAlt} className="w-full h-full object-cover" />
    </div>
    <div className="text absolute inset-0 flex items-center justify-center flex-col">
        <div className="text-content w-2/3 bg-white bg-opacity-50 p-4 rounded-lg">
            <p className="text-7xl font-extrabold font-bebas text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500"> {title} </p>
            <p className="text-lg font-madimi bg-white bg-opacity-75 p-2 rounded">"{description}"</p>
        </div>
    </div>
</div>

    </div>
  );
}



function ExplorePage() {
  const cards = [
    { img: HOTEL, heading: "HOTEL", description: "Where every time feels like a wow" },
    { img: SWIMINGPOOL, heading: "SWIMING-POOL", description: "too, pass your time with your family" },
    { img: DECK, heading: "DECK CHAIRS", description: "Spike your way to enjoy" },
    { img: GARDEN, heading: "GARDEN", description: "Where every moment is captured" },
    { img: MARRIAGE, heading: "MARRIAGE HALL", description: "be happy you and your family" },
  ];

  return (
    <div id="explore-page" style={{ height: '100vh', width: '100%', backgroundColor: 'rgb(194, 213, 213)' }}>
      <div className="container" style={{
        margin: 'auto',
        height: '100vh',
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        {cards.map((card, index) => (
          <div className="card" key={index} style={{
            height: '300px',
            width: '343px',
            backgroundColor: 'rgb(255, 252, 249)',
            borderRadius: '15px',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '180px 40px 15px 1fr',
          }}>
            <div className="img" style={{ width: '343px', height: '250px' }}>
              <img className="img-card" src={card.img} alt={card.heading.toLowerCase()} style={{
                objectFit: 'cover',
                height: '200px',
                width: '343px',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
              }} />
            </div>
            <div className="heading" style={{
              marginTop: '25px',
              marginLeft: '10px',
              fontSize: '22px',
              fontFamily: '"Sarabun", sans-serif',
              fontWeight: '400',
            }}>
              <p>{card.heading}</p>
            </div>
            <div className="box-address" style={{
              fontSize: '14px',
              fontFamily: '"Tajawal", sans-serif',
              fontWeight: '250',
              marginTop: '12px',
              marginLeft: '10px',
            }}>
              <p>{card.description}</p>
            </div>
            <div className="read-more" style={{
              marginTop: '10px',
              textDecoration: 'none',
              fontSize: '6px',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}>
              <button className="read" style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                border: '0px',
                width: '110px',
                height: '30px',
                color: 'rgb(0, 0, 0)',
                borderRadius: '22px',
                backgroundColor: '#00152ecb',
              }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>READ MORE</a></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



const HeroSection = () => {
  return (
    <div className="relative">
      <video autoPlay loop muted className="absolute z-0 w-full h-full object-cover">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="relative z-10 flex justify-center items-center h-screen bg-black bg-opacity-50">
        <div className="text-center">
          <h2 className="text-5xl text-white font-bold">Experience Ultimate Luxury</h2>
          <p className="text-white mt-4">Explore the comfort and opulence of our suites.</p>
          <Link to="/HotelList" className="mt-8 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
            Book Your Stay
          </Link>
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm md:text-base">
          <div>
            <h3 className="font-bold text-lg">Hotel Management</h3>
            <p className="mt-2 text-gray-400">The best experience for managing hotels.</p>
          </div>
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2">
              <li><a href="/About" className="hover:text-gray-300 transition duration-200 ease-in-out">About Us</a></li>
              <li><a href="/HotelList" className="hover:text-gray-300 transition duration-200 ease-in-out">Services</a></li>
              <li><a href="/About" className="hover:text-gray-300 transition duration-200 ease-in-out">Contact Us</a></li>
              <li><a href="/About" className="hover:text-gray-300 transition duration-200 ease-in-out">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact Us</h4>
            <ul className="mt-2">
              <li className="text-gray-400">Phone: +123 456 7890</li>
              <li className="text-gray-400">Email: Ritz-Carlton@gmail.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex mt-2 space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-300 transition duration-200 ease-in-out">Facebook</a>
              <a href="https://twitter.com" className="hover:text-gray-300 transition duration-200 ease-in-out">Twitter</a>
              <a href="https://instagram.com" className="hover:text-gray-300 transition duration-200 ease-in-out">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs md:text-sm mt-8 md:mt-16">
          © 2024 The Ritz-Carlton Hotel Company, L.L.C. All rights reserved.
        </div>
      </div>
    </footer>
  );
  
};

function Home() {
  return (
    <>
          <div className="flex-1 h-2/3 w-1/2 mx-auto">
            <SlCarousel autoplay loop pagination>
              <SlCarouselItem>
                <img
                  alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
                  src={three}
                  className="w-full h-full object-contain"
                />
              </SlCarouselItem>
              <SlCarouselItem>
                <img
                  alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
                  src={two}
                  className="w-full h-full object-contain"
                />
              </SlCarouselItem>
              {/* <SlCarouselItem>
                <img
                  alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
                  src="/assets/examples/carousel/sunset.jpg"
                  className="w-full h-full object-contain"
                />
              </SlCarouselItem> */}
              <SlCarouselItem>
                <img
                  alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
                  src={one}
                  className="w-full h-full object-contain"
                />
              </SlCarouselItem>
              <SlCarouselItem>
                <img
                  alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
                  src={four}
                  className="w-full h-full object-contain"
                />
              </SlCarouselItem>
            </SlCarousel>
          </div>
 
 <div className="flex-grow flex">
        
        <div className="w-1/3 flex items-center justify-center p-10 bg-gray-100">
          <div>
            <h1 className="text-4xl font-bold text-center mb-4">Welcome to Our Luxury Hotel</h1>
            <p className="text-lg">
              Explore the ultimate in comfort and relaxation with our world-class amenities and breathtaking views.
            </p>
          </div>
        </div>

      
        <div className="w-2/3">
          <HeroSection />
        </div>
      </div>

    
      <div className="flex flex-col h-screen">
      <div className="flex-1 ">
        <ExplorePage />
      </div>
      <div style={{ width: "100%", height: "239px" }} className="bg-gray-200">
  <Footer />
</div>
    </div>
    </>
 



  );
}

export default Home;


{/* <div className="h-screen flex flex-col  overflow-y-scroll scroll-smooth">
{/* Slideshow section taking up 2/3 of the page */}
{/* <div className="flex-1 h-2/3 w-1/2 mx-auto">
  <SlCarousel autoplay loop pagination>
    <SlCarouselItem>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src={three}
        className="w-full h-full object-contain"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src={two}
        className="w-full h-full object-contain"
      />
    </SlCarouselItem>
    {/* <SlCarouselItem>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
        className="w-full h-full object-contain"
      />
    </SlCarouselItem> */}
//     <SlCarouselItem>
//       <img
//         alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
//         src={one}
//         className="w-full h-full object-contain"
//       />
//     </SlCarouselItem>
//     <SlCarouselItem>
//       <img
//         alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
//         src={four}
//         className="w-full h-full object-contain"
//       />
//     </SlCarouselItem>
//   </SlCarousel>
// </div> */}

{/* ExplorePage section taking up 1/3 of the page */}
{/* <div className="flex-1" style={{ height: 'calc(100vh / 3)' }}>
  <ExplorePage />
</div> */}
