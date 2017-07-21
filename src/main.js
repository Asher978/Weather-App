// var myApiKey = '92ba6b0fc9abb723f1e0bfc67d767923';
// var url = `http://api.openweathermap.org/data/2.5/weather?q=${zip},us?units=imperial&appid=92ba6b0fc9abb723f1e0bfc67d767923`;
/*

Here's an overview of the steps you'll follow to get your app to work...

STEPS

1. when the page loads
  - add an event listener to the button
2. When the button is clicked
  - grab the input
  - store the value
  - make an API request based on the input value
3. When the API response is returned
  - grab all the appropriate DOM elements
  - append the data to the DOM

*/
$('<div id="mainContainer">').css({height: '60vh', width: '70vw'}).appendTo('body');
$('<button id="search" class="animated">').text('SEARCH').appendTo('body');
$('<input id="zipcode" placeholder="ZIP CODE">').appendTo('body');

$('<div id="container2">').css({height: '50vh', width: '40vw'}).appendTo('#mainContainer');
$('<p class="today" id="city">').css({fontSize: '1.6em', position: 'relative', top: '10%', left: '30%',height: '50px', width: '200px'}).appendTo('#container2');
$('<p class="today" id="description">').css({fontSize: '3em', position: 'relative', top: '40%', left: '10%',height: '50px', width: '80%'}).appendTo('#container2');
$('<p class="today" id="temp">').css({fontSize: '6em', position: 'relative', top: '1%', left: '27%', height: '50px', width: '80px'}).appendTo('#container2');
$('<p class="today" id="mintemp">').css({fontSize: '1.5em', position: 'relative', top: '45%', left: '20%',height: '50px', width: '80px'}).appendTo('#container2');
$('<p class="today" id="maxtemp">').css({fontSize: '1.5em', position: 'relative', top: '31%', left: '60%',height: '50px', width: '80px'}).appendTo('#container2');

$('<div id="container1">').css({height: '50vh', width: '30vw'}).appendTo('#mainContainer');
$('<p id="day1" class="date">').css({height: '15%', width: '80%'}).appendTo('#container1');
$('<p id="day2" class="date">').css({height: '15%', width: '80%'}).appendTo('#container1');
$('<p id="day3" class="date">').css({height: '15%', width: '80%'}).appendTo('#container1');
$('<p id="day4" class="date">').css({height: '15%', width: '80%'}).appendTo('#container1');
$('<p id="day5" class="date">').css({height: '15%', width: '80%'}).appendTo('#container1');

$('<div id="container3">').css({height: '50vh', width: '5vw'}).appendTo('#mainContainer');
$(`<img id="img1" class="icon" src="">`).appendTo('#container3')
$(`<img id="img2" class="icon" src="">`).appendTo('#container3')
$(`<img id="img3" class="icon" src="">`).appendTo('#container3')
$(`<img id="img4" class="icon" src="">`).appendTo('#container3')
$(`<img id="img5" class="icon" src="">`).appendTo('#container3')



$(function ()  {
    console.log('Script.js and jquery.js are loaded :)');
    let zip = '';
    let makeCall = () => {
        console.log(zip);
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=92ba6b0fc9abb723f1e0bfc67d767923`, // current forcast
            // url: `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=92ba6b0fc9abb723f1e0bfc67d767923`, // 5 day forecast
            method: 'GET',
            success: function (data) {
              // debugger
              getData(data)
              secondCall();
              console.log('first api');
                
            }
        })
    }
    let secondCall = () => {
      console.log(zip);
      $.ajax({
          // url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=92ba6b0fc9abb723f1e0bfc67d767923`, // current forcast
          url: `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&appid=92ba6b0fc9abb723f1e0bfc67d767923`, // 5 day forecast
          method: 'GET',
          success: function (data1) {
            // debugger
            secondData(data1)
            console.log('second api');
              
          }
      })
    }
    

    $('button').click( () => {
      zip = $('#zipcode').val();
      // console.log(city);
      $('#mainContainer').css({display: 'flex'});
      $('#search').css('top', '1%');
      $('#zipcode').css('top', '1%');
      makeCall();
     
    })

    let getData = (data) => {
      let city = data.name;
      let description = data.weather[0].description;
      // let description = data.list[0].weather[0].description; 
      let temp = data.main.temp;
      temp = Math.floor(temp);
      console.log(temp)
       if (temp >= 90) {
        $('#temp').css('color', 'red')
      }
      if(temp<40){
        $('#temp').css('color', 'blue')
      }
      
      
      let maxT = data.main.temp_max;
      
      let minT = data.main.temp_min;
      
      
      
      
      $('#city').text(city);
      $('#description').text(description);
      $('#temp').text(temp);
     
      $('#mintemp').text(`Min ${minT}`);
      $('#maxtemp').text(`Max ${maxT}`);
      // console.log(city);
      // manipulateDom(first_name, last_name, pic)
    }

    let secondData = (data1) => {
      let days = data1.list.filter(function (e) {
        if (e.dt_txt.substring(11, 19) === '15:00:00') {
          return e
        }
      })
      let day1 = days[0];
      let day2 = days[1];
      let day3 = days[1];
      let day4 = days[3];
      let day5 = days[4];
      // console.log(days);
      let date1 = (days[0].dt_txt).substring(6, 11);
      let desc1 = days[0].weather[0].description; 
      let pic1 = days[0].weather[0].icon;
      let temp1 = days[0].main.temp;
      temp1 = Math.floor(temp1);
      let date2 = (days[1].dt_txt).substring(6, 11);
      let desc2 = days[1].weather[0].description;
      let pic2 = days[1].weather[0].icon; 
      let temp2 = days[1].main.temp;
      temp2 = Math.floor(temp2);
      let date3 = (days[2].dt_txt).substring(6, 11);
      let desc3 = days[2].weather[0].description; 
      let pic3 = days[2].weather[0].icon;
      let temp3 = days[2].main.temp;
      temp3 = Math.floor(temp3);
      let date4 = (days[3].dt_txt).substring(6, 11);
      let desc4 = days[3].weather[0].description; 
      let pic4 = days[3].weather[0].icon;
      let temp4 = days[3].main.temp;
      temp4 = Math.floor(temp4);
      let date5 = (days[4].dt_txt).substring(6, 11);
      let desc5 = days[4].weather[0].description; 
      let pic5 = days[4].weather[0].icon;
      let temp5 = days[4].main.temp;
      temp5 = Math.floor(temp5);




      $('#day1').text(`${date1}: ${desc1} - ${temp1}`);
      $('#day2').text(`${date2}: ${desc2} - ${temp2}`);
      $('#day3').text(`${date3}: ${desc3} - ${temp3}`);
      $('#day4').text(`${date4}: ${desc4} - ${temp4}`);
      $('#day5').text(`${date5}: ${desc5} - ${temp5}`);
      $('#img1').attr('src', `http://openweathermap.org/img/w/${pic1}.png`);
      $('#img2').attr('src', `http://openweathermap.org/img/w/${pic2}.png`);
      $('#img3').attr('src', `http://openweathermap.org/img/w/${pic3}.png`);
      $('#img4').attr('src', `http://openweathermap.org/img/w/${pic4}.png`);
      $('#img5').attr('src', `http://openweathermap.org/img/w/${pic5}.png`);
    }
})