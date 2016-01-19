define(["require", "exports", './notation/key'], function (require, exports, key) {
    var Student = (function () {
        function Student(firstname, middle, lastname) {
            this.firstname = firstname;
            this.middle = middle;
            this.lastname = lastname;
            this.fullname = firstname + " " + middle + " " + lastname;
        }
        return Student;
    })();
    function greeter(person) {
        return "Hello, " + person.fullname + ".";
    }
    var Main = (function () {
        function Main() {
            var user = new Student("Jane", "M", "Smith");
            document.body.innerHTML = greeter(user);
            var y = new key("c");
            var x = y.getNoteFromKey(0);
            console.log(y.getScale());
            console.log(x);
            console.log("-.-");
        }
        return Main;
    })();
    new Main();
});
