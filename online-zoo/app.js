const modalLinks = document.querySelectorAll(".modal-link");
const body = document.querySelector("body");

for (let i = 0; i < modalLinks.length; i++) {
  const modalLink = modalLinks[i];
  modalLink.addEventListener("click", (e) => {
    const modalName = modalLink.dataset.modal;
    const curentModal = document.getElementById(modalName);
    e.preventDefault();

    body.classList.add("noScroll");
    curentModal.classList.add("open");
    curentModal.addEventListener("click", (e) => {
      if (!e.target.closest(".modal-window")) {
        curentModal.classList.remove("open");
        body.classList.remove("noScroll");
      }
    });
  });
}



document
  .querySelectorAll(".features-arrows__right0, .features-arrows__left0")
  .forEach((item) => item.addEventListener("click", slideChange0));

  function slideChange0() { 
    let slides = document.querySelector('.pets-slider').querySelectorAll(".pets-slider__item");
    
    if (this.classList.contains("features-arrows__right0")) {        
        let lastItem = slides[slides.length - 1];
        let lastItem2 = slides[slides.length - 2];
        lastItem.parentNode.insertBefore(lastItem, lastItem.parentNode.firstChild);        
        lastItem2.parentNode.insertBefore(lastItem2, lastItem2.parentNode.firstChild);      
    }
  
    if (this.classList.contains("features-arrows__left0")) {
      slides[0].parentNode.insertBefore(slides[0], slides[0].parentNode.lastChild);
      slides[1].parentNode.insertBefore(slides[1], slides[1].parentNode.lastChild);
    }
  }




document
  .querySelectorAll(".features-arrows__right, .features-arrows__left")
  .forEach((item) => item.addEventListener("click", slideChange));

function slideChange() { 
  let slides = document.querySelectorAll(".animals-list__item");
  
  if (this.classList.contains("features-arrows__right")) {
    let lastItem = slides[slides.length - 1];
    lastItem.parentNode.insertBefore(lastItem, lastItem.parentNode.firstChild);
  }

  if (this.classList.contains("features-arrows__left")) {
    slides[0].parentNode.insertBefore(
      slides[0],
      slides[0].parentNode.lastChild
    );
  }
}







let timerSec = 10;
let timerSlide = setInterval(commentChange, 10000);
let clickTimeout = null;

function addTime() {
  if (timerSec == 0) {
    timerSec = 10;
  }
}

function commentChange() {
  let slCom = document.querySelectorAll(".feedback-list__item");
  slCom[0].parentNode.insertBefore(slCom[0], slCom[0].parentNode.lastChild);
}

document.querySelectorAll(".feedback-list__item").forEach((item) =>
  item.addEventListener("click", () => {
    timerSec = 30;
    clearInterval(timerSlide);
    clearInterval(clickTimeout);
    clickTimeout = setTimeout(() => {
      timerSlide = setInterval(commentChange, 10000);
    }, 20000);
  })
);



//modal window
let modal = document.getElementById("my_modal");
let modalFrame = document.querySelector('.modal-wrapper').querySelectorAll('li');
let hiddeField = document.querySelectorAll('.modal-policy, .modal-nameuser');
let userIco = document.querySelector('.user-image');
const inputModal = document.querySelector('.modal-wrapper').querySelectorAll('input');
inputModal.forEach(item=> item.addEventListener('input', checkInput));
document.querySelectorAll('.user-link, .modal-create, .modal-login').forEach(item => item.addEventListener('click', switchModal)); 
window.onclick = (e) => {if (e.target == modal) modal.style.display = "none";}

function switchModal() {  
inputModal.forEach(item=>item.value = '');
document.querySelector('input[type="checkbox"]').checked = false; checkInput();
modal.style.display = "block";

    if (this.textContent == 'Create account' || this.textContent.trim() == 'Sign Up') {
        hiddeField.forEach(item=>item.classList.remove('hidden'));
        modalFrame.forEach(item=> item.classList.remove('modal-active'));
        modalFrame[0].classList.add('modal-active');
        
    }
    if (this.textContent.trim() == 'Log In') {
        hiddeField.forEach(item=>item.classList.add('hidden'));
        modalFrame.forEach(item=> item.classList.remove('modal-active'));
        modalFrame[1].classList.add('modal-active');
    }
}

function checkInput(e) {
    let allCheck = false;
    let nameCheck = (/^[\w\W]{1,}$/.test(document.querySelector('.inp-name').value));   
    let emailCheck = (/^[\w\W]{1,}$/.test(document.querySelector('input[type="email"]').value));
    let passCheck = (/^[\w\W]{8,}$/.test(document.querySelector('input[type="password"]').value));
	let passCheck2 = (/^[\w\W]{1,}$/.test(document.querySelector('input[type="password"]').value));
    let policyCheck = document.querySelector('input[type="checkbox"]').checked;        
    
    if (!document.querySelector('.modal-nameuser').classList.contains('hidden')) {       
        (nameCheck && emailCheck && passCheck && policyCheck) ? allCheck = true: allCheck = false;
    } else  {
        (emailCheck && passCheck2) ? allCheck = true: allCheck = false;               
    }       
   
   (allCheck) ? document.querySelector('.modal-submit').classList.remove('submit-disable'):
                document.querySelector('.modal-submit').classList.add('submit-disable');      
}

document.querySelector('.modal-submit').addEventListener('click', btnSubmit);
function btnSubmit() {
    let emailUser = document.querySelector('input[type="email"]').value;
    let passUser = document.querySelector('input[type="password"]').value;
    let nameUser = document.querySelector('.inp-name').value;

    if (!document.querySelector('.modal-nameuser').classList.contains('hidden')) {

        if (emailUser == 'user@gmail.com') {
            alert('This user already exists');
        } 
        else {
            userIco.setAttribute("data-tooltip", nameUser);
            hideBtnLogin();
        }  
           
    } else  {
        if (emailUser == 'user@gmail.com' && passUser == 'useruser') {
            userIco.setAttribute("data-tooltip", "user");
            hideBtnLogin();
        } else {
            alert('Incorrect email or password');
        }
    }    
}


document.querySelector('.user-image').addEventListener('click', getMenu);
function getMenu() {
    document.querySelector('.log-out').classList.toggle('hidden');
}

document.querySelector('.log-out').addEventListener('click', getOut);
function getOut() { 
    document.querySelector('.log-out').classList.add('hidden');
    userIco.classList.add('hidden');
    document.querySelectorAll('.user-link').forEach(item => item.classList.remove('hidden'));   
}

document.querySelectorAll('.modal-google, .modal-facebook').forEach(item=> item.addEventListener('click', signWithSocial));
function signWithSocial() {
    let socName = (this.textContent == 'Google Login') ? 'Logged in with Google': 'Logged in with Facebook';
    userIco.setAttribute("data-tooltip", socName);  
    hideBtnLogin();          
}

function hideBtnLogin() {
    document.querySelectorAll('.user-link').forEach(item=>item.classList.add('hidden'));            
    userIco.classList.remove('hidden');            
    modal.style.display = "none";    
}



