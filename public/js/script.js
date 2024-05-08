
//FETCH DATA//

async function getuservalues() {
  try {
    const data = await fetch(`https://employee-management-system-4va6.onrender.com/api/employees`)
    const objectData = await data.json()
    
    getData(objectData)
    alluserdata = objectData
    pagination(alluserdata)
  }
  catch (error) {
    console.log(error)
  }
}
getuservalues();

function getData(user) {
  let tableData = "";
  let slno = 1
  user.forEach((user, index) => {
    tableData += `
        
      <tr>
        <td>#${slnumber(index)}${(index + 1)}</td>
        <td><img src="${user.avatar}" alt=profilpic class="rounded-circle mr-2" height=30 width=30> ${user.salutation} ${user.firstName} ${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.gender}</td>
        <td>${user.dob}</td>
        <td>${user.country}</td>
      
        <td class="actions" >
        <button class="delete-edit" onclick="btnsPop(this.nextElementSibling)" id="boxremove" ><i class="fa-solid fa-ellipsis"></i></button>
        <div class="employee-data" id="employees-btn">
        <a href="/employeedetails?id=${user._id}"><button type="button" class="btn-controls gap"><i class="fa-regular fa-eye"></i> View Details</button></a>
        <button type="button" class="btn-controls gap" onclick="getuserid('${user._id}'); getuserdata()"><i class="fa-solid fa-pen"></i>Edit</button>
        <button type="button" class="btn-controls" id="del" onclick="deleteData('${user._id}')"><i class="fa-regular fa-trash-can"></i>Delete</button>
        </div>
        </td> 
      </tr> `
    slno++
  })
  document.getElementById("table-content").innerHTML = tableData;
}
//FETCH DATA END//

// SL NUMBER//

function slnumber(num) {
  if (num < 10) {
    return 0;
  } else {
    return "";
  }
}
//SL NUMBER END//

// DISPLAY EDIT-DELETE-VIEW BUTTONS//

  const btnsPop = (btn) => {
    btn.style.display = btn.style.display === "block" ? "none" : "block";
  

  let buttonboxs = document.getElementById('boxremove')

  buttonboxs.classList.add('active');
  document.getElementById('btnbox').classList.add('active');
  
  document.getElementById('btnbox').addEventListener("click", function () {
    btnclose();
  })

  function btnclose(){
    buttonboxs.classList.remove('active');
    document.getElementById('btnbox').classList.remove('active');
    btn.style.display = "none";
    location.replace("/home");

  
  }
  }

// DISPLAY EDIT-DELETE-VIEW BUTTONS END//

// DISPLAY FORM //


const employeeformopen = document.getElementById('Employee-form')
const dele = document.getElementById('del')

function Formopen() {

  document.getElementById('displayimgbox').style.display = "none";
  document.getElementById('displayaddimg').style.display = "block";

  datahide();

  employeeformopen.classList.add('active');
  document.getElementById('overlay').classList.add('active');
}

  document.getElementById('overlay').addEventListener("click", function () {
  Formclose();
})

function Formclose() {
  employeeformopen.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  location.replace("/home");
  // datahide();
}

// DISPLAY FORM END //

// POST EMPLOYEE TO API //
   let toastpost = document.getElementById('toast-create');


       
  // ADD USER//

  function adduser() {
    let userdata = {};

    userdata['salutation'] = document.getElementById('salutation').value
    userdata['firstName'] = document.getElementById('firstName').value
    userdata['lastName'] = document.getElementById('lastName').value
    userdata['email'] = document.getElementById('email').value
    userdata['phone'] = document.getElementById('phone').value
    userdata['username'] = document.getElementById('username').value
    userdata['password'] = document.getElementById('password').value
    userdata['dob'] = dateofbirth(document.getElementById('dob').value)
    userdata['gender'] = genderSelect();
    userdata['qualifications'] = document.getElementById('qualifications').value
    userdata['address'] = document.getElementById('address').value
    userdata['country'] = document.getElementById('country').value
    userdata['state'] = document.getElementById('state').value
    userdata['city'] = document.getElementById('city').value
    userdata['pin'] = document.getElementById('pin').value

    return userdata;
  }

  //SELECT GENDER//

    const genderSelect = () => {
      const male = document.getElementById('Male');
      const female = document.getElementById('Female');

      if (male.checked == true) {
       return male.value;

      } else {
        return female.value;
      }
    }

  //SELECT GENDER END//

  //DATE OF BIRTH//

    function dateofbirth(dob) {
      let Date = dob.split('-').reverse().join('-');
         return Date
    }

  //DATE OF BIRTH END //

