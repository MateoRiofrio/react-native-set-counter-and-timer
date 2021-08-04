# React Native App: Timer and Set Counter

## Description: 
In this mobile application, the user is able to time and count their sets. The timer works independetly of the set counter so it is not mandatory to use the set feature. React native was used because the development process is faster and the app is simple. The most challenging task was displaying the set list as a stack and showing the time elapsed between sets. Multiple components were created to represent each aspect of the app, see below for more details. 

## Screenshot: 
<img src="emulator_ios.png" width="320" height="607">

## Components:
A set of components are created to represent each aspect of the application.

* **Timer**: takes in a interval and style as parameters. Minutes, seconds, and centiseconds are displayed using the 'moment' library and each is its own \<Text> tag with the provided style. 
* **RoundButton**: takes in a title, title color, background color, on touch functions, and a boolean to determine whether it is disabled. Each button has the same width and height of 80px. 
* **SetRow**: takes an index and a time interval. Represents a row in a setTable (below). 
* **SetTable**: takes in a list of time intervals and displays them as setRows. 

## Usage: 
If the user hits 'Start', the timer will start. If the user hits 'Stop' the timer will stop. Once the user hits 'Stop', the 'Reset' button will become availaible and will reset the timer only. If the user hits 'Set', a set will be added to the set counter and set table. If the user long presses the 'Set' button, the set counter and set table will be reset. 
