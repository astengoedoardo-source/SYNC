"use strict";

/* =========================================================
   SYNC — APP LOGIC
   Demo auth/data are local-only for now.
   Search uses the Cloudflare Worker.
   ========================================================= */

const WORKER_SEARCH_URL =
  "https://sync2.astengoedoardo.workers.dev/search";

const KEYS = {
  accounts: "sync_demo_accounts_v5",
  session: "sync_demo_session_v5",
  data: "sync_demo_data_v5",
  settings: "sync_demo_settings_v5"
};


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const I18N = {

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

    "home.title": "Cosa facciamo?",
    "home.smart.label": "SYNC ha trovato",
    "home.smart.title": "Un momento libero",
    "home.smart.button": "Organizza qualcosa",
    "home.today": "Oggi",
    "home.pending": "Da decidere",
    "home.availability": "Disponibilità",
    "home.nextFree": "Prossimo momento libero",
    "home.manageAvailability": "Gestisci disponibilità",

    "quick.event": "Organizza",
    "quick.update": "Aggiornamento",
    "quick.friends": "Amici",
    "quick.calendar": "Calendario",

    "friends.title": "Amici",
    "friends.subtitle": "Organizza qualcosa con le persone che conosci.",
    "friends.all": "Tutti",
    "friends.private": "🔒 Privati",
    "friends.privacy.title": "Decidi chi vede cosa",
    "friends.privacy.description":
      "Quando pubblichi qualcosa puoi scegliere tutti gli amici, i Privati oppure singole persone.",

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
    "profile.private": "Privati",
    "profile.events": "Eventi",
    "profile.manageFriends": "Gestisci amici",
    "profile.privateList": "Lista privata",
    "profile.privacy": "Privacy e sicurezza",
    "profile.settings": "Impostazioni",

    "settings.title": "Impostazioni",
    "settings.privacy": "Privacy",
    "settings.availabilityVisibility": "Visibilità disponibilità",
    "settings.availabilityDescription":
      "Decidi chi può vedere quando sei libero.",
    "settings.privateList": "Lista privata",
    "settings.privateDescription":
      "Gestisci le persone dei tuoi Privati.",
    "settings.blocked": "Utenti bloccati",
    "settings.blockedDescription":
      "Gestisci gli utenti che hai bloccato.",
    "settings.account": "Account",
    "settings.password": "Password",
    "settings.passwordDescription":
      "Modifica la password del tuo account.",
    "settings.deleteAccount": "Elimina account",
    "settings.deleteDescription":
      "Elimina definitivamente il tuo account.",
    "settings.app": "App",
    "settings.language": "Lingua",
    "settings.theme": "Aspetto",
    "settings.notifications": "Notifiche",
    "settings.notificationsDescription":
      "Gestisci le notifiche di SYNC.",

    "nav.home": "Home",
    "nav.friends": "Amici",
    "nav.calendar": "Calendario",
    "nav.profile": "Profilo",

    "search.placeholder": "Cerca persone..."
  },


  en: {

    "auth.tagline": "Organize everything together.",
    "auth.login.title": "Welcome back",
    "auth.login.subtitle": "Sign in to your SYNC account.",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.login.button": "Sign in",
    "auth.forgot": "Forgot your password?",
    "auth.register": "Create an account",
    "auth.register.title": "Create your account",
    "auth.register.subtitle": "Join SYNC and start organizing.",
    "auth.displayName": "Display name",
    "auth.username": "Username",
    "auth.confirmPassword": "Confirm password",
    "auth.register.button": "Sign up",
    "auth.haveAccount": "Already have an account? Sign in",
    "auth.logout": "Log out",

    "common.or": "or",
    "common.seeAll": "See all",
    "common.add": "Add",
    "common.edit": "Edit",
    "common.loading": "Loading...",

    "home.title": "What are we doing?",
    "home.smart.label": "SYNC found",
    "home.smart.title": "A free moment",
    "home.smart.button": "Plan something",
    "home.today": "Today",
    "home.pending": "To decide",
    "home.availability": "Availability",
    "home.nextFree": "Next free moment",
    "home.manageAvailability": "Manage availability",

    "quick.event": "Plan",
    "quick.update": "Update",
    "quick.friends": "Friends",
    "quick.calendar": "Calendar",

    "friends.title": "Friends",
    "friends.subtitle": "Plan something with people you know.",
    "friends.all": "Everyone",
    "friends.private": "🔒 Close friends",
    "friends.privacy.title": "Choose who sees what",
    "friends.privacy.description":
      "For every update you can choose all friends, close friends, or selected people.",

    "family.title": "Family",
    "family.subtitle": "Family commitments and plans.",
    "family.nextFree": "Next moment everyone is free",
    "family.everyoneFree": "Everyone available",
    "family.organize": "Plan",
    "family.members": "Members",
    "family.commitments": "Commitments",

    "calendar.title": "Calendar",
    "calendar.add": "+ Commitment",
    "calendar.visibility": "Availability visibility",
    "calendar.free": "Free",
    "calendar.partial": "Partially available",
    "calendar.busy": "Busy",

    "events.title": "Your plans",
    "events.new": "+ Plan",
    "events.upcoming": "Upcoming",
    "events.past": "Past",

    "notifications.title": "Notifications",
    "notifications.markRead": "Mark as read",

    "profile.edit": "Edit profile",
    "profile.friends": "Friends",
    "profile.private": "Close friends",
    "profile.events": "Events",
    "profile.manageFriends": "Manage friends",
    "profile.privateList": "Close friends list",
    "profile.privacy": "Privacy & security",
    "profile.settings": "Settings",

    "settings.title": "Settings",
    "settings.privacy": "Privacy",
    "settings.availabilityVisibility": "Availability visibility",
    "settings.availabilityDescription":
      "Choose who can see when you are free.",
    "settings.privateList": "Close friends list",
    "settings.privateDescription":
      "Manage your close friends.",
    "settings.blocked": "Blocked users",
    "settings.blockedDescription":
      "Manage blocked users.",
    "settings.account": "Account",
    "settings.password": "Password",
    "settings.passwordDescription":
      "Change your account password.",
    "settings.deleteAccount": "Delete account",
    "settings.deleteDescription":
      "Permanently delete your account.",
    "settings.app": "App",
    "settings.language": "Language",
    "settings.theme": "Appearance",
    "settings.notifications": "Notifications",
    "settings.notificationsDescription":
      "Manage SYNC notifications.",

    "nav.home": "Home",
    "nav.friends": "Friends",
    "nav.calendar": "Calendar",
    "nav.profile": "Profile",

    "search.placeholder": "Search people..."
  },


  es: {

    "auth.tagline": "Organízalo todo juntos.",
    "auth.login.title": "Bienvenido",
    "auth.login.subtitle": "Entra en tu cuenta de SYNC.",
    "auth.email": "Email",
    "auth.password": "Contraseña",
    "auth.login.button": "Entrar",
    "auth.forgot": "¿Has olvidado tu contraseña?",
    "auth.register": "Crear una cuenta",
    "auth.register.title": "Crea tu cuenta",
    "auth.register.subtitle":
      "Únete a SYNC y empieza a organizar.",
    "auth.displayName": "Nombre visible",
    "auth.username": "Nombre de usuario",
    "auth.confirmPassword": "Confirmar contraseña",
    "auth.register.button": "Registrarse",
    "auth.haveAccount": "¿Ya tienes cuenta? Entrar",
    "auth.logout": "Cerrar sesión",

    "common.or": "o",
    "common.seeAll": "Ver todo",
    "common.add": "Añadir",
    "common.edit": "Editar",
    "common.loading": "Cargando...",

    "home.title": "¿Qué hacemos?",
    "home.smart.label": "SYNC ha encontrado",
    "home.smart.title": "Un momento libre",
    "home.smart.button": "Organizar algo",
    "home.today": "Hoy",
    "home.pending": "Por decidir",
    "home.availability": "Disponibilidad",
    "home.nextFree": "Próximo momento libre",
    "home.manageAvailability":
      "Gestionar disponibilidad",

    "quick.event": "Organizar",
    "quick.update": "Actualización",
    "quick.friends": "Amigos",
    "quick.calendar": "Calendario",

    "friends.title": "Amigos",
    "friends.subtitle":
      "Organiza algo con las personas que conoces.",
    "friends.all": "Todos",
    "friends.private": "🔒 Cercanos",
    "friends.privacy.title":
      "Decide quién ve qué",
    "friends.privacy.description":
      "Puedes elegir todos los amigos, cercanos o personas concretas.",

    "family.title": "Familia",
    "family.subtitle":
      "Compromisos y planes de la familia.",
    "family.nextFree":
      "Próximo momento libre para todos",
    "family.everyoneFree": "Todos disponibles",
    "family.organize": "Organizar",
    "family.members": "Miembros",
    "family.commitments": "Compromisos",

    "calendar.title": "Calendario",
    "calendar.add": "+ Compromiso",
    "calendar.visibility":
      "Visibilidad de disponibilidad",
    "calendar.free": "Libre",
    "calendar.partial":
      "Parcialmente disponible",
    "calendar.busy": "Ocupado",

    "events.title": "Tus planes",
    "events.new": "+ Organizar",
    "events.upcoming": "Próximos",
    "events.past": "Pasados",

    "notifications.title": "Notificaciones",
    "notifications.markRead":
      "Marcar como leídas",

    "profile.edit": "Editar perfil",
    "profile.friends": "Amigos",
    "profile.private": "Cercanos",
    "profile.events": "Eventos",
    "profile.manageFriends":
      "Gestionar amigos",
    "profile.privateList":
      "Lista de cercanos",
    "profile.privacy":
      "Privacidad y seguridad",
    "profile.settings": "Ajustes",

    "settings.title": "Ajustes",
    "settings.privacy": "Privacidad",
    "settings.availabilityVisibility":
      "Visibilidad de disponibilidad",
    "settings.availabilityDescription":
      "Decide quién puede ver cuándo estás libre.",
    "settings.privateList":
      "Lista de cercanos",
    "settings.privateDescription":
      "Gestiona tus personas cercanas.",
    "settings.blocked":
      "Usuarios bloqueados",
    "settings.blockedDescription":
      "Gestiona los usuarios bloqueados.",
    "settings.account": "Cuenta",
    "settings.password": "Contraseña",
    "settings.passwordDescription":
      "Cambia la contraseña.",
    "settings.deleteAccount":
      "Eliminar cuenta",
    "settings.deleteDescription":
      "Elimina definitivamente tu cuenta.",
    "settings.app": "App",
    "settings.language": "Idioma",
    "settings.theme": "Apariencia",
    "settings.notifications":
      "Notificaciones",
    "settings.notificationsDescription":
      "Gestiona las notificaciones de SYNC.",

    "nav.home": "Inicio",
    "nav.friends": "Amigos",
    "nav.calendar": "Calendario",
    "nav.profile": "Perfil",

    "search.placeholder":
      "Buscar personas..."
  },


  fr: {

    "auth.tagline":
      "Organisez tout ensemble.",
    "auth.login.title":
      "Bon retour",
    "auth.login.subtitle":
      "Connectez-vous à votre compte SYNC.",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.login.button":
      "Se connecter",
    "auth.forgot":
      "Mot de passe oublié ?",
    "auth.register":
      "Créer un compte",
    "auth.register.title":
      "Créez votre compte",
    "auth.register.subtitle":
      "Rejoignez SYNC et commencez à organiser.",
    "auth.displayName":
      "Nom affiché",
    "auth.username":
      "Nom d'utilisateur",
    "auth.confirmPassword":
      "Confirmer le mot de passe",
    "auth.register.button":
      "S'inscrire",
    "auth.haveAccount":
      "Vous avez déjà un compte ? Se connecter",
    "auth.logout":
      "Se déconnecter",

    "common.or": "ou",
    "common.seeAll": "Voir tout",
    "common.add": "Ajouter",
    "common.edit": "Modifier",
    "common.loading": "Chargement...",

    "home.title": "On fait quoi ?",
    "home.smart.label":
      "SYNC a trouvé",
    "home.smart.title":
      "Un moment libre",
    "home.smart.button":
      "Organiser quelque chose",
    "home.today": "Aujourd'hui",
    "home.pending": "À décider",
    "home.availability":
      "Disponibilité",
    "home.nextFree":
      "Prochain moment libre",
    "home.manageAvailability":
      "Gérer la disponibilité",

    "quick.event": "Organiser",
    "quick.update": "Actualité",
    "quick.friends": "Amis",
    "quick.calendar": "Calendrier",

    "friends.title": "Amis",
    "friends.subtitle":
      "Organisez quelque chose avec vos amis.",
    "friends.all": "Tous",
    "friends.private": "🔒 Proches",
    "friends.privacy.title":
      "Choisissez qui voit quoi",
    "friends.privacy.description":
      "Choisissez tous vos amis, vos proches ou des personnes précises.",

    "family.title": "Famille",
    "family.subtitle":
      "Engagements et programmes de la famille.",
    "family.nextFree":
      "Prochain moment libre pour tous",
    "family.everyoneFree":
      "Tout le monde est disponible",
    "family.organize":
      "Organiser",
    "family.members":
      "Membres",
    "family.commitments":
      "Engagements",

    "calendar.title":
      "Calendrier",
    "calendar.add":
      "+ Engagement",
    "calendar.visibility":
      "Visibilité de disponibilité",
    "calendar.free":
      "Libre",
    "calendar.partial":
      "Partiellement disponible",
    "calendar.busy":
      "Occupé",

    "events.title":
      "Vos programmes",
    "events.new":
      "+ Organiser",
    "events.upcoming":
      "À venir",
    "events.past":
      "Passés",

    "notifications.title":
      "Notifications",
    "notifications.markRead":
      "Tout marquer comme lu",

    "profile.edit":
      "Modifier le profil",
    "profile.friends":
      "Amis",
    "profile.private":
      "Proches",
    "profile.events":
      "Événements",
    "profile.manageFriends":
      "Gérer les amis",
    "profile.privateList":
      "Liste des proches",
    "profile.privacy":
      "Confidentialité et sécurité",
    "profile.settings":
      "Paramètres",

    "settings.title":
      "Paramètres",
    "settings.privacy":
      "Confidentialité",
    "settings.availabilityVisibility":
      "Visibilité de disponibilité",
    "settings.availabilityDescription":
      "Choisissez qui peut voir quand vous êtes libre.",
    "settings.privateList":
      "Liste des proches",
    "settings.privateDescription":
      "Gérez vos proches.",
    "settings.blocked":
      "Utilisateurs bloqués",
    "settings.blockedDescription":
      "Gérez les utilisateurs bloqués.",
    "settings.account":
      "Compte",
    "settings.password":
      "Mot de passe",
    "settings.passwordDescription":
      "Modifier le mot de passe.",
    "settings.deleteAccount":
      "Supprimer le compte",
    "settings.deleteDescription":
      "Supprimez définitivement votre compte.",
    "settings.app": "App",
    "settings.language":
      "Langue",
    "settings.theme":
      "Apparence",
    "settings.notifications":
      "Notifications",
    "settings.notificationsDescription":
      "Gérez les notifications de SYNC.",

    "nav.home": "Accueil",
    "nav.friends": "Amis",
    "nav.calendar": "Calendrier",
    "nav.profile": "Profil",

    "search.placeholder":
      "Rechercher des personnes..."
  }
};


