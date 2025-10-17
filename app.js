import {
    auth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
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


let signUp = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((res) => {
            // Signed up 
            console.log("user", res.user);
        })
        .catch((error) => {
            console.log("error", error.code)
        });
}
let signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", signUp);

let signIn = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((res) => {
            // Signed IN
            console.log("user", res.user);
        })
        .catch((error) => {
            console.log("error", error.code)
        });
}
let signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", signIn);

let logOut = () => {
    signOut(auth).then(() => {
        console.log("Sign-out successful.");
    }).catch((error) => {
        // An error happened.
    });
}
let logOutBtn = document.getElementById("logOutBtn");
logOutBtn.addEventListener("click", logOut);

let verifyBtn = document.getElementById("verifyBtn");
verifyBtn.addEventListener("click", () => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log("Verification email sent.");
        });
});

// const signInWithPhoneNumberVerifier = () => {

//     const recaptchaContainer = document.getElementById("recaptchaContainer")
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
//         'size': 'normal',
//         'callback': (response) => {
//             console.log("reCAPTCHA solved", response)
//         },
//         'expired-callback': (err) => {
//             console.log("Response expired. Ask user to solve reCAPTCHA again.", err)
//         }
//     });

//     const phoneNumber = document.getElementById("phoneNumber").value
//     const appVerifier = window.recaptchaVerifier;
//     let code;
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//             console.log("SMS sent", confirmationResult)

//             code = +prompt("Enter the code received via SMS.")
//             window.confirmationResult = confirmationResult;

//         }).catch((error) => {
//             console.error("SMS not sent", error)
//         });


//     confirmationResult.confirm(code).then((result) => {
//         const user = result.user;
//         console.log("User signed in successfully.", result, user)

//     }).catch((error) => {
//         console.error(" User couldn't sign in (bad verification code?)", error)
//     });
// }



const signInWithPhoneNumberVerifier = () => {
    const phoneNumber = document.getElementById("phoneNumber").value;
    
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptchaContainer', {
    'size': 'normal',
    'callback': (response) => {
      console.log("reCAPTCHA solved:", response);
    },
    'expired-callback': () => {
        console.log("reCAPTCHA expired, please try again");
    }
});

  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        console.log("SMS sent", confirmationResult);
        const code = prompt("Enter the verification code you received:");
      return confirmationResult.confirm(code);
    })
    .then((result) => {
        console.log("User signed in successfully:", result.user);
    })
    .catch((error) => {
      console.error("Error during phone sign-in:", error);
    });
};


const sendCode = document.getElementById("sendCode");
sendCode.addEventListener("click", signInWithPhoneNumberVerifier);