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

  const handleShowClick = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter handle={handleFilterChange} value={filter}/>
      <Countries countries={countriesToShow} isFiltered={filter.length>0} handleShowClick={handleShowClick} />
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      find countries <input onChange={props.handle} value={props.value} />
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
          <Country key={country.alpha2Code} country={country} showFull={true} handleShowClick={props.handleShowClick} />
        )}
      </div>
    )
  } else {
    return (
      <div>
        {props.countries.map(country => 
          <Country key={country.alpha2Code} country={country} handleShowClick={props.handleShowClick} />
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
        <h2>Spoken languages</h2>
        <ul>
          {props.country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img src={props.country.flag} alt={`${props.country.name} flag`} height="100" width="100"/>
        <Weather country={props.country} />
      </div>
    )
  } else {
    return (
      <div>{props.country.name}
        <Button text="show" countryName={props.country.name} handleClick={props.handleShowClick} />
      </div>
    )
  }
}

const Weather = (props) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [props.country.capital])

  if (weather.current !== undefined) {
    return (
      <div>
        <h2>{`Weather in ${props.country.capital}`}</h2>
        <div><b>temperature: </b>{`${weather.current.temperature} Celsius`}</div>
        <img src={weather.current.weather_icons[0]} alt={`${props.country.capital} weather`} height="50" width="50"/>
        <div><b>wind: </b>{`${weather.current.wind_speed} mph direction ${weather.current.wind_dir}`}</div>
      </div>
    )
  } else if (weather.success === false){
    return (
      <div>Cannot find capital</div>
    )
  } else {
    return (
      <div>Loading weather...</div>
    )
  }
}

const Button = (props) => {
  return (
    <button value={props.countryName} onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}

export default App;
