CREATE DATABASE IF NOT EXISTS massage_center
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE massage_center;

CREATE TABLE IF NOT EXISTS appointments (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  service VARCHAR(120) NOT NULL,
  master VARCHAR(120) NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  message TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_appointments_created_at (created_at),
  INDEX idx_appointments_date_time (appointment_date, appointment_time)
);
