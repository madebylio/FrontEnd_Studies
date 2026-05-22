const aboutBtn =
document.querySelector(".about-btn");

aboutBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    document.body.classList.add("fade-out");

    setTimeout(()=>{

        window.location.href = "about.html";

    },500);

});