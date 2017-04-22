<template>
  <div>
    <table>
      <tr v-for="user in users" track-by="$index">
        <td><input type="text" v-model="user.name"></td>
        <td>
          <select name="bookList" :id="user.id" v-model="user.rentedBook">
            <option disabled value="">Please select one</option>

            <option v-for="book in books"
            :disabled="isRented(book.id)"
            :value="book.id">{{book.bookName}}</option>
            <!-- <option v-for="book in books"
            :disabled="!isAvaiableForCurUser(user, book)"
            :value="book.id">{{book.bookName}}</option> -->
          </select>
        </td>
        <td>
          <button @click="removeUser($index)">Remove</button>
        </td>
      </tr>
    </table>
    <button @click="addUser">Add</button>

<!-- Data Structure -->
    <aside class="source left">
      <pre><code>
// users
{{users | json}}
      </code>
      </pre>
    </aside>

    <aside class="source right">
      <pre><code>
// all books
{{books | json}}

// rented books
{{rentedBooks | json}}
      </code>
      </pre>
    </aside>
  </div>
</template>

<script>

import { getUsers, getBooks } from '../services';

export default {
  data () {
    return {
      users: [],
      books: []
    }
  },
  computed: {
    rentedBooks() {
      return this.users.filter(user => user.rentedBook).map(user => user.rentedBook);
    }
  },
  created() {
    // init data
    Promise.all([getBooks(), getUsers()])
    .then((res) => {
      const books = res[0];
      const users = res[1];

      this.books = books;
      this.users = users;
    });
  },
  methods: {
    addUser() {
      const user = {
        id: Date.now() / 1000 | 0,  // generate unique id
        name: 'New user',
        rentedBook: ''
      };
      this.users.push(user);
    },
    removeUser(idx) {
      this.users.splice(idx, 1);
    },
    // isAvaiableForCurUser(user, book) {
    //   if(book.state === 'available') {
    //     return true;
    //   }
    //   // if(book.renter === user.id) {
    //   //   return true;
    //   // }
    //   return false;
    // },
    isRented(bookId) {
      return this.rentedBooks.includes(bookId);
    }
    // isCurrentRentedBook(user, book) {
    //   // debugger;
    //   console.log(user.name, book.bookName);
    //   return user.id === book.renter;
    // },
    // changeBookState(e){
    //   const userId = e.target.id | 0;
    //   const bookId = e.target.value;

    //   this.books.forEach((book) => {
    //     // change previous book state
    //     if(book.renter === userId) {
    //       book.state = 'available';
    //       book.renter = null;
    //     }
    //     // change current book state
    //     if(book.id === bookId) {
    //       // debugger;
    //       book.state = 'rented';
    //       book.renter = userId;
    //     }
        
    //   });
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
.source {
  position: absolute;
  top: 0;
  margin: 0 auto;
  text-align: left;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
</style>
