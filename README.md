# React + Vite

## Overview

- The WTWR (What To Wear) app is designed to help users find suitable clothing based on the current weather conditions. The app will feature a set of clothing cards, a weather API integration, and modals for garment and image viewing.

## Features

- Clothing Cards:
  A set of clothing cards are dynamically generated from an array of data. Each card displays information about a specific piece of clothing.

- Weather API Integration:
  When a user visits the site, the app makes a call to the weather API to fetch the current temperature and location information. The temperature and location data are parsed from the API response and saved as React state. The current temperature is used to filter the displayed clothing cards.

- Header:
  The header shows the location and current temperature. Depending on whether the user is logged in or not, the header will display a "sign up" and "log in" option. If a user is logged in, a button to add items and the current users avatar will be shown.

- Modals:
  Users can open and close a modal to view details about a new garment. Additionally, clicking on a clothing card opens a modal displaying a larger version of the garment's image.

- User Authentication:
  Enables users to create an account, log in to access the application, and securely log out.

- Profile Editing:
  Allows users to update their profile details.

- Like/ Unlike Feature:
  Users can interact with clothing items by adding and removing likes.

## Link

Domain

- https://www.wtwrtoday.twilightparadox.com/

Frontend

- https://shelton-b.github.io/se_project_react/

Backend

- https://github.com/Shelton-B/se_project_express/
