// Données des cours (seront remplacées par une base de données plus tard)
const courses = [
    {
    title: "Introduction à l'IA",
    description: "Découvrez les fondamentaux de l'intelligence artificielle.",
    price: 199,
    level: "Débutant"
    },
    {
    title: "Machine Learning Fondamental",
    description: "Apprenez les principes du machine learning et les algorithmes de base.",
    price: 299,
    level: "Intermédiaire"
    },
    {
    title: "Deep Learning Avancé",
    description: "Maîtrisez les réseaux de neurones profonds et leurs applications.",
    price: 399,
    level: "Avancé"
    }
    ];
    exports.index = (req, res) => {
    res.render("index", { pageTitle: "Accueil" });
    };
    exports.about = (req, res) => {
    res.render("about", { pageTitle: "À propos" });
    };
    exports.courses = (req, res) => {
    res.render("courses", {
    pageTitle: "Nos Cours",
    courses: courses
    });
    };
    exports.contact = (req, res) => {
    res.render("contact", { pageTitle: "Contact", errors: [] });
    };
    exports.processContact = (req, res) => {
        const { name, email } = req.body;
        const errors = [];

    if (!name || name.trim() === '') {
        errors.push('Le nom est requis');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Veuillez entrer une adresse email valide');
    }

    if (errors.length > 0) {
        return res.render('contact', {
            pageTitle: 'Contact',
            errors: errors,
            formData: req.body
        });
    }

    // Traitement si validation OK
    req.flash('success', 'Message envoyé avec succès!');
    res.redirect('/');
    };
    // Ajouter cette méthode au contrôleur
exports.faq = (req, res) => {
    const faqs = [
        {
            question: "Quels sont les prérequis pour suivre les cours?",
            answer: "Nos cours débutants ne nécessitent aucun prérequis. Pour les cours avancés, une connaissance de base en programmation est recommandée."
        },
        {
            question: "Comment puis-je payer pour un cours?",
            answer: "Nous acceptons les cartes de crédit, PayPal et les virements bancaires."
        },
        {
            question: "Puis-je obtenir un remboursement?",
            answer: "Oui, nous offrons un remboursement complet dans les 30 jours suivant l'achat si vous n'êtes pas satisfait."
        },
        {
            question: "Les cours sont-ils disponibles à vie?",
            answer: "Oui, une fois acheté, vous avez un accès à vie au contenu du cours, y compris les futures mises à jour."
        },
        {
            question: "Offrez-vous des certificats?",
            answer: "Oui, nous délivrons un certificat de complétion pour chaque cours terminé avec succès."
        }
    ];
    
    res.render("faq", { 
        pageTitle: "FAQ",
        faqs: faqs
    });
};