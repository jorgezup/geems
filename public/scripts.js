const currentPage = location.pathname
const header = document.querySelector("header div.container-header")
/* Adiciona a classe active conforme a página que está */
const inputForm = document.querySelector(".container-header form > input")
const newReagente = document.querySelector('.menu-header ul.itens')
if(currentPage == '/') {
    header.classList.remove('site')
    inputForm.classList.add('hidden')
    newReagente.classList.add('hidden')
}

// const start = new Date;
// const dia = (start.getDate())
// const mes = ("0" + (start.getMonth() + 1)).slice(-2)
// const ano = (start.getFullYear())
// const data = `${ano}-${mes}-${dia}`
// const dateControl = document.querySelector('input[type="date"]');
// dateControl.value = data

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

        
        for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
            
            const firstAndLastPage = currentPage == 1 || currentPage == totalPages
            const pagesAfterSelectedPage = currentPage <= selectedPage + 2
            const pagesBeforeSelectedPage = currentPage >= selectedPage - 2 
            
            if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
                if(oldPage && currentPage - oldPage > 2) {
                    pages.push("...")
                }
            
            
                if (oldPage && currentPage - oldPage == 2) {
                    pages.push(oldPage + 1)
                }
                
                pages.push(currentPage)
                
                oldPage = currentPage
            }
        }
        return pages
}

function createPagination(pagination) {
    const filter = pagination.dataset.filter
    const order = pagination.dataset.order
    const column = pagination.dataset.column
    const page = Number(pagination.dataset.page)
    const total = Number(pagination.dataset.total)
    const pages = paginate(page, total)


    let elements = ""

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } 
        else {
            if (column){
                elements += `<a href="?page=${page}&column=${column}&order=${order}">${page}</a>`
            }
            else {
                if (filter) {
                    elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
                } else {
                    elements += `<a href="?page=${page}">${page}</a>`
                }
            }
        }
    }
    
    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if (pagination) {
    createPagination(pagination)
}

const Validate = {
    controlado(event) {
        const divOrgao = document.querySelector('#orgao')
        console.log(divOrgao)
        divOrgao.classList.toggle('hidden')
        const select = divOrgao.querySelector('select')
        select.required = true
    },
    allFields(event) {
        const items = document.querySelectorAll('.obrigatorio')
        for(item of items) {
            if (item.value == "") {
                const message = document.createElement('div')
                const pMessage = document.createElement('p')
                message.classList.add('messages')
                message.classList.add('errors')
                pMessage.classList.add('error')
                item.classList.add('obrigatorio-error')
                pMessage.innerHTML = 'Preencha os campos obrigatórios!'
                message.append(pMessage)
                document.querySelector('body').append(message)

                event.preventDefault()
            }
        }
        setTimeout(function() {
            const items = document.querySelectorAll('.obrigatorio-error')
            for(item of items) {
                item.classList.remove('obrigatorio-error')
            }
        }, 5000)
    },
    consumo(event) {
        const divQuantidade = document.querySelector('#quantidade')
        const inputConsumo = document.querySelector('div.item input')
        
        if(inputConsumo.value == null || inputConsumo.value == 0 || inputConsumo.value < 0) {
            const divMessage = document.createElement('div')
            const pMessage = document.createElement('p')
            divMessage.classList.add('messages')
            divMessage.classList.add('errors')
            pMessage.classList.add('error')
            pMessage.innerHTML = 'Por favor, insira o valor do Consumo do Reagente.'
            divMessage.append(pMessage)
            document.querySelector('body').append(divMessage)
            inputConsumo.value = ""
            
            event.preventDefault()
        }

        else if(inputConsumo.value > Number(divQuantidade.textContent)) {
            const divMessage = document.createElement('div')
            const pMessage = document.createElement('p')
            divMessage.classList.add('messages')
            divMessage.classList.add('errors')
            pMessage.classList.add('error')
            pMessage.innerHTML = 'O valor do Consumo não pode ser maior do que a quantidade de Reagente.'
            divMessage.append(pMessage)
            document.querySelector('body').append(divMessage)
            inputConsumo.value = ""
            
            event.preventDefault()
        }
    }
}

