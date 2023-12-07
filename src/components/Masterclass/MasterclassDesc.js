import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./MasterclassDesc.css";
import { handleAddToCart } from "../../helpers";
import { BiArrowBack } from "react-icons/bi";
import { auth } from "../../config/firebaseConfig";
import { toast } from 'sonner';

const MasterclassDesc = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const module = queryParams.get("module");
    const [isRehydrated, setIsRehydrated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const products = useSelector((state) => state.shop.products);

    const jumpToReleventSection = (id) => {
        const releventDiv = document.getElementById(id);
        // behavior: "smooth" parameter for smooth movement
        releventDiv.scrollIntoView({ behavior: "smooth" });
    };

    let price;

    if (!isRehydrated) {
        price = "Loading...";
    } else {
        price = products["MC-01"].price;
    }

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
        document.title = "The Odyssey | Creative Masterclass";

        if (Object.keys(products).length > 0) {
            setIsRehydrated(true);
        }
    }, [products]);

    useEffect(() => {
        if (module) {
            jumpToReleventSection(module);
        }
    }, [module]);

    useEffect(() => {
        // Function to check if the viewport is mobile
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
        };

        // Initial check when the component mounts
        checkIfMobile();

        // Event listener for window resize
        const handleResize = () => {
            checkIfMobile();
        };

        // Attach the event listener
        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="masterclass-desc page-section">
            <Link to="/store">
                <button className="back-to-btn">&lt; Back to Shop</button>
            </Link>

            <div className="masterclass-desc-content">
                <section className="masterclass-desc-header grid-two-columns grid">
                    {isMobile && (
                        <Link to="/store">
                            <button className="mobile-back-to-btn">
                                <BiArrowBack />
                            </button>
                        </Link>
                    )}
                    <div className="img-container">
                        <ReactPlayer
                            className="react-player"
                            url="https://vimeo.com/890699022?share=copy"
                            width="100%"
                            controls
                            playing
                        />
                    </div>
                    <div className="masterclass-intro-text-container item-name-price">
                        <h1>The Odyssey - Creative Masterclass</h1>
                        <p>Loren ipsum dolor sit amet</p>
                        <p>${price}</p>
                        <button
                            className="darkgray-background"
                            data-item-id="MC-01"
                            onClick={(e) => {
                                if (!auth.currentUser) {
                                    toast('You must be logged in to purchase the masterclass!');
                                    return;
                                }
                                handleAddToCart(e, dispatch);
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </section>
                {/* <hr /> */}
                <section
                    className="masterclass-what-we-offer grid-two-columns grid"
                    style={{ display: "none" }}
                >
                    <div className="section-text">
                        <h2>What we offer</h2>
                        <ul>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>consectetur adipiscing elit</li>
                            <li>sed do eiusmod tempor incididunt</li>
                            <li>ut labore et dolore magna aliqua</li>
                        </ul>
                    </div>
                    <div className="section-img img-container">
                        <img src="https://via.placeholder.com/500x400" alt="" />
                    </div>
                    <div className="section-img img-container">
                        <img src="https://via.placeholder.com/500x400" alt="" />
                    </div>
                    <div className="section-text">
                        <h2>What we offer</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </p>
                    </div>
                </section>
                <hr />
                <section className="masterclass-break-it-down grid-two-columns grid">
                    <h2>Let's break it down</h2>
                    <div className="module-listings" id="module_1">
                        <ol>
                            <li>
                                <p>Module 1: Cultivating a Growth Mindset and Balancing Artistry</p>
                                <ul>
                                    <li>
                                        Cultivating a Growth Mindset in the
                                        Creative Industry
                                    </li>
                                    <li>
                                        Balancing Artistic Expression and
                                        Commercial Viability
                                    </li>
                                    <li>
                                        Embracing Challenges and Navigating
                                        Setbacks
                                    </li>
                                    <li>
                                        Developing Resilience and Adaptability
                                        as a Solo Creator
                                    </li>
                                    <li>
                                        Building Confidence and Owning Your
                                        Creative Identity
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>Module 2: Essential Tools for Photography and Filmmaking</p>
                                <ul>
                                    <li>
                                    Photography Tools
                                    </li>
                                    <li>
                                    Filmmaking Tools
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>Module 3: Building Your Brand in the Creative Market</p>
                                <ul>
                                    <li>
                                    The Power of Personal Branding in the Creative Market
                                    </li>
                                    <li>
                                    Developing a Cohesive Brand Identity Across Platforms
                                    </li>
                                    <li>
                                        Growing and Engaging Your Social Media
                                        Audience
                                    </li>
                                    <li>
                                        Strategies for Brand Collaborations and
                                        Sponsorships
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div
                        className="module-img-container img-container"
                        id="first-masterclass-break-img"
                    >
                        <img src="https://i.postimg.cc/FH9S6Mds/1.jpg" alt="" />
                    </div>
                    <div className="module-img-container img-container">
                        <img src="https://i.postimg.cc/PrbZ2XqR/2.jpg" alt="" />
                    </div>
                    <div className="module-listings">
                        <ol start={4}>
                            <li>
                                <p>Module 4: Financial and Legal Acumen for Creatives</p>
                                <ul>
                                    <li>
                                    Financial Management for Solo Creators: Budgeting and Pricing Your Work
                                    </li>
                                    <li>
                                    Contracts and Legal Considerations for Freelancers
                                    </li>
                                    <li>
                                    Navigating Taxes and Accounting for Creatives
                                    </li>
                                    <li>
                                    Building a Sustainable Business Model as a Solo Creator
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>
                                Module 5: Mastering Client Interaction
                                </p>
                                <ul>
                                    <li>
                                    The Client Call
                                    </li>
                                    <li>
                                    The Call: Brainwave Cap Campaign
                                    </li>
                                    <li>
                                    Pre-Production 
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>Module 6: The Art of the Shoot</p>
                                <ul>
                                    <li>
                                    The Shoot
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div className="module-listings">
                        <ol start={7}>
                            <li>
                                <p>
                                Module 7: Crafting the Story in Post-Production
                                </p>
                                <ul>
                                    <li>
                                    The Edit
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>
                                Module 8: Excellence in Client Relations
                                </p>
                                <ul>
                                    <li>
                                        Best Practices for Reaching Out to
                                        Potential Clients
                                    </li>
                                    <li>
                                        Conducting Yourself Professionally
                                        On-Set and During Client Meetings
                                    </li>
                                    <li>
                                        Delivering Outstanding Client
                                        Experiences
                                    </li>
                                    <li>
                                        Handling Client Feedback and Revisions
                                        with Grace
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div className="module-img-container img-container">
                        <img src="https://i.postimg.cc/TYvgVLTb/3.jpg" alt="" />
                    </div>
                    <div className="module-img-container img-container">
                        <img src="https://i.postimg.cc/Z5VNzwpP/4.jpg" alt="" />
                    </div>
                    <div className="module-listings">
                        <ol start={9}>
                            <li>
                                <p>Module 9: Influencer Marketing Mastery</p>
                                <ul>
                                    <li>
                                    Understanding the Role of Influencers in the Marketing World
                                    </li>
                                    <li>
                                    Strategies for Collaborating with Brands as an Influencer
                                    </li>
                                    <li>
                                    Negotiating Fair Compensation and Deliverables
                                    </li>
                                    <li>
                                    Maintaining Authenticity and Long-Term Partnerships
                                    </li>
                                    <li>
                                    Leveraging Social Media Platforms for Brand Growth
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div className="module-listings">
                        <ol start={10}>
                            <li>
                                <p>Module 10: AI in Creativity</p>
                                <ul>
                                    <li>
                                    AI in the Creative Industry
                                    </li>
                                    <li>
                                    Favorite AI Tools for Creatives
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>Module 11: Staying Inspired and Relevant</p>
                                <ul>
                                    <li>
                                    Continuous Learning and Skill Development in the Creative Field
                                    </li>
                                    <li>
                                    Forms of Inspiration
                                    </li>
                                    <li>
                                    Staying Inspired and Overcoming Creative Block
                                    </li>
                                    <li>
                                    Trends and Innovations in Filmmaking and Photography
                                    </li>
                                    <li>The Future of Content Creation: Virtual Reality, Augmented Reality, and More</li>
                                </ul>
                            </li>
                            <li>
                                <p>Module 12: Fostering a Creative Community</p>
                                <ul>
                                    <li>
                                        Networking and Collaborating with Other
                                        Creatives
                                    </li>
                                    <li>
                                        Building a Supportive Online Community
                                        and Fanbase
                                    </li>
                                    <li>
                                        Mentorship and Learning from Industry
                                        Professionals
                                    </li>
                                    <li>
                                        Giving Back: Sharing Knowledge and
                                        Inspiring Others
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div className="module-img-container img-container">
                        <img src="https://i.postimg.cc/YS0WrQz5/5.jpg" alt="" />
                    </div>
                    <div className="module-img-container img-container">
                        <img src="https://i.postimg.cc/W4yJht9h/6.jpg" alt="" />
                    </div>
                    <div className="module-listings">
                        <ol start={13}>
                            <li>
                                <p>Module 13: Creating Impactful Social Media Content</p>
                                <ul>
                                    <li>
                                        Strategies for Engaging Content on
                                        Instagram, TikTok, and YouTube
                                    </li>
                                    <li>
                                        Leveraging Trends and Algorithm Updates
                                        to Boost Visibility
                                    </li>
                                    <li>
                                        Engaging with Your Audience and
                                        Fostering a Community
                                    </li>
                                    <li>
                                        Analyzing Performance Metrics and
                                        Adjusting Your Content Strategy
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>
                                Module 14: Balancing Personal and Commercial Projects
                                </p>
                                <ul>
                                    <li>
                                        Nurturing Your Passion Projects and
                                        Creative Expression
                                    </li>
                                    <li>
                                        Managing Work-Life Balance and Avoiding
                                        Burnout
                                    </li>
                                    <li>
                                        Setting Boundaries and Prioritizing
                                        Projects
                                    </li>
                                    <li>
                                        Finding Fulfillment in Your Creative
                                        Journey
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </section>
                {/* <hr /> */}
                <section
                    className="masterclass-who-for grid"
                    style={{ display: "none" }}
                >
                    <h2>Who Is This For</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </p>
                    <button className="get-started-btn darkgray-background">
                        GET STARTED
                    </button>
                </section>
            </div>
        </div>
    );
};

export default MasterclassDesc;
