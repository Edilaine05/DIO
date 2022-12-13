/* inicializando o modal */
const linkEL = document.querySelector("link");
linkEL.addEventListener("click", abreModal);
/* deixando visivel */
function abreModal(_e) {
  const modalEl = document.querySelector(".modal");
  modalEl.classList.add("visivel");
}

const maxRecords = 649;
const limit = 20;
let offset = 0;

const pokemonCard = document.getElementById("pokemonLi");

const carregarMais = document.getElementById("carregarMais");

function carregaPokemonItens(offset, limit) {
  function convertePokemonToCard(pokemon) {
    return (
      `
    <div class= "body "> 
        <div class= "card card-pokemon ${
          pokemon.tipo
        } " style="width: 18rem; height: 16rem;">
            <div class="card-body">
                <table>
                    <th>
                        <h1 class="card-subtitle">${pokemon.nome}</h1>
                    </th>
                    <td>
                        <p calss="numero">#${pokemon.id}</p>
                    </td>
                </table>
                <table>
                <td>
                    <ol class="card-text">
                    ${pokemon.types
                      .map(
                        (tipo) => `<li class="${tipo}"id="tipo">${tipo}</li>`
                      )
                      .join("")}
                    </ol>
                </td>
                <td id="imgC"> <img class="pokemonImg"
                        src="${pokemon.imagemCard}"
                        alt="${pokemon.nome}"></td>
                </table>

             <div class="card-footer "><a href="#!" class="link" data-bs-toggle="modal" data-bs-target="#Modal${
               pokemon.id
             }">Saber mais.</a>
             </div>   
            </div>
            <div id="mod" ></div>
        </div>
    </div>             
 ` +
      `<!-- Modal -->
 <div class="modal fade" id="Modal${
   pokemon.id
 }" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true"style="--bs-modal-bg: #16be9d;">
     <div class="modal-dialog modal-sm">
         <div class="modal-content ${pokemon.tipo}">
             <div class="modal-header">
                 <h2 class="modal-title" id="ModalLabel">${pokemon.nome}</h2>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body ">
                 <img id="imgPokeModal" calss="ImgPokeDetails"src="${
                   pokemon.imagemMod
                 }" alt="${pokemon.nome}">
                 <h3>Tipo
                     <table>
                         <tr>${pokemon.types
                           .map(
                             (
                               tipo
                             ) => `<th class="status1 ${pokemon.tipo}">${tipo}</th>
                         <td class="status1 ${pokemon.tipo}"><p class="type-icon type-${tipo} type-cell type-abbr" title="${tipo}"></p></td>`
                           )
                           .join("")}</tr>  
                     </table>

                 </h3>
                 <h3>Habilidades
                 <table>
                     <tr>${pokemon.abilities
                       .map(
                         (ability) =>
                           `<td class="status2 ${pokemon.tipo}">${ability}</td>`
                       )
                       .join("")}</tr>  
                 </table>

             </h3>

            
                <h5>Treinamento</h5>
                <table>
                     
                    <tr>
                    <td class="titulo">Status</td>
                    <td class="titulo">Valor</td>
                    </tr>
                    <tr class="stats">
                    <td> ${pokemon.statsName
                      .map(
                        (statnames) => `<li class="statname">${statnames}</li>`
                      )
                      .join("")}</td>
                    <td> ${pokemon.stats
                      .map((stats) => `<li class="statvalor">${stats}</li>`)
                      .join("")}</td>
                   </tr>
                </table>
                <table>
                     <tr>
                         <td class="titulo">Base de Experiência</td>
                     </tr>
                     <tr>
                         <td class="status">${pokemon.base_experience}</td>
                     </tr>
                     
                </table>
             </div>
         </div>
     </div>
 </div>`
    );
  }

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertePokemonToCard).join("");
    pokemonCard.innerHTML += newHtml;
  });
}

carregaPokemonItens(offset, limit);
/* inicializando o botao */
carregarMais.addEventListener("click", () => {
  offset += limit;

  const quantidadeDeRegistro = offset + limit;

  if (quantidadeDeRegistro >= maxRecords) {
    const newLimit = maxRecords - offset;
    carregaPokemonItens(offset, newLimit);
    carregarMais.parentElement.removeChild(carregarMais);
  } else {
    carregaPokemonItens(offset, limit);
  }
});
