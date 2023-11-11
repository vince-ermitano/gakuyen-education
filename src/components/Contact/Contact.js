import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    return (
        <section className="contact">
            <h1>Contact</h1>
            <form>
                <h2>
                    Name・名前&nbsp;<span>(required)</span>
                </h2>
                <br></br>
                <div className="name-inputs">
                    <div className="first-name-input">
                        <label for="contact_fname">First Name</label>
                        <br></br>
                        <input
                            type="text"
                            id="contact_fname"
                            name="contact_fname"
                            maxLength={50}
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                        />
                        <br></br>
                    </div>
                    <div className="last-name-input">
                        <label for="contact_lname">Last Name</label>
                        <br></br>
                        <input
                            type="text"
                            id="contact_lname"
                            name="contact_lname"
                            maxLength={50}
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                        />
                        <br></br>
                    </div>
                </div>
                <label for="contact_email">
                    Email・メールアドレス&nbsp;<span>(required)</span>
                </label>
                <br></br>
                <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    maxLength={320}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    value={emailAddress}
                    required
                />
                <br></br>
                <label for="email_subject">
                    Subject・件名&nbsp;<span>(required)</span>
                </label>
                <br></br>
                <input
                    type="text"
                    id="email_subject"
                    name="email_subject"
                    maxLength={100}
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    required
                />
                <br></br>
                <label for="email_message">
                    Message・メッセージ&nbsp;<span>(required)</span>
                </label>
                <br></br>
                <textarea
                    id="email_message"
                    name="email_message"
                    maxLength={10000}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    required
                ></textarea>
                <br></br>
                <input type="submit" value="SUBMIT" />
            </form>
        </section>
    );
}

export default Contact;