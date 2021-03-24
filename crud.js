//fetch
const formEmp = document.getElementById("formEmp");
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputMobile = document.getElementById("mobile");
const tableBody = document.querySelector("#example tbody");
const submit = document.getElementById("submit");
const contIdEdit = document.getElementById("contIdEdit");
class Employee {
    constructor(id, name, email, mobile) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }

    showData() {
        Employee.showHTTL(this.id, this.name, this.email, this.mobile)
        return this;
    }

    storeEmplyee() {
        const allData = JSON.parse(localStorage.getItem("employees")) ? ? [];
        allData.push({ id: this.id, name: this.name, email: this.email, mobile: this.mobile });
        localStorage.setItem("employees", JSON.stringify(allData))
    }

    //update element
    updateEmployee(id) {
        const newItem = { id: id, name: this.name, email: this.email, mobile: this.mobile };
        const UpdatedData = JSON.parse(localStorage.getItem("employees")).map((item) => {
            if (item.id == id) {
                return newItem;
            }
            return item;
        })
        localStorage.setItem("employees", JSON.stringify(UpdatedData));
    }


    static showHTTL(id, name, email, mobile) {
        const trEl = document.createElement("tr");
        trEl.innerHTML = `  <tr role="row" class="odd">
                                <td>${name}</td>
                                <td>${email}</td>
                                <td>${mobile}</td>
                                <td> 
                                    <button class="btn btn-info edit" data-id="${id}">Edit</button>
                                    <button class="btn btn-danger delete" data-id="${id}">Delete</button>
                                </td>
                            </tr>`;
        tableBody.appendChild(trEl);
    }
    static showAllEmployees() {
        if (localStorage.getItem("employees")) {
            JSON.parse(localStorage.getItem("employees")).forEach((item) => {
                Employee.showHTTL(item.id, item.name, item.email, item.mobile)

            })
        }
    }
}

Employee.showAllEmployees();

formEmp.addEventListener("submit", (e) => {
    e.preventDefault();


    if (!contIdEdit.value) {
        let id = Math.floor(Math.random() * 100000)
        const newEmp = new Employee(id, inputName.value, inputEmail.value, inputMobile.value);
        newEmp.showData().storeEmplyee();

    } else {
        const id = contIdEdit.value;
        const newEmp = new Employee(id, inputName.value, inputEmail.value, inputMobile.value)
        newEmp.updateEmployee(id);
        submit.value = "Store This Data";
        tableBody.innerHTML = '';
        Employee.showAllEmployees();
    }
    inputName.value = ""
    inputEmail.value = ""
    inputMobile.value = ""
})

tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        //remove from local storage
        const id = e.target.getAttribute("data-id");
        const emps = JSON.parse(localStorage.getItem("employees"));
        const newData = emps.filter(item => item.id !== +id);
        localStorage.setItem("employees", JSON.stringify(newData))

        //remove from html
        e.target.parentElement.parentElement.remove();

    }

    if (e.target.classList.contains("edit")) {
        const id = +e.target.getAttribute("data-id");
        const item = JSON.parse(localStorage.getItem("employees")).find(item => item.id === id);
        inputName.value = item.name;
        inputEmail.value = item.email;
        inputMobile.value = item.mobile;
        contIdEdit.value = id;
        submit.value = "Edit This Item";
    }




})
