"use strict";

/*
===========================================================
 SYNC
 Frontend application logic
===========================================================
*/

/* =========================================================
   CONFIG
========================================================= */

const SYNC = {
    version: "1.0.0",

    languages: ["it", "en", "es", "fr"],

    state: {
        currentPage: "home",
        friendsTab: "all",
        eventFilter: "upcoming",
        language: localStorage.getItem("sync_language") || "it",
        theme: localStorage.getItem("sync_theme") || "system",

        currentUser: JSON.parse(
            localStorage.getItem("sync_user") || "null"
        ),

        friends: JSON.parse(
            localStorage.getItem("sync_friends") || "[]"
        ),

        privateFriends: JSON.parse(
            localStorage.getItem("sync_private") || "[]"
        ),

        events: JSON.parse(
            localStorage.getItem("sync_events") || "[]"
        ),

        commitments: JSON.parse(
            localStorage.getItem("sync_commitments") || "[]"
        ),

        notifications: JSON.parse(
            localStorage.getItem("sync_notifications") || "[]"
        ),

        availabilityVisibility:
            localStorage.getItem("sync_availability_visibility") ||
            "friends"
    }
};


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    it: {
        "auth.tagline": "Organizza tutto insieme.",
        "auth.login.title": "Bentornato",
        "auth.login.subtitle": "Accedi al tuo account SYNC.",
        "auth.email": "Email",
        "auth.password": "Password",
        "auth.login.button": "Accedi",
        "auth.forgot": "Hai dimenticato la password?",
        "auth.register": "Crea un account",
        "auth.register.title": "Crea il tuo account",
        "auth.register.subtitle": "Entra in SYNC e inizia a organizzare.",
        "auth.displayName": "Nome visualizzato",
        "auth.username": "Nome utente",
        "auth.confirmPassword": "Conferma password",
        "auth.register.button": "Registrati",
        "auth.haveAccount": "Hai già un account? Accedi",
        "auth.logout": "Esci dall'account",

        "common.or": "oppure",
        "common.seeAll": "Vedi tutto",
        "common.add": "Aggiungi",
        "common.edit": "Modifica",
        "common.loading": "Caricamento...",

        "nav.home": "Home",
        "nav.friends": "Amici",
        "nav.calendar": "Calendario",
        "nav.profile": "Profilo",

        "home.title": "Cosa facciamo?",
        "home.today": "Oggi",
        "home.pending": "Da decidere",
        "home.availability": "Disponibilità",
        "home.nextFree": "Prossimo momento libero",
        "home.manageAvailability": "Gestisci disponibilità",
        "home.smart.label": "SYNC ha trovato",
        "home.smart.title": "Un momento libero",
        "home.smart.button": "Organizza qualcosa",

        "quick.event": "Organizza",
        "quick.update": "Aggiornamento",
        "quick.friends": "Amici",
        "quick.calendar": "Calendario",

        "friends.title": "Amici",
        "friends.subtitle": "Organizza qualcosa con le persone che conosci.",
        "friends.all": "Tutti",
        "friends.private": "Privata",
        "friends.privacy.title": "Decidi chi vede cosa",
        "friends.privacy.description": "Quando pubblichi qualcosa puoi scegliere tutti gli amici, la tua privata oppure singole persone.",

        "family.title": "Famiglia",
        "family.subtitle": "Tutti gli impegni e i programmi della famiglia.",
        "family.nextFree": "Prossimo momento libero per tutti",
        "family.everyoneFree": "Tutti disponibili",
        "family.organize": "Organizza",
        "family.members": "Membri",
        "family.commitments": "Impegni",

        "calendar.title": "Calendario",
        "calendar.add": "+ Impegno",
        "calendar.visibility": "Visibilità disponibilità",
        "calendar.free": "Libero",
        "calendar.partial": "Parzialmente disponibile",
        "calendar.busy": "Occupato",

        "events.title": "I tuoi programmi",
        "events.new": "+ Organizza",
        "events.upcoming": "In programma",
        "events.past": "Passati",

        "notifications.title": "Notifiche",
        "notifications.markRead": "Segna come lette",

        "profile.edit": "Modifica profilo",
        "profile.friends": "Amici",
        "profile.private": "Privata",
        "profile.events": "Eventi",
        "profile.manageFriends": "Gestisci amici",
        "profile.privateList": "Lista privata",
        "profile.privacy": "Privacy e sicurezza",
        "profile.settings": "Impostazioni",

        "settings.title": "Impostazioni",
        "settings.privacy": "Privacy",
        "settings.account": "Account",
        "settings.app": "App",
        "settings.availabilityVisibility": "Visibilità disponibilità",
        "settings.availabilityDescription": "Decidi chi può vedere quando sei libero.",
        "settings.privateList": "Lista privata",
        "settings.privateDescription": "Gestisci le persone della tua privata.",
        "settings.blocked": "Utenti bloccati",
        "settings.blockedDescription": "Gestisci gli utenti che hai bloccato.",
        "settings.password": "Password",
        "settings.passwordDescription": "Modifica la password del tuo account.",
        "settings.deleteAccount": "Elimina account",
        "settings.deleteDescription": "Elimina definitivamente il tuo account.",
        "settings.language": "Lingua",
        "settings.theme": "Aspetto",
        "settings.notifications": "Notifiche",
        "settings.notificationsDescription": "Gestisci le notifiche di SYNC.",

        "search.placeholder": "Cerca persone..."
    },

    en: {
        "auth.tagline": "Organize everything together.",
        "auth.login.title": "Welcome back",
        "auth.login.subtitle": "Log in to your SYNC account.",
        "auth.email": "Email",
        "auth.password": "Password",
        "auth.login.button": "Log in",
        "auth.forgot": "Forgot your password?",
        "auth.register": "Create an account",
        "auth.register.title": "Create your account",
        "auth.register.subtitle": "Join SYNC and start organizing.",
        "auth.displayName": "Display name",
        "auth.username": "Username",
        "auth.confirmPassword": "Confirm password",
        "auth.register.button": "Sign up",
        "auth.haveAccount": "Already have an account? Log in",
        "auth.logout": "Log out",

        "common.or": "or",
        "common.seeAll": "See all",
        "common.add": "Add",
        "common.edit": "Edit",
        "common.loading": "Loading...",

        "nav.home": "Home",
        "nav.friends": "Friends",
        "nav.calendar": "Calendar",
        "nav.profile": "Profile",

        "home.title": "What should we do?",
        "home.today": "Today",
        "home.pending": "To decide",
        "home.availability": "Availability",
        "home.nextFree": "Next free time",
        "home.manageAvailability": "Manage availability",
        "home.smart.label": "SYNC found",
        "home.smart.title": "A free moment",
        "home.smart.button": "Organize something",

        "quick.event": "Organize",
        "quick.update": "Update",
        "quick.friends": "Friends",
        "quick.calendar": "Calendar",

        "friends.title": "Friends",
        "friends.subtitle": "Organize something with the people you know.",
        "friends.all": "Everyone",
        "friends.private": "Private",
        "friends.privacy.title": "Choose who sees what",
        "friends.privacy.description": "When you post something, choose all friends, your private list or individual people.",

        "family.title": "Family",
        "family.subtitle": "All family commitments and plans.",
        "family.nextFree": "Next free time for everyone",
        "family.everyoneFree": "Everyone is available",
        "family.organize": "Organize",
        "family.members": "Members",
        "family.commitments": "Commitments",

        "calendar.title": "Calendar",
        "calendar.add": "+ Commitment",
        "calendar.visibility": "Availability visibility",
        "calendar.free": "Free",
        "calendar.partial": "Partially available",
        "calendar.busy": "Busy",

        "events.title": "Your plans",
        "events.new": "+ Organize",
        "events.upcoming": "Upcoming",
        "events.past": "Past",

        "notifications.title": "Notifications",
        "notifications.markRead": "Mark as read",

        "profile.edit": "Edit profile",
        "profile.friends": "Friends",
        "profile.private": "Private",
        "profile.events": "Events",
        "profile.manageFriends": "Manage friends",
        "profile.privateList": "Private list",
        "profile.privacy": "Privacy & security",
        "profile.settings": "Settings",

        "settings.title": "Settings",
        "settings.privacy": "Privacy",
        "settings.account": "Account",
        "settings.app": "App",
        "settings.availabilityVisibility": "Availability visibility",
        "settings.availabilityDescription": "Choose who can see when you're free.",
        "settings.privateList": "Private list",
        "settings.privateDescription": "Manage people in your private list.",
        "settings.blocked": "Blocked users",
        "settings.blockedDescription": "Manage blocked users.",
        "settings.password": "Password",
        "settings.passwordDescription": "Change your account password.",
        "settings.deleteAccount": "Delete account",
        "settings.deleteDescription": "Permanently delete your account.",
        "settings.language": "Language",
        "settings.theme": "Appearance",
        "settings.notifications": "Notifications",
        "settings.notificationsDescription": "Manage SYNC notifications.",

        "search.placeholder": "Search people..."
    },

    es: {
        "auth.tagline": "Organiza todo juntos.",
        "auth.login.title": "Bienvenido",
        "auth.login.subtitle": "Accede a tu cuenta SYNC.",
        "auth.email": "Correo electrónico",
        "auth.password": "Contraseña",
        "auth.login.button": "Acceder",
        "auth.forgot": "¿Has olvidado tu contraseña?",
        "auth.register": "Crear una cuenta",
        "auth.register.title": "Crea tu cuenta",
        "auth.register.subtitle": "Entra en SYNC y empieza a organizar.",
        "auth.displayName": "Nombre visible",
        "auth.username": "Nombre de usuario",
        "auth.confirmPassword": "Confirmar contraseña",
        "auth.register.button": "Registrarse",
        "auth.haveAccount": "¿Ya tienes una cuenta? Accede",
        "auth.logout": "Cerrar sesión",

        "common.or": "o",
        "common.seeAll": "Ver todo",
        "common.add": "Añadir",
        "common.edit": "Editar",
        "common.loading": "Cargando...",

        "nav.home": "Inicio",
        "nav.friends": "Amigos",
        "nav.calendar": "Calendario",
        "nav.profile": "Perfil",

        "home.title": "¿Qué hacemos?",
        "home.today": "Hoy",
        "home.pending": "Por decidir",
        "home.availability": "Disponibilidad",
        "home.nextFree": "Próximo momento libre",
        "home.manageAvailability": "Gestionar disponibilidad",
        "home.smart.label": "SYNC ha encontrado",
        "home.smart.title": "Un momento libre",
        "home.smart.button": "Organizar algo",

        "quick.event": "Organizar",
        "quick.update": "Actualización",
        "quick.friends": "Amigos",
        "quick.calendar": "Calendario",

        "friends.title": "Amigos",
        "friends.subtitle": "Organiza algo con las personas que conoces.",
        "friends.all": "Todos",
        "friends.private": "Privada",
        "friends.privacy.title": "Decide quién ve qué",
        "friends.privacy.description": "Al publicar algo puedes elegir todos los amigos, tu lista privada o personas concretas.",

        "family.title": "Familia",
        "family.subtitle": "Todos los compromisos y planes familiares.",
        "family.nextFree": "Próximo momento libre para todos",
        "family.everyoneFree": "Todos disponibles",
        "family.organize": "Organizar",
        "family.members": "Miembros",
        "family.commitments": "Compromisos",

        "calendar.title": "Calendario",
        "calendar.add": "+ Compromiso",
        "calendar.visibility": "Visibilidad de disponibilidad",
        "calendar.free": "Libre",
        "calendar.partial": "Parcialmente disponible",
        "calendar.busy": "Ocupado",

        "events.title": "Tus planes",
        "events.new": "+ Organizar",
        "events.upcoming": "Próximos",
        "events.past": "Pasados",

        "notifications.title": "Notificaciones",
        "notifications.markRead": "Marcar como leídas",

        "profile.edit": "Editar perfil",
        "profile.friends": "Amigos",
        "profile.private": "Privada",
        "profile.events": "Eventos",
        "profile.manageFriends": "Gestionar amigos",
        "profile.privateList": "Lista privada",
        "profile.privacy": "Privacidad y seguridad",
        "profile.settings": "Configuración",

        "settings.title": "Configuración",
        "settings.privacy": "Privacidad",
        "settings.account": "Cuenta",
        "settings.app": "App",
        "settings.availabilityVisibility": "Visibilidad de disponibilidad",
        "settings.availabilityDescription": "Decide quién puede ver cuándo estás libre.",
        "settings.privateList": "Lista privada",
        "settings.privateDescription": "Gestiona las personas de tu lista privada.",
        "settings.blocked": "Usuarios bloqueados",
        "settings.blockedDescription": "Gestiona los usuarios bloqueados.",
        "settings.password": "Contraseña",
        "settings.passwordDescription": "Cambia la contraseña.",
        "settings.deleteAccount": "Eliminar cuenta",
        "settings.deleteDescription": "Elimina definitivamente tu cuenta.",
        "settings.language": "Idioma",
        "settings.theme": "Apariencia",
        "settings.notifications": "Notificaciones",
        "settings.notificationsDescription": "Gestiona las notificaciones de SYNC.",

        "search.placeholder": "Buscar personas..."
    },

    fr: {
        "auth.tagline": "Organisez tout ensemble.",
        "auth.login.title": "Bon retour",
        "auth.login.subtitle": "Connectez-vous à votre compte SYNC.",
        "auth.email": "E-mail",
        "auth.password": "Mot de passe",
        "auth.login.button": "Connexion",
        "auth.forgot": "Mot de passe oublié ?",
        "auth.register": "Créer un compte",
        "auth.register.title": "Créez votre compte",
        "auth.register.subtitle": "Rejoignez SYNC et commencez à organiser.",
        "auth.displayName": "Nom affiché",
        "auth.username": "Nom d'utilisateur",
        "auth.confirmPassword": "Confirmer le mot de passe",
        "auth.register.button": "S'inscrire",
        "auth.haveAccount": "Vous avez déjà un compte ? Connexion",
        "auth.logout": "Déconnexion",

        "common.or": "ou",
        "common.seeAll": "Voir tout",
        "common.add": "Ajouter",
        "common.edit": "Modifier",
        "common.loading": "Chargement...",

        "nav.home": "Accueil",
        "nav.friends": "Amis",
        "nav.calendar": "Calendrier",
        "nav.profile": "Profil",

        "home.title": "On fait quoi ?",
        "home.today": "Aujourd'hui",
        "home.pending": "À décider",
        "home.availability": "Disponibilité",
        "home.nextFree": "Prochain moment libre",
        "home.manageAvailability": "Gérer la disponibilité",
        "home.smart.label": "SYNC a trouvé",
        "home.smart.title": "Un moment libre",
        "home.smart.button": "Organiser quelque chose",

        "quick.event": "Organiser",
        "quick.update": "Actualité",
        "quick.friends": "Amis",
        "quick.calendar": "Calendrier",

        "friends.title": "Amis",
        "friends.subtitle": "Organisez quelque chose avec vos amis.",
        "friends.all": "Tous",
        "friends.private": "Privée",
        "friends.privacy.title": "Choisissez qui voit quoi",
        "friends.privacy.description": "Lors d'une publication, choisissez tous vos amis, votre liste privée ou certaines personnes.",

        "family.title": "Famille",
        "family.subtitle": "Tous les engagements et programmes familiaux.",
        "family.nextFree": "Prochain moment libre pour tous",
        "family.everyoneFree": "Tout le monde est disponible",
        "family.organize": "Organiser",
        "family.members": "Membres",
        "family.commitments": "Engagements",

        "calendar.title": "Calendrier",
        "calendar.add": "+ Engagement",
        "calendar.visibility": "Visibilité de la disponibilité",
        "calendar.free": "Libre",
        "calendar.partial": "Partiellement disponible",
        "calendar.busy": "Occupé",

        "events.title": "Vos programmes",
        "events.new": "+ Organiser",
        "events.upcoming": "À venir",
        "events.past": "Passés",

        "notifications.title": "Notifications",
        "notifications.markRead": "Tout marquer comme lu",

        "profile.edit": "Modifier le profil",
        "profile.friends": "Amis",
        "profile.private": "Privée",
        "profile.events": "Événements",
        "profile.manageFriends": "Gérer les amis",
        "profile.privateList": "Liste privée",
        "profile.privacy": "Confidentialité et sécurité",
        "profile.settings": "Paramètres",

        "settings.title": "Paramètres",
        "settings.privacy": "Confidentialité",
        "settings.account": "Compte",
        "settings.app": "Application",
        "settings.availabilityVisibility": "Visibilité de la disponibilité",
        "settings.availabilityDescription": "Choisissez qui peut voir quand vous êtes libre.",
        "settings.privateList": "Liste privée",
        "settings.privateDescription": "Gérez les personnes de votre liste privée.",
        "settings.blocked": "Utilisateurs bloqués",
        "settings.blockedDescription": "Gérez les utilisateurs bloqués.",
        "settings.password": "Mot de passe",
        "settings.passwordDescription": "Modifiez votre mot de passe.",
        "settings.deleteAccount": "Supprimer le compte",
        "settings.deleteDescription": "Supprime définitivement votre compte.",
        "settings.language": "Langue",
        "settings.theme": "Apparence",
        "settings.notifications": "Notifications",
        "settings.notificationsDescription": "Gérez les notifications de SYNC.",

        "search.placeholder": "Rechercher des personnes..."
    }
};


