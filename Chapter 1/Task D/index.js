const products = [
    { name: "Pen", price: 20 },
    { name: "Notebook", price: 45 },
    { name: "Backpack", price: 120 },
    { name: "Shoes", price: 75 },
    { name: "Water Bottle", price: 30 },
    { name: "Headphones", price: 150 }
];

let ansArr = products.filter(product => product.price > 50).map(product => product.name)
console.log(ansArr)
