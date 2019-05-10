"use strict";
function getGreetingsMessage() {
    var hour = new Date().getHours();
    var greeting = "Keine Begüßung gefunden";
    if (hour < 6) {
        greeting = "Schlafenszeit";
    }
    else if (hour >= 6 && hour < 12) {
        greeting = "Guten Morgen";
    }
    else if (hour >= 12 && hour < 14) {
        greeting = "Mahlzeit";
    }
    else if (hour >= 14 && hour < 18) {
        greeting = "Guten Tag";
    }
    else if (hour >= 18 && hour < 22) {
        greeting = "Guten Abend";
    }
    else if (hour >= 22) {
        greeting = "Gute Nacht";
    }
    return greeting;
}
