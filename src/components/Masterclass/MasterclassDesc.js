import React from "react";
import { Link } from "react-router-dom";
import "./MasterclassDesc.css";

const MasterclassDesc = () => {
    return (
        <div className="masterclass-desc">
            <Link to="/store">
                <button>&lt; Back to Presets Shop</button>
            </Link>

            <div className="masterclass-desc-content">
                <section className="masterclass-desc-header grid-two-columns">
                    <div className="first-img container">
                        <img
                            src="https://via.placeholder.com/500x400"
                            alt="masterclass"
                        />
                    </div>
                    <div className="masterclass-intro-text-container">
                        <h1>The Odyssey - Creative Masterclass</h1>
                        <p>Loren ipsum dolor sit amet</p>
                        <p>$10</p>
                        <button className="darkgray-background">Add to Cart</button>
                    </div>
                </section>
                <hr />
                <section className="masterclass-what-we-offer grid-two-columns">
                    <div className="section-text">
                        <h2>What we offer</h2>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                        </ul>
                    </div>
                    <div className="section-img">
                        <img src="https://via.placeholder.com/500x400" alt="" />
                    </div>
                    <div className="section-img">
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
                <section className="masterclass-break-it-down grid-two-columns">
                    <h2>Let's break it down</h2>
                    <div className="module-listings">
                        <ol>
                            <li>
                                Mindset for Creative Success
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
                                Elevating Your Filmmaking and Photography
                                <ul>
                                    <li>
                                        Advanced Camera Techniques and Equipment
                                        for High-Quality Productions
                                    </li>
                                    <li>
                                        Cinematic Lighting and Composition for
                                        Impactful Visuals
                                    </li>
                                    <li>
                                        Storytelling Strategies to Engage and
                                        Connect with Audiences
                                    </li>
                                    <li>
                                        Creating Captivating Brand Stories and
                                        Campaigns
                                    </li>
                                    <li>
                                        Collaborating with Brands and Nurturing
                                        Long-Term Partnerships
                                    </li>
                                    <li>
                                        Leveraging Your Unique Perspective for
                                        Creative Success
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Building Your Personal Brand
                                <ul>
                                    <li>
                                        Crafting Your Personal Brand Story and
                                        Message
                                    </li>
                                    <li>
                                        Developing a Cohesive Brand Identity
                                        Across Platforms
                                    </li>
                                    <li>
                                        Growing and Engaging Your Social Media
                                        Audience
                                    </li>
                                    <li>
                                        Strategies for Brand Collaborations and
                                        Sponsorships
                                    </li>
                                    <li>
                                        Monetizing Your Influence: Sponsorships,
                                        Affiliate Marketing, and More
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div className="module-img-container">
                        <img src="https://via.placeholder.com/500x500" alt="" />
                    </div>
                    <div className="module-img-container">
                        <img src="https://via.placeholder.com/500x500" alt="" />
                    </div>
                    <div className="module-listings">
                        <ol start={4}>
                            <li>
                                Content Monetization and Revenue Streams
                                <ul>
                                    <li>
                                        Diversifying Income Streams in the
                                        Creative Industry
                                    </li>
                                    <li>
                                        Creating and Selling Online Courses and
                                        Workshops
                                    </li>
                                    <li>
                                        Licensing Your Creative Work for
                                        Commercial Use
                                    </li>
                                    <li>
                                        Exploring Print Sales and Art
                                        Exhibitions
                                    </li>
                                    <li>
                                        Strategies for Successful Crowdfunding
                                        and Patronage
                                    </li>
                                </ul>
                            </li>
                            <li>
                                The Business of Creative Filmmaking and
                                Photography
                                <ul>
                                    <li>
                                        Financial Management for Solo Creators:
                                        Budgeting and Pricing Your Work
                                    </li>
                                    <li>
                                        Contracts and Legal Considerations for
                                        Freelancers
                                    </li>
                                    <li>
                                        Navigating Taxes and Accounting for
                                        Creatives
                                    </li>
                                    <li>
                                        Building a Sustainable Business Model as
                                        a Solo Creator
                                    </li>
                                    <li>
                                        Balancing Creative Freedom with
                                        Commercial Projects
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Influencer Marketing and Brand Collection
                                <ul>
                                    <li>
                                        Understanding the Role of Influencers in
                                        the Marketing World
                                    </li>
                                    <li>
                                        Strategies for Collaborating with Brands
                                        as an Influencer
                                    </li>
                                    <li>
                                        Negotiating Fair Compensation and
                                        Deliverables
                                    </li>
                                    <li>
                                        Maintaining Authenticity and Long-Term
                                        Partnerships
                                    </li>
                                    <li>
                                        Leveraging Social Media Platforms for
                                        Brand Growth
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div className="module-listings">
                        <ol start={7}>
                            <li>
                                Editing Efficiency and High-Quality Output
                                <ul>
                                    <li>
                                        Your Editing Process: Start to Finish
                                    </li>
                                    <li>
                                        Utilizing Old Clips to Create Fresh
                                        Content
                                    </li>
                                    <li>
                                        Content Rollout Strategies and
                                        Scheduling
                                    </li>
                                    <li>
                                        Organizing Your Media for Efficiency and
                                        Easy Access
                                    </li>
                                    <li>
                                        Maintaining High-Quality Standards in
                                        Your Edits
                                    </li>
                                    <li>
                                        Time-Saving Tips and Keyboard Shortcuts
                                        for Faster Editing
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Client Relations and Professional Etiquette
                                <ul>
                                    <li>
                                        Best Practices for Reaching Out to
                                        Potential Clients
                                    </li>
                                    <li>
                                        Effective Communication and Email
                                        Etiquette
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
                    <div className="module-img-container">
                        <img src="https://via.placeholder.com/500x400" alt="" />
                    </div>
                    <div className="module-img-container">
                        <img src="https://via.placeholder.com/500x400" alt="" />
                    </div>
                    <div className="module-listings">
                        <ol start={9}>
                            <li>
                                AI in Creative Filmmaking and Photography
                                <ul>
                                    <li>
                                        Understanding the Basics of Artificial
                                        Intelligence (AI) and Machine Learning
                                        (ML)
                                    </li>
                                    <li>
                                        How AI is Transforming the Creative
                                        Industries
                                    </li>
                                    <li>
                                        AI-Based Video Editing Tools and
                                        Software
                                    </li>
                                    <li>
                                        Automating Repetitive Tasks with AI for
                                        Increased Efficiency
                                    </li>
                                    <li>
                                        AI-Driven Image and Video Enhancement
                                        Techniques
                                    </li>
                                    <li>
                                        AI-Generated Music and Sound Design for
                                        Filmmaking
                                    </li>
                                    <li>
                                        AI-Powered Voiceovers and Narrations
                                    </li>
                                    <li>
                                        AI-Driven Storyboarding and Script
                                        Analysis
                                    </li>
                                    <li>
                                        The Role of AI in Customizing Content
                                        for Target Audiences
                                    </li>
                                    <li>
                                        Ethical Considerations and Challenges in
                                        AI-Driven Creative Processes
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div className="module-listings">
                        <ol start={10}>
                            <li>
                                Storytelling Beyond the Lens
                                <ul>
                                    <li>
                                        Understanding the Role of Influencers in
                                        the Marketing World
                                    </li>
                                    <li>
                                        Strategies for Collaborating with Brands
                                        as an Influencer
                                    </li>
                                    <li>
                                        Negotiating Fair Compensation and
                                        Deliverables
                                    </li>
                                    <li>
                                        Maintaining Authenticity and Long-Term
                                        Partnerships
                                    </li>
                                    <li>
                                        Leveraging Social Media Platforms for
                                        Brand Growth
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Finding Inspiration and Staying Relevant
                                <ul>
                                    <li>
                                        Continuous Learning and Skill
                                        Development in the Creative Field
                                    </li>
                                    <li>
                                        Staying Inspired and Overcoming Creative
                                        Block
                                    </li>
                                    <li>
                                        Trends and Innovations in Filmmaking and
                                        Photography
                                    </li>
                                    <li>
                                        The Future of Content Creation: Virtual
                                        Reality, Augmented Reality, and More
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Building a Supportive Creative Community
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
                    <div className="module-img-container">
                        <img src="https://via.placeholder.com/500x400" alt="" />
                    </div>
                    <div className="module-img-container">
                        <img src="https://via.placeholder.com/500x400" alt="" />
                    </div>
                    <div className="module-listings">
                        <ol start={13}>
                            <li>
                                Creating Impactful Social Media Content
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
                                Balancing Personal Project and Commercial Work
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
                <hr />
                <section className="masterclass-who-for">
                    <h2>Who Is This For</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
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
