import React from "react";
import "./Home.css";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductTease from "../../components/Products/ProductTease";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";  // Import framer motion

const Home = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Khally Beddings | Luxury Bedsheets, Towels, and Robes</title>
        <meta
          name="description"
          content="Discover luxury bedsheets, soft towels, bathrobes, and more at Khally Beddings. Shop premium home essentials crafted for comfort and elegance."
        />
        <meta
          name="keywords"
          content="Khally Beddings, luxury bedsheets, cotton towels, soft pillows, bathrobes, bedding store Nigeria"
        />
        <meta name="author" content="Khally Beddings" />
      </Helmet>

        <Navbar />


      <div className="home">

        {/* First Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
         <div className="first-home">
          <h1>
            Welcome to Khally<span>-</span>Beddings
          </h1>
          <h2>
            Home of Luxurious Beddings, Bath Towels and Robes - A <br />
            Quality Choice
          </h2>
          <div className="first-home-links">
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        </motion.div>

        {/* Second Section */}
        <motion.div
          
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
        <div className="second-home">    
          <div className="bedsheet">
            <div className="first-bedsheet"></div>
            <div className="second-bedsheet"></div>
            <div className="third-bedsheet"></div>
            <div className="fourth-bedsheet"></div>
          </div>
          <div className="bedsheet-description">
            <h1>Bedsheet & Duvet Comforter</h1>
            <ul>
              <li>Fabrics Choice:</li>
              <li>T200,T250,T300,T350,T400,T500, …T1000 </li>
              <li>Plain weave or sateen weave or jacquard or printed fabrics</li>
              <li>100% polyester microfiber plain or printed fabrics</li>
              <li>
                This Plain materials duvets are customized based on the users
                choice.
              </li>
              <li>
                We also have designers duvet sets which come with pillow case,
                bedsheet, duvet which comes in different design.
              </li>
            </ul>
            <Link to="/shop">Shop Now</Link>
          </div>
          </div> 
        </motion.div>

        {/* Third Section */}
        <motion.div
          
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
        <div className="third-home">    
          <div className="pillow-description">
            <h1>Pillow Series</h1>
            <ul>
              <li>Fabrics:</li>
              <li>100% cotton downproof fabric</li>
              <li> Polycotton fabric</li>
              <li> Brushed microfiber fabric Filling:</li>
              <li> Microfiber</li>
              <li> Hollow fiber</li>
              <li> Duck down or goose down Packaging:</li>
              <li> Vaccum packed</li>
            </ul>
            <Link to="/shop"> Shop Now</Link>
          </div>
          <div className="pillow">
            <div className="first-pillow"></div>
            <div className="second-pillow"></div>
            <div className="third-pillow"></div>
            <div className="fourth-pillow"></div>
          </div>
          </div>  
        </motion.div>

        {/* Fourth Section */}
        <motion.div
          
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
        <div className="fourth-home">    
          <div className="towel">
            <div className="first-towel"></div>
            <div className="second-towel"></div>
            <div className="third-towel"></div>
            <div className="fourth-towel"></div>
          </div>
          <div className="towel-description">
            <h1>Towel Series</h1>
            <ul>
              <li>Size & Weight & Style: customized</li>
              <li> Face Towel:30x30cm,550gsm</li>
              <li> Face Towel:30x30cm,550gsm</li>
              <li> Bath Towel:80x140cm,600gsm:</li>
              <li> Bath Mat:80x35cm,1000gsm</li>
              <li>16sx16s</li>
              <li>32s/2 x 32s/2</li>
              <li>21s/2 x 21s/2</li>
              <li>Styles: Plain, Jacquard, Embroidery</li>
            </ul>
            <Link to="/shop"> Shop Now</Link>
          </div>
          </div>
        </motion.div>

        {/* Fifth Section */}
        <motion.div
          
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
        <div className="fifth-home">   
          <div className="robe-description">
            <h1>Bathrobe Series</h1>
            <ul>
              <li>Fabrics:</li>
              <li>Waffle bathrobe:Length 145cm,800g</li>
              <li>Terry bathrobe:length 130cm,1200g</li>
              <li>Velour bathrobe:length 135cm,1200g:</li>
              <li>Customized Fabrics for choice:</li>
              <li>100% cotton terry fabric,390gsm</li>
              <li>100% cotton velour fabric,380g</li>
              <li>100% cotton waffle fabric,260gsm</li>
            </ul>
            <Link to="/shop"> Shop Now</Link>
          </div>
          <div className="robes">
            <div className="first-robe"></div>
            <div className="second-robe"></div>
            <div className="third-robe"></div>
            <div className="fourth-robe"></div>
          </div>
          </div> 
        </motion.div> 
      </div>
      {/* Product Tease Section */}
      
    <ProductTease />
        
        <Footer />
    </div>
  );
};

export default Home;