/* =========================================================
   HELPERS
   ========================================================= */

const $ = id =>
  document.getElementById(id);

const qs = (selector, root = document) =>
  root.querySelector(selector);

const qsa = (selector, root = document) =>
  [...root.querySelectorAll(selector)];

const esc = value =>
  String(value ?? "").replace(
    /[&<>"']/g,
    char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char])
  );

const uid = prefix =>
  `${prefix}_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 9)}`;


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const defaultFriends = [

  {
    id: "f1",
    name: "Luca",
    username: "@luca",
    avatar: "🧑🏻",
    private: true,
    availability: "free"
  },

  {
    id: "f2",
    name: "Marco",
    username: "@marco",
    avatar: "👦🏻",
    private: true,
    availability: "free"
  },

  {
    id: "f3",
    name: "Giulia",
    username: "@giulia",
    avatar: "👩🏻",
    private: false,
    availability: "partial"
  },

  {
    id: "f4",
    name: "Sofia",
    username: "@sofia",
    avatar: "👩🏼",
    private: true,
    availability: "free"
  },

  {
    id: "f5",
    name: "Matteo",
    username: "@matteo",
    avatar: "🧑🏼",
    private: false,
    availability: "busy"
  },

  {
    id: "f6",
    name: "Andrea",
    username: "@andrea",
    avatar: "👨🏻",
    private: false,
    availability: "free"
  },

  {
    id: "f7",
    name: "Chiara",
    username: "@chiara",
    avatar: "👩🏻‍🦰",
    private: true,
    availability: "free"
  }
];


const defaultFamily = [

  {
    id: "m1",
    name: "Mamma",
    avatar: "👩🏻",
    role: "Famiglia"
  },

  {
    id: "m2",
    name: "Papà",
    avatar: "👨🏻",
    role: "Famiglia"
  },

  {
    id: "m3",
    name: "Fratello",
    avatar: "🧑🏻",
    role: "Famiglia"
  }
];


const defaultData = {

  friends: defaultFriends,

  family: defaultFamily,

  privateIds:
    defaultFriends
      .filter(friend => friend.private)
      .map(friend => friend.id),

  blocked: [],

  myAvailability: "free",

  commitments: [

    {
      id: "c1",
      title: "Allenamento",
      date: "2026-09-10",
      start: "17:00",
      end: "18:30",
      place: "Palestra",
      privacy: "busy",
      recurring: false,
      family: false
    },

    {
      id: "c2",
      title: "Cena in famiglia",
      date: "2026-09-12",
      start: "20:00",
      end: "22:00",
      place: "Da decidere",
      privacy: "details",
      recurring: false,
      family: true
    }

  ],

  events: [

    {
      id: "e1",
      title: "Cinema sabato",
      date: "2026-09-12",
      time: "20:30",
      place: "Cinema",
      activity: "Film",
      budget: "15 €",
      participants: ["f1", "f2", "f4"],
      status: "pending",
      votes: {
        yes: 2,
        maybe: 1,
        no: 0
      },
      myVote: "yes",
      audience: "private",
      transport: "Auto",
      tasks: [
        "Prenotare i biglietti",
        "Scegliere film"
      ],
      messages: []
    },

    {
      id: "e2",
      title: "Aperitivo",
      date: "2026-09-05",
      time: "19:30",
      place: "Centro",
      activity: "Aperitivo",
      budget: "12 €",
      participants: ["f3", "f6"],
      status: "past",
      votes: {
        yes: 3,
        maybe: 0,
        no: 0
      },
      myVote: "yes",
      audience: "friends",
      transport: "A piedi",
      tasks: [],
      messages: []
    }

  ],

  updates: [],

  notifications: [

    {
      id: "n1",
      icon: "🗳️",
      title: "Nuovo voto",
      text:
        "Marco ha risposto al programma Cinema sabato.",
      time: "10 min",
      unread: true
    },

    {
      id: "n2",
      icon: "✨",
      title: "Momento libero trovato",
      text:
        "Sabato sera 7 amici risultano disponibili.",
      time: "1 h",
      unread: true
    },

    {
      id: "n3",
      icon: "📅",
      title: "Programma aggiornato",
      text:
        "L'orario dell'aperitivo è stato confermato.",
      time: "Ieri",
      unread: false
    }

  ],

  lastSearch: []
};


/* =========================================================
   STATE
   ========================================================= */

const savedSettings =
  loadJSON(
    KEYS.settings,
    {}
  );

let state = {

  lang:
    savedSettings.lang || "it",

  theme:
    savedSettings.theme || "system",

  page: "home",

  lastPage: "home",

  friendsTab: "all",

  eventFilter: "upcoming",

  calendarDate:
    new Date("2026-09-12T12:00:00"),

  availabilityVisibility:
    savedSettings.availabilityVisibility ||
    "friends",

  availabilitySelected:
    savedSettings.availabilitySelected || [],

  notificationSettings:
    savedSettings.notificationSettings || {
      events: true,
      votes: true,
      reminders: true,
      updates: false
    },

  data: null,

  currentUser: null
};


