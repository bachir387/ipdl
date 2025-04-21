const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose"); // Ajout de Mongoose
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const session = require('express-session');
const flash = require('connect-flash');
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");

// Configuration de la connexion à MongoDB
mongoose.connect(
    "mongodb://localhost:27017/ai_academy",
    { useNewUrlParser: true }
);
const db = mongoose.connection;
db.once("open", () => {
console.log("Connexion réussie à MongoDB en utilisant Mongoose!");
});
const app = express();

// Configuration du port
app.set("port", process.env.PORT || 3000);

// Configuration d'EJS
app.set("view engine", "ejs");
app.use(layouts);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Configuration de la session (DOIT ÊTRE AVANT LES ROUTES)
app.use(session({
    secret: 'votre_cle_secrete_123', // Changez ceci par une vraie clé secrète
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true si HTTPS
}));

// Configuration des flash messages
app.use(flash());

// Middleware pour rendre les variables disponibles dans toutes les vues
app.use((req, res, next) => {
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    res.locals.infoMessages = req.flash('info');
    next();
});
// Ajouter le middleware method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method", {
methods: ["POST", "GET"]

}));

// Routes
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/courses", homeController.courses);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);
app.get("/faq", homeController.faq);
// Routes pour les abonnés
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/subscribers/new", subscribersController.getSubscriptionPage);
app.post("/subscribers/create", subscribersController.saveSubscriber);
app.get("/subscribers/:id", subscribersController.show);
// Routes pour les utilisateurs
app.get("/users", usersController.index, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/:id", usersController.show, usersController.showView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
// Routes pour les cours
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/courses/new", coursesController.new);
app.post("/courses/create", coursesController.create, coursesController.redirectView);
app.get("/courses/:id", coursesController.show, coursesController.showView);
app.get("/courses/:id/edit", coursesController.edit);
app.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
app.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

// Gestion des erreurs
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Démarrage du serveur
app.listen(app.get("port"), () => {
    console.log(`Serveur démarré sur http://localhost:${app.get("port")}`);
});

/*
const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");

// Configuration de la connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/ai_academy")
    .then(() => console.log("Connexion réussie à MongoDB"))
    .catch(err => console.error("Erreur de connexion à MongoDB", err));

const app = express();

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(layouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes principales
app.get("/", homeController.showHome);
app.get("/about", homeController.showAbout);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showContact);

// Routes pour les abonnés
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/subscribers/new", subscribersController.getSubscriptionPage);
app.post("/subscribers/create", subscribersController.saveSubscriber);
app.get("/subscribers/:id", subscribersController.show);

// Gestion des erreurs
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Serveur démarré sur http://localhost:${app.get("port")}`);
});
*/