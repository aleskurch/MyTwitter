class Controller {
    static countOfPosts;
    static filter;
    static countOfDotsClick = 0;

    static addPostButton(event) {

        event.preventDefault();
        const post = {};
        post.description = event.target.elements.addText.value;
        const arrayTags = event.target.elements.addTags.value.split("#");
        post.hashTags = arrayTags.slice(1);
        event.target.reset();

        if (event.target.elements.grRefresh.id === ' ') {
            post.likes = [];
            if (module.add(post)) {
                view.addItem(post)
            }
        } else {
            post.likes = [];
            const id = event.target.elements.grRefresh.id;
            event.target.elements.grRefresh.id = ' ';
            if (module.edit(Number.parseInt(id), post)) {
                view.edit(id, post);
                event.target.elements.grRefresh.style.display = 'none';
                event.target.elements.grUp.style.display = 'block';
            }
            window.location.reload()
        }
    }

    static logOutButton(event) {
        event.preventDefault();

        localStorage.setItem('user', 'Unnamed');
        view.setNickName();
        window.location.reload()
    }

    static logInButton(event) {
        event.preventDefault();
        document.getElementById("shade").style.visibility = "visible";
        document.getElementById("logInForm").style.visibility = "visible";
    }

    static logInFormCancel(event) {
        event.preventDefault();
        event.target.parentElement.reset();
        document.getElementById("shade").style.visibility = "hidden";
        document.getElementById("logInForm").style.visibility = "hidden";
    }

    static logInFormOk(event) {
        event.preventDefault();
        localStorage.setItem('user', document.getElementById("logInFormText").value);
        view.setNickName();
        document.getElementById("shade").style.visibility = "hidden";
        document.getElementById("logInForm").style.visibility = "hidden";
        event.target.parentElement.reset();
        window.location.reload();
    }

    static ContainerEvents(event) {
        event.preventDefault();
        if (event.target.className === 'moreImg') {
            if (Controller.countOfDotsClick % 2 === 0)
                event.target.parentElement.parentElement.querySelector('[class="ChangeBlock"]').style.display = "inline";
            if (Controller.countOfDotsClick % 2 === 1)
                event.target.parentElement.parentElement.querySelector('[class="ChangeBlock"]').style.display = "none";
            Controller.countOfDotsClick += 1
        }
        if (event.target.className === 'seeMore') {
            const posts = module.getPage(Controller.countOfPosts, 10, Controller.filter);
            view.addAll(posts);
            Controller.countOfPosts += posts.length;
        }
        if (event.target.className === 'ChangeBlockDelete') {
            const id = event.target.parentElement.parentElement.id;
            event.target.parentElement.parentElement.querySelector('[class="ChangeBlock"]').style.display = "none"
            view.delete(id);
            module.remove(id);
        }
        if (event.target.className === 'ChangeBlockEdit') {
            event.target.parentElement.parentElement.querySelector('[class="ChangeBlock"]').style.display = "none"
            const id = event.target.parentElement.parentElement.id;
            view.fillPostCreation(module.get(Number.parseInt(id)));
        }
        /*if (event.target.className === 'like') {
            const post = {};
            const id = event.target.parentElement.id;
            const likers = [];
            likers.push(localStorage.getItem('user'));
            module.get(Number.parseInt(id)).likes.forEach(p => likers.push(p));
            post.likes=likers;
            module.addLiker(Number.parseInt(id), post);
            event.target.parentElement.querySelector('[class="like"]').style.color = "#B0B413";
        }*/
    }

    static FilterEvent(event) {
        event.preventDefault();
        const filter = {};

        filter.author = event.target.elements.name.value;
        filter.hashTags = event.target.elements.tag.value.split("#").filter(tag => tag !== '');
        filter.dateFrom = new Date(event.target.elements.dateFrom.value);
        filter.dateTo = new Date(event.target.elements.dateTo.value);

        Controller.filter = filter;

        const posts = module.getPage(0, 10, Controller.filter);
        Controller.countOfPosts = posts.length;
        view.clearList();
        view.addAll(posts);
    }
}

let view;
let module;
window.onload = () => {
    if (localStorage.getItem('user') === null) {
        localStorage.setItem('user', 'Unnamed');
    } else {
        localStorage.getItem('user');
    }
    document.forms.addPost.addEventListener('submit', Controller.addPostButton);
    document.getElementById("logOut").addEventListener('click', Controller.logOutButton);
    document.getElementById("logIn").addEventListener('click', Controller.logInButton);
    document.getElementById("logInFormCancel").addEventListener('click', Controller.logInFormCancel);
    document.getElementById("logInFormOk").addEventListener('click', Controller.logInFormOk);
    document.getElementById("container").addEventListener('click', Controller.ContainerEvents);
    document.forms.menu.addEventListener('submit', Controller.FilterEvent);
    let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;
    view = new View();
    while (i--) {
        if (Number.parseInt(keys[i])) {
            let value = JSON.parse(localStorage.getItem(keys[i]));
            value.createdAt = new Date(value.createdAt);
            values.push(value);
        }
    }
    values.sort((a, b) => a.id - b.id);
    module = new Module(values);
    const posts = module.getPage(0, 10);
    Controller.countOfPosts = posts.length;
    view.addAll(posts);
    view.setNickName();
};