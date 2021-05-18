import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "./CardsApp.css";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const CardsApp = () => {
  const [deck, setDeck] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [auto, setAuto] = useState(false);
  const [buttonMsg, setButtonMsg] = useState("Draw some cards!");
  const timerRef = useRef(null);

  // on load, get the deck from the api
  useEffect(() => {
    async function getData() {
      let res = await axios.get(`${BASE_URL}/new/shuffle`);
      setDeck(res.data);
    }
    getData();
  }, [setDeck]);

  // drawing cards from the api, if enamled
  useEffect(() => {
    // get a card from the api and add it to state drawnCards
    async function getCard() {
      let { deck_id } = deck;

      try {
        let res = await axios.get(`${BASE_URL}/${deck_id}/draw/`);

        // if the api call tells us no cards remaining, we're done
        if (res.data.remaining === 0) {
          setAuto(false);
          setButtonMsg("No cards left!");
          return;
        }

        // get the actual card out of res
        const drawnCard = res.data.cards[0];

        // put it in state
        setDrawnCards((drawnCards) => [
          ...drawnCards,
          {
            id: drawnCard.code,
            name: drawnCard.value + " of " + drawnCard.suit,
            imgSrc: drawnCard.image,
          },
        ]);
      } catch (err) {
        alert(err);
      }
    }

    // if we're autodrawing but we don't have a timer, set one
    if (auto && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await getCard();
      }, 1000);
    }

    // cleanup - stop the timer and remove it from ref
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [auto, setAuto, deck]);

  const toggleAuto = () => {
    setAuto((auto) => !auto);
    if (!auto) setButtonMsg("Stop drawing cards!");
    else setButtonMsg("Draw some cards!");
  };

  const cardsToRender = drawnCards.map((card) => (
    <Card id={card.id} name={card.name} imgSrc={card.imgSrc} />
  ));

  return (
    <div className="CardsApp">
      {deck ? (
        <button className="CardsApp-draw-btn" onClick={toggleAuto}>
          {buttonMsg}
        </button>
      ) : null}
      <div className="CardsApp-pile">{cardsToRender}</div>
    </div>
  );
};

export default CardsApp;
