# RESTCountryAPI Advanced Challenge from frontendmentor.io (https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca)

## Technologies Used: HTML, SCSS, JavaScript

##  *Objectives:*
### Users should be able to:
### -See all countries from the API on the homepage ✅
### -Search for a country using an input field ✅
### -Filter countries by region ✅
### -Click on a country to see more detailed information on a separate page ✅
### -Click through to the border countries on the detail page ✅
### -Toggle the color scheme between light and dark mode ✅

## *Challenges Faced:*
### -Making the design responsive
### -Applying the saved Dark Mode setting when a user revisits the website
### -Making CSS animations work
### -Making a functional search bar
### -Manipulating the country data from the API

## *Challenges Solutions:*
### -Checked for screen widths at which the design breaks and fixed the css accordingly using media queries
### -Used browser local storage to store the mode variable and change automatically to the last saved setting
### -Used setTimeout to delay the adding and removal of the display property from elements I wanted to hide or show
### -Used country id to search for each country
### -Used structuredClone() function to deep clone some nested object, destructuring was an option but I found the first option to be more readable

## *Conclusion and Lessons Learned:*
### -Some good practice with SCSS, very enjoyable and much more readable than plain CSS
### -Writing CSS from scratch is very time consuming, wil start to learn a CSS framework probably tailwind
### -Vanilla JavaScript is pain, will start to learn a JS framework probably react
### -Overall a great experience, learned a lot of new things about JavaScript and Front-end Development in general