/* =========================================================
   STORAGE
   ========================================================= */

function loadJSON(key, fallback) {

  try {

    const value =
      localStorage.getItem(key);

    return value
      ? JSON.parse(value)
      : fallback;

  } catch {

    return fallback;
  }
}


function saveJSON(key, value) {

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}


function saveData() {

  saveJSON(
    KEYS.data,
    state.data
  );
}


function saveSettings() {

  saveJSON(
    KEYS.settings,
    {
      lang: state.lang,
      theme: state.theme,
      availabilityVisibility:
        state.availabilityVisibility,
      availabilitySelected:
        state.availabilitySelected,
      notificationSettings:
        state.notificationSettings
    }
  );
}


/* =========================================================
   INIT
   ========================================================= */

function init() {

  state.data =
    loadJSON(
      KEYS.data,
      structuredClone(defaultData)
    );

  if (
    !state.data ||
    !Array.isArray(state.data.friends)
  ) {

    state.data =
      structuredClone(defaultData);
  }

  const accounts =
    loadJSON(
      KEYS.accounts,
      []
    );

  const session =
    localStorage.getItem(
      KEYS.session
    );

  if (session) {

    state.currentUser =
      accounts.find(
        account =>
          account.id === session
      ) || null;
  }

  applyTheme();

  applyLanguage();

  bindEvents();

  if (state.currentUser) {

    enterApp();

  } else {

    showAuth("login");
  }
}


/* =========================================================
   EVENT BINDINGS
   ========================================================= */

function bindEvents() {

  document.addEventListener(
    "click",
    event => {

      const actionEl =
        event.target.closest(
          "[data-action]"
        );

      if (actionEl) {

        handleAction(
          actionEl.dataset.action,
          actionEl
        );
      }


      const pageEl =
        event.target.closest(
          "[data-page-target]"
        );

      if (pageEl) {

        showPage(
          pageEl.dataset.pageTarget
        );
      }


      const friendTab =
        event.target.closest(
          "[data-friends-tab]"
        );

      if (friendTab) {

        state.friendsTab =
          friendTab.dataset.friendsTab;

        renderFriends();
      }


      const eventFilter =
        event.target.closest(
          "[data-event-filter]"
        );

      if (eventFilter) {

        state.eventFilter =
          eventFilter.dataset.eventFilter;

        renderEvents();
      }


      const vote =
        event.target.closest(
          "[data-vote]"
        );

      if (vote) {

        voteEvent(
          vote.dataset.id,
          vote.dataset.vote
        );
      }


      const eventBtn =
        event.target.closest(
          "[data-event-action]"
        );

      if (eventBtn) {

        eventAction(
          eventBtn.dataset.eventAction,
          eventBtn.dataset.id
        );
      }

    }
  );


  $("login-form")
    .addEventListener(
      "submit",
      login
    );


  $("register-form")
    .addEventListener(
      "submit",
      register
    );


  $("global-search")
    .addEventListener(
      "input",
      event =>
        searchPeople(
          event.target.value
        )
    );


  $("global-search")
    .addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {

          event.preventDefault();

          runWebSearch(
            event.target.value
          );
        }
      }
    );
}


/* =========================================================
   ACTION ROUTER
   ========================================================= */

function handleAction(action, element) {

  switch (action) {

    case "show-register":
      showAuth("register");
      break;

    case "show-login":
      showAuth("login");
      break;

    case "forgot-password":
      forgotPassword();
      break;

    case "logout":
      logout();
      break;

    case "open-profile":
      showPage("profile");
      break;

    case "open-notifications":
      showPage("notifications");
      break;

    case "open-search":
      showPage("search");

      setTimeout(
        () => $("global-search").focus(),
        50
      );

      break;

    case "open-friends":
      showPage("friends");
      break;

    case "open-calendar":
      showPage("calendar");
      break;

    case "open-settings":
      showPage("settings");
      break;

    case "create-event":
      openEventModal();
      break;

    case "create-from-free-time":
      openEventModal({
        date: "2026-09-12",
        time: "20:00"
      });
      break;

    case "create-family-event":
      openEventModal({
        family: true,
        date: "2026-09-12",
        time: "20:00"
      });
      break;

    case "create-update":
      openUpdateModal();
      break;

    case "create-commitment":
      openCommitmentModal();
      break;

    case "open-availability":
      openAvailabilityModal();
      break;

    case "manage-availability-visibility":
      openAvailabilityVisibility();
      break;

    case "open-private-list":
      openPrivateList();
      break;

    case "open-privacy":
      openPrivacy();
      break;

    case "open-blocked-users":
      openBlocked();
      break;

    case "add-friend":
      openAddFriend();
      break;

    case "add-family-member":
      openFamilyMember();
      break;

    case "family-settings":
      openFamilySettings();
      break;

    case "edit-profile":
      openProfileEdit();
      break;

    case "change-password":
      openPasswordChange();
      break;

    case "delete-account":
      deleteAccount();
      break;

    case "change-language":
      openLanguage();
      break;

    case "toggle-theme":
      toggleTheme();
      break;

    case "notification-settings":
      openNotificationSettings();
      break;

    case "mark-notifications-read":

      state.data.notifications
        .forEach(
          notification =>
            notification.unread = false
        );

      saveData();

      renderAll();

      toast(
        "Notifiche segnate come lette."
      );

      break;

    case "close-modal":
      closeModal();
      break;

    case "previous-day":
      shiftCalendar(-1);
      break;

    case "next-day":
      shiftCalendar(1);
      break;

    case "go-back":
      showPage(
        state.lastPage || "home"
      );
      break;
  }
}


/* =========================================================
   AUTH
   ========================================================= */

function showAuth(view) {

  $("auth-screen")
    .classList
    .remove("hidden");

  $("main-app")
    .classList
    .add("hidden");

  $("login-view")
    .classList
    .toggle(
      "hidden",
      view !== "login"
    );

  $("register-view")
    .classList
    .toggle(
      "hidden",
      view !== "register"
    );
}


function login(event) {

  event.preventDefault();

  const email =
    $("login-email")
      .value
      .trim()
      .toLowerCase();

  const password =
    $("login-password").value;

  const accounts =
    loadJSON(
      KEYS.accounts,
      []
    );

  const account =
    accounts.find(
      item =>
        item.email === email &&
        item.password === password
    );

  if (!account) {

    toast(
      "Email o password non corretti."
    );

    return;
  }

  state.currentUser = account;

  localStorage.setItem(
    KEYS.session,
    account.id
  );

  enterApp();

  toast(
    `Bentornato, ${account.displayName}!`
  );
}


function register(event) {

  event.preventDefault();

  const name =
    $("register-name")
      .value
      .trim();

  const username =
    $("register-username")
      .value
      .trim()
      .replace(/^@/, "");

  const email =
    $("register-email")
      .value
      .trim()
      .toLowerCase();

  const password =
    $("register-password").value;

  const confirm =
    $("register-password-confirm")
      .value;

  if (
    name.length < 2 ||
    username.length < 2 ||
    !email.includes("@") ||
    password.length < 6
  ) {

    toast(
      "Controlla i dati inseriti. La password deve avere almeno 6 caratteri."
    );

    return;
  }

  if (password !== confirm) {

    toast(
      "Le password non coincidono."
    );

    return;
  }

  const accounts =
    loadJSON(
      KEYS.accounts,
      []
    );

  if (
    accounts.some(
      account =>
        account.email === email ||
        account.username.toLowerCase() ===
        ("@" + username).toLowerCase()
    )
  ) {

    toast(
      "Email o nome utente già utilizzati."
    );

    return;
  }

  const account = {

    id: uid("user"),

    displayName: name,

    username:
      "@" + username,

    email,

    password,

    bio:
      "Sto usando SYNC ✨",

    avatar:
      "👤"
  };

  accounts.push(account);

  saveJSON(
    KEYS.accounts,
    accounts
  );

  state.currentUser = account;

  localStorage.setItem(
    KEYS.session,
    account.id
  );

  enterApp();

  toast(
    "Account creato. Benvenuto in SYNC!"
  );
}


function forgotPassword() {

  const email =
    prompt(
      "Inserisci la tua email per il recupero (demo):"
    );

  if (!email) return;

  const accounts =
    loadJSON(
      KEYS.accounts,
      []
    );

  if (
    accounts.some(
      account =>
        account.email ===
        email.trim().toLowerCase()
    )
  ) {

    toast(
      "Demo: richiesta di recupero registrata."
    );

  } else {

    toast(
      "Nessun account trovato con questa email."
    );
  }
}


function logout() {

  localStorage.removeItem(
    KEYS.session
  );

  state.currentUser = null;

  showAuth("login");

  $("login-form").reset();

  toast(
    "Sei uscito da SYNC."
  );
}


