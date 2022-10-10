const CountryItem = ({countryData,showAll,setSingleItem}) => {
  
	if(showAll){
		return (
			<div>
				{countryData.name.common}
			</div>
		)
	} else {
		return(
			<div>
				{countryData.name.common}
				<button onClick={()=>setSingleItem(countryData.name.common)}>show</button>
			</div>
		)
	}
}
export default CountryItem