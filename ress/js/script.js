

addInventory = () =>{
    let pageUrl = window.location.href;
    let totalInventory = JSON.parse(localStorage.getItem(pageUrl + "_script"));
    if(totalInventory == null){
        totalInventory = []
    }
    
    let product = document.querySelector('#product').value;
    let venc = document.querySelector('#venc').value;
    let cost = parseFloat(document.querySelector('#cost').value);
    let sellPrice = parseFloat(document.querySelector('#sellPrice').value);    
    let stock = document.querySelector('#stock').value;
    let sold = document.querySelector('#sold').value;
    let finalStock = parseFloat(stock) - parseFloat(sold);
    let profit =  parseFloat((sellPrice - cost) * sold).toFixed(2);

    if (product == "" || product == null) {
        alert("Porfavor ingresar un nombre.")
    } else if (stock == "" || isNaN(stock)) {
        alert("Porfavor ingrese un valor numerico.")
    } else {
        
        let newInventory = {
            product: product,
            venc: venc,
            stock: stock,
            cost: cost,
            sellPrice: sellPrice,  // Aquí corregido
            sold: sold,
            profit: profit,
            finalStock: finalStock,
          
        };
        
        totalInventory.push(newInventory)
        localStorage.setItem(pageUrl + "_script", JSON.stringify(totalInventory))
        window.location.reload()
    }
}


getGrandTotal = () => {
    let pageUrl = window.location.href;
    let totalInventory = JSON.parse(localStorage.getItem(pageUrl + "_script"));
    let grandTotal = totalInventory ? totalInventory.reduce((acc, item) => acc + parseFloat(item.profit.replace('$', '')), 0) : 0;
    document.querySelector('#grandTotal').innerHTML = "$" + grandTotal.toFixed(2);
  }
  


showInvent = () =>{
    getGrandTotal();
    let pageUrl = window.location.href;
    let totalInventory = JSON.parse(localStorage.getItem(pageUrl + "_script"));
    if (totalInventory != null && totalInventory.length > 0) {
        let table = document.querySelector('#inventoryTable');
        for (let index = 0; index < totalInventory.length; index++) {
            let row = table.insertRow(1);
            let inventoryProduct = row.insertCell(0);
            let inventoryVenc = row.insertCell(1)
            let inventoryStock = row.insertCell(2);
            let inventoryCost = row.insertCell(3);
            let inventorySellPrice = row.insertCell(4);
            let inventorySold = row.insertCell(5);
            let inventoryProfit = row.insertCell(6);
            let inventoryfinalStock = row.insertCell(7);
            let inventoryAction = row.insertCell(8);

            inventoryAction.className = "text-center";

            let editBtn = document.createElement('input');
            editBtn.type = "button";
            editBtn.className = "btn";
            editBtn.value = "EDITAR";

            inventoryAction.appendChild(editBtn);

            inventoryProduct.innerHTML = totalInventory[index]["product"];
            inventoryVenc.innerHTML = totalInventory[index]["venc"];
            inventoryStock.innerHTML = totalInventory[index]["stock"];
            inventoryCost.innerHTML = '$' + totalInventory[index]["cost"];
            inventorySellPrice.innerHTML = '$' + totalInventory[index]["sellPrice"]
            inventorySold.innerHTML = totalInventory[index]["sold"];
            inventoryProfit.innerHTML = '$' + totalInventory[index]["profit"]
            inventoryfinalStock.innerHTML = totalInventory[index]["finalStock"];

            getGrandTotal();

            let deleteBtn = document.createElement('input');
            deleteBtn.type = "button";
            deleteBtn.className = "btn";
            deleteBtn.id = "btn-del"
            deleteBtn.value = "ELIMINAR";
            deleteBtn.onclick = (function(index) {
                return function() {
            
                    if (confirm("¿Estas seguro de que quieres borrar esta fila?")) {
                        totalInventory.splice(index, 1) 
                        alert("item eliminado")
                        window.location.reload();
                        localStorage.setItem(pageUrl + "_script", JSON.stringify(totalInventory)); 
                        getGrandTotal();
                    }
                }
            })(index);
            inventoryAction.appendChild(deleteBtn);

            editBtn.onclick = (function(index) {
                return function() {
                    let inventoryRow = this.parentNode.parentNode;
                    let inventoryProduct = inventoryRow.cells[0];
                    let inventoryVenc = inventoryRow.cells[1];
                    let inventoryStock = inventoryRow.cells[2];
                    let inventoryCost = inventoryRow.cells[3];
                    let inventorySellPrice = inventoryRow.cells[4];
                    let inventorySold = inventoryRow.cells[5];
                    let inventoryProfit = inventoryRow.cells[6]
                    let inventoryfinalStock = inventoryRow.cells[7];
            


                    let newProduct = prompt("Ingrese el nombre del artículo:", inventoryProduct.innerText);
                    let newVenc = prompt("Ingrese la fecha de vencimiento:", inventoryVenc.innerText);
                    let newStock = prompt("Ingrese el valor de Stock Inicial:", inventoryStock.innerText);
                    let newCost = prompt("Ingrese el precio de costo:", inventoryCost.innerText.replace("$", ""));
                    let newSellPrice = prompt("Ingrese el precio de venta:", inventorySellPrice.innerText.replace("$", ""));
                    let newSold = prompt("Ingrese el número de Vendidos:", inventorySold.innerText);

            
                    if (newProduct !== null && newVenc !== null && newStock !== null && newCost !== null && newSellPrice !== null && newSold !== null) {
                        inventoryProduct.innerText = newProduct;
                        inventoryVenc.innerText = newVenc;
                        inventoryStock.innerText = newStock;
                        inventoryCost.innerText = '$' + newCost;
                        inventorySellPrice.innerText = '$' + newSellPrice;
                        inventorySold.innerText = newSold;
                        inventoryProfit.innerText = '$' + parseFloat((newSellPrice - newCost) * newSold).toFixed(2);
                        inventoryfinalStock.innerText = parseFloat(newStock - newSold);
                    
                        let totalInventory = JSON.parse(localStorage.getItem(pageUrl + "_script"));
                        totalInventory[index]["product"] = newProduct;
                        totalInventory[index]["venc"] = newVenc;
                        totalInventory[index]["stock"] = newStock;
                        totalInventory[index]["cost"] = newCost;
                        totalInventory[index]["sellPrice"] = newSellPrice;
                        totalInventory[index]["sold"] = newSold;
                        totalInventory[index]["profit"] = parseFloat((newSellPrice - newCost) * newSold).toFixed(2);
                        totalInventory[index]["finalStock"] = parseFloat(newStock - newSold);
                    
                        localStorage.setItem(pageUrl + "_script", JSON.stringify(totalInventory));
                        getGrandTotal();
                    }
                    
                }
            })(index);
        }
    }
}

