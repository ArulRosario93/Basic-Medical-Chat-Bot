import React, { useRef, useEffect, useState } from "react";
import "./ChatRoom.css";
import { useDataLayerValue } from "../../DataLayer";
  import axios from "axios";
import Message from "./Message/Message";
import Storage from "./Storage";
import { Goodbyeinenglish } from "./Goodbyeinenglish";
import { Thankyouinenglish } from "./Thankyouinenglish";

const ChatRoom = () => {
  const [{ bitCoins, stocks }, dispatch] = useDataLayerValue();

  const [show , sethow] = useState(false);

  const btns = ["Abdominal aortic aneurysm", "Pink Eye", "General"];

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello how may i help you <3", type: "received" },
  ]);

  const slnTokensRecommended = [
    "What is Abdominal Aortic Aneurysm??",
  ]

  const silverLineRecommended = [
    "What is Pink Eye?",
    "What are the symptoms for Pink Eye?",
  ]

  const generalRecommended = [
    "What are the symptoms of depression?",
  ]

  const Handler = (e) => {
    const text = e.target.value;
    setMessage(text);
  };

  const setMsgHere = async (message) => {
    const response = await axios.post("http://localhost:3500/textQuery", {
        message,
      })

      return response;
    }
    
    const HandlerClick = async (e) => {
      if(message.length > 0){
        e.preventDefault();
        setMessage("");
        // setTimeout(() => {
        //   sethow(true);
        // }, 1000);
        // setTimeout(() => {
        //   sethow(false);
        // }, 4999);
      
      let botText = "evil";

      var msgReceived = message.toLowerCase();
      console.log("Executing Filtering");

      
      //Start Of Req And Res
      
      setMessages((pervMessages) => [
        ...pervMessages,
        { text: message, type: "sent" },
      ]);
      
      const res = filterUpWithKeyWord(msgReceived);
      // const bigOne = setMsgHere(message);

        setMessages((pervMessages) => [
          ...pervMessages,
          { text: res, type: "received" },
        ]);
      
      // botText = (await bigOne).data;

      // setTimeout(() => {
      //   setRecievedMsgHere(botText);
      // }, 5000);
    } 
  }

  const filterUpWithKeyWord = (sentence) => {

    const fallback = [
      "Sorry. Can you say it in other words.", 
      "I'm uable to process the request right now.", 
      "I couldn't find the appropriate response for your query.", 
      "Can you say it again?", 
      "I can't understand, can you rephrase your query?", 
      "Sorry, i am out of dialogue box.",
      "Can you please repeat it once more?",
      " Sorry, I didn’t catch that, is it possible to repeat the last point?",
    ]

    const ran = Math.random() * (fallback.length - 1);

    const ran1 = Math.round(ran);

    var found = false;

    // if(sentence == "bye" || "see ya then" || "see you then" || "bye" || "tata" || "taataa" || "tataa" || "byyee" || "byee" || "byye"){
    //   console.log("CAMe to BYe Session");
    //   const lenofByes = Goodbyeinenglish.length;
    //   const roundIT = Math.round(Math.random() * (lenofByes - 1));
    //   return Goodbyeinenglish[roundIT];
    // }

    for (let index = 0; index < Storage.length; index++) {
      const keyword = Storage[index].keyword;
      const answer = Storage[index].ans;
      
      for (let index2 = 0; index2 < keyword.length; index2++) {
        const keywordItems = keyword[index2]; 
        const wordInString = (s, query) => query.split(' ').every(q => new RegExp('\\b' + q + '\\b', 'i').test(s));

        // const wordInString = (needle, haystack) => {
        //   return haystack
        //     .split(' ')
        //     .some(p => (p === needle));
        // }

        const checkRes = wordInString(sentence, keywordItems);

        console.log(`Checking With keyword ${keywordItems}`);

        if (checkRes) {
          var ranNum = Math.round(Math.random() * (answer.length - 1));
          found = true;
          return answer[ranNum];
        }
      }
        if (found == true) {
          break;
        }
      console.log(keyword);
    }
    if (found == false) {
      var gg = sentence;

      for (let index = 0; index < Goodbyeinenglish.length; index++) {
        const element = Goodbyeinenglish[index];
        console.log("Running on Thanking Session");

        const wordInString = (s, query) => query.split(' ').every(q => new RegExp('\\b' + q + '\\b', 'i').test(s));
        const checkRes = wordInString(sentence, element);
        
        if(checkRes){
          const lenofByes = Goodbyeinenglish.length;
          const roundIT = Math.round(Math.random() * (lenofByes - 1));
          console.log("Found On Thanking Session");
          return Goodbyeinenglish[roundIT];
        }
      }

      for (let index = 0; index < Thankyouinenglish.length; index++) {
        const element = Thankyouinenglish[index];
        console.log("Running on Thanking Session");
  
        const lenofByes = Thankyouinenglish.length;
        const roundIT = Math.round(Math.random() * (lenofByes - 1));

        const wordInString = (s, query) => query.split(' ').every(q => new RegExp('\\b' + q + '\\b', 'i').test(s));
        const checkRes = wordInString(sentence, element);
        
        if(checkRes){
          console.log("Found On Thanking Session");
          return Thankyouinenglish[roundIT];
        }
      }
      
      return fallback[ran1];
    }
  }
  
  // const setRecievedMsgHere = async (botText) => {
  //   setMessages((pervMessages) => [
  //     ...pervMessages,
  //     { text: botText, type: "received" },
  //   ]);
  // }

  // console.log(msg.toString("hola thakanglah glglh glg wargankn  w.'lglmksn phh ahe.h jae.jeajea ea j.ea.ae .ejaeje.atja tj.a.jea.jr j;wr", 20));

  const messagesEndRef = useRef(null);
  const messagesEndRef2 = useRef(null);

  const HandlerBtn = (event, value) => {
    
    if(value === "Abdominal aortic aneurysm"){
      setMessages(prevMessage => [
          ...prevMessage,
          { text: slnTokensRecommended.map(item => item), type: 'Recommended', value }
        ])
    }

    if (value === "Pink Eye") {
      setMessages(prevMessage => [
        ...prevMessage,
        { text: silverLineRecommended.map(item => item), type: 'Recommended', value }
      ])
    }

    if (value === "General") {
      setMessages(prevMessage => [
        ...prevMessage,
        { text: generalRecommended.map(item => item), type: 'Recommended', value }
      ])
    }
  };

  const scrollToBottom = () => {
  };
  const scrollToBottom2 = () => {
  };
  
  console.log(window.innerHeight, "height here");
  console.log(window.innerHeight / 13.79451359, "height here");
  
  console.log(window.innerHeight / 39, "height for greeetings here");
  
  let today = new Date();
  let hrs = today.getHours();
  let mins = today.getMinutes();
  let time = hrs + ":" + mins;
  
  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // messagesEndRef2.current?.scrollIntoView({ behavior: "smooth" });
    // scrollToBottom();
    // scrollToBottom2();
    // if(show){
    //   const interval = setInterval(() => {
    //     setCounter((prevCounter) => prevCounter + 1);
    //   }, 1000);
  
    //   return () => clearInterval(interval);
    // }
  }, [messages, show]);
  //12.0563
  return (
    <>
      <div 
        className="chatRoom"
        style={{ 
          height: `${show ? window.innerHeight /12.0563 + `vh` : window.innerHeight /12.0563 + `vh` }`,
         marginTop: `${show ? "-2vh" : "-15px"}` 
        }}
      >
        <p className="timehere" style={{ margin: "1px 0px 5px" }}>  
          {
            time
          }
        </p>
        {/* {btns.length > 0 ? (
          <div className="btnsHere">
            {btns.map((item, i) => {
              return (
                <div
                  key={i}
                  className="btn"
                  onClick={(event) => HandlerBtn(event, item)}
                >
                  <p className="buttonHere">{item}</p>
                </div>
              );
            })}
          </div>
        ) : null} */}
        {/* <div style={{paddingTop: "3vh"}} ref={messagesEndRef}/> */}
        {messages.length > 0 ? (
          <div className="scrollMsg">
            {messages.map((item, i) => {
              return (
                <>
                  <Message itemHere={item}/>
                  {show ? <h1 className="typing">...</h1> : null}
                </>
              );
            })}
          </div>
        ) : null}
      </div>
      <form className="inputContainer" onSubmit={HandlerClick}>
        <input
          placeholder="How May I help you?"
          onChange={Handler}
          value={message}
          type="text"
          required
          autoFocus
        />
        <div className="sendBtn">
          <input type="submit" onClick={HandlerClick} value="Send" />
        </div>
      </form>
    </>
  );
};

export default ChatRoom;
