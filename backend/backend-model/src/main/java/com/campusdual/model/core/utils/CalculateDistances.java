package com.campusdual.model.core.utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;



public class CalculateDistances {

    //private double latitudeown = 42.4349;
    //private double longitudeown = -8.6427;
    //private boolean locationObtained = true;

    /*public CalculateDistances(double latitudeown, double longitudeown, boolean locationObtained) {
        this.latitudeown = latitudeown;
        this.longitudeown = longitudeown;
        this.locationObtained = locationObtained;
    }*/

    /*public double calculateDistances(double aLatitude, double aLongitude) {
        if (locationObtained) {
            double distance = calculateDistance(latitudeown, longitudeown, aLatitude, aLongitude);
            return distance;
        } else {
            return 0.0;
        }
    }*/

    public static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371; // Radio de la Tierra en kilómetros
        double dLat = deg2rad(lat2 - lat1);
        double dLon = deg2rad(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c;
        return Math.round(distance * 100.0) / 100.0; // Redondear a 2 decimales
    }

    public static double deg2rad(double deg) {
        return deg * (Math.PI / 180);
    }

    /*public static void main(String[] args) {
        CalculateDistances calculator = new CalculateDistances(52.5200, 13.4050, true);
        double distance = calculator.calculateDistances(48.8566, 2.3522);
        System.out.println("Distance: " + distance + " km");
    }*/
}

