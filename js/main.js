let elTemplate = document.querySelector('.js-template').content
let elList = document.querySelector('.parrots-wrapper')
let elAdd = document.querySelector('.js-add')
let elSearch = document.querySelector('.js-search')
let sortBy = document.querySelector('#sortby')
let elEditModal = document.querySelector('.js-modal')

let sortFunction = {
    lh:(a,b) =>{
        if (a.price > b.price) {
            return 1
        }else{
            return -1
        }
    },
    hl:(a,b) =>{
        if (a.price < b.price) {
            return 1
        }else{
            return -1
        }
    },
    bh:(a,b) =>{
        if (a.birthDate > b.birthDate) {
            return 1
        }else{
            return -1
        }
    },
    hb:(a,b) =>{
        if (a.birthDate < b.birthDate) {
            return 1
        }else{
            return -1
        }
    },

}
function handleEdit2(event){
  let product = products.find(element=>element.id==event.target.dataset.id);
  for(let t in product){
    if(t=="isFavorite") continue;
    if(t=="sizes"){
        document.getElementById("w").value=product[t].width;
        document.getElementById("h").value=product[t].height;

    }else{
        document.getElementById(t).value = product[t];
    }
  }
}

let renderProduct=(products)=>{
    elList.innerHTML = null
    products.forEach(product =>{
        let elLi = document.createElement('li')
        let elCard =elTemplate.cloneNode(true)
       let elTitle = elCard.querySelector('.card-title')
        let elPrise = elCard.querySelector('.card-text')
        let elImg = elCard.querySelector('.img')
        let elBadge = elCard.querySelector('.badge ') 
        let elYear = elCard.querySelector('.card-texts')
        let elFeatures = elCard.querySelector('.features')
        let elEditBtn = elCard.querySelector('.js-edit')
        let elDelete = elCard.querySelector('.js-delete')

        elDelete.dataset.id = product.id
        
    
        elEditBtn.addEventListener("click",handleEdit2);
            
     
        elEditBtn.dataset.id = product.id
        elLi.dataset.id = product.id
       
        elFeatures.className ='badge bg-primary me-1 mb-1'
        elFeatures.textContent = product.features
        elYear.textContent = product.birthDate
        elBadge.textContent = product.sizes.width + " x " +product.sizes.height
        elImg.src = product.img
        elPrise.textContent ="$"+  product.price
        elTitle.textContent = product.title
        elLi.className = 'col-6'
        elLi.appendChild(elCard)
        elList.appendChild(elLi)
    })
        
}
 renderProduct(products)

function hadleAdd(evt) {
    evt.preventDefault()
    elList.innerHTML = null
    let parrotTitle = document.querySelector('#parrot-title')
    let parrotImg = document.querySelector('#parrot-img')
    let parrotPrice = document.querySelector('#price')
    let parrotDate = document.querySelector('#parrot-date')
    let parrotWidth = document.querySelector('#parrot_width')
    let parrotHeight = document.querySelector('#parrot_height')
    let elFeatures = document.querySelector('#features')

   let data = {
        id: uuid.v4(),
        title: parrotTitle.value,
        img: parrotImg.value,
        price: parrotPrice.value,
        birthDate: parrotDate.value,
        sizes: {
          width:parrotWidth.value,
          height:  parrotHeight.value,
        },
        isFavorite: false,
        features: elFeatures.value
      }   
      
    products.push(data)
    renderProduct(products)
 
}

function handleSearch(evt) {
    evt.preventDefault()
    const search = document.querySelector('#search')
    const value = search.value.trim()
    const sort = sortBy.value
    let regax = new RegExp(value,'gi')

    let searchParrot = products.filter((product) => product.title.match(regax))
    elList.innerHTML=null

    products.sort(sortFunction[sort])

    renderProduct(searchParrot)
}

function handleEdit(evt) {
    evt.preventDefault();
let product={
    "id":document.getElementById("id").value,
    "title":document.getElementById("title").value,
    "img" : document.getElementById("img").value,
    "price" : document.getElementById("narx").value,
    "birthDate": document.getElementById("birthDate").value,
    "sizes":{
    "width" :document.getElementById("w").value,
    "height":document.getElementById("h").value
    },
    "features":document.getElementById("features").value
}

let index = findIndexByKeyValue(products,"id",product.id);
products[index]=product;
renderProduct(products);
}
function findIndexByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
        return -1;
    }
    
function handleDelete(evt) {
    if (evt.target.matches('.js-delete')) {
        let btnDelete =evt.target.closest('li').dataset.id 
        let deleteProduct = products.filter(product=>
            product.id != btnDelete
        )
        products = deleteProduct
        renderProduct(deleteProduct)
    }
    
}

    elList.addEventListener("click" , handleDelete)
 elAdd.addEventListener("submit", hadleAdd)
 elSearch.addEventListener("submit", handleSearch)
 elEditModal.addEventListener("submit", handleEdit)


