const listaUsuarios = document.getElementById("listaUsuarios");
const age = [25, 31, 44, 53, 28, 20, 50, 33, 38, 40];

function edadAleatoria() {
  return age[Math.floor(Math.random() * age.length)];
}

// Add loading state
listaUsuarios.innerHTML = '<div class="loading">Cargando usuarios...</div>';

fetch(`https://jsonplaceholder.typicode.com/users`) 
  .then(response => {
    if(!response.ok) {
      throw new Error(`Error: ${response.status}`) 
    };
    return response.json();
  }) 
  .then(data => {
    // Clear loading state
    listaUsuarios.innerHTML = '';
    
    function getImageUrl(userId) {
      return `./assets/img/${userId}.jpeg`;
    }
    
    data.forEach(({ id, name, username, company, phone, email, address: {street, suite, city } }) => {
      const imageUrl = getImageUrl(id);
      const age = edadAleatoria();
      
      listaUsuarios.innerHTML += `
        <li>  
          <div class="user-card">
            <div class="user-avatar">
              <img src="${imageUrl}" alt="Foto de ${name}" loading="lazy">
            </div>
            <div class="user-info">
              <h2>${name}</h2>
              <div class="user-details">
                <p><strong>Edad:</strong> ${age} años</p>
                <p><strong>Usuario:</strong> @${username}</p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Empresa:</strong> ${company.name}</p>
                <p><strong>Dirección:</strong> ${street}, ${suite}, ${city}</p>
              </div>
            </div>
          </div>
        </li>
      `
    });
  })
  .catch(err => {
    console.error("Error:", err.message);
    listaUsuarios.innerHTML = '<div class="error">Error al cargar los usuarios. Por favor, intenta de nuevo.</div>';
  });
  
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
  