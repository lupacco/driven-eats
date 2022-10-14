let selectedItems = 0

function selectItem(item){
    let type;
    //descibre o tipo de item verificando que classe ele possui entre as 3
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
            }
        }
    })
    //seleciona/deseleciona item em questão
    item.classList.toggle('option-selected')
    type.filter((option) => {
        if(option != item){
            option.classList.remove('option-selected')
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