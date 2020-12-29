const urlBase = 'http://localhost:8080/Project%20Manager%20Api/';
const CODE_SUCCES = "SUCCES";
const PROJECT_NAME = "Projet Manager";
const SIMPLE_USER_PROFILE = "simple_user_profile";
const STATUS_A_FAIRE = "A_FAIRE";

const MENU_ITEMS = [
    {
        titre: 'Projets',
        icon: 'fa-desktop',
        contenu: [
            {titre:'Nouveau', lien:'nouveau_projet.html'}
        ]
    },
    {
        titre: 'Users',
        icon: 'fa-group',
        contenu: [
            {titre:'Nouveau', lien:'nouveau_user.html'},
            {titre:'Profile', lien:'user_profile.html'}
        ]
    }
];
