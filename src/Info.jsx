
export default function Info() {
  return (
    <div>
      <h1 style={{ color: 'white' }}>Info</h1>
      <p>I decided to make a hightmap population data visulaisation of Johannesburg, the city where I grew up. For anyone with no knowledge about this city, it is the biggest city in South Africa and is the economic hub of the country. South Africa in general is known for being one of the most unequal societies in the world which is one of the many remnants of apartheid which only ended 30 years ago. This was best explained in the paper by Chirisa and Matamanda (2019). In this paper, they quote another researcher, Harrison (2006), who explained that:

‘The spatial morphology of the extended metropolitan region (Johannesburg) has polarised
around two compartmentalised extremes: on the one hand, the spaces of affluence are healthy,
functional and largely the exclusive preserve of the white upper- and middle-classes; on the
other, the overcrowded spaces of con nement are distressed, dysfunctional and where the
overwhelming majority of black urban residents live and work . . .’(as cited in Chirisa & Matamanda, 2019, p. 360).

This data visualisation aims to spread light on these inequalities by combining two pieces of data: a map of Johannesburg’s wards and world-wide population data. I downloaded the map of Johannesburg’s wards directily form the independent organisation that makes it for South Africa  after the local government elections which is called the Municipal Demarcation Board and you can see the shape file for 2020 here: https://dataportal-mdb-sa.opendata.arcgis.com/datasets/279fbf82a48f46678ddd498627af3f0a_0/about

I then got my population data from World Pop: https://data.humdata.org/dataset/worldpop-population-counts-for-world. WorldPop is a collaborative project led by the University of Southampton (UK) in partnership with other institutions like the University of Louisville (USA) and Université de Namur (Belgium). It produces high-resolution gridded population datasets that estimate the spatial distribution of people around the world. The project is funded by entities such as the Bill and Melinda Gates Foundation. The data I used covers the years 2000 to 2020 and provides detailed estimates of population counts mapped onto a grid — with resolutions ranging from about 100 meters to 1 kilometer per grid cell. 

It is important to mention that for rapidly changing urban areas like Johannesburg, the data reflects estimates rather than real-time counts. However, I still think that the population data I got from this data set still reflects the general population distribution of Johannesburg. If you would like to read more about this data set you can find it here. 

If anyone has any questions about my method or suggestions of how I could improve it and if there are other data sets out there please let me know! My emails address is : 

References: 

Chirisa, I., & Matamanda, A. (2019). Forces shaping urban morphology in Southern Africa Today: Unequal interplay among people, practice and policy. *Journal of Urbanism: International Research on Placemaking and Urban Sustainability*, *12*(3), 354–372. https://doi.org/10.1080/17549175.2019.1626262</p>
    </div>
  );
}
