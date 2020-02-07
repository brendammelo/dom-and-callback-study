// Acessa os elementos DOM
const reportSection = document.getElementById('weather-report');
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city');

// Prepara o openweathermap.org request
let apiRequest = new XMLHttpRequest();

/* 
 * Listener do botao, previne default behavior do submit
 * prepara e envia o request
*/
cityForm.addEventListener('submit', ($event) => {
  $event.preventDefault();
  const chosenCity = cityInput.value;
  apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&units=metric'+'&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
  apiRequest.send();
});

apiRequest.onreadystatechange = () => {
  if (apiRequest.readyState === 4) { //state 4 ok
    if(apiRequest.status === 404){ //erro 404
    return reportSection.textContent= 'City not found';
    }
    const response = JSON.parse(apiRequest.response); //Transforma em obj para q possa ser tratado
    console.log(response)
    reportSection.textContent = 'O clima em ' + response.name + ' é ' + response.weather[0].main + 
    '. A temperatura mínima é: ' + response.main['temp_min']+ '°C.' + ' A temperatura máxima é: ' + response.main['temp_max'] + '°C';
    
    
  }
};



