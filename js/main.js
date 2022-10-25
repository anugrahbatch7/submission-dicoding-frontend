const arr = [];
class Book {
    constructor(id, title, author, year, isComplete) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.isComplete = isComplete
    }

    addInstance(item) {
        arr.push(item);
    }

    getInstance() {
        return arr;
    }

    clearInstance(item) {
        arr.pop(item);
    }

    displayBook(val, filter, save) {
        if (save) localStorage.setItem("book", JSON.stringify(val));
        document.getElementById("incompleteBookshelfList").innerHTML = "";
        document.getElementById("completeBookshelfList").innerHTML = "";
        let to = document.getElementById("incompleteBookshelfList");
        const bb = new BelumBaca();
        const sb = new SudahBaca();
        let status = "";
        let html = "";
        if (filter != "") {
            var newVal = val.filter(function (item) {
                return item.title == filter;
            }).
                map(function (item) {
                    return item;
                });
            b.displayBook(newVal, "", true);
        }
        else {
            for (var i = 0; i < val.length; i++) {
                console.log(val);
                var tabel = document.createElement('div');
                tabel.className = "book_item";
                tabel.setAttribute('id', val[i].id);
                if (val[i].isComplete == false) {
                    to = document.getElementById("incompleteBookshelfList");
                    status = bb.status();
                }
                else {
                    to = document.getElementById("completeBookshelfList");
                    status = sb.status();
                }
                html = "<div class='action'><p id='title'>"
                    + val[i].title + "</p><p>Penulis : " + val[i].author + "</p><p>Tahun : "
                    + val[i].year + "</p>" + "<button class='green' onclick='moveTo(this)'>" + status + "</button>" +
                    "<button  onclick='pop(this)' class='red'>Hapus Buku</button>" +
                    "<button  onclick='edit(this)' class='orgred'>Edit Buku</button></div>";

                tabel.innerHTML = html;
                to.appendChild(tabel);
            }
        }
    };
    checkChecked(ch) {
        const el = document.getElementById("bookSubmit");
        let txtSpan = ch == true ? "Selesai dibaca" : "Belum selesai dibaca";
        el.innerHTML = "Masukkan buku ke rak <span>" + txtSpan + "</span>";
    }

    submitForm(e) {
        e.preventDefault();
        const title = document.getElementById("inputBookTitle").value;
        const author = document.getElementById("inputBookAuthor").value;
        const year = document.getElementById("inputBookYear").value;
        const isComplete = document.getElementById("inputBookIsComplete").checked;
        const ch = document.getElementById("inputBookIsComplete").checked;
        var instance1 = new BelumBaca();
        var instance2 = new SudahBaca();
        if (ch == true) {
            instance2.addInstance({ id: new Date().getTime(), title: title, author: author, year: year, isComplete: isComplete })
            instance2.displayBook(instance2.getInstance(), "", true);
        } else {
            instance1.addInstance({ id: new Date().getTime(), title: title, author: author, year: year, isComplete: isComplete });
            instance2.displayBook(instance1.getInstance(), "", true);
        }
    }

    cariBuku(e) {
        e.preventDefault();
        const b = new Book();
        let title = document.getElementById("searchBookTitle").value;
        if (title == "") {
            if (b.getInstance() != null) { b.displayBook(b.getInstance(), "") };
        }
        else {
            b.displayBook(arr, title, false);
        }
    }
    editBuku() {
        const id = document.getElementsByName("editBook")[0].id;
        console.log(id);

        const b = new Book();
        var arr = b.getInstance();
        var newVal = arr.filter(function (item) {
            return item.id == id;
        }).
            map(function (item) {
                item.title = document.getElementById("dBookTitle").value;
                item.author = document.getElementById("dBookAuthor").value;
                item.year = document.getElementById("dBookYear").value;
                return item;
            });

        console.log(newVal);
        b.displayBook(newVal, "", true);
    }
    loadBuku() {
        const b = new Book();
        //check if localstorage is exists or not
        if (localStorage.length != 0) {

            JSON.parse(localStorage.getItem("book")).forEach(element => {
                b.addInstance(element);
            });
            console.log(b.getInstance());
            b.displayBook(JSON.parse(localStorage.getItem("book")), "", false);
        }
    }
}

class BelumBaca extends Book {
    status() {
        return "Selesai dibaca";
    }

    bucket() {
        return "completeBookshelfList";
    }
}

class SudahBaca extends Book {
    status() {
        return "Belum selesai dibaca";
    }

    bucket() {
        return "incompleteBookshelfList";
    }
}
//check if selesai dibaca is checked
document.onchange = function () {
    const b = new Book();
    const chck = document.getElementById("inputBookIsComplete");
    chck.addEventListener("click", b.checkChecked(chck.checked));
}

window.onload = function () {
    const b = new Book();
    b.loadBuku();
    document.getElementById('inputBook').addEventListener('submit', b.submitForm);
    document.getElementById('searchBook').addEventListener('submit', b.cariBuku);
    document.getElementById('confirm').addEventListener('click', b.editBuku);
}


const pop = function (btn) {
    const b = new Book();
    var id = btn.parentNode.parentElement.id;
    var arr = b.getInstance();
    var idx = arr.findIndex((el => el.id == id));
    b.clearInstance(arr[idx]);
    b.displayBook(arr, "", true);
}

function moveTo(btn) {
    const b = new Book();
    var id = btn.parentNode.parentElement.id;
    var arr = b.getInstance();
    var idx = arr.findIndex((el => el.id == id));
    arr[idx].isComplete = !arr[idx].isComplete;
    b.displayBook(arr, "", true);
}

function edit(btn) {
    const cancelButton = document.getElementById("cancel");
    const dialog = document.getElementById("editForm");
    var id = btn.parentNode.parentElement.id;
    dialog.showModal();

    const b = new Book();
    var arr = b.getInstance();
    var idx = arr.findIndex((el => el.id == id));
    document.getElementsByName("editBook")[0].setAttribute('id', id);
    document.getElementById("dBookTitle").value = arr[idx].title;
    document.getElementById("dBookAuthor").value = arr[idx].author;
    document.getElementById("dBookYear").value = arr[idx].year;

    cancelButton.addEventListener("click", () => {
        dialog.close();
    });
}
