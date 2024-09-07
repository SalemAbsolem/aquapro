const BASE_URL = `${window.location.origin}/wp-json/contact-form-7/v1/contact-forms/`;
const Route = {
  // GET_DATA: '/data',
  SEND_DATA: '/feedback',
};
const Method = {
  // GET: 'GET',
  POST: 'POST',
};

const load = (route, idForm, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${idForm}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });

// const getData = () => load(Route.GET_DATA);

const sendData = (idForm, body) => load(Route.SEND_DATA, idForm, Method.POST, body);

export {/*getData,*/ sendData};
