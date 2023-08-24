const fakeDataURL = `https://jsonplaceholder.typicode.com/todos`;

// state
let todos = [];
let filter = "";
let newItem = "";
let selectedItem = "";

// gets data and stores in the upper scope
const getFakeData = async () => {
  const { data } = await axios.get(fakeDataURL);
  todos = data;
  updateInterface();
};

// update the html in the interface ]
const updateInterface = () => {
  // filter the data first based on the user input
  let filteredData = todos.filter((item) => {
    return item.title.includes(filter);
  });

  filteredData.reverse();

  // map through each item in the filtered array and inject it into the html document
  const html = filteredData.map((item) => {
    return `<div id="${item.title}" class="item ${
      item.completed === true ? `complete` : `incomplete`
    }">
                <p id="${item.title}">${item.title}</p>
            </div>`;
  });

  console.log(html.join(""));

  document.getElementById("root").innerHTML = html.join("");

  const deleteItem = () => {
    document.getElementById("root").addEventListener("click", (event) => {
      console.log(event.target.id);

      const indexOf = todos.findIndex((item) => {
        return item.title === event.target.id;
      });

      console.log(indexOf);

      const copy = [...todos];
      copy.splice(indexOf, 1);
      todos = copy;

      updateInterface();
    });
  };

  deleteItem();
};

// find the input box and listen for changes
const userFilter = () => {
  document.getElementById("filter").addEventListener("input", (event) => {
    filter = event.target.value;

    // update interface each time the user types
    updateInterface();
  });
};

const addItem = () => {
  document.getElementById("newItem").addEventListener("input", (event) => {
    newItem = event.target.value;
  });

  console.log(newItem);

  document.getElementById("addItem").addEventListener("click", () => {
    // copy of todos
    const copy = [
      ...todos,
      {
        userId: 1000,
        id: Math.round(Math.random() * 10000),
        title: newItem,
        completed: false,
      },
    ];

    todos = copy;

    // push a new todo item into the todos array
    // todos.push({
    //   userId: 1000,
    //   id: Math.round(Math.random() * 10000),
    //   title: newItem,
    //   completed: false,
    // });

    updateInterface();
  });
};

getFakeData();
userFilter();
addItem();
