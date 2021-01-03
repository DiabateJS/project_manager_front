app.factory('MenuData', function(){
    return {
                items:[
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
                ]
    }
});
