const apikey = "8c6eec402c7743f29c0e6de999baa00e";
let zip = 75082;
let forecastLink = "https://api.openweathermap.org/data/2.5/forecast?q=" + zip + ",us&units=imperial&appid="+ apikey;

let currentLink = "https://api.openweathermap.org/data/2.5/weather?q=" + zip + ",us&units=imperial&appid="+ apikey;

const apikeyclock = "V8ST3SX8E8V0";
let zone = "America/Chicago";
let clockLink = "http://api.timezonedb.com/v2.1/get-time-zone?key=" + apikeyclock + "&format=json&by=zone&zone=" + zone;

const accesskey = "7593169dd6cbc3c42863b694246576ab273573614a6c8594aa2c2cbd495257a4";
const secretkey = "a86f9ecdef7c37e642336580e4bf5d56be3a9070ea4336fb0194f6b41a44aa5a";
let photoLink = "https://api.unsplash.com" + "/collections/252265" + "/photos?client_id=" + accesskey + "&per_page=" + 30;

const nytKey = "LktIVCSbbP7WBGKddnAUNXnEKcOF06Vq";
const nySecret = "4h9hemffbej1jSNI";
let nytLink = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + nytKey;

const apikeynasa = "VmckDTUxcOvzhW6U5eKcfXMRp9pKyrUoXwjIHRSI";
let nasaLink = "https://api.nasa.gov/planetary/apod?api_key=" + apikeynasa;

const apikeyword = "kkqsrx4zebiw0budrmpg2nrres3zf9hur2piaket1eji6dbpm";
let wordLink = "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=" + apikeyword;

Promise.all([
            fetch(currentLink).then(
              function(response){
                 return response.json();
                }
            ).then(function(jsonData){
              let current = jsonData;
              let temp = current.main.temp;
              let min = current.main.temp_min;
              let max = current.main.temp_max;
              let name = current.name;
              let id = current.weather[0].id;
              let description = current.weather[0].description;
              let wind = current.wind;
              let sunset = current.sys.sunset;
              function dayOrNight(){
                let val = current.system.pod;
                if (val == "n"){
                  return "night";
                }
                else {
                  return "day";
                }          
              }
              var intervalCurrent = setInterval(incrementCurrent, 120000);
              function incrementCurrent(){
                document.getElementById("currentDay").innerHTML = " " + Math.round(temp) + "º";
                document.getElementById("currentDayIcon").className = document.getElementById("currentDayIcon").className.substring(0,10);
                document.getElementById("currentDayIcon").className += " wi-owm-" + dayOrNight() + "-" + id;
                document.getElementById("currentDayDescription").innerHTML = description;
              }
              document.getElementById("currentDay").innerHTML = name;
              document.getElementById("currentDay").innerHTML = " " + Math.round(temp) + "º";
              document.getElementById("currentDayIcon").className += " owf-" + id;
              document.getElementById("currentDayDescription").innerHTML = description;
            }),
            fetch(forecastLink).then(
              function(response){
                 return response.json();
                }
            ).then(function(jsonData){
              let future = jsonData;
              for (let day =0; day<4; day++){
                var max = -100;
                var min = 100;
                let id = future.list[day*8].weather[0].id;
                document.querySelectorAll("div.forecast > i")[day].className += " owf-" + id;
                for (let h = 0; h < 8; h++){
                  if (max < future.list[(day*8)+h].main.temp_max)
                    max=future.list[(day*8)+h].main.temp_max;
                  if (min > future.list[(day*8)+h].main.temp_min)
                      min=future.list[(day*8)+h].main.temp_min;
                  }
                document.querySelectorAll("div.forecast > ul > li.max")[day].innerHTML = Math.round(max) + "º";
                document.querySelectorAll("div.forecast > ul > li.min")[day].innerHTML = Math.round(min) + "º";
                }
            }),
            fetch(photoLink).then(
              function(response){
                 return response.json();
                }
            ).then(function(jsonData){
              let photo = jsonData;
              var x = "w=" + screen.width
              if (screen.width < document.documentElement.scrollHeight){
                x = "h=" + document.documentElement.scrollHeight;
              }
              var photoPic = photo[0].urls.raw + "&auto=compress&" + x;
              document.body.style.backgroundImage = "url(" + photoPic + ")";
            }),
            fetch(nytLink).then(
              function(response){
                 return response.json();
                }
            ).then(function(jsonData){
              let news = jsonData;
              for (var i = 0; i < 3; i++){
                let space = "";
                if (news.results[i].subsection != ""){
                  space = " ";
                }
                document.querySelectorAll("div#headlines > div.newsalert > h6")[i].innerHTML = news.results[i].title + " [" + news.results[i].section + space + news.results[i].subsection + "]";
                document.querySelectorAll("div#headlines > div.newsalert > small")[i].innerHTML = news.results[i].abstract;
              }
                var intervalNews = setInterval(incrementNews, 1200000);
                function incrementNews(){
                  for (var i = 0; i < 3; i++){
                  document.querySelectorAll("div#headlines > div.newsalert > h6")[i].innerHTML = news.results[i].title + " [" + news.results[i].section + space + news.results[i].subsection + "]";
                  document.querySelectorAll("div#headlines > div.newsalert > small")[i].innerHTML = news.results[i].abstract;
                }
              }
            }),
            fetch(nasaLink).then(
              function(response){
                 return response.json();
                }
            ).then(function(jsonData){
              let nasaPhoto = jsonData;
              document.querySelector("div#nasaPOTD > img").src = nasaPhoto.hdurl;
              document.querySelector("div#nasaPOTD > div.card-body > p").innerHTML = nasaPhoto.title;
            }),
          fetch(wordLink).then(
            function(response){
               return response.json();
              }
          ).then(function(jsonData){
            let wordOTD = jsonData;
            document.querySelector("h6#wordOfTheDay").innerHTML += wordOTD.word;
            document.getElementById("definition").innerHTML = wordOTD.definitions[0].text;
          })
        ]);
;
