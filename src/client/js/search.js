
function Search(parent_element, requests) {
    var self = this;
    self.parent_element = parent_element;
    self.requests = requests;

    self.search_text = "";

    self.onadd = function(search) {};
    self.focus = function() {
        self.search_input.focus();
    }

    self.input_group = document.createElement("div");
    self.input_group.classList += " input-group";
    self.input_group.classList += " input-group-lg";

    self.search_input = document.createElement("input");
    self.search_input.type = "text";
    self.search_input.classList += "form-control";
    self.search_input.placeholder = "Instrument scan or service description";
    self.search_input.addEventListener('input', function (e) {
        var input = this.value;
        if(/[0-9]{11}/.test(input)){
            // This is a scanned id
            google.script.run.withSuccessHandler(function (instrument) {
                self.search_text = input;
                self.onadd({
                    search: self.search_text,
                    type: "instrument",
                    name: "Instrument Loan",
                    data: instrument,
                });
                self.search_input.value = "";
            }).equipment_search(input);
        } else {
            self.search_text = input;
        }
    }, false);
    self.input_group.appendChild(self.search_input);

    self.requests.forEach(function(request, i){
        var button_box = document.createElement("div");
        button_box.classList += "input-group-btn";
        var request_button = document.createElement("button");
        request_button.type = "button";
        request_button.classList += " btn";
        request_button.classList += " btn-primary";
        request_button.innerHTML = request.name;
        request_button.addEventListener('click', function (e) {
            self.onadd({
                search: self.search_text,
                type: request.type,
                name: request.name,
                data: {},
            });
            self.search_input.value = "";
        }, false);
        button_box.appendChild(request_button);
        self.input_group.appendChild(button_box);
    });

    self.parent_element.appendChild(self.input_group);
}
