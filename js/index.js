
// thoi tiet
const APP_ID = 'cf26e7b2c25b5acd18ed5c3e836fb235';
const DEFAULT_VALUE = '--';
const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');


const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');


searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log('[Search Input]', data);
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
        });
});


// đăng nhập

document.addEventListener("DOMContentLoaded", function () {
    // Đăng nhập dựng
    const hardcodedUsername = "admin@gmail.com";
    const hardcodedPassword = "password123";

    // Xử lý form khi người dùng ấn nút "Đăng nhập"
    document.getElementById("loginForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn chặn submit form mặc định

      // Lấy giá trị người dùng nhập vào
      const emailInput = document.querySelector("input[type='email']");
      const passwordInput = document.querySelector("input[type='password']");
      const email = emailInput.value;
      const password = passwordInput.value;

      // Kiểm tra nếu tên đăng nhập và mật khẩu đúng
      if (email === hardcodedUsername && password === hardcodedPassword) {
        alert("Đăng nhập thành công!");
        // Thực hiện các hành động sau khi đăng nhập thành công, ví dụ: chuyển hướng tới trang khác
        window.location.href = "./index.html";
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!");
      }
    });
  });