function enterApp() {

  $("auth-screen")
    .classList
    .add("hidden");

  $("main-app")
    .classList
    .remove("hidden");

  renderAll();

  showPage("home");
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showPage(page) {

  if (page === "search") {

    state.lastPage =
      state.page;
  }

  state.page = page;

  qsa(".page")
    .forEach(
      pageElement => {

        pageElement.classList.toggle(
          "active",
          pageElement.dataset.page ===
          page
        );
      }
    );


  qsa(
    ".nav-item[data-page-target]"
  )
    .forEach(
      nav => {

        nav.classList.toggle(
          "active",
          nav.dataset.pageTarget ===
          page
        );
      }
    );


  if (page === "home")
    renderHome();

  if (page === "friends")
    renderFriends();

  if (page === "family")
    renderFamily();

  if (page === "calendar")
    renderCalendar();

  if (page === "events")
    renderEvents();

  if (page === "notifications")
    renderNotifications();

  if (page === "profile")
    renderProfile();

  if (page === "settings")
    renderSettings();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function renderAll() {

  applyLanguage();

  renderHome();

  renderFriends();

  renderFamily();

  renderCalendar();

  renderEvents();

  renderNotifications();

  renderProfile();

  renderSettings();

  updateBadge();
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function applyLanguage() {

  document.documentElement.lang =
    state.lang;

  qsa("[data-i18n]")
    .forEach(element => {

      const value =
        I18N[
          state.lang
        ]?.[
          element.dataset.i18n
        ];

      if (value) {

        element.textContent =
          value;
      }
    });


  qsa("[data-i18n-placeholder]")
    .forEach(element => {

      const value =
        I18N[
          state.lang
        ]?.[
          element.dataset.i18nPlaceholder
        ];

      if (value) {

        element.placeholder =
          value;
      }
    });


  const names = {

    it: "Italiano",

    en: "English",

    es: "Español",

    fr: "Français"
  };


  if ($("current-language")) {

    $("current-language")
      .textContent =
      names[state.lang];
  }


  if ($("current-theme")) {

    $("current-theme")
      .textContent =
      state.theme === "system"
        ? "Sistema"
        : state.theme === "dark"
          ? "Scuro"
          : "Chiaro";
  }
}


/* =========================================================
   THEME
   ========================================================= */

function applyTheme() {

  const dark =
    state.theme === "dark" ||
    (
      state.theme === "system" &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
    );

  document.body
    .classList
    .toggle(
      "dark",
      dark
    );
}


function toggleTheme() {

  state.theme =
    state.theme === "light"
      ? "dark"
      : state.theme === "dark"
        ? "system"
        : "light";

  saveSettings();

  applyTheme();

  applyLanguage();

  toast(
    "Aspetto: " +
    (
      state.theme === "system"
        ? "Sistema"
        : state.theme === "dark"
          ? "Scuro"
          : "Chiaro"
    )
  );
}


/* =========================================================
   HOME
   ========================================================= */

function renderHome() {

  if (!state.currentUser)
    return;

  const hour =
    new Date().getHours();

  $("home-greeting")
    .textContent =
      hour < 12
        ? "Buongiorno"
        : hour < 18
          ? "Buon pomeriggio"
          : "Buonasera";


  $("header-avatar")
    .textContent =
      state.currentUser.avatar ||
      "👤";


  const freeCount =
    state.data.friends
      .filter(
        friend =>
          friend.availability ===
          "free"
      )
      .length + 1;


  $("best-free-time")
    .textContent =
      `Sabato sera siete liberi in ${freeCount}.`;


  if ($("home-next-day"))
    $("home-next-day")
      .textContent =
      "Sabato";

  if ($("home-next-time"))
    $("home-next-time")
      .textContent =
      "20:00 – 23:00";


  const today =
    state.data.commitments
      .filter(
        commitment =>
          commitment.date ===
          "2026-09-10"
      );


  $("today-items")
    .innerHTML =
      today.length
        ? today
            .map(
              commitment =>
                `
                <div class="timeline-item">

                  <div class="timeline-time">
                    ${esc(commitment.start)}
                  </div>

                  <div class="timeline-content">

                    <strong>
                      ${esc(commitment.title)}
                    </strong>

                    <span>
                      ${esc(commitment.place || "")}
                    </span>

                  </div>

                </div>
                `
            )
            .join("")
        :
          `
          <div class="empty-state">
            Nessun impegno oggi. Sei libero! 🟢
          </div>
          `;


  const pending =
    state.data.events
      .filter(
        event =>
          event.status ===
          "pending"
      );


  $("pending-events")
    .innerHTML =
      pending.length
        ? pending
            .map(eventHTML)
            .join("")
        :
          `
          <div class="empty-state">
            Niente da decidere per ora ✨
          </div>
          `;
}


/* =========================================================
   EVENT CARD
   ========================================================= */

function eventHTML(event) {

  const statusClass =
    event.status === "confirmed"
      ? "green"
      : event.status === "past"
        ? ""
        : "orange";


  const statusText =
    event.status === "past"
      ? "Passato"
      : event.status === "confirmed"
        ? "Confermato"
        : "Da decidere";


  return `

    <article class="event-card">

      <div class="event-card-header">

        <div>

          <h3>
            ${esc(event.title)}
          </h3>

          <span class="pill ${statusClass}">
            ${statusText}
          </span>

        </div>

        <span>
          ${esc(event.activity || "🎯")}
        </span>

      </div>


      <div class="event-card-meta">

        <span>
          📅 ${esc(event.date)}
          ·
          ${esc(event.time || "")}
        </span>

        <span>
          📍 ${esc(event.place || "Da decidere")}
        </span>

        <span>
          👥 ${event.participants.length}
          partecipanti
          ·
          💶 ${esc(event.budget || "Da decidere")}
        </span>

      </div>


      ${
        event.status !== "past"
          ? `

          <div class="vote-row">

            <button
              class="vote-btn ${
                event.myVote === "yes"
                  ? "active"
                  : ""
              }"
              data-vote="yes"
              data-id="${event.id}"
            >
              🟢 Ci sono
            </button>

            <button
              class="vote-btn ${
                event.myVote === "maybe"
                  ? "active"
                  : ""
              }"
              data-vote="maybe"
              data-id="${event.id}"
            >
              🟡 Forse
            </button>

            <button
              class="vote-btn ${
                event.myVote === "no"
                  ? "active"
                  : ""
              }"
              data-vote="no"
              data-id="${event.id}"
            >
              🔴 No
            </button>

          </div>

          `
          : ""
      }


      <div class="event-actions">

        <button
          class="secondary-button compact"
          data-event-action="details"
          data-id="${event.id}"
        >
          Apri programma
        </button>

        <button
          class="secondary-button compact"
          data-event-action="archive"
          data-id="${event.id}"
        >
          ⋯
        </button>

      </div>

    </article>

  `;
}


/* =========================================================
   FRIENDS
   ========================================================= */

function renderFriends() {

  qsa("[data-friends-tab]")
    .forEach(button => {

      const active =
        button.dataset.friendsTab ===
        state.friendsTab;

      button.classList.toggle(
        "active",
        active
      );

      button.setAttribute(
        "aria-selected",
        active
      );
    });


  const list =
    state.friendsTab === "private"
      ? state.data.friends.filter(
          friend =>
            state.data.privateIds
              .includes(friend.id)
        )
      : state.data.friends;


  $("friends-list")
    .innerHTML =
      list.length
        ? list
            .map(friend => {

              const availability =
                friend.availability ===
                "free"
                  ? "🟢 Libero"
                  : friend.availability ===
                    "partial"
                    ? "🟡 Parzialmente disponibile"
                    : "🔴 Occupato";


              return `

                <div class="person-card">

                  <div class="person-avatar">
                    ${friend.avatar}
                  </div>

                  <div class="person-info">

                    <strong>
                      ${esc(friend.name)}
                    </strong>

                    <span>
                      ${esc(friend.username)}
                      ·
                      ${availability}
                    </span>

                  </div>

                  <div class="person-actions">

                    <button
                      class="secondary-button compact"
                      data-event-action="toggle-private"
                      data-id="${friend.id}"
                    >
                      ${
                        state.data.privateIds
                          .includes(friend.id)
                          ? "🔒"
                          : "＋"
                      }
                    </button>

                  </div>

                </div>

              `;
            })
            .join("")
        :
          `
          <div class="empty-state">
            Nessuna persona qui.
          </div>
          `;
}


/* =========================================================
   FAMILY
   ========================================================= */

function renderFamily() {

  if (!$("family-members"))
    return;


  $("family-members")
    .innerHTML =
      state.data.family
        .map(
          member =>
            `
            <div class="person-card">

              <div class="person-avatar">
                ${member.avatar}
              </div>

              <div class="person-info">

                <strong>
                  ${esc(member.name)}
                </strong>

                <span>
                  ${esc(member.role)}
                </span>

              </div>

              <span class="pill green">
                🟢
              </span>

            </div>
            `
        )
        .join("");


  const commitments =
    state.data.commitments
      .filter(
        commitment =>
          commitment.family
      );


  $("family-commitments")
    .innerHTML =
      commitments.length
        ? commitments
            .map(
              eventCommitmentHTML
            )
            .join("")
        :
          `
          <div class="empty-state">
            Nessun impegno familiare.
          </div>
          `;
}


function eventCommitmentHTML(
  commitment
) {

  return `

    <div class="event-card">

      <div class="event-card-header">

        <h3>
          ${esc(commitment.title)}
        </h3>

        <span class="pill">
          ${esc(commitment.date)}
        </span>

      </div>

      <div class="event-card-meta">

        <span>
          🕒
          ${esc(commitment.start)}
          –
          ${esc(commitment.end)}
        </span>

        <span>
          📍
          ${esc(commitment.place || "")}
        </span>

      </div>

    </div>

  `;
}


/* =========================================================
   CALENDAR
   ========================================================= */

function renderCalendar() {

  const date =
    state.calendarDate;


  const dayNames = [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato"
  ];


  const monthNames = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
  ];


  $("calendar-date")
    .textContent =
      `${dayNames[date.getDay()]}
       ${date.getDate()}
       ${monthNames[date.getMonth()]}`;


  $("calendar-month")
    .textContent =
      date.getFullYear();


  const calendarDate =
    date.toISOString()
      .slice(0, 10);


  const slots = [
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00"
  ];


  $("calendar-grid")
    .innerHTML =
      slots
        .map(time => {

          const commitment =
            state.data.commitments
              .find(
                item =>
                  item.date ===
                    calendarDate &&
                  item.start <= time &&
                  item.end > time
              );


          const event =
            state.data.events
              .find(
                item =>
                  item.date ===
                    calendarDate &&
                  item.time === time
              );


          return `

            <div class="calendar-row">

              <div class="calendar-time">
                ${time}
              </div>

              <div class="calendar-slot">

                ${
                  commitment
                    ? `
                      <div class="calendar-event orange">

                        ${esc(
                          commitment.title
                        )}

                        <br>

                        <small>
                          ${esc(
                            commitment.place || ""
                          )}
                        </small>

                      </div>
                      `
                    : event
                      ? `
                        <div class="calendar-event pink">
                          ${esc(event.title)}
                        </div>
                        `
                      : ""
                }

              </div>

            </div>

          `;
        })
        .join("");


  $("availability-visibility")
    .textContent =
    visibilityLabel();
}


