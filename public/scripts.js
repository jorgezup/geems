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