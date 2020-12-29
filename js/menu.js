function loadSideBar(){
    var code = "";
    MENU_ITEMS.forEach(menu => {
        code += "<li class='sub-menu'>";
        code += "<a href='javascript:;'>";
        code += "<i class='fa "+menu.icon+"'></i>";
        code += "<span>"+menu.titre+"</span>";
        code += "</a>";
        code +="<ul class='sub'>";
        menu.contenu.forEach(lib => {
            code += "<li><a href='"+lib.lien+"'>"+lib.titre+"</a></li>";
        });
        code += "</ul>";
        code += "</li>";
    });
    $("#nav-accordion").html($("#nav-accordion").html() + code);

}