function shiftCalendar(delta) {

  state.calendarDate
    .setDate(
      state.calendarDate.getDate() +
      delta
    );

  renderCalendar();
}


function visibilityLabel() {

  return {

    none: "🚫 Nessuno",

    private: "🔒 Privati",

    friends: "👥 Tutti gli amici",

    selected: "✓ Selezionati"

  }[
    state.availabilityVisibility
  ] || "👥 Tutti gli amici";
}


/* =========================================================
   EVENTS
   ========================================================= */

function renderEvents() {

  qsa("[data-event-filter]")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.eventFilter ===
        state.eventFilter
      );
    });


  const past =
    state.eventFilter ===
    "past";


  const list =
    state.data.events.filter(
      event =>
        (event.status === "past") ===
        past
    );


  $("events-list")
    .innerHTML =
      list.length
        ? list
            .map(eventHTML)
            .join("")
        :
          `
          <div class="empty-state">

            ${
              past
                ? "Ancora nessun programma passato."
                : "Non hai programmi in programma. Crea il primo! ✨"
            }

          </div>
          `;
}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function renderNotifications() {

  $("notifications-list")
    .innerHTML =
      state.data.notifications.length
        ? state.data.notifications
            .map(
              notification =>
                `
                <div
                  class="
                    notification-item
                    ${
                      notification.unread
                        ? "unread"
                        : ""
                    }
                  "
                >

                  <div class="notification-icon">
                    ${notification.icon}
                  </div>

                  <div class="notification-content">

                    <strong>
                      ${esc(
                        notification.title
                      )}
                    </strong>

                    <p>
                      ${esc(
                        notification.text
                      )}
                    </p>

                    <time>
                      ${esc(
                        notification.time
                      )}
                    </time>

                  </div>

                </div>
                `
            )
            .join("")
        :
          `
          <div class="empty-state">
            Nessuna notifica.
          </div>
          `;


  updateBadge();
}


function updateBadge() {

  const unread =
    state.data?.notifications
      ?.filter(
        notification =>
          notification.unread
      )
      .length || 0;


  $("notification-badge")
    .textContent =
    unread;


  $("notification-badge")
    .classList.toggle(
      "hidden",
      unread === 0
    );
}


/* =========================================================
   PROFILE
   ========================================================= */

function renderProfile() {

  if (!state.currentUser)
    return;


  const user =
    state.currentUser;


  $("profile-avatar")
    .textContent =
    user.avatar ||
    "👤";


  $("profile-display-name")
    .textContent =
    user.displayName;


  $("profile-username")
    .textContent =
    user.username;


  $("profile-bio")
    .textContent =
    user.bio ||
    "La tua bio";


  $("profile-friends-count")
    .textContent =
    state.data.friends.length;


  $("profile-private-count")
    .textContent =
    state.data.privateIds.length;


  $("profile-events-count")
    .textContent =
    state.data.events.length;
}


function renderSettings() {

  applyLanguage();
}


/* =========================================================
   MODALS
   ========================================================= */

function openModal(html) {

  $("modal-body")
    .innerHTML =
    html;

  $("global-modal")
    .classList
    .remove("hidden");

  $("global-modal")
    .setAttribute(
      "aria-hidden",
      "false"
    );
}


function closeModal() {

  $("global-modal")
    .classList
    .add("hidden");

  $("global-modal")
    .setAttribute(
      "aria-hidden",
      "true"
    );

  $("modal-body")
    .innerHTML = "";
}


/* =========================================================
   CREATE EVENT
   ========================================================= */

function openEventModal(
  prefill = {}
) {

  const friendChoices =
    state.data.friends
      .map(
        friend =>
          `
          <label class="choice-item">

            <input
              type="checkbox"
              name="participants"
              value="${friend.id}"
              ${prefill.family ? "" : "checked"}
            >

            ${friend.avatar}
            ${esc(friend.name)}

          </label>
          `
      )
      .join("");


  openModal(`

    <h2>
      Organizza qualcosa
    </h2>

    <p class="modal-subtitle">
      Attività, momento, luogo, persone e budget
      in un unico programma.
    </p>


    <form
      id="event-modal-form"
      class="modal-form"
    >

      <label>Titolo</label>

      <input
        name="title"
        placeholder="Es. Cinema sabato"
        required
      >


      <div class="mini-grid">

        <div>

          <label>Data</label>

          <input
            name="date"
            type="date"
            value="${
              prefill.date ||
              "2026-09-12"
            }"
            required
          >

        </div>


        <div>

          <label>Ora</label>

          <input
            name="time"
            type="time"
            value="${
              prefill.time ||
              "20:00"
            }"
            required
          >

        </div>

      </div>


      <label>Attività</label>

      <input
        name="activity"
        placeholder="Cinema, cena, partita..."
      >


      <label>Luogo</label>

      <input
        name="place"
        placeholder="Dove andiamo?"
      >


      <div class="mini-grid">

        <div>

          <label>
            Budget a persona
          </label>

          <input
            name="budget"
            placeholder="15 €"
          >

        </div>


        <div>

          <label>
            Come arriviamo?
          </label>

          <select name="transport">

            <option>
              Auto
            </option>

            <option>
              Mezzi
            </option>

            <option>
              A piedi
            </option>

            <option>
              Da decidere
            </option>

          </select>

        </div>

      </div>


      <label>
        Chi può vedere / partecipare?
      </label>


      <div class="choice-list">

        <label class="choice-item">

          <input
            type="radio"
            name="audience"
            value="friends"
            checked
          >

          👥 Tutti gli amici

        </label>


        <label class="choice-item">

          <input
            type="radio"
            name="audience"
            value="private"
          >

          🔒 Privati

        </label>


        <label class="choice-item">

          <input
            type="radio"
            name="audience"
            value="selected"
          >

          ✓ Selezionati

        </label>

      </div>


      <div class="choice-list">

        ${friendChoices}

      </div>


      <label>
        Checklist iniziale
      </label>

      <input
        name="tasks"
        placeholder="Es. prenotare, portare biglietti..."
      >


      <div class="modal-actions">

        <button
          type="button"
          class="secondary-button"
          data-action="close-modal"
        >
          Annulla
        </button>


        <button
          class="primary-button"
          type="submit"
        >
          Crea programma
        </button>

      </div>

    </form>

  `);


  $("event-modal-form")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const formData =
          new FormData(
            event.target
          );


        const participants =
          [
            ...event.target.querySelectorAll(
              'input[name="participants"]:checked'
            )
          ]
          .map(
            input =>
              input.value
          );


        const newEvent = {

          id: uid("e"),

          title:
            formData.get("title"),

          date:
            formData.get("date"),

          time:
            formData.get("time"),

          activity:
            formData.get("activity") ||
            "🎯",

          place:
            formData.get("place") ||
            "Da decidere",

          budget:
            formData.get("budget") ||
            "Da decidere",

          participants,

          status:
            "pending",

          votes: {
            yes: 0,
            maybe: 0,
            no: 0
          },

          myVote:
            "yes",

          audience:
            formData.get("audience"),

          transport:
            formData.get("transport"),

          tasks:
            String(
              formData.get("tasks") ||
              ""
            )
            .split(",")
            .map(
              task =>
                task.trim()
            )
            .filter(Boolean),

          messages: []
        };


        newEvent.votes.yes = 1;


        state.data.events.unshift(
          newEvent
        );


        if (
          state.notificationSettings.events
        ) {

          state.data.notifications.unshift({

            id: uid("n"),

            icon: "🎯",

            title:
              "Nuovo programma",

            text:
              `Hai creato “${newEvent.title}”.`,

            time: "Ora",

            unread: true
          });
        }


        saveData();

        closeModal();

        renderAll();

        showPage("events");

        toast(
          "Programma creato."
        );
      }
    );
}


/* =========================================================
   UPDATE / STORY
   ========================================================= */

function openUpdateModal() {

  const friends =
    state.data.friends;


  openModal(`

    <h2>
      Nuovo aggiornamento
    </h2>

    <p class="modal-subtitle">
      Condividi un'idea, un programma o qualcosa
      che vuoi fare con le persone che scegli.
    </p>


    <form
      id="update-form"
      class="modal-form"
    >

      <label>
        Cosa vuoi condividere?
      </label>

      <textarea
        name="text"
        placeholder="Es. Voglio andare a vedere il nuovo film..."
        required
      ></textarea>


      <label>
        Chi può vederlo?
      </label>


      <div class="choice-list">

        <label class="choice-item">

          <input
            type="radio"
            name="audience"
            value="friends"
            checked
          >

          👥 Tutti gli amici

        </label>


        <label class="choice-item">

          <input
            type="radio"
            name="audience"
            value="private"
          >

          🔒 Privati

        </label>


        <label class="choice-item">

          <input
            type="radio"
            name="audience"
            value="selected"
          >

          ✓ Selezionati

        </label>

      </div>


      <div class="choice-list">

        ${
          friends
            .map(
              friend =>
                `
                <label class="choice-item">

                  <input
                    type="checkbox"
                    name="selected"
                    value="${friend.id}"
                  >

                  ${friend.avatar}
                  ${esc(friend.name)}

                </label>
                `
            )
            .join("")
        }

      </div>


      <div class="modal-actions">

        <button
          type="button"
          class="secondary-button"
          data-action="close-modal"
        >
          Annulla
        </button>

        <button
          type="submit"
          class="primary-button"
        >
          Pubblica
        </button>

      </div>

    </form>

  `);


  $("update-form")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const formData =
          new FormData(
            event.target
          );


        const selected =
          [
            ...event.target.querySelectorAll(
              'input[name="selected"]:checked'
            )
          ]
          .map(
            input =>
              input.value
          );


        const update = {

          id: uid("u"),

          text:
            formData.get("text"),

          audience:
            formData.get("audience"),

          selected,

          date:
            new Date().toISOString(),

          responses: []
        };


        state.data.updates.unshift(
          update
        );


        saveData();

        closeModal();

        toast(
          "Aggiornamento pubblicato."
        );
      }
    );
}


/* =========================================================
   COMMITMENT
   ========================================================= */

