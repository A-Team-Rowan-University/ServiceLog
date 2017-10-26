
function ServiceList(parent_element) {
    var self = this;
    self.parent_element = parent_element;

    self.services = [];

    self.list_group = document.createElement("div");
    self.list_group.classList += " m-3 list-group";
    
    self.add_service = function(service){
        var service_element = new Service(service);

        self.list_group.appendChild(service_element.main_element);
        self.services.push(service);
        service_element.on_remove = function() {
            service_element.main_element.remove();
            var index = self.services.indexOf(service);
            if(index > -1) {
                self.services.splice(index, 1);
            }
        }
    }

    self.parent_element.appendChild(self.list_group);
}

function Service(service){
    var self = this;
    self.service = service

    self.on_remove = function() {};

    self.main_element = document.createElement("div");
    self.main_element.classList += " list-group-item";
    self.main_element.classList += " d-flex";
    self.main_element.classList += " align-items-start";
    self.main_element.classList += " justify-content-between";

    self.info_element = document.createElement("div");
    self.info_element.classList += " flex-column";

    self.title = document.createElement("h5");
    self.title.classList += "mb-1";
    self.title.textContent = service.name;
    self.info_element.appendChild(self.title);

    self.description = document.createElement("p");
    self.description.classList += "mb-1";
    self.description.textContent = service.search;
    self.info_element.appendChild(self.description);

    self.main_element.appendChild(self.info_element);

    self.remove_button = document.createElement("button");
    self.remove_button.classList += "btn btn-danger";
    self.remove_button.textContent = "Remove";
    self.remove_button.addEventListener('click', function (e) {
        self.on_remove();
    }, false);

    self.main_element.appendChild(self.remove_button);
}