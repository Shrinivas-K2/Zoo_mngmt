-- Create Database
CREATE DATABASE IF NOT EXISTS ZooManagement;
USE ZooManagement;

-- 1. Zoo Table
CREATE TABLE Zoo (
    Zoo_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Location VARCHAR(255),
    Contact_Info VARCHAR(255)
);

-- 2. Enclosure Table
CREATE TABLE Enclosure (
    Enclosure_ID INT PRIMARY KEY AUTO_INCREMENT,
    Location VARCHAR(255),
    Size VARCHAR(255),
    Habitat_Type VARCHAR(255),
    Zoo_ID INT,
    FOREIGN KEY (Zoo_ID) REFERENCES Zoo(Zoo_ID) ON DELETE CASCADE
);

-- 3. Animal Table
CREATE TABLE Animal (
    Animal_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Species VARCHAR(255) NOT NULL,
    Age INT,
    Gender ENUM('Male', 'Female'),
    Health_Status VARCHAR(255),
    Feed_Schedule VARCHAR(255),
    Enclosure_ID INT,
    Zoo_ID INT,
    FOREIGN KEY (Zoo_ID) REFERENCES Zoo(Zoo_ID) ON DELETE CASCADE,
    FOREIGN KEY (Enclosure_ID) REFERENCES Enclosure(Enclosure_ID) ON DELETE SET NULL
);

-- 4. Medical Record Table
CREATE TABLE Medical_Record (
    Record_ID INT PRIMARY KEY AUTO_INCREMENT,
    Animal_ID INT,
    Date DATE,
    Treatment VARCHAR(255),
    Vet_ID INT,
    FOREIGN KEY (Animal_ID) REFERENCES Animal(Animal_ID) ON DELETE CASCADE,
    FOREIGN KEY (Vet_ID) REFERENCES Vet(Vet_ID) ON DELETE SET NULL
);

-- 5. Vet Table
CREATE TABLE Vet (
    Vet_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Contact_Info VARCHAR(255),
    Specialization VARCHAR(255)
);

-- 6. Employee Table
CREATE TABLE Employee (
    Employee_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Role ENUM('Manager', 'Staff', 'Veterinarian'),
    Contact_Info VARCHAR(255),
    Salary DECIMAL(10, 2),
    Zoo_ID INT,
    FOREIGN KEY (Zoo_ID) REFERENCES Zoo(Zoo_ID) ON DELETE CASCADE
);

-- 7. Task Table
CREATE TABLE Task (
    Task_ID INT PRIMARY KEY AUTO_INCREMENT,
    Description VARCHAR(255),
    Deadline DATE,
    Employee_ID INT,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON DELETE SET NULL
);

-- 8. Visitor Table
CREATE TABLE Visitor (
    Visitor_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Phone VARCHAR(15)
);

-- 9. Ticket Table
CREATE TABLE Ticket (
    Ticket_ID INT PRIMARY KEY AUTO_INCREMENT,
    Price DECIMAL(10, 2),
    Date DATE,
    Visitor_ID INT,
    Zoo_ID INT,
    FOREIGN KEY (Visitor_ID) REFERENCES Visitor(Visitor_ID) ON DELETE SET NULL,
    FOREIGN KEY (Zoo_ID) REFERENCES Zoo(Zoo_ID) ON DELETE CASCADE
);

-- 10. Stall Table
CREATE TABLE Stall (
    Stall_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Location VARCHAR(255),
    Type ENUM('Food', 'Souvenir', 'Merchandise'),
    Zoo_ID INT,
    FOREIGN KEY (Zoo_ID) REFERENCES Zoo(Zoo_ID) ON DELETE CASCADE
);

-- 11. Item Table
CREATE TABLE Item (
    Item_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Price DECIMAL(10, 2),
    Stock INT,
    Stall_ID INT,
    FOREIGN KEY (Stall_ID) REFERENCES Stall(Stall_ID) ON DELETE SET NULL
);

-- 12. Users Table for Authentication (Admin, Employee, Visitor)
CREATE TABLE Users (
    User_ID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL, -- Password should be hashed
    Role ENUM('admin', 'employee', 'visitor') NOT NULL,
    Employee_Reference_ID INT NULL, -- Foreign key for employees
    Visitor_Reference_ID INT NULL, -- Foreign key for visitors
    FOREIGN KEY (Employee_Reference_ID) REFERENCES Employee(Employee_ID) ON DELETE CASCADE,
    FOREIGN KEY (Visitor_Reference_ID) REFERENCES Visitor(Visitor_ID) ON DELETE CASCADE
);

-- Remove the obsolete Reference_ID column from Users, if it still exists
ALTER TABLE Users
DROP COLUMN IF EXISTS Reference_ID;
