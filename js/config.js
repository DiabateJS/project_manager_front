const urlBase = 'http://localhost:85/project_manager_back_php/';
const CODE_SUCCES = "SUCCES";
const CODE_WARNING = "WARNING";
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
