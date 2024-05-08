const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const register = document.getElementById('registeruser')

registerBtn.addEventListener('click', () => {
     container.classList.add("active");
          
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});



// Function to show toast message
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');

        
        setTimeout(() => {
            location.replace("/signup");
        }, 100); 
    }, 5000);

}
