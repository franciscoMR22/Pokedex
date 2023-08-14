const dataCard = document.querySelector('[data-card]');
const dataName = document.querySelector('[data-name]');
const dataImageCont = document.querySelector('[data-image-container]');
const dataImg = document.querySelector('[data-img]');
const dataId = document.querySelector('[data-id]');
const dataTypes = document.querySelector('[data-type]');
const dataStats = document.querySelector('[data-stats]');

const typeColors = {
    electric: '#caaf13',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

/*Realiza búsqueda del pokemon*/

const searchPokemon = e => {
    e.preventDefault(); //previene el reenvio del formulario al recargar la página
    const {value} = e.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) //busca el nombre del pokemon 
        .then(data=> data.json())
        .then(response=>renderPokemonData(response))
        .catch(err=> renderNotFound()); //muestra la imagen de sombra del pokemon
}

/*Muestra datos del pokemon*/

const renderPokemonData= data=>{
    const sprite = data.sprites.front_default; //toma información como la imagen del pokemon
    const {stats,types}=data; //{estadisticas,tipo de pokemon}
    console.log(data);

    //muestra la información de el pokemon
    dataName.textContent = data.name;
    dataImg.src=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    //dataImg.setAttribute('src',data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']);
    dataId.textContent=`N° ${data.id}`;
    cardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

/*Asigna colores de fondo y letras*/

const cardColor = types=>{
    const firstColor =typeColors[types[0].type.name];
    const secondColor = types[1] ? typeColors[types[1].type.name] : typeColors.default;

    dataImg.style.background = `radial-gradient(${secondColor} 33%, ${firstColor} 33%)`;
    dataImg.style.backgroundSize ='5px 5px';
}

/*Imprime el tipo de pokemon*/ 
const renderPokemonTypes = types =>{
    dataTypes.innerHTML =''; //Hace el cambio de contenido si se busca otro pokemon
    types.forEach(type =>{
        const typeTextElement = document.createElement("div"); //creamos el elemento donde estará el estilo de pokemon
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        dataTypes.appendChild(typeTextElement); //si tiene dos estilos, los ingresara los dos, para el forEach
    })
}

/*Imprime las estadísticas del pokemon*/

const renderPokemonStats = stats =>{
    dataStats.innerHTML=''; //Borra la llamada anterior
    stats.forEach(stat =>{
        const statElement= document.createElement("div"); //Número de la estadística
        const statElementName = document.createElement("div"); //Nombre de la estadística
        const statElementAmount = document.createElement("div"); //Cantidad de estadisticas

        statElementName.textContent = stat.stat.name; //El segundo . son valores de la API en stat      
        statElementAmount.textContent = stat.base_stat; //El segundo . son valores de la API en stat 
        //Asignaciones para imprimir los valores
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        dataStats.appendChild(statElement);    
    })
}

/*Imprime si el campo ingresado no es correcto o no se tiene en la API */
const renderNotFound = () =>{
    dataName.textContent= 'No encontrado',
    dataImg.setAttribute('src','/images/poke-shadow.png');
    dataImg.style.background='#fff';
    
    dataTypes.innerHTML='';
    dataStats.innerHTML='';
    dataId.innerHTML='';
}