//post employee//


async function userdetails() {
  try {
    const userData = adduser(); 
    const imageFileInput = document.getElementById("formFile");

    const formData = new FormData();

    if (imageFileInput && imageFileInput.files && imageFileInput.files.length > 0) {
      const imageFile = imageFileInput.files[0];
      formData.append("image", imageFile);
    }

    for (const [key, value] of Object.entries(userData)) {
      formData.append(key, value);
    }

    const response = await fetch("https://employee-management-system-4va6.onrender.com/api/employees", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    console.log(responseData);

    employeeformopen.style.display = "none";
    employeesuccessmessage();
  } catch (error) {
    console.log(error);
  }
}



    //ADD-EMPLOYEE SUCCESS MESSAGE//
    let addEmployeesuccess = document.getElementById("addformsuccess")
      function employeesuccessmessage(){
        addEmployeesuccess.style.display = "block";
    }


    //POST EMPLOYEE AVATAR -ADD EMPLOYEE FORM // 

      let uploadimg = document.getElementById("formFile")
      let imageFile = document.getElementById("change-photo");
      let profileimg;

      imageFile.addEventListener('change', () => {
        profileimg = imageFile.files[0]
        console.log(profileimg);
      })
      uploadimg.addEventListener('change', () => {
        profileimg = uploadimg.files[0]
        console.log(profileimg);
      })

      let formimage = document.getElementById('formFile') //get upload image from file in add-employee form //
      let getimage = document.getElementById("getimg");
      formimage.addEventListener('change', function () {

      document.getElementById('displayimgbox').style.display = "block";
      document.getElementById('displayaddimg').style.display = "none";

      const [file] = formimage.files
        if (file) {
          getimage.src = URL.createObjectURL(file);
          console.log(file);
        }
      })



 //PAGINATION// 
  

 var indexvalue = 0;
 var alluserdata;
 var totalPages;
 var dataList = document.getElementById("itemperpage");
 var pageul = document.querySelector(".pagination");
 
 dataList.addEventListener('change', selectpage);
 
 function selectpage() {
     indexvalue = 0;
     pagination(alluserdata);
 }
 
 function pagination(employeelist) {
     var itemperpage = parseInt(dataList.value);
     var totalItems = employeelist.length;
     totalPages = Math.ceil(totalItems / itemperpage);
 
     var currentPageData = employeelist.slice(indexvalue, indexvalue + itemperpage);
     getData(currentPageData);
 
     renderPagination();
 }
 
 function renderPagination() {
     pageul.innerHTML = "";
 
     var prevButton = createPaginationButton('<i class="fa fa-angle-left"></i>', () => {
         if (indexvalue > 0) {
             indexvalue -= parseInt(dataList.value);
             pagination(alluserdata);
         }
     });
 
     pageul.appendChild(prevButton);
 
     for (let i = 1; i <= totalPages; i++) {
         var li = document.createElement("li");
         li.textContent = i;
         li.addEventListener("click", function () {
             indexvalue = (i - 1) * parseInt(dataList.value);
             pagination(alluserdata);
         });
 
         if (indexvalue === (i - 1) * parseInt(dataList.value)) {
             li.classList.add("active");
         }
 
         pageul.appendChild(li);
     }
 
     var nextButton = createPaginationButton('<i class="fa fa-angle-right"></i>', () => {
         if (indexvalue + parseInt(dataList.value) < alluserdata.length) {
             indexvalue += parseInt(dataList.value);
             pagination(alluserdata);
         }
     });
 
     pageul.appendChild(nextButton);
 }
 
 function createPaginationButton(iconHtml, onClickHandler) {
     var button = document.createElement("li");
     button.innerHTML = iconHtml;
     button.addEventListener("click", onClickHandler);
     return button;
 }
 
 const searchemployee = async () => {
     indexvalue = 0; // Reset index value on search
     let searchData = document.getElementById("searchbar").value;
     var itemperpage = parseInt(dataList.value);
 
     if (searchData) {
         fetch(`https://employee-management-system-4va6.onrender.com/search/${searchData}?page=1&limit=${itemperpage}`)
             .then((response) => {
                 if (!response.ok) {
                     throw new Error("Server error: " + response.statusText);
                 }
                 return response.json();
             })
             .then((data) => {
                 const searchResults = data.search;
                 alluserdata = searchResults; // Save search results globally
                 pagination(searchResults);
             })
             .catch((error) => {
                 console.error("Error:", error.message);
             });
     } else {
         getData(); // If search input is empty, load default data
     }
 };

//PAGINATION END//

  
//SEARCHING EMPLOYEE END//

// DELETE FORM//

 const deleteform = document.getElementById('deleteformbox')
 const deleteformdata = document.getElementById('formdelete')

  function deleteData(id) {

    deleteform.style.display = "block";
    deleteform.classList.add('active');
    document.getElementById('overlay').classList.add('active');

    deleteformdata.addEventListener("click", function () {
      fetch("https://employee-management-system-4va6.onrender.com/api/employees/" + id, {
         method: "DELETE",
         headers: {
           "content-Type": "application/json"
         },
      })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })

      deleteform.style.display = "none";
      successmessage();
      
    })
  }
    //DELETE SUCCESS MESSAGE//
      const deletesuccess = document.getElementById('deleteformsuccess')

      function successmessage() {
        deletesuccess.style.display = "block"
      }

  //CLOSE ALERT BOX//

      function closealert() {
        deleteform.style.display = "none";
        deletesuccess.style.display = "none"
        addEmployeesuccess.style.display = "none";
        editsuccess.style.display = "none";
        // getuservalues();

       //display background colour//

        deleteform.classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
      }
        //display none deletebox//
        document.getElementById('overlay').addEventListener("click", function () {
          closealert(); 
        })
  //CLOSE ALERT BOX  END//
  
