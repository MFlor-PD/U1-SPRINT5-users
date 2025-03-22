const listaUsuarios = document.getElementById("listaUsuarios");
const age = [25, 31, 44, 53, 28, 20, 50, 33, 38, 40];
function edadAleatoria() {
  return age[Math.floor(Math.random() * age.length)];
}
fetch(`https://jsonplaceholder.typicode.com/users`) 
  .then(response => {
    if(!response.ok) {
      throw new Error(`Error: ${response.status}`) 
    };
    return response.json();
  }) 
  .then(data => {
    function getImageUrl(userId) {
      return `./assets/img/${userId}.jpeg`;
    }
    data.forEach(({ id, name, username, company, phone, email, address: {street, suite, city } }) => { // Destructuring
      const imageUrl = getImageUrl(id);
      const age = edadAleatoria();
      listaUsuarios.innerHTML += `
        <li>  
      <div>
        <img src= "${imageUrl}" alt="User-Image">
        <h2>Name: ${name}</h2>
        <p>Age: ${age}</p>
        <p>Username: ${username}</p>
        <p>Phone: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Company: ${company.name}</p>
        <p>Address: ${street}, ${suite}, ${city}</p>
      </div>
      </li>
      `
    });
  })
  .catch(err => console.error("Error:", err.message));
  
  /*.then(data => {
    function getImageUrl(userId) {
      return `./assets/img/${userId}.jpeg`;
    }
    data.forEach(usuario => {
      const imageUrl = getImageUrl(usuario.id);
      const age = edadAleatoria();
      listaUsuarios.innerHTML += `
      <li>  
      <div>
        <img src= "${imageUrl}" alt="User Image">
        <h2>Name: ${usuario.name}</h2>
        <p>Age: ${age}</p>
        <p>Username: ${usuario.username}</p>
        <p>Phone: ${usuario.phone}</p>
        <p>Email: ${usuario.email}</p>
        <p>Company: ${usuario.company.name}</p>
        <p>Address: ${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}</p>
      </div>
      </li>
      `
    });
  })*/
  