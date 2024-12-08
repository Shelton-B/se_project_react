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
import { getItems, addNewItems, deleteItem } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LogInModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute./ProtectedRoute";
import { signUp, signIn } from "../../utils/auth";

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

  const handleSignUp = () => {
    setActiveModal("sign-up");
  };

  const handleLogIn = () => {
    setActiveModal("log-in");
    setIsLoggedIn(true);
  };

  // const onAddItem = (values) => {
  //   console.log(values);
  //   closeModal();
  // };

  const nav = useNavigate();

  const handleRegistration = ({ email, password, name, avatar }) => {
    signUp({ email, password, name, avatar })
      .then(() => {
        console.log("registration succesful:");
      })
      .catch((error) => {
        console.error("registration failed", error);
      });
    nav("/profile");
    closeModal();
  };

  const handleDelete = (id) => {
    deleteItem(id)
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
    addNewItems(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeModal();
      })
      .catch((err) => console.log(err));
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleSignUp={handleSignUp}
            handleLogIn={handleLogIn}
          ></Header>

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
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
          handleLogIn={handleLogIn}
        ></RegisterModal>

        <LoginModal
          isOpen={activeModal === "log-in"}
          handleCloseClick={closeModal}
          handleSignUp={handleSignUp}
        ></LoginModal>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
