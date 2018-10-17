const endpoint = require("./endpoint.js");

module.exports = (models) =>{
    return [
        // GET all
        endpoint.create("/recipies", "get", (req, res) => {
            if(!req.session.userLoggedIn) endpoint.error(401, "Unauthorized", res);
            else {
                models.recipies.findAll().then((result) => {
                    res.send(result);
                });
            }
        }),

        // GET single
        endpoint.create("/recipies/:recId", "get", (req, res) => {
            if(!req.session.userLoggedIn) endpoint.error(401, "Unauthorized", res);
            else {
                var recipieId = +req.param("recId");
                if(recipieId) {
                    models.recipies.findById(recipieId).then((model) => {
                        if(!model) endpoint.error(404, "Not found", res);
                        else {
                            res.send(model);
                        }
                    }, (error) => {
                        endpoint.error(402, error, res);
                    });
                }
                else {
                    endpoint.error(402, "Invalid id provided", res);
                }
            }
        }),

        // POST add new
        endpoint.create("/recipies", "post", (req, res) => {
            if(!req.session.userLoggedIn) endpoint.error(401, "Unauthorized", res);
            else {
                models.recipies.create(req.body).then((model) => {
                    res.send(model);
                }, (error) => {
                    endpoint.error(402, error, res);
                });
            }
        }),

        // PUT update
        endpoint.create("/recipies/:recId", "put", (req, res) => {
            if(!req.session.userLoggedIn) endpoint.error(401, "Unauthorized", res);
            else {
                var recipieId = +req.param("recId");
                if(recipieId) {
                    models.recipies.findById(recipieId).then((model) => {
                        if(!model) endpoint.error(404, "Not found", res);
                        else {
                            model.update(req.body).then(() => {
                                res.send(model);
                            }, (error) => {
                                endpoint.error(402, error, res);
                            });
                        }
                    }, (error) => {
                        endpoint.error(402, error, res);
                    });

                }
                else {
                    endpoint.error(402, "Invalid id provided", res);
                }
            }
        }),

        // DELETE
        endpoint.create("/recipies/:recId", "delete", (req, res) => {
            if(!req.session.userLoggedIn) endpoint.error(401, "Unauthorized", res);
            else {
                var recipieId = +req.param("recId");
                if(recipieId) {
                    models.recipies.findById(recipieId).then((model) => {
                        if(!model) endpoint.error(404, "Not found", res);
                        else {
                            model.destroy().then(() => {
                                res.send("deleted");
                            }, (error) => {
                                endpoint.error(402, error, res);
                            });
                        }
                    }, (error) => {
                        endpoint.error(402, error, res);
                    });
                }
                else {
                    endpoint.error(402, "Invalid id provided", res);
                }
            }
        }),
    ];
};

