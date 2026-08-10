"use client";
import React, { useState, useEffect, useRef } from "react";
import "../../components/NewCreditCardFlow/EligibleCards.css";
import { IoChevronBack } from "react-icons/io5";
import { Poppins } from "next/font/google";
import CardDetails from "../../components/NewCreditCardFlow/CardDetails";
import axios from "axios";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function EligibleCards({
  params,
  searchParams,
  mobilenumber,
  subscriberNames,
}) {
  // const [activeContainer, setActiveContainer] = useState("EligibleCards");
  const [activeContainer, setActiveContainer] = useState("EligibleCards");
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  // const cards = [
  //   {
  //     rank: 1,
  //     bankLogo: "/HDFCLogo.png",
  //     cardName: "HDFC Bonvoy Credit Card",
  //     match: 95,
  //     cardImage: "/Marriott_Bonvoy_HDFC_Bank_Credit_Card.png",
  //     orientation: "horizontal",
  //     benefits: [
  //       "Reward Points on every spend",
  //       "Airport Lounge Access",
  //       "Fuel Surcharge Waiver",
  //       "Dining Benefits",
  //     ],
  //   },
  //   {
  //     rank: 2,
  //     bankLogo: "/SBICardLogo.png",
  //     cardName: "SBI Cashback Credit Card",
  //     match: 92,
  //     cardImage: "/SBI_CC.jpeg",
  //     orientation: "vertical",
  //     benefits: [
  //       "Reward Points on every spend",
  //       "Complimentary Airport Lounge Access",
  //       "Fuel Surcharge Waiver",
  //       "Dining & Lifestyle Benefits",
  //     ],
  //   },
  //   {
  //     rank: 3,
  //     bankLogo: "/IciciBankLogo.png",
  //     // cardName: "ICICI Amazon Pay Credit Card",
  //     cardName: "ICICI Credit Card",
  //     match: 90,
  //     cardImage: "/ICICI_HPCL_coral_CC.png",
  //     orientation: "horizontal",
  //     benefits: [
  //       "Reward Points on every spend",
  //       "Airport Lounge Access",
  //       "Fuel Surcharge Waiver",
  //       "Dining Benefits",
  //     ],
  //   },
  //   {
  //     rank: 4,
  //     bankLogo: "/axisbanklogo.png",
  //     // cardName: "Axis Select Credit Card",
  //     cardName: "Axis Credit Card",
  //     match: 88,
  //     cardImage: "/Axis_Bank_CC.png",
  //     orientation: "horizontal",
  //     benefits: [
  //       "Reward Points on every spend",
  //       "Airport Lounge Access",
  //       "Fuel Surcharge Waiver",
  //       "Dining Benefits",
  //     ],
  //   },
  //   {
  //     rank: 5,
  //     bankLogo: "/IDFCFirstBankLogo.png",
  //     cardName: "IDFCFirstBank League Platinum Card",
  //     // cardName: "IDFCFirstBank Credit Card",
  //     match: 85,
  //     cardImage: "/IDFC_First_Bank_CreditCard.png",
  //     orientation: "horizontal",
  //     benefits: [
  //       "Reward Points on every spend",
  //       "Airport Lounge Access",
  //       "Fuel Surcharge Waiver",
  //       "Dining Benefits",
  //     ],
  //   },
  // ];

  const hasFetched = useRef(false);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  useEffect(() => {
    if (!mobilenumber) {
      console.log("Mobile number is not available");
      return;
    }

    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchCreditCards();
  }, []);

  const fetchCreditCards = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}creditcard_list_fetch`,
        {
          mobilenumber: mobilenumber,
          subscriberNames: subscriberNames,
        },
        {
          headers: {
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("backend response of cards is:", response);
      if (response.data.code === 200) {
        setCards(response.data.data.cards || []);
      } else {
        setError("Unable to fetch eligible cards");
      }
    } catch (error) {
      console.error("Fetch credit card list error:", error);
      setError("Something went wrong while fetching cards");
    } finally {
      setIsLoading(false);
    }
  };

  const getMatchPercentage = (index, totalCards) => {
    if (totalCards === 1) return 95;

    if (totalCards === 2) {
      return index === 0 ? 95 : 92;
    }

    if (totalCards === 3) {
      const values = [95, 92, 89];
      return values[index];
    }

    if (totalCards === 4) {
      const values = [95, 93, 91, 89];
      return values[index];
    }

    // 5 or more cards
    const max = 95;
    const min = 80;

    return Math.round(max - (index * (max - min)) / (totalCards - 1));
  };

  if (activeContainer === "CardDetails") {
    return (
      <CardDetails
        card={selectedCard}
        mobileno={mobilenumber}
        setActiveContainer={setActiveContainer}
      />
    );
  }
  return (
    <div className={`${poppins.className} eligibleContainer`}>
      <div className="Card4">
        <div className="successBox">
          <div className="successIcon">✓</div>

          <div>
            <h3>
              {cards.length} Eligible Card{cards.length !== 1 ? "s" : ""} Found
            </h3>
            <p>These cards match your profile</p>
          </div>
        </div>

        <div className="tableHeader">
          <span>Bank</span>
          <span>Card Name</span>
          <span>Match</span>
        </div>

        {cards.map((card, index) => {
          // const matchPercentage = 95 - index * 5;
          const matchPercentage = getMatchPercentage(index, cards.length);

          return (
            <div
              key={card.rank}
              className={`cardRow ${
                selectedRow === card.rank ? "activeRow" : ""
              }`}
              onClick={() => {
                setSelectedCard({
                  ...card,
                  match: matchPercentage,
                });
                setActiveContainer("CardDetails");
              }}
              style={{ cursor: "pointer" }}
            >
              {/* <div className="bankSection">
                <img
                  src={card.cardImage}
                  alt={card.cardName}
                  width={70}
                  height={35}
                  className="bankLogo"
                />
              </div> */}
              <div className="bankSection">
                <Image
                  src={card.banklogo}
                  alt={card.productName}
                  width={70}
                  height={35}
                  className="bankLogo"
                />
              </div>

              <div className="cardName">{card.productName}</div>

              <div className="matchSection">
                <div className="matchPercent">{matchPercentage}%</div>

                <div
                  className="cardButton"
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedCard({
                      ...card,
                      match: matchPercentage,
                    });

                    setActiveContainer("CardDetails");
                  }}
                >
                  <IoChevronBack />
                </div>
              </div>
            </div>
          );
        })}

        <div className="footerNote">
          <span className="shield">🛡️</span>
          <span>These cards are pre-qualified for your profile</span>
        </div>
      </div>
    </div>
  );
}
export default EligibleCards;
