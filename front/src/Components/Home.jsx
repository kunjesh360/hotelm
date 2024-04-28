import React, { useState } from 'react';
import one from '../assets/img/01.png';
import two from '../assets/img/02.png';
import three from '../assets/img/03.png';
import four from '../assets/img/04.png'; // Corrected from 'fore' to 'four' based on standard naming
import HOTEL from '../assets/img/hotel-1.jpg';
import SWIMINGPOOL from '../assets/img/hotel-2.jpg';
import DECK from '../assets/img/hotel-3.jpg';
import MARRIAGE from '../assets/img/hotel-5.jpg';
import GARDEN from '../assets/img/hotel-4.jpg';
// import '../assets/css/style-explore-page.css';
// import '../assets/css/style.css';



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

function Home() {
  return (
  <div className="h-screen flex flex-col  overflow-y-scroll scroll-smooth">
  {/* Slideshow section taking up 2/3 of the page */}
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

  {/* ExplorePage section taking up 1/3 of the page */}
  <div className="flex-1" style={{ height: 'calc(100vh / 3)' }}>
    <ExplorePage />
  </div>
</div>

  );
}

export default Home;
