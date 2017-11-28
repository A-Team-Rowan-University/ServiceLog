
function Search(parent_element, requests, on_add) {
    var self = this;
    self.parent_element = parent_element;
    self.requests = requests;

    self.search_text = "";

    // Function that gets called when a service is added
    // Can be redefined by user
    self.on_add = on_add;
    self.focus = function () {
        self.search_input.focus();
    }

    self.clear_info = function () {
        self.info.classList += " hidden-lg-down";
        self.info.classList.remove("border");

        while(self.info.firstChild){
            self.info.removeChild(self.info.firstChild);
        }
    }

    self.input_group = document.createElement("div");
    self.input_group.classList += " input-group";
    self.input_group.classList += " input-group-lg";
    self.input_group.classList += " d-flex";

    self.info = document.createElement("div");
    self.info.classList += " rounded-bottom";
    self.info.classList += " hidden-lg-down";
    self.info.classList += " mx-3 mb-3";

    self.search_input = document.createElement("input");
    self.search_input.type = "text";
    self.search_input.classList += " form-control";
    self.search_input.placeholder = "Instrument scan or service description";
    self.search_input.addEventListener('input', function (e) {
        var input = this.value;

        self.clear_info();

        var found = self.requests.every(function (request, i) {
            console.log(request);
            if (request.regex.test(input)) {
                console.log("Test passed!");
                var custom = request.on_match(input, function (service) {
                    console.log("Adding Service: ");
                    console.log(service);
                    self.clear_info();
                    self.search_input.value = "";
                    self.focus();
                    self.on_add(service);
                });

                custom.classList += " m-3";
                self.info.appendChild(custom);
                self.info.classList.remove("hidden-lg-down");
                self.info.classList += " border";
                return false;
            } else {
                return true;
            }
        });

        console.log(found);

        if(!found) {
            //self.clear_info();
        }


    }, false);

    self.input_group.appendChild(self.search_input);

    self.parent_element.appendChild(self.input_group);
    self.parent_element.appendChild(self.info);

    self.clear = function(){
        self.search_input.value = "";
        self.search_text = "";
    }
}
