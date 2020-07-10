const input = document.querySelector("input");
const container = document.querySelector("#results-container");
const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const cost = document.querySelector(".cost");
const number = document.querySelector(".number");
const cost2 = document.querySelector(".cost2");
const number2 = document.querySelector(".number2");
const toggle = document.querySelector(".toggle");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
let items = document.querySelector(".items-list");

let deleteBtns = [];
let buttons = [];
let sum = 0;
let sum2 = 0;
let i = 0;
let j = 0;
let id = 0;
let idArray = [];
let cartIDArray = [];
cost.innerText = sum;
async function addMeals(e) {
  e.preventDefault();
  container.innerHTML = "";

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`
  );

  const data = await res.json();

  let user = data.meals;

  addDiv(user);
}

function addDiv(user) {
  user.forEach((item) => {
    const div = document.createElement("div");
    let randomPrice = Math.ceil((Math.random() * 3000) / 100) * 100;
    let randomID = Math.floor(Math.random() * 100000);
    div.innerHTML = `
  <div class= "singleMeal" id = "${randomID}">
    <img src=${item.strMealThumb} alt="blah">
    <div class= "flex">
     <h3> ${item.strMeal}   </h3>
     <h4> Rs ${randomPrice}  </h4>
    </div>
    <button class= "cartBtn"> Add to cart </button>
    <button class= "deleteBtn"> <i class="fa fa-trash" aria-hidden="true"></i>
    </button>

  </div>`;

    container.appendChild(div);

    let button = div.children[0].children[2];
    let deleteBtn = div.children[0].children[3];

    deleteBtns.push(deleteBtn);
    buttons.push(button);
  });
  buttons.forEach((item) => {
    item.addEventListener("click", (e) => {
      let foodItem = i++;
      let foodPrice = e.target.parentElement.children[1].children[1].innerText.slice(
        2
      );
      idArray.push(e.target.parentElement.id);
      console.log(idArray);
      updateValues(foodPrice);

      /* Adding cart */
      cartIDArray.push(e.target.parentElement.id);
      let foodItem2 = j++;
      const list = document.createElement("div");
      list.innerHTML = `
      
      <div class="list-item" id= "${e.target.parentElement.id}"> 
    <p> ${e.target.parentElement.children[1].children[0].innerText} </p>
    <p> ${e.target.parentElement.children[1].children[1].innerText}</p>
    <button ><i class="fa fa-trash fa-lg" aria-hidden="true" ></i> </button>
    </div>
    
    `;

      let delBtn = list.children[0].children[2];
      delBtn.addEventListener("click", function (e) {
        list.remove();
        reduceValues2(foodPrice);
        reduceValues(foodPrice);
      });

      items.appendChild(list);
      updateValues2(foodPrice);

      /* Cart done */
    });
  });
  deleteBtns.forEach((item) => {
    item.addEventListener("click", (e) => {
      let reducePrice = e.currentTarget.parentElement.children[1].children[1].innerText.slice(
        2
      );
      let index = idArray.indexOf(e.currentTarget.parentElement.id);
      if (idArray.includes(e.currentTarget.parentElement.id)) {
        reduceValues(reducePrice);
        idArray.splice(index, 1);
      }
      console.log(idArray);
    });
  });
}

submit.addEventListener("submit", addMeals);

function updateValues(item) {
  sum += +item;
  number.innerText = `${i} ITEMS - `;
  cost.innerText = ` Rs ${sum}`;
}

function reduceValues(item) {
  if (i > 0) {
    sum -= +item;
    number.innerText = `${i-- - 1} ITEMS - `;
    cost.innerText = ` Rs ${sum}`;
  }
}

function updateValues2(item) {
  sum2 += +item;
  number2.innerText = `${j} ITEMS `;
  cost2.innerText = ` Rs ${sum2}`;
}

function reduceValues2(item) {
  if (j > 0) {
    sum2 -= +item;
    number2.innerText = `${j-- - 1} ITEMS - `;
    cost2.innerText = ` Rs ${sum2}`;
  }
}

toggle.addEventListener("click", blow);

function blow() {
  document.body.classList.toggle("show-nav");
  toggle.classList.toggle("move");
  first.classList.toggle("display");
  second.classList.toggle("display");
}
