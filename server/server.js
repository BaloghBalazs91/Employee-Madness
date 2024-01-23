require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const divisionsModel = require("./db/divisions.model");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const FavoriteBrandModel = require("./db/favoriteBrand.model");
const BoardGamesModel = require("./db/boardGames.model");
const DivisionsModel = require("./db/divisions.model");
const CompanyModel = require("./db/company.model");
const ToolsModel = require("./db/tools.model");
const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  try {
    const employees = await EmployeeModel.find().sort({ created: "desc" });
    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" })
  }
});

app.get("/api/tools/", async (req, res) => {
  try {
    const tools = await ToolsModel.find().sort({ created: "desc" });
    return res.json(tools);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" })
  }
});

app.get("/api/boardgames/", async (req, res) => {
  try {
    const tools = await BoardGamesModel.find().sort({ created: "desc" });
    return res.json(tools);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" })
  }
});

app.get("/api/divisions/", async (req, res) => {
  try {
    const divisions = await divisionsModel.find().sort({ created: "desc" });
    return res.json(divisions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" });
  }

})

app.get("/api/employees/pets/:id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    return res.json(employee.pets)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" })
  }
})

app.get("/api/employees/kittens/:id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    return res.json(employee.kittens)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" })
  }
})


app.get("/api/companies/", async (req, res) => {
  try {
    const companies = await CompanyModel.find().sort({ created: "desc" });
    return res.json(companies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" });
  }
})

app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    return res.json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" });
  }
});

app.get("/api/divisions/:id", async (req, res) => {
  try {
    const division = await divisionsModel.findById(req.params.id);
    return res.json(division);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" })
  }
})

app.post("/api/employees/", async (req, res, next) => {

  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/tools/", async (req, res, next) => {
  const tool = req.body;
  try {
    const saved = await ToolsModel.create(tool);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/boardgames/", async (req, res, next) => {
  const boardGame = req.body;
  try {
    const saved = await BoardGamesModel.create(boardGame);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/employees/pets/:id", async (req, res, next) => {
  try {
    let employee = await EmployeeModel.findById(req.params.id);
    employee.pets = [...employee.pets, req.body]
    await employee.save();
    return res.json(employee.pets);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/employees/kittens/:id", async (req, res, next) => {
  try {
    let employee = await EmployeeModel.findById(req.params.id);
    employee.kittens = [...employee.kittens, req.body]
    await employee.save();
    return res.json(employee.kittens);
  } catch (err) {
    return next(err);
  }
});



app.post('/api/companies/', async (req, res, next) => {
  const company = req.body;
  try {
    const saved = await CompanyModel.create(company);
    return res.json(saved);
  }
  catch (err) {
    return next(err);
  }
})

app.post("/api/divisions/", async (req, res, next) => {
  const division = req.body;
  try {
    const saved = await DivisionsModel.create(division);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});



app.patch("/api/divisions/:id", async (req, res, next) => {
  try {
    const division = await divisionsModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(division)
  } catch (err) {
    return next(err);
  }
})
//kérdés: mi a $set és a new? Mikor kell next és mikor nem?

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/divisions/:id", async (req, res, next) => {
  try {
    const division = await DivisionsModel.findById(req.params.id);
    const deleted = await division.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
})

app.get("/api/equipments/", async (req, res) => {
  try {
    const equipment = await EquipmentModel.find().sort({ created: "desc" });
    return res.json(equipment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" })
  }
});

app.get("/api/equipments/:id", async (req, res) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    return res.json(equipment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" })
  }
});

app.post("/api/equipments/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/favoritebrands/", async (req, res) => {
  try {
    const favoritebrands = await FavoriteBrandModel.find().sort({ created: "desc" });
    return res.json(favoritebrands);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" });
  }
});

app.get("/api/favoritebrands/:id", async (req, res) => {
  try {
    const favoritebrand = await FavoriteBrandModel.findById(req.params.id);
    return res.json(favoritebrand);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" });
  }
});

app.post("/api/favoritebrands/", async (req, res, next) => {
  const favoritebrand = req.body;

  try {
    const saved = await FavoriteBrandModel.create(favoritebrand);
    return res.json(saved);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

app.patch("/api/favoritebrands/:id", async (req, res, next) => {
  try {
    const favoritebrand = await FavoriteBrandModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(favoritebrand);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/favoritebrands/:id", async (req, res, next) => {
  try {
    const favoritebrand = await FavoriteBrandModel.findById(req.params.id);
    const deleted = await favoritebrand.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/employees/search/:searchQuery", async (req, res) => {
  try {
    const searchQuery = req.params.searchQuery;
    const employees = await EmployeeModel.find({
      name: { $regex: searchQuery, $options: "i" },
    }).sort({ created: "desc" });
    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" });
  }

});

app.get("/api/employees/attendance/missing", async (req, res) => {
  try {
    const employees = await EmployeeModel.find({ present: false }).sort({ created: "desc" });
    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" });
  }

})

const main = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => {
      console.log("App is listening on 8080");
      console.log("Try /api/employees route right now");
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "500 internal server error" });
  }

};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
