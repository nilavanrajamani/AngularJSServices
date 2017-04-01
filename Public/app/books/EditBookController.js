(function () {
    angular.module('app')
           .controller('EditBookController', ['$routeParams', 'books',
               '$cookies', '$cookieStore', 'dataService',
               '$log', '$location', 'BooksResource', EditBookController]);

    function EditBookController($routeParams, books, $cookie, $cookieStore,
        dataService, $log, $location, BooksResource) {
        var vm = this;

        //dataService.getAllBooks()
        //           .then(function (books) {
        //vm.currentBook = books.filter(function (item) {
        //    return item.book_id == $routeParams.bookID;
        //})[0];
        //    console.log($routeParams.bookID);
        //});



        //dataService.getBookByID($routeParams.bookID)
        //           .then(getBooksSuccess)
        //           .catch(getBookError);

        vm.currentBook = BooksResource.get({ book_id: $routeParams.bookID });
        $log.log(vm.currentBook);

        function getBooksSuccess(book) {
            vm.currentBook = book;
            $log.info(book);
            $cookieStore.put('lastEdited', vm.currentBook);
        }

        function getBookError(reason) {
            $log.error(reason);
        }

        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        }

        vm.saveBook = function () {
            //dataService.updateBook(vm.currentBook)
            //           .then(updateBookSuccess)
            //           .catch(updateBookError);

            vm.currentBook.$update();
            $location.path("/");
        }

        function updateBookSuccess(message) {
            $log.info(message);
            $location.path("/");
        }

        function updateBookError(errorMessage) {
            $log.error(errorMessage);
        }


    }
})();