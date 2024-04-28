    const prev = document.querySelector('.prev-slide');
    const next = document.querySelector('.next-slide');

    const slides = document.querySelectorAll('.slide');

    let curr = 0;
    slides[1].style.display = "none";
    slides[2].style.display = "none";
    slides[3].style.display = "none";
    // slides[4].style.display = "none";

    function next_clicked(){
        slides[curr].style.display = "none";
        curr++;
        curr%=slides.length;
        slides[curr].style.display = "flex";
    }

    // const setInt = setInterval(next_clicked,5000);
 
    prev.addEventListener("click", ()=>{
        slides[curr].style.display = "none";
        if(curr==0){
            curr=slides.length;
        }
        curr--;
        slides[curr].style.display = "flex";
    })

    next.addEventListener("click", next_clicked)




