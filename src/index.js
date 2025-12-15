import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { useEffect } from 'react';

//samp data
const burgerData = [
  {
    name: "Jalapeño Burger",
    ingredients: "Ground patty, jalapeños, pepper cheese, bun.",
    currency: "₱",
    price: 169,
    photoName: "burgers/jalapeno.jpg",
    soldOut: false,
  },
  {
    name: "Classic Cheeseburger",
    ingredients: "Ground beef patty, cheese, bun.",
    currency: "₱",
    price: 200,
    photoName: "burgers/classic cheese burger.jpg",
    soldOut: false,
  },
  {
    name: "Bacon Cheeseburger",
    ingredients: "Ground beef patty, cheese, bacon, bun.",
    currency: "₱",
    price: 250,
    photoName: "burgers/baconBurger.jpg",
    soldOut: false,
  },
  {
    name: "Mushroom Burger",
    ingredients: "Ground patty, mushrooms, Swiss cheese, bun.",
    price: 220,
    currency: "₱",
    photoName: "burgers/mashroomBurger.jpg",
    soldOut: false,
  },
  {
    name: "BBQ Burger",
    ingredients: " Ground beef patty, BBQ sauce, bun",
    price: 276,
    photoName: "burgers/bbqBurger.jpg",
    currency: "₱",
    soldOut: true,
  },
  {
    name: "Veggie Burger",
    ingredients: "Vegetable-based patty (beans, grains, vegetables), bun.",
    price: 160,
    photoName: "burgers/veggieBurger.jpg",
    soldOut: false,
    currency: "₱",
  },
];

//main component
function App() {
  return (

    <div className='container'>
      <Header />
      <Menu />
      <Footer />
      <ChatBot />
    </div>

  );
}

function Header() {
  const headStyle = { color: 'red', fontSize: '50px' }

  return (
    <header className='header'>
      <h1 style={headStyle}>John's Burgers</h1>
    </header>
  )
}

function Menu() {
  //react don't return a truthy or falsey value but it happily return a 0
  //remember when we write one piece of JSX that JSX can only have basically one root element (you )
  const burger = burgerData
  const countBurgers = burger.length    //check the length if it's true or false

  return (
    <main className='menu'>
      <h2>Our Menu</h2>
      {/* conditional rendering (ternary) */}
      {countBurgers ? (

        <> {/*this is react fragment it will help us return mutliple html tag without putting it in unccessary div*/}
          <p >
            Burgers so good, even John can't believe he made this. Grab one before he eats them all LOL!
          </p>

          <ul className='pizzas'>
            {burger?.map((display) => <Burger dataObj={display} key={display.name} />)}
          </ul>
        </>

      ) : <NullMessage />
      }
    </main >
  )
}

function Burger({ dataObj }) { // destructure here

  // if (props.dataObj.soldOut) return (<p>Sold Out!</p>)   - multiple return conditional rendering

  const active = { color: 'orangered', fontWeight: '500' }
  const soldOut = { color: '888' }
  const priceStyle = { fontWeight: '500' }

  return (
    <li className={`pizza ${dataObj.soldOut ? 'sold-out' : ''}`}>
      <img src={dataObj.photoName} alt={dataObj.name} ></img>
      <div>
        <h3 style={dataObj.soldOut ? soldOut : active}>{dataObj.name}</h3>
        <p>{dataObj.ingredients}</p>
        <span style={priceStyle}>{dataObj.currency} {dataObj.price}</span>
      </div>
    </li>
  );
}

function NullMessage() {
  return (<p> We are cooking the best burger at the moment, We will be right back!</p >)
}

function Footer() {
  const hour = new Date().getHours()                     // this return  11 pm
  const openHour = 12                                    // open at 12 pm
  const closeHour = 22                                   // close at 10 pm
  const isOpen = hour >= openHour && hour <= closeHour   // greater 12 less than 22(11pm ) greater > 13(1), 14(2), 15(3), 16(4), 17(5), 18(6), 19(7), 20(8), 21(9), 22(10) < less 23 false 
  //later on we can use this variables as properties or 'props'

  return (
    <footer className='footer'>
      {isOpen ? (
        <OpenShop closeHour={closeHour} openHour={openHour} /> //instead using props we can destructure it directly
      ) :
        <CloseShop openHour={openHour} closeHour={closeHour} />
      }
    </footer >
  )
}

function CloseShop({ openHour, closeHour }) {
  return (
    <div className='order'>
      <p>We are happy to have you at {openHour}:00 until {closeHour}:00</p>

      <button className='btn'>Make Reservation</button>
    </div >
  )

}

function OpenShop({ closeHour, openHour }) {
  return (
    <div className='order'>
      <p>We are open from {openHour}:00 until {closeHour}:00 Come visit us today!</p>

      <button className='btn'>Order Now</button>
    </div>
  )
}

function ChatBot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
      Chatbot.init({
        chatflowid: "04cd4b97-e9fb-452b-ab47-4e3dcee0c5e3",
        apiHost: "https://cloud.flowiseai.com",
      })
    `;

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}

//render
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<React.StrictMode><App /></React.StrictMode>)