function openCommitmentModal() {

  openModal(`

    <h2>
      Nuovo impegno
    </h2>

    <p class="modal-subtitle">
      Può essere personale, familiare o ricorrente.
    </p>


    <form
      id="commitment-form"
      class="modal-form"
    >

      <label>Titolo</label>

      <input
        name="title"
        placeholder="Scuola, allenamento, visita..."
        required
      >


      <div class="mini-grid">

        <div>

          <label>Data</label>

          <input
            name="date"
            type="date"
            value="2026-09-10"
            required
          >

        </div>


        <div>

          <label>Inizio</label>

          <input
            name="start"
            type="time"
            value="17:00"
            required
          >

        </div>

      </div>


      <div class="mini-grid">

        <div>

          <label>Fine</label>

          <input
            name="end"
            type="time"
            value="18:00"
            required
          >

        </div>


        <div>

          <label>Luogo</label>

          <input
            name="place"
            placeholder="Luogo"
          >

        </div>

      </div>


      <label>
        Privacy
      </label>

      <select name="privacy">

        <option value="busy">
          Mostra solo “occupato”
        </option>

        <option value="details">
          Mostra i dettagli
        </option>

      </select>


      <label>

        <input
          name="recurring"
          type="checkbox"
          style="width:auto"
        >

        Ripeti ogni settimana

      </label>


      <label>

        <input
          name="family"
          type="checkbox"
          style="width:auto"
        >

        Impegno familiare

      </label>


      <div class="modal-actions">

        <button
          type="button"
          class="secondary-button"
          data-action="close-modal"
        >
          Annulla
        </button>

        <button
          class="primary-button"
        >
          Salva impegno
        </button>

      </div>

    </form>

  `);


  $("commitment-form")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const data =
          new FormData(
            event.target
          );


        const commitment = {

          id: uid("c"),

          title:
            data.get("title"),

          date:
            data.get("date"),

          start:
            data.get("start"),

          end:
            data.get("end"),

          place:
            data.get("place") ||
            "",

          privacy:
            data.get("privacy"),

          recurring:
            data.get("recurring") ===
            "on",

          family:
            data.get("family") ===
            "on"
        };


        state.data.commitments.push(
          commitment
        );


        saveData();

        closeModal();

        renderAll();

        toast(
          "Impegno aggiunto."
        );
      }
    );
}


/* =========================================================
   AVAILABILITY
   ========================================================= */

function openAvailabilityModal() {

  const current =
    state.data.myAvailability ||
    "free";


  openModal(`

    <h2>
      La tua disponibilità
    </h2>

    <p class="modal-subtitle">
      Indica come sei disponibile.
      Gli altri vedranno solo ciò che permetti.
    </p>


    <div class="choice-list">

      <label class="choice-item">

        <input
          type="radio"
          name="avail"
          value="free"
          ${
            current === "free"
              ? "checked"
              : ""
          }
        >

        🟢 Libero

      </label>


      <label class="choice-item">

        <input
          type="radio"
          name="avail"
          value="partial"
          ${
            current === "partial"
              ? "checked"
              : ""
          }
        >

        🟡 Parzialmente disponibile

      </label>


      <label class="choice-item">

        <input
          type="radio"
          name="avail"
          value="busy"
          ${
            current === "busy"
              ? "checked"
              : ""
          }
        >

        🔴 Occupato

      </label>

    </div>


    <div class="modal-actions">

      <button
        class="secondary-button"
        data-action="close-modal"
      >
        Chiudi
      </button>

      <button
        class="primary-button"
        id="save-availability"
      >
        Salva
      </button>

    </div>

  `);


  $("save-availability")
    .onclick = () => {

      const selected =
        qs(
          'input[name="avail"]:checked'
        );


      if (!selected)
        return;


      state.data.myAvailability =
        selected.value;


      saveData();

      closeModal();

      toast(
        "Disponibilità aggiornata."
      );
    };
}


/* =========================================================
   AVAILABILITY PRIVACY
   ========================================================= */

function openAvailabilityVisibility() {

  openModal(`

    <h2>
      Visibilità disponibilità
    </h2>

    <p class="modal-subtitle">
      Tu decidi chi può vedere quando sei libero.
    </p>


    <div class="choice-list">

      ${[
        ["none", "🚫 Nessuno"],
        ["private", "🔒 Privati"],
        ["friends", "👥 Tutti gli amici"],
        ["selected", "✓ Selezionati"]
      ]
        .map(
          ([value, label]) =>
            `
            <label
              class="
                choice-item
                ${
                  state.availabilityVisibility ===
                  value
                    ? "selected"
                    : ""
                }
              "
            >

              <input
                type="radio"
                name="visibility"
                value="${value}"
                ${
                  state.availabilityVisibility ===
                  value
                    ? "checked"
                    : ""
                }
              >

              ${label}

            </label>
            `
        )
        .join("")}

    </div>


    <div
      id="availability-selected-box"
      class="choice-list"
      style="margin-top:10px"
    >

      ${
        state.data.friends
          .map(
            friend =>
              `
              <label class="choice-item">

                <input
                  type="checkbox"
                  name="availability-selected"
                  value="${friend.id}"
                  ${
                    state.availabilitySelected
                      .includes(friend.id)
                      ? "checked"
                      : ""
                  }
                >

                ${friend.avatar}
                ${esc(friend.name)}

              </label>
              `
          )
          .join("")
      }

    </div>


    <div class="modal-actions">

      <button
        class="secondary-button"
        data-action="close-modal"
      >
        Annulla
      </button>

      <button
        class="primary-button"
        id="save-visibility"
      >
        Salva
      </button>

    </div>

  `);


  $("save-visibility")
    .onclick = () => {

      const visibility =
        qs(
          'input[name="visibility"]:checked'
        );


      state.availabilityVisibility =
        visibility
          ? visibility.value
          : "friends";


      state.availabilitySelected =
        qsa(
          'input[name="availability-selected"]:checked'
        )
        .map(
          input =>
            input.value
        );


      saveSettings();

      closeModal();

      renderCalendar();

      toast(
        "Visibilità aggiornata."
      );
    };
}


/* =========================================================
   PRIVATE LIST
   ========================================================= */

function openPrivateList() {

  openModal(`

    <h2>
      Lista privata
    </h2>

    <p class="modal-subtitle">
      Scegli le persone che fanno parte dei tuoi
      Privati/Stretti.
    </p>


    <div class="choice-list">

      ${
        state.data.friends
          .map(
            friend =>
              `
              <label class="choice-item">

                <input
                  type="checkbox"
                  name="private"
                  value="${friend.id}"
                  ${
                    state.data.privateIds
                      .includes(friend.id)
                      ? "checked"
                      : ""
                  }
                >

                ${friend.avatar}
                ${esc(friend.name)}

                <span style="margin-left:auto">
                  ${esc(friend.username)}
                </span>

              </label>
              `
          )
          .join("")
      }

    </div>


    <div class="modal-actions">

      <button
        class="secondary-button"
        data-action="close-modal"
      >
        Annulla
      </button>

      <button
        class="primary-button"
        id="save-private"
      >
        Salva
      </button>

    </div>

  `);


  $("save-private")
    .onclick = () => {

      state.data.privateIds =
        qsa(
          'input[name="private"]:checked',
          $("modal-body")
        )
        .map(
          input =>
            input.value
        );


      state.data.friends
        .forEach(
          friend => {

            friend.private =
              state.data.privateIds
                .includes(friend.id);
          }
        );


      saveData();

      closeModal();

      renderFriends();

      renderProfile();

      toast(
        "Lista privata aggiornata."
      );
    };
}


/* =========================================================
   PRIVACY
   ========================================================= */

function openPrivacy() {

  openModal(`

    <h2>
      Privacy e sicurezza
    </h2>

    <p class="modal-subtitle">
      SYNC separa Amici, Privati e Selezionati.
      Non usa il GPS continuo.
    </p>


    <div class="info-card">

      <span>🛡️</span>

      <div>

        <strong>
          Disponibilità
        </strong>

        <p>
          Puoi mostrare solo libero/occupato
          oppure controllare chi vede i dettagli.
        </p>

      </div>

    </div>


    <div class="info-card">

      <span>🔒</span>

      <div>

        <strong>
          Programmi
        </strong>

        <p>
          Ogni programma può essere condiviso
          con tutti gli amici, i Privati
          o persone specifiche.
        </p>

      </div>

    </div>


    <div class="info-card">

      <span>📍</span>

      <div>

        <strong>
          Posizione
        </strong>

        <p>
          SYNC non richiede il tracciamento
          GPS continuo.
        </p>

      </div>

    </div>


    <div class="modal-actions">

      <button
        class="primary-button"
        data-action="close-modal"
      >
        Ok
      </button>

    </div>

  `);
}


/* =========================================================
   BLOCKED USERS
   ========================================================= */

function openBlocked() {

  openModal(`

    <h2>
      Utenti bloccati
    </h2>

    <p class="modal-subtitle">
      Le persone bloccate non vengono coinvolte
      nei tuoi programmi.
    </p>


    ${
      state.data.blocked.length

        ? state.data.blocked
            .map(
              blocked =>
                `
                <div class="person-card">
                  <strong>
                    ${esc(blocked)}
                  </strong>
                </div>
                `
            )
            .join("")

        : `
          <div class="empty-state">
            Non hai utenti bloccati.
          </div>
          `
    }


    <div class="modal-actions">

      <button
        class="primary-button"
        data-action="close-modal"
      >
        Chiudi
      </button>

    </div>

  `);
}


/* =========================================================
   ADD FRIEND
   ========================================================= */

