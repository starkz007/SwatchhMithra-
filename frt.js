/* =========================================================
   SWACHHMITHRA
   Front-end interactions
   ========================================================= */


/* ---------------------------------------------------------
   Get the elements we need
   --------------------------------------------------------- */

const loginModal = document.getElementById("loginModal");
const openLoginButton = document.getElementById("openLogin");
const closeLoginButton = document.getElementById("closeLogin");

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const complaintForm = document.getElementById("complaintForm");
const serviceType = document.getElementById("serviceType");

const trackButton = document.getElementById("trackBtn");
const complaintId = document.getElementById("complaintId");
const trackMessage = document.getElementById("trackMessage");

const reportHeroButton = document.getElementById("reportHeroBtn");
const portalHeroButton = document.getElementById("portalHeroBtn");

const routeButton = document.getElementById("routeBtn");
const footerLogin = document.getElementById("footerLogin");

const roleButtons = document.querySelectorAll(".role-btn");
const portalLoginButtons = document.querySelectorAll(".portal-login");
const serviceCards = document.querySelectorAll(".service-card");


/* ---------------------------------------------------------
   Current login role
   --------------------------------------------------------- */

let selectedRole = "citizen";


/* =========================================================
   LOGIN MODAL
   ========================================================= */


/* Open login from navbar */

if (openLoginButton) {
    openLoginButton.addEventListener("click", function () {
        openLogin();
    });
}


/* Open login from footer */

if (footerLogin) {
    footerLogin.addEventListener("click", function (event) {
        event.preventDefault();
        openLogin();
    });
}


/* Close login */

if (closeLoginButton) {
    closeLoginButton.addEventListener("click", function () {
        closeLogin();
    });
}


/* Close when clicking outside the login box */

if (loginModal) {
    loginModal.addEventListener("click", function (event) {

        if (event.target === loginModal) {
            closeLogin();
        }

    });
}


/* Close modal with Escape key */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeLogin();
    }

});


function openLogin(role) {

    if (!loginModal) {
        return;
    }

    loginModal.classList.add("show");

    document.body.style.overflow = "hidden";

    if (role) {
        changeRole(role);
    }
}


function closeLogin() {

    if (!loginModal) {
        return;
    }

    loginModal.classList.remove("show");

    document.body.style.overflow = "";

    if (loginMessage) {
        loginMessage.textContent = "";
    }
}


/* =========================================================
   LOGIN ROLE SELECTION
   ========================================================= */

roleButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const role = button.dataset.role;

        changeRole(role);

    });

});


function changeRole(role) {

    selectedRole = role;

    roleButtons.forEach(function (button) {

        button.classList.remove("active");

        if (button.dataset.role === role) {
            button.classList.add("active");
        }

    });


    /* Change the password placeholder according
       to the selected portal */

    const passwordField =
        document.getElementById("loginPassword");

    if (!passwordField) {
        return;
    }


    if (role === "citizen") {

        passwordField.placeholder =
            "Enter password or OTP";

    }

    else if (role === "worker") {

        passwordField.placeholder =
            "Enter worker password";

    }

    else if (role === "admin") {

        passwordField.placeholder =
            "Enter admin password";

    }
}


/* =========================================================
   LOGIN FORM
   ========================================================= */

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const loginId =
            document.getElementById("loginId").value.trim();

        const password =
            document.getElementById("loginPassword").value.trim();


        if (!loginId || !password) {

            showLoginMessage(
                "Please enter your login details.",
                "error"
            );

            return;
        }


        let portalName = "Citizen";

        if (selectedRole === "worker") {
            portalName = "Worker";
        }

        if (selectedRole === "admin") {
            portalName = "Admin";
        }


        /*
         * This is intentionally a front-end demonstration.
         * No real authentication is performed here.
         */

        showLoginMessage(
            portalName +
            " login successful. Opening your portal...",
            "success"
        );


        setTimeout(function () {

            closeLogin();

            showDemoNotice(
                portalName +
                " dashboard would open here."
            );

        }, 900);

    });

}


/* Small helper for login messages */

function showLoginMessage(message, type) {

    if (!loginMessage) {
        return;
    }

    loginMessage.textContent = message;

    if (type === "error") {
        loginMessage.style.color = "#c86a58";
    } else {
        loginMessage.style.color = "#287f79";
    }
}


/* =========================================================
   HERO BUTTONS
   ========================================================= */


/* Report an issue */

