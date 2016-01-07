var f = function(r1, r2) {
    var v1 = r1;
    var v2 = r2;
    var thatone;

    var pub1 = function(a, b) {
        inner1();
        v1 = a;
        v2 = b;
        inner2();

    };

    var inner1 = function() {
        console.log("inner1 " + v1 + " " + v2);
    };

    var inner2 = function() {
        console.log("inner2 " + v1 + " " + v2);
    };

    var inner3 = function() {
        thatone = this;
        var i3 = this.v1;
    };

    inner3(); // generate a this?

    return {
        pub1: pub1,
    };
};


var person = function(first, last) {
    var _person = {};

    var firstName = first;
    var lastName = last;

    _person.fullName = function() {
        console.log(firstName + " " + lastName);
    };

    return _person;
};

var person1 = new person("Penelope", "PewPew");
person1.fullName();
var person2 = new person("Bob", "Barry");
person1.fullName();
person2.fullName();

var p1 = new f(5, 6);
var p2 = new f(15, 16);

p1.pub1(25, 26);
p2.pub1(35, 36);