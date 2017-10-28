
function Submit(parent_element) {
    var self = this;

    self.parent_element = parent_element;

    self.get_info = function() {
        return null;
    }

    self.on_submit = function() {}

    self.on_failed_submit = function() {}


    self.submit_button = document.createElement("button");
    self.submit_button.classList += " btn btn-primary";
    self.submit_button.textContent = "Submit";
    self.submit_button.addEventListener('click', function() {
        var state = self.get_info();
        console.log(state);
        if(state && state.employee && state.customer){
            self.on_submit();
            console.log("Submitint");
            var to_submit = [];
            var len = state.services.length;
            for(var i = 0; i < len; i++){
                var service = state.services[i];
                to_submit.push({
                    employee: state.employee,
                    customer: state.customer,
                    service: service
                });
            }
            google.script.run.submit_services(to_submit);
        } else {
            console.log("Not sumbitting");
            self.on_failed_submit();
        }
    }, false);

    self.parent_element.appendChild(self.submit_button);
}