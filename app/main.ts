/// <reference path="../typings/tsd.d.ts" />
//import math = require('./math');
import key = require('./notation/key');
interface Person {
    firstname: string;
    lastname: string;
}

class Student implements Person{
    fullname: string;
    constructor(public firstname: string, public middle: string, public lastname: string){
        this.fullname = firstname + " " + middle + " " + lastname;
    }
}

function greeter(person: Student) {
    return "Hello, " + person.fullname + ".";
}



class Main{
    constructor() {
        var user = new Student("Jane", "M", "Smith");
        document.body.innerHTML = greeter(user);
        var y = new key("c");
        var x = y.getNoteFromKey(0);
        console.log(y.getScale());
        console.log(x);
        console.log("-.-")
    }
}

new Main();