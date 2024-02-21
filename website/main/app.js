// Global Variables Used Across The Script
const baseURL = "https://restcountries.com/v2/all";
const fragment = document.createDocumentFragment(); //Fragment For All Country Cards
const fragment2 = document.createDocumentFragment(); //Fragment For All Country Details Pages
const modeBtn = document.querySelector(".btn");
const dropDown = document.querySelector(".dropdown");
const regionDropdown = document.querySelector(".region-dropdown");
const regionsList = document.querySelector(".regions");
const regionItems = document.querySelectorAll(".region");
const searchBar = document.querySelector(".search-bar");
const body = document.querySelector("body");
const countries = document.querySelector(".countries");
const allDetails = document.querySelector(".all-details");
const main = document.querySelector("main");
let lastX = 0;
let lastY = 0;

//Check For The Last Dark Mode Setting In Local Storage
if (window.localStorage.mode) {
  if (window.localStorage.mode === "dark") {
    modeBtn.innerHTML = `<ion-icon name="moon"></ion-icon>Dark Mode`;
    body.style.cssText =
      "--active-bg: var(--dark-bg); --active-elm: var(--dark-elm); --active-text: var(--dark-text) ";
  } else {
    modeBtn.innerHTML = `<ion-icon name="moon-outline"></ion-icon>Dark Mode`;
    body.style.cssText =
      "--active-bg: var(--light-bg); --active-elm: var(--light-elm); --active-text: var(--light-text) ";
  }
} else {
  window.localStorage.mode = "light";
}

