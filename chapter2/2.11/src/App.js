import React, { useState,useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter handle={handleFilterChange} />
      <Countries countries={countriesToShow} isFiltered={filter.length>0}/>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      find countries <input onChange={props.handle} />
    </div>
  )
}

const Countries = (props) => {
  if (props.isFiltered && props.countries.length === 0) {
    return (
      <div>
        No match
      </div>
    )
  } else if (props.isFiltered && props.countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (props.isFiltered && props.countries.length === 1) {
    return (
      <div>
        {props.countries.map(country => 
          <Country key={country.alpha2Code} country={country} showFull={true}/>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {props.countries.map(country => 
          <Country key={country.alpha2Code} country={country} />
        )}
      </div>
    )
  }
}

const Country = (props) => {
  if (props.showFull === true) {
    return (
      <div>
        <h1>{props.country.name}</h1>
        <div>capital {props.country.capital}</div>
        <div>population {props.country.population}</div>
        <h2>languages</h2>
        <ul>
          {props.country.languages.map(language =>
            <li>{language.name}</li>
          )}
        </ul>
        <img src={props.country.flag} height="100" width="100"/>
      </div>
    )
  } else {
    return (
      <div>{props.country.name}</div>
    )
  }
}

export default App;
