import React from "react";
import "./Marquee.css";

const Marquee = () => {
    return (
        <article id="logo-marquee" className="marquee-wrapper">
            <h2>MAJOR CLIENTS INCLUDE</h2>
            <div className="marquee">
                <div className="marquee__group">
                    <img src="/Nike.png" alt="Nike" />
                    <img src="/Adobe.png" alt="Adobe" />
                    <img src="/Adidas.png" alt="Adidas" />
                    <img src="/Bape.png" alt="Bape" />
                    <img src="/Apple.png" alt="Apple" />
                    <img src="/CalvinKlein.png" alt="Calvin Klein" />
                    <img src="DJI.png" alt="DJI" />
                    <img src="DrMartens.png" alt="Dr. Martens" />
                    <img src="Giants.png" alt="Giants" />
                    <img src="GStar.png" alt="G-Star" />
                    <img src="Gucci.png" alt="Gucci" />
                    <img src="HM.png" alt="H&M" />
                    <img src="Lacoste.png" alt="Lacoste" />
                    <img src="Lululemon.png" alt="Lululemon" />
                    <img src="ON.png" alt="ON" />
                    <img src="Puma.png" alt="Puma" />
                    <img src="Reebok.png" alt="Reebok" />
                    <img src="Salomon.png" alt="Salomon" />
                    <img src="Super73.png" alt="Super73" />
                    <img src="Zara.png" alt="Zara" />
                </div>

                <div aria-hidden="true" className="marquee__group">
                    <img src="/Nike.png" alt="Nike" />
                    <img src="/Adobe.png" alt="Adobe" />
                    <img src="/Adidas.png" alt="Adidas" />
                    <img src="/Bape.png" alt="Bape" />
                    <img src="/Apple.png" alt="Apple" />
                    <img src="/CalvinKlein.png" alt="Calvin Klein" />
                    <img src="DJI.png" alt="DJI" />
                    <img src="DrMartens.png" alt="Dr. Martens" />
                    <img src="Giants.png" alt="Giants" />
                    <img src="GStar.png" alt="G-Star" />
                    <img src="Gucci.png" alt="Gucci" />
                    <img src="HM.png" alt="H&M" />
                    <img src="Lacoste.png" alt="Lacoste" />
                    <img src="Lululemon.png" alt="Lululemon" />
                    <img src="ON.png" alt="ON" />
                    <img src="Puma.png" alt="Puma" />
                    <img src="Reebok.png" alt="Reebok" />
                    <img src="Salomon.png" alt="Salomon" />
                    <img src="Super73.png" alt="Super73" />
                    <img src="Zara.png" alt="Zara" />
                </div>
            </div>
        </article>
    );
};

export default Marquee;
