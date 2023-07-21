const rowSelectColor = "#F5F5F5"
const rowClearColor = "white"
const getURL = "http://localhost:3000/api/allnames/"
const postURL = "http://localhost:3000/api/addname/"
const deleteURL = "http://localhost:3000/api/deletename/"

let selectedRowIx
let prevSelection
let table

/* Functions */

window.onload = () => {
  document.getElementById("status").innerHTML = "Fetching data..."
  table = document.getElementById("data-table")
  loadData();
}
async function loadData() {
  try {
    const response = await fetch(getURL);
    if (response.ok) {
      const data = await response.json();
      buildTable(data);
      alert(data);
      const n = data.length;
      document.getElementById("status").innerHTML = "lora mara  " + n + " row(s)!";
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("# Error:", error);
    const msg =
      "Error: " + error.message + ". " +
      "The web server or database may not have started. " +
      "See browser's console for more details.";
    document.getElementById("status").innerHTML = msg;
  }
}
function buildTable(data) {
  data.forEach(doc => addToTable(doc))
}
function addToTable(doc) {
  selectedRowIx = table.rows.length
  const row = table.insertRow(selectedRowIx)
  const cell1 = row.insertCell(0)
  const cell2 = row.insertCell(1)
  const cell3 = row.insertCell(2)
  cell1.innerHTML = doc.Email;
  cell2.innerHTML = doc.Password;
  cell3.innerHTML = "<input type='radio' name='select' onclick='selectRow(this)' checked>"
  cell3.className = "tradio"
}

function selectRow(obj) {
  const row = (obj) ? obj.parentElement.parentElement : table.rows[table.rows.length - 1]
  selectedRowIx = row.rowIndex
  if (obj) {
    document.getElementById("status").innerHTML = "Selected row " + selectedRowIx
  }
  setSelection(row)
}

function setSelection(row) {

  document.getElementById("name").value = row.cells.item(0).innerHTML
  document.getElementById("country").value = row.cells.item(1).innerHTML
  row.style.backgroundColor = rowSelectColor
  if (prevSelection && prevSelection !== selectedRowIx) {
    table.rows[prevSelection].style.backgroundColor = rowClearColor
  }
  prevSelection = selectedRowIx
}

function scrollToSelection() {

  const ele = document.getElementById("table-wrapper")
  const bucketHt = ele.clientHeight
  const itemHt = ele.scrollHeight / table.rows.length
  const noItemsInBucket = parseInt(bucketHt / itemHt)
  const targetBucket = (selectedRowIx + 1) / noItemsInBucket
  const scrollPos = (bucketHt * (targetBucket - 1)) + (bucketHt / 2)
  ele.scrollTop = Math.round(scrollPos)
}


function addData() {
  const name = document.getElementById("name").value
  const country = document.getElementById("country").value
  postToDB({ Email: name, Password: country });
}

async function postToDB(doc) {
  try {
    const response = await fetch(postURL, { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(doc) });

    if (response.ok) {
      const data = await response.json();
      addToTable(doc);
      document.getElementById("status").innerHTML = JSON.stringify(data);
      table.rows[selectedRowIx].style.backgroundColor = rowSelectColor;
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("# Error:", error);
    const msg =
      "Error: " + error.message + ". " +
      "There was an error posting data to the database. " +
      "See browser's console for more details.";
    document.getElementById("status").innerHTML = msg;
  }
}

function deleteData() {
  const name = document.getElementById("name").value;
  if (name != null) {
    deleteuser(name)
  }
  else {
    alert("Select a row to delete!")
  }
}

async function deleteuser(name) {
  try {
    const response = await fetch(deleteURL + name, { method: 'DELETE' });
    if (response.ok) {
      const data = await response.json();
      document.getElementById("status").innerHTML = name + ' is Deleted full ' + data.deletedCount;
      deleteFromTable(name);
    }
    else {
      document.getElementById("status").innerHTML = 'reponse is not ok ';
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("# Error:", error)
    const msg = "Error: " + error.message + ". " +
      "There was an error while deleting the data. " +
      "See browser's console for more details."
    document.getElementById("status").innerHTML = msg
  }
}
function deleteFromTable(nameToDelete) {
  const rows = table.getElementsByTagName("tr");
  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    const firstColumn = row.getElementsByTagName("td")[0];
    const name = firstColumn.textContent.trim();
    if (name === nameToDelete) {
      row.remove();
    }
  }
}

function initValues() {

  selectedRowIx = null
  prevSelection = null
  document.getElementById("name").value = ""
  document.getElementById("country").value = ""
}

/*
 * Routine to clear the selected row in the HTML table as well
 * as the input fields.
 */
function clearData() {

  if (selectedRowIx) {
    table.rows[selectedRowIx].cells.item(2).firstChild.checked = false
    table.rows[selectedRowIx].style.backgroundColor = rowClearColor
  }
  initValues()
  document.getElementById("status").innerHTML = ""
}
function selectTopOrBottomRow(n) {
  if (table.rows.length < 2) {
    document.getElementById("status").innerHTML = "No data in table!"
    return
  }
  selectedRowIx = (n === 1) ? 1 : (table.rows.length - 1)
  const row = table.rows[selectedRowIx]
  setSelection(row)
  document.getElementById("status").innerHTML = "Selected row " + selectedRowIx
  row.cells[2].children[0].checked = true
  scrollToSelection();
}
