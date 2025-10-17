import {
    auth,
    onAuthStateChanged,
    signOut,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "./firebase.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("user", user);
    } else {
        console.log("no user");
    }
});

let logOut = () => {
    signOut(auth).then(() => {
        console.log("Sign-out successful.");
    }).catch((error) => {
        // An error happened.
    });
}
let logOutBtn = document.getElementById("logOutBtn");
logOutBtn.addEventListener("click", logOut);


let sendCode = () => {
    const appVerifier = window.recaptchaVerifier;
    let phone = document.getElementById("phone");
    console.log(`+${phone.value}`);
    signInWithPhoneNumber(auth, `+${phone.value}`, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log("confirmationResult", confirmationResult)
        }).catch((error) => {
            console.log("error", error)
        });
}

let sendCodeBtn = document.getElementById("sendCodeBtn");
sendCodeBtn.addEventListener("click", sendCode);

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptchaContainer', {
    'size': 'normal',
    'callback': (response) => {
    },
    'expired-callback': () => {
    }
});


let verify = () => {
let otp = document.getElementById("otp")

    confirmationResult.confirm(otp.value).then((result) => {
        const user = result.user;
        console.log("user", user)
    }).catch((error) => {
        console.log("error", error)
    });
}
let verifyBtn = document.getElementById("verifyBtn");
verifyBtn.addEventListener("click", verify);

