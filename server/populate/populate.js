/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brands = require("./brands.json")
const colors = require("./colors.json")
const divisions = require("./divisions.json")
const tools = require("./tools.json")
const boardGames = require("./boardGames.json")
const EmployeeModel = require("../db/employee.model");
const FavoriteBrandModel = require("../db/favoriteBrand.model");
const DivisionsModel = require("../db/divisions.model")
const equipmentNames = require("./equipmentNames.json");
const equipmentModel = require("../db/equipment.model");
const toolsModel = require("../db/tools.model");
const boardGamesModel = require("../db/boardgames.model");
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}


const pick = (from) => from[Math.floor(Math.random() * from.length)];

function getRandomDate(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime);
}
const startDate = '2016-01-01';
const endDate = '2022-12-31';

const randomDate = getRandomDate(startDate, endDate);

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  await FavoriteBrandModel.deleteMany({});

  const brandDocuments = await FavoriteBrandModel.create(
    brands.map((name) => ({ name }))
  );
  const brandIds = brandDocuments.map((brand) => brand._id);

  const employees = names.map((name) => {
    const randomSalary = Math.floor(Math.random() * (100000 - 80000 + 1)) + 80000;
    const actual_salary = Math.floor(randomSalary.toString());
    const desired_salary = Math.floor((randomSalary * 1.2).toString());
    const salary_difference = (parseInt(desired_salary) - parseInt(actual_salary)).toString();
    return {
      name,
      level: pick(levels),
      position: pick(positions),
      present: false,
      favoriteBrand: pick(brandIds),
      starting_day: randomDate,
      salary: {
        actual_salary,
        desired_salary,
        salary_difference,
      },
      favorite_color: pick(colors),
      division: pick(divisions).city,
      boss: pick(names),
      pets: [],
      kittens: [],
    };
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateEquipments = async () => {
  await equipmentModel.deleteMany({});

  const equipments = equipmentNames.map((equipment) => ({
    name: equipment.name,
    type: equipment.type,
    amount: Math.floor(Math.random() * 100),
    assigned_to: "Not assigned yet"
  }));

  await equipmentModel.create(...equipments);
  console.log("Equipments created");
};

const populateTools = async () => {
  await toolsModel.deleteMany({});
  const popTools = tools.map((tool) => ({
    name: tool.name,
    weight: tool.weight
  }));
  await toolsModel.create(...popTools)
  console.log("Tools created")
}

const populateBoardgames = async () => {
  await boardGamesModel.deleteMany({})
  const popBoardGames = boardGames.map((boardGame) => ({
    name: boardGame.name,
    maxPlayers: boardGame.maxPlayers
  }));
  await boardGamesModel.create(...popBoardGames)
  console.log("boardGames created")
}

const populateDivisions = async () => {
  await DivisionsModel.deleteMany({});
  const randomBudget = Math.floor(Math.random() * (1000000 - 800000 + 1)) + 800000;
  const popDivisions = divisions.map((division) => ({
    name: division.city,
    boss: pick(names),
    budget: randomBudget,
    location: {
      city: division.city,
      country: division.country
    }
  }));
  await DivisionsModel.create(...popDivisions);
  console.log("Divisions created")
}

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populateEquipments();

  await populateDivisions();

  await populateTools();

  await populateBoardgames();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
