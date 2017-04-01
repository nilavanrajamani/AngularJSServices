(function () {

    angular.module('app')
        .factory('dataService', ['$q', '$timeout', '$http', 'constants', dataService]);


    function dataService($q, $timeout, $http, constants) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook
        };

        //function getAllBooks() {

        //    var booksArray = [
        //        {
        //            book_id: 1,
        //            title: 'Harry Potter and the Deathly Hallows',
        //            author: 'J.K. Rowling',
        //            yearPublished: 2000
        //        },
        //        {
        //            book_id: 2,
        //            title: 'The Cat in the Hat',
        //            author: 'Dr. Seuss',
        //            yearPublished: 1957
        //        },
        //        {
        //            book_id: 3,
        //            title: 'Encyclopedia Brown, Boy Detective',
        //            author: 'Donald J. Sobol',
        //            yearPublished: 1963
        //        }
        //    ];

        //    var deferred = $q.defer();


        //    $timeout(function () {

        //        var successful = true;
        //        if (successful) {

        //            deferred.notify('Just getting started gathering books...');
        //            deferred.notify('Almost done gathering books...');

        //            deferred.resolve(booksArray);

        //        } else {

        //            deferred.reject('Error retrieving books.');

        //        }

        //    }, 1000);

        //    return deferred.promise;

        //}

        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                },
                transformResponse: transformGetBooks
            })
            //return $http.get('api/books/')
            .then(sendResponseData)
            .catch(sendGetBooksError);
        }

        function transformGetBooks(data, headersGetter) {

            console.log("Data: " + data);
            console.log("headersGetter: " + headersGetter);

            var transformed = angular.fromJson(data);

            console.log("transformed: " + transformed);

            transformed.forEach(function (currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });

            console.log(transformed);
            return transformed;

        }

        function getBookByID(bookID) {
            //return $http({
            //    method: 'GET',
            //    url: 'api/books/' + bookID
            //})
            return $http.get('api/books/' + bookID)
            .then(sendResponseData)
            .catch(sendGetBooksError);
        }

        function updateBook(book) {

            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book
            })
            .then(updateBookSuccess)
            .catch(updateBookError);
        }

        function updateBookSuccess(response) {
            return 'Book updated:' + response.config.data.title;
        }

        function updateBookError(response) {
            return $q.reject('Error updating book. (HTTP status: ' + response.status + ')');
        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendGetBooksError(response) {
            return $q.reject('Error retrieving details' + response.status);
        }

        function getAllReaders() {

            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];

            var deferred = $q.defer();

            $timeout(function () {

                deferred.resolve(readersArray);

            }, 1500);

            return deferred.promise;
        }

        function addBook(newBook) {

            //return $http
            //    ({
            //        method: 'POST',
            //        url: 'api/books',
            //        data: newBook
            //    })
            return $http.post('api/books', newBook, {
                transformRequest: transformPostRequest
            })
                .then(addBookSuccess)
                .catch(addBookError);
        }

        function transformPostRequest(data, headersGetter) {
            data.newBook = true;
            console.log(data);

            return JSON.stringify(data);
        }

        function addBookSuccess(response) {
            return 'Book added: ' + response.config.data.title;
        }

        function addBookError(response) {
            return $q.reject('Error adding Book. (HTTP status: ' + response.status + ')');
        }

        function deleteBook(bookID) {
            return $http({
                method: 'DELETE',
                url: 'api/books/' + bookID
            })
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        }

        function deleteBookSuccess() {
            return 'Book deleted';
        }

        function deleteBookError() {
            return $q.reject('Error adding Book. (HTTP status: ' + response.status + ')');
        }
    }

}());