/* =========================================================
   HELPERS
========================================================= */

function saveState() {
    localStorage.setItem(
        "sync_user",
        JSON.stringify(SYNC.state.currentUser)
    );

    localStorage.setItem(
        "sync_friends",
        JSON.stringify(SYNC.state.friends)
    );

    localStorage.setItem(
        "sync_private",
        JSON.stringify(SYNC.state.privateFriends)
    );

    localStorage.setItem(
        "sync_events",
        JSON.stringify(SYNC.state.events)
    );

    localStorage.setItem(
        "sync_commitments",
        JSON.stringify(SYNC.state.commitments)
    );

    localStorage.setItem(
        "sync_notifications",
        JSON.stringify(SYNC.state.notifications)
    );

    localStorage.setItem(
        "sync_availability_visibility",
        SYNC.state.availabilityVisibility
    );
}

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function t(key) {
    return (
        translations[SYNC.state.language]?.[key] ||
        translations.it[key] ||
        key
    );
}

function showToast(message) {
    const container = document.getElementById("toast-container");

    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function setLoading(show) {
    document
        .getElementById("loading-overlay")
        ?.classList.toggle("hidden", !show);
}

function getInitials(name = "") {
    const parts = name.trim().split(/\s+/);

    return parts
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase() || "")
        .join("");
}