let editTitleButton = document.querySelector('.invTitle-button');
let invTitle = document.querySelector('#invTitle');
let invTitle2 = document.querySelector('#invTitle2');
let pageUrl = window.location.href;
let invTitleKey = pageUrl + "_scriptTitle_" + invTitle;
let invTitleKey2 = pageUrl + "_scriptTitle_" + invTitle2;

editTitleButton.addEventListener('click', function() {
    let newText = prompt("Ingresar Nombre:");
    if (newText != null) {
        invTitle.textContent = newText;
        invTitle2.textContent = newText;
        localStorage.setItem(invTitleKey, newText);
        localStorage.setItem(invTitleKey2, newText);
    }
});

// Set invTitle text from localStorage
let savedValue = localStorage.getItem(invTitleKey);
let savedValue2 = localStorage.getItem(invTitleKey2);
if (savedValue && savedValue2) {
    invTitle.textContent = savedValue;
    invTitle2.textContent = savedValue2;
}


clearButton = () => {
    if (confirm("¿Estas seguro de que quieres ELIMINAR TODOS los datos? Esta accion es definitiva.")) {
        localStorage.removeItem(window.location.href + "_script");
        window.location.reload();
    }
}

downloadInventory = () => {
    let pageUrl = window.location.href;
    let totalInventory = JSON.parse(localStorage.getItem(pageUrl + "_script"));
    let delimiter = ";"; // cambia esto por el caracter delimitador deseado
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Producto" + delimiter + "Vencimiento" + delimiter + "Stock Inicial" + delimiter + "Precio Costo" + delimiter + "Precio Venta" + delimiter + "Vendidos" + delimiter + "Ganancia" + delimiter + "Stock Final" + "\n";
    totalInventory.forEach(function(row) {
        csvContent += row.product + delimiter + row.venc + delimiter + row.stock + delimiter + row.cost + delimiter + row.sellPrice + delimiter + row.sold + delimiter + row.profit + delimiter + row.finalStock + "\n";
    });
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    let today = new Date();
    let fileName = "Inventario_de_(" + invTitle.textContent + ")" + "FECHA_" + "(" + today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + ")" + "_HORA-DE-CIERRE_" + "(" + today.getHours() + "-" + today.getMinutes() + "hs" + ")" + ".csv";
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
}




uploadInventory = () => {
    let pageUrl = window.location.href;
    let file = document.getElementById("fileInput").files[0];
    let reader = new FileReader();
    reader.onload = function(event) {
        let csvData = event.target.result;
        let inventory = [];
        let rows = csvData.split("\n");

        for (let i = 1; i < rows.length; i++) {
            let row = rows[i].split(";");
            // Omitir filas que tengan valores faltantes
            if (row.length < 8) continue; // Suponiendo que todas las columnas son requeridas

            let item = {
                product: row[0],
                venc: row[1] || "", // Establecer como cadena vacía si el valor está ausente
                stock: row[2] || "", // Establecer como cadena vacía si el valor está ausente
                cost: row[3] || "", // Establecer como cadena vacía si el valor está ausente
                sellPrice: row[4] || "", // Establecer como cadena vacía si el valor está ausente
                sold: row[5] || "", // Establecer como cadena vacía si el valor está ausente
                profit: row[6] || "", // Establecer como cadena vacía si el valor está ausente
                finalStock: row[7] || "", // Establecer como cadena vacía si el valor está ausente
            };

            inventory.push(item);
        }

        localStorage.setItem(pageUrl + "_script", JSON.stringify(inventory));
        window.location.reload();
    };

    reader.readAsText(file);
};


getDate = () => {
    let today = new Date();
    return today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "_HORA_" + "(" + today.getHours() + "-" + today.getMinutes() + "hs)" + "<br>" ;
}

printData = () => { 
    let divContents = document.getElementById("allInventory").cloneNode(true);
    let actions = divContents.querySelectorAll("#actions");
    for (let i = 0; i < actions.length; i++) {
        actions[i].remove();
    }
    let buttons = divContents.querySelectorAll(".btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].remove();
    }
    let invTitle2 = document.querySelector('#invTitle2');
    let a = window.open('', '', 'height=11000, width=1000'); 
    a.document.write('<html>'); 
    a.document.write('<body > <h1>Inventario de ' + invTitle2.textContent + ' del Día : ' + getDate() + '<br>'); 
    a.document.write(divContents.innerHTML); 
    a.document.write('</body></html>'); 
    a.document.close(); 
    a.print(); 
}

showInvent();
