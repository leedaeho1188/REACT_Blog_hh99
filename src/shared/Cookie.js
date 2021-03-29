const setCookie = (name, value, exp=5) => {
  let date = new Date();
  console.log(date)
  date.setTime(date.getTime() + exp * 24 * 60 * 60 *  1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`
  console.log(document.cookie)
};

const getCookie = (name) => {
  let value = "; "+document.cookie;

  let parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();

  console.log(date);

  document.cookie = name+"=; expires="+date;

};


export { setCookie, deleteCookie, getCookie }