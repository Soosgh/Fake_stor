const getCategories = async () => {
    const { data } = await axios.get('https://dummyjson.com/products/category-list');
    console.log(data);

    return data;
}

const displayCategories = async () => {
    const loader = document.querySelector(".loader_container");
    loader.classList.add("active");
    try {
        const categories = await getCategories();
        const result = categories.map((category) => {
            return ` <div class="category">
        <h2> ${category} </h2> 
        <a href="CategoryDetail.html?category=${category}">Details</a>
        </div>`
        }).join('');
        document.querySelector('.categories .row').innerHTML = result;
    }
    catch (error) {
        document.querySelector('.categories .row').innerHTML = "<p> Error loading Categories";

    } finally {
        loader.classList.remove("active");
    }
}



const getProduct = async (page) => {
    const skip = (page - 1) * 10;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=  ${skip}`);

    console.log(data)

    return data;
}

const displayProduct = async (page = 1) => {
    const loader = document.querySelector(".loader_container");
    loader.classList.add("active");
    try {
        const data = await getProduct(page);
        const numberOfPages = Math.ceil(data.total / 10);
        console.log(numberOfPages);
        const result = data.products.map((product) => {
            return ` <div class="product">
        
        <img src='${product.thumbnail}' alt="${product.description}"/>
        <h3> ${product.title} </h3>
        <span>${product.price}</span>
</div>`;

        }).join('');


        document.querySelector('.products .row').innerHTML = result;
        let paginationLink = "";
        if (page == 1) {
            paginationLink += `  <li class="page-item"><button class="page-link" href="#">&laquo;</button></li>`;
        } else {
            paginationLink += `<li class="page-item"><button onclick=displayProduct('${page}') class="page-link" >&laquo;</button></li>`;
        }

        for (let i = 1; i <= numberOfPages; i++) {
            paginationLink += `<li class="page-item"><button onclick=displayProduct('${i}') class="page-link" >${i}</button></li>`;

        }
        paginationLink += ` <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>  `;
        console.log(paginationLink);
        document.querySelector(".pagination-container .pagination").innerHTML = paginationLink;

    }
    catch (error) {
        document.querySelector('.categories .row').innerHTML = "<p> Error loading Categories";

    } finally {
        loader.classList.remove("active");
    }
}
displayCategories();
displayProduct();
window.onscroll = function () {
    const nav = document.querySelector(".header");
    const categories = document.querySelector(".products");
    if (window.scrollY > categories.offsetTop) {
        nav.classList.add('scrollNavbar');

    } else {
        nav.classList.remove('scrollNavbar');
    }

}
const countDown = () => {
    const CountdownDate = new Date("2025-03-02T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = CountdownDate - now;
    const days = Math.floor(distance / 86400400);
    document.querySelector("#days").textContent = days;
    const hours = Math.floor((distance % 86400400) / 3600000);
    document.querySelector("#hours").textContent = hours;
    const minutes = Math.floor((distance % 3600000) / 60000);
    document.querySelector("#minutes").textContent = minutes;
    const seconds = Math.floor((distance % 60000) / 1000);
    document.querySelector("#seconds").textContent = seconds;



}
setInterval(() => {
    countDown();
}, 1000);


