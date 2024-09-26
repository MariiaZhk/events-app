# Events Registration App

### Accomplished Complexity Level: Middle

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Links](#project-links)

## Overview

The **Events Registration App** is a web-based application designed to streamline the process of event management, allowing users to register for events, view event details, and manage participants. This application includes various features, making it a flexible tool for event organizers.

## Features

- **Events Board Page**: Displays a paginated list of available events. Events are pre-populated in the database. Each event includes:
  - Title
  - Description
  - Event date
  - Organizer
- **Event Registration Page**: Allows users to register for an event via a form. The form includes fields for:
  - Full Name
  - Email
  - Date of Birth
  - How the user heard about the event
  - Data is stored in a database after submission.
- **Event Participants Page**: Displays a list of participants registered for a specific event. Accessible by clicking the "View" button on the event.

- **Sorting**: Adds the ability to sort events on the Events Board by:
  - Title (A-Z, Z-A)
  - Event Date (earliest to latest, latest to earliest)
  - Organizer (A-Z, Z-A)
- **Form Validation**: Adds validation rules for form fields on the Event Registration page.
- **DatePicker**: Integrates a DatePicker for the Date of Birth field.
- **Participant Search**: Adds the ability to search participants by:
  - Full Name
  - Email

## Technologies

- **Frontend**: HTML, CSS, JavaScript, React, MUI (Material-UI)
- **Backend**: Node.js, Express
- **Database**: MongoDB (NoSQL)
- **State Management**: Redux

## Project Links

- WebPage:
  [https://mariiazhk.github.io/events-app](https://mariiazhk.github.io/events-app)
- Frontend:
  [https://github.com/MariiaZhk/events-app](https://github.com/MariiaZhk/events-app)
- Backend:
  [https://github.com/MariiaZhk/events-app-backend](https://github.com/MariiaZhk/events-app-backend)
