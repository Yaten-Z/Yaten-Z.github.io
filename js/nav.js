document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);

//响应pjax
function tonav() {
    document.getElementById("name-container").setAttribute("style", "display:none");

    var position = $(window).scrollTop();

    $(window).scroll(function () {

        var scroll = $(window).scrollTop();

        if (scroll > position) {
            document.getElementById("mask-name-container").setAttribute("style", "");
            document.getElementById("name-container").setAttribute("style", "top: 10px !important;");
            document.getElementsByClassName("menus_items")[1].setAttribute("style", "top: -60px !important;");

        } else {
            document.getElementById("mask-name-container").setAttribute("style", "z-index: -1 !important");
            document.getElementById("name-container").setAttribute("style", "top: 70px !important;");
            document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
        }

        position = scroll;
    });

    function scrollToTop() {
        document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
        document.getElementById("name-container").setAttribute("style", "display:none");
        btf.scrollToDest(0, 500);
    }

//修复没有弄右键菜单的童鞋无法回顶部的问题
    document.getElementById("page-name").innerText = document.title.split(" | June's Blog")[0];
}