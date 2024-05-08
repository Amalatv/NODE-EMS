
//fetch data from server//
let url = new URLSearchParams(document.location.search);
let employeeid  = url.get("id")
console.log(employeeid)

let UserViewImg = document.getElementById('view-img')
let UserViewFullName = document.getElementById('view-fullname')
let UserViewEmail = document.getElementById('view-email')
let UserViewGender = document.getElementById('view-gender')
let UserViewAge = document.getElementById('view-age')
let UserViewDob = document.getElementById('view-dob')
let UserViewPhone = document.getElementById('view-phone')
let UserViewQualification = document.getElementById('view-qualification')
let UserViewAddress = document.getElementById('view-address')
let UserViewUserName = document.getElementById('view-username')

fetch("https://employee-management-system-4va6.onrender.com/api/employees/" +employeeid)
.then((employeedata) => {
  return employeedata.json()
}).then((userdatas) =>{
  
  UserViewFullName.innerHTML = userdatas.salutation+" " +userdatas.firstName+" "+userdatas.lastName+" "
  UserViewEmail.innerHTML = userdatas.email
  UserViewGender.innerHTML = userdatas.gender
  UserViewAge.innerHTML = calculateAge( userdatas.dob)
  UserViewDob.innerHTML  =  userdatas.dob
  UserViewPhone.innerHTML = userdatas.phone
  UserViewQualification.innerHTML = userdatas.qualifications
  UserViewAddress.innerHTML = userdatas.address
  UserViewUserName.innerHTML = userdatas.username
  UserViewImg.src = userdatas.avatar;
})

//CALCULATE AGE//
  function calculateAge(birthDate) {

    let dob = birthDate.split('-')
    let dateofbirth = []
    for(let j=0;j<3;j++){
      dateofbirth.push(parseInt(dob[j]))
    }
    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let age = currentDate.getFullYear() - dateofbirth[2];

    // Check if the birthday has occurred this year
    const hasBirthdayOccurred = (
      currentDate.getMonth() < dateofbirth[1]||
      (currentDate.getMonth() === dateofbirth[1] &&
      currentDate.getDate() < dateofbirth[0])
    );

    // Adjust age based on whether the birthday has occurred this year or not
    if (!hasBirthdayOccurred) {
      age--;
    }
     return age;
  }

//CALCULATE AGE END//

//FETCH DATA END//

//VIEW EMPLOYEE EDIT FORM //

const vieweditformopen = document.getElementById('View-Employee-form') //employee edit form open//

function viewformopen(){
  vieweditformopen.classList.add('active');
  document.getElementById('overlay').classList.add('active');
}

document.getElementById('overlay').addEventListener("click",function(){  //employee edit form close//
  vieweditformclose();
})

function vieweditformclose(){
  vieweditformopen.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  // window.location.href = 'index.html';
  location.replace("/home");

}



