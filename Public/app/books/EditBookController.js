(function () {
    angular.module('app')
           .controller('EditBookController', ['$routeParams', 'books', '$cookies', '$cookieStore', 'dataService', '$log', '$location', EditBookController]);

    function EditBookController($routeParams, books, $cookie, $cookieStore, dataService, $log, $location) {
        var vm = this;

        //dataService.getAllBooks()
        //           .then(function (books) {
        //vm.currentBook = books.filter(function (item) {
        //    return item.book_id == $routeParams.bookID;
        //})[0];
        //    console.log($routeParams.bookID);
        //});

        dataService.getBookByID($routeParams.bookID)
                   .then(getBooksSuccess)
                   .catch(getBookError);

        function getBooksSuccess(book) {
            vm.currentBook = book;
            $cookieStore.put('lastEdited', vm.currentBook);
        }

        function getBookError(reason) {
            $log.error(reason);
        }

        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        }

        vm.saveBook = function () {
            dataService.updateBook(vm.currentBook)
                       .then(updateBookSuccess)
                       .catch(updateBookError);
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