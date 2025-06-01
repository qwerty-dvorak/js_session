const person = {
  name: "Sam",
  sayHello: function() {
    setTimeout(function() {
      console.log("Hello, " + this.name);
    }, 1000);
  }
};

person.sayHello(); 
