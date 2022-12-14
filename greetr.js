;(function(window, $) {

    // 'new' an object
    let Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language)
    };

    // hidden within the scope of the IIFE and never directly accessible
    const langs = ["en", "es"];

    // informal greetings
    const greetings = {
        en: "Hello",
        es: "Hola"
    };

    // formal greetings
    const formalGreeting = {
        en: "Greetings",
        es: "Saludos"
    };

    // logger messages
    const logMessages = {
        en: "Logged in",
        es: "Logged in, in spanish"
    }

    // prototype holds methods (to save memory space)
    Greetr.prototype = { 

        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + " " + this.lastName;
        },

        validate: function() {
            
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if(langs.indexOf(this.language) === -1) {
                throw "invalid language";
            };
        },

        // retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + " " + this.firstName;
        },

        formalGreetings: function() {
            return formalGreeting[this.language] + ", " + this.fullName();
        },

        // chainable methods return their own containing object
        greet: function(formal) {
            let msg;

            // if undefined or null it will be coerced to 'false'
            if(formal) {
                msg = this.formalGreetings();
            }
            else {
                msg = this.greeting();
            }

            if(console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time 
            // makes the method chainable 
            return this;
        },

        log: function() {
            if(console) {
                console.log(logMessages[this.language] + ": " + this.fullName())
            }

            // make chainable
            return this;
        },

        setLang: function(lang) {

            // set the language
            this.language = lang;

            // validate
            this.validate();

            // make chainable
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw "jQuery is not loaded";
            }
            if(!selector) {
                throw "missing jQuery selector"
            }

            // determine the message
            let msg;
            if(formal) {
                msg = this.formalGreetings();
            }
            else {
                msg = this.greeting();
            }

            // inject the message in the chosen place in the DOM
            $(selector).html(msg);

            // make chainable
            return this;
        }
     };

     // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language) {

        let self = this;

        self.firstName = firstName || "";
        self.lastName = lastName || "";
        self.language = language || "en";

        self.validate();

    }

    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
    window.Greetr = window.G$ = Greetr;     

}(window, $));