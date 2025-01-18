const submitbtn = document.querySelector("#submitbtn");
const cityName = document.querySelector("#cityName");
const city_name = document.querySelector("#city_name");
const temp_real_value = document.querySelector("#temp_real_value");
const temp_status = document.querySelector("#temp_status");
const dataHide = document.querySelector(".middle_layer");
const day = document.querySelector("#day");
const date = document.querySelector("#date");

console.log(date);


const getCurrentDay = () => {
    const currentDay = new Array(7);
    currentDay[0] = "Sunday";
    currentDay[1] = "Monday";
    currentDay[2] = "Tuesday";
    currentDay[3] = "Wednesday";
    currentDay[4] = "Thursday";
    currentDay[5] = "Friday";
    currentDay[6] = "Saturday";

    const currentMonth = new Array(12);
    currentMonth[0] = "Jan";
    currentMonth[1] = "Feb";
    currentMonth[2] = "March";
    currentMonth[3] = "Apr";
    currentMonth[4] = "May";
    currentMonth[5] = "June";
    currentMonth[6] = "July";
    currentMonth[7] = "Aug";
    currentMonth[8] = "Sept";
    currentMonth[9] = "Oct";
    currentMonth[10] = "Nov";
    currentMonth[11] = "Dec";


    const currentTime = new Date();
    const Day = currentDay[currentTime.getDay()];
    const month = currentMonth[currentTime.getMonth()];
    const dat = currentTime.getDate();



    day.innerText = Day;
    date.innerText = dat + " " + month;
};

getCurrentDay();

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = "Give an input first";
        dataHide.classList.add("data_hide");
    }

    else {
        try {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=7fcb12f8bec16112e99da28ca37e99a6`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
            temp_real_value.innerText = arrData[0].main.temp;

            const climate = arrData[0].weather[0].main;

            if (climate == "Clear") {
                temp_status.innerHTML =
                    "<i class= 'fas  fa-sun' style='color: #eccc68;'></i>";
            }
            else if (climate == "Clouds") {
                temp_status.innerHTML =
                    "<i class= 'fas  fa-cloud' style='color: #f1f2f6;'></i>";
            }
            else if (climate == "Rain") {
                temp_status.innerHTML =
                    "<i class= 'fa-solid  fa-cloud-rain' style='color: #a4b0be;'></i>";
            }
            else {
                temp_status.innerHTML =
                    "<i class= 'fas  fa-sun' style='color: #eccc68;'></i>";
            }

            dataHide.classList.remove("data_hide");

        } catch {
            city_name.innerText = "Plz enter name correctly";
            dataHide.classList.add("data_hide");
        }

    }

}
submitbtn.addEventListener("click", getInfo);