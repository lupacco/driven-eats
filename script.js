let selectedItems = 0
let name;
let address;
let link;
let order;

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

function calculateTotal(){
    order = Array.from(document.querySelectorAll('.option-selected'))
    let p_meal = Number(order[0].querySelector('h4').textContent.slice(3).replace(",","."))
    let p_drink = Number(order[1].querySelector('h4').textContent.slice(3).replace(",","."))
    let p_dessert = Number(order[2].querySelector('h4').textContent.slice(3).replace(",","."))

    let total = p_meal + p_drink + p_dessert

    return total.toFixed(2)
}

function checkout(){
    let total = calculateTotal()
    let screen = document.querySelector('.confirmation')
    screen.querySelector('.total .price').innerHTML = String("R$ "+total)
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

