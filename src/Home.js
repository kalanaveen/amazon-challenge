import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from './Product';
import OrderPopup from './OrderPopup';

function Home() {
    const [index, setIndex] = useState(0);
    const images = [
        "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
       ]

    useEffect(() => {
        const interval = setInterval(()=>{
            let indexValue = (index+1) % 3;
            const imageClass = document.getElementById('homeImage');
            imageClass.classList.remove('imageAppear');
            setIndex(indexValue);
            // imageClass.classList.add('imageAppear');
            setTimeout(function () {
                imageClass.classList.add('imageAppear');
            }, 30)
            // if(index + 1 >= 3){
            //     const imageClass = document.getElementById('homeImage');
            //     imageClass.classList.remove('imageAppear');
            //     setIndex(0);
            //     imageClass.classList.add('imageAppear');
            // }
            // else{
            //     const imageClass = document.getElementById('homeImage');
            //     imageClass.classList.remove('imageAppear');
            //     setIndex(index + 1)
            //     imageClass.classList.add('imageAppear');
            // }
        }, 5000);
        return () => clearInterval(interval);
    }, [index])

    return (
        <div className="home">
            <div className="home_container">
                <img id="homeImage" src={images[index]} alt="" className="home__image imageAppear"/>
                <img  className="home_image" src={images[index]} alt="prime" />
                <div className="home_row">
                    <Product
                        id="101"
                        title="OPPO F19 Pro+ 5G (Fluid Black, 8GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers"
                        image="https://images-na.ssl-images-amazon.com/images/I/71nT6xat93L._SX679_.jpg"
                        price={25990}
                        rating={5}
                    />

                    <Product
                        id="102"
                        title="Samsung Galaxy M12 (Blue,4GB RAM, 64GB Storage) 6000 mAh with 8nm Processor | True 48 MP Quad Camera |"
                        image="https://images-na.ssl-images-amazon.com/images/I/71yYaNztZ0L._SL1500_.jpg"
                        price={10999}
                        rating={4}
                    />

                </div>
                <div className="home_row">
                    <Product
                        id="103"
                        title="Samsung 1.5 Ton 3 Star Inverter Split AC (Copper, Convertible 5 in 1, HD Filter, 2021 Model, Floral pattern, AR18AYLYATB)"
                        image="https://images-na.ssl-images-amazon.com/images/I/61N44JgNZjL._SL1500_.jpg"
                        price={32990}
                        rating={4}
                    />
                      <Product
                        id="104"
                        title="Samsung 1 Ton 4 Star Inverter Split AC (Copper, Convertible 5 in 1, HD Filter, 2021 Model, Floral pattern, AR12AYMYATB)"
                        image="https://images-na.ssl-images-amazon.com/images/I/61N44JgNZjL._SL1500_.jpg"
                        price={30990}
                        rating={5}
                    />
                     <Product
                        id="105"
                        title="Sanyo 1.5 Ton 3 Star Dual Inverter Split AC (Copper, PM 2.5 Filter, 2020 Model, SI/SO-15T3SCIC White)"
                        image="https://images-na.ssl-images-amazon.com/images/I/71bFctxw0vL._SL1500_.jpg"
                        price={28990}
                        rating={3}
                    />
                </div>
                <div className="home_row">
                <Product
                        id="106"
                        title="Samsung 80 cm (32 inches) Wondertainment Series HD Ready LED Smart TV UA32TE40AAKXXL (Titan Gray) (2020 model)"
                        image="https://images-na.ssl-images-amazon.com/images/I/71hk35dbxoL._SL1500_.jpg"
                        price={17499}
                        rating={5}
                    />
                    
                </div>
            </div>
            <OrderPopup/>
        </div>
    )
}

export default Home;
