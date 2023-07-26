import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = "https://nesine-case-study.onrender.com/bets";

const CartContext = React.createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.C !== action.payload)
      };
    default:
      return state;
  }
};

const initialCartState = {
  cartItems: []
};

const Home = () => {
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setBets(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const [cartState, dispatch] = React.useReducer(cartReducer, initialCartState);

  useEffect(() => {
    //console.log("cartItems", cartState.cartItems);
  }, [cartState.cartItems]);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      <div>
        <h1>nesine-react-case</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="tg">
              <thead>
                <tr>
                  <th className="tg-qh8i">Event Count: {bets.length}</th>
                  <th className="tg-qh8i">Yorumlar</th>
                  <th className="tg-qh8i" />
                  <th className="tg-qh8i">1</th>
                  <th className="tg-qh8i">x</th>
                  <th className="tg-qh8i">2</th>
                  <th className="tg-qh8i">Alt</th>
                  <th className="tg-qh8i">Üst</th>
                  <th className="tg-qh8i">H1</th>
                  <th className="tg-qh8i">1</th>
                  <th className="tg-qh8i">x</th>
                  <th className="tg-qh8i">2</th>
                  <th className="tg-qh8i">H2</th>
                  <th className="tg-qh8i">1-X</th>
                  <th className="tg-qh8i">1-2</th>
                  <th className="tg-qh8i">X-2</th>
                  <th className="tg-qh8i">Var</th>
                  <th className="tg-qh8i">Yok</th>
                  <th className="tg-qh8i">+99</th>
                </tr>
              </thead>
              <tbody>
                {bets.map((bet) => (
                  <BetCard key={bet.id} bet={bet} />
                ))}
              </tbody>
            </table>
          </>
        )}
        <Cart />
      </div>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            "\n.tg  {width:100%;border-collapse:collapse;border-spacing:0;}\n.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;\n  overflow:hidden;padding:10px 5px;word-break:normal;}\n.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;\n  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}\n.tg .tg-qh8i{background-color:#d3cac9;border-color:#333333;text-align:center;vertical-align:top}\n.tg .tg-de2y{border-color:#333333;text-align:left;vertical-align:top}\n.tg .tg-ao2g{border-color:#333333;text-align:center;vertical-align:top}\nthead { position: sticky; top: 0; }\n.cart {position: fixed; background-color: white; bottom: 0; right: 0; border: 2px solid black; padding: 30px;}\n"
        }}
      />
    </CartContext.Provider>
  );
};

const BetCard = ({ bet }) => {
  const { cartState, dispatch } = useContext(CartContext);

  const addOdds = (n1, n2, n3) => {
    let addSelectedOdds = {
      betOcgID: n1,
      betOcgOcID: n2,
      betOcgOcO: n3
    };

    bet.selectedOdds = addSelectedOdds;

    if (isBetInCart(bet)) {
      dispatch({ type: "REMOVE_FROM_CART", payload: bet.C });
      dispatch({ type: "ADD_TO_CART", payload: bet });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: bet });
    }
  };

  const isBetInCart = (bet) => {
    const foundBet = cartState.cartItems.find((item) => item.C === bet.C);
    return foundBet !== undefined;
  };

  const isOddsInBet = (bet, n1, n2) => {
    const foundBet = cartState.cartItems.find((item) => item.C === bet.C);
    if (foundBet) {
      if (
        foundBet?.selectedOdds.betOcgID == n1 &&
        foundBet?.selectedOdds.betOcgOcID == n2
      ) {
        return foundBet;
      }
    } else {
      return undefined;
    }
  };


  return (
    <>
      <tr>
        <td className="tg-de2y">
          {bet.D} {bet.DAY} {bet.LN}
        </td>
        <td className="tg-ao2g">Yorumlar</td>
        <td className="tg-ao2g" />
        <td className="tg-ao2g">1</td>
        <td className="tg-ao2g">x</td>
        <td className="tg-ao2g">2</td>
        <td className="tg-ao2g">Alt</td>
        <td className="tg-ao2g">Üst</td>
        <td className="tg-ao2g">H1</td>
        <td className="tg-ao2g">1</td>
        <td className="tg-ao2g">x</td>
        <td className="tg-ao2g">2</td>
        <td className="tg-ao2g">H2</td>
        <td className="tg-ao2g">1-X</td>
        <td className="tg-ao2g">1-2</td>
        <td className="tg-ao2g">X-2</td>
        <td className="tg-ao2g">Var</td>
        <td className="tg-ao2g">Yok</td>
        <td className="tg-ao2g">+99</td>
      </tr>
      <tr>
        <td className="tg-de2y">
          <span style={{ fontWeight: "bold" }}>{bet.C}</span> {bet.T} {bet.N}
        </td>
        <td className="tg-ao2g">Yorumlar</td>
        <td className="tg-ao2g">{bet.OCG[1].MBS}</td>
        <td
          className="tg-ao2g"
          onClick={() => {
            addOdds(bet.OCG[1].ID, bet.OCG[1].OC[0].ID, bet.OCG[1].OC[0].O);
          }}
          style={{
            cursor: "pointer",
            backgroundColor: isOddsInBet(
              bet,
              bet.OCG[1].ID,
              bet.OCG[1].OC[0].ID
            )
              ? "yellow"
              : ""
          }}
        >
          {bet.OCG[1].OC[0].O}
        </td>
        <td
          onClick={() => {
            addOdds(bet.OCG[1].ID, bet.OCG[1].OC[1].ID, bet.OCG[1].OC[1].O);
          }}
          className="tg-ao2g"
          style={{
            cursor: "pointer",
            backgroundColor: isOddsInBet(
              bet,
              bet.OCG[1].ID,
              bet.OCG[1].OC[1].ID
            )
              ? "yellow"
              : ""
          }}
        >
          {bet.OCG[1].OC[1].O}
        </td>
        <td className="tg-ao2g" />
        <td
          onClick={() => {
            addOdds(bet.OCG[5].ID, bet.OCG[5].OC[25].ID, bet.OCG[5].OC[25].O);
          }}
          className="tg-ao2g"
          style={{
            cursor: "pointer",
            backgroundColor: isOddsInBet(
              bet,
              bet.OCG[5].ID,
              bet.OCG[5].OC[25].ID
            )
              ? "yellow"
              : ""
          }}
        >
          {bet.OCG[5].OC[25].O}
        </td>
        <td
          onClick={() => {
            addOdds(bet.OCG[5].ID, bet.OCG[5].OC[26].ID, bet.OCG[5].OC[26].O);
          }}
          className="tg-ao2g"
          style={{
            cursor: "pointer",
            backgroundColor: isOddsInBet(
              bet,
              bet.OCG[5].ID,
              bet.OCG[5].OC[26].ID
            )
              ? "yellow"
              : ""
          }}
        >
          {bet.OCG[5].OC[26].O}
        </td>
        <td className="tg-ao2g" />
        <td className="tg-ao2g" />
        <td className="tg-ao2g" />
        <td className="tg-ao2g" />
        <td className="tg-ao2g" />
        <td
          onClick={() => {
            addOdds(bet.OCG[2].ID, bet.OCG[2].OC[3].ID, bet.OCG[2].OC[3].O);
          }}
          className="tg-ao2g"
          style={{
            cursor: "pointer",
            backgroundColor: isOddsInBet(
              bet,
              bet.OCG[2].ID,
              bet.OCG[2].OC[3].ID
            )
              ? "yellow"
              : ""
          }}
        >
          {bet.OCG[2].OC[3].O}
        </td>
        <td
          onClick={() => {
            addOdds(bet.OCG[2].ID, bet.OCG[2].OC[4].ID, bet.OCG[2].OC[4].O);
          }}
          className="tg-ao2g"
          style={{
            cursor: "pointer",
            backgroundColor: isOddsInBet(
              bet,
              bet.OCG[2].ID,
              bet.OCG[2].OC[4].ID
            )
              ? "yellow"
              : ""
          }}
        >
          {bet.OCG[2].OC[4].O}
        </td>
        <td
          onClick={() => {
            addOdds(bet.OCG[2].ID, bet.OCG[2].OC[5].ID, bet.OCG[2].OC[5].O);
          }}
          className="tg-ao2g"
          style={{
            cursor: "pointer",
            backgroundColor: isOddsInBet(
              bet,
              bet.OCG[2].ID,
              bet.OCG[2].OC[5].ID
            )
              ? "yellow"
              : ""
          }}
        >
          {bet.OCG[2].OC[5].O}
        </td>
        <td className="tg-ao2g" />
        <td className="tg-ao2g" />
        <td className="tg-ao2g">3</td>
      </tr>
    </>
  );
};

const Cart = () => {
  const { cartState, dispatch } = useContext(CartContext);

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };


  const totalAmount = cartState.cartItems.reduce((acc, oran) => acc * parseFloat(oran.selectedOdds.betOcgOcO), 1);

  return (
    <div className="cart">
      <h2>Kupon</h2>
      <ul>
        {cartState.cartItems.map((item) => (
          <li key={item.id}>
            4 - Kod: {item.C} Maç: {item.N} -{" "}
            <b>Oran: {item.selectedOdds.betOcgOcO}</b>
            <button
              onClick={() => removeFromCart(item.C)}
              style={{ marginLeft: "5px" }}
            >
              Kaldır
            </button>
          </li>
        ))}
      </ul>
      <h3>Toplam Tutar: {cartState.cartItems.length > 0 ? (totalAmount * 1).toFixed(2) : "0"} TL</h3>
    </div>
  );
};

export async function getStaticProps() {
  const response = await axios.get(API_URL);
  const bets = response.data;
  return {
    props: {
      bets
    }
  };
}

export default Home;