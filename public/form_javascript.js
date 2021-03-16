// Gets passed directly into Oidc.UserManager instantiation
// documentation: https://github.com/IdentityModel/oidc-client-js/wiki
var settings_auth0 = {
    authority: "https://dev-8snzgxfi.auth0.com",
    client_id: "5XF0vALgtkN6t1Z3KJTChqyaCQiQ94Tm",
    popup_redirect_uri: "http://localhost:5000/popup.html",
    silent_redirect_uri: "http://localhost:5000/silent-renew.html",
    // post_logout_redirect_uri: 'http://localhost:5000/index.html',
    metadataSeed: {
        // Auth0 doesn't seem to pass this end session endpoint in it's OIDC metadata
        end_session_endpoint: "https://dev-8snzgxfi.auth0.com/v2/logout",
    },
    response_type: "id_token token",
    scope: "openid profile email api",
    accessTokenExpiringNotificationTime: 4,

    // Only relevant to event "accessTokenExpiring"
    automaticSilentRenew: false,

    filterProtocolClaims: true,
    // "login" forces login, "consent" forces consent, null shows login/consent as needed, "none" forces no login and no consent
    // docs: https://openid.net/specs/openid-connect-core-1_0.html
    prompt: null,
};

// Gets passed directly into Oidc.UserManager instantiation
// documentation: https://github.com/IdentityModel/oidc-client-js/wiki
var settings_okta = {
    authority: "https://dev-09117873.okta.com",
    client_id: "0oabotfshev6GXKv35d6",
    popup_redirect_uri: "http://localhost:3155",
    silent_redirect_uri: "http://localhost:5000/silent-renew.html",
    post_logout_redirect_uri: "http://localhost:3155/myapp.html",
    response_type: "code",
    scope: "openid profile",
    accessTokenExpiringNotificationTime: 4,

    // Only relevant to event "accessTokenExpiring"
    automaticSilentRenew: false,

    filterProtocolClaims: true,
    // "login" forces login, "consent" forces consent, null shows login/consent as needed, "none" forces no login and no consent
    // docs: https://openid.net/specs/openid-connect-core-1_0.html
    prompt: null,
};

// Gets passed directly into Oidc.UserManager instantiation
// documentation: https://github.com/IdentityModel/oidc-client-js/wiki
// NOTE: you need to update the PORT=XXXX within package.json to be 3155
// NOTE: Your may need to move static pages around a bit to match the config defined here (e.g. callback location)
var settings_fedlogin = {
    authority: "https://fedlogin-dev.jnj.com",
    client_id: "chad-jnj-poc-app01-2020june",
    popup_redirect_uri: "http://localhost:3155/authentication/callback",
    silent_redirect_uri: "http://localhost:3155/silent-renew.html",
    post_logout_redirect_uri: "http://localhost:3155/index.html",
    response_type: "code",
    scope: "openid",

    accessTokenExpiringNotificationTime: 4,

    // Only relevant to event "accessTokenExpiring"
    automaticSilentRenew: false,

    filterProtocolClaims: true,
    // "login" forces login, "consent" forces consent, null shows login/consent as needed, "none" forces no login and no consent
    // docs: https://openid.net/specs/openid-connect-core-1_0.html
    prompt: "login",
};

// helper function to show data to the user
function display(selector, data) {
    if (data && typeof data === "string") {
        data = JSON.parse(data);
    }
    if (data) {
        data = JSON.stringify(data, null, 2);
    }

    $(selector).text(data);
}

// Create a new Oidc UserManager
var manager = new Oidc.UserManager(settings_fedlogin);
var user;

// Tell oidc_client how/where we'd like to do console logging.
Oidc.Log.logger = console;
// Can be INFO or DEBUG (to make use of DEBUG, set Chrome Dev Console to "Verbose" level)
Oidc.Log.level = Oidc.Log.INFO;

// Register a callback for the oidc_client event called "addUserLoaded"
manager.events.addUserLoaded(function (loadedUser) {
    console.log("addUserLoaded event:");
    user = loadedUser;
    display(".js-user", user);
});

// Register a callback for the oidc_client event called "addSilentRenewError"
manager.events.addSilentRenewError(function (error) {
    console.error("error while renewing the access token", error);
});

// Register a callback for the oidc_client event called "addUserSignedOut"
manager.events.addUserSignedOut(function () {
    alert("The user has signed out");
});

// Register a callback for the form button with a class of "js-login"
$(".js-login").on("click", function () {
    console.log(".js-login on-click:");
    manager.signinPopup().catch(function (error) {
        console.error("error while logging in through the popup", error);
    });
});

// Register a callback for the form button with a class of "js-call-api"
$(".js-call-api").on("click", function () {
    console.log(".js-call-api on-click:");
    var headers = {};
    // If user object exists, and has an access token, set Authorization headers
    if (user && user.access_token) {
        headers["Authorization"] = "Bearer " + user.access_token;
    }

    $.ajax({
        url: "http://localhost:60136/values",
        method: "GET",
        dataType: "json",
        headers: headers,
    })
        .then(function (data) {
            display(".js-api-result", data);
        })
        .catch(function (error) {
            display(".js-api-result", {
                status: error.status,
                statusText: error.statusText,
                response: error.responseJSON,
            });
        });
});

// Register a callback for the form button with a class of "js-logout"
$(".js-logout").on("click", function () {
    console.log("Logout Button Clicked:");
    manager.signoutRedirect().catch(function (error) {
        console.error("error while signing out user", error);
    });
});
