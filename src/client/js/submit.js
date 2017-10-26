
function Submit(parent_element) {
    var self = this;

    self.parent_element = parent_element;

    self.on_submit = function() {
        return null;
    }


    self.submit_button = document.createElement("button");
    self.submit_button.classList += " btn btn-primary";
    self.submit_button.addEventListener('click', function() {
        var state = self.on_submit();
        console.log(self.on_submit());
        if(state.employee && state.customer){
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
        }
    }, false);

    self.parent_element.appendChild(self.submit_button);
}