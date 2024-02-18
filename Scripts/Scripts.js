/* ----------- Load Document ------ */
window.addEventListener("load", function() {

    /* ----------- Global Variables ------ */
    let backgroundOption = true;
    let backgroundInterval;

    /* "----------- Check If There Is Color Option In LocalStorage ------ */
    let mainColorLocalStorageOption = localStorage.getItem("color_option");
    if (mainColorLocalStorageOption !== null) {
        /* ------ Set Color In Root ------ */
        document.documentElement.style.setProperty("--main-color", mainColorLocalStorageOption);
        /* ------ Remove Active Class From Unsed Color Option ------ */
        let unactiveLis = document.querySelectorAll(".colors__list li");
        unactiveLis.forEach(element => {
            element.classList.remove("active");
            /* ------ Add Active Class Of Used Color Option As LocalStorage ------ */
            if (element.dataset.color === mainColorLocalStorageOption) {
                element.classList.add("active");
            };
        });
    };

    /* ----------- Check If There Is background Image Option In LocalStorage ------ */
    let randomBackGroundLocalStorageOption = localStorage.getItem("random_background_option");
    if (randomBackGroundLocalStorageOption !== null) {
        if (randomBackGroundLocalStorageOption === "true") {
            backgroundOption = true;
        } else {
            backgroundOption = false;
        };
        let randomBackGroundLocalStorageSpans = document.querySelectorAll(".random__backgrounds span");
        randomBackGroundLocalStorageSpans.forEach(randomBackGroundLocalStorageSpan => {
            randomBackGroundLocalStorageSpan.classList.remove("active");
        });
        if (randomBackGroundLocalStorageOption === "true") {
            document.querySelector("span.yes").classList.add("active");
        } else {
            document.querySelector("span.no").classList.add("active");
        };
    };

    /* ----------- Show Back To Top Icon ------ */
    window.addEventListener("scroll", function() {
        const backToTopIcon = document.querySelector(".back__to__top");
        let scrollThreshold = 30 * 16;
        let windowScrollDown = this.pageYOffset;
        if (windowScrollDown >= scrollThreshold) {
            backToTopIcon.style.display = "block";
        } else {
            backToTopIcon.style.display = "none";
        };
    });

    /* ----------- Handling Alass "Active" For Active Spans ------ */
    function handleActive(event) {
        let activeItems = event.target.parentElement.querySelectorAll(".active");
        activeItems.forEach(activeItem => {
            activeItem.classList.remove("active");
        });
        event.target.classList.add("active");
    };

    /* ----------- Animating Cog Icon on Opened Option Container ------ */
    let settingsCogIcon = document.querySelector(".fa-cog.settings__gear");
    settingsCogIcon.onclick = function() {
        this.classList.toggle("fa-spin");
        let settingsContinerIcon = document.querySelector(".settings__box");
        settingsContinerIcon.classList.toggle("opened");
    };

    /* ----------- Changing Color Options ------ */
    let colorsLi = document.querySelectorAll(".colors__list li");
    colorsLi.forEach(li => {
        li.addEventListener("click", (e) => {
            /* ------ Set Color In Root ------ */
            document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
            /* ------ Set Color In LocalStorage ------ */
            localStorage.setItem("color_option", e.target.dataset.color);
            /* ------ Remove Active Class From Unsed Color Option ------ */
            handleActive(e);
        });
    });

    /* ----------- Changing Randomized BackGround Images In Seconds ------ */
    function randomizeImageBackgroud () {
        if (backgroundOption === true) {
            backgroundInterval = setInterval(() => {
                let landingPage = document.querySelector(".landing__page");
                let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "12.jpg"];
                let randomNumber = Math.floor(Math.random() * imagesArray.length);
                landingPage.style.backgroundImage = `url("Images/Galleries/Gallery${imagesArray[randomNumber]}")`;
            }, 3500);
        } else {
            clearInterval(backgroundInterval);
        };
    };
    randomizeImageBackgroud();

    /* ----------- Changing Random Background Option ------ */
    let randomBackgroundSpans = document.querySelectorAll(".random__backgrounds span");
    randomBackgroundSpans.forEach(randomBackgroundSpan => {
        randomBackgroundSpan.addEventListener("click", (e) => {
            e.target.parentElement.querySelectorAll(".active").forEach(activeRandomBackgroundSpan => {
                activeRandomBackgroundSpan.classList.remove("active");
            });
            e.target.classList.add("active");
            if (e.target.dataset.background === "yes") {
                backgroundOption = true;
                randomizeImageBackgroud();
                localStorage.setItem("random_background_option", backgroundOption);
            } else {
                backgroundOption = false;
                clearInterval(backgroundInterval);
                localStorage.setItem("random_background_option", backgroundOption);
            };
        });
    });

    /* ----------- Animation Skills Percentage On Scroll With Offset ------ */
    window.addEventListener("scroll", function() {
        const ourSkills = document.querySelector(".skills");
        let ourSkillsOffsetTop = ourSkills.offsetTop;
        let ourSkillsOuterHeight = ourSkills.offsetHeight;
        let skillsHeight = this.innerHeight;
        let skillsScrollTop = this.pageYOffset;
        if (skillsScrollTop > ourSkillsOffsetTop + ourSkillsOuterHeight - skillsHeight) {
            let allSkills = document.querySelectorAll(".skill__box .skill__progress .skill__progress__Line");
            allSkills.forEach(skill => {
                skill.style.width = skill.dataset.progress;
            });
        };
    });

    /* ----------- Gallery Image PopUp ------ */
    let ourGalleryImages = document.querySelectorAll(".gallery .images__Box .gallery__image");
    ourGalleryImages.forEach( galleryImage => {
        galleryImage.addEventListener("click", (e) => {
            /* ------ Createing Overlay ------ */
            let galleryImageOverlay = document.createElement("div");
            galleryImageOverlay.className = "gallery__image__overlay";
            document.body.appendChild(galleryImageOverlay);
            /* ------ Createing PopUp Box ------ */
            let galleryPopUp = document.createElement("div");
            galleryPopUp.className = "gallery__popup";
            /* ------ Adding Title From Alt Image ------ */
            if (galleryImage.alt !== null) {
                let galleryImageHeading = document.createElement("h3");
                let galleryImageText = document.createTextNode(galleryImage.alt);                
                galleryImageHeading.appendChild(galleryImageText);
                galleryPopUp.appendChild(galleryImageHeading);
            };
            /* ------ Createing PopUp Box Image ------ */
            let galleryPopUpImg = document.createElement("img");
            galleryPopUpImg.src = galleryImage.src;
            /* ------ Addimg Image To PopUp ------ */
            galleryPopUp.appendChild(galleryPopUpImg);
            document.body.appendChild(galleryPopUp);
            /* ------ Adding PopUp To Overlay ------ */
            galleryImageOverlay.appendChild(galleryPopUp);
            /* ------ Create Close Image Icon ------ */
            let galleryImageCloseSpan = document.createElement("span");
            let galleryImageCloseSpanText = document.createTextNode("X");
            galleryImageCloseSpan.appendChild(galleryImageCloseSpanText);
            galleryImageCloseSpan.className = "gallery__image__close";
            galleryPopUp.appendChild(galleryImageCloseSpan);
        });
    });

    /* ----------- Check For Close Button and Give it Functionality ------ */
    document.addEventListener("click", (e) => {
        if (e.target.className == "gallery__image__close") {
            document.querySelector(".gallery__image__overlay").remove();
        };
    });

    /* ----------- Bullets Smooth Scrolling ------ */
    let allBullets = document.querySelectorAll(".navigation__bullets .nav__bullet");
    allBullets.forEach(navBullet => {
        navBullet.addEventListener("click", (e) => {
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    /* ----------- Toggle Bullets Visibility Option ------ */
    let bulletsToggleSpans = document.querySelectorAll(".toggle__bullets span");
    let navbullets = document.querySelector(".navigation__bullets");
    let toggleBulletsLocalStorage = localStorage.getItem("bullets_option");
    if (toggleBulletsLocalStorage !== null) {
        bulletsToggleSpans.forEach(bulletsToggleSpan => {
            bulletsToggleSpan.classList.remove("active");
        });
        if (toggleBulletsLocalStorage === "show") {
            navbullets.style.display = "block";
            document.querySelector(".toggle__bullets .show").classList.add("active");
        } else {
            navbullets.style.display = "none";
            document.querySelector(".toggle__bullets .hide").classList.add("active");
        };
    };
    bulletsToggleSpans.forEach(bulletsToggleSpan => {
        bulletsToggleSpan.addEventListener("click", (e) => {
            if (bulletsToggleSpan.dataset.display == "show") {
                navbullets.style.display = "block";
                localStorage.setItem("bullets_option", "show");
            } else {
                navbullets.style.display = "none";
                localStorage.setItem("bullets_option", "none");
            };
            handleActive(e);
        });
    });

    /* ----------- Toggle Hamburger Mobile Menu ------ */
    let menuToggleButton = document.querySelector(".header__toggle__menu");
    let menuLinksUl = document.querySelector(".header__area .ul__links");
    menuToggleButton.onclick = function (event) {
        event.stopPropagation();
        this.classList.toggle("active__menu");
        menuLinksUl.classList.toggle("opened");
    };

    /* ----------- Close Hamburger Mobile Menu When Click AnyWhere ------ */
    document.addEventListener("click", (event) => {
        if (event.target !== menuToggleButton && event.target !== menuLinksUl) {
            if (menuLinksUl.classList.contains("opened")) {                
                menuToggleButton.classList.toggle("active__menu");
                menuLinksUl.classList.toggle("opened");
            };
        };
    });
    menuLinksUl.onclick = function (event) {
        event.stopPropagation();
    };

    /* ----------- Reset Options From LocalStorage ------ */
    document.querySelector(".reset__options").onclick = function () {
        localStorage.removeItem("color_option");
        localStorage.removeItem("random_background_option");
        localStorage.removeItem("bullets_option");
        window.location.reload();
    };

});