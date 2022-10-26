function loadUserTable() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById('user-table');
            let rowClass;
            
            for (let i = 0; i < data.length; i++) {
                if(i % 2 == 0) {
                    rowClass = "even";
                }
                else {
                    rowClass = "odd";
                }
                let row = `<tr class=${rowClass}>
                              <td>${data[i].id}</td>
                              <td>${data[i].name}</td>
                              <td>${data[i].username}</td>
                              <td>${data[i].email}</td>
                              <td>${data[i].address.street}, 
                                ${data[i].address.suite}, 
                                ${data[i].address.city}, 
                                ${data[i].address.zipcode}</td>
                              <td>${data[i].address.geo.lat}</td>
                              <td>${data[i].address.geo.lng}</td>
                              <td>${data[i].phone}</td>
                              <td>${data[i].website}</td>
                              <td>${data[i].company.name}</td>
                              <td>${data[i].company.catchPhrase}</td>
                              <td>${data[i].company.bs}</td>
                           </tr>`
                table.innerHTML += row
            }
        });
}

function loadPosts(userID) {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById('post-table');
            let tableHead = document.getElementById('post-table-header');
            let rowCount = 0;
            let rowClass;
            tableHead.innerHTML = `<tr class="post-table-header">
            <th>User ID</th>
            <th>Post ID</th>
            <th>Title</th>
            <th>Body</th>
            </tr>`

            for (let i = 0; i < data.length; i++) {
                if(rowCount % 2 == 0) {
                    rowClass = "even";
                }
                else {
                    rowClass = "odd";
                }
                if(data[i].userId == userID) {
                    let row = `<tr class=${rowClass}>
                                  <td>${data[i].userId}</td>
                                  <td>${data[i].id}</td>
                                  <td>${data[i].title}</td>
                                  <td>${data[i].body}</td>
                              </tr>`
                    table.innerHTML += row
                    rowCount += 1;
                }
            }   
        });
}

loadUserTable();

let userID;
let first = true;   

document.getElementById("submit").onclick = function() {
    userID = document.getElementById("userIDs").value;
    if (first == true) {
        loadPosts(userID);
        first = false;
    }
    else {
        document.getElementById('post-table').innerHTML = ''
        loadPosts(userID)
    }
}