/* =========================================================
   LANGUAGE
========================================================= */

function applyLanguage() {

    document.documentElement.lang = SYNC.state.language;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        const translated = t(key);

        if (translated) {
            element.textContent = translated;
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        element.placeholder = t(key);
    });

    const currentLanguage =
        document.getElementById("current-language");

    if (currentLanguage) {
        const names = {
            it: "Italiano",
            en: "English",
            es: "Español",
            fr: "Français"
        };

        currentLanguage.textContent =
            names[SYNC.state.language];
    }
}

function changeLanguage() {

    openModal(`
        <h2>🌍 ${t("settings.language")}</h2>

        <p class="modal-subtitle">
            Scegli la lingua di SYNC.
        </p>

        <div class="choice-list">

            ${[
                ["it", "🇮🇹 Italiano"],
                ["en", "🇬🇧 English"],
                ["es", "🇪🇸 Español"],
                ["fr", "🇫🇷 Français"]
            ].map(([code, name]) => `
                <label class="choice-item ${
                    SYNC.state.language === code ? "selected" : ""
                }">
                    <input
                        type="radio"
                        name="language"
                        value="${code}"
                        ${
                            SYNC.state.language === code
                                ? "checked"
                                : ""
                        }
                    >
                    <span>${name}</span>
                </label>
            `).join("")}

        </div>

        <div class="modal-actions">
            <button
                class="primary-button"
                data-modal-action="save-language"
            >
                ${t("common.edit")}
            </button>
        </div>
    `);
}


/* =========================================================
   THEME
========================================================= */

function applyTheme() {

    let dark = false;

    if (SYNC.state.theme === "dark") {
        dark = true;
    }

    if (
        SYNC.state.theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        dark = true;
    }

    document.body.classList.toggle("dark", dark);

    const currentTheme =
        document.getElementById("current-theme");

    if (currentTheme) {
        const names = {
            system: "Sistema",
            light: "Chiaro",
            dark: "Scuro"
        };

        currentTheme.textContent =
            names[SYNC.state.theme];
    }
}

function toggleTheme() {

    const order = ["system", "light", "dark"];

    const index = order.indexOf(SYNC.state.theme);

    SYNC.state.theme =
        order[(index + 1) % order.length];

    localStorage.setItem(
        "sync_theme",
        SYNC.state.theme
    );

    applyTheme();

    showToast(
        `Aspetto: ${
            SYNC.state.theme === "system"
                ? "Sistema"
                : SYNC.state.theme === "light"
                    ? "Chiaro"
                    : "Scuro"
        }`
    );
}


/* =========================================================
   AUTH
========================================================= */

function showAuthView(view) {

    document
        .getElementById("login-view")
        ?.classList.toggle(
            "hidden",
            view !== "login"
        );

    document
        .getElementById("register-view")
        ?.classList.toggle(
            "hidden",
            view !== "register"
        );
}

function updateAuthState() {

    const authScreen =
        document.getElementById("auth-screen");

    const mainApp =
        document.getElementById("main-app");

    const loggedIn =
        Boolean(SYNC.state.currentUser);

    authScreen?.classList.toggle(
        "hidden",
        loggedIn
    );

    mainApp?.classList.toggle(
        "hidden",
        !loggedIn
    );

    if (loggedIn) {
        updateProfileUI();
        updateHeader();
        renderAll();
    }
}

function register(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const data = new FormData(form);

    const displayName =
        String(data.get("displayName") || "").trim();

    const username =
        String(data.get("username") || "")
            .trim()
            .replace(/^@/, "");

    const email =
        String(data.get("email") || "")
            .trim()
            .toLowerCase();

    const password =
        String(data.get("password") || "");

    const confirm =
        String(data.get("passwordConfirm") || "");

    if (
        !displayName ||
        !username ||
        !email ||
        !password
    ) {
        showToast("Compila tutti i campi.");
        return;
    }

    if (password.length < 8) {
        showToast(
            "La password deve contenere almeno 8 caratteri."
        );
        return;
    }

    if (password !== confirm) {
        showToast("Le password non coincidono.");
        return;
    }

    /*
        DEMO LOCALE:
        il backend reale sostituirà questa parte.
    */

    SYNC.state.currentUser = {
        id: crypto.randomUUID(),
        displayName,
        username,
        email,
        bio: "",
        avatar: "👤",
        createdAt: new Date().toISOString()
    };

    saveState();

    showToast("Account creato!");

    updateAuthState();
}

