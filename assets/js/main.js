const getCategories = async () => {
    const { data } = await axios.get('https://dummyjson.com/products/category-list');
    console.log(data);

    return data;
}

const displayCategories = async () => {
    const categories = await getCategories();
    const result = categories.map((category) => {
        return ` <div class="category">
        <h2> ${category} </h2> 
        <a href="CategoryDetail.html?category=${category}">Details</a>
        </div>`
    }).join('');
    document.querySelector('.categories .row').innerHTML = result;
}




const getProduct = async () => {

    const { data } = await axios.get('https://dummyjson.com/products');

    console.log(data)

    return data;
}

const displayProduct = async () => {
    const { products } = await getProduct();
    const result = products.map((product) => {
        return ` <div class="product">
        
        <img src='${product.thumbnail}' alt="${product.description}"/>
        <h3> ${product.title} </h3>
        <span>${product.price}</span>
</div>`;

    }).join('');


    document.querySelector('.products .row').innerHTML = result;
}
displayCategories();
displayProduct();
