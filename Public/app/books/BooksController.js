(function () {

    angular.module('app')
        .controller('BooksController', ['$q', 'books', 'dataService', 'badgeService',
            '$cookies', '$cookieStore', '$log', '$route', 'BooksResource', 'currentUser', BooksController]);


    function BooksController($q, books, dataService, badgeService, $cookies,
        $cookieStore, $log, $route, BooksResource, currentUser) {

        var vm = this;

        vm.appName = books.appName;

        dataService.getUserSummary()
                   .then(getUserSummarySuccess);

        function getUserSummarySuccess(summaryData) {
            console.log(summaryData);
            vm.summaryData = summaryData;
        }

        /*
        The following section of code performs the same function as the larger section
        below, but waits until both promises are resolved before processing the results.
        It was demonstrated in the module, so I'm leaving it here as a reference.
         */
        /*
        var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();

        $q.all([booksPromise, readersPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError);

        function getAllDataSuccess(dataArray) {
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }

        function getAllDataError(reason) {
            console.log(reason);
        }
        */

        //dataService.getAllBooks()
        //    .then(getBooksSuccess, null, getBooksNotification)
        //    .catch(errorCallback)
        //    .finally(getAllBooksComplete);

        vm.allBooks = BooksResource.query();

        function getBooksSuccess(books) {
            //throw 'error in success handler';
            vm.allBooks = books;
        }

        //function getBooksError(reason) {
        //    console.log(reason);
        //}

        function getBooksNotification(notification) {
            //console.log('Promise Notification: ' + notification);
        }

        function errorCallback(errorMsg) {
            console.log('Error Message: ' + errorMsg);
        }

        function getAllBooksComplete() {
            //console.log('getAllBooks has completed');
        }

        //vm.allReaders = dataService.getAllReaders();

        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(errorCallback)
            .finally(getAllReadersComplete);

        function getReadersSuccess(readers) {
            vm.allReaders = readers;
            $log.log('All readers retrieved');
        }

        function getAllReadersComplete() {
            //console.log('getAllReaders has completed');
        }

        vm.deleteBook = function (bookID) {
            dataService.deleteBook(bookID)
                       .then(deleteBookSuccess)
                       .catch(deleteBookError);
        };

        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(message) {
            $log.error(errorMessage);
        }

        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;

        //vm.lastEdited = $cookieStore.get('lastEdited');
        vm.currentUser = currentUser;
        $log.info("currentUser");
        $log.info(currentUser);

        $log.log('logging with log');
        $log.info('logging with info');
        $log.warn('logging with warn');
        $log.error('logging with error');
        $log.debug('logging with debug');


    }

}());