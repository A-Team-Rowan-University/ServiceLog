function CardLookup(title, parent_element, card_type){
    var self = this;
    self.parent_element = parent_element;
    self.type = card_type;

    self.on_success = function (user) {};
    self.on_failure = function (user) {};

    self.main_element = document.createElement("div");
    self.main_element.classList += "border rounded";

    // Title
    self.title = document.createElement("h5");
    self.title.innerHTML = title;
    self.title.classList += "mb-1";
    self.main_element.appendChild(self.title);


    // Card input field
    self.input = document.createElement("input");
    self.input.type = "text";
    self.input.classList += "mb-1";

    self.input.addEventListener('input', function (e) {
        var id = this.value;
        self.success.remove();
        self.failure.remove();
        if (id.length >= 8) {
            google.script.run.withSuccessHandler(function(user){
                if(user.name) {
                    self.main_element.appendChild(self.success);
                    self.success_name.innerHTML = user.name;
                    self.success_email.innerHTML = user.email;
                    self.success_department.innerHTML = user.department;

                    if(typeof self.on_success === "function") {
                        self.on_success(user);
                    }

                }else{
                    self.main_element.appendChild(self.failure);
                    
                    if(typeof self.on_failure === "function") {
                        self.on_failure(user);
                    }
                }
            }).getUserInfo(id, self.type);
        }
    }, false);

    self.main_element.appendChild(self.input);


    // Success
    self.success = document.createElement("div");
    self.success_name = document.createElement("p");
    self.success_name.classList += " mb-1";
    self.success.appendChild(self.success_name);
    self.success_email = document.createElement("p");
    self.success_email.classList += " mb-1";
    self.success.appendChild(self.success_email);
    self.success_department = document.createElement("p");
    self.success_department.classList += " mb-1";
    self.success.appendChild(self.success_department);

    // Failure
    self.failure = document.createElement("p");
    self.failure.textContent = self.type + " not found";

    self.parent_element.appendChild(self.main_element);

    self.focus = function(){
        self.input.focus();
    }
}