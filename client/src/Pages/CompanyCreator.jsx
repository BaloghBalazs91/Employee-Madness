import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//rfc parancssor




export default function CompanyCreator() {
    const [companies, setCompanies] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate();

    const companyFetcher = () => {
        return fetch('/api/companies').then(res => res.json()).catch(err => console.error(err));
    }
    useEffect(() => {
        companyFetcher().then(res => setCompanies(res))
    })


    const companySaver = (companyName) => {

        const company = { name: companyName };
        fetch('/api/companies/', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(company) }).then(res => res.json()).catch(err => console.error(err)).then((res) => { setCompanies([...company, res]) })
    }




    return (
        <div>
            <div>
                <label>Company Name:</label>
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)}>
                </input>
                <button onClick={(e) => companySaver(companyName)}>Save</button>
                <button onClick={() => navigate('/')}>Home</button>
            </div>
            <div>
                <label>Company Name
                </label>
                <label>Company ID
                </label>
                {companies.map((company) => {
                    return <div><label>{company.name + "          "}</label>
                        <label>{company._id}</label></div>
                })}
            </div>
        </div>
    )
}
