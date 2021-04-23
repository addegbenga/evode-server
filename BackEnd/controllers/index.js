
class IndexControler { 
    renderWelcomePage(req, res) {
        return res.render("welcome");
    
    }

    renderDashboard(req, res) {
        return res.render("dashboard", {
            user: req.user,
            message: req.flash("dashboardMessage"),
        });
    }

}

module.exports = new IndexControler();