//DELETE FORM END//


//EDIT FORM//
  let users;

  function getuserid(id) {
  users = id;
  console.log(users)
  }
  async function getuserdata() {
    try {

      Formopen();

      //display file upload and change image//

      document.getElementById('displayimgbox').style.display = "block";
      document.getElementById('displayaddimg').style.display = "none";

      //edit form btns//

      document.getElementById('addbtn').style.display = "none";
      document.getElementById('change-btn').style.display = "block";
      document.getElementById('edit-head').textContent = "Edit Employee";

      //fetch data for edit//

      const res = await fetch("https://employee-management-system-4va6.onrender.com/api/employees/" + users)
      const data = await res.json()

      console.log(data);
      // form feild with fetched data//
      document.getElementById("salutation").value = data.salutation;
      document.getElementById("firstName").value = data.firstName;
      document.getElementById("lastName").value = data.lastName;
      document.getElementById("email").value = data.email;
      document.getElementById("phone").value = data.phone;
      document.getElementById("username").value = data.username;
      document.getElementById("password").value = data.password;
      document.getElementById("dob").value = dateofbirth(data.dob);
      data.gender === 'male' ? Male.checked = true : Female.checked = true;
      document.getElementById("qualifications").value = data.qualifications;
      document.getElementById("address").value = data.address;
      document.getElementById("country").value = data.country;
      document.getElementById("state").value = data.state;
      document.getElementById("city").value = data.city;
      document.getElementById("pin").value = data.pin;
      document.getElementById("getimg").src = data.avatar;
    }catch (error) {
      console.log(error)
    }

  }

  //AVATAR IMAGES POST//

  async function addImage(image) {
    try {
      let formData = new FormData();
      formData.append("image", image);
      const res = await fetch("https://employee-management-system-4va6.onrender.com/api/employees/"+ users, {
        method: "PUT",
        body: formData,
      });

      const responseData = await res.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
      }
    }

 

  //AVATAR IMAGES END//

  //PUT METHOD TO EDIT EMPLOYEE// 
     let editchangebtn = document.getElementById("change-btn");
    function editEmployeeForm() {
      if (profileimg) {
        addImage(profileimg)
      }

      fetch("https://employee-management-system-4va6.onrender.com/api/employees/" + users, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(adduser())
      })


      employeeformopen.style.display = "none";
       editsuccessmessage();
    }
    
    //SUCCESS MESSAGE FOR EDIT//
       let editsuccess = document.getElementById("editformsuccess")

        function editsuccessmessage() {
          editsuccess.style.display = "block";

       }
        
  //PUT METHOD TO EDIT EMPLOYEE END// 

  //IMAGE PREVIEW//

    let changedp = document.getElementById("change-photo");
    let getimg = document.getElementById("getimg");
    
    changedp.addEventListener("change", function () {
      const [file] = changedp.files
      if (file) {
        getimg.src = URL.createObjectURL(file);
      }
    })

  //IMAGE PREVIEW END//

