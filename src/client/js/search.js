
function Search(parent_element, requests) {
    var self = this;
    self.parent_element = parent_element;
    self.requests = requests;

    self.search_text = "";

    self.onadd = function(search) {};

    self.search_input = document.createElement("input");
    self.search_input.type = "text";
    self.search_input.addEventListener('input', function (e) {
        var input = this.value;
        if(/[0-9]{11}/.test(input)){
            // This is a scanned id
            console.log("Instrument ID: " + input);
            google.script.run.withSuccessHandler(function (instrument) {
                self.search_text = input;
                self.onadd({
                    search: self.search_text,
                    type: "instrument",
                    data: instrument,
                });
            }).equipment_search(input);
        } else {
            console.log("Not instrument ID: " + input);
            self.search_text = input;
        }
    }, false);
    self.parent_element.appendChild(self.search_input);

    self.button_box = document.createElement("div");
    self.button_box.classList += "btn-group btn-group";
    self.requests.forEach(function(request, i){
        var request_button = document.createElement("input");
        request_button.type = "button";
        request_button.classList += "btn btn-primary";
        request_button.value = request.name;
        request_button.addEventListener('click', function (e) {
            self.onadd({
                search: self.search_text,
                type: request.type,
                data: {},
            });
        }, false);
        self.button_box.appendChild(request_button);
    });

    self.parent_element.appendChild(self.button_box);
}