//Fetch Request
const getAll = async (URL) => {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// After Getting All Countries, Loop Over Them And Get The Required Data For Each One
getAll(baseURL).then((data) => {
  for (let i = 0; i < 250; i++) {
    if (data[i].name === "Israel") {
      continue;
    }
    const countryInfo = {
      number: i,
      name: data[i].name,
      nativeName: data[i].nativeName,
      population: data[i].population,
      region: data[i].region,
      subRegion: data[i].subregion,
      capital: undefined ? "No Capital" : data[i].capital,
      currencies: structuredClone(data[i].currencies),
      languages: structuredClone(data[i].languages),
      flag: data[i].flags.png,
      borders: data[i].borders,
      topLevelDomain: data[i].topLevelDomain[0],
      code: data[i].alpha3Code,
    };
    if (data[i].name === "Palestine, State of") {
      countryInfo.name = "Palestine";
      countryInfo.capital = "Jerusalem";
    }

    // To Get All Currencies
    let currencyInfo = [];
    if (countryInfo.currencies != undefined) {
      countryInfo.currencies.forEach((currency) => {
        currencyInfo.push(currency.name);
      });
    } else {
      currencyInfo.push(`No Currency`);
    }

    // To Get All Languages
    let langInfo = [];
    if (countryInfo.languages != undefined) {
      countryInfo.languages.forEach((lang) => {
        langInfo.push(lang.name);
      });
    } else {
      langInfo.push(`No Language`);
    }

    // Borders Are Given In Alpha3Code So To Get Each Country Name Corresponsing To Each Code I Had To Use The Following Algorithm
    let borderInfo = ``;
    if (countryInfo.borders != undefined) {
      countryInfo.borders.forEach((border) => {
        if (border == "ISR") {
          border = "PSE";
        }
        // Loop Over Each Country, Then Check For Some Conditions
        for (let j = 0; j < 250; j++) {
          if (border == "PSE") {
            borderInfo += `<li class="border">Palestine</li>\n`;
            break;
          }
          // If The Border Name Matches The Country Code, Add The Border Element To BorderInfo
          if (border == data[j].alpha3Code) {
            borderInfo += `<li class="border">${data[j].name}</li>\n`;
            break;
          }
        }
        if (countryInfo.name === "Palestine") {
          borderInfo = `<li class="border">Egypt</li>\n<li class="border">Jordan</li>\n`;
        }
      });
    } else {
      borderInfo = `No Borders`;
    }

    // Creating The Country Card
    const country = document.createElement("div");
    country.classList.add("country", "visible-country");
    country.dataset.region = `${countryInfo.region}`;
    country.id = `${countryInfo.name}`;

    country.innerHTML = `<img
    class="flag"
    src="${countryInfo.flag}"
    alt="country flag"
    />
    <section class="country-info">
      <span class="country-name">${countryInfo.name}</span>
      <ul class="country-properties">
        <li>Population: <span class="info">${countryInfo.population.toLocaleString()}</span></li>
        <li>Region: <span class="info">${countryInfo.region}</span></li>
        <li>Capital: <span class="info">${countryInfo.capital}</span></li>
      </ul>
      </section>`;

    // Append The Current countryCard To The Fragment Created Earlier
    fragment.appendChild(country);

    // Creating The Country Details Element
    const countryDetails = document.createElement("div");
    countryDetails.classList.add("country-details");
    countryDetails.dataset.countryName = `${countryInfo.name}`;
    countryDetails.innerHTML = `
      <div class="btn-flag">
        <button class="back-btn">
          <ion-icon name="arrow-back-outline"></ion-icon>Back
        </button>
        <img
          class="flag"
          src="${countryInfo.flag}"
          alt="${countryInfo.name} flag"
        />
      </div>
      <section class="country-info-details">
        <span class="country-name">${countryInfo.name}</span>
        <div class="all-properties">
          <ul class="country-properties">
            <li>Native Name: <span class="info">${
              countryInfo.nativeName
            }</span></li>
            <li>Population: <span class="info">${countryInfo.population.toLocaleString()}</span></li>
            <li>Region: <span class="info">${countryInfo.region}</span></li>
            <li>Subregion: <span class="info">${
              countryInfo.subRegion
            }</span></li>
            <li>Capital: <span class="info">${countryInfo.capital}</span></li>
          </ul>
          <ul class="country-properties">
            <li>Top Level Domain: <span class="info">${
              countryInfo.topLevelDomain
            }</span></li>
            <li>Currencies: <span class="info">${currencyInfo.join(
              `, `
            )}</span></li>
            <li>Languages: <span class="info">${langInfo.join(`, `)}</span></li>
          </ul>
        </div>
        <ul class="borders">
        <span>Border Countries: </span>
        ${borderInfo}
        </ul>
      </section>`;

    // Append The Current Page To The Fragment Created Earlier
    fragment2.appendChild(countryDetails);
  }
  // Adding All Country countryCards To The DOM
  countries.appendChild(fragment);

  // Adding All Details Pages To The DOM
  allDetails.appendChild(fragment2);

  // After Adding The Pages To The DOM Select Them To Add Listeners
  const allCountries = document.querySelectorAll(".country");

  // Calling The addListeners Function To Add Event Listeners To Required DOM Elements
  addListeners(allCountries);
});

function addListeners(allCountries) {
  allCountries.forEach((countryCard) => {
    countryCard.addEventListener("click", () => {
      // Saving The (X,Y) Distance Scrolled Right After Clicking The Card, Then Scroll Back To It After Closing Details Page
      lastX = scrollX;
      lastY = scrollY;
      document.querySelectorAll(".country-details").forEach((countryDet) => {
        if (countryDet.getAttribute("data-country-name") === countryCard.id) {
          // display Property Can Not Be Animated, So I Used setTimeout To Put A Delay
          // This Is What Happens, not-active Class Is Added To main Then...
          // The Scale Animation Takes Place Then display Is Set To none Using setTimeout
          countryDet.style.display = "flex";
          main.classList.add("not-active");
          setTimeout(() => {
            main.style.display = "none";
            countryDet.classList.add("active-details");
          }, 200);
        }
      });
    });
  });

  document.querySelectorAll(".back-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Same Idea Here But In Reverse
      btn.parentElement.parentElement.classList.remove("active-details");
      main.style.display = "block";
      setTimeout(() => {
        window.scrollTo(lastX, lastY);
        main.classList.remove("not-active");
      }, 100);
      setTimeout(() => {
        btn.parentElement.parentElement.style.display = "none";
      }, 200);
    });
  });
  // Making Borders In The Details Page Clickable and Able to Navigate To The Selected Country
  document.querySelectorAll(".border").forEach((border) => {
    border.addEventListener("click", () => {
      document.querySelectorAll(".country-details").forEach((e) => {
        if (border.innerText == e.getAttribute("data-country-name")) {
          border.parentElement.parentElement.parentElement.classList.remove(
            "active-details"
          );
          setTimeout(() => {
            border.parentElement.parentElement.parentElement.style.display =
              "none";
          }, 200);
          e.style.display = "flex";
          setTimeout(() => {
            e.classList.add("active-details");
          }, 200);
        }
      });
    });
  });

  // Search Bar Checks For Each Country id, If The Search Value Matches..
  // a String In a Country's id It Is Shown
  searchBar.addEventListener("search", () => {
    allCountries.forEach((countryCard) => {
      countryCard.classList.remove("visible-country");
      setTimeout(() => {
        if (
          countryCard.id
            .toLowerCase()
            .includes(searchBar.value.toLowerCase()) ||
          searchBar.value === ""
        ) {
          countryCard.style.display = "flex";
          setTimeout(() => {
            countryCard.classList.add("visible-country");
          }, 200);
        } else {
          setTimeout(() => {
            countryCard.style.display = "none";
          }, 200);
        }
      }, 100);
    });
  });

  // Function To Toggle The visible and selected Classes In The Region Selector
  function toggleSelect() {
    dropDown.classList.toggle("selected");
    regionsList.classList.toggle("visible");
  }
  regionDropdown.addEventListener("click", toggleSelect);

  // Same Idea As The Search But This Time We Check The data-region Attribute In Each Card
  regionItems.forEach((item) => {
    item.addEventListener("click", toggleSelect);

    item.addEventListener("click", () => {
      allCountries.forEach((countryCard) => {
        countryCard.classList.remove("visible-country");
        setTimeout(() => {
          if (
            "All" === item.innerText ||
            countryCard.dataset.region === item.innerText
          ) {
            countryCard.style.display = "flex";
            setTimeout(() => {
              countryCard.classList.add("visible-country");
            }, 300);
          } else {
            setTimeout(() => {
              countryCard.style.display = "none";
            }, 300);
          }
        }, 100);
      });
    });
  });

  // Checking For The Current Mode Then Changing To dark If light And Vice Versa
  modeBtn.addEventListener("click", () => {
    if (window.localStorage.mode === "light") {
      window.localStorage.mode = "dark";
      modeBtn.innerHTML = `<ion-icon name="moon"></ion-icon>Dark Mode`;
      body.style.cssText =
        "--active-bg: var(--dark-bg); --active-elm: var(--dark-elm); --active-text: var(--dark-text) ";
    } else {
      window.localStorage.mode = "light";
      modeBtn.innerHTML = `<ion-icon name="moon-outline"></ion-icon>Dark Mode`;
      body.style.cssText =
        "--active-bg: var(--light-bg); --active-elm: var(--light-elm); --active-text: var(--light-text) ";
    }
  });
}