//EDIT FORM END//

//HIDE DATAS IN ADD-EMPLOYEE FORM//

  const datahide = () => {
   
    //add button//
    document.getElementById('addbtn').style.display = "block";
    //add imgbox//
    document.getElementById('displayimgbox').style.display = "none";
    document.getElementById('change-btn').style.display = "none";
    document.getElementById('edit-head').textContent = "Add Employee";

    document.getElementById("salutation").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("dob").value = "";
    gender === 'male' ? Male.checked = false : Female.checked = false;
    genderSelect(document.getElementById(gender)).value = "";
    document.getElementById("qualifications").value = "";
    document.getElementById("address").value = "";
    document.getElementById("country").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("pin").value = "";
  }

//HIDE DATAS IN ADD-EMPLOYEE FORM END//


//FORM VALIDATION FOR ADD-EMPLOYEE FORM//

  let addEmployee = document.getElementById("addbtn")
  addEmployee.addEventListener('click', function (e) {

    e.preventDefault();
    formvalidation();

  })

  let editEmployee = document.getElementById("change-btn")
  editEmployee.addEventListener('click', function (e) {

    e.preventDefault();
    formvalidationedit();

  })

  function formvalidation() {

    let Addforminput = true;

    if(document.getElementById("salutation").value == ""){
      Addforminput = false;
      document.getElementById("errormessageSalutation").style.display = "flex";
      
    }

    if(document.getElementById("firstName").value == ""){
      Addforminput = false;
      document.getElementById("errormessageFirstname").style.display = "flex";

    }

    if(document.getElementById("lastName").value == ""){
      Addforminput = false;
      document.getElementById("errormessageLastname").style.display = "flex";
    }

    if(document.getElementById("email").value == ""){
      Addforminput = false;
      document.getElementById("errormessageEmail").style.display = "flex";
    }

    if(document.getElementById("phone").value == ""){
      Addforminput = false;
      document.getElementById("errormessagePhone").style.display = "flex";
    }

    if(document.getElementById("username").value == ""){
      Addforminput = false;
      document.getElementById("errormessageUsername").style.display = "flex";
    }

    if(document.getElementById("password").value == ""){
      Addforminput = false;
      document.getElementById("errormessagePassword").style.display = "flex";
    }

    if(document.getElementById("dob").value == ""){
      Addforminput = false;
      document.getElementById("errormessageDob").style.display = "flex";
    }

  
    if(document.getElementById("Male").checked==false && document.getElementById("Female").checked==false){
      Addforminput = false;
      document.getElementById("errormessageGender").style.display = "flex";
    }

    if(document.getElementById("qualifications").value == ""){
      Addforminput = false;
      document.getElementById("errormessageQualifications").style.display = "flex";
    }

    if(document.getElementById("address").value == ""){
      Addforminput = false;
      document.getElementById("errormessageAddress").style.display = "flex";
    }

    if(document.getElementById("country").value == ""){
      Addforminput = false;
      document.getElementById("errormessageCountry").style.display = "flex";
    }

    if(document.getElementById("state").value == ""){
      Addforminput = false;
      document.getElementById("errormessageState").style.display = "flex";
    }

    if(document.getElementById("city").value == ""){
      Addforminput = false;
      document.getElementById("errormessageCity").style.display = "flex";
    }

    if(document.getElementById("pin").value == ""){
      Addforminput = false;
      document.getElementById("errormessagePin").style.display = "flex";
    }

    if(Addforminput == true) {
      userdetails ();
    
    }
  }

   
  function formvalidationedit() {

    let Addforminput = true;

    if(document.getElementById("salutation").value == ""){
      Addforminput = false;
      document.getElementById("errormessageSalutation").style.display = "flex";
      
    }

    if(document.getElementById("firstName").value == ""){
      Addforminput = false;
      document.getElementById("errormessageFirstname").style.display = "flex";

    }

    if(document.getElementById("lastName").value == ""){
      Addforminput = false;
      document.getElementById("errormessageLastname").style.display = "flex";
    }

    if(document.getElementById("email").value == ""){
      Addforminput = false;
      document.getElementById("errormessageEmail").style.display = "flex";
    }

    if(document.getElementById("phone").value == ""){
      Addforminput = false;
      document.getElementById("errormessagePhone").style.display = "flex";
    }

    if(document.getElementById("username").value == ""){
      Addforminput = false;
      document.getElementById("errormessageUsername").style.display = "flex";
    }

    if(document.getElementById("password").value == ""){
      Addforminput = false;
      document.getElementById("errormessagePassword").style.display = "flex";
    }

    if(document.getElementById("dob").value == ""){
      Addforminput = false;
      document.getElementById("errormessageDob").style.display = "flex";
    }

    if(document.getElementById("qualifications").value == ""){
      Addforminput = false;
      document.getElementById("errormessageQualifications").style.display = "flex";
    }

    if(document.getElementById("address").value == ""){
      Addforminput = false;
      document.getElementById("errormessageAddress").style.display = "flex";
    }

    if(document.getElementById("country").value == ""){
      Addforminput = false;
      document.getElementById("errormessageCountry").style.display = "flex";
    }

    if(document.getElementById("state").value == ""){
      Addforminput = false;
      document.getElementById("errormessageState").style.display = "flex";
    }

    if(document.getElementById("city").value == ""){
      Addforminput = false;
      document.getElementById("errormessageCity").style.display = "flex";
    }

    if(document.getElementById("pin").value == ""){
      Addforminput = false;
      document.getElementById("errormessagePin").style.display = "flex";
    }

    if(document.getElementById("Male").checked==false && document.getElementById("Female").checked==false){
      Addforminput = false;
      document.getElementById("errormessageGender").style.display = "flex";

    }

    if(Addforminput == true) {
      editEmployeeForm();
    
    }
  }
  //VALIDATION FOR EACH INPUT FIELD//

    const validNamePattern = /^[A-Za-z]+$/; //for name validation


    document.getElementById("salutation").addEventListener('change' , function () {
      if(!document.getElementById("salutation").value==""){
        document.getElementById("errormessageSalutation").style.display = "none";
      }else{
        document.getElementById("errormessageSalutation").style.display = "flex";
      }
    })


    document.getElementById("firstName").addEventListener('input', function () {
      const firstNameInput = document.getElementById('firstName');
  
      if (firstNameInput.value.trim() !== "") {
        document.getElementById("errormessageFirstname").style.display = "none";
      } else {
        document.getElementById("errormessageFirstname").style.display = "flex";
        document.getElementById("errormessageFirstname").textContent = "Please enter the First Name";
      }
  
      if (!validNamePattern.test(firstNameInput.value.trim())) {
        document.getElementById("errormessageFirstname").style.display = "flex";
        document.getElementById("errormessageFirstname").textContent = "Invalid characters in First Name";
      }
    });


    document.getElementById("lastName").addEventListener('input', function () {
      const lastNameInput = document.getElementById('lastName');
  
      if (lastNameInput.value.trim() !== "") {
        document.getElementById("errormessageLastname").style.display = "none";
      } else {
        document.getElementById("errormessageLastname").style.display = "flex";
        document.getElementById("lastNameInput").textContent = "Please enter the Last Name";
      }
  
      if (!validNamePattern.test(lastNameInput.value.trim())) {
        document.getElementById("errormessageLastname").style.display = "flex";
        document.getElementById("errormessageLastname").textContent = "Invalid characters in Last Name";
      }
    });


    document.getElementById("email").addEventListener('input', function () {
      const emailInput = document.getElementById('email');
      const email = emailInput.value.trim();
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailRegex = /^[a-z0-9]+@gmail\.com$/;
  
      if (email === "") {
        document.getElementById("errormessageEmail").style.display = "none";
        emailInput.setCustomValidity(''); // 
      } else if (!emailRegex.test(email)) {
        const emailError = document.getElementById("errormessageEmail");
        emailError.style.display = "flex";
        emailError.textContent = "Invalid email";
        emailInput.setCustomValidity('Invalid Email');
      } else {
        document.getElementById("errormessageEmail").style.display = "none";
        emailInput.setCustomValidity('');
      }
    });


    document.getElementById("phone").addEventListener('input', function () {
      var phoneNumber = document.getElementById("phone").value;
      var number = phoneNumber.trim();
      var phoneRegex = /^[0-9]{10}$/; // Change this regex based on your phone number format

      if (!number === "") {
          document.getElementById("errormessagePhone").style.display = "none";
          document.getElementById("phone").setCustomValidity('');
      } else if (!phoneRegex.test(number)) {
          document.getElementById("errormessagePhone").style.display = "flex";
          document.getElementById("errormessagePhone").textContent = "Invalid Phone Number";
          document.getElementById("phone").setCustomValidity('Invalid Phone Number');
      } else {
          document.getElementById("errormessagePhone").style.display = "none";
          document.getElementById("phone").setCustomValidity('');
      }
    });


    document.getElementById("username").addEventListener('change' , function () {
      if(!document.getElementById("username").value == ""){
        document.getElementById("errormessageUsername").style.display = "none";
      }else{
        document.getElementById("errormessageUsername").style.display = "flex";
      }
    })

    document.getElementById("password").addEventListener('change' , function () {
      if(!document.getElementById("password").value == ""){
        document.getElementById("errormessagePassword").style.display = "none";
      }else{
        document.getElementById("errormessagePassword").style.display = "flex";
      }
    })

    document.getElementById("dob").addEventListener('change' , function () {
      if(!document.getElementById("dob").value == ""){
        document.getElementById("errormessageDob").style.display = "none";
      }else{
        document.getElementById("errormessageDob").style.display = "flex";
      }
    })

    document.getElementById("Male").addEventListener("click",function () {
      if(!document.getElementById("Male")==""){
        document.getElementById("errormessageGender").style.display = "none";
      }else{
        document.getElementById("errormessageGender").style.display = "flex";
      }
    })

    document.getElementById("Female").addEventListener("click",function () {
      if(!document.getElementById("Female")==""){
        document.getElementById("errormessageGender").style.display = "none";
      }else{
        document.getElementById("errormessageGender").style.display = "flex";
      }
    })

    document.getElementById("qualifications").addEventListener('change' , function () {
      if(!document.getElementById("qualifications").value == ""){
        document.getElementById("errormessageQualifications").style.display = "none";
      }else{
        document.getElementById("errormessageQualifications").style.display = "flex";
      }
    })

    document.getElementById("address").addEventListener('change' , function () {
      if(!document.getElementById("address").value == ""){
        document.getElementById("errormessageAddress").style.display = "none";
      }else{
        document.getElementById("errormessageAddress").style.display = "flex";
      }
    })

    document.getElementById("country").addEventListener('change' , function () {
      if(!document.getElementById("country").value == ""){
        document.getElementById("errormessageCountry").style.display = "none";
      }else{
        document.getElementById("errormessageCountry").style.display = "flex";
      }
    })

    document.getElementById("state").addEventListener('change' , function () {
      if(!document.getElementById("state").value == ""){
        document.getElementById("errormessageState").style.display = "none";
      }else{
        document.getElementById("errormessageState").style.display = "flex";
      }
    })

    document.getElementById("city").addEventListener('change' , function () {
      if(!document.getElementById("city").value == ""){
        document.getElementById("errormessageCity").style.display = "none";
      }else{
        document.getElementById("errormessageCity").style.display = "flex";
      }
    })

    document.getElementById("pin").addEventListener('change' , function () {
      if(!document.getElementById("pin").value == ""){
        document.getElementById("errormessagePin").style.display = "none";

      }else{
        document.getElementById("errormessagePin").style.display = "flex";

      }
    })

  //   VALIDATION FOR EACH INPUT FIELD END//

// FORM VALIDATION FOR EDIT-EMPLOYEE FORM END//