if (reportHeroButton) {

    reportHeroButton.addEventListener("click", function () {

        const reportSection =
            document.getElementById("report");

        if (reportSection) {

            reportSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* Access portal */

if (portalHeroButton) {

    portalHeroButton.addEventListener("click", function () {

        openLogin();

    });

}


/* =========================================================
   SERVICE CARDS
   ========================================================= */

serviceCards.forEach(function (card) {

    const serviceButton =
        card.querySelector(".service-link");


    function chooseService() {

        const service =
            card.dataset.service;

        if (!serviceType || !service) {
            return;
        }

        /*
         * Find the matching option in the complaint form.
         */

        const options =
            Array.from(serviceType.options);

        const matchingOption =
            options.find(function (option) {

                return option.value === service;

            });


        if (matchingOption) {

            serviceType.value = service;

        }


        const reportSection =
            document.getElementById("report");

        if (reportSection) {

            reportSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    }


    card.addEventListener("click", chooseService);


    if (serviceButton) {

        serviceButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                chooseService();

            }
        );

    }

});


/* =========================================================
   COMPLAINT FORM
   ========================================================= */

if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const selectedService =
                serviceType.value;

            const location =
                document.getElementById("location")
                    .value.trim();

            const description =
                document.getElementById("description")
                    .value.trim();


            if (!selectedService ||
                !location ||
                !description) {

                alert(
                    "Please fill in the required fields."
                );

                return;
            }


            /*
             * Create a simple demonstration ID.
             */

            const year =
                new Date().getFullYear();

            const randomNumber =
                Math.floor(
                    1000 + Math.random() * 9000
                );

            const requestId =
                "SM-" +
                year +
                "-" +
                randomNumber;


            alert(
                "Complaint submitted successfully.\n\n" +
                "Complaint ID: " +
                requestId +
                "\n\n" +
                "Service: " +
                selectedService
            );


            /*
             * Put the newly created ID into
             * the tracking field.
             */

            if (complaintId) {
                complaintId.value = requestId;
            }


            complaintForm.reset();

        }
    );

}


/* =========================================================
   TRACKING
   ========================================================= */

if (trackButton) {

    trackButton.addEventListener(
        "click",
        function () {

            trackComplaint();

        }
    );

}


/* Allow Enter key inside tracking field */

if (complaintId) {

    complaintId.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                trackComplaint();

            }

        }
    );

}


function trackComplaint() {

    if (!complaintId || !trackMessage) {
        return;
    }


    const enteredId =
        complaintId.value.trim();


    if (enteredId === "") {

        trackMessage.textContent =
            "Enter a complaint ID to continue.";

        trackMessage.style.color =
            "#c86a58";

        return;

    }


    /*
     * Front-end prototype:
     * We don't check a real database.
     */

    trackMessage.textContent =
        "Request found. Your complaint is currently assigned to the sanitation team.";

    trackMessage.style.color =
        "#287f79";

}


/* =========================================================
   COLLECTION ROUTE
   ========================================================= */

if (routeButton) {

    routeButton.addEventListener(
        "click",
        function () {

            showDemoNotice(
                "Collection route view will display the active sanitation vehicle and its assigned area."
            );

        }
    );

}


/* =========================================================
   PORTAL BUTTONS
   ========================================================= */

portalLoginButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const role =
            button.dataset.role;

        openLogin(role);

    });

});


/* =========================================================
   SMALL DEMO MESSAGE
   ========================================================= */

function showDemoNotice(message) {

    /*
     * A small temporary message instead of using
     * an alert every time.
     */

    const notice =
        document.createElement("div");

    notice.className =
        "demo-notice";

    notice.textContent =
        message;


    document.body.appendChild(notice);


    /*
     * Basic inline positioning so this works
     * even before any extra CSS is added.
     */

    notice.style.position = "fixed";
    notice.style.left = "50%";
    notice.style.bottom = "25px";
    notice.style.transform = "translateX(-50%)";
    notice.style.background = "#24363d";
    notice.style.color = "#ffffff";
    notice.style.padding = "13px 18px";
    notice.style.borderRadius = "5px";
    notice.style.fontSize = "13px";
    notice.style.maxWidth = "90%";
    notice.style.textAlign = "center";
    notice.style.zIndex = "5000";
    notice.style.boxShadow =
        "0 8px 25px rgba(0,0,0,0.18)";


    setTimeout(function () {

        notice.style.opacity = "0";
        notice.style.transition =
            "opacity 0.25s ease";

        setTimeout(function () {

            notice.remove();

        }, 300);

    }, 3000);

}


/* =========================================================
   INITIAL STATE
   ========================================================= */

changeRole("citizen");


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "SwachhMithra front-end loaded."
);
