// Ambil elemen DOM
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("taskBody");
const emptyRow = document.getElementById("emptyRow");
const filterSelect = document.getElementById("filter");

// Event listener form submit
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

// Validasi input
function validateTodo(task, date) {
    if (!task || !date) {
        alert("Task dan Due Date wajib diisi!");
        return false;
    }
    return true;
}

// Tambah todo baru
function addTodo() {
    const taskText = todoInput.value.trim();
    const dueDate = dateInput.value;

    // Validasi
    if (!validateTodo(taskText, dueDate)) return;

    // Sembunyikan row kosong jika ada task
    if (emptyRow) {
        emptyRow.style.display = "none";
    }

    // Buat row baru
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${taskText}</td>
        <td>${dueDate}</td>
        <td>
            <input type="checkbox" class="status-checkbox">
        </td>
        <td>
            <button class="delete-btn bg-red-400 text-white px-2 rounded">Delete</button>
            <button class="edit-btn bg-blue-400 text-white px-2 rounded">Edit</button>
        </td>
    `;

    // Checkbox update status
    const checkbox = row.querySelector(".status-checkbox");
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            row.classList.add("line-through", "text-gray-500");
        } else {
            row.classList.remove("line-through", "text-gray-500");
        }
    });

    // Tombol delete
    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        row.remove();
        checkEmpty();
    });

  // Tombol edit
const editBtn = row.querySelector(".edit-btn");
editBtn.addEventListener("click", () => {
    let newTask = prompt("Edit Task:", taskText);
    let newDate = prompt("Edit Due Date (YYYY-MM-DD):", dueDate);

    if (!newTask) {
        alert("Task tidak boleh kosong!");
        return;
    }

    // Validasi format tanggal YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
        alert("Format tanggal harus YYYY-MM-DD!");
        return;
    }

    // Cek apakah tanggal valid (contoh 2025-02-30 harus ditolak)
    const dateObj = new Date(newDate);
    const [year, month, day] = newDate.split("-").map(Number);

    if (
        dateObj.getFullYear() !== year ||
        dateObj.getMonth() + 1 !== month ||
        dateObj.getDate() !== day
    ) {
        alert("Tanggal tidak valid!");
        return;
    }

    // Update row kalau valid
    row.children[0].textContent = newTask;
    row.children[1].textContent = newDate;
});

    // Tambahkan row ke tabel
    todoList.appendChild(row);

    // Reset form
    todoInput.value = "";
    dateInput.value = "";
}

// Hapus semua todo
function deleteAllTodo() {
    todoList.innerHTML = "";
    // Tambahkan kembali row kosong
    const emptyRowNew = document.createElement("tr");
    emptyRowNew.id = "emptyRow";
    emptyRowNew.innerHTML = `<td colspan="4">No tasks found</td>`;
    todoList.appendChild(emptyRowNew);
}

// Filter todo berdasarkan status
function filterTodo() {
    const filterValue = filterSelect.value;
    const rows = todoList.querySelectorAll("tr");

    rows.forEach((row) => {
        const checkbox = row.querySelector(".status-checkbox");
        if (!checkbox) return; // skip row kosong

        if (filterValue === "all") {
            row.style.display = "";
        } else if (filterValue === "completed" && checkbox.checked) {
            row.style.display = "";
        } else if (filterValue === "uncompleted" && !checkbox.checked) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Cek jika list kosong
function checkEmpty() {
    if (todoList.children.length === 0) {
        const emptyRowNew = document.createElement("tr");
        emptyRowNew.id = "emptyRow";
        emptyRowNew.innerHTML = `<td colspan="4">No tasks found</td>`;
        todoList.appendChild(emptyRowNew);
    }
}
// Event listener filter
filterSelect.addEventListener("change", filterTodo);

// Inisialisasi
checkEmpty();
filterTodo();