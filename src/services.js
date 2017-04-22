const users = [{
    id: 1492817959,
    name: 'hector',
    rentedBook: 'id1'
},{
    id: 1492817960,
    name: 'test1'
}, {
    id: 1492817961,
    name: 'test2'
}]

const allBooks = [{
    id: 'id1',
    bookName: 'Harry Potter'
},{
    id: 'id2',
    bookName: 'Harry Potter 2'
},{
    id: 'id3',
    bookName: 'Harry Potter 3'
},{
    id: 'id4',
    bookName: 'Book 1'
},{
    id: 'id5',
    bookName: 'Book 2'
},{
    id: 'id6',
    bookName: 'Book 3'
}]


export function getUsers() {
    return new Promise((resolve) => {
        resolve(users);
    });
}

export function getBooks() {
    return new Promise((resolve) => {
        resolve(allBooks);
    });
}

