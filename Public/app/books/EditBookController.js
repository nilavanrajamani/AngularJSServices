(function () {
    angular.module('app')
           .controller('EditBookController', ['$routeParams', 'books', '$cookies', '$cookieStore', EditBookController]);

    function EditBookController($routeParams, books, $cookie, $cookieStore) {
        var vm = this;

        //dataService.getAllBooks()
        //           .then(function (books) {
        vm.currentBook = books.filter(function (item) {
            return item.book_id == $routeParams.bookID;
        })[0];
        //    console.log($routeParams.bookID);
        //});

        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        }

        $cookieStore.put('lastEdited', vm.currentBook);
    }
})();