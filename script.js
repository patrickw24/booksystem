const api = `https://jhtgnvxxtcyogorozive.supabase.co/rest/v1/Book_Inventory_System`;

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodGdudnh4dGN5b2dvcm96aXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MzU4NjIsImV4cCI6MjA0NDAxMTg2Mn0.O8nw_GS332iP89quZbi0YZkbEdRrnBYkHd2E4gLy3D8`;

let modal = new bootstrap.Modal(document.getElementById("bookModal"));

getBook();

async function getBook() {
  let response = await fetch(api, {
    method: "GET",
    headers: {
      apikey: token,
      Authorization: token,
    },
  });
  let data = await response.json();

  renderTable(data);
}

function renderTable(data) {
  let tableLayout = `<tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Author</th>
                    </tr>`;

  for (let i = 0; i < data.length; i++) {
    tableLayout += `<tr>
                    <td>${data[i].title}</td>
                    <td>${data[i].author}</td>
                    <td>${data[i].genre}</td>
                    <td>${data[i].available}</td>
                    </tr>`;
  }
  bookTable.innerHTML = tableLayout;
}

async function postBook() {
  event.preventDefault();

  let title = inputTitle.value;
  let author = inputAuthor.value;
  let genre = inputGenre.value;
  let available = inputAvailability.value;

  let bookData = {
    title,
    author,
    genre,
    available,
  };

  let response = await fetch(api, {
    method: "POST",
    headers: {
      apikey: token,
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (response.ok) {
    getBook();
    inputTitle.value = "";
    inputAuthor.value = "";
    inputGenre.value = "";
    inputAvailability.value = "";
  } else {
    console.log("Book was not added");
  }
}

async function showModal(id) {
  let url = `${api}?id=eq.${id}`;

    let response= await fetch(url,{
        'method': 'GET',
        'headers':{
            'apikey': token,
            'Authorization': token,
            "Content-Type": "application/json"
        }
    })
    modal.show()

    if(response.ok){
        let data= await response.json()
        inputTitle2.value= data[0].title
        inputAuthor2.value= data[0].author
        inputGenre2.value= data[0].genre
        inputAvailability2.value= data[0].available
    }else{
        console.log("unable to fetch data")
    }
}
