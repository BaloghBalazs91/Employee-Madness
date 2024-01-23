import { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [boss, setBoss] = useState(employee?.boss ?? "");
  const [favoriteBrand, setFavoriteBrand] = useState(employee?.favoriteBrand ?? "");
  const [actualSalary, setActualSalary] = useState(employee?.salary.actual_salary ?? "");
  const [desiredSalary, setDesiredSalary] = useState(employee?.salary.desired_salary ?? "");
  const [division, setDivision] = useState(employee?.division ?? "");
  const [companies, setCompanies] = useState([]);
  const [prevcompany, setPrevcompany] = useState("");
  const [boardGames, setBoardGames] = useState([]);
  const [boardGame, setBoardGame] = useState(null);


  const companyFetcher = () => {
    return fetch('/api/companies').then(res => res.json()).catch(err => console.error(err));
  }
  const boardGameFetcher = () => { return fetch('/api/boardgames/').then(res => res.json()).catch(err => console.error(err)); }

  useEffect(() => {
    companyFetcher().then((companies) => {
      setCompanies(companies)
    })
  }, []);

  useEffect(() => {
    boardGameFetcher().then((boardGames) => {
      setBoardGames(boardGames)
    })
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        favoriteBrand,
        salary: {
          actual_salary: actualSalary,
          desired_salary: desiredSalary,
          salarydifference: (desiredSalary - actualSalary)
        },

        boss,
        division,
        prevcompany,
        boardGame
      });
    }

    return onSave({
      name,
      level,
      position,
      favoriteBrand,
      salary: {
        actual_salary: actualSalary,
        desired_salary: desiredSalary,
        salarydifference: (desiredSalary - actualSalary)
      },
      boss,
      division,
      prevcompany,
      boardGame
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>
      <div>
        <label htmlFor="control">Favorite Brand:</label>
        <input value={favoriteBrand} onChange={(e) => setFavoriteBrand(e.target.value)} name="favoriteBrand" id="favoriteBrand"></input>
      </div>
      <div className="control">
        <label htmlFor="actualSalary">Actual salary:</label>
        <input
          value={actualSalary}
          onChange={(e) => setActualSalary(e.target.value)}
          name="actualSalary"
          id="actualSalary"
        />
      </div>
      <div className="control">
        <label htmlFor="desiredSalary">Desired Salary.:</label>
        <input
          value={desiredSalary}
          onChange={(e) => setDesiredSalary(e.target.value)}
          name="desiredSalary"
          id="desiredSalary"
        />
      </div>

      <div className="control">
        <label htmlFor="boss">Boss:</label>
        <input
          value={boss}
          onChange={(e) => setBoss(e.target.value)}
          name="boss"
          id="boss"
        />
      </div>
      <div className="control">
        <label htmlFor="division">Division:</label>
        <input
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          name="division"
          id="division"
        />
      </div>
      <div className="control">
        <label htmlFor="prevcompany">Previous Company</label>
        <select onChange={(e) => { setPrevcompany(e.target.value) }}>
          <option>Select a company</option>
          {companies.map((company) => { return <option value={company.name} key={company._id}>{company.name} </option> })}
        </select>
      </div>
      <div className="control">
        <label htmlFor="boardGames">Favorite Boardgame</label>
        <select onChange={(e) => { setBoardGame(e.target.value) }}>
          <option>Select a Boardgame</option>
          {boardGames.map((boardGame) => { return <option value={boardGame.maxPlayers} key={boardGame._id}>{boardGame.name} </option> })}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
