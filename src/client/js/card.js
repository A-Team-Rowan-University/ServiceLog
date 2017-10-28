function CardLookup(title, parent_element, card_type, lookup_email){
    var self = this;
    self.parent_element = parent_element;
    self.type = card_type;
    self.lookup_email = lookup_email;

    self.on_success = function (user) {};
    self.on_failure = function (user) {};

    self.main_element = document.createElement("div");
    self.main_element.classList += " border rounded";

    // Title
    self.title = document.createElement("h5");
    self.title.innerHTML = title + " Card";
    self.title.classList += "mb-1 m-3";
    self.main_element.appendChild(self.title);


    // Card input field
    self.input_group = document.createElement("div");
    self.input_group.classList += " input-group";
    self.input_group.classList += " input-group-sm";
    self.input_group.classList += " d-flex";

    self.input = document.createElement("input");
    self.input.type = "text";
    self.input.classList += " form-control";
    self.input.classList += " mb-1";
    self.input.classList += " m-3";

    self.input.addEventListener('input', function (e) {
        var id = this.value;
        self.success.remove();
        self.failure.remove();
        self.email.remove();
        if (id.length >= 8) {
            google.script.run.withSuccessHandler(function(user){
                if(user.name !== null) {
                    self.main_element.appendChild(self.success);
                    self.success_name.innerHTML = user.name;
                    self.success_email.innerHTML = user.email;
                    self.success_department.innerHTML = user.department;

                    if(typeof self.on_success === "function") {
                        self.on_success(user);
                    }

                }else{
                    if(self.lookup_email) {
                        self.main_element.appendChild(self.email);
                    }else{
                        self.main_element.appendChild(self.failure);
                    }
                    
                    if(typeof self.on_failure === "function") {
                        self.on_failure(user);
                    }
                }
            }).getUserInfo(id, self.type);
        }else{
            self.on_failure();
        }
    }, false);

    self.input_group.appendChild(self.input);
    self.main_element.appendChild(self.input_group);

    // Email
    self.email = document.createElement("div");
    self.email.classList += " m-3";

    self.email_title = document.createElement("h5");
    self.email_title.classList += " mb-1";
    self.email_title.textContent = title + " Email";

    self.email.appendChild(self.email_title);

    self.email_input_group = document.createElement("div");
    self.email_input_group.classList += " input-group";
    self.email_input_group.classList += " input-group-sm";
    self.email_input_group.classList += " d-flex";

    self.email_input = document.createElement("input");
    self.email_input.type = "text";
    self.email_input.classList += "form-control";

    self.email_input_group.appendChild(self.email_input);

    self.email_input_search_box = document.createElement("div");
    self.email_input_search_box.classList += " input-group-btn";

    self.email_input_search = document.createElement("button");
    self.email_input_search.type = "button";
    self.email_input_search.classList += " btn";
    self.email_input_search.classList += " btn-primary";
    self.email_input_search.textContent = "Search";

    self.email_input_search_box.appendChild(self.email_input_search);
    self.email_input_group.appendChild(self.email_input_search_box);
    self.email.appendChild(self.email_input_group);

    self.email_input_search.addEventListener('click', function (e) {
        google.script.run.withSuccessHandler(function(user){
            console.log(user);
            if(user.name !== null){
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
        }).new_customer(self.input.value, self.email_input.value);
    }, false);

    // Success
    self.success = document.createElement("div");
    self.success.classList += " m-3";
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
    self.failure.classList += " m-3 mb-1";
    self.failure.textContent = self.type + " not found";

    self.parent_element.appendChild(self.main_element);

    self.focus = function(){
        self.input.focus();
    }

    self.clear = function(){
        self.input.value = "";
        self.success.remove();
        self.failure.remove();
    }
}