function login(event) {

    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const email =
        String(data.get("email") || "")
            .trim()
            .toLowerCase();

    if (!email) {
        showToast("Inserisci la tua email.");
        return;
    }

    /*
        DEMO LOCALE.
        L'autenticazione reale sarà gestita dal Worker/backend.
    */

    if (!SYNC.state.currentUser) {
        SYNC.state.currentUser = {
            id: crypto.randomUUID(),
            displayName: "Nuovo utente",
            username: "syncuser",
            email,
            bio: "",
            avatar: "👤"
        };

        saveState();
    }

    updateAuthState();

    showToast("Accesso effettuato.");
}

function logout() {

    SYNC.state.currentUser = null;

    saveState();

    updateAuthState();

    showAuthView("login");

    showToast("Sei uscito da SYNC.");
}

function forgotPassword() {

    openModal(`
        <h2>🔑 Password dimenticata</h2>

        <p class="modal-subtitle">
            Inserisci la tua email e ti invieremo le istruzioni
            per recuperare l'accesso.
        </p>

        <form class="modal-form" id="forgot-form">

            <label>Email</label>

            <input
                type="email"
                name="email"
                required
            >

            <div class="modal-actions">
                <button
                    type="submit"
                    class="primary-button"
                >
                    Invia
                </button>
            </div>

        </form>
    `);
}


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page) {

    const validPages = [
        "home",
        "friends",
        "family",
        "calendar",
        "events",
        "notifications",
        "profile",
        "settings",
        "search"
    ];

    if (!validPages.includes(page)) {
        page = "home";
    }

    SYNC.state.currentPage = page;

    document.querySelectorAll(".page").forEach(element => {
        element.classList.toggle(
            "active",
            element.dataset.page === page
        );
    });

    document.querySelectorAll("[data-page-target]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.pageTarget === page
        );
    });

    if (page === "friends") {
        renderFriends();
    }

    if (page === "calendar") {
        renderCalendar();
    }

    if (page === "events") {
        renderEvents();
    }

    if (page === "notifications") {
        renderNotifications();
    }

    if (page === "profile") {
        updateProfileUI();
    }
}


/* =========================================================
   PROFILE
========================================================= */

function updateHeader() {

    const avatar =
        document.getElementById("header-avatar");

    if (!avatar) return;

    avatar.textContent =
        SYNC.state.currentUser?.avatar || "👤";
}

function updateProfileUI() {

    const user = SYNC.state.currentUser;

    if (!user) return;

    const name =
        document.getElementById("profile-display-name");

    const username =
        document.getElementById("profile-username");

    const bio =
        document.getElementById("profile-bio");

    const avatar =
        document.getElementById("profile-avatar");

    if (name) name.textContent = user.displayName;

    if (username) {
        username.textContent =
            `@${user.username}`;
    }

    if (bio) {
        bio.textContent =
            user.bio || "Aggiungi una bio al tuo profilo.";
    }

    if (avatar) {
        avatar.textContent =
            user.avatar || getInitials(user.displayName);
    }

    const friendsCount =
        document.getElementById("profile-friends-count");

    const privateCount =
        document.getElementById("profile-private-count");

    const eventsCount =
        document.getElementById("profile-events-count");

    if (friendsCount) {
        friendsCount.textContent =
            SYNC.state.friends.length;
    }

    if (privateCount) {
        privateCount.textContent =
            SYNC.state.privateFriends.length;
    }

    if (eventsCount) {
        eventsCount.textContent =
            SYNC.state.events.length;
    }
}

function editProfile() {

    const user = SYNC.state.currentUser;

    openModal(`
        <h2>👤 Modifica profilo</h2>

        <p class="modal-subtitle">
            Personalizza ciò che vedono gli altri.
        </p>

        <form class="modal-form" id="profile-form">

            <label>Nome visualizzato</label>

            <input
                name="displayName"
                maxlength="40"
                value="${escapeHTML(user.displayName)}"
                required
            >

            <label>Nome utente</label>

            <input
                name="username"
                maxlength="30"
                value="@${escapeHTML(user.username)}"
                required
            >

            <label>Bio</label>

            <textarea
                name="bio"
                maxlength="160"
            >${escapeHTML(user.bio || "")}</textarea>

            <div class="modal-actions">
                <button
                    class="primary-button"
                    type="submit"
                >
                    Salva
                </button>
            </div>

        </form>
    `);
}


/* =========================================================
   FRIENDS
========================================================= */

function renderFriends() {

    const container =
        document.getElementById("friends-list");

    if (!container) return;

    const list =
        SYNC.state.friends.filter(friend => {

            if (SYNC.state.friendsTab === "private") {
                return SYNC.state.privateFriends
                    .includes(friend.id);
            }

            return true;
        });

    if (!list.length) {

        container.innerHTML = `
            <div class="info-card">
                <span>👥</span>
                <div>
                    <strong>
                        ${
                            SYNC.state.friendsTab === "private"
                                ? "La tua privata è vuota"
                                : "Non hai ancora amici"
                        }
                    </strong>
                    <p>
                        Aggiungi persone per iniziare a organizzare.
                    </p>
                </div>
            </div>
        `;

        return;
    }

    container.innerHTML = list.map(friend => {

        const isPrivate =
            SYNC.state.privateFriends
                .includes(friend.id);

        return `
            <article class="person-card">

                <div class="person-avatar">
                    ${escapeHTML(friend.avatar || "👤")}
                </div>

                <div class="person-info">

                    <strong>
                        ${escapeHTML(friend.displayName)}
                    </strong>

                    <span>
                        @${escapeHTML(friend.username)}
                        ${isPrivate ? " · 🔒 Privata" : ""}
                    </span>

                </div>

                <div class="person-actions">

                    <button
                        class="icon-button"
                        data-friend-action="toggle-private"
                        data-friend-id="${friend.id}"
                        aria-label="Privata"
                    >
                        ${isPrivate ? "🔒" : "♡"}
                    </button>

                </div>

            </article>
        `;

    }).join("");
}

function togglePrivateFriend(id) {

    const index =
        SYNC.state.privateFriends.indexOf(id);

    if (index >= 0) {

        SYNC.state.privateFriends.splice(index, 1);

        showToast("Rimosso dalla privata.");

    } else {

        SYNC.state.privateFriends.push(id);

        showToast("Aggiunto alla privata.");
    }

    saveState();

    renderFriends();

    updateProfileUI();
}

function addFriend() {

    openModal(`
        <h2>👥 Aggiungi amico</h2>

        <p class="modal-subtitle">
            Cerca una persona oppure condividi il tuo invito.
        </p>

        <div class="modal-actions">

            <button
                class="primary-button"
                data-modal-action="search-friend"
            >
                🔎 Cerca
            </button>

            <button
                class="secondary-button"
                data-modal-action="invite-friend"
            >
                🔗 Invita
            </button>

        </div>
    `);
}

function inviteFriend() {

    const user =
        SYNC.state.currentUser;

    const link =
        `${window.location.origin}${window.location.pathname}?invite=${encodeURIComponent(user.username)}`;

    openModal(`
        <h2>🔗 Invita un amico</h2>

        <p class="modal-subtitle">
            Condividi questo invito.
        </p>

        <input
            id="invite-link"
            readonly
            value="${escapeHTML(link)}"
        >

        <div class="modal-actions">

            <button
                class="primary-button"
                data-modal-action="copy-invite"
            >
                Copia link
            </button>

            <button
                class="secondary-button"
                data-modal-action="native-share"
            >
                Condividi
            </button>

        </div>
    `);
}

