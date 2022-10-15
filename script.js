let selectedItems = 0
let name;
let address;
let link;

function selectItem(item){
    let type;
    //descobre o tipo de item verificando que classe ele possui entre as 3
    if(item.classList.contains("meal")){
        type = Array.from(document.querySelectorAll(".meal"))
    }
    if(item.classList.contains("drink")){
        type = Array.from(document.querySelectorAll(".drink"))
    }
    if(item.classList.contains("dessert")){
        type = Array.from(document.querySelectorAll(".dessert"))
    }
    //verifica se já não existe itens selecionados
    type.filter((option) => {
        if(option != item){
            if(option.classList.contains('option-selected')){
                selectedItems--
                option.classList.remove('option-selected')
                option.querySelector('.checked').classList.add('hide')
            }
        }
    })
    //seleciona/deseleciona item em questão
    item.classList.toggle('option-selected')
    item.querySelector('.checked').classList.toggle('hide')
    type.filter((option) => {
        if(option != item){
            option.classList.remove('option-selected')
            option.querySelector('.checked').classList.add('hide')
        }
    })
    if(item.classList.contains("option-selected")){
        selectedItems++
    }else{
        selectedItems--
    }
    checkThreeItems()
}

function checkThreeItems(){
    if(selectedItems >= 3){
        document.querySelector(".notSelectedAll").classList.add("hide")
        document.querySelector(".selectedAll").classList.remove("hide")
    }else{
        document.querySelector(".selectedAll").classList.add("hide")
        document.querySelector(".notSelectedAll").classList.remove("hide")
    }
}

function calculateTotal(m , d, ds){
    let order = Array.from(document.querySelectorAll('.option-selected'))
    let p_meal = Number(order[0].querySelector('h4').textContent.slice(3).replace(",","."))
    let p_drink = Number(order[1].querySelector('h4').textContent.slice(3).replace(",","."))
    let p_dessert = Number(order[2].querySelector('h4').textContent.slice(3).replace(",","."))

    let total = p_meal + p_drink + p_dessert

    return total.toFixed(2)
}
function getItemsInfo(){
    let order = Array.from(document.querySelectorAll('.option-selected'))
    let names = []
    let prices = []
    //Pega nome dos pratos selecionados
    let n_meal = order[0].querySelector('h3').textContent
    names.push(n_meal)
    let n_drink = order[1].querySelector('h3').textContent
    names.push(n_drink)
    let n_dessert = order[2].querySelector('h3').textContent
    names.push(n_dessert)
    //Pega preços dos pratos selecionados
    let p_meal = Number(order[0].querySelector('h4').textContent.slice(3).replace(",","."))
    prices.push(p_meal)
    let p_drink = Number(order[1].querySelector('h4').textContent.slice(3).replace(",","."))
    prices.push(p_drink)
    let p_dessert = Number(order[2].querySelector('h4').textContent.slice(3).replace(",","."))
    prices.push(p_dessert)
    //Junta os dados em uma matriz
    let infos = []
    infos.push(names)
    infos.push(prices)


    return infos
}

function getGreenBoxPos(){
    let names_pos = Array.from(document.querySelectorAll('.item-name'))
    let prices_pos = Array.from(document.querySelectorAll('.item-price'))
    let infos = []
    infos.push(names_pos)
    infos.push(prices_pos)

    return infos
}

function checkout(){
    let infos = getItemsInfo()
    let infoG = getGreenBoxPos()     
    
    for(let i=0;i<infos.length;i++){
        for(let j=0;j<infos[i].length;j++){
            infoG[i][j].innerHTML = infos[i][j]
        }
    }
    
    //calcula total
    let total = calculateTotal()
    let screen = document.querySelector('.confirmation')

    screen.querySelector('.total .price').innerHTML = String("R$ "+total)
    //some com a greenBox caso cliquem em cancelar
    screen.classList.toggle('hide')
}

function finalizeOrder(){
    name = prompt("Qual é o seu nome?")
    address = prompt("Diga-nos o seu endereço, por favor")

    let msg = 
    `Olá gostaria de fazer o pedido
    - Prato: Frango Yin Yang
    - Bebida: Coquinha Gelada
    - Sobremesa: Pudim
    Total: R$ 27.70
    Nome: ${name}
    Endereço: ${address}`

    msg = encodeURIComponent(msg)

    link = `https://wa.me/5548999917321?text=${msg}`
    window.open(link)
}

