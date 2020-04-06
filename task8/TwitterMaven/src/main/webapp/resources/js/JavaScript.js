class module {
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

    getPosts(skip = 0, top = 10, filterConfig = {}) {
        this.filterConfig = filterConfig;
        if(this.filterConfig != null) {
            return this._posts.filter(p => (this.filterConfig.author == null || p.author === this.filterConfig.author) &&
                (this.filterConfig.tags == null || this.filterConfig.tags.filter(tag => p.hashTags.includes(tag)).length === this.filterConfig.tags.length))
        .slice(skip, skip + top).sort(a => a.createdAt);
        }
        return this.posts.slice(skip, skip + top).sort(a => a.createdAt);
    }

    getPost(id = 0) {
        return this._posts.find(value => value.id === id)
    }

    addPost(post = {}) {
        if (!this.validate(post) || this.getPost(post.id)) {
            return false;
        }

        this._posts.push(post);
        return true;
    }

    removePost(id = 0) {
        this._posts = this._posts.filter(value => value.id !== id);
        return true
    }

    editPost(id = 0, post = {}) {
        let postToEdit = this.getPost(id);
        if(!postToEdit){
            return false;
        }
        Object.keys(post).forEach(field => postToEdit[field] = post[field]);
        if (!this.validate(this.getPost(id)))
            return false;
        return true;
    }

    addAll(posts = []) {
        let failed = posts.filter(post => !this.addPost(post));
        return failed;
    }

    clear() {
        this._posts = []
    }

    constructor(posts = []) {
        this._posts = posts.filter(post => this.validate(post));
    }
}

//Testing
const twitter = new module([
    {
        id: '1',
        description: 'Roses are red violets -- are blue',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Shakespeare',
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
        description: 'test2',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test2',
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
    },
    {
        id: '4',
        description: 'test4',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test4',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: []
    },
    {
        id: '5',
        description: 'test5',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test5',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '6',
        description: 'test6',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test6',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '7',
        description: 'test7',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test7',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '8',
        description: 'test8',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test8',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '9',
        description: 'test9',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test9',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '10',
        description: 'test10',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test10',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '11',
        description: 'test11',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test11',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '12',
        description: 'test12',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test12',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '13',
        description: 'test13',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test13',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '14',
        description: 'test14',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test14',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '15',
        description: 'test15',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test15',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
]);

console.log(twitter.addAll([
    {
        id: '16',
        description: 'test16',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test16',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '17',
        description: 'test17',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test17',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '18',
        description: 'test18',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test18',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '19',
        description: 'test19',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test19',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '20',
        description: 'test20',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test10',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '20',
        description: 'test20',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test10',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
    {
        id: '20',
        description: 'test20',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'test10',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'poetry', 'flowers'
        ],
        likes: [
            'Shakespeare'
        ]
    },
]));

console.log(twitter.getPosts(0, 10, {author: 'Shakespeare', hashTags: ['flowers']}));
console.log(twitter.getPost('1'));
console.log(twitter.editPost('1', {description: 'edited description'}));
console.log(twitter.editPost('1', {a: 'aaa'}));
console.log(twitter.validate(twitter.getPost('1')));
console.log(twitter.validate({id: '2'}));
let addedPost = Object.assign({}, twitter.getPost('1'));
addedPost.id = '21';
console.log(twitter.addPost(addedPost));
console.log(twitter.removePost('21'));
console.log(twitter.getPosts());
let postWithoutPhoto = {
    id: '56',
    description: 'Roses are red violets -- are blue',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'Shakespeare',
    hashTags: [
        'poetry', 'flowers'
    ],
    likes: [
        'Shakespeare'
    ]
};
console.log(twitter.addPost(postWithoutPhoto));
console.log(twitter.addPost(postWithoutPhoto));