function searchFriend() {

    openModal(`
        <h2>🔎 Cerca amici</h2>

        <p class="modal-subtitle">
            Cerca per nome o nome utente.
        </p>

        <input
            id="friend-search-input"
            type="search"
            placeholder="Nome o @username..."
            autocomplete="off"
        >

        <div
            id="friend-search-results"
            class="people-list"
            style="margin-top:15px"
        >
        </div>
    `);

    setTimeout(() => {

        document
            .getElementById("friend-search-input")
            ?.focus();

    }, 50);
}


/* =========================================================
   CREATE EVENT
========================================================= */

function createEvent() {

    const friends = SYNC.state.friends;

    openModal(`
        <h2>🎯 Organizza qualcosa</h2>

        <p class="modal-subtitle">
            Crea un programma e scegli esattamente chi coinvolgere.
        </p>

        <form
            id="event-form"
            class="modal-form"
        >

            <label>Titolo</label>

            <input
                name="title"
                placeholder="Es. Cinema sabato"
                required
                maxlength="80"
            >

            <label>Data</label>

            <input
                type="date"
                name="date"
                required
            >

            <label>Ora</label>

            <input
                type="time"
                name="time"
                required
            >

            <label>Luogo</label>

            <input
                name="location"
                placeholder="Es. Cinema Moderno"
            >

            <label>Budget per persona</label>

            <input
                type="number"
                name="budget"
                min="0"
                step="0.50"
                placeholder="30"
            >

            <label>Chi vuoi invitare?</label>

            <div class="choice-list">

                <label class="choice-item">
                    <input
                        type="radio"
                        name="audience"
                        value="all"
                        checked
                    >
                    <span>👥 Tutti gli amici</span>
                </label>

                <label class="choice-item">
                    <input
                        type="radio"
                        name="audience"
                        value="private"
                    >
                    <span>🔒 Privata</span>
                </label>

                <label class="choice-item">
                    <input
                        type="radio"
                        name="audience"
                        value="selected"
                    >
                    <span>☑️ Seleziona persone</span>
                </label>

            </div>

            <div
                id="event-people-selection"
                class="choice-list"
            >
                ${
                    friends.map(friend => `
                        <label class="choice-item">

                            <input
                                type="checkbox"
                                name="selectedPeople"
                                value="${friend.id}"
                            >

                            <span>
                                ${escapeHTML(friend.displayName)}
                            </span>

                        </label>
                    `).join("")
                }
            </div>

            <label>Descrizione</label>

            <textarea
                name="description"
                placeholder="Aggiungi qualche dettaglio..."
            ></textarea>

            <div class="modal-actions">

                <button
                    type="submit"
                    class="primary-button"
                >
                    Crea programma
                </button>

            </div>

        </form>
    `);
}

function submitEvent(event) {

    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const audience =
        data.get("audience");

    let participants = [];

    if (audience === "all") {

        participants =
            SYNC.state.friends.map(friend => friend.id);

    } else if (audience === "private") {

        participants =
            [...SYNC.state.privateFriends];

    } else {

        participants =
            data.getAll("selectedPeople");
    }

    const newEvent = {

        id: crypto.randomUUID(),

        title:
            String(data.get("title") || "").trim(),

        date:
            String(data.get("date") || ""),

        time:
            String(data.get("time") || ""),

        location:
            String(data.get("location") || "").trim(),

        budget:
            Number(data.get("budget") || 0),

        description:
            String(data.get("description") || "").trim(),

        audience,

        participants,

        status: "pending",

        createdBy:
            SYNC.state.currentUser.id,

        createdAt:
            new Date().toISOString()
    };

    if (!newEvent.title || !newEvent.date) {
        showToast("Inserisci almeno titolo e data.");
        return;
    }

    SYNC.state.events.unshift(newEvent);

    saveState();

    closeModal();

    renderEvents();

    updateProfileUI();

    showToast("Programma creato!");
}


/* =========================================================
   EVENTS
========================================================= */

function renderEvents() {

    const container =
        document.getElementById("events-list");

    if (!container) return;

    const now =
        new Date();

    let events =
        [...SYNC.state.events];

    events = events.filter(event => {

        const eventDate =
            new Date(
                `${event.date}T${event.time || "23:59"}`
            );

        return SYNC.state.eventFilter === "upcoming"
            ? eventDate >= now
            : eventDate < now;
    });

    if (!events.length) {

        container.innerHTML = `
            <div class="info-card">
                <span>🎯</span>

                <div>
                    <strong>
                        Nessun programma
                    </strong>

                    <p>
                        Organizza qualcosa con i tuoi amici.
                    </p>
                </div>
            </div>
        `;

        return;
    }

    container.innerHTML =
        events.map(event => {

            const date =
                new Date(
                    `${event.date}T${event.time || "00:00"}`
                );

            const dateText =
                date.toLocaleDateString(
                    SYNC.state.language,
                    {
                        weekday: "long",
                        day: "numeric",
                        month: "long"
                    }
                );

            const participants =
                event.participants?.length || 0;

            return `
                <article class="event-card">

                    <div class="event-card-header">

                        <div>
                            <h3>
                                ${escapeHTML(event.title)}
                            </h3>

                            <span class="muted">
                                ${escapeHTML(dateText)}
                            </span>
                        </div>

                        <span class="event-status ${
                            event.status === "confirmed"
                                ? "confirmed"
                                : "pending"
                        }">
                            ${
                                event.status === "confirmed"
                                    ? "Confermato"
                                    : "Da decidere"
                            }
                        </span>

                    </div>

                    <div class="event-card-meta">

                        <span>
                            🕐 ${escapeHTML(event.time || "—")}
                        </span>

                        <span>
                            📍 ${
                                escapeHTML(
                                    event.location || "Luogo da decidere"
                                )
                            }
                        </span>

                        <span>
                            👥 ${participants} invitati
                        </span>

                        ${
                            event.budget
                                ? `<span>💰 ${event.budget}€ a persona</span>`
                                : ""
                        }

                    </div>

                    <div class="event-card-footer">

                        <button
                            class="secondary-button compact"
                            data-event-action="open"
                            data-event-id="${event.id}"
                        >
                            Apri
                        </button>

                        <button
                            class="text-button"
                            data-event-action="delete"
                            data-event-id="${event.id}"
                        >
                            Elimina
                        </button>

                    </div>

                </article>
            `;

        }).join("");
}


/* =========================================================
   CALENDAR
========================================================= */

function renderCalendar() {

    const grid =
        document.getElementById("calendar-grid");

    if (!grid) return;

    const hours = [];

    for (let hour = 8; hour <= 23; hour++) {
        hours.push(hour);
    }

    const today =
        new Date();

    const dateString =
        today.toISOString().split("T")[0];

    const dayCommitments =
        SYNC.state.commitments.filter(
            commitment =>
                commitment.date === dateString
        );

    grid.innerHTML =
        hours.map(hour => {

            const commitment =
                dayCommitments.find(item => {

                    const start =
                        Number(
                            item.time?.split(":")[0]
                        );

                    const end =
                        Number(
                            item.endTime?.split(":")[0]
                        );

                    return (
                        hour >= start &&
                        hour < end
                    );
                });

            return `
                <div class="calendar-row">

                    <div class="calendar-time">
                        ${String(hour).padStart(2, "0")}:00
                    </div>

                    <div class="calendar-slot">

                        ${
                            commitment
                                ? `
                                    <div class="calendar-event">
                                        ${escapeHTML(
                                            commitment.title
                                        )}
                                    </div>
                                `
                                : ""
                        }

                    </div>

                </div>
            `;

        }).join("");
}