function openAddFriend() {

  openModal(`

    <h2>
      Aggiungi un amico
    </h2>

    <p class="modal-subtitle">
      Demo locale: puoi aggiungere una persona
      per testare SYNC.
    </p>


    <form
      id="friend-form"
      class="modal-form"
    >

      <label>
        Nome
      </label>

      <input
        name="name"
        required
        placeholder="Nome e cognome"
      >


      <label>
        Username
      </label>

      <input
        name="username"
        placeholder="@utente"
      >


      <div class="modal-actions">

        <button
          type="button"
          class="secondary-button"
          data-action="close-modal"
        >
          Annulla
        </button>

        <button
          class="primary-button"
        >
          Aggiungi
        </button>

      </div>

    </form>

  `);


  $("friend-form")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const data =
          new FormData(
            event.target
          );


        const username =
          String(
            data.get("username") ||
            "utente"
          )
          .replace(/^@/, "");


        state.data.friends.push({

          id: uid("f"),

          name:
            data.get("name"),

          username:
            "@" + username,

          avatar:
            "🙂",

          private:
            false,

          availability:
            "free"
        });


        saveData();

        closeModal();

        renderFriends();

        renderProfile();

        toast(
          "Amico aggiunto."
        );
      }
    );
}


/* =========================================================
   FAMILY MEMBER
   ========================================================= */

function openFamilyMember() {

  openModal(`

    <h2>
      Aggiungi familiare
    </h2>


    <form
      id="family-form"
      class="modal-form"
    >

      <label>
        Nome
      </label>

      <input
        name="name"
        required
      >


      <label>
        Ruolo
      </label>

      <input
        name="role"
        placeholder="Mamma, papà, fratello..."
      >


      <div class="modal-actions">

        <button
          type="button"
          class="secondary-button"
          data-action="close-modal"
        >
          Annulla
        </button>

        <button
          class="primary-button"
        >
          Aggiungi
        </button>

      </div>

    </form>

  `);


  $("family-form")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const data =
          new FormData(
            event.target
          );


        state.data.family.push({

          id: uid("m"),

          name:
            data.get("name"),

          role:
            data.get("role") ||
            "Famiglia",

          avatar:
            "👤"
        });


        saveData();

        closeModal();

        renderFamily();

        toast(
          "Familiare aggiunto."
        );
      }
    );
}


/* =========================================================
   FAMILY SETTINGS
   ========================================================= */

function openFamilySettings() {

  openModal(`

    <h2>
      Impostazioni famiglia
    </h2>

    <p class="modal-subtitle">
      La famiglia è una comunità separata e privata.
    </p>


    <div class="choice-list">

      <label class="choice-item">

        <input
          type="checkbox"
          checked
        >

        Mostra disponibilità alla famiglia

      </label>


      <label class="choice-item">

        <input
          type="checkbox"
          checked
        >

        Avvisa sui nuovi impegni

      </label>


      <label class="choice-item">

        <input
          type="checkbox"
          checked
        >

        Permetti programmi familiari

      </label>

    </div>


    <div class="modal-actions">

      <button
        class="primary-button"
        data-action="close-modal"
      >
        Salva
      </button>

    </div>

  `);
}


/* =========================================================
   PROFILE EDIT
   ========================================================= */

function openProfileEdit() {

  const user =
    state.currentUser;


  openModal(`

    <h2>
      Modifica profilo
    </h2>


    <form
      id="profile-form"
      class="modal-form"
    >

      <label>
        Nome
      </label>

      <input
        name="name"
        value="${esc(user.displayName)}"
        required
      >


      <label>
        Username
      </label>

      <input
        name="username"
        value="${esc(user.username)}"
        required
      >


      <label>
        Bio
      </label>

      <textarea
        name="bio"
      >${esc(user.bio || "")}</textarea>


      <label>
        Avatar
      </label>

      <input
        name="avatar"
        value="${esc(user.avatar || "👤")}"
        maxlength="4"
      >


      <div class="modal-actions">

        <button
          type="button"
          class="secondary-button"
          data-action="close-modal"
        >
          Annulla
        </button>

        <button
          class="primary-button"
        >
          Salva
        </button>

      </div>

    </form>

  `);


  $("profile-form")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const data =
          new FormData(
            event.target
          );


        state.currentUser.displayName =
          data.get("name");


        const username =
          String(
            data.get("username")
          )
          .replace(/^@/, "");


        state.currentUser.username =
          "@" + username;


        state.currentUser.bio =
          data.get("bio");


        state.currentUser.avatar =
          data.get("avatar") ||
          "👤";


        const accounts =
          loadJSON(
            KEYS.accounts,
            []
          );


        const index =
          accounts.findIndex(
            account =>
              account.id ===
              state.currentUser.id
          );


        if (index >= 0) {

          accounts[index] =
            state.currentUser;

          saveJSON(
            KEYS.accounts,
            accounts
          );
        }


        closeModal();

        renderAll();

        toast(
          "Profilo aggiornato."
        );
      }
    );
}


/* =========================================================
   PASSWORD
   ========================================================= */

function openPasswordChange() {

  openModal(`

    <h2>
      Cambia password
    </h2>


    <form
      id="pass-form"
      class="modal-form"
    >

      <label>
        Vecchia password
      </label>

      <input
        type="password"
        name="old"
        required
      >


      <label>
        Nuova password
      </label>

      <input
        type="password"
        name="new"
        minlength="6"
        required
      >


      <div class="modal-actions">

        <button
          type="button"
          class="secondary-button"
          data-action="close-modal"
        >
          Annulla
        </button>

        <button
          class="primary-button"
        >
          Salva
        </button>

      </div>

    </form>

  `);


  $("pass-form")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const data =
          new FormData(
            event.target
          );


        if (
          data.get("old") !==
          state.currentUser.password
        ) {

          toast(
            "Vecchia password non corretta."
          );

          return;
        }


        const newPassword =
          String(
            data.get("new")
          );


        if (
          newPassword.length < 6
        ) {

          toast(
            "La nuova password deve avere almeno 6 caratteri."
          );

          return;
        }


        state.currentUser.password =
          newPassword;


        const accounts =
          loadJSON(
            KEYS.accounts,
            []
          );


        const index =
          accounts.findIndex(
            account =>
              account.id ===
              state.currentUser.id
          );


        if (index >= 0) {

          accounts[index] =
            state.currentUser;

          saveJSON(
            KEYS.accounts,
            accounts
          );
        }


        closeModal();

        toast(
          "Password aggiornata."
        );
      }
    );
}


/* =========================================================
   DELETE ACCOUNT
   ========================================================= */

function deleteAccount() {

  if (
    !confirm(
      "Eliminare l'account demo da questo dispositivo?"
    )
  ) {

    return;
  }


  const accounts =
    loadJSON(
      KEYS.accounts,
      []
    )
    .filter(
      account =>
        account.id !==
        state.currentUser.id
    );


  saveJSON(
    KEYS.accounts,
    accounts
  );


  localStorage.removeItem(
    KEYS.session
  );


  state.currentUser =
    null;


  showAuth(
    "register"
  );


  toast(
    "Account eliminato."
  );
}


/* =========================================================
   LANGUAGE MODAL
   ========================================================= */

function openLanguage() {

  openModal(`

    <h2>
      Lingua
    </h2>

    <p class="modal-subtitle">
      Scegli la lingua dell'interfaccia.
    </p>


    <div class="choice-list">

      <label class="choice-item">

        <input
          type="radio"
          name="lang"
          value="it"
          ${
            state.lang === "it"
              ? "checked"
              : ""
          }
        >

        🇮🇹 Italiano

      </label>


      <label class="choice-item">

        <input
          type="radio"
          name="lang"
          value="en"
          ${
            state.lang === "en"
              ? "checked"
              : ""
          }
        >

        🇬🇧 English

      </label>


      <label class="choice-item">

        <input
          type="radio"
          name="lang"
          value="es"
          ${
            state.lang === "es"
              ? "checked"
              : ""
          }
        >

        🇪🇸 Español

      </label>


      <label class="choice-item">

        <input
          type="radio"
          name="lang"
          value="fr"
          ${
            state.lang === "fr"
              ? "checked"
              : ""
          }
        >

        🇫🇷 Français

      </label>

    </div>


    <div class="modal-actions">

      <button
        class="secondary-button"
        data-action="close-modal"
      >
        Annulla
      </button>

      <button
        class="primary-button"
        id="save-lang"
      >
        Salva
      </button>

    </div>

  `);


  $("save-lang")
    .onclick = () => {

      const selected =
        qs(
          'input[name="lang"]:checked'
        );


      if (!selected)
        return;


      state.lang =
        selected.value;


      saveSettings();

      closeModal();

      renderAll();

      toast(
        "Lingua aggiornata."
      );
    };
}


/* =========================================================
   NOTIFICATION SETTINGS
   ========================================================= */

function openNotificationSettings() {

  const settings =
    state.notificationSettings;


  openModal(`

    <h2>
      Notifiche
    </h2>

    <p class="modal-subtitle">
      Scegli cosa vuoi ricevere.
    </p>


    <div class="choice-list">

      <label class="choice-item">

        <input
          type="checkbox"
          name="events"
          ${
            settings.events
              ? "checked"
              : ""
          }
        >

        Nuovi programmi

      </label>


      <label class="choice-item">

        <input
          type="checkbox"
          name="votes"
          ${
            settings.votes
              ? "checked"
              : ""
          }
        >

        Voti e cambiamenti

      </label>


      <label class="choice-item">

        <input
          type="checkbox"
          name="reminders"
          ${
            settings.reminders
              ? "checked"
              : ""
          }
        >

        Promemoria

      </label>


      <label class="choice-item">

        <input
          type="checkbox"
          name="updates"
          ${
            settings.updates
              ? "checked"
              : ""
          }
        >

        Aggiornamenti amici

      </label>

    </div>


    <div class="modal-actions">

      <button
        class="primary-button"
        id="save-notification-settings"
      >
        Salva
      </button>

    </div>

  `);


  $("save-notification-settings")
    .onclick = () => {

      state.notificationSettings = {

        events:
          qs(
            'input[name="events"]'
          ).checked,

        votes:
          qs(
            'input[name="votes"]'
          ).checked,

        reminders:
          qs(
            'input[name="reminders"]'
          ).checked,

        updates:
          qs(
            'input[name="updates"]'
          ).checked
      };


      saveSettings();

      closeModal();

      toast(
        "Preferenze notifiche salvate."
      );
    };
}


/* =========================================================
   VOTING
   ========================================================= */

