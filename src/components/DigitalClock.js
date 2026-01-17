import { useEffect,useState } from "react"; 

function DigitalClock(){
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        },1000);

        //cleanup
        return () => clearInterval(timer);
    },[]);

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div>
            <h2>Digital Clock</h2>
            <h1>{formatTime(time)}</h1>
        </div>
    );
}

export default DigitalClock;