function createCommitment() {

    openModal(`
        <h2>📅 Nuovo impegno</h2>

        <p class="modal-subtitle">
            Inserisci un impegno nel tuo calendario.
        </p>

        <form
            class="modal-form"
            id="commitment-form"
        >

            <label>Titolo</label>

            <input
                name="title"
                placeholder="Es. Allenamento"
                required
            >

            <label>Data</label>

            <input
                name="date"
                type="date"
                required
            >

            <label>Inizio</label>

            <input
                name="time"
                type="time"
                required
            >

            <label>Fine</label>

            <input
                name="endTime"
                type="time"
                required
            >

            <label>Disponibilità</label>

            <select name="availability">
                <option value="busy">
                    🔴 Occupato
                </option>

                <option value="partial">
                    🟡 Parzialmente disponibile
                </option>
            </select>

            <label>Visibilità dettagli</label>

            <select name="visibility">
                <option value="busy-only">
                    Mostra solo occupato
                </option>

                <option value="details">
                    Mostra dettagli
                </option>
            </select>

            <div class="modal-actions">

                <button
                    type="submit"
                    class="primary-button"
                >
                    Salva impegno
                </button>

            </div>

        </form>
    `);
}

function submitCommitment(event) {

    event.preventDefault();

    const data =
        new FormData(event.currentTarget);

    const commitment = {

        id: crypto.randomUUID(),

        title:
            String(data.get("title") || "").trim(),

        date:
            String(data.get("date") || ""),

        time:
            String(data.get("time") || ""),

        endTime:
            String(data.get("endTime") || ""),

        availability:
            String(data.get("availability")),

        visibility:
            String(data.get("visibility")),

        createdBy:
            SYNC.state.currentUser.id
    };

    SYNC.state.commitments.push(commitment);

    saveState();

    closeModal();

    renderCalendar();

    showToast("Impegno salvato.");
}


/* =========================================================
   AVAILABILITY PRIVACY
========================================================= */

function manageAvailabilityVisibility() {

    const current =
        SYNC.state.availabilityVisibility;

    openModal(`
        <h2>👁️ Visibilità disponibilità</h2>

        <p class="modal-subtitle">
            Decidi chi può sapere se sei libero o occupato.
        </p>

        <div class="choice-list">

            <label class="choice-item">
                <input
                    type="radio"
                    name="availabilityVisibility"
                    value="all"
                    ${current === "all" ? "checked" : ""}
                >
                <span>👥 Tutti gli amici</span>
            </label>

            <label class="choice-item">
                <input
                    type="radio"
                    name="availabilityVisibility"
                    value="private"
                    ${current === "private" ? "checked" : ""}
                >
                <span>🔒 Solo privata</span>
            </label>

            <label class="choice-item">
                <input
                    type="radio"
                    name="availabilityVisibility"
                    value="selected"
                    ${current === "selected" ? "checked" : ""}
                >
                <span>☑️ Persone selezionate</span>
            </label>

            <label class="choice-item">
                <input
                    type="radio"
                    name="availabilityVisibility"
                    value="none"
                    ${current === "none" ? "checked" : ""}
                >
                <span>🚫 Nessuno</span>
            </label>

        </div>

        <div class="modal-actions">

            <button
                class="primary-button"
                data-modal-action="save-availability-visibility"
            >
                Salva
            </button>

        </div>
    `);
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function renderNotifications() {

    const container =
        document.getElementById("notifications-list");

    if (!container) return;

    if (!SYNC.state.notifications.length) {

        container.innerHTML = `
            <div class="info-card">
                <span>🔔</span>

                <div>
                    <strong>
                        Nessuna notifica
                    </strong>

                    <p>
                        Qui troverai richieste, eventi,
                        votazioni e aggiornamenti.
                    </p>
                </div>
            </div>
        `;

        updateNotificationBadge();

        return;
    }

    container.innerHTML =
        SYNC.state.notifications.map(notification => `

            <article class="notification-item ${
                notification.read ? "" : "unread"
            }">

                <div class="notification-icon">
                    ${escapeHTML(
                        notification.icon || "🔔"
                    )}
                </div>

                <div class="notification-content">

                    <strong>
                        ${escapeHTML(
                            notification.title
                        )}
                    </strong>

                    <p>
                        ${escapeHTML(
                            notification.message
                        )}
                    </p>

                    <time>
                        ${new Date(
                            notification.createdAt
                        ).toLocaleString(
                            SYNC.state.language
                        )}
                    </time>

                </div>

            </article>

        `).join("");

    updateNotificationBadge();
}

function markNotificationsRead() {

    SYNC.state.notifications =
        SYNC.state.notifications.map(
            notification => ({
                ...notification,
                read: true
            })
        );

    saveState();

    renderNotifications();

    showToast("Notifiche segnate come lette.");
}

function updateNotificationBadge() {

    const badge =
        document.getElementById(
            "notification-badge"
        );

    if (!badge) return;

    const unread =
        SYNC.state.notifications
            .filter(item => !item.read)
            .length;

    badge.textContent = unread;

    badge.classList.toggle(
        "hidden",
        unread === 0
    );
}


/* =========================================================
   UPDATES / POSTS
========================================================= */

function createUpdate() {

    const friends =
        SYNC.state.friends;

    openModal(`
        <h2>💬 Nuovo aggiornamento</h2>

        <p class="modal-subtitle">
            Scrivi qualcosa e scegli esattamente chi deve riceverlo.
        </p>

        <form
            class="modal-form"
            id="update-form"
        >

            <label>Messaggio</label>

            <textarea
                name="message"
                maxlength="500"
                placeholder="Es. Voglio andare al cinema sabato..."
                required
            ></textarea>

            <label>Chi può vederlo?</label>

            <div class="choice-list">

                <label class="choice-item">
                    <input
                        type="radio"
                        name="audience"
                        value="all"
                        checked
                    >
                    <span>👥 Tutti gli amici</span>
                </label>

                <label class="choice-item">
                    <input
                        type="radio"
                        name="audience"
                        value="private"
                    >
                    <span>🔒 Privata</span>
                </label>

                <label class="choice-item">
                    <input
                        type="radio"
                        name="audience"
                        value="selected"
                    >
                    <span>☑️ Seleziona persone</span>
                </label>

            </div>

            <div class="choice-list">

                ${friends.map(friend => `
                    <label class="choice-item">

                        <input
                            type="checkbox"
                            name="selectedPeople"
                            value="${friend.id}"
                        >

                        <span>
                            ${escapeHTML(
                                friend.displayName
                            )}
                        </span>

                    </label>
                `).join("")}

            </div>

            <div class="modal-actions">

                <button
                    type="submit"
                    class="primary-button"
                >
                    Pubblica
                </button>

            </div>

        </form>
    `);
}

function submitUpdate(event) {

    event.preventDefault();

    const data =
        new FormData(event.currentTarget);

    const audience =
        data.get("audience");

    let recipients = [];

    if (audience === "all") {

        recipients =
            SYNC.state.friends.map(
                friend => friend.id
            );

    } else if (audience === "private") {

        recipients =
            [...SYNC.state.privateFriends];

    } else {

        recipients =
            data.getAll("selectedPeople");
    }

    /*
        Qui in produzione l'update verrà inviato al backend.
    */

    closeModal();

    showToast(
        `Aggiornamento inviato a ${recipients.length} persone.`
    );
}


/* =========================================================
   SMART HOME
========================================================= */

function createFromFreeTime() {
    createEvent();
}


/* =========================================================
   SEARCH
========================================================= */

function openSearch() {
    navigate("search");

    setTimeout(() => {
        document
            .getElementById("global-search")
            ?.focus();
    }, 100);
}

function performSearch(query) {

    const container =
        document.getElementById("search-results");

    if (!container) return;

    query =
        query.trim().toLowerCase();

    if (!query) {

        container.innerHTML = `
            <div class="info-card">
                <span>🔎</span>

                <div>
                    <strong>
                        Cerca una persona
                    </strong>

                    <p>
                        Usa nome visualizzato o @username.
                    </p>
                </div>
            </div>
        `;

        return;
    }

    const results =
        SYNC.state.friends.filter(friend => {

            const name =
                friend.displayName.toLowerCase();

            const username =
                friend.username.toLowerCase();

            return (
                name.includes(query) ||
                username.includes(
                    query.replace(/^@/, "")
                )
            );
        });

    if (!results.length) {

        container.innerHTML = `
            <div class="info-card">
                <span>🔎</span>

                <div>
                    <strong>
                        Nessun risultato
                    </strong>

                    <p>
                        Prova con un altro nome.
                    </p>
                </div>
            </div>
        `;

        return;
    }

    container.innerHTML =
        results.map(friend => `

            <article class="person-card">

                <div class="person-avatar">
                    ${escapeHTML(
                        friend.avatar || "👤"
                    )}
                </div>

                <div class="person-info">

                    <strong>
                        ${escapeHTML(
                            friend.displayName
                        )}
                    </strong>

                    <span>
                        @${escapeHTML(
                            friend.username
                        )}
                    </span>

                </div>

            </article>

        `).join("");
}


/* =========================================================
   MODALS
========================================================= */

function openModal(content) {

    const modal =
        document.getElementById("global-modal");

    const body =
        document.getElementById("modal-body");

    if (!modal || !body) return;

    body.innerHTML = content;

    modal.classList.remove("hidden");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closeModal() {

    const modal =
        document.getElementById("global-modal");

    modal?.classList.add("hidden");

    modal?.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   MODAL ACTIONS
========================================================= */

async function handleModalAction(action) {

    switch (action) {

        case "save-language": {

            const selected =
                document.querySelector(
                    'input[name="language"]:checked'
                );

            if (!selected) return;

            SYNC.state.language =
                selected.value;

            localStorage.setItem(
                "sync_language",
                SYNC.state.language
            );

            applyLanguage();

            closeModal();

            showToast("Lingua aggiornata.");

            break;
        }

        case "save-availability-visibility": {

            const selected =
                document.querySelector(
                    'input[name="availabilityVisibility"]:checked'
                );

            if (!selected) return;

            SYNC.state.availabilityVisibility =
                selected.value;

            saveState();

            closeModal();

            updateAvailabilityVisibilityUI();

            showToast(
                "Visibilità disponibilità aggiornata."
            );

            break;
        }

        case "copy-invite": {

            const input =
                document.getElementById(
                    "invite-link"
                );

            if (!input) return;

            try {

                await navigator.clipboard.writeText(
                    input.value
                );

                showToast("Link copiato.");

            } catch {

                input.select();

                document.execCommand("copy");

                showToast("Link copiato.");
            }

            break;
        }

        case "native-share": {

            const user =
                SYNC.state.currentUser;

            const link =
                `${window.location.origin}${window.location.pathname}?invite=${encodeURIComponent(user.username)}`;

            if (navigator.share) {

                await navigator.share({
                    title: "Invito SYNC",
                    text: `${user.displayName} ti ha invitato su SYNC.`,
                    url: link
                });

            } else {

                showToast(
                    "La condivisione non è disponibile su questo dispositivo."
                );
            }

            break;
        }

        case "search-friend":
            searchFriend();
            break;

        case "invite-friend":
            inviteFriend();
            break;
    }
}

function updateAvailabilityVisibilityUI() {

    const element =
        document.getElementById(
            "availability-visibility"
        );

    if (!element) return;

    const labels = {

        all: "👥 Tutti gli amici",

        friends: "👥 Tutti gli amici",

        private: "🔒 Solo privata",

        selected: "☑️ Persone selezionate",

        none: "🚫 Nessuno"
    };

    element.textContent =
        labels[
            SYNC.state.availabilityVisibility
        ] || labels.friends;
}


/* =========================================================
   GLOBAL RENDER
========================================================= */

function renderAll() {

    applyLanguage();

    applyTheme();

    updateHeader();

    updateProfileUI();

    renderFriends();

    renderCalendar();

    renderEvents();

    renderNotifications();

    updateAvailabilityVisibilityUI();
}


/* =========================================================
   SAMPLE DATA
========================================================= */

function createSampleDataIfNeeded() {

    if (
        SYNC.state.currentUser &&
        SYNC.state.friends.length === 0
    ) {

        SYNC.state.friends = [

            {
                id: "friend-1",
                displayName: "Luca",
                username: "luca",
                avatar: "👨🏻"
            },

            {
                id: "friend-2",
                displayName: "Giulia",
                username: "giulia",
                avatar: "👩🏻"
            },

            {
                id: "friend-3",
                displayName: "Marco",
                username: "marco",
                avatar: "👨🏼"
            },

            {
                id: "friend-4",
                displayName: "Andrea",
                username: "andrea",
                avatar: "👨🏽"
            }
        ];

        SYNC.state.privateFriends = [
            "friend-1",
            "friend-2"
        ];

        SYNC.state.notifications = [

            {
                id: "notification-1",
                icon: "🎬",
                title: "Cinema sabato",
                message: "Hai una votazione da completare.",
                read: false,
                createdAt: new Date().toISOString()
            },

            {
                id: "notification-2",
                icon: "👥",
                title: "Nuovo amico",
                message: "Hai una nuova richiesta.",
                read: false,
                createdAt: new Date().toISOString()
            }

        ];

        saveState();
    }
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

document.addEventListener("click", async event => {

    const actionElement =
        event.target.closest("[data-action]");

    if (actionElement) {

        const action =
            actionElement.dataset.action;

        switch (action) {

            case "show-register":
                showAuthView("register");
                break;

            case "show-login":
                showAuthView("login");
                break;

            case "forgot-password":
                forgotPassword();
                break;

            case "logout":
                logout();
                break;

            case "open-profile":
                navigate("profile");
                break;

            case "open-notifications":
                navigate("notifications");
                break;

            case "open-search":
                openSearch();
                break;

            case "create-event":
                createEvent();
                break;

            case "create-update":
                createUpdate();
                break;

            case "create-from-free-time":
                createFromFreeTime();
                break;

            case "open-friends":
                navigate("friends");
                break;

            case "open-calendar":
                navigate("calendar");
                break;

            case "open-availability":
                navigate("calendar");
                break;

            case "add-friend":
                addFriend();
                break;

            case "open-private-list":
                navigate("friends");
                SYNC.state.friendsTab = "private";
                renderFriends();
                break;

            case "open-privacy":
                navigate("settings");
                break;

            case "open-settings":
                navigate("settings");
                break;

            case "manage-availability-visibility":
                manageAvailabilityVisibility();
                break;

            case "toggle-theme":
                toggleTheme();
                break;

            case "change-language":
                changeLanguage();
                break;

            case "notification-settings":
                showToast(
                    "Le impostazioni notifiche saranno collegate al backend."
                );
                break;

            case "edit-profile":
                editProfile();
                break;

            case "change-password":
                showToast(
                    "Il cambio password sarà gestito dal backend."
                );
                break;

            case "delete-account":
                confirmDeleteAccount();
                break;

            case "open-blocked-users":
                showToast(
                    "Gestione blocchi pronta per il backend."
                );
                break;

            case "mark-notifications-read":
                markNotificationsRead();
                break;

            case "create-commitment":
                createCommitment();
                break;

            case "create-family-event":
                createEvent();
                break;

            case "add-family-member":
                addFriend();
                break;

            case "family-settings":
                showToast(
                    "Impostazioni famiglia."
                );
                break;

            case "previous-day":
                showToast("Giorno precedente.");
                break;

            case "next-day":
                showToast("Giorno successivo.");
                break;

            case "go-back":
                navigate("home");
                break;

            case "close-modal":
                closeModal();
                break;
        }
    }


    const pageTarget =
        event.target.closest("[data-page-target]");

    if (pageTarget) {

        navigate(
            pageTarget.dataset.pageTarget
        );
    }


    const friendAction =
        event.target.closest("[data-friend-action]");

    if (friendAction) {

        if (
            friendAction.dataset.friendAction ===
            "toggle-private"
        ) {

            togglePrivateFriend(
                friendAction.dataset.friendId
            );
        }
    }


    const friendsTab =
        event.target.closest("[data-friends-tab]");

    if (friendsTab) {

        SYNC.state.friendsTab =
            friendsTab.dataset.friendsTab;

        document
            .querySelectorAll("[data-friends-tab]")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button === friendsTab
                );

            });

        renderFriends();
    }


    const eventFilter =
        event.target.closest("[data-event-filter]");

    if (eventFilter) {

        SYNC.state.eventFilter =
            eventFilter.dataset.eventFilter;

        document
            .querySelectorAll("[data-event-filter]")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button === eventFilter
                );

            });

        renderEvents();
    }


    const eventAction =
        event.target.closest("[data-event-action]");

    if (eventAction) {

        const id =
            eventAction.dataset.eventId;

        if (
            eventAction.dataset.eventAction ===
            "delete"
        ) {

            deleteEvent(id);
        }

        if (
            eventAction.dataset.eventAction ===
            "open"
        ) {

            openEvent(id);
        }
    }


    const modalAction =
        event.target.closest("[data-modal-action]");

    if (modalAction) {

        await handleModalAction(
            modalAction.dataset.modalAction
        );
    }
});


/* =========================================================
   FORMS
========================================================= */

document.addEventListener("submit", event => {

    switch (event.target.id) {

        case "login-form":
            login(event);
            break;

        case "register-form":
            register(event);
            break;

        case "forgot-form":

            event.preventDefault();

            closeModal();

            showToast(
                "Se il tuo account esiste, riceverai le istruzioni."
            );

            break;

        case "profile-form":

            event.preventDefault();

            {

                const data =
                    new FormData(event.target);

                SYNC.state.currentUser.displayName =
                    String(
                        data.get("displayName") || ""
                    ).trim();

                SYNC.state.currentUser.username =
                    String(
                        data.get("username") || ""
                    )
                        .trim()
                        .replace(/^@/, "");

                SYNC.state.currentUser.bio =
                    String(
                        data.get("bio") || ""
                    ).trim();

                saveState();

                updateProfileUI();

                closeModal();

                showToast(
                    "Profilo aggiornato."
                );
            }

            break;

        case "event-form":
            submitEvent(event);
            break;

        case "commitment-form":
            submitCommitment(event);
            break;

        case "update-form":
            submitUpdate(event);
            break;
    }
});


/* =========================================================
   SEARCH INPUTS
========================================================= */

document.addEventListener("input", event => {

    if (
        event.target.id ===
        "global-search"
    ) {

        performSearch(
            event.target.value
        );
    }

    if (
        event.target.id ===
        "friend-search-input"
    ) {

        const query =
            event.target.value
                .trim()
                .toLowerCase();

        const container =
            document.getElementById(
                "friend-search-results"
            );

        if (!container) return;

        const results =
            SYNC.state.friends.filter(friend =>
                friend.displayName
                    .toLowerCase()
                    .includes(query) ||
                friend.username
                    .toLowerCase()
                    .includes(
                        query.replace(/^@/, "")
                    )
            );

        container.innerHTML =
            results.map(friend => `

                <article class="person-card">

                    <div class="person-avatar">
                        ${escapeHTML(
                            friend.avatar || "👤"
                        )}
                    </div>

                    <div class="person-info">

                        <strong>
                            ${escapeHTML(
                                friend.displayName
                            )}
                        </strong>

                        <span>
                            @${escapeHTML(
                                friend.username
                            )}
                        </span>

                    </div>

                    <button
                        class="primary-button compact"
                        data-add-search-friend="${friend.id}"
                    >
                        Aggiungi
                    </button>

                </article>

            `).join("");
    }
});


/* =========================================================
   SEARCH FRIEND ADD
========================================================= */

document.addEventListener("click", event => {

    const button =
        event.target.closest(
            "[data-add-search-friend]"
        );

    if (!button) return;

    const id =
        button.dataset.addSearchFriend;

    const friend =
        SYNC.state.friends.find(
            item => item.id === id
        );

    if (friend) {

        showToast(
            `${friend.displayName} è già nei tuoi amici.`
        );
    }
});


/* =========================================================
   DELETE EVENT
========================================================= */

function deleteEvent(id) {

    const event =
        SYNC.state.events.find(
            item => item.id === id
        );

    if (!event) return;

    const confirmed =
        window.confirm(
            `Eliminare "${event.title}"?`
        );

    if (!confirmed) return;

    SYNC.state.events =
        SYNC.state.events.filter(
            item => item.id !== id
        );

    saveState();

    renderEvents();

    updateProfileUI();

    showToast("Programma eliminato.");
}


/* =========================================================
   OPEN EVENT
========================================================= */

function openEvent(id) {

    const event =
        SYNC.state.events.find(
            item => item.id === id
        );

    if (!event) return;

    openModal(`

        <h2>🎯 ${escapeHTML(event.title)}</h2>

        <p class="modal-subtitle">
            ${escapeHTML(
                event.description ||
                "Nessuna descrizione."
            )}
        </p>

        <div class="info-card">

            <span>📅</span>

            <div>
                <strong>
                    ${escapeHTML(event.date)}
                </strong>

                <p>
                    🕐 ${escapeHTML(event.time || "—")}
                </p>
            </div>

        </div>

        <div class="info-card">

            <span>📍</span>

            <div>
                <strong>
                    Luogo
                </strong>

                <p>
                    ${escapeHTML(
                        event.location ||
                        "Da decidere"
                    )}
                </p>
            </div>

        </div>

        <div class="info-card">

            <span>👥</span>

            <div>
                <strong>
                    Partecipanti
                </strong>

                <p>
                    ${
                        event.participants?.length ||
                        0
                    } invitati
                </p>
            </div>

        </div>

        <div class="modal-actions">

            <button
                class="secondary-button"
                data-modal-action="edit-event"
                data-event-id="${event.id}"
            >
                Modifica
            </button>

            <button
                class="primary-button"
                data-modal-action="event-chat"
                data-event-id="${event.id}"
            >
                💬 Chat
            </button>

        </div>
    `);
}


/* =========================================================
   DELETE ACCOUNT
========================================================= */

function confirmDeleteAccount() {

    openModal(`
        <h2>🗑️ Elimina account</h2>

        <p class="modal-subtitle">
            Questa operazione eliminerà definitivamente
            il tuo account e i relativi dati.
        </p>

        <div class="modal-actions">

            <button
                class="secondary-button"
                data-modal-action="cancel-delete"
            >
                Annulla
            </button>

            <button
                class="danger-button"
                data-modal-action="confirm-delete"
            >
                Elimina definitivamente
            </button>

        </div>
    `);
}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape"
    ) {
        closeModal();
    }
});


/* =========================================================
   SYSTEM THEME
========================================================= */

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {

        if (
            SYNC.state.theme === "system"
        ) {
            applyTheme();
        }
    });


/* =========================================================
   INITIALIZATION
========================================================= */

function init() {

    createSampleDataIfNeeded();

    applyLanguage();

    applyTheme();

    updateAuthState();

    updateAvailabilityVisibilityUI();

    /*
        Se l'utente non è loggato,
        mostriamo la schermata login.
    */

    if (!SYNC.state.currentUser) {
        showAuthView("login");
    }
}

document.addEventListener(
    "DOMContentLoaded",
    init
);