function voteEvent(
  id,
  vote
) {

  const event =
    state.data.events.find(
      item =>
        item.id === id
    );


  if (!event)
    return;


  const previous =
    event.myVote;


  if (previous === vote) {

    toast(
      "Hai già scelto questa risposta."
    );

    return;
  }


  if (previous) {

    event.votes[previous] =
      Math.max(
        0,
        (event.votes[previous] || 0) - 1
      );
  }


  event.myVote =
    vote;


  event.votes[vote] =
    (event.votes[vote] || 0) + 1;


  if (
    event.votes.yes >= 3
  ) {

    event.status =
      "confirmed";
  }


  if (
    state.notificationSettings.votes
  ) {

    state.data.notifications.unshift({

      id: uid("n"),

      icon: "🗳️",

      title:
        "Voto salvato",

      text:
        `Hai risposto al programma “${event.title}”.`,

      time:
        "Ora",

      unread:
        true
    });
  }


  saveData();

  renderEvents();

  renderHome();

  updateBadge();

  toast(
    "Risposta salvata."
  );
}


/* =========================================================
   EVENT ACTIONS
   ========================================================= */

function eventAction(
  action,
  id
) {

  const event =
    state.data.events.find(
      item =>
        item.id === id
    );


  if (!event)
    return;


  if (
    action === "details"
  ) {

    openEventDetails(
      event
    );

    return;
  }


  if (
    action === "archive"
  ) {

    if (
      event.status ===
      "past"
    ) {

      openEventDetails(
        event
      );

      return;
    }


    if (
      !confirm(
        "Vuoi archiviare questo programma?"
      )
    ) {

      return;
    }


    event.status =
      "past";


    saveData();

    renderAll();

    toast(
      "Programma archiviato."
    );

    return;
  }


  if (
    action ===
    "toggle-private"
  ) {

    const index =
      state.data.privateIds
        .indexOf(id);


    if (index >= 0) {

      state.data.privateIds
        .splice(
          index,
          1
        );

    } else {

      state.data.privateIds
        .push(id);
    }


    state.data.friends
      .forEach(
        friend => {

          friend.private =
            state.data.privateIds
              .includes(
                friend.id
              );
        }
      );


    saveData();

    renderFriends();

    renderProfile();

    toast(
      "Lista privata aggiornata."
    );
  }
}


/* =========================================================
   EVENT DETAILS
   ========================================================= */

function openEventDetails(
  event
) {

  const participants =
    state.data.friends
      .filter(
        friend =>
          event.participants
            .includes(
              friend.id
            )
      );


  openModal(`

    <h2>
      ${esc(event.title)}
    </h2>

    <p class="modal-subtitle">
      ${esc(event.activity || "Programma SYNC")}
    </p>


    <div class="event-card">

      <div class="event-card-meta">

        <span>
          📅
          ${esc(event.date)}
          ·
          ${esc(event.time)}
        </span>

        <span>
          📍
          ${esc(event.place)}
        </span>

        <span>
          💶
          ${esc(event.budget)}
        </span>

        <span>
          🚗
          ${esc(event.transport)}
        </span>

        <span>
          👥
          ${event.participants.length}
          persone
        </span>

      </div>


      <div class="content-section">

        <strong>
          Partecipanti
        </strong>


        <div
          class="choice-list"
          style="margin-top:10px"
        >

          ${
            participants.length
              ? participants
                  .map(
                    friend =>
                      `
                      <div class="choice-item">

                        <span>
                          ${friend.avatar}
                        </span>

                        <div>

                          <strong>
                            ${esc(friend.name)}
                          </strong>

                          <small>
                            ${esc(friend.username)}
                          </small>

                        </div>

                      </div>
                      `
                  )
                  .join("")
              : `
                <p
                  class="muted"
                  style="margin-top:8px"
                >
                  Nessun partecipante selezionato.
                </p>
                `
          }

        </div>

      </div>


      <div class="content-section">

        <strong>
          Checklist
        </strong>


        ${
          event.tasks?.length

            ? event.tasks
                .map(
                  task =>
                    `
                    <label
                      class="choice-item"
                      style="margin-top:8px"
                    >

                      <input
                        type="checkbox"
                      >

                      ${esc(task)}

                    </label>
                    `
                )
                .join("")

            : `
              <p
                class="muted"
                style="margin-top:8px"
              >
                Nessuna attività da completare.
              </p>
              `
        }

      </div>


      <div class="content-section">

        <strong>
          Chat del programma
        </strong>

        <p
          class="muted"
          style="margin-top:6px"
        >
          La chat resta legata a questo evento,
          non è una chat generale.
        </p>


        <button
          class="secondary-button compact"
          id="fake-chat"
          style="margin-top:10px"
        >
          Apri chat evento
        </button>

      </div>

    </div>


    <div class="modal-actions">

      <button
        class="primary-button"
        data-action="close-modal"
      >
        Chiudi
      </button>

    </div>

  `);


  if ($("fake-chat")) {

    $("fake-chat")
      .onclick = () => {

        openEventChat(
          event
        );
      };
  }
}


/* =========================================================
   EVENT CHAT — LOCAL DEMO
   ========================================================= */

function openEventChat(
  event
) {

  if (!Array.isArray(event.messages))
    event.messages = [];


  openModal(`

    <h2>
      Chat · ${esc(event.title)}
    </h2>

    <p class="modal-subtitle">
      Chat temporanea legata a questo programma.
    </p>


    <div
      id="event-chat-messages"
      style="
        display:grid;
        gap:8px;
        margin-bottom:14px;
      "
    >

      ${
        event.messages.length

          ? event.messages
              .map(
                message =>
                  `
                  <div
                    class="info-card"
                    style="margin-top:0"
                  >

                    <div>

                      <strong>
                        ${esc(message.author)}
                      </strong>

                      <p>
                        ${esc(message.text)}
                      </p>

                    </div>

                  </div>
                  `
              )
              .join("")

          : `
            <div class="empty-state">
              Nessun messaggio ancora.
            </div>
            `
      }

    </div>


    <form
      id="event-chat-form"
      class="modal-form"
    >

      <label>
        Messaggio
      </label>

      <input
        name="message"
        placeholder="Scrivi qualcosa..."
        required
      >


      <div class="modal-actions">

        <button
          type="button"
          class="secondary-button"
          data-action="close-modal"
        >
          Chiudi
        </button>

        <button
          class="primary-button"
        >
          Invia
        </button>

      </div>

    </form>

  `);


  $("event-chat-form")
    .addEventListener(
      "submit",
      formEvent => {

        formEvent.preventDefault();


        const data =
          new FormData(
            formEvent.target
          );


        const text =
          String(
            data.get("message")
          )
          .trim();


        if (!text)
          return;


        event.messages.push({

          id: uid("msg"),

          author:
            state.currentUser.displayName,

          text,

          date:
            new Date().toISOString()
        });


        saveData();

        openEventChat(
          event
        );
      }
    );
}


/* =========================================================
   SEARCH
   ========================================================= */

function searchPeople(
  query
) {

  query =
    query
      .trim()
      .toLowerCase();


  if (!query) {

    $("search-results")
      .innerHTML =
      `
      <div class="empty-state">
        Cerca un nome, username o una persona.
      </div>
      `;

    return;
  }


  const people =
    state.data.friends
      .filter(
        friend =>
          friend.name
            .toLowerCase()
            .includes(query) ||
          friend.username
            .toLowerCase()
            .includes(query)
      );


  $("search-results")
    .innerHTML =
      people.length

        ? people
            .map(
              friend =>
                `
                <div class="person-card">

                  <div class="person-avatar">
                    ${friend.avatar}
                  </div>

                  <div class="person-info">

                    <strong>
                      ${esc(friend.name)}
                    </strong>

                    <span>
                      ${esc(friend.username)}
                    </span>

                  </div>

                </div>
                `
            )
            .join("")

        : `
          <div class="empty-state">
            Nessun amico trovato.
            Premi Invio per cercare anche sul web.
          </div>
          `;
}


/* =========================================================
   WEB SEARCH
   ========================================================= */

async function runWebSearch(
  query
) {

  query =
    query.trim();


  if (!query)
    return;


  $("search-results")
    .innerHTML =
    `
    <div class="empty-state">
      🔎 Cerco sul web...
    </div>
    `;


  try {

    const response =
      await fetch(
        WORKER_SEARCH_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              query
            })
        }
      );


    if (!response.ok) {

      throw new Error(
        "Servizio di ricerca non disponibile."
      );
    }


    const data =
      await response.json();


    if (!data.success) {

      throw new Error(
        data.error ||
        "Errore di ricerca."
      );
    }


    state.data.lastSearch =
      data.results || [];


    saveData();


    $("search-results")
      .innerHTML =
        (data.results || [])
          .map(
            result =>
              `
              <article class="result-card">

                <div class="result-source">
                  ${esc(result.source)}
                </div>

                <a
                  href="${esc(result.url)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${esc(result.title)}
                </a>

                <p>
                  ${esc(result.description)}
                </p>

              </article>
              `
          )
          .join("")
        ||
          `
          <div class="empty-state">
            Nessun risultato.
          </div>
          `;

  } catch (error) {

    $("search-results")
      .innerHTML =
      `
      <div class="empty-state">

        Non riesco a raggiungere
        la ricerca adesso.

        <br>

        <small>
          ${esc(error.message)}
        </small>

      </div>
      `;
  }
}


/* =========================================================
   TOAST
   ========================================================= */

function toast(
  message
) {

  const element =
    document.createElement(
      "div"
    );


  element.className =
    "toast";


  element.textContent =
    message;


  $("toast-container")
    .appendChild(
      element
    );


  setTimeout(
    () =>
      element.remove(),
    3000
  );
}


/* =========================================================
   STORAGE SYNC
   ========================================================= */

window.addEventListener(
  "storage",
  () => {

    state.data =
      loadJSON(
        KEYS.data,
        state.data
      );

    renderAll();
  }
);


/* =========================================================
   SYSTEM THEME CHANGES
   ========================================================= */

window
  .matchMedia(
    "(prefers-color-scheme: dark)"
  )
  .addEventListener(
    "change",
    () => {

      if (
        state.theme ===
        "system"
      ) {

        applyTheme();
      }
    }
  );


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);