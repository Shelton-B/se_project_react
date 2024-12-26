import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherapi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/currentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  getItems,
  addNewItems,
  deleteItem,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LogInModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { signUp, signIn, checkToken } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: {},
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const closeModal = () => {
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleLogInClick = () => {
    setActiveModal("log-in");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  // const onAddItem = (values) => {
  //   console.log(values);
  //   closeModal();
  // };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    console.log("Token being used:", token);
    editProfile({ name, avatar }, token)
      .then((res) => {
        console.log("Profile Update Succesful");
        setCurrentUser(res);
        closeModal();
      })
      .catch((err) => {
        console.error("Error Updating", err);
        alert("Could not update user info");
      });
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    signUp({ email, password, name, avatar })
      .then(() => {
        console.log("registration succesful:");
        closeModal();
      })
      .catch((error) => {
        console.error("registration failed", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    signIn({ email, password })
      .then((res) => {
        console.log("login successful");
        localStorage.setItem("jwt", res.token);

        setIsLoggedIn(true);

        setCurrentUser(res.user);
        navigate("/profile");

        closeModal();
      })
      .catch((error) => {
        console.error("login failed", error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser("");
    navigate("/");
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("jwt");
    console.log("Delete: Token being used:", token);

    deleteItem(id, token)
      .then(() => {
        setClothingItems((items) => items.filter((item) => item._id !== id));
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = (item) => {
    addNewItems(item, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardLike = ({ _id, isLiked }) => {
    console.log(`Card ID: ${_id}, isLiked: ${isLiked}`); // Debug

    const token = localStorage.getItem("jwt");

    // Check if this card is not currently liked
    {
      !isLiked
        ? // if so, send a request to add the user's id to the card's likes array

          // the first argument is the card's id
          addCardLike(_id, token)
            .then((updatedCard) => {
              setClothingItems((cards) =>
                cards.map((item) =>
                  item._id === _id ? updatedCard.item : item
                )
              );
            })
            .catch((err) => console.log(err))
        : // if not, send a request to remove the user's id from the card's likes array

          // the first argument is the card's id
          removeCardLike(_id, token)
            .then((updatedCard) => {
              setClothingItems((cards) =>
                cards.map((item) =>
                  item._id === _id ? updatedCard.item : item
                )
              );
            })
            .catch((err) => console.log(err));
    }
  };

  /*use effect*/

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setToken(token);
          setCurrentUser(userData);
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignUpClick={handleSignUpClick}
              handleLogInClick={handleLogInClick}
            ></Header>

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>

            <Footer></Footer>
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              handleCloseClick={closeModal}
              onAddItem={handleAddItemSubmit}
            ></AddItemModal>
          )}

          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            handleCloseClick={closeModal}
            onDelete={handleDelete}
          ></ItemModal>

          <RegisterModal
            isOpen={activeModal === "sign-up"}
            handleCloseClick={closeModal}
            handleRegistration={handleRegistration}
            handleLogInClick={handleLogInClick}
          ></RegisterModal>

          <LoginModal
            isOpen={activeModal === "log-in"}
            handleCloseClick={closeModal}
            handleSignUpClick={handleSignUpClick}
            handleLogin={handleLogin}
          ></LoginModal>

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            handleCloseClick={closeModal}
            handleEditProfile={handleEditProfile}
          ></EditProfileModal>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
