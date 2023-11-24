# Office Transportation Management System

## Overview

This repository contains the backend code for an Office Transportation Management System. The system aims to address the transportation management issues faced by businesses relying on third-party vendors for transportation services. It provides a comprehensive solution for managing drivers, employees, and scheduling drop-off locations.

## Requirement Analysis

### Business Problem

The business is facing challenges with transportation management and relies on a third-party vendor for transportation services. The key requirements include:

- Storing drivers' information
- Allocating drivers to specific areas for dropping off employees

### Roles

The system supports three roles:

1. Admin
2. Employee
3. Driver

## Functional Requirements

### Admin

- **Authentication:**

  - Admin can log in and log out.

- **Profile Management:**

  - Admin can manage and update their profile.

- **Employee Management:**

  - Admin can create/read/edit/delete employee accounts.

- **Location Management:**

  - Admin can create/read/edit/delete locations of different places.

- **Schedule Management:**
  - Admin can create/read/edit/delete schedules for drop-off locations.

### Employee

- **Authentication:**

  - Employee can log in and log out.

- **Profile Viewing:**

  - Employee can view/read their profile.

- **Schedule Viewing:**
  - Employee can read the schedule of pickup and drop-off locations.

### Driver

- **Authentication:**

  - Driver can log in and log out.

- **Profile Viewing:**

  - Driver can view/read their profile.

- **Schedule Viewing:**
  - Driver can read the schedule of pickup and drop-off locations.

## Data Models

### Admin Model

```json
{
  "id": 1,
  "name": {
    "firstName": "John",
    "middleName": "A",
    "lastName": "Doe"
  },
  "phoneNumber": "555-123-4567",
  "address": "123 Main Street, City, Country"
}
```

### Employee Model

```json
{
  "id": 1,
  "name": {
    "firstName": "John",
    "middleName": "A",
    "lastName": "Doe"
  },
  "password": "securePassword123",
  "role": "employee",
  "phoneNumber": "555-123-4567",
  "address": "123 Main Street, City, Country"
}
```

### Driver Model

```json
{
  "id": 12345,
  "name": {
    "firstName": "John",
    "middleName": "A",
    "lastName": "Smith"
  },
  "password": "secureDriver123",
  "role": "driver",
  "phoneNumber": "555-789-1234",
  "nid": "123-45-6789",
  "licenseNumber": "DL123456",
  "address": "456 Elm Street, City, Country",
  "vehicle": {
    "brand": "Toyota",
    "model": "Camry",
    "year": 2020,
    "plateNumber": "ABC123",
    "color": "Blue"
  }
}
```

### Location Model

```json
{
  "id": 1,
  "locationName": "Example Location"
}
```

### Schedule Model

```json
{
  "id": 1,
  "date": "2023-11-15",
  "driverId": "ObjectId",
  "locationId": "ObjectId",
  "dropOffTime": "03:50 AM"
}
```

### Tech Stack

- **Language:** TypeScript
- **Framework:** Node Js (Express)
- **ODM:** Mongoose
- **Database:** MongoDB

### Live Link

[Office Transportation Management System](https://office-transportation-management-system-backend.vercel.app/)
