let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');

let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

let videoBtn = document.querySelectorAll('.vid-btn');


window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});



let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }    
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// deal
let countDate = new Date('october 6, 2023 00:00:00').getTime();

function CountDown(){

    let now = new Date().getTime();
    gap = countDate - now;

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let d = Math.floor(gap / (day));
    let h = Math.floor((gap % (day)) / (hour));
    let m = Math.floor((gap % (hour)) / (minute));
    let s = Math.floor((gap % (minute)) / (second));

    document.getElementById('day').innerText = d;
    document.getElementById('hour').innerText = h;
    document.getElementById('minute').innerText = m;
    document.getElementById('second').innerText = s;

}

setInterval(function(){
    CountDown();
},1000);



class LocalCart{
  static key = "cartItems"

  static getLocalCartItems(){
      let cartMap = new Map()
   const cart = localStorage.getItem(LocalCart.key)   
   if(cart===null || cart.length===0)  return cartMap
      return new Map(Object.entries(JSON.parse(cart)))
  }

  static addItemToLocalCart(id, item){
      let cart = LocalCart.getLocalCartItems()
      if(cart.has(id)){
          let mapItem = cart.get(id)
          mapItem.quantity +=1
          cart.set(id, mapItem)
      }
      else
      cart.set(id, item)
     localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
     updateCartUI()
      
  }

  static removeItemFromCart(id){
  let cart = LocalCart.getLocalCartItems()
  if(cart.has(id)){
      let mapItem = cart.get(id)
      if(mapItem.quantity>1)
     {
      mapItem.quantity -=1
      cart.set(id, mapItem)
     }
     else
     cart.delete(id)
  } 
  if (cart.length===0)
  localStorage.clear()
  else
  localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
     updateCartUI()
  }
}

const addToCartBtns = document.querySelectorAll('.cart-btn')
addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
}  )