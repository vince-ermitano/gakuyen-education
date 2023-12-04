import React, { useState, useEffect } from "react";
import { getTimeUntilSpecificDate } from "../../helpers";

const CountdownTimer = () => {
    const [countdown, setCountdown] = useState(getTimeUntilSpecificDate());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(getTimeUntilSpecificDate());
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="countdown-timer">
            <p>{countdown}</p>
        </div>
    );
};

export default CountdownTimer;
