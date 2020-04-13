class Module {
    _posts = [];

    validate(post = {}) {
        if (typeof post.id !== 'string') {
            console.log("Problem with id");
            return false
        }
        if (typeof post.description !== 'string' || post.description.length >= 200) {
            console.log("Problem with description");
            return false
        }
        if (Object.prototype.toString.call(post.createdAt) !== '[object Date]') {
            console.log("Problem with date");
            return false
        }
        if (typeof post.author !== 'string' || post.author.length <= 0) {
            console.log("Problem with author");
            return false
        }
        if (typeof post.photoLink !== 'string' && post.photoLink !== undefined) {
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

    getPage(skip = 0, top = 10, filterConfig = {}) {
        this.filterConfig = filterConfig;
        if (this.filterConfig != null) {
            return this._posts.filter(p => (this.filterConfig.author == null || p.author === this.filterConfig.author) &&
                (this.filterConfig.tags == null || this.filterConfig.tags.filter(tag => p.hashTags.includes(tag)).length === this.filterConfig.tags.length))
                .slice(skip, skip + top).sort(a => a.createdAt);
        }
        return this._posts.slice(skip, skip + top).sort(a => a.createdAt);
    }

    get(id = 0) {
        return this._posts.find(value => value.id === id)
    }

    add(post = {}) {
        if (!this.validate(post) || this.get(post.id)) {
            return false;
        }

        this._posts.push(post);
        return true;
    }

    remove(id = 0) {
        this._posts = this._posts.filter(value => value.id !== id);
        return true
    }

    edit(id = 0, post = {}) {
        let postToEdit = this.get(id);
        if (!postToEdit) {
            return false;
        }
        Object.keys(post).forEach(field => postToEdit[field] = post[field]);
        if (!this.validate(this.get(id)))
            return false;
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
    me = 'Ales Kurch'
    template = document.getElementById('template');
    container = document.getElementById('container');

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

        });
        newNote.firstElementChild.setAttribute('id', data.id)
        this.container.insertBefore(newNote, this.container.firstElementChild);
    }
    addAll(posts = []) {
        posts.forEach((post) => this.addItem(post))
    }
    delete(id = '') {
        document.getElementById(id)?.remove();
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
        newNote.firstElementChild.setAttribute('id', data.id)
        document.getElementById(id).replaceWith(newNote);
    }
}
//Testing
let view
let module
window.onload = () => {
    view = new View()
    module = new Module()
}
function addPost(post) {
    if (module.add(post))
        view.addItem(post)
}
function addPosts(posts) {
    if (module.addAll(posts))
        view.addAll(posts)
}
function deletePost(id) {
    view.delete(id)
    module.remove(id)
}
function editPost(id, post) {
    if (module.edit(id, post))
        view.edit(id, module.get(id))
}
/*{
            id: '1',
            description: 'test1',
            createdAt: new Date(),
            author: 'test1',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: [
                'poetry', 'flowers'
            ],
            likes: [
                'Shakespeare'
            ]
        },
        {
            id: '2',
            description: 'Me2',
            createdAt: new Date('2020-03-17T23:00:00'),
            author: 'Ales Kurch',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: [
                'poetry', 'flowers'
            ],
            likes: [
                'Shakespeare'
            ]
        },
        {
            id: '3',
            description: 'test3',
            createdAt: new Date('2020-03-17T23:00:00'),
            author: 'test3',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            hashTags: [
                'poetry', 'flowers'
            ],
            likes: [
                'Shakespeare'
            ]
        }
         { description: 'test edit' }
        */