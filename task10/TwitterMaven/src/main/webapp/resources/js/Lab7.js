class Module {
    _posts = [];

    validate(post = {}) {
        if (typeof post.description !== 'string' || post.description.length >= 200) {
            console.log("Problem with description");
            return false
        }
        /*if (Object.prototype.toString.call(post.createdAt) !== '[object Date]') {
            console.log("Problem with date");
            return false
        }*/
        if (typeof post.author !== 'string' || post.author.length <= 0) {
            console.log("Problem with author");
            return false
        }
        if (!Array.isArray(post.hashTags) && post.hashTags !== undefined) {
            console.log("Problem with tags");
            return false
        }
        if (!Array.isArray(post.likes) && post.likes !== undefined) {
            console.log("Problem with likers");
            return false
        }
        return true
    }

    getPage(skip = 0, top = 10, filterConfig) {
        if (filterConfig != null) {
            return this._posts.filter(p => (filterConfig.author == null || filterConfig.author.length === 0 || p.author === filterConfig.author) &&
                (isNaN(filterConfig.dateFrom) || p.createdAt > filterConfig.dateFrom) &&
                (isNaN(filterConfig.dateTo) || p.createdAt <= filterConfig.dateTo) &&
                (filterConfig.hashTags == null || filterConfig.hashTags.filter(tag => p.hashTags.includes(tag)).length === filterConfig.hashTags.length))
                .slice(skip, skip + top).sort((a, b) => a.createdAt - b.createdAt);
        }
        return this._posts.slice(skip, skip + top).sort((a, b) => a.createdAt - b.createdAt);

    }

    get(id = 0) {
        return this._posts.find(value => value.id === id)
    }

    add(post = {}) {
        post.createdAt = new Date();
        post.author = localStorage.getItem('user');

        if(this._posts.length === 0) {
            post.id = 1;
        }
        else {
            post.id = this._posts[this._posts.length-1].id+1;
        }

        if (!this.validate(post)) {
            return false;
        }

        localStorage.setItem(post.id, JSON.stringify(post))
        this._posts.push(post);
        return true;
    }

    remove(id = 0) {
        this._posts = this._posts.filter(value => value.id !== id);
        localStorage.removeItem(id);
        return true
    }

    edit(id = 0, post = {}) {
        let postToEdit = this.get(id);
        post.author = postToEdit.author;
        post.createdAt = postToEdit.createdAt;
        if (!postToEdit || !this.validate(post)){
            return false;
        }
        Object.keys(post).forEach(field => postToEdit[field] = post[field]);
        localStorage.setItem(String(id), JSON.stringify(postToEdit));
        return true;
    }
    addLiker(id = 0, post = {}) {
        let postToEdit = this.get(id);
        post.author = postToEdit.author;
        post.createdAt = postToEdit.createdAt;
        post.description=postToEdit.description;
        post.tag=postToEdit.tag;
        if (!postToEdit || !this.validate(post)){
            return false;
        }
        Object.keys(post).forEach(field => postToEdit[field] = post[field]);
        localStorage.setItem(String(id), JSON.stringify(postToEdit));
        return true;
    }

    addAll(posts = []) {
        let failed = posts.filter(post => !this.add(post));
        return failed;
    }

    clear() {
        this._posts = []
    }

    constructor(posts = []) {
        this._posts = posts.filter(post => this.validate(post));
    }
}
class View {
    me = localStorage.getItem('user')
    template = document.getElementById('template');
    container = document.getElementById('container');
    nickname=document.getElementById('nickname')

    setNickName(){
        this.nickname.textContent=localStorage.getItem('user')
    }
    addItem(data) {
        let newNote = document.importNode(this.template.content, true);
        let placeholders = newNote.querySelectorAll('[data-target]');

        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('data-target');
            if (key == 'createdAt') {
                phElement.textContent = String(data[key].toLocaleString())
            }
            else{
                if(key == 'hashTags'){
                    phElement.textContent=String(data.hashTags.map(item => '#' + item).join(''));
                }
                else
                phElement.textContent = String(data[key]);
            }
            if (key == 'author' && String(data[key]) == this.me){
                newNote.firstElementChild.style.background = "rgba(176, 180, 19, 0.56)"
                newNote.firstElementChild.querySelector('[class="teg"]').style.color="rgba(134, 204, 219, 0.86)"
                newNote.firstElementChild.querySelector('[class="more"]').style.visibility="visible"
            }
            if(data.likes.includes(localStorage.getItem('user'))){
                console.log("true");
                newNote.firstElementChild.querySelector('[class="like"]').style.color="#B0B413"
            }

        });
        newNote.firstElementChild.setAttribute('id', data.id);
        this.container.insertBefore(newNote, this.container.firstElementChild);
    }
    fillPostCreation(post={}){
        const form=document.forms.addPost;
        form.grUp.style.display='none';
        form.grRefresh.style.display='block';
        form.grRefresh.id=post.id;
        form.addText.value=post.description;
        form.addTags.value=String(post.hashTags.map(item => '#' + item).join(''));
    }
    addAll(posts = []) {
        posts.forEach((post) => this.addItem(post))
    }
    delete(id = '') {
        document.getElementById(id)?.remove();
    }

    clearList() {
        let firstChild = this.container.firstElementChild;

        while(firstChild != null && firstChild !== this.container.lastElementChild) {
            this.container.removeChild(firstChild);
            firstChild = this.container.firstElementChild;
        }
    }

    edit(id = '', data = {}) {
        let newNote = document.importNode(this.template.content, true);
        let placeholders = newNote.querySelectorAll('[data-target]');

        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('data-target');
            if (key == 'createdAt') {
                phElement.textContent = String(data[key].toLocaleString())
            }
            else{
                if(key == 'hashTags'){
                    phElement.textContent=String(data.hashTags.map(item => '#' + item).join(''));
                }
                else
                phElement.textContent = String(data[key]);
            }
            if (key == 'author' && String(data[key]) == this.me){
                newNote.firstElementChild.style.background = "rgba(176, 180, 19, 0.56)"
                newNote.firstElementChild.querySelector('[class="teg"]').style.color="rgba(134, 204, 219, 0.86)"
                newNote.firstElementChild.querySelector('[class="more"]').style.visibility="visible"
            }
        });
        newNote.firstElementChild.setAttribute('id', data.id);
        document.getElementById(id).replaceWith(newNote);
    }
}