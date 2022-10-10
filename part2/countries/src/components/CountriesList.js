import CountryItem from './CountryItem'

const CountriesList = ({countriesData, showAll, setSingleItem}) => {
	
	return (
		<div style={{marginTop:20}}>
			{countriesData.map(country=>
				<CountryItem key={country.name.official} countryData={country} showAll={showAll} setSingleItem={setSingleItem}/>
			)}
		</div>
	)
}
export default CountriesList