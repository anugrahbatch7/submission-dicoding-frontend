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

    clearInstance(id, title) {
        document.getElementById(id).innerHTML = "";
        localStorage.removeItem(title);
    }

    displayBook(val, filter) {
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
            b.displayBook(newVal, "");
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
                localStorage.setItem(val[i].title, html);
                tabel.innerHTML = html;
                to.appendChild(tabel);
            }
            console.log(to);
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
            instance2.displayBook(instance2.getInstance(), "");
        } else {
            instance1.addInstance({ id: new Date().getTime(), title: title, author: author, year: year, isComplete: isComplete });
            instance2.displayBook(instance1.getInstance(), "");
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
            b.displayBook(arr, title);
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
        b.displayBook(newVal, "");
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

const b = new Book();
document.getElementById('inputBook').addEventListener('submit', b.submitForm);
document.getElementById('searchBook').addEventListener('submit', b.cariBuku);

const pop = function (btn) {
    const b = new Book();
    var id = btn.parentNode.parentElement.id;
    var arr = b.getInstance();
    var idx = arr.findIndex((el => el.id == id));
    arr.splice(idx, 1);
    b.displayBook(arr, "");
}

function moveTo(btn) {
    const b = new Book();
    var id = btn.parentNode.parentElement.id;
    var arr = b.getInstance();
    var idx = arr.findIndex((el => el.id == id));
    arr[idx].isComplete = !arr[idx].isComplete;
    b.displayBook(arr, "");
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
