
let url = window.location.search.substring(1).split('&');
let urlQuery = [];

url.forEach(function(queries){
   newQuery = queries.split('=');
   urlQuery.push(newQuery);
})

// let theme = urlQuery[2][1];
// let player1name =  urlQuery[0][1];
// let player2name =  urlQuery[1][1];

document.querySelector('#player1 > #name').innerText = player1name;
document.querySelector('#player2 > #name').innerText = player2name;