//ADD DATA TO VIEW EDIT-FORM//
  function viewedit(){
    fetch("https://employee-management-system-4va6.onrender.com/api/employees/" +employeeid)
    .then((employeedata) => {
      return employeedata.json()

    }).then((usereditdata) =>{
      document.getElementById("salutation").value = usereditdata.salutation;
      document.getElementById("firstName").value =usereditdata.firstName;
      document.getElementById("lastName").value = usereditdata.lastName;
      document.getElementById("email").value = usereditdata.email;
      document.getElementById("phone").value = usereditdata.phone;
      document.getElementById("username").value = usereditdata.username;
      document.getElementById("password").value = usereditdata.password;
      document.getElementById("dob").value = dateofbirth(usereditdata.dob);
      usereditdata.gender === 'male' ? Male.checked = true : Female.checked = true;   
      document.getElementById("qualifications").value = usereditdata.qualifications;
      document.getElementById("address").value = usereditdata.address;
      document.getElementById("country").value = usereditdata.country;
      document.getElementById("state").value = usereditdata.state;
      document.getElementById("city").value = usereditdata.city;
      document.getElementById("pin").value = usereditdata.pin;
      document.getElementById("getimg").src = usereditdata.avatar;
    })
  }
    //DOB//
      function dateofbirth(dob){
      let Date = dob.split('-').reverse().join('-');
      return Date
    }

  //GET IMGAGE FOR VIEW EDIT FORM//
    let changedp = document.getElementById("change-photo");
    let getimg = document.getElementById("getimg");
    changedp.addEventListener("change", function (){
      const [file] = changedp.files
      if (file) {
        getimg.src = URL.createObjectURL(file);
      }
    })

  //GET IMGAGE FOR VIEW EDIT FORM END//

  //POST AVATAR IMAGES//

    let imageFile = document.getElementById("change-photo");
    let profileimg;

    imageFile.addEventListener('change', () => {
      profileimg = imageFile.files[0]
      console.log(imageFile.files[0]);
    })

    async function addImage(image) {
      try {
        let formData = new FormData();
        formData.append("image", image);
    
        const res = await fetch("https://employee-management-system-4va6.onrender.com/api/employees/"+ employeeid, {
          method: "PUT",
          body: formData,
        });
        const responseData = await res.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    }

  //POST AVATAR IMAGES END//
   
  //EDIT AVATAR IMAGE AND EMPLOYEE DATA //
    let toastedit = document.getElementById('toast-update')

    async function ViewEditEmployeeForm(){
      if(profileimg){
        addImage(profileimg)
      }
      await  fetch("https://employee-management-system-4va6.onrender.com/api/employees/" +employeeid,{
        method:"PUT",
        headers: {
         "Content-Type": "application/json"
        },
          body: JSON.stringify(UpdateViewEdit()),
      })
   
      vieweditformopen.style.display = "none"
      editsuccessmessage();


    }
    //SUCCESS MESSAGE FOR EDIT//

      let editsuccess = document.getElementById("editformsuccess")

      function editsuccessmessage() {
        editsuccess.style.display = "block";
     
      }

    function UpdateViewEdit(){
      let updateuser = {
        salutation : document.getElementById('salutation').value,
        firstName : document.getElementById('firstName').value,
        lastName :document.getElementById('lastName').value,
        email : document.getElementById('email').value,
        phone : document.getElementById('phone').value,
        username : document.getElementById('username').value,
        password : document.getElementById('password').value,
        dob : dateofbirth(document.getElementById('dob').value),
        gender : genderSelect(),
        qualifications : document.getElementById('qualifications').value,
        address : document.getElementById('address').value,
        country : document.getElementById('country').value,
        state : document.getElementById('state').value,
        city : document.getElementById('city').value,
        pin : document.getElementById('pin').value
      }
       return updateuser
    }
      //SELECT GENDER//
    function genderSelect(){     
      const male = document.getElementById('Male');
      const female = document.getElementById('Female');

      if (male.checked == true) {
        return male.value;
      } else {    
        return female.value;  
      }
    }
  //EDIT AVATAR IMAGE AND EMPLOYEE DATA //

//ADD DATA TO VIEW EDIT-FORM//

//VIEW EMPLOYEE EDIT FORM END//

//DELETE VIEW-EMPLOYEE USER//

// let toastelement = document.getElementById('toast-show')
const deleteform = document.getElementById('deleteformbox')
const deleteformdata = document.getElementById('formdelete')

function deleteData(employeeid) {

  deleteform.style.display = "block";
  deleteform.classList.add('active');
  document.getElementById('overlay').classList.add('active');

  deleteformdata.addEventListener("click", function () {
    fetch("https://employee-management-system-4va6.onrender.com/api/employees/" + employeeid, {
      method: "DELETE",
      headers: {
      "content-Type": "application/json"
      },
    })
    .then((res) => res.json())
    .then((response) => {
      console.log(response)
    })

    deleteform.style.display="none"
    successmessage();
  })
}
//DELETE SUCCESS MESSAGE//
  const deletesuccess = document.getElementById('deleteformsuccess')

  function successmessage() {
    deletesuccess.style.display = "block"
  }
//DELETE SUCCESS MESSAGE//


//CLOSE ALERT BOX//
  function closealert() {
    deleteform.style.display = "none";
    deleteform.classList.remove('active');  //display background colour//
    document.getElementById('overlay').classList.remove('active');
  }
  document.getElementById('overlay').addEventListener("click",function(){ //display none deletebox //
    closealert();  
  })
//CLOSE ALERT BOX END //

//DELETE FORM END//

// FORM VALIDATION FOR VIEW-EMPLOYEE FORM EDIT //

let addEmployee = document.getElementById("addbtn")
addEmployee.addEventListener('click', function (e) {

  e.preventDefault();
  formvalidation();

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

  if(document.getElementById("gender").value == ""){
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

  ViewEditEmployeeForm();
    
  
  }
}

//VALIDATION FOR EACH INPUT FIELD//

  const validNamePattern = /^[A-Za-z]+$/; //for name validation


  document.getElementById("salutation").addEventListener('change' , function () {
    if(!document.getElementById("salutation").value == ""){
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

    if (number === "") {
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
    if(!document.getElementById("username").value == " "){
      document.getElementById("errormessageUsername").style.display = "none";
    }else{
      document.getElementById("errormessageUsername").style.display = "flex";
    }
  })

  document.getElementById("password").addEventListener('change' , function () {
    if(!document.getElementById("password").value == " "){
      document.getElementById("errormessagePassword").style.display = "none";
    }else{
      document.getElementById("errormessagePassword").style.display = "flex";
    }
  })

  document.getElementById("dob").addEventListener('change' , function () {
    if(!document.getElementById("dob").value == " "){
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
    if(!document.getElementById("qualifications").value == " "){
      document.getElementById("errormessageQualifications").style.display = "none";
    }else{
      document.getElementById("errormessageQualifications").style.display = "flex";
    }
  })

  document.getElementById("address").addEventListener('change' , function () {
    if(!document.getElementById("address").value == " "){
      document.getElementById("errormessageAddress").style.display = "none";
    }else{
      document.getElementById("errormessageAddress").style.display = "flex";
    }
  })

  document.getElementById("country").addEventListener('change' , function () {
    if(!document.getElementById("country").value == " "){
      document.getElementById("errormessageCountry").style.display = "none";
    }else{
      document.getElementById("errormessageCountry").style.display = "flex";
    }
  })

  document.getElementById("state").addEventListener('change' , function () {
    if(!document.getElementById("state").value == " "){
      document.getElementById("errormessageState").style.display = "none";
    }else{
      document.getElementById("errormessageState").style.display = "flex";
    }
  })

  document.getElementById("city").addEventListener('change' , function () {
    if(!document.getElementById("city").value == " "){
      document.getElementById("errormessageCity").style.display = "none";
    }else{
      document.getElementById("errormessageCity").style.display = "flex";
    }
  })

  document.getElementById("pin").addEventListener('change' , function () {
    if(!document.getElementById("pin").value == " "){
      document.getElementById("errormessagePin").style.display = "none";

    }else{
      document.getElementById("errormessagePin").style.display = "